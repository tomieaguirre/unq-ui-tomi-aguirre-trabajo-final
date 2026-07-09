/**
 * Verifica si una palabra ya fue utilizada.
 *
 * @param {Array} words
 * @param {string} word
 * @returns {boolean}
 */
export function isRepeatedWord(words, word) {
    return words.some(
        (item) => item.word === word
    );
}

/**
 * Verifica si la palabra respeta la cadena.
 *
 * La primera palabra siempre es válida.
 *
 * @param {Array} words
 * @param {string|null} nextLetter
 * @param {string} word
 * @returns {boolean}
 */
export function isValidChain(
    words,
    nextLetter,
    word
) {
    if (words.length === 0) {
        return true;
    }

    return word.startsWith(nextLetter);
}