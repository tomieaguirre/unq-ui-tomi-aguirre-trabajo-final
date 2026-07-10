import { useEffect, useRef, useState } from "react";

/**
 * Hook que administra una cuenta regresiva de 3 segundos.
 *
 * @param {boolean} active
 * Indica si el contador debe comenzar.
 *
 * @param {Function} onFinish
 * Función que se ejecuta cuando finaliza la cuenta regresiva.
 *
 * @returns {number}
 * Valor actual del contador.
 */
export default function useCountdown(active, onFinish) {

    const [count, setCount] = useState(3);

    /**
     * Guarda la última referencia a la función onFinish.
     *
     * De esta forma el intervalo siempre ejecuta la versión más reciente
     * de la función sin tener que reiniciar el efecto cada vez que cambia.
     */
    const finishRef = useRef(onFinish);

    useEffect(() => {
        finishRef.current = onFinish;
    }, [onFinish]);

    useEffect(() => {

        /**
         * Si el contador no está activo:
         * - reinicia el valor
         * - no crea el intervalo.
         *
         * Este return evita que el efecto siga ejecutándose.
         */
        if (!active) {
            setCount(3);
            return;
        }

        setCount(3);

        const interval = setInterval(() => {

            setCount(previous => {

                if (previous <= 1) {

                    clearInterval(interval);

                    finishRef.current?.();

                    return 3;
                }

                return previous - 1;

            });

        }, 1000);

        return () => clearInterval(interval);

    }, [active]);

    return count;
}