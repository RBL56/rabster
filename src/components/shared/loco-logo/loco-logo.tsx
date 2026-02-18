import React from 'react';
import './loco-logo.scss';

interface LocoLogoProps {
    variant?: 'horizontal' | 'vertical' | 'icon';
    height?: number;
    className?: string;
}

const LocoLogo: React.FC<LocoLogoProps> = ({ variant = 'horizontal', height = 40, className }) => {
    const logoSrc = {
        horizontal: '/loco-logo.png', // Simplified based on AppLogo
        vertical: '/loco-logo.png',
        icon: '/loco-icon.png',
    };

    return (
        <img
            src={logoSrc[variant]}
            alt="Loco - Trade smarter, earn faster"
            height={height}
            className={`loco-logo loco-logo--${variant} ${className || ''}`}
        />
    );
};

export default LocoLogo;
