import LandingHero from "./components/LandingHero/LandingHero";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import ProductCard from "./components/ProductCard/ProductCard";
import AboutUs from "./pages/AboutUs/AboutUs";
import BlogCard from "./components/BlogCard/BlogCard";
import { ScrollRestoration } from "react-router-dom";
import Blog from "./pages/Blog/Blog";
import Login from "./pages/AuthPages/Login";
import Signup from "./pages/AuthPages/SignUp";
function App() {
  return (
    <div className="App-container">
      <div className="App">
        {/* scrolltotop  button  */}
        <ScrollToTop smooth color="white" />
        <Navbar />
        <LandingHero />
        <ProductCard />
        <AboutUs />
        <BlogCard />
        <Blog />
        <Login/>
        <Signup/>
        <Outlet />
        <Footer />
        <ScrollRestoration />
      </div>
    </div>
  );
}
export default App;
