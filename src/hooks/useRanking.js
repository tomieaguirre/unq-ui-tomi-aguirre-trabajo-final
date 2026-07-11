import { useState } from "react";

import {
    getRanking,
    saveScore,
    clearRanking,
} from "../services/rankingService";

export default function useRanking() {

    const [ranking, setRanking] = useState(
        getRanking()
    );

    const addScore = (gameResult) => {

        const result = saveScore(gameResult);

        setRanking(result.ranking);

        return result;

    };

    const refreshRanking = () => {

        setRanking(
            getRanking()
        );

    };

    const resetRanking = () => {

        clearRanking();

        setRanking([]);

    };

    return {

        ranking,

        addScore,

        refreshRanking,

        resetRanking,

    };

}