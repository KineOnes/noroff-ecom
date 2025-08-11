import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";

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
      .filter(p => (p.title || p.name || "").toLowerCase().includes(q))
      .slice(0, 8); // topp 8 forslag
  }, [products, query]);

  if (status === "loading") return <p>Laster produkter…</p>;
  if (status === "error") return <p>Kunne ikke hente produkter. Prøv igjen.</p>;

  return (
    <>
      <h1>Home</h1>

      {/* Look-ahead søk */}
      <div style={{ position: "relative", maxWidth: 520 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Søk etter produkt…"
          style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #ddd", borderRadius: 8 }}
        />
        {query && filtered.length > 0 && (
          <ul
            style={{
              position: "absolute",
              insetInline: 0,
              top: "110%",
              background: "white",
              border: "1px solid #eee",
              borderRadius: 8,
              listStyle: "none",
              margin: 0,
              padding: 8,
              zIndex: 10,
              boxShadow: "0 8px 24px rgba(0,0,0,.06)",
            }}
          >
            {filtered.map(p => (
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
      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
