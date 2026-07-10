import { useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./InputPanel.module.css";

export default function InputPanel({
    onSubmit,
    disabled = false,
    loading = false,
}) {

    const [value, setValue] = useState("");

    const inputRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const word = value.trim();

        if (!word) return;

        const success = await onSubmit(word);

        if (success) {
            setValue("");
        }

        inputRef.current?.focus();
    };

    return (
        <section className={styles.container}>

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

                    disabled={disabled}
                />

                <Button
                    type="submit"
                    variant="success"
                    size="md"
                    fullWidth
                    disabled={disabled || loading}
                >
                    {loading ? <Spinner size="sm" /> : "Enviar"}
                </Button>
            </form>
        </section>
    );
}