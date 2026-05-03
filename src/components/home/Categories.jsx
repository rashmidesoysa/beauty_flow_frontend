import { Link } from 'react-router-dom'
import { 
  FaPaintBrush, 
  FaEye, 
  FaHandHoldingHeart, 
  FaSpa,
  FaMagic,
  FaGem,
  FaLeaf
} from 'react-icons/fa'

const categories = [
  { name: 'Makeup', icon: FaPaintBrush, color: 'bg-pink-100 text-pink-600', count: 245 },
  { name: 'Skincare', icon: FaSpa, color: 'bg-green-100 text-green-600', count: 189 },
  { name: 'Fragrances', icon: FaGem, color: 'bg-purple-100 text-purple-600', count: 123 },
  { name: 'Natural', icon: FaLeaf, color: 'bg-orange-100 text-orange-600', count: 98 },
]

export default function Categories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-pink-600 font-semibold mb-2">Shop by Category</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore Our Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={`/shop?category=${category.name.toLowerCase()}`}
              className="group text-center"
            >
              <div className={`${category.color} w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon size={48} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} products</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}