import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import {
  Addresses,
  Layout,
  Orders,
  ProductDesc,
  Reviews,
  UserSetting,
} from "./components/imports";
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
  Products,
  Product,
  Blogs,
  Blog,
  Cart,
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
              <Route path="products/:productId" element={<Product />} />
              <Route path="products" element={<Products />} />
              <Route path="bundles" element={<Bundles />} />
              <Route path="blogs/:blogId" element={<Blog />} />
              <Route path="blogs" element={<Blogs />} />

              <Route path="account" element={<UserProfile />}>
                <Route index element={<Navigate to="myorders" replace />} />
                <Route path="myorders" element={<Orders />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="setting" element={<UserSetting />} />
              </Route>
              <Route path="contact" element={<ContactUs />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="product" element={<Product />}>
                {/* <Route
                  index
                  element={<Navigate to="product-description" replace />}
                /> */}
                <Route path="product-description" element={<ProductDesc />} />
                <Route path="customer-reviews" element={<Reviews />} />
              </Route>
              <Route path="cart" element={<Cart />} />
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
