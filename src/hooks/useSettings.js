import { useState } from "react";

import {
    getSettings,
    updateSettings,
    resetSettings,
} from "../services/settingsService";

import {
    setMusicVolume,
    setEffectsVolume,
} from "../services/audioService";

export default function useSettings() {

    const [settings, setSettings] = useState(
        getSettings()
    );

    const save = (partialSettings) => {

        const updated = updateSettings(partialSettings);

        setSettings(updated);

        setMusicVolume(
            updated.musicEnabled
                ? updated.musicVolume
                : 0
        );

        setEffectsVolume(
            updated.effectsEnabled
                ? updated.effectsVolume
                : 0
        );

    };

    const reset = () => {

        resetSettings();

        const updated = getSettings();

        setSettings(updated);

        setMusicVolume(updated.musicVolume);
        setEffectsVolume(updated.effectsVolume);

    };

    return {
        settings,
        save,
        reset,
    };

}