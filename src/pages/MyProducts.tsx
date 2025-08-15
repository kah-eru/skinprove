import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, X, Star, Droplets, FlaskConical, DollarSign, CalendarDays, BarChart3 } from 'lucide-react';

import { allProducts, Product as ShopProduct } from '../data/products';

// Extend the shop product type to include user-specific data
type UserProduct = ShopProduct & {
  dateAdded: string;
  usage: {
    totalUses: number;
    frequency: string;
  };
};

// Simulate a user's shelf by taking some products from the main list
// and adding user-specific data to them.
const myUserProducts: UserProduct[] = allProducts.slice(0, 4).map((p, i) => ({
  ...p,
  dateAdded: `2023-0${i + 1}-15`,
  usage: {
    totalUses: 50 + i * 20,
    frequency: i % 2 === 0 ? 'Daily' : '3x a week',
  }
}));


const MyProducts = () => {
  const [products, setProducts] = useState<UserProduct[]>(myUserProducts);
  const [selectedProduct, setSelectedProduct] = useState<UserProduct | null>(null);

  return (
    <div className="relative min-h-screen bg-cream-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-peach-600">My Product Shelf</h1>
        <Link
          to="/shop"
          className="flex items-center bg-peach-500 hover:bg-peach-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          aria-label="Add new product"
        >
          <Plus className="w-6 h-6 mr-2" />
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-500">{product.brand}</p>
              <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
              <div className="mt-4 flex justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1 text-peach-500" />
                  <span>{product.usage.totalUses} uses</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1 text-peach-500" />
                  <span>{product.usage.frequency}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button - Kept for mobile or as an alternative */}
      <Link
        to="/shop"
        className="fixed bottom-8 right-8 bg-peach-500 hover:bg-peach-600 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110 lg:hidden"
        aria-label="Add new product"
      >
        <Plus className="w-8 h-8" />
      </Link>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg text-gray-600">{selectedProduct.brand}</p>
                  <h2 className="text-3xl font-bold text-peach-700">{selectedProduct.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 text-gray-500 hover:text-gray-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg shadow-md"/>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-3 text-peach-500" />
                    <span className="text-2xl font-semibold text-gray-800">${selectedProduct.price.toFixed(2)}</span>
                  </div>
                   <div className="flex items-center text-gray-700">
                    <Droplets className="w-5 h-5 mr-3 text-peach-500" />
                    <span>{selectedProduct.category}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <BarChart3 className="w-5 h-5 mr-3 text-peach-500" />
                    <span>{selectedProduct.usage.totalUses} uses ({selectedProduct.usage.frequency})</span>
                  </div>
                   <div className="flex items-center text-gray-700">
                    <CalendarDays className="w-5 h-5 mr-3 text-peach-500" />
                    <span>Added on {new Date(selectedProduct.dateAdded).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <FlaskConical className="w-5 h-5 mr-2 text-peach-600" />
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.ingredients.map((ing, index) => (
                    <span key={index} className="bg-cream-200 text-peach-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;