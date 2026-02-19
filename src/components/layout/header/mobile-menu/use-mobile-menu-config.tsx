import { ComponentProps, ReactNode, useMemo } from 'react';
import Livechat from '@/components/chat/Livechat';
import useIsLiveChatWidgetAvailable from '@/components/chat/useIsLiveChatWidgetAvailable';
import { standalone_routes } from '@/components/shared';
import { useOauth2 } from '@/hooks/auth/useOauth2';
import { useFirebaseCountriesConfig } from '@/hooks/firebase/useFirebaseCountriesConfig';
import useRemoteConfig from '@/hooks/growthbook/useRemoteConfig';
import { useIsIntercomAvailable } from '@/hooks/useIntercom';
import { useStore } from '@/hooks/useStore';
import useThemeSwitcher from '@/hooks/useThemeSwitcher';
import useTMB from '@/hooks/useTMB';
import RootStore from '@/stores/root-store';
import {
    StandaloneMoonRegularIcon,
    StandaloneRightToBracketRegularIcon,
    StandaloneUserRegularIcon,
} from '@deriv/quill-icons/Standalone';
import { BrandDerivLogoCoralIcon } from '@deriv/quill-icons/Logo';
import { useTranslations } from '@deriv-com/translations';
import { ToggleSwitch } from '@deriv-com/ui';
import { URLConstants } from '@deriv-com/utils';
import { clearAuthData, handleOidcAuthFailure } from '@/utils/auth-utils';
import { AuthManager } from '@/utils/AuthManager';
import { generateOAuthURL } from '@/components/shared';

const YouTubeIcon = ({ className }: { className?: string; height?: number; width?: number; iconSize?: string }) => (
    <svg className={className} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M15.8 4.8c-.2-1.3-.8-2.2-2-2.4C11.4 2 8 2 8 2s-3.4 0-5.8.4c-1.2.2-1.8 1.1-2 2.4-.2 1-.2 2.1-.2 3.2 0 1.1 0 2.2.2 3.2.2 1.3.8 2.2 2 2.4 2.4.4 5.8.4 5.8.4s3.4 0 5.8-.4c1.2-.2 1.8-1.1 2-2.4.2-1 .2-2.1.2-3.2 0-1.1 0-2.2-.2-3.2zM6.4 10.4V5.6L10.4 8l-4 2.4z'
            fill='#FF0000'
        />
    </svg>
);

export type TSubmenuSection = 'accountSettings' | 'cashier' | 'reports';

//IconTypes
type TMenuConfig = {
    LeftComponent: React.ElementType;
    RightComponent?: ReactNode;
    as: 'a' | 'button';
    href?: string;
    label: ReactNode;
    onClick?: () => void;
    removeBorderBottom?: boolean;
    submenu?: TSubmenuSection;
    target?: ComponentProps<'a'>['target'];
    isActive?: boolean;
}[];

const useMobileMenuConfig = (client?: RootStore['client']) => {
    const { localize, currentLang } = useTranslations();
    const { is_dark_mode_on, toggleTheme } = useThemeSwitcher();
    const { client: storeClient } = useStore();
    const { oAuthLogout } = useOauth2({ handleLogout: async () => storeClient.logout(), client: storeClient });

    const { data } = useRemoteConfig(true);
    const { cs_chat_whatsapp } = data;

    const { is_livechat_available } = useIsLiveChatWidgetAvailable();
    const icAvailable = useIsIntercomAvailable();

    const { isAuthorized, activeLoginid, accountList } = useApiBase();

    // Get current account information for dependency tracking
    const activeAccount = useMemo(
        () => accountList?.find(account => account.loginid === activeLoginid),
        [activeLoginid, accountList]
    );

    const accounts = client?.accounts || {};
    const { isTmbEnabled, onRenderTMBCheck } = useTMB();
    const is_tmb_enabled = window.is_tmb_enabled || isTmbEnabled();

    const { hubEnabledCountryList } = useFirebaseCountriesConfig();

    // Function to add account parameter to URLs
    const getAccountUrl = (url: string) => {
        try {
            const redirect_url = new URL(url);
            // Check if the account is a demo account
            // Use the URL parameter to determine if it's a demo account, as this will update when the account changes
            const urlParams = new URLSearchParams(window.location.search);
            const account_param = urlParams.get('account');
            const is_virtual = client?.is_virtual || account_param === 'demo';
            const currency = client?.getCurrency?.();

            if (is_virtual) {
                // For demo accounts, set the account parameter to 'demo'
                redirect_url.searchParams.set('account', 'demo');
            } else if (currency) {
                // For real accounts, set the account parameter to the currency
                redirect_url.searchParams.set('account', currency);
            }

            return redirect_url.toString();
        } catch (error) {
            return url;
        }
    };

    const has_wallet = Object.keys(accounts).some(id => accounts[id].account_category === 'wallet');
    const is_hub_enabled_country = hubEnabledCountryList.includes(client?.residence || '');
    // Determine the appropriate redirect URL based on user's country
    const getRedirectUrl = () => {
        // Check if the user's country is in the hub-enabled country list
        if (has_wallet && is_hub_enabled_country) {
            return getAccountUrl(standalone_routes.account_settings);
        }
        return getAccountUrl(standalone_routes.personal_details);
    };

    const is_logged_in_fully = isAuthorized && activeLoginid && activeAccount;

    const menuConfig = useMemo(
        (): TMenuConfig[] => [
            [
                {
                    as: 'button',
                    label: localize('Dark theme'),
                    LeftComponent: StandaloneMoonRegularIcon,
                    RightComponent: <ToggleSwitch value={is_dark_mode_on} onChange={toggleTheme} />,
                },
                !is_logged_in_fully && {
                    as: 'button',
                    label: localize('Log in'),
                    LeftComponent: StandaloneRightToBracketRegularIcon,
                    onClick: async () => {
                        clearAuthData(false);
                        try {
                            const tmbEnabled = await isTmbEnabled();
                            if (tmbEnabled) {
                                await onRenderTMBCheck(true);
                            } else {
                                try {
                                    window.location.href = AuthManager.getLoginUrl(currentLang?.toLowerCase() ?? 'en');
                                } catch (err) {
                                    handleOidcAuthFailure(err);
                                    window.location.replace(generateOAuthURL());
                                }
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    },
                },
                !is_logged_in_fully && {
                    as: 'button',
                    label: localize('Sign up'),
                    LeftComponent: StandaloneUserRegularIcon,
                    onClick: () => {
                        window.open(standalone_routes.signup, '_blank');
                    },
                },
                is_logged_in_fully && {
                    as: 'button',
                    label: localize('Log out'),
                    LeftComponent: StandaloneRightToBracketRegularIcon,
                    onClick: oAuthLogout,
                    removeBorderBottom: true,
                },
            ].filter(Boolean) as TMenuConfig,
        ],
        [
            is_logged_in_fully,
            is_dark_mode_on,
            toggleTheme,
            oAuthLogout,
            isTmbEnabled,
            onRenderTMBCheck,
            currentLang,
            localize,
        ]
    );

    return {
        config: menuConfig,
    };
};

export default useMobileMenuConfig;
