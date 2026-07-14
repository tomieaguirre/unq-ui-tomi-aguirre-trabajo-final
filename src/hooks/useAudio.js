import {
    MUSIC,
    SOUND,

    playMusic,
    stopMusic,

    playEffect,

    setMusicVolume,
    setEffectsVolume,
} from "../services/audioService";

export default function useAudio() {

    return {

        MUSIC,

        SOUND,

        playMusic,

        stopMusic,

        playEffect,

        setMusicVolume,

        setEffectsVolume,

    };

}