import styles from "./Button.module.css";

export default function Button({
  variant = "primary",      // "primary" | "success" 
  size = "md",              // "sm" | "md" | "lg"
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}) {
  const variantClass = styles[variant] || styles.primary;
  const sizeClass = styles[size] || styles.md;

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${sizeClass} ${fullWidth ? styles.fullWidth : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </button>
  );
}