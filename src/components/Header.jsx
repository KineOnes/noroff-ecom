import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <header style={{ padding: "1rem 0", borderBottom: "1px solid #eee" }}>
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Cart</Link>
        <CartIcon />
      </nav>
    </header>
  );
}
