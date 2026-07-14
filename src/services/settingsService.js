const STORAGE_KEY = "word-chain-settings";

export const DEFAULT_SETTINGS = {
    musicEnabled: true,
    effectsEnabled: true,

    musicVolume: 0.4,
    effectsVolume: 0.7,
};

export function getSettings() {

    const settings = localStorage.getItem(STORAGE_KEY);

    if (!settings) {
        return DEFAULT_SETTINGS;
    }

    return {
        ...DEFAULT_SETTINGS,
        ...JSON.parse(settings),
    };

}

function saveSettings(settings) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings),
    );

}

export function updateSettings(partialSettings) {

    const updated = {
        ...getSettings(),
        ...partialSettings,
    };

    saveSettings(updated);

    return updated;

}

export function resetSettings() {

    saveSettings(DEFAULT_SETTINGS);

}