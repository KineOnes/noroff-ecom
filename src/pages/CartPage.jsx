// src/pages/CartPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, add, decrement, remove, clear, total } = useCart();
  const navigate = useNavigate();

  // Bruker add() for å øke antall — vi gir den et "produktformet" objekt
  const increment = (item) => {
    add({
      id: item.id,
      title: item.title,
      image: { url: item.image },        // CartContext leser image?.url
      price: item.unitPrice,              // fallback hvis discountedPrice ikke finnes
      discountedPrice: item.unitPrice,    // sikrer riktig enhetspris
    });
  };

  const handleCheckout = () => {
    clear();
    navigate("/checkout/success");
  };

  if (cart.length === 0) {
    return (
      <section>
        <h1>Cart</h1>
        <p>Handlekurven er tom.</p>
        <Link to="/">← Tilbake til butikken</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Cart</h1>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {cart.map((item) => (
          <li
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "64px 1fr auto",
              gap: "0.75rem",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              padding: "0.75rem 0",
            }}
          >
            <img
              src={item.image || "https://placehold.co/64x64?text=No+img"}
              alt={item.title}
              width={64}
              height={64}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />

            <div>
              <strong style={{ display: "block" }}>{item.title}</strong>
              <small style={{ opacity: 0.7 }}>
                {item.unitPrice.toFixed(2)} NOK pr stk
              </small>

              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button onClick={() => decrement(item.id)} aria-label="decrease quantity">
                  −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => increment(item)} aria-label="increase quantity">
                  +
                </button>

                <button onClick={() => remove(item.id)} style={{ marginLeft: 12 }}>
                  Fjern
                </button>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <strong>{(item.unitPrice * item.quantity).toFixed(2)} NOK</strong>
            </div>
          </li>
        ))}
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          paddingTop: "1rem",
          borderTop: "1px solid #ddd",
        }}
      >
        <Link to="/">← Fortsett å handle</Link>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7, textAlign: "right" }}>Total</div>
            <div style={{ fontSize: 18, fontWeight: 700, textAlign: "right" }}>
              {total.toFixed(2)} NOK
            </div>
          </div>

          <button
            onClick={handleCheckout}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: 8,
              background: "#222",
              color: "#fff",
              border: "1px solid #222",
              cursor: "pointer",
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
