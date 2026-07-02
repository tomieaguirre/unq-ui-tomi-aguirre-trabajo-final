import styles from "./Logo.module.css";

const blocks = [
  { letter: "A", color: "yellow" },
  { letter: "B", color: "green" },
  { letter: "C", color: "blue" },
  { letter: "D", color: "purple" },
];

export default function Logo({ size = "big", layout = "vertical" }) {
  return (
    <div
      className={`
        ${styles.logo}
        ${styles[size]}
        ${styles[layout]}
      `}
    >
      <div className={styles.blocks}>
        {blocks.map(({ letter, color }) => (
          <span key={letter} className={`${styles.block} ${styles[color]}`}>
            {letter}
          </span>
        ))}
      </div>

      <div className={styles.text}>
        <h1 className={styles.title}>PALABRAS</h1>
        <h2 className={styles.subtitle}>ENCADENADAS</h2>
      </div>
    </div>
  );
}
