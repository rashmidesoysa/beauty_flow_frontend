import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaMinus,
  FaPlus,
  FaHeart,
  FaSpinner,
} from "react-icons/fa";
import { shopService } from "../api/shop";
import { useCustomerAuth } from "../context/CustomerAuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, addToCart } = useCustomerAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await shopService.getItemDetails(id);
        console.log("Product Details:", response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/customer/login");
    } else {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-pink-600 text-5xl" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-24 pb-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error || "Product not found"}</p>
          <Link
            to="/shop"
            className="mt-4 inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = product.image_url
    ? `http://localhost:8000/storage/${product.image_url}`
    : null;

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product Images */}
            <div>
              <div className="rounded-lg overflow-hidden mb-4 bg-gray-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.item_name}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  {product.category_name || "Uncategorized"}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                  {product.item_name}
                </h1>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold text-pink-600">
                  LKR {parseFloat(product.list_price || 0).toLocaleString()}
                </span>
                {product.cost_price &&
                  parseFloat(product.cost_price) >
                    parseFloat(product.list_price) && (
                    <>
                      <span className="text-gray-400 line-through ml-2">
                        LKR {parseFloat(product.cost_price).toLocaleString()}
                      </span>
                      <span className="ml-2 text-green-600 text-sm font-semibold">
                        Save{" "}
                        {Math.round(
                          ((parseFloat(product.cost_price) -
                            parseFloat(product.list_price)) /
                            parseFloat(product.cost_price)) *
                            100,
                        )}
                        %
                      </span>
                    </>
                  )}
              </div>

              <p className="text-gray-600 mb-6">
                {product.description ||
                  "No description available for this product."}
              </p>

              <div className="mb-6">
                <span className="text-sm font-semibold text-green-600">
                  ✓ In Stock
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
                >
                  Add to Cart
                </button>
                <button className="px-6 py-3 border border-pink-600 text-pink-600 rounded-lg font-semibold hover:bg-pink-50 transition flex items-center gap-2">
                  <FaHeart />
                  Wishlist
                </button>
              </div>

              {/* Product Details */}
              <div className="border-t pt-4 space-y-2">
                {product.item_code && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Item Code:</span>
                    <span className="text-sm text-gray-800">
                      {product.item_code}
                    </span>
                  </div>
                )}
                {product.brand_name && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Brand:</span>
                    <span className="text-sm text-gray-800">
                      {product.brand_name}
                    </span>
                  </div>
                )}
                {product.category_name && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="text-sm text-gray-800">
                      {product.category_name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
