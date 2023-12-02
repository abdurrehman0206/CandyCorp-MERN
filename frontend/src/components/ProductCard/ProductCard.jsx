import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useAuthContext } from "../../hooks/useAuthContext";
function ProductCard(props) {
  const nav = useNavigate();
  const { user, dispatch } = useAuthContext();
  const addProductToCart = async (productId) => {
    if (!user) {
      console.log("User not logged in");
      return;
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ productId, quantity: 1 }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch({ type: "ADD_TO_CART", payload: json.data });
      } else {
        console.log(json.error);
      }
    }
  };
  return (
    <div className="product-card-container">
      <div className="product-card">
        <div
          className="product-card-header"
          onClick={() => nav(`${props._id}`)}
        >
          <img src={props.images[0]} alt={props.name + props.description} />
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
        <div className="product-card-info">
          <h1>{props.name}</h1>
          <div className="product-card-price">
            <p className={props.onSale ? "onSale" : ""}>{props.price} CAD</p>
            {props.onSale && (
              <>
                <small>
                  {props.price * ((100 - props.salePercentage) / 100)} CAD
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
