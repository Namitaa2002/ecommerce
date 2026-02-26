import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ cartCount }) {

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm py-3 bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-warning" to="/">
          OMNIMART
        </Link>

        <div className="ms-auto d-flex align-items-center gap-4">

          <Link to="/" className="nav-link text-light">
            Home
          </Link>

          <Link to="/my-orders" className="nav-link text-light">
            My Orders
          </Link>

          <Link to="/cart" className="position-relative text-light">
            🛍
            <span className="position-absolute top-0 start-100 translate-middle badge bg-warning text-dark">
              {cartCount}
            </span>
          </Link>

          {/* ✅ Conditional Login / Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn btn-warning btn-sm fw-semibold"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-warning btn-sm fw-semibold">
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;