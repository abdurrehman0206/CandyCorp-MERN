import LandingHero from "./components/LandingHero/LandingHero";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="App-container">
      <div className="App">
        <Navbar />
        <LandingHero />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
export default App;
