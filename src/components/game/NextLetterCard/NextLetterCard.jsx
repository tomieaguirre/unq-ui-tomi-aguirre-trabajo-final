import styles from "./NextLetterCard.module.css";

export default function NextLetterCard({ letter }) {
    return (
        <section className={styles.container}>
            <div className={styles.letterCircle}>
                {letter ?? "?"}
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>
                    Próxima letra
                </h2>

                <p className={styles.description}>
                    {letter
                        ? "Debe comenzar con esta letra."
                        : "Ingresa una palabra para comenzar."}
                </p>
            </div>
        </section>
    );
}