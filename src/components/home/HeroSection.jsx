import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay } from "react-icons/fa";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3"
          alt="Beauty background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="animate__animated animate__fadeInUp">
            <p className="text-pink-400 font-semibold mb-4">
              WELCOME TO BEAUTY FLOW
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Your{" "}
              <span className="text-pink-400">Natural Beauty</span>
            </h1>
            <p className="text-gray-200 text-lg mb-8">
              Explore our curated collection of premium beauty products. Quality
              ingredients, sustainable packaging, and results you'll love.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition flex items-center gap-2 group"
              >
                Shop Now
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </Link>
              {/* <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition flex items-center gap-2">
                <FaPlay size={14} />
                Watch Video
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
