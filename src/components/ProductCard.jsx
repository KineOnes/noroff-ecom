import { Link } from "react-router-dom";
import buttonStyles from "./Button.module.css";

export default function ProductCard({ product }) {
  // Prøv å lese felter fleksibelt, i tilfelle API-struktur varierer litt
  const img =
    product.image?.url ||
    product.imageUrl ||
    product.images?.[0]?.url ||
    "https://placehold.co/400x300?text=No+image";

  const title = product.title || product.name || "Untitled";
  const price = Number(product.price) || 0;
  const discounted = Number(product.discountedPrice ?? price);
  const hasDiscount = discounted < price;
  const discountPct = hasDiscount ? Math.round(((price - discounted) / price) * 100) : 0;

  return (
    <article style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
      <img src={img} alt={product.image?.alt || title} style={{ width: "100%", display: "block" }} />

      <div style={{ padding: "0.75rem 1rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{title}</h3>

        <div style={{ margin: "0.5rem 0" }}>
          {hasDiscount ? (
            <>
              <span style={{ textDecoration: "line-through", opacity: 0.6, marginRight: 8 }}>
                {price.toFixed(2)} NOK
              </span>
              <strong>{discounted.toFixed(2)} NOK</strong>
              <span style={{ marginLeft: 8, color: "crimson" }}>−{discountPct}%</span>
            </>
          ) : (
            <strong>{price.toFixed(2)} NOK</strong>
          )}
        </div>

        <Link
  to={`/product/${product.id}`}
  className={`${buttonStyles.btn} ${buttonStyles.btnPrimary}`}
>
  View product
</Link>

      </div>
    </article>
  );
}
