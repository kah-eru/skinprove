import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Star, Leaf, User, Bell, Settings, PlusCircle } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { allProducts, Product } from '../data/products';

const categories = ['All', 'Cleanser', 'Serum', 'Moisturizer', 'Exfoliant', 'Sunscreen'];

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-peach-100">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-peach-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-peach-600 to-peach-800 bg-clip-text text-transparent">
                SkinProve
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-peach-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <Link to="/profile" className="p-2 text-gray-600 hover:text-peach-600 transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
              <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Skincare Shop</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium skincare products curated by experts. Find the perfect products for your skin type and routine.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products, brands, or ingredients..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-peach-600 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-peach-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
             <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
             <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="card flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        <button
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 text-peach-600 hover:bg-peach-500 hover:text-white transition-colors"
          aria-label="Add to my products"
          // TODO: Implement add to my products functionality
          onClick={() => alert(`Adding ${product.name} to your shelf!`)}
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-lg font-semibold text-gray-900 truncate mt-1">{product.name}</h3>
        <p className="text-sm text-gray-600 flex-grow mt-1">{product.description.substring(0, 60)}...</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-peach-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};