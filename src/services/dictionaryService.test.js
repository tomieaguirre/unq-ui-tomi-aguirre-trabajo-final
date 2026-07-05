import { describe, test, expect, vi, beforeEach } from "vitest";
import { isValidWord } from "./dictionaryService";

// mock global
describe("dictionaryService - isValidWord()", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("debe retornar true si la API responde que la palabra existe", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ exists: true }),
        }),
      ),
    );

    const result = await isValidWord("hola");

    expect(result).toBe(true);
  });

  test("debe retornar false si la API responde que la palabra NO existe", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ exists: false }),
        }),
      ),
    );

    const result = async () => await isValidWord("asdfgh");

    expect(await result()).toBe(false);
  });

  test("debe retornar false y manejar el error si la API devuelve un status inválido (ej: 400)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
        }),
      ),
    );

    const result = await isValidWord("");

    expect(result).toBe(false);
  });

  test("debe retornar false si ocurre un error de red (catch block)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network Error"))),
    );

    const result = await isValidWord("arbol");

    expect(result).toBe(false);
  });
});
