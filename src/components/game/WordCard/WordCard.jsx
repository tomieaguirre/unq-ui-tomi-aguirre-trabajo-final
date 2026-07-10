import styles from "./WordCard.module.css";

export default function WordCard({ word }) {
    return (
        <article className={styles.card}>
            <span className={styles.word}>
                {word}
            </span>
        </article>
    );
}