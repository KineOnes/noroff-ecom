// src/pages/CartPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./CartPage.module.css";
import buttonStyles from "../components/Button.module.css";


export default function CartPage() {
  const { cart, add, decrement, remove, total, clear } = useCart();
  const navigate = useNavigate();

  function checkout() {
    // Vi lar Clearing skje på success-siden (du har allerede clear() der).
    navigate("/checkout/success");
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          Cart is empty. <Link to="/" className={`${buttonStyles.btn} ${buttonStyles.btnPrimary}`}>Go shopping</Link>
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => (
              <article key={item.id} className={styles.item}>
                <img
                  className={styles.thumb}
                  src={
                    item.image ||
                    "https://placehold.co/200x200?text=No+image"
                  }
                  alt={item.title}
                />

                <div className={styles.meta}>
                  <div className={styles.name}>{item.title}</div>
                  <div className={styles.priceLine}>
                    {item.unitPrice.toFixed(2)} NOK &middot; Qty: {item.quantity} &middot; Subtotal:{" "}
                    {(item.unitPrice * item.quantity).toFixed(2)} NOK
                  </div>
                </div>

                <div className={styles.controls}>
                  <div className={styles.qtyRow}>
                    <button
                      className={styles.iconBtn}
                      aria-label="Decrease quantity"
                      onClick={() => decrement(item.id)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className={styles.iconBtn}
                      aria-label="Increase quantity"
                      onClick={() => add(item)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.title}`}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.total}>
              Total: {total.toFixed(2)} NOK
            </div>
            <div className={styles.actions}>
              <button className={styles.btn} onClick={clear}>Clear</button>
              <button className={`${styles.btn} ${styles.primary}`} onClick={checkout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
