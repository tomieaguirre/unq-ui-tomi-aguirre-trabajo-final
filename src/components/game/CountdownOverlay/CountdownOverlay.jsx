import styles from "./CountdownOverlay.module.css";

export default function CountdownOverlay({ value }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.number}>
                {value}
            </div>
        </div>
    );
}