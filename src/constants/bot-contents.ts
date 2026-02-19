type TTabsTitle = {
    [key: string]: string | number;
};

type TDashboardTabIndex = {
    [key: string]: number;
};

export const tabs_title: TTabsTitle = Object.freeze({
    WORKSPACE: 'Workspace',
    CHART: 'Chart',
    BOTS: 'Bots',
});

export const DBOT_TABS: TDashboardTabIndex = Object.freeze({
    DASHBOARD: 0,
    BOT_BUILDER: 1,
    CHART: 2,
    BOTS: 3,
    COPY_TRADING: 4,
});

export const BOT_SUB_TABS = {
    DASHBOARD: 0,
    BOT_BUILDER: 1,
    CHART: 2,
    BOTS: 3,
    COPY_TRADING: 4,
};

export const MAX_STRATEGIES = 10;

export const TAB_IDS = ['id-dbot-dashboard', 'id-bot-builder', 'id-charts', 'id-bots-list', 'id-copy-trading'];

export const DEBOUNCE_INTERVAL_TIME = 500;
