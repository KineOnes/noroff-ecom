import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">{/* optional if you use a global container */}
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
          <Link to="/cart" className={styles.link}>Cart</Link>
          <div className={styles.cart}>
            <CartIcon />
          </div>
        </nav>
      </div>
    </header>
  );
}
