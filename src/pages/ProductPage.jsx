import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  return (
    <>
      <h1>Product {id}</h1>
      <p>Her skal vi hente detaljer for produktet med ID over.</p>
    </>
  );
}
