import React from "react";
function Orders() {
  const orders = [
    {
      id: 1,
      date: "2020-01-01",
      status: "in-progress",
      total: 100,
    },
    {
      id: 2,
      date: "2020-01-01",
      status: "canceled",
      total: 100,
    },
    {
      id: 3,
      date: "2020-01-01",
      status: "shipped",
      total: 100,
    },
    {
      id: 4,
      date: "2020-01-01",
      status: "delivered",
      total: 100,
    },
  ];
  return (
    <div className="Orders-wrapper">
      <div className="Orders">
        {orders.map((order) => (
          <div key={order.id} className="Order-content">
            <h3>Order # {order.id}</h3>
            <div className="order-status">
              <div className={`order-status-dot ${order.status}`}></div>

              <p>
                {order.status}, {order.date}
              </p>
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
