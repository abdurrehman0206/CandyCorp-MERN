import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAddToCart } from "../../hooks/useAddToCart";
function ProductCard(props) {
  const nav = useNavigate();

  const { user, dispatch } = useAuthContext();
  const { addProductToCart } = useAddToCart();

  return (
    <div className="product-card-container">
      <div className="product-card">
        <div
          className="product-card-header"
          onClick={() => nav(`/products/${props._id}`)}
        >
          <div className="product-card-badge-header">
            <span className="product-card-stock-badge instock">
              {props.quantity} IN STOCK
            </span>
            {/* <span className="product-card-stock-badge outofstock">
            Out Of Stock
          </span> */}
            <span className="product-card-likes-badge">
              0 <AiFillHeart />
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
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
