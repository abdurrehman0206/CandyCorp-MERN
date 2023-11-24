import React from "react";
import Candy from "../../assets/candy.jpeg";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
function Cart() {
  const items = [
    {
      name: "Bublix",
      image: Candy,
      price: 14,
      quantity: 1,
    },
    {
      name: "Bublix",
      image: Candy,
      price: 14,
      quantity: 1,
    },
    {
      name: "Bublix",
      image: Candy,
      price: 14,
      quantity: 1,
    },
    {
      name: "Bublix",
      image: Candy,
      price: 14,
      quantity: 1,
    },
  ];
  return (
    <div className="cart-wrapper">
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-header">
            <span>Product</span>
            <span></span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>
          {items.map((item) => {
            return (
              <div className="cart-item-container">
                <div className="product-image-container">
                  <img src={item.image} alt="product-image" />
                </div>
                <div className="item-name">
                  <h4>{item.name}</h4>
                  <span>${item.price}</span>
                </div>
                <div className="item-quantity">
                  <button>
                    <CiSquareMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button>
                    <CiSquarePlus />
                  </button>
                </div>
                <div className="item-total">
                  <span>$560</span>
                </div>
                <button className="item-delete-btn">
                  <AiTwotoneDelete />
                </button>
              </div>
            );
          })}
        </div>
        <div className="cart-summary"></div>
      </div>
    </div>
  );
}

export default Cart;
