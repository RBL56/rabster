// Bot strategy metadata and categorization
export type BotType = 'normal' | 'automatic' | 'hybrid';

export interface BotStrategy {
    id: string;
    name: string;
    description: string;
    type: BotType;
    xmlPath: string;
}

// Categorized bot strategies from user XML files
export const BOT_STRATEGIES: BotStrategy[] = [
    // Automatic Bots (6) - Fully automated with complete risk management
    {
        id: 'loco-premium-ai',
        name: 'Loco Hub Premium A.I',
        description: 'Advanced AI-powered automatic trading with Loco Hub intelligent decision making',
        type: 'automatic',
        xmlPath: 'Automatic/LOCO PREMIUM A.I.xml',
    },
    {
        id: 'rise-fall-auto-x',
        name: 'Rise & Fall Automatic X',
        description: 'Fully automated rise/fall predictions with advanced pattern recognition',
        type: 'automatic',
        xmlPath: 'Automatic/RISE AND FALL AUTOMATIC X .xml',
    },
    {
        id: 'loco-rise-fall-auto',
        name: 'Loco Hub Rise Fall Auto',
        description: 'Automated Loco Hub rise/fall strategy with built-in risk management',
        type: 'automatic',
        xmlPath: 'Automatic/LOCO RISE FALL AUTO.xml',
    },
    {
        id: 'loco-under8-over3',
        name: 'Loco Hub Under 8 Over 3 Auto',
        description: 'Specialized automatic Loco Hub digits strategy targeting under 8 and over 3',
        type: 'automatic',
        xmlPath: 'Automatic/LOCO UNDER 8 OVER 3 AUTO.xml',
    },
    {
        id: 'over-under-auto-switcher',
        name: 'Over/Under Auto Switcher',
        description: 'Dynamic automatic switching between over and under predictions',
        type: 'automatic',
        xmlPath: 'Automatic/OVER UNDER AUTO SWITCHER.xml',
    },
    {
        id: 'over-under-automatic-x',
        name: 'Over/Under Automatic X',
        description: 'Enhanced automatic over/under strategy with adaptive logic',
        type: 'automatic',
        xmlPath: 'Automatic/OVER UNDER AUTOMATIC X .xml',
    },

    // Hybrid Bots (New)
    {
        id: 'hybrid-bot-1',
        name: 'Hybrid Bot 1',
        description: 'A hybrid strategy combining automatic entry with manual exit',
        type: 'hybrid',
        xmlPath: 'Hybridbots/Hybrid Bot 1.xml',
    },
    {
        id: 'hybrid-bot-2',
        name: 'Hybrid Bot 2',
        description: 'Experimental hybrid strategy for trend following',
        type: 'hybrid',
        xmlPath: 'Hybridbots/Hybrid Bot 2.xml',
    },


    // Normal Bots (3) - Require manual oversight and parameter tuning
    {
        id: 'loco-pro',
        name: 'Loco Hub Pro',
        description: 'Professional-grade Loco Hub trading bot with customizable parameters',
        type: 'normal',
        xmlPath: 'Normal Bots/LOCO PRO.xml',
    },
    {
        id: 'loco-speedbot',
        name: 'Loco Hub Speedbot',
        description: 'High-speed Loco Hub trading bot optimized for quick market movements',
        type: 'normal',
        xmlPath: 'Normal Bots/Loco Speedbot.xml',
    },
    {
        id: 'speed-bot-updated',
        name: 'Speed Bot Updated',
        description: 'Updated version with improved speed and manual control options',
        type: 'normal',
        xmlPath: 'Normal Bots/SPEED BOT updated.xml',
    },
];

// Helper functions
export const getNormalBots = (): BotStrategy[] => BOT_STRATEGIES.filter(bot => bot.type === 'normal');
export const getAutomaticBots = (): BotStrategy[] => BOT_STRATEGIES.filter(bot => bot.type === 'automatic');
export const getHybridBots = (): BotStrategy[] => BOT_STRATEGIES.filter(bot => bot.type === 'hybrid');
export const getBotById = (id: string): BotStrategy | undefined => BOT_STRATEGIES.find(bot => bot.id === id);
