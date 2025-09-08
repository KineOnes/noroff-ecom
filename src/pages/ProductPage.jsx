import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api";
import { useCart } from "../context/CartContext";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        setStatus("loading");
        const data = await fetchProductById(id);
        if (ok) {
          setProduct(data);
          setStatus("ready");
        }
      } catch (e) {
        console.error(e);
        if (ok) setStatus("error");
      }
    })();
    return () => { ok = false; };
  }, [id]);

  if (status === "loading") return <p>Laster…</p>;
  if (status === "error" || !product) return <p>Fant ikke produktet.</p>;

  const title = product.title || product.name || "Untitled";
  const img =
    product.image?.url ||
    product.imageUrl ||
    product.images?.[0]?.url ||
    "https://placehold.co/900x600?text=No+image";

  const price = Number(product.price) || 0;
  const discounted = Number(product.discountedPrice ?? price);
  const hasDiscount = discounted < price;
  const pct = hasDiscount ? Math.round(((price - discounted) / price) * 100) : 0;

  return (
    <>
      <div className={styles.wrap}>
        {/* Left: media + description */}
        <section className={styles.media}>
          <img className={styles.image} src={img} alt={product.image?.alt || title} />
          <p className={`${styles.muted}`} style={{ marginTop: ".75rem" }}>
            About the product
          </p>
          <p>{product.description || "—"}</p>
        </section>

        {/* Right: info + actions */}
        <aside className={styles.info}>
          <div>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.muted}>{product.category || "Category"}</div>
          </div>

          <div className={styles.priceRow}>
            {hasDiscount ? (
              <>
                <span className={styles.strike}>{price.toFixed(2)} NOK</span>
                <strong>{discounted.toFixed(2)} NOK</strong>
                <span className={styles.badge}>-{pct}%</span>
              </>
            ) : (
              <strong>{price.toFixed(2)} NOK</strong>
            )}
          </div>

          <div className={styles.btnRow}>
            <Link to="/" className={styles.btn}>Products</Link>
            <button className={`${styles.btn} ${styles.primary}`} onClick={() => add(product)}>
              Add to cart
            </button>
          </div>

          {/* Reviews */}
          {Array.isArray(product.reviews) && product.reviews.length > 0 && (
            <section>
              <h2 className={styles.sectionTitle}>Reviews</h2>
              <ul className={styles.reviewList}>
                {product.reviews.map((r, i) => (
                  <li key={i} className={styles.reviewItem}>
                    <strong>{r.username || r.author || "User"}:</strong>{" "}
                    {r.description || r.comment}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
