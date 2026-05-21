import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Luxury Lipstick Set",
    price: 49.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Organic Face Cream",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    badge: "Sale",
  },
  {
    id: 3,
    name: "Volumizing Mascara",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38f96ca",
    badge: "New",
  },
  {
    id: 4,
    name: "Matte Foundation",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 321,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    badge: "",
  },
];

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-xs font-semibold ${
            product.badge === "Best Seller"
              ? "bg-yellow-400 text-yellow-900"
              : product.badge === "Sale"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
          }`}
        >
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="bg-white text-pink-600 p-2 rounded-full hover:bg-pink-600 hover:text-white transition">
            <FaShoppingCart />
          </button>
          <button className="bg-white text-pink-600 p-2 rounded-full hover:bg-pink-600 hover:text-white transition">
            <FaHeart />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviews} reviews)
          </span>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2 hover:text-pink-600 transition">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-pink-600">
            LKR{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            LKR{product.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-pink-600 font-semibold mb-2">Featured Products</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Best Selling Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved products that customers can't stop talking
            about
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
