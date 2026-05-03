import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaMinus, FaPlus, FaHeart, FaShare } from 'react-icons/fa'

export default function ProductDetail() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = {
    id: 1,
    name: 'Luxury Lipstick Set',
    price: 49.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviews: 234,
    description: 'This luxurious lipstick set includes 5 stunning shades that will complement any skin tone. Made with natural ingredients that keep your lips moisturized all day long.',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    ],
    inStock: true,
    category: 'Makeup',
    sku: 'BF-LIP-001'
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product Images */}
            <div>
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="flex gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-pink-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="text-sm text-gray-500">{product.category}</span>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStarHalfAlt className="text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-pink-600">${product.price}</span>
                <span className="text-gray-400 line-through ml-2">${product.originalPrice}</span>
                <span className="ml-2 text-green-600 text-sm font-semibold">Save 44%</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
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
                <button className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition">
                  Add to Cart
                </button>
                <button className="px-6 py-3 border border-pink-600 text-pink-600 rounded-lg font-semibold hover:bg-pink-50 transition flex items-center gap-2">
                  <FaHeart />
                  Wishlist
                </button>
              </div>

              {/* Product Details */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">SKU:</span>
                  <span className="text-sm text-gray-800">{product.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm text-gray-800">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}