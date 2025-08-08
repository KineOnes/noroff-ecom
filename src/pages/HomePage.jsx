import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Her kommer liste over produkter (API i neste steg).</p>

      {/* Midlertidig test-lenke til et produkt */}
      <ul>
        <li>
          <Link to="/product/f99cafd2-bd40-4694-8b33-a6052f36b435">
            Gå til et eksempel-produkt
          </Link>
        </li>
      </ul>
    </>
  );
}
