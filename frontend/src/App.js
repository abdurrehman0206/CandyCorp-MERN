import { Routes, Route, BrowserRouter } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

import { Home, AboutUs, Bundles } from "./pages";
import { Layout } from "./components";

function App() {
  return (
    <div className="App-container">
      <div className="App">
        {/* Routes----- */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="bundles" element={<Bundles />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* ------------ */}

        {/* Scroll To Top btn*/}
        <ScrollToTop smooth color="white" />
      </div>
    </div>
  );
}
export default App;
