import "../App.css";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="appWrapper">
      <Header />
      <main className="main container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
