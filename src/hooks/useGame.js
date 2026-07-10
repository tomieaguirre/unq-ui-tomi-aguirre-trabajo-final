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
       SUBMIT WORD
       ============================================ */

    const submitWord = async (value) => {

        if (game.isSubmitting) {
            return false;
        }

        const word = value.trim().toLowerCase();

        if (!word) {
            return false;
        }

        // Guarda si el usuario alcanzó a enviar antes de terminar el turno.
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

    const resetGame = () => {

        dispatch({
            type: GAME_ACTIONS.RESET_GAME,
        });

    };

    return {

        game,

        submitWord,

        resetGame,

    };

}