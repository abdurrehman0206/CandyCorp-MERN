import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import LandingHero from "../LandingHero/LandingHero";

function Layout() {
  function ScrollTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <>
      <Navbar />
      <ScrollTop />
      {/* <LandingHero /> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
