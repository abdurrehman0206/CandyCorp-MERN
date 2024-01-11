import React, { useState, useLayoutEffect } from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import { useAuthContext } from "../../hooks/useAuthContext";
function Cart() {
  const { user, dispatch } = useAuthContext();
  const [cartItems, setCartItems] = useState(null);
  const [bill, setBill] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
  });
  useLayoutEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        console.log("User not logged in");
        return;
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users/get-cart`,
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
          setCartItems(json.data);
          let subTotal = 0;
          json.data.forEach((item) =>
            !item.productId.onSale
              ? (subTotal += item.productId.price * item.quantity)
              : (subTotal +=
                  item.productId.price *
                  ((100 - item.productId.salePercentage) / 100) *
                  item.quantity)
          );
          setBill((prevBill) => ({ ...prevBill, subtotal: subTotal }));
        } else {
          console.log(json.error);
        }
      }
    };
    fetchCart();
  }, [user]);
  const removeItemFromCart = async (productId) => {
    if (!user) {
      console.log("User not logged in");
      return;
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/remove-from-cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (json.success) {
        if (json.data) {
          dispatch({ type: "REMOVE_FROM_CART", payload: json.data });
        } else {
          console.log("Cart items data is undefined");
        }
      } else {
        console.log(json.error);
      }
    }
  };

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
          {cartItems &&
            cartItems.map((item, i) => {
              return (
                <div className="cart-item-container" key={i}>
                  <div className="product-image-container">
                    <img
                      src={
                        (item.productId.images && item.productId.images[0]) ||
                        ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="item-name">
                    <h4>{item.productId.name}</h4>
                    {item.productId.onSale ? (
                      <span>
                        {item.productId.price *
                          ((100 - item.productId.salePercentage) / 100)}{" "}
                        CAD
                      </span>
                    ) : (
                      <span>{item.productId.price} CAD</span>
                    )}
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
                    {item.productId.onSale ? (
                      <span>
                        {item.productId.price *
                          ((100 - item.productId.salePercentage) / 100) *
                          item.quantity}{" "}
                        CAD
                      </span>
                    ) : (
                      <span>{item.productId.price * item.quantity} CAD</span>
                    )}
                  </div>
                  <button
                    className="item-delete-btn"
                    onClick={() => removeItemFromCart(item.productId._id)}
                  >
                    <AiTwotoneDelete />
                  </button>
                </div>
              );
            })}
        </div>
        <div className="cart-summary">
          <h4>Summary</h4>
          <ul>
            <li>
              Subtotal <span>{bill.subtotal} CAD</span>
            </li>
            <li>
              Taxes <span>{bill.tax} CAD</span>
            </li>
            <li>
              Shipping <span>{bill.shipping} CAD</span>
            </li>
            <br />
            <hr />

            <li>
              Total <span>{bill.subtotal + bill.shipping + bill.tax} CAD</span>
            </li>
          </ul>
          <button className="btn-box-primary checkout-btn">Check Out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
