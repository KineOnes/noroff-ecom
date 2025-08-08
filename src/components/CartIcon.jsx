import { Link } from "react-router-dom";

export default function CartIcon({ count = 0 }) {
  return (
    <Link to="/cart" style={{ marginLeft: "auto" }}>
      🛒 <span aria-label="items in cart">{count}</span>
    </Link>
  );
}
