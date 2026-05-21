import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCustomerAuth } from "../../context/CustomerAuthContext"; // Fixed import path

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated, addToCart } = useCustomerAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // Save the current page to redirect back after login
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/customer/login");
    } else {
      addToCart(product);
    }
  };

  const imageUrl = product.image_url
    ? `http://localhost:8000/storage/${product.image_url}`
    : null;

  return (
    <div
      className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden h-64"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.item_name || "Product"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}

        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={handleAddToCart}
            className="bg-white text-pink-600 p-2 rounded-full hover:bg-pink-600 hover:text-white transition"
          >
            <FaShoppingCart size={18} />
          </button>
          <button className="bg-white text-pink-600 p-2 rounded-full hover:bg-pink-600 hover:text-white transition">
            <FaHeart size={18} />
          </button>
        </div>
      </Link>

      <div className="p-4">
        {product.category_name && (
          <span className="text-xs text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
            {product.category_name}
          </span>
        )}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mt-2 mb-1 hover:text-pink-600 transition line-clamp-2">
            {product.item_name || "Unnamed Product"}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-pink-600">
            LKR {parseFloat(product.list_price || 0).toLocaleString()}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
