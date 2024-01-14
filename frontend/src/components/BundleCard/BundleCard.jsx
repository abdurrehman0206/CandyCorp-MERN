import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAddToCart } from "../../hooks/useAddToCart";

function BundleCard(props) {
  const nav = useNavigate();

  const { user, dispatch } = useAuthContext();
  const { addProductToCart } = useAddToCart();

  return (
    <div className="bundle-card-container">
      <div className="bundle-card">
        <div
          className="bundle-card-header"
          onClick={() => nav(`/bundles/${props._id}`)}
        >
          <div className="bundle-card-badge-header">
            <span className="product-card-stock-badge instock">
              {props.quantity} IN STOCK
            </span>
            <span className="bundle-card-likes-badge">
              {props.likes.length} <AiFillHeart />
            </span>
          </div>

          <img src={props.images[0]} alt={`${props.name} Bundle`} />
        </div>
        <div className="bundle-card-info">
          <h1 className="bundle-card-name">{props.name}</h1>
          <div className="bundle-card-price">
            <p className={props.onSale ? "onSale" : ""}>{props.price} CAD</p>
            {props.onSale && (
              <>
                <small>
                  {(props.price * ((100 - props.salePercentage) / 100)).toFixed(
                    2
                  )}{" "}
                  CAD
                </small>
                <small className="bundle-card-sale">On Sale</small>
              </>
            )}
          </div>
        </div>
        <div className="bundle-card-action">
          <button
            className="btn-box-primary"
            onClick={() => addProductToCart(props._id)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BundleCard;
