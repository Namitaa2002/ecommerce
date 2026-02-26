import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Cart({ cart, setCart, removeFromCart }) {

  // Increase quantity
  const increaseQty = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQty = (index) => {
    const updatedCart = [...cart];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-warning fw-bold">Your Cart is Empty 🛒</h2>
        <Link to="/" className="btn btn-dark mt-4">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center text-warning fw-bold mb-5">
        Shopping Cart
      </h2>

      <div className="row">
        <div className="col-lg-8">
          {cart.map((item, index) => (
            <motion.div
              key={index}
              className="card p-4 mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                
                <div className="d-flex align-items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />

                  <div>
                    <h4 className="fw-bold">{item.name}</h4>
                    <p className="text-muted mb-2">₹ {item.price}</p>

                    <div className="d-flex align-items-center gap-3">
                      <button
  className="quantity-btn"
  onClick={() => decreaseQty(item.id)}
>
  −
</button>

<span className="mx-3 fw-bold">{item.quantity}</span>

<button
  className="quantity-btn"
  onClick={() => increaseQty(item.id)}
>
  +
</button>
                    </div>
                  </div>
                </div>

                <div className="text-end mt-3 mt-lg-0">
                  <h4 className="text-warning fw-bold">
                    ₹ {item.price * item.quantity}
                  </h4>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="btn btn-danger btn-sm mt-2"
                  >
                    Remove
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card p-4">
            <h4 className="fw-bold">Order Summary</h4>
            <hr />

            <h3 className="text-warning fw-bold">
              Total: ₹ {totalPrice}
            </h3>

            <Link to="/checkout">
              <button className="btn btn-dark w-100 mt-3">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;