import { Outlet } from "react-router-dom";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

export default function Layout() {
  return (
    <>
      <Nav />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
