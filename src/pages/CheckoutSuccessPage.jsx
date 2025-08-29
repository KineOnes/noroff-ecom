// src/pages/CheckoutSuccessPage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear(); // clear once on mount
  }, []); // 👈 empty dependency array prevents infinite loop

  return (
    <>
      <h1>Order successful</h1>
      <p>Takk for bestillingen! Handlekurven er tømt.</p>
      <Link to="/">Tilbake til butikken</Link>
    </>
  );
}
