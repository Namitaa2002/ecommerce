import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  console.log("MyOrders Page Loaded");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/orders/my/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      const data = await response.json();
      console.log("Orders:", data);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchOrders();
}, []);


const getProgressWidth = (status) => {
  if (status === "Pending") return "33%";
  if (status === "Shipped") return "66%";
  if (status === "Delivered") return "100%";
  return "0%";
};
  
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">My Orders</h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-dark"></div>
        </div>
      ) : orders.length === 0 ? (
        <h5>No orders yet</h5>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card p-4 mb-4 shadow">
            <div className="d-flex justify-content-between">
              <h5>Order #{order.id}</h5>
              <span className="badge bg-dark">
                {order.status}
              </span>
            </div>

            <p className="text-muted">
              {new Date(order.created_at).toLocaleString()}
            </p>

            <hr />

          {/*  Order Tracking */}
<div className="mt-3">
  <div className="progress" style={{ height: "8px" }}>
    <div
      className="progress-bar bg-success"
      role="progressbar"
      style={{ width: getProgressWidth(order.status) }}
    ></div>
  </div>

  <div className="d-flex justify-content-between mt-2 small">
    <span
      className={order.status === "Pending" ? "fw-bold" : ""}
    >
      Pending
    </span>
    <span
      className={
        order.status === "Shipped" ||
        order.status === "Delivered"
          ? "fw-bold"
          : ""
      }
    >
      Shipped
    </span>
    <span
      className={
        order.status === "Delivered"
          ? "fw-bold"
          : ""
      }
    >
      Delivered
    </span>
  </div>
</div>

            {order.items.map((item, index) => (
              <div
                key={index}
                className="d-flex justify-content-between"
              >
                <span>
                  Product ID: {item.product} × {item.quantity}
                </span>
                <span>₹ {item.price * item.quantity}</span>
              </div>
            ))}

            <hr />

            <h6 className="text-end">
              Total: ₹ {order.total}
            </h6>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;