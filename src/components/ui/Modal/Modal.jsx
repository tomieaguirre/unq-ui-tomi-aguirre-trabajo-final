import {
    useEffect,
} from "react";

import {
    X,
} from "lucide-react";

import styles from "./Modal.module.css";

export default function Modal({
    title,
    children,
    onClose,
}) {

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {
                onClose();
            }

        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

    }, [onClose]);

    return (

        <div
            className={styles.overlay}
            onClick={onClose}
        >

            <section
                className={styles.modal}
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                <header className={styles.header}>

                    <h2>{title}</h2>

                    <button
                        onClick={onClose}
                        className={styles.closeButton}
                    >
                        <X size={22}/>
                    </button>

                </header>

                <div className={styles.content}>
                    {children}
                </div>

            </section>

        </div>

    );

}