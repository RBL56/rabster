import { useDevice } from '@deriv-com/ui';
import LocoLogo from '@/components/shared/loco-logo/loco-logo';
import './app-logo.scss';

export const AppLogo = () => {
    const { isDesktop } = useDevice();

    if (!isDesktop) return null;
    return (
        <div className='app-header__logo' style={{ display: 'flex', alignItems: 'center' }}>
            <LocoLogo height={50} variant='horizontal' />
        </div>
    );
};
