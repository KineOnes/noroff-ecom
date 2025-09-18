// src/pages/CheckoutPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./CartPage.module.css";               // gjenbruker layout-stilene dine
import buttonStyles from "../components/Button.module.css";

export default function CheckoutPage() {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  // Ikke tøm cart her. Det gjøres på success-siden.
  function confirmOrder() {
    navigate("/checkout/success");
  }

  if (cart.length === 0) {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}>Checkout</h1>
        <p>Cart is empty.</p>
        <Link to="/" className={`${buttonStyles.btn} ${buttonStyles.btnPrimary}`}>
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Checkout</h1>

      {/* Les-visning av varene (uten +/-) */}
      <div className={styles.list}>
        {cart.map((item) => (
          <article key={item.id} className={styles.item}>
            <img
              className={styles.thumb}
              src={item.image || "https://placehold.co/200x200?text=No+image"}
              alt={item.title}
            />
            <div className={styles.meta}>
              <div className={styles.name}>{item.title}</div>
              <div className={styles.priceLine}>
                {item.unitPrice.toFixed(2)} NOK &middot; Qty: {item.quantity} &middot; Subtotal:{" "}
                {(item.unitPrice * item.quantity).toFixed(2)} NOK
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.total}>Total: {total.toFixed(2)} NOK</div>
        <div className={styles.actions}>
          <Link to="/cart" className={styles.btn}>Back to cart</Link>
          <button className={`${styles.btn} ${styles.primary}`} onClick={confirmOrder}>
            Confirm order
          </button>
        </div>
      </div>
    </div>
  );
}
