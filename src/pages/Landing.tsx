import { Link } from 'react-router-dom'
import { Calendar, ShoppingBag, User, Sparkles, Leaf, Shield, Star, Search } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-peach-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-peach-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-peach-600 to-peach-800 bg-clip-text text-transparent">
                SkinProve
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-peach-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-peach-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-peach-600 transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn-secondary">
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-peach-100 text-peach-700 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Transform Your Skincare Journey
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Track, Plan & Perfect
                <span className="block bg-gradient-to-r from-peach-500 to-peach-700 bg-clip-text text-transparent">
                  Your Skincare Routine
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Create personalized skincare routines, track your progress with photos, 
                and discover the perfect products for your skin type. Your journey to healthy skin starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary text-lg px-8 py-4 text-center">
                  Start Your Journey
                </Link>
                <button className="btn-secondary text-lg px-8 py-4">
                  Learn More
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-peach-500 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 text-peach-500 mr-1" />
                  <span>10K+ Users</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-peach-200 to-peach-400 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Today's Routine</h3>
                      <Calendar className="w-5 h-5 text-peach-500" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-peach-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">Gentle Cleanser</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-peach-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">Vitamin C Serum</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-peach-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">Moisturizer</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-peach-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">SPF 30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-cream-300 to-cream-400 rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-peach-300 to-peach-400 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Perfect Skin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines personalized routines, progress tracking, 
              and curated products to help you achieve your skincare goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Calendar</h3>
              <p className="text-gray-600">
                Plan your skincare routine with our intelligent calendar that prevents 
                ingredient conflicts and optimizes product order.
              </p>
            </div>
            
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Curated Shop</h3>
              <p className="text-gray-600">
                Discover carefully selected skincare products with affiliate links 
                and expert recommendations tailored to your skin type.
              </p>
            </div>
            
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600">
                Track your skin's improvement with photo comparisons, daily ratings, 
                and detailed progress analytics over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-peach-500 to-peach-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-xl text-peach-100 mb-8">
            Join thousands of users who have already started their skincare journey with SkinProve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-peach-600 hover:bg-cream-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Get Started Free
            </Link>
            <Link to="/shop" className="border-2 border-white text-white hover:bg-white hover:text-peach-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SkinProve</span>
              </div>
              <p className="text-gray-400">
                Your personal skincare journey starts here.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/calendar" className="hover:text-white transition-colors">Calendar</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkinProve. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}