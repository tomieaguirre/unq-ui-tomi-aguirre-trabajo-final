import styles from "./IconButton.module.css";

export default function IconButton({ icon, label, onClick }) {
  return (
    <button className={styles.button} aria-label={label} onClick={onClick} type="button">
      {icon}
    </button>
  );
}
