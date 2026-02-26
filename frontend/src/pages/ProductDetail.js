import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${id}/`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-dark"></div>
      </div>
    );

  if (!product)
    return (
      <h3 className="text-center py-5 fw-bold">
        Product Not Found
      </h3>
    );

  return (
    <div className="container py-5">
      <div className="row align-items-center">

        {/* 🔥 PRODUCT IMAGE */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <div className="p-4 shadow rounded bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              style={{
                maxHeight: "400px",
                objectFit: "contain",
                transition: "0.3s ease"
              }}
            />
          </div>
        </div>

        {/* 🔥 PRODUCT DETAILS */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">
            {product.name}
          </h2>

          <h3 className="fw-bold text-dark mb-3">
            ₹ {product.price}
          </h3>

          <p className="text-muted mb-4">
            {product.description}
          </p>

          {/* 🔥 Quantity Selector */}
          <div className="d-flex align-items-center mb-4">
            <button
              className="btn btn-outline-dark px-3"
              onClick={() =>
                quantity > 1 && setQuantity(quantity - 1)
              }
            >
              −
            </button>

            <span className="mx-4 fw-semibold fs-5">
              {quantity}
            </span>

            <button
              className="btn btn-outline-dark px-3"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* 🔥 Add To Cart */}
          <button
            className="btn btn-dark px-5 py-2 fw-semibold"
            onClick={() =>
              addToCart({ ...product, quantity })
            }
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;