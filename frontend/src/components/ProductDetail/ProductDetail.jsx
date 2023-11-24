import React, { useState } from "react";
// import Logo from "../../assets/Logo.png";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FaRegHeart, FaHeart, FaFacebookF, FaInstagram } from "react-icons/fa";
import ReactImageMagnify from "react-image-magnify";
function ProductDetail({
  productImg,
  productName,
  productPrice,
  productInfo,
  productCategory,
  productId,
}) {
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  return (
    <div className="product-detail-wrapper">
      <section className="product-detail">
        {/* Product Image */}
        <div className="product-detail-img">
          {/* <img src={productImg} alt="Candy Corp Logo" /> */}
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "product-img",
                isFluidWidth: true,
                src: productImg,
              },
              largeImage: {
                src: productImg,
                width: 1000,
                height: 1000,
              },
            }}
            hoverDelayInMs={0}
            hoverOffDelayInMs={0}
            // className="product-image"
          />
          {/* <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Versace",
                isFluidWidth: true,
                src: productImg,
                srcSet: productImg,
                sizes:
                  "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
              },
              largeImage: {
                src: productImg,
                width: 1426,
                height: 2000,
              },
              lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
            }}
            {...rimProps}
          /> */}
        </div>

        {/* Product Details */}
        <div className="product-detail-desc">
          <div className="product-detail-header">
            <h1 className="product-name">{productName}</h1>

            <span className="product-price">${productPrice}</span>

            <p className="product-info-heading">{productInfo}</p>
          </div>
          <div className="product-add-to-cart">
            <div className="product-quantity">
              <button
                className="product-dec"
                onClick={() => {
                  if (quantity === 1) {
                    return;
                  } else {
                    setQuantity((prev) => prev - 1);
                  }
                }}
              >
                <CiSquareMinus />
              </button>
              <span className="product-counter">{quantity}</span>
              <button
                className="product-inc"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <CiSquarePlus />
              </button>
            </div>
            <button className="btn-primary ">Add To Cart</button>
            <button
              className="product-wishlist"
              onClick={() => setWishlist((prev) => !prev)}
            >
              {wishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <div className="product-info">
            <ul>
              <li>
                <h4>Category : </h4>
                <span>{productCategory}</span>
              </li>
              <li>
                <h4>Product Id : </h4>
                <span>{productId}</span>
              </li>
            </ul>
          </div>
          <div className="product-share">
            <i>Share with your friends</i>
            <div className="product-share-links">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
