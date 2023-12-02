import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FaRegHeart, FaHeart, FaFacebookF, FaInstagram } from "react-icons/fa";
import ReactImageMagnify from "react-image-magnify";
import { PhotoProvider, PhotoView } from "react-photo-view";
// import Slider from "react-slick";
function ProductDetail({
  productImg,
  productName,
  productPrice,
  productInfo,
  productCategory,
}) {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [imageSwitch, setImageSwitch] = useState(false);
  const productImagePath = imageSwitch ? Logo : productImg;

  return (
    <div className="product-detail-wrapper">
      <section className="product-detail">
        <div className="product-detail-img">
          <div className="product-images-list">
            <img
              src={productImg}
              alt="product-image-1 "
              className={!imageSwitch ? "image-active" : ""}
              onClick={() => setImageSwitch(false)}
            />
            <img
              src={Logo}
              alt="product-image-1"
              className={imageSwitch ? "image-active" : ""}
              onClick={() => setImageSwitch(true)}
            />
          </div>
          <div className="product-image">
            {open && (
              <div>
                <img src={productImagePath} alt="product-image" />
              </div>
            )}
            <img
              src={productImagePath}
              alt="product-image"
              className="product-image-resp"
              onClick={() => setOpen(true)}
            />

            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "product-image",
                  isFluidWidth: true,
                  src: productImagePath,
                },
                largeImage: {
                  src: productImagePath,
                  width: 1200,
                  height: 1400,
                },
              }}
              hoverDelayInMs={0}
              hoverOffDelayInMs={0}
              className="product-image-magnify"
            />
          </div>
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
