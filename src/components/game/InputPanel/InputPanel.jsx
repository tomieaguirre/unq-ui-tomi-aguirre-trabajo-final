import { useEffect, useRef, useState } from "react";

import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";
import { GAME_STATUS } from "../../../reducers/gameStatus";

import styles from "./InputPanel.module.css";

export default function InputPanel({
    status,
    loading = false,
    onSubmit,
    onStart,
}) {

    const [value, setValue] = useState("");

    const inputRef = useRef(null);

    const canWrite =
        status === GAME_STATUS.IDLE ||
        status === GAME_STATUS.PLAYING;

    /* ============================================
       AUTO FOCUS
       ============================================ */

    useEffect(() => {

        if (canWrite && !loading) {
            inputRef.current?.focus();
        }

    }, [canWrite, loading]);

    /* ============================================
       CLEAR INPUT
       ============================================ */

    useEffect(() => {

        if (status === GAME_STATUS.FINISHED) {
            setValue("");
        }

    }, [status]);

    /* ============================================
       SUBMIT
       ============================================ */

    const handleSubmit = async (event) => {

        event.preventDefault();

        const word = value.trim();

        if (!word) {
            return;
        }

        const success = await onSubmit(word);

        if (success) {
            setValue("");
        }

        // Recupera el foco luego de la respuesta de la API.
        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });

    };

    return (
        <section className={styles.container}>

            {
                status === GAME_STATUS.FINISHED ? (

                    <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        onClick={onStart}
                    >
                        Volver a jugar
                    </Button>

                ) : (

                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >

                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Escribe una palabra..."
                            value={value}
                            onChange={(event) =>
                                setValue(event.target.value)
                            }
                            className={styles.input}
                            autoComplete="off"
                            disabled={!canWrite || loading}
                        />

                        <Button
                            type="submit"
                            variant="success"
                            size="md"
                            disabled={!canWrite || loading}
                        >
                            {
                                loading
                                    ? <Spinner size="sm" />
                                    : "Enviar"
                            }
                        </Button>

                    </form>

                )
            }

        </section>
    );
}