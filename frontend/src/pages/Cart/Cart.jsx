import React, { useState, useLayoutEffect } from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import Spinner from "../../components/Common/Spinner";
import { useRemoveFromCart } from "../../hooks/useRemoveFromCart";
import { useUpdateItemInCart } from "../../hooks/useUpdateItemInCart";
function Cart() {
  const { removeItemFromCart } = useRemoveFromCart();
  const { updateItemInCart } = useUpdateItemInCart();

  const { user } = useAuthContext();
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
          json.data.forEach((item) => {
            if (item.type === "product") {
              !item.productId?.onSale
                ? (subTotal += item.productId?.price * item.quantity)
                : (subTotal +=
                    item.productId?.price *
                    ((100 - item.productId.salePercentage) / 100) *
                    item.quantity);
            } else if (item.type === "bundle") {
              let bundleSubtotal = item.bundleId.price;
              subTotal += bundleSubtotal;
            }
          });

          setBill((prevBill) => ({ ...prevBill, subtotal: subTotal }));
        } else {
          console.log(json.error);
        }
      }
    };
    fetchCart();
  }, [user]);

  const handleCheckout = async () => {
    try {
      const totalAmount = bill.subtotal + bill.shipping + bill.tax;

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/payment/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            amount: totalAmount,
            currency: "USD",
          }),
        }
      );

      const json = await response.json();

      if (json.success) {
        window.open(json.data.hosted_url, "_blank");
      } else {
        toast.error(json.error);
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
    }
  };
  if (!cartItems) {
    return <Spinner />;
  }
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
                    {item.type === "product" ? (
                      <img
                        src={
                          (item.productId?.images &&
                            item.productId?.images[0]) ||
                          ""
                        }
                        alt=""
                      />
                    ) : (
                      /* Render bundle image here */
                      <img
                        src={
                          (item.bundleId?.images && item.bundleId?.images[0]) ||
                          ""
                        }
                        alt=""
                      />
                    )}
                  </div>
                  <div className="item-name">
                    <h4>
                      {item.type === "product"
                        ? item.productId?.name
                        : item.bundleId?.name}
                    </h4>
                    {item.type === "product" ? (
                      <span>
                        {item.productId?.onSale ? (
                          <>
                            {(
                              item.productId?.price *
                              ((100 - item.productId?.salePercentage) / 100)
                            ).toFixed(2)}{" "}
                            CAD
                          </>
                        ) : (
                          <span>{item.productId?.price.toFixed(2)} CAD</span>
                        )}
                      </span>
                    ) : (
                      <span>{item.bundleId?.price.toFixed(2)} CAD</span>
                    )}
                  </div>
                  <div className="item-quantity">
                    <button
                      onClick={() => {
                        updateItemInCart(item._id, item.quantity - 1);
                      }}
                    >
                      <CiSquareMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        updateItemInCart(item._id, item.quantity + 1);
                      }}
                    >
                      <CiSquarePlus />
                    </button>
                  </div>
                  <div className="item-total">
                    {item.type === "product" ? (
                      <span>
                        {item.productId?.onSale ? (
                          <>
                            {(
                              item.productId.price *
                              ((100 - item.productId?.salePercentage) / 100) *
                              item.quantity
                            ).toFixed(2)}{" "}
                            CAD
                          </>
                        ) : (
                          <span>
                            {(item.productId?.price * item.quantity).toFixed(2)}{" "}
                            CAD
                          </span>
                        )}
                      </span>
                    ) : (
                      <span>
                        {item.productId?.onSale ? (
                          <>
                            {(
                              item.bundleId.price *
                              ((100 - item.productId?.salePercentage) / 100) *
                              item.quantity
                            ).toFixed(2)}{" "}
                            CAD
                          </>
                        ) : (
                          <span>
                            {(item.bundleId?.price * item.quantity).toFixed(2)}{" "}
                            CAD
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  <button
                    className="item-delete-btn"
                    onClick={() => removeItemFromCart(item._id)}
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
              Subtotal <span>{bill.subtotal.toFixed(2)} CAD</span>
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
              Total{" "}
              <span>
                {(bill.subtotal + bill.shipping + bill.tax).toFixed(2)} CAD
              </span>
            </li>
          </ul>
          <button
            className="btn-box-primary checkout-btn"
            onClick={handleCheckout}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
