import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { api_base } from '@/external/bot-skeleton';
import {
    CONNECTION_STATUS,
    connectionStatus$,
    isAuthorized$,
} from '@/external/bot-skeleton/services/api/observables/connection-status-stream';
import { useStore } from '@/hooks/useStore';
import { TSocketResponseData } from '@/types/api-types';

type TBalanceData = {
    balance: string;
    currency: string;
    isLoading: boolean;
    error: string | null;
    refreshBalance: () => Promise<void>;
};

const BalanceContext = createContext<TBalanceData | null>(null);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [balance, setBalance] = useState('0');
    const [currency, setCurrency] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);
    const store = useStore();
    const client = store?.client;

    const fetchBalance = async () => {
        if (!api_base.api) return;

        try {
            const res = (await api_base.api.send({ balance: 1, account: 'all' })) as TSocketResponseData<'balance'>;
            if (res.balance) {
                const activeLoginid = localStorage.getItem('active_loginid');
                const activeBalance = res.balance.accounts?.[activeLoginid ?? ''];

                if (activeBalance && client) {
                    setBalance(activeBalance.balance.toString());
                    setCurrency(activeBalance.currency);
                    // Also update the store to maintain consistency with existing MobX logic
                    client.setBalance(activeBalance.balance.toString());
                    client.setCurrency(activeBalance.currency);
                }

                if (client) {
                    client.setAllAccountsBalance(res.balance);
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch balance');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const connectionSubscription = connectionStatus$.subscribe(status => {
            if (status === CONNECTION_STATUS.OPENED && !hasFetched.current) {
                const authSubscription = isAuthorized$.subscribe(authorized => {
                    if (authorized && !hasFetched.current) {
                        hasFetched.current = true;
                        fetchBalance();
                    }
                });
                return () => authSubscription.unsubscribe();
            }
        });

        // Listen for real-time balance updates
        let messageSubscription: { unsubscribe: () => void } | null = null;
        if (api_base.api) {
            messageSubscription = api_base.api.onMessage().subscribe((res: any) => {
                const data = res.data;
                if (data?.msg_type === 'balance' && !data?.error) {
                    const balanceData = data.balance;
                    const activeLoginid = localStorage.getItem('active_loginid');

                    if (balanceData?.accounts) {
                        const activeBalance = balanceData.accounts[activeLoginid ?? ''];
                        if (activeBalance) {
                            setBalance(activeBalance.balance.toString());
                            setCurrency(activeBalance.currency);
                        }
                    } else if (balanceData?.loginid === activeLoginid) {
                        setBalance(balanceData.balance.toString());
                    }
                }
            });
        }

        return () => {
            connectionSubscription.unsubscribe();
            if (messageSubscription) messageSubscription.unsubscribe();
        };
    }, [client]);

    const value = {
        balance,
        currency,
        isLoading,
        error,
        refreshBalance: fetchBalance,
    };

    return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>;
};

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
};
