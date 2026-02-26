import { Link } from "react-router-dom";
function ProductCard({ product, addToCart }) {
  return (
    <div className="col-md-3 mb-4">
  <div className="card h-100 shadow-sm border-0 product-card">
    <Link to={`/product/${product.id}`}>
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
    </Link>

    <div className="card-body text-center">
      <h6 className="fw-bold">{product.name}</h6>
      <p className="text-muted mb-2">{product.category}</p>
      <h5 className="text-warning fw-bold">₹ {product.price}</h5>

      <button
        className="btn btn-dark w-100 mt-2"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>
  );
}

export default ProductCard;