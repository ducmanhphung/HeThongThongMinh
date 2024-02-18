import styles from "./styles.module.scss";

function Button({ onClick, isActive, children }) {
  return (
    <div
      className={`${
        isActive === true
          ? `${styles.buttonWrapper} ${styles.active}`
          : `${styles.buttonWrapper}`
      }`}
    >
      <button onClick={onClick}>{children}</button>
    </div>
  );
}

export default Button;
