// src/pages/CheckoutSuccessPage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import buttonStyles from "../components/Button.module.css";


export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear(); // clear once on mount
  }, []); // 👈 empty dependency array prevents infinite loop! 

  return (

    <>
      <h1>Order successful</h1>
      <p>Thank you for placing your order! The cart is empty.</p>
      <Link to="/" className={`${buttonStyles.btn} ${buttonStyles.btnPrimary}`}>
        Back to products
      </Link>
    </>
  );
}
