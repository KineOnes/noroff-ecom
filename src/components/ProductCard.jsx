// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { add } = useCart();

  // Bilde – prøver flere felt siden API kan variere litt
  const img =
    product.image?.url ||
    product.imageUrl ||
    product.images?.[0]?.url ||
    "https://placehold.co/400x300?text=No+image";

  const title = product.title || product.name || "Untitled";
  const price = Number(product.price) || 0;
  const discounted = Number(
    product.discountedPrice != null ? product.discountedPrice : price
  );
  const hasDiscount = discounted < price;
  const discountPct = hasDiscount
    ? Math.round(((price - discounted) / price) * 100)
    : 0;

  return (
    <article
      style={{
        border: "1px solid #eee",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "0.75rem",
      }}
    >
      <Link to={`/product/${product.id}`} style={{ display: "block" }}>
        <img
          src={img}
          alt={product.image?.alt || title}
          style={{ width: "100%", display: "block", borderRadius: 6 }}
        />
      </Link>

      <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{title}</h3>

      <div style={{ margin: 0 }}>
        {hasDiscount ? (
          <>
            <span
              style={{
                textDecoration: "line-through",
                opacity: 0.6,
                marginRight: 8,
              }}
            >
              {price.toFixed(2)} NOK
            </span>
            <strong>{discounted.toFixed(2)} NOK</strong>
            <span style={{ marginLeft: 8, color: "crimson" }}>
              −{discountPct}%
            </span>
          </>
        ) : (
          <strong>{price.toFixed(2)} NOK</strong>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <Link
          to={`/product/${product.id}`}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1px solid #ddd",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          View product
        </Link>

        <button
          type="button"
          onClick={() => add(product)}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: 6,
            border: "1px solid #222",
            background: "#222",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
