import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ProductDetail } from "../../components/imports";
// import Logo from "../../assets/Logo.png";
import productimg from "../../assets/candy2.jpeg";
import { NavLink, Outlet } from "react-router-dom";
function Product() {
  const [productData, setProductData] = useState("");
  const { user } = useAuthContext();
  const { productId } = useParams();

  useLayoutEffect(() => {
    const fetchProduct = async () => {
      if (!user) {
        console.log("User not logged in");
        return;
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/products/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        if (json.success) {
          setProductData(json.data);
        } else {
          console.log(json.error);
        }
      }
    };
    fetchProduct();
  }, [user, productId]);
  if (!productData) {
    return;
  }
 
  return (
    <div className="product-wrapper">
      <div className="product">
        <ProductDetail
          productName={productData.name}
          productImg={productData.images[0]}
          productPrice={productData.price}
          productInfo={productData.description}
          productCategory={"Gumms"}
          productId={productData._id}
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
