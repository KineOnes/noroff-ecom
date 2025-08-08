import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "1rem" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
