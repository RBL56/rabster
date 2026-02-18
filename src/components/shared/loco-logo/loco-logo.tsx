import React from 'react';
import './loco-logo.scss';

interface LocoLogoProps {
    variant?: 'horizontal' | 'vertical' | 'icon';
    height?: number;
    className?: string;
}

const LocoHubLogoHorizontal = ({ height }: { height: number }) => (
    <svg height={height} viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Modern LH Icon */}
        <path d="M10 10L25 5L40 10L25 15L10 10Z" fill="url(#grad1)" />
        <path d="M10 20L25 15L40 20L25 25L10 20Z" fill="url(#grad2)" />
        <path d="M10 30L25 25L40 30L25 35L10 30Z" fill="url(#grad1)" />

        {/* Text */}
        <text x="50" y="32" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" fill="var(--text-general)">
            Loco <tspan fill="#3f6fe5">Hub</tspan>
        </text>
        <text x="50" y="45" fontFamily="Arial, sans-serif" fontSize="8" fill="var(--text-less-prominent)">
            trade smarter. earn faster.
        </text>

        <defs>
            <linearGradient id="grad1" x1="10" y1="10" x2="40" y2="15" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3f6fe5" />
                <stop offset="1" stopColor="#2e58c1" />
            </linearGradient>
            <linearGradient id="grad2" x1="10" y1="15" x2="40" y2="25" gradientUnits="userSpaceOnUse">
                <stop stopColor="#27e992" />
                <stop offset="1" stopColor="#1eb875" />
            </linearGradient>
        </defs>
    </svg>
);

const LocoLogo: React.FC<LocoLogoProps> = ({ variant = 'horizontal', height = 40, className }) => {
    return (
        <div className={`loco-logo loco-logo--${variant} ${className || ''}`}>
            <LocoHubLogoHorizontal height={height} />
        </div>
    );
};

export default LocoLogo;
