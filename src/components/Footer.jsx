import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.muted}>
          © {new Date().getFullYear()} Sofia Select
        </span>
        <span>All prices incl. VAT</span>
      </div>
    </footer>
  );
}
