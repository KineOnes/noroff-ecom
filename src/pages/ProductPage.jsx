import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const { add } = useCart(); // <-- get add() from CartContext

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setStatus("loading");
        const data = await fetchProductById(id);
        if (isMounted) {
          setProduct(data);
          setStatus("ready");
        }
      } catch (e) {
        console.error(e);
        if (isMounted) setStatus("error");
      }
    })();
    return () => (isMounted = false);
  }, [id]);

  if (status === "loading") return <p>Laster…</p>;
  if (status === "error" || !product) return <p>Fant ikke produktet.</p>;

  const img =
    product.image?.url ||
    product.imageUrl ||
    product.images?.[0]?.url ||
    "https://placehold.co/600x400?text=No+image";

  const title = product.title || product.name || "Untitled";
  const price = Number(product.price) || 0;
  const discounted = Number(product.discountedPrice ?? price);
  const hasDiscount = discounted < price;
  const discountPct = hasDiscount ? Math.round(((price - discounted) / price) * 100) : 0;

  return (
    <>
      <h1>{title}</h1>
      <img src={img} alt={product.image?.alt || title} style={{ maxWidth: 480, width: "100%" }} />

      <p style={{ marginTop: 12 }}>{product.description}</p>

      <div style={{ margin: "0.5rem 0 1rem" }}>
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

      <button
        onClick={() => add(product)} // ✅ add to cart via context
        style={{ padding: "0.6rem 1rem", borderRadius: 8 }}
      >
        Add to cart
      </button>

      {/* Reviews (hvis finnes) */}
      {Array.isArray(product.reviews) && product.reviews.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h2>Reviews</h2>
          <ul>
            {product.reviews.map((r, i) => (
              <li key={i}>
                <strong>{r.username || r.author || "User"}:</strong>{" "}
                {r.description || r.comment}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
