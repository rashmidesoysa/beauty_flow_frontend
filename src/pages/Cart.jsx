import { Link } from 'react-router-dom'
import { FaTrash, FaShoppingBag } from 'react-icons/fa'

export default function Cart() {
  const cartItems = [
    { id: 1, name: 'Luxury Lipstick Set', price:49.99, quantity: 2, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa' },
    { id: 2, name: 'Organic Face Cream', price: 39.99, quantity: 1, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03' },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <FaShoppingBag className="text-gray-400 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
            <Link to="/shop" className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-t items-center">
                    <div className="md:col-span-6 flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <button className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <FaTrash size={12} /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-2 text-center">
                      <span className="text-gray-600">{item.price}</span>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-center gap-2">
                        <button className="w-8 h-8 border rounded hover:bg-gray-50">-</button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button className="w-8 h-8 border rounded hover:bg-gray-50">+</button>
                      </div>
                    </div>
                    <div className="md:col-span-2 text-center font-semibold text-gray-800">
                     {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-800">{shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-pink-600">{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link to="/checkout">
                  <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition">
                    Proceed to Checkout
                  </button>
                </Link>
                <Link to="/shop" className="block text-center text-pink-600 mt-4 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}