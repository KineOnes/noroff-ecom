import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Optional brand/logo text */}
        <Link to="/" className={styles.brand}>ItemHub</Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
          <Link to="/cart" className={styles.link}>Cart</Link>
        </nav>

        {/* pushes CartIcon to the far right */}
        <div className={styles.spacer} />

        <CartIcon />
      </div>
    </header>
  );
}
