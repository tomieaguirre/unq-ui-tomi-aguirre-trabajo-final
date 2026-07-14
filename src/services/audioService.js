import menuMusic from "../assets/sounds/music/menu.mp3";
import gameMusic from "../assets/sounds/music/game.mp3";

import successSound from "../assets/sounds/effects/success.mp3";
import countdownSound from "../assets/sounds/effects/countdown.mp3";
import gameOverSound from "../assets/sounds/effects/game-over.mp3";

export const MUSIC = {
    MENU: "menu",
    GAME: "game",
};

export const SOUND = {
    SUCCESS: "success",
    COUNTDOWN: "countdown",
    GAME_OVER: "gameOver",
};

const music = {
    [MUSIC.MENU]: new Audio(menuMusic),
    [MUSIC.GAME]: new Audio(gameMusic),
};

const effects = {
    [SOUND.SUCCESS]: new Audio(successSound),
    [SOUND.COUNTDOWN]: new Audio(countdownSound),
    [SOUND.GAME_OVER]: new Audio(gameOverSound),
};

// ============================================
// INITIAL CONFIGURATION
// ============================================

Object.values(music).forEach(audio => {
    audio.loop = true;
    audio.preload = "auto";
});

Object.values(effects).forEach(audio => {
    audio.preload = "auto";
});

let currentMusic = null;

// ============================================
// MUSIC
// ============================================

export function playMusic(name) {

    const nextMusic = music[name];

    if (!nextMusic || currentMusic === nextMusic) {
        return;
    }

    stopMusic();

    currentMusic = nextMusic;

    currentMusic.currentTime = 0;

    currentMusic.play().catch(() => {});

}

export function stopMusic() {

    if (!currentMusic) {
        return;
    }

    if (!currentMusic.paused) {
        currentMusic.pause();
    }

    currentMusic.currentTime = 0;

    currentMusic = null;

}

// ============================================
// EFFECTS
// ============================================

export function playEffect(name) {

    const effect = effects[name];

    if (!effect) {
        return;
    }

    effect.pause();

    effect.currentTime = 0;

    effect.play().catch(() => {});

}

// ============================================
// VOLUME
// ============================================

export function setMusicVolume(volume) {

    Object.values(music).forEach(audio => {
        audio.volume = Math.min(1, Math.max(0, volume));
    });

}

export function setEffectsVolume(volume) {

    Object.values(effects).forEach(audio => {
        audio.volume = Math.min(1, Math.max(0, volume));
    });

}