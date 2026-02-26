import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">

          {/* Brand */}
          <div className="col-md-4">
            <h5 className="fw-bold">OMNIMART</h5>
            <p>Your one-stop shop for all daily needs.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">

              <li className="mb-2">
                <Link 
                  to="/" 
                  className="text-white text-decoration-none"
                >
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link 
                  to="/cart" 
                  className="text-white text-decoration-none"
                >
                  Cart
                </Link>
              </li>

              <li className="mb-2">
                <Link 
                  to="/my-orders" 
                  className="text-white text-decoration-none"
                >
                  My Orders
                </Link>
              </li>

              <li className="mb-2">
                <Link 
                  to="/login" 
                  className="text-white text-decoration-none"
                >
                  Login
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4">
            <h6 className="fw-bold">Contact</h6>
            <p>Email: support@omnimart.com</p>
            <p>Phone: +91 9876543210</p>
          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center">
          © 2026 OMNIMART. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;