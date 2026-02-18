import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import { LegacyChevronRight1pxIcon } from '@deriv/quill-icons/Legacy';
import { MenuItem, Text, useDevice } from '@deriv-com/ui';
import PlatformSwitcher from '../platform-switcher';
import useMobileMenuConfig from './use-mobile-menu-config';

type TMenuContentProps = {
    onOpenSubmenu?: (submenu: string) => void;
    onClose?: () => void;
};

const MenuContent = observer(({ onOpenSubmenu, onClose }: TMenuContentProps) => {
    const { isDesktop } = useDevice();
    const { client } = useStore();
    const textSize = isDesktop ? 'sm' : 'md';
    const { config } = useMobileMenuConfig(client);

    return (
        <div className='mobile-menu__content'>
            <div className='mobile-menu__content__items'>
                {config.map((item, index) => {
                    return (
                        <div
                            className='mobile-menu__content__items--padding mobile-menu__content__items--bottom-border'
                            data-testid='dt_menu_item'
                            key={index}
                        >
                            {item.map(
                                ({
                                    LeftComponent,
                                    RightComponent,
                                    as,
                                    href,
                                    label,
                                    onClick,
                                    submenu,
                                    target,
                                    isActive,
                                }) => {
                                    if (as === 'a') {
                                        return (
                                            <MenuItem
                                                as='a'
                                                className={clsx('mobile-menu__content__items__item', {
                                                    'mobile-menu__content__items__icons': true,
                                                    'mobile-menu__content__items__item--active': isActive,
                                                })}
                                                disableHover
                                                href={href}
                                                key={label}
                                                leftComponent={
                                                    <LeftComponent
                                                        className='mobile-menu__content__items--right-margin'
                                                        iconSize='sm'
                                                    />
                                                }
                                                target={target}
                                            >
                                                <Text size={textSize}>{label}</Text>
                                            </MenuItem>
                                        );
                                    }
                                    return (
                                        <MenuItem
                                            as='button'
                                            className={clsx('mobile-menu__content__items__item', {
                                                'mobile-menu__content__items__icons': true,
                                                'mobile-menu__content__items__item--active': isActive,
                                            })}
                                            disableHover
                                            key={label}
                                            leftComponent={
                                                <LeftComponent
                                                    className='mobile-menu__content__items--right-margin'
                                                    iconSize='xs'
                                                />
                                            }
                                            onClick={() => {
                                                if (submenu && onOpenSubmenu) {
                                                    onOpenSubmenu(submenu);
                                                } else if (onClick) {
                                                    onClick();
                                                    onClose?.();
                                                }
                                            }}
                                            rightComponent={
                                                submenu ? (
                                                    <LegacyChevronRight1pxIcon
                                                        className='mobile-menu__content__items--chevron'
                                                        iconSize='xs'
                                                    />
                                                ) : (
                                                    RightComponent
                                                )
                                            }
                                        >
                                            <Text size={textSize}>{label}</Text>
                                        </MenuItem>
                                    );
                                }
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default MenuContent;
