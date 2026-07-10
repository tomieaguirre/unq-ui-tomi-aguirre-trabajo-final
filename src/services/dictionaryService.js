const API_URL = "https://word-api-hmlg.vercel.app/api/validate";

/**
 * Valida si una palabra existe en el diccionario usando la API de la cátedra.
 * @param {string} word - La palabra a verificar.
 * @returns {Promise<boolean>} - Retorna true si existe, false en caso contrario.
 */
export const isValidWord = async (word) => {
  try {
    const response = await fetch(`${API_URL}?word=${word.toLowerCase()}`);

    if (response.ok) {
      // HTTP 200
      const data = await response.json();

      return data.exists;
    }

    console.warn("Respuesta inesperada de la API, status:", response.status);
    return false;
  } catch (error) {
    console.error("Error de red al intentar validar la palabra:", error);
    return false;
  }
};
