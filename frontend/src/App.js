import LandingHero from "./components/LandingHero/LandingHero";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import ProductCard from "./components/ProductCard/ProductCard";
import AboutUs from "./pages/AboutUs/AboutUs";
import BlogCard from "./components/BlogCard/BlogCard";
import { ScrollRestoration } from "react-router-dom";
function App() {
  return (
    <div className="App-container">
      <div className="App">
        {/* scrolltotop  button  */}
        <ScrollToTop smooth color="white"/>
        <Navbar />
        <LandingHero />
        <ProductCard />
        <AboutUs />
        <BlogCard />
        <Outlet />
        <Footer />
        <ScrollRestoration />
      </div>
    </div>
  );
}
export default App;
