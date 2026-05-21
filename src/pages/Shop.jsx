import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaTh, FaThList, FaTimes, FaSpinner } from "react-icons/fa";
import { shopService } from "../api/shop";
import ProductCard from "../components/shop/ProductCard";

export default function Shop() {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);

  // Filters
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  // Fetch items with filters
  const fetchItems = async () => {
    try {
      setFiltering(true);
      setLoading(true);

      const params = {};

      // Add category filter
      if (selectedCategory && selectedCategory !== "") {
        params.category = selectedCategory;
      }

      // Add search filter
      if (searchTerm && searchTerm.trim() !== "") {
        params.search = searchTerm.trim();
      }

      // Add sort
      if (sortBy) {
        params.sort = sortBy;
      }

      console.log("Fetching items with params:", params);

      const response = await shopService.getItems(params);
      console.log("API Response:", response.data);

      if (response.data && response.data.success && response.data.data) {
        setItems(response.data.data);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    } finally {
      setLoading(false);
      setFiltering(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await shopService.getCategories();
      console.log("Categories Response:", response.data);

      if (response.data && response.data.success && response.data.data) {
        setCategories(response.data.data);
      } else if (response.data && response.data.data) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch items when filters change
  useEffect(() => {
    fetchItems();
  }, [selectedCategory, searchTerm, sortBy]);

  // Update active filters display
  useEffect(() => {
    const filters = [];

    if (selectedCategory) {
      const category = categories.find((c) => c.id == selectedCategory);
      if (category) {
        filters.push({
          type: "category",
          label: `Category: ${category.name}`,
          value: selectedCategory,
        });
      }
    }

    if (searchTerm) {
      filters.push({
        type: "search",
        label: `Search: "${searchTerm}"`,
        value: searchTerm,
      });
    }

    setActiveFilters(filters);
  }, [selectedCategory, searchTerm, categories]);

  // Remove filter
  const removeFilter = (filter) => {
    if (filter.type === "category") {
      setSelectedCategory("");
    }
    if (filter.type === "search") {
      setSearchTerm("");
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory("");
    setSearchTerm("");
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowMobileFilters(false);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is already triggered by searchTerm change
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Shop
          </h1>
          <p className="text-gray-600">
            Discover our premium collection of beauty products
          </p>
          {filtering && (
            <div className="mt-2 text-sm text-pink-600">
              <FaSpinner className="inline animate-spin mr-1" /> Updating
              results...
            </div>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={14} />
              </button>
            )}
          </div>
        </form>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
              >
                {filter.label}
                <button
                  onClick={() => removeFilter(filter)}
                  className="hover:text-pink-900"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-pink-600"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-2 text-gray-700"
            >
              <FaFilter className="text-gray-500" />
              <span className="text-sm font-medium">Filters</span>
            </button>

            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <FaFilter className="text-gray-500" />
              <span className="text-sm font-medium">Categories:</span>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    !selectedCategory
                      ? "bg-pink-100 text-pink-600"
                      : "hover:bg-pink-50 text-gray-600"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      selectedCategory == category.id
                        ? "bg-pink-100 text-pink-600"
                        : "hover:bg-pink-50 text-gray-600"
                    }`}
                  >
                    {category.name} ({category.items_count || 0})
                  </button>
                ))}
              </div>
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
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="flex gap-2 border-l pl-4">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-pink-100 text-pink-600" : "text-gray-400"}`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-pink-100 text-pink-600" : "text-gray-400"}`}
              >
                <FaThList />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters Sidebar */}
        {showMobileFilters && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 p-6 overflow-y-auto md:hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleCategoryChange("");
                      setShowMobileFilters(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg ${!selectedCategory ? "bg-pink-50 text-pink-600" : "hover:bg-gray-50"}`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        handleCategoryChange(category.id);
                        setShowMobileFilters(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg ${selectedCategory == category.id ? "bg-pink-50 text-pink-600" : "hover:bg-gray-50"}`}
                    >
                      {category.name} ({category.items_count || 0})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Found {items.length} product{items.length !== 1 ? "s" : ""}
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-pink-600 text-4xl" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 text-pink-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition flex flex-col sm:flex-row"
              >
                <div className="sm:w-48 h-48">
                  {product.image_url ? (
                    <img
                      src={`http://localhost:8000/storage/${product.image_url}`}
                      alt={product.item_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-4">
                  <span className="text-xs text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                    {product.category_name}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 mt-2 hover:text-pink-600 transition">
                      {product.item_name}
                    </h3>
                  </Link>
                  {product.description && (
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-pink-600">
                      LKR {parseFloat(product.list_price || 0).toLocaleString()}
                    </span>
                    <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
