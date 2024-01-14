import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useAddToCart } from "../../hooks/useAddToCart";
function ProductCard(props) {
  const nav = useNavigate();
  const { addProductToCart } = useAddToCart();
  return (
    <div className="product-card-container">
      <div className="product-card">
        <div
          className="product-card-header"
          onClick={() => nav(`/products/${props._id}`)}
        >
          <div className="product-card-badge-header">
            {props.quantity > 0 ? (
              <span className="product-card-stock-badge instock">
                {props.quantity} IN STOCK
              </span>
            ) : (
              <span className="product-card-stock-badge outofstock">
                Out Of Stock
              </span>
            )}

            <span className="product-card-likes-badge">
              {props.likes?.length} <AiFillHeart />
            </span>
            <span className="product-card-bundle-quantity-badge" id="bd-quan">
              {props?.inBundleQuan ? `${props?.inBundleQuan} IN BUNDLE ` : null}
            </span>
          </div>
          <img src={props.images[0]} alt={props.name + props.description} />
        </div>
        <div className="product-card-info">
          <h1 className="product-card-name">{props.name}</h1>
          <div className="product-card-price">
            <p className={props.onSale ? "onSale" : ""}>{props.price} CAD</p>
            {props.onSale && (
              <>
                <small>
                  {(props.price * ((100 - props.salePercentage) / 100)).toFixed(
                    2
                  )}{" "}
                  CAD
                </small>
                <small className="product-card-sale">On Sale</small>
              </>
            )}
          </div>
        </div>
        <div className="product-card-action">
          <button
            className="btn-box-primary"
            onClick={() => addProductToCart(props._id)}
            disabled={props.quantity > 0 ? false : true}
          >
            {props.quantity > 0 ? "Add To Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
