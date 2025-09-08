import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import styles from "./Header.module.css"; // connect CSS module

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/contact" className={styles.link}>Contact</Link>
        <Link to="/cart" className={styles.link}>Cart</Link>
        <div className={styles.cart}>
          <CartIcon />
        </div>
      </nav>
    </header>
  );
}
