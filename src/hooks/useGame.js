import { useEffect, useReducer } from "react";

import { isValidWord } from "../services/dictionaryService";

import gameReducer from "../reducers/gameReducer";
import { initialGameState } from "../reducers/initialGameState";
import { GAME_ACTIONS } from "../reducers/gameActions";
import { GAME_ERRORS } from "../reducers/gameErrors";
import { GAME_STATUS } from "../reducers/gameStatus";

import {
    isRepeatedWord,
    isValidChain,
} from "../utils/wordValidation";


export default function useGame() {

    const [game, dispatch] = useReducer(
        gameReducer,
        initialGameState
    );

    /* ============================================
       TIMER
       ============================================ */

    /**
     * Ejecuta el reloj del juego.
     * El intervalo solo existe mientras la partida
     * está en estado PLAYING.
     */
    useEffect(() => {

        if (game.status !== GAME_STATUS.PLAYING) {
            return;
        }

        const interval = setInterval(() => {

            dispatch({
                type: GAME_ACTIONS.TICK,
            });

        }, 1000);

        return () => clearInterval(interval);

    }, [game.status]);

    /* ============================================
    FINISH GAME
    ============================================ */
    
    /**
     * Finaliza la partida únicamente cuando:
     * - el reloj llegó a cero
     * - el juego sigue en PLAYING
     * - no existe una validación pendiente contra la API
     *
     * Esto permite aceptar una palabra enviada en el
     * último segundo aunque la respuesta de la API
     * llegue unos instantes después.
     */
    useEffect(() => {

        if (
            game.status !== GAME_STATUS.PLAYING ||
            game.timeLeft > 0 ||
            game.isSubmitting
        ) {
            return;
        }

        dispatch({
            type: GAME_ACTIONS.FINISH_GAME,
        });

    }, [
        game.status, 
        game.timeLeft, 
        game.isSubmitting,
    ]);

    /* ============================================
       SUBMIT WORD
       ============================================ */

    /**
     * Intenta agregar una palabra al juego.
     *
     * Orden de validaciones:
     * 1. Cadena válida
     * 2. Palabra repetida
     * 3. Existencia en diccionario
     *
     * Solo las palabras válidas reinician el tiempo.
     *
     * @param {string} value
     * @returns {Promise<boolean>} true si la palabra fue agregada.
     */
    const submitWord = async (value) => {

        // Evita múltiples requests simultáneas.
        if (game.isSubmitting) {
            return false;
        }

        const word = value.trim().toLowerCase();

        if (!word) {
            return false;
        }

        // Guarda si el usuario alcanzó a enviar
        // antes de terminar el turno.
        const submittedInTime =
            game.status !== GAME_STATUS.FINISHED &&
            game.timeLeft > 0;

        dispatch({
            type: GAME_ACTIONS.START_SUBMIT,
        });

        try {

            dispatch({
                type: GAME_ACTIONS.RESET_ERROR,
            });

            if (
                !isValidChain(
                    game.words,
                    game.nextLetter,
                    word
                )
            ) {

                dispatch({
                    type: GAME_ACTIONS.SET_ERROR,
                    payload: GAME_ERRORS.INVALID_CHAIN,
                });

                return false;

            }

            if (
                isRepeatedWord(
                    game.words,
                    word
                )
            ) {

                dispatch({
                    type: GAME_ACTIONS.SET_ERROR,
                    payload: GAME_ERRORS.DUPLICATED,
                });

                return false;

            }

            const exists = await isValidWord(word);

            if (!exists) {

                dispatch({
                    type: GAME_ACTIONS.SET_ERROR,
                    payload: GAME_ERRORS.NOT_FOUND,
                });

                return false;

            }

            // Si el tiempo terminó antes de que el usuario enviara,
            // la palabra ya no debe ingresar.
            if (!submittedInTime) {
                return false;
            }

            dispatch({

                type: GAME_ACTIONS.ADD_WORD,

                payload: {

                    id: crypto.randomUUID(),

                    word,

                },

            });

            return true;

        } finally {

            dispatch({
                type: GAME_ACTIONS.END_SUBMIT,
            });

        }

    };

    /**
     * Inicia la secuencia previa al juego
     * mostrando el contador 3..2..1.
     */
    const startNewGame = () => {

        dispatch({
            type: GAME_ACTIONS.START_COUNTDOWN,
        });
    };

    /**
     * Se ejecuta cuando termina el countdown.
     * Reinicia completamente el estado y
     * comienza una nueva partida.
     */
    const finishCountdown = () => {

        dispatch({
            type: GAME_ACTIONS.START_GAME,
        });
    };

    return {
        game,
        submitWord,
        startNewGame,
        finishCountdown,
    };

}