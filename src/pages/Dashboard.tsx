import { Link } from 'react-router-dom'
import { Calendar, Camera, ShoppingBag, User, TrendingUp, Clock, CheckCircle, AlertCircle, Leaf, Bell, Settings, List } from 'lucide-react'
import { useState, useMemo } from 'react';

// This is a temporary mock data source.
const initialTodayRoutine = [
  { id: 1, name: 'Gentle Cleanser', time: 'Morning', completed: false },
  { id: 2, name: 'Vitamin C Serum', time: 'Morning', completed: false },
  { id: 3, name: 'Moisturizer', time: 'Morning', completed: false },
  { id: 4, name: 'SPF 30', time: 'Morning', completed: false },
  { id: 5, name: 'Retinol Serum', time: 'Evening', completed: false },
  { id: 6, name: 'Night Cream', time: 'Evening', completed: false },
];

const tomorrowRoutine = [
    { name: 'AHA Exfoliant', time: 'Tomorrow AM', conflict: true },
    { name: 'Hydrating Mask', time: 'Tomorrow PM', conflict: false },
]

export default function Dashboard() {
  const [todayRoutine, setTodayRoutine] = useState(initialTodayRoutine);

  const handleToggleComplete = (id: number) => {
    setTodayRoutine(prevRoutine =>
      prevRoutine.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const upcomingProducts = useMemo(() => {
    const morningIncomplete = todayRoutine.filter(item => item.time === 'Morning' && !item.completed);
    if (morningIncomplete.length > 0) {
      return morningIncomplete.map(item => ({ name: item.name, time: 'This Morning', conflict: false }));
    }
    const eveningIncomplete = todayRoutine.filter(item => item.time === 'Evening' && !item.completed);
    if (eveningIncomplete.length > 0) {
      return eveningIncomplete.map(item => ({ name: item.name, time: 'Tonight', conflict: false }));
    }
    return tomorrowRoutine;
  }, [todayRoutine]);
    
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  
  const weeklyProgress = {
    streak: 7,
    completionRate: 85,
    skinRating: 8.2
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-peach-100">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-peach-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{greeting}, Sarah! ✨</h1>
          <p className="text-gray-600">Ready to continue your skincare journey?</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            <Link to="/calendar" className="card flex flex-col items-center justify-center p-6 hover:bg-peach-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center mb-3">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Plan Routine</span>
            </Link>
             <Link to="/progress" className="card flex flex-col items-center justify-center p-6 hover:bg-peach-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Track Progress</span>
            </Link>
             <Link to="/my-products" className="card flex flex-col items-center justify-center p-6 hover:bg-peach-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center mb-3">
                <List className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-gray-800">My Products</span>
            </Link>
             <Link to="/shop" className="card flex flex-col items-center justify-center p-6 hover:bg-peach-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Scan Products</span>
            </Link>
             <Link to="/profile" className="card flex flex-col items-center justify-center p-6 hover:bg-peach-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center mb-3">
                <User className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-gray-800">My Profile</span>
            </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{weeklyProgress.streak} days</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{weeklyProgress.completionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Skin Rating</p>
                <p className="text-2xl font-bold text-gray-900">{weeklyProgress.skinRating}/10</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-peach-400 to-peach-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Routine */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Today's Routine</h2>
              <Link to="/calendar" className="text-peach-600 hover:text-peach-700 text-sm font-medium">
                View Calendar
              </Link>
            </div>

            <div className="space-y-4">
              {todayRoutine.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleToggleComplete(item.id)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    item.completed ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
                  }`}>
                    {item.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>

            <Link to="/calendar" className="block w-full mt-4 btn-primary text-center">
              Complete Routine
            </Link>
          </div>
          
          {/* Upcoming Products */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Products</h2>
            <div className="space-y-4">
              {upcomingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.time}</p>
                  </div>
                  {product.conflict && (
                    <div className="flex items-center text-amber-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs">Conflict</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Progress */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Progress</h2>
              <Link to="/progress" className="text-peach-600 hover:text-peach-700 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Photo taken</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Skin rating: 8/10</p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>

            <Link to="/progress" className="block w-full mt-4 btn-secondary text-center">
              Add Progress Photo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}