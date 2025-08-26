import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartIcon() {
  const { count } = useCart();

  return (
    <Link to="/cart" style={{ marginLeft: "auto" }}>
      🛒 <span aria-label="items in cart">{count}</span>
    </Link>
  );
}
