import styles from './ErrorText.module.css';

function ErrorText({ message }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default ErrorText;
