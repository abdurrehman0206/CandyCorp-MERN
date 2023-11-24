import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
function ProductCard(props) {
  const nav = useNavigate();
  return (
    <div className="product-card-container" onClick={() => nav(`${props._id}`)}>
      <div className="product-card">
        <div className="product-card-header">
          <img src={props.images[0]} alt={props.name + props.description} />
          <span className="product-card-stock-badge instock">IN STOCK</span>
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
          <button className="btn-box-primary">Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
