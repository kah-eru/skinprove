import { useState } from 'react'
import { Link, ArrowLeft, Search, Filter, ShoppingCart, Heart, Star, Leaf } from 'lucide-react'

// Simple product data for now
const products = [
  {
    id: 1,
    name: "CeraVe Foaming Facial Cleanser",
    brand: "CeraVe",
    price: 14.99,
    rating: 4.6,
    reviews: 125000,
    image: "https://m.media-amazon.com/images/I/71QKQf4qGCL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Cleanser",
    prime: true
  },
  {
    id: 2,
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    price: 12.90,
    rating: 4.4,
    reviews: 89000,
    image: "https://m.media-amazon.com/images/I/71QKQf4qGCL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Serum",
    prime: true
  },
  {
    id: 3,
    name: "Neutrogena Hydro Boost Water Gel",
    brand: "Neutrogena",
    price: 19.97,
    rating: 4.5,
    reviews: 156000,
    image: "https://m.media-amazon.com/images/I/71QKQf4qGCL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Moisturizer",
    prime: true
  },
  {
    id: 4,
    name: "La Roche-Posay Toleriane Double Repair",
    brand: "La Roche-Posay",
    price: 22.99,
    rating: 4.7,
    reviews: 234000,
    image: "https://m.media-amazon.com/images/I/71QKQf4qGCL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Moisturizer",
    prime: true
  },
  {
    id: 5,
    name: "Paula's Choice 2% BHA Liquid Exfoliant",
    brand: "Paula's Choice",
    price: 32.00,
    rating: 4.6,
    reviews: 178000,
    image: "https://m.media-amazon.com/images/I/71QKQf4qGCL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Treatment",
    prime: true
  },
  {
    id: 6,
    name: "EltaMD UV Clear Broad-Spectrum SPF 46",
    brand: "EltaMD",
    price: 39.00,
    rating: 4.8,
    reviews: 89000,
    image: "https://m.media-amazon.com/images/I/71QKQf4qGCL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Sunscreen",
    prime: true
  }
]

const categories = ["All", "Cleanser", "Serum", "Moisturizer", "Treatment", "Sunscreen"]

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('rating')

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviews - a.reviews
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-peach-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-peach-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 py-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-peach-600 to-peach-800 bg-clip-text text-transparent">
                SkinProve
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="btn-secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Skincare Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through our curated collection of premium skincare products. 
            Filter by category, price, and ratings to find exactly what you need.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="reviews">Sort by Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Product+Image'
                  }}
                />
                {product.prime && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Prime
                  </div>
                )}
                <button className="absolute top-2 left-2 p-2 bg-white/80 hover:bg-white rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <p className="text-sm text-peach-600 font-medium">{product.brand}</p>
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">{product.name}</h3>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-peach-100 text-peach-700 text-sm rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-peach-600">
                    ${product.price}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-peach-600 hover:bg-peach-50 rounded-lg transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button className="bg-peach-500 hover:bg-peach-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default ProductSearch
