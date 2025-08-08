import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
  return (
    <>
      <h1>Order successful</h1>
      <p>Takk for bestillingen!</p>
      <Link to="/">Tilbake til butikken</Link>
    </>
  );
}
