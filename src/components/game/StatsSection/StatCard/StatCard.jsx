import styles from "./StatCard.module.css";

export default function StatCard({
    icon,
    color,
    title,
    value,
    suffix,
}) {
    const bgClass = {
        colorA: styles.bgColorA,
        colorB: styles.bgColorB,
        colorC: styles.bgColorC,
    }[color];

    return (
        <article className={`${styles.card} ${bgClass}`}>
            <div className={`${styles.icon} ${styles[color]}`}>
                {icon}
            </div>
            <div className={styles.content}>
                <span className={styles.title}>
                    {title}
                </span>
                <div className={styles.valueRow}>
                    <span className={styles.value}>
                        {value}
                    </span>
                    <span className={styles.suffix}>
                        {suffix}
                    </span>
                </div>
            </div>
        </article>
    );
}