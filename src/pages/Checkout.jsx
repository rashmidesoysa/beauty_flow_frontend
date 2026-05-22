import { Link } from "react-router-dom";

export default function Checkout() {
  const cartItems = [
    { id: 1, name: "Luxury Lipstick Set", price: 49.99, quantity: 2 },
    { id: 2, name: "Organic Face Cream", price: 39.99, quantity: 1 },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT - FORM */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-6">
              Billing Details
            </h2>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="border p-3 rounded"
                placeholder="First Name"
              />
              <input
                className="border p-3 rounded"
                placeholder="Last Name"
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="border p-3 rounded"
                placeholder="Email"
              />
              <input
                className="border p-3 rounded"
                placeholder="Phone Number"
              />
            </div>

            {/* Address */}
            <input
              className="border p-3 rounded w-full mb-4"
              placeholder="Street Address"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input className="border p-3 rounded" placeholder="City" />
              <input className="border p-3 rounded" placeholder="State" />
              <input className="border p-3 rounded" placeholder="ZIP" />
            </div>

            {/* Payment */}
            <h2 className="text-xl font-semibold mb-4 mt-6">
              Payment Method
            </h2>

            <label className="flex items-center gap-2 mb-2">
              <input type="radio" name="payment" />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2 mb-4">
              <input type="radio" name="payment" />
              Card Payment
            </label>

            {/* Place Order */}
            <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700">
              Place Order
            </button>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2 text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>{shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mt-3">
              <span>Total</span>
              <span className="text-pink-600">
                {total.toFixed(2)}
              </span>
            </div>

            <Link to="/cart">
              <p className="text-pink-600 text-sm mt-4 hover:underline">
                ← Back to Cart
              </p>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}