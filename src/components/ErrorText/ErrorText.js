import styles from './ErrorText.module.css';

function ErrorText() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.errorText}>Sorry, that something went wrong</p>
    </div>
  );
}

export default ErrorText;
