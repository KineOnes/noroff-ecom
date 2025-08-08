// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1>404 – Not found</h1>
      <p>Siden finnes ikke.</p>
      <Link to="/">Gå til forsiden</Link>
    </>
  );
}
