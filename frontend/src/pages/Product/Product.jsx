import React from "react";
import { ProductDetail } from "../../components/imports";
// import Logo from "../../assets/Logo.png";
import productimg from "../../assets/candy2.jpeg";
import { NavLink, Outlet } from "react-router-dom";
function Product() {
  return (
    <div className="product-wrapper">
      <div className="product">
        <ProductDetail
          productName={"Bublix"}
          productImg={productimg}
          productPrice={14}
          productInfo={
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis."
          }
          productCategory={"Gumms"}
          productId={345345}
        />

        <section className="product-desc-review-container">
          <nav className="product-desc-review-navbar">
            <ul>
              <li>
                <NavLink
                  to="product-description"
                  className={({ isActive }) =>
                    isActive ? "product-navlink-active" : ""
                  }
                >
                  Description
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="customer-reviews"
                  className={({ isActive }) =>
                    isActive ? "product-navlink-active" : ""
                  }
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="product-desc-review-content">{<Outlet />}</div>
        </section>
        <section className="related-product-container">
          <h2>Related Products</h2>
          <div>{/* Related Product card goes here */}</div>
        </section>
      </div>
    </div>
  );
}

export default Product;
