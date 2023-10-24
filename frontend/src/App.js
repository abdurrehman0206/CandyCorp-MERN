import LandingHero from "./components/LandingHero/LandingHero";
import ProductCard from "./components/ProductCard/ProductCard";
import AboutUs from "./pages/AboutUs/AboutUs";
import BlogCard from "./components/BlogCard/BlogCard";
function App() {
  return (
    <div className="App-container">
      <div className="App">
        <LandingHero />
        <ProductCard />
        <AboutUs />
        <BlogCard />
      </div>
    </div>
  );
}

export default App;
