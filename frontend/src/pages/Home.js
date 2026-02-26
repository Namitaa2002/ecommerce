import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel as BSC } from "bootstrap"; 

function Home({ addToCart, search }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const productsRef = useRef(null); 

  // Fetch products
  useEffect(() => {
    
      axios.get("https://ecommerce-3-ddlr.onrender.com/api/products/")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Initialize Bootstrap carousel
  useEffect(() => {
    const carouselEl = document.getElementById("homeCarousel");
    if (carouselEl) {
      new BSC(carouselEl, {
        interval: 3000, // 3 seconds per slide
        ride: "carousel",
      });
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div>

      {/* ================= HERO IMAGE CAROUSEL ================= */}
      <div id="homeCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
              className="d-block w-100"
              alt="Sale Banner"
              style={{ height: "450px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Mega Sale is Live 🔥</h2>
              <p>Up to 50% off on selected products</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              className="d-block w-100"
              alt="New Arrivals"
              style={{ height: "450px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">New Arrivals</h2>
              <p>Check out the latest products</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f" 
              className="d-block w-100"
              alt="Limited Offer"
              style={{ height: "450px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Limited Time Offers ⏳</h2>
              <p>Grab them before stock ends</p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= SALE STRIP ================= */}
      <div className="bg-danger text-white text-center py-2 fw-semibold">
        🚚 Free Delivery on Orders Above ₹499 | 🔁 Easy Returns | 💳 Secure Payments
      </div>

      {/* ================= SHOP BY CATEGORY ================= */}
      <div className="container my-5">
        <h2 className="fw-bold text-center mb-4">Shop By Category</h2>
        <div className="row text-center g-4">

          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                alt="Electronics"
              />
              <div className="card-body">
                <h6 className="fw-bold">Electronics</h6>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f" 
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                alt="Fashion"
              />
              <div className="card-body">
                <h6 className="fw-bold">Fashion</h6>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d"
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                alt="Home"
              />
              <div className="card-body">
                <h6 className="fw-bold">Home & Kitchen</h6>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6"
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                alt="Accessories"
              />
              <div className="card-body">
                <h6 className="fw-bold">Accessories</h6>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= SUPER SAVER SALE ================= */}
      <div className="container mb-5">
        <div className="bg-dark text-white text-center p-5 rounded shadow">
          <h2 className="fw-bold">Super Saver Weekend Sale 🎉</h2>
          <p>Extra 20% OFF on prepaid orders</p>
          {/* ✅ Shop Now scrolls to Featured Products */}
          <button
            className="btn btn-warning fw-bold px-4"
            onClick={() =>
              productsRef.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* ================= DEAL OF THE DAY ================= */}
<div className="container mb-5">
  <div className="bg-warning p-4 rounded shadow-sm d-flex justify-content-center align-items-center">
    <div className="text-center">
      <h3 className="fw-bold">🔥 Deal of the Day</h3>
      <p className="mb-0">Special discounts available only today!</p>
    </div>
  </div>
</div>

      {/* ================= PRODUCT SECTION ================= */}
      <div className="container pb-5" ref={productsRef}>
        <h2 className="fw-bold mb-4 text-center">Featured Products</h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-dark"></div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="card h-100 shadow-sm border-0">

                  <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none text-dark"
                  >
                    {product.image && (
                      <div className="text-center p-4">
                        <img
                        src={product.image}
                        alt={product.name}
                        style={{ height: "200px", objectFit: "contain" }}
                        className="img-fluid"
                        />
                      </div>
                    )}

                    <div className="card-body text-center pt-0">
                      <h6 className="fw-semibold mb-2">{product.name}</h6>

                      <p className="text-muted small mb-2">
                        {product.description?.substring(0, 60)}...
                      </p>

                      <h5 className="fw-bold text-success">₹ {product.price}</h5>
                    </div>
                  </Link>

                  <div className="px-4 pb-4">
                    <button
                      className="btn btn-dark w-100 py-2 fw-semibold"
                      onClick={() => addToCart({ ...product, quantity: 1 })}
                    >
                      Add to Cart
                    </button>
                  </div>

                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-5">
                <h5>No products found</h5>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default Home;