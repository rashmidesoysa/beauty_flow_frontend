import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FaShoppingBag, 
  FaSearch, 
  FaUser, 
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHeart
} from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <FaShoppingBag className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Beauty Flow
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 hover:text-pink-600 transition font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-pink-600 transition">
                <FaSearch size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-pink-600 transition relative">
                <FaHeart size={20} />
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="p-2 text-gray-600 hover:text-pink-600 transition"
              >
                <FaUser size={20} />
              </button>
              <button 
                onClick={() => navigate('/cart')}
                className="relative bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition flex items-center gap-2"
              >
                <FaShoppingCart size={18} />
                <span className="text-sm font-semibold">${cartCount}</span>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`} style={{ top: '60px' }}>
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-pink-600 transition font-medium py-2 border-b"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-pink-600 text-white py-2 rounded-full">Login</button>
            <button className="flex-1 border-2 border-pink-600 text-pink-600 py-2 rounded-full">Register</button>
          </div>
        </div>
      </div>
    </>
  )
}