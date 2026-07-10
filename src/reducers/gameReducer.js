import { GAME_ACTIONS } from "./gameActions";
import { GAME_STATUS } from "./gameStatus";
import { initialGameState } from "./initialGameState";

export default function gameReducer(state, action) {

    switch (action.type) {
        case GAME_ACTIONS.ADD_WORD: {
            const word = action.payload;

            return {
                ...state,

                status: GAME_STATUS.PLAYING,

                words: [
                    ...state.words,
                    word,
                ],

                score: state.score + word.word.length,

                nextLetter: word.word.at(-1),

                lastPlay: {
                    type: "success",
                    title: "¡Bien hecho!",
                    message: `"${word.word}" es válida.`,
                    points: word.word.length,
                },

                // Reinicia el reloj al ingresar una palabra válida
                timeLeft: 15,

                error: null,

            };

        }
        case GAME_ACTIONS.TICK: {
            if (
                state.status !== GAME_STATUS.PLAYING
            ) {
                return state;
            }
            if (state.timeLeft <= 1) {
                return {
                    ...state,

                    timeLeft: 0,

                    status: GAME_STATUS.FINISHED,
                };
            }
            return {
                ...state,

                timeLeft: state.timeLeft - 1,
            };
        }

        case GAME_ACTIONS.SET_ERROR:
            return {
                ...state,

                error: action.payload,

                lastPlay: {
                    type: "error",
                    title: "Palabra inválida",
                    message: action.payload,
                    points: 0,
                },
            };

        case GAME_ACTIONS.RESET_ERROR:
            return {
                ...state,

                error: null,
            };

        case GAME_ACTIONS.SET_STATUS:
            return {
                ...state,

                status: action.payload,

            };

        case GAME_ACTIONS.RESET_GAME:
            return initialGameState;

        case GAME_ACTIONS.FINISH_GAME:
            return {
                ...state,

                status: GAME_STATUS.FINISHED,
            };

        case GAME_ACTIONS.START_SUBMIT:
            return {
                ...state,

                isSubmitting: true,
            };

        case GAME_ACTIONS.END_SUBMIT:
            return {
                ...state,
                
                isSubmitting: false,
            };

        default:
            return state;
    }
}