import { Link } from 'react-router-dom'

export default function PromoBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 py-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get 20% Off Your First Order
        </h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter and receive exclusive offers, beauty tips, and early access to new products
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="px-6 py-3 rounded-full w-80 focus:outline-none"
          />
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  )
}