import LandingHero from "./components/LandingHero/LandingHero";
import ProductCard from "./components/ProductCard/ProductCard";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <div className="App-container">
      <div className="App">
        <LandingHero />
        <ProductCard />
        <AboutUs/>
      </div>
    </div>
  );
}

export default App;
