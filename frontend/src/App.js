import { Routes, Route, BrowserRouter } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { Addresses, Layout, Orders, UserSetting } from "./components/imports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Home,
  AboutUs,
  Bundles,
  Login,
  SignUp,
  UserProfile,
  ContactUs,
  Product,
  Blogs,
} from "./pages/imports";

function App() {
  return (
    <div className="App-container">
      <div className="App">
        {/* Routes----- */}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={true}
          theme="dark"
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="shop" element={<Product />} />
              <Route path="bundles" element={<Bundles />} />
              <Route path="blogs" element={<Blogs />} />

              <Route path="account" element={<UserProfile />}>
                <Route path="myorders" element={<Orders />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="setting" element={<UserSetting />} />
              </Route>
              <Route path="contact" element={<ContactUs />} />
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
