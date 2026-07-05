import styles from "./StatsSection.module.css";

export default function StatsSection() {
    return (
        <section className={styles.container}>

            <article className={styles.card}>
                <h1>Tiempo</h1>
            </article>

            <article className={styles.card}>
                <h1>Puntaje</h1>
            </article>

            <article className={styles.card}>
                <h1>Palabras</h1>
            </article>

        </section>
    );
}