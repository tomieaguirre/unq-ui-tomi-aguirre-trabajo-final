import { useState } from "react";

import {
    getSettings,
    updateSettings,
    resetSettings,
} from "../services/settingsService";

export default function useSettings() {

    const [settings, setSettings] = useState(
        getSettings()
    );

    const save = (partialSettings) => {

        const updated = updateSettings(partialSettings);

        setSettings(updated);

    };

    const reset = () => {

        resetSettings();

        setSettings(getSettings());

    };

    return {

        settings,

        save,

        reset,

    };

}