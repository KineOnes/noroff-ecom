import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import styles from "./Header.module.css";
import logo from "../assets/SofiaSelectLogo.png"; // 👈 your logo

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.containerGrid}>
        {/* Left nav */}
        <nav className={styles.navLeft}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
          <Link to="/cart" className={styles.link}>Cart</Link>
        </nav>

        {/* Centered logo */}
        <Link to="/" className={styles.brandCenter} aria-label="Sofia Select home">
          <img src={logo} alt="Sofia Select" className={styles.logo} />
        </Link>

        {/* Right side: cart icon */}
        <div className={styles.right}>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
