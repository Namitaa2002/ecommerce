import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // track order submission
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Protect Page
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const orderData = {
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      total: totalAmount,
      items: cart.map((item) => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    setLoading(true); // start loading

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/orders/create/`, // use deployed backend
        orderData,
        {
          headers: {
            Authorization: Bearer ${token},
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Order Placed Successfully 🎉");
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/order-success");
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(
        error.response?.data?.detail || "Something went wrong"
      );
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <h5>Your cart is empty</h5>
      ) : (
        <div>
          {/* 📝 Customer Details */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-3"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            className="form-control mb-3"
            required
            value={formData.address}
            onChange={handleChange}
          ></textarea>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form-control mb-3"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <h5 className="mt-4">Order Summary</h5>
          {cart.map((item, index) => (
            <div key={index}>
              {item.name} × {item.quantity} = ₹ {item.price * item.quantity}
            </div>
          ))}

          <hr />
          <h4>Total: ₹ {totalAmount}</h4>

          <button
            onClick={handlePlaceOrder}
            className="btn btn-success mt-3 px-5 py-2 fw-bold"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;