const STORAGE_KEY = "word-chain-ranking";
const MAX_RANKING = 10;


export function getRanking() {

    const ranking = localStorage.getItem(STORAGE_KEY);

    return ranking
        ? JSON.parse(ranking)
        : [];

}


function saveRanking(ranking) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(ranking)
    );

}


function sortRanking(a, b) {

    // Más puntaje primero.
    if (a.score !== b.score) {
        return b.score - a.score;
    }

    // Con mismo puntaje gana quien usó menos palabras.
    if (a.words !== b.words) {
        return a.words - b.words;
    }

    // Si siguen empatados conserva prioridad
    // quien logró primero ese resultado.
    return a.date - b.date;

}


export function saveScore({
    score,
    words,
}) {

    const currentRanking = getRanking();

    const newEntry = {
        id: crypto.randomUUID(),
        score,
        words,
        date: Date.now(),
    };

    const orderedRanking = [
        ...currentRanking,
        newEntry,
    ]
        .sort(sortRanking);

    const top10 = orderedRanking.slice(
        0,
        MAX_RANKING
    );

    const position = top10.findIndex(
        item => item.id === newEntry.id
    );

    const entered = position !== -1;

    if (entered) {
        saveRanking(top10);
    }

    return {

        entered,

        position: entered
            ? position + 1
            : null,

        ranking: entered
            ? top10
            : currentRanking,

    };

}


export function clearRanking() {

    localStorage.removeItem(STORAGE_KEY);

}