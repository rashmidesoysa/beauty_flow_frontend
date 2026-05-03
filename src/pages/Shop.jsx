import { useState } from 'react'
import { FaFilter, FaTh, FaThList, FaChevronDown } from 'react-icons/fa'

export default function Shop() {
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Shop</h1>
          <p className="text-gray-600">Discover our premium collection of beauty products</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <span className="text-sm font-medium">Filters</span>
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">All</button>
              <button className="px-3 py-1 hover:bg-pink-50 text-gray-600 rounded-full text-sm">Makeup</button>
              <button className="px-3 py-1 hover:bg-pink-50 text-gray-600 rounded-full text-sm">Skincare</button>
              <button className="px-3 py-1 hover:bg-pink-50 text-gray-600 rounded-full text-sm">Fragrances</button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            
            <div className="flex gap-2 border-l pl-4">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'}`}
              >
                <FaTh />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'}`}
              >
                <FaThList />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product cards will go here */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">Product Name</h3>
                <p className="text-pink-600 font-bold">$49.99</p>
                <button className="mt-3 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-pink-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}