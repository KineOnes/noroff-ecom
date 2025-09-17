import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | ready
  const [query, setQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setStatus("loading");
        const data = await fetchProducts();
        if (isMounted) {
          setProducts(data);
          setStatus("ready");
        }
      } catch (e) {
        console.error(e);
        if (isMounted) setStatus("error");
      }
    })();
    return () => (isMounted = false);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => (p.title || p.name || "").toLowerCase().includes(q))
      .slice(0, 8); // topp 8 forslag. Maximum 8 suggestions
  }, [products, query]);

  if (status === "loading") return <p>Loading products…</p>;
  if (status === "error") return <p>Could not load products. Try again.</p>;

  return (
    <div className={styles.container}>
      <h1>Home</h1>

      {/* Look-ahead søk */}
      <div className={styles.searchWrapper}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for product…"
          className={styles.searchInput}
        />
        {query && filtered.length > 0 && (
          <ul className={styles.suggestions}>
            {filtered.map((p) => (
              <li key={p.id}>
                <Link to={`/product/${p.id}`} onClick={() => setQuery("")}>
                  {p.title || p.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Produkt-grid */}
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
