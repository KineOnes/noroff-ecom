// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1>404 – Not found</h1>
      <p>Page does not exist.</p>
      <Link to="/">Go to homepage</Link>
    </>
  );
}

