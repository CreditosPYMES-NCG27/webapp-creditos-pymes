import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";

export const Layout = () => (
  <ScrollToTop>
    <Navbar />
    <Outlet />
    <Footer />
  </ScrollToTop>
);