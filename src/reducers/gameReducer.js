import { GAME_ACTIONS } from "./gameActions";
import { GAME_STATUS } from "./gameStatus";
import { initialGameState } from "./initialGameState";

/**
 * Reducer principal del juego.
 *
 * Centraliza todas las transiciones de estado
 * provocadas por las acciones del usuario y
 * por los efectos del juego (timer, countdown,
 * fin de partida, etc.).
 */
export default function gameReducer(state, action) {

    switch (action.type) {
        case GAME_ACTIONS.ADD_WORD: {

            // Actualiza el estado luego de una jugada válida.
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

            // Al llegar a cero solo se detiene el reloj.
            // El efecto que observa el estado será quien
            // decida cuándo finalizar realmente la partida,
            // permitiendo completar una request pendiente.
            if (state.timeLeft <= 1) {
                return {
                    ...state,

                    timeLeft: 0,
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

        case GAME_ACTIONS.START_COUNTDOWN:
            return {
                ...state,

                status: GAME_STATUS.COUNTDOWN,
            };

        case GAME_ACTIONS.START_GAME:
            
            // Reinicia completamente la partida luego
            // del countdown.
            return {
                ...initialGameState,

                status: GAME_STATUS.PLAYING,
            };

        case GAME_ACTIONS.FINISH_GAME:
            
            // Marca la partida como finalizada y garantiza
            // que no queden envíos pendientes.
            return {
                ...state,

                status: GAME_STATUS.FINISHED,

                isSubmitting: false,
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