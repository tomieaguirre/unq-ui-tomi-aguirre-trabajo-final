import { GAME_STATUS } from "./gameStatus";

export const initialGameState = {
    status: GAME_STATUS.IDLE,

    words: [],

    score: 0,

    nextLetter: null,

    timeLeft: 15,

    lastPlay: {
        type: "info",
        title: "Comienza una partida",
        message: "Ingresa una palabra para empezar.",
        points: 0,
    },

    error: null,

    isSubmitting: false,
};