import styles from "./styles.module.scss";

function ChatField({ isUser, content }) {
  const className =
    isUser === true
      ? `${styles.chatFieldWrapper} ${styles.userContent}`
      : `${styles.chatFieldWrapper} ${styles.storeContent}`;
  return (
    <div className={className}>
      <div className={styles.content}>
        <span>{content}</span>
      </div>
    </div>
  );
}

export default ChatField;
