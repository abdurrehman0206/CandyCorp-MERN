import React, { useState, useLayoutEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
function Orders() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    const getOrders = async () => {
      
      if (user) {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/orders/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        if (json.success) {
          setOrders(json.data);
          console.log(
            "🚀 ~ file: Orders.jsx:25 ~ getOrders ~ data:",
            json.data
          );
        } else {
          console.log(json.error);
        }
      }
    };
    getOrders();
  }, [user]);
  // const orders = [
  //   {
  //     id: 1,
  //     date: "2020-01-01",
  //     status: "in-progress",
  //     total: 100,
  //   },
  //   {
  //     id: 2,
  //     date: "2020-01-01",
  //     status: "cancelled",
  //     total: 100,
  //   },
  //   {
  //     id: 3,
  //     date: "2020-01-01",
  //     status: "shipped",
  //     total: 100,
  //   },
  //   {
  //     id: 4,
  //     date: "2020-01-01",
  //     status: "delivered",
  //     total: 100,
  //   },
  // ];

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <p>
          Looks like you haven't indulged in Candy Corp's sweetness yet. Time to
          explore our delectable treats!
        </p>
      </div>
    );
  }
  return (
    <div className="Orders-wrapper">
      <div className="Orders">
        {orders.map((order) => (
          <div key={order.id} className="Order-content">
            <h4>{order._id}</h4>
            <div className="order-status">
              <span className={`order-status-pil ${order.status}`}>
                {order.status}
              </span>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="view-order">
              <button className="view-order-btn">View Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
