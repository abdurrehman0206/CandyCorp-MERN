import React, { useState } from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FaRegHeart, FaHeart, FaFacebookF, FaInstagram } from "react-icons/fa";
import ReactImageMagnify from "react-image-magnify";
import { MdCloseFullscreen } from "react-icons/md";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useAddToCart } from "../../hooks/useAddToCart";
function BundleDetail({
  bundleName,
  bundleImg,
  bundlePrice,
  bundleInfo,
  bundleCategory,
  bundleType,
  bundleSize,
  bundleFlavor,
  bundleId,
  bundleMaxQuantity,
  products,
}) {
  //   const { addProductToCart } = useAddToCart();
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [imageSwitch, setImageSwitch] = useState(0);
  const bundleImagePath = bundleImg[imageSwitch];
  const { addProductToCart } = useAddToCart();
  return (
    <div className="bundle-detail-wrapper">
      <section className="bundle-detail">
        <div className="bundle-detail-img">
          <div className="bundle-images-list">
            {bundleImg &&
              bundleImg.map((img, key) => {
                return (
                  <img
                    key={key}
                    src={img}
                    alt={`product-img-${key}`}
                    className={imageSwitch === key ? "image-active" : ""}
                    onClick={() => setImageSwitch(key)}
                  />
                );
              })}
            {/* <img
              src={bundleImg[0]}
              alt="bundle-image-1 "
              className={!imageSwitch ? "image-active" : ""}
              onClick={() => setImageSwitch(0)}
            />
            <img
              src={bundleImg[1]}
              alt="product-image-2"
              className={imageSwitch ? "image-active" : ""}
              onClick={() => setImageSwitch(true)}
            />
            <img
              src={bundleImg[2]}
              alt="product-image-2"
              className={imageSwitch ? "image-active" : ""}
              onClick={() => setImageSwitch(true)}
            /> */}
          </div>
          <div className="bundle-image">
            {open && (
              <div className="bundle-image-view-container">
                <button
                  className="bundle-image-view-close-btn"
                  onClick={() => setOpen(false)}
                >
                  <MdCloseFullscreen />
                </button>
                <TransformWrapper>
                  <TransformComponent>
                    <img
                      src={bundleImagePath}
                      alt="bundle-image"
                      className="bundle-image-view"
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            )}

            <img
              src={bundleImagePath}
              alt="bundle-image"
              className="bundle-image-resp"
              onClick={() => setOpen(true)}
            />

            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "bundle-image",
                  isFluidWidth: true,
                  src: bundleImagePath,
                },
                largeImage: {
                  src: bundleImagePath,
                  width: 1200,
                  height: 1400,
                },
              }}
              hoverDelayInMs={0}
              hoverOffDelayInMs={0}
              className="bundle-image-magnify"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="bundle-detail-desc">
          <div className="bundle-detail-header">
            <h1 className="bundle-name">{bundleName}</h1>

            <span className="bundle-price">${bundlePrice}</span>

            <p className="bundle-info-heading">{bundleInfo}</p>
          </div>
          <div className="bundle-info">
            <ul>
              <li>
                <h4>Category </h4>
                <span>{bundleCategory}</span>
              </li>
              <li>
                <h4>Type </h4>
                <span>{bundleType}</span>
              </li>
              <li>
                <h4>Size </h4>
                <span>{bundleSize}</span>
              </li>
              <li>
                <h4>Flavor </h4>
                <span>{bundleFlavor}</span>
              </li>
            </ul>
          </div>
          <div className="bundle-add-to-cart">
            <div className="bundle-quantity">
              <button
                className="bundle-dec"
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
              <span className="bundle-counter">{quantity}</span>
              <button
                className="bundle-inc"
                onClick={() => {
                  if (quantity === bundleMaxQuantity) {
                    return;
                  }

                  setQuantity((prev) => prev + 1);
                }}
              >
                <CiSquarePlus />
              </button>
            </div>
            <button
              className="btn-primary "
              onClick={() => addProductToCart(bundleId, quantity)}
            >
              Add To Cart
            </button>
            <button
              className="product-wishlist"
              onClick={() => setWishlist((prev) => !prev)}
            >
              {wishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <div className="bundle-share">
            <i>Share with your friends</i>
            <div className="bundle-share-links">
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

export default BundleDetail;
