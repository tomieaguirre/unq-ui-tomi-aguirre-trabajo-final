import { useReducer } from "react";

import { isValidWord } from "../services/dictionaryService";

import gameReducer from "../reducers/gameReducer";
import { initialGameState } from "../reducers/initialGameState";
import { GAME_ACTIONS } from "../reducers/gameActions";
import { GAME_ERRORS } from "../reducers/gameErrors";

import {
    isRepeatedWord,
    isValidChain,
} from "../utils/wordValidation";

export default function useGame() {
    const [game, dispatch] = useReducer(
        gameReducer,
        initialGameState
    );

    /**
     * Intenta agregar una palabra al juego.
     * @returns {Promise<boolean>}
     */
    const submitWord = async (value) => {
        // Evita múltiples envíos simultáneos
        if (game.isSubmitting) {
            return false;
        }

        const word = value.trim().toLowerCase();

        if (!word) {
            return false;
        }

        dispatch({
            type: GAME_ACTIONS.START_SUBMIT,
        });

        try {
            dispatch({
                type: GAME_ACTIONS.RESET_ERROR,
            });

            // Validación local: palabra repetida
            if (isRepeatedWord(game.words, word)) {
                dispatch({
                    type: GAME_ACTIONS.SET_ERROR,
                    payload: GAME_ERRORS.DUPLICATED,
                });

                return false;
            }

            // Validación local: cadena válida
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

            // Validación externa: API 
            const exists = await isValidWord(word);

            if (!exists) {
                dispatch({
                    type: GAME_ACTIONS.SET_ERROR,
                    payload: GAME_ERRORS.NOT_FOUND,
                });

                return false;
            }
            
            // Agrega palabra válida
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