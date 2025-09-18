// src/pages/CheckoutPage.jsx
import { useContext, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import btn from "../components/Button.module.css";

export default function CheckoutPage() {
  const { cart, clear } = useContext(CartContext); // tilpass hvis navnene dine er annerledes
  const navigate = useNavigate();

  const total = useMemo(() => {
    return (cart ?? []).reduce((sum, item) => {
      const price = Number(item.discountedPrice ?? item.price ?? 0);
      const qty = Number(item.quantity ?? 1);
      return sum + price * qty;
    }, 0);
  }, [cart]);

  function placeOrder() {
    // Tøm handlekurven og gå til success
    clear?.();
    navigate("/checkout/success");
  }

  const isEmpty = !cart || cart.length === 0;

  return (
    <>
      <h1>Checkout</h1>

      {isEmpty ? (
        <p>
          Cart is empty. <Link to="/">Go shopping</Link>
        </p>
      ) : (
        <>
          <section style={{ maxWidth: 720 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {cart.map((item) => {
                const price = Number(item.discountedPrice ?? item.price ?? 0);
                const qty = Number(item.quantity ?? 1);
                const line = price * qty;
                return (
                  <li
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "64px 1fr auto",
                      gap: "1rem",
                      alignItems: "center",
                      border: "1px solid #eee",
                      borderRadius: 10,
                      padding: "0.75rem 1rem",
                      marginBottom: "0.75rem",
                      background: "#fff",
                    }}
                  >
                    <img
                      src={item.image?.url || item.imageUrl || item.images?.[0]?.url}
                      alt={item.image?.alt || item.title}
                      style={{
                        width: 64,
                        height: 64,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.title}</div>
                      <div style={{ opacity: 0.7 }}>
                        {qty} × {price.toFixed(2)} NOK
                      </div>
                    </div>
                    <div style={{ fontWeight: 600 }}>{line.toFixed(2)} NOK</div>
                  </li>
                );
              })}
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
                gap: "1rem",
              }}
            >
              <div style={{ fontWeight: 700 }}>
                Total: {total.toFixed(2)} NOK
              </div>

              <div style={{ display: "flex", gap: ".5rem" }}>
                <Link to="/" className={`${btn.btn} ${btn.btnSecondary || ""}`}>
                  Continue shopping
                </Link>
                <button
                  type="button"
                  onClick={placeOrder}
                  className={`${btn.btn} ${btn.btnPrimary}`}
                >
                  Place order
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
