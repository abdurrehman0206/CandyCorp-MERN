import LandingHero from "./components/LandingHero/LandingHero";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

import ProductCard from "./components/ProductCard/ProductCard";
import AboutUs from "./pages/AboutUs/AboutUs";
import BlogCard from "./components/BlogCard/BlogCard";

function App() {
  return (
    <div className="App-container">
      <div className="App">
        <Navbar />
        <LandingHero />

        <Footer />

        <ProductCard />
        <AboutUs />
        <BlogCard />
        <Outlet />
      </div>
    </div>
  );
}
export default App;
