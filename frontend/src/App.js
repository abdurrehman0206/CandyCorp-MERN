import { Routes, Route, BrowserRouter } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

import { Addresses, Layout, Orders, UserSetting } from "./components/imports";

import {
  Home,
  AboutUs,
  Bundles,
  Login,
  SignUp,
  UserProfile,
} from "./pages/imports";


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
              <Route path="account" element={<UserProfile />}>
                <Route path="myorders" element={<Orders />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="setting" element={<UserSetting />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
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
