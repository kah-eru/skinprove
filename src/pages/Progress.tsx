import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Camera,
  Upload,
  Calendar as CalendarIcon,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Leaf,
  User,
  Bell,
  Settings,
  Star,
  Plus
} from 'lucide-react'
import { generateMockRatings, dailyAverageFromPhotos, rollingAverageLastNDays } from '../services/ratings'
import type { SkinRating } from '../services/ratings'

interface ProgressPhoto {
  id: string
  date: string
  imageUrl: string
  skinRating: number
  notes: string
}

export default function Progress() {
  const [viewMode, setViewMode] = useState<'photos' | 'timeline' | 'chart'>('photos')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [skinRating, setSkinRating] = useState(5)
  const [notes, setNotes] = useState('')

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - in real app this would come from API/state management
  const today = new Date()
  const mockPhotos: ProgressPhoto[] = [
    {
      id: '1',
      date: today.toISOString().split('T')[0],
      imageUrl: '/api/placeholder/200/200',
      skinRating: 8,
      notes: 'Skin looking clearer, less redness'
    },
    {
      id: '2',
      date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      imageUrl: '/api/placeholder/200/200',
      skinRating: 6,
      notes: 'Some breakouts on forehead'
    },
    {
      id: '3',
      date: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      imageUrl: '/api/placeholder/200/200',
      skinRating: 5,
      notes: 'Starting new routine'
    }
  ]

  const mockRatings: SkinRating[] = generateMockRatings()

  // Compute 7-day rolling average of daily ratings:
  // 1) average multiple photos per day into a single daily score
  // 2) take the most recent 7 daily entries (skip missing days)
  const dailyAverages = dailyAverageFromPhotos(
    mockPhotos.map(p => ({ date: p.date, skinRating: p.skinRating }))
  )
  const avg7 = rollingAverageLastNDays(dailyAverages, 7)
  const prevAvg7 = rollingAverageLastNDays(dailyAverages.slice(7), 7)
  const improvement = isFinite(prevAvg7) && prevAvg7 > 0 ? +(avg7 - prevAvg7).toFixed(1) : 0
  const goodDays = dailyAverages.slice(0, 7).filter((d) => d.rating >= 7).length


  const handlePhotoUpload = () => {
    // TODO: Implement photo upload logic
    console.log('Upload photo with rating:', skinRating, 'notes:', notes, 'file:', selectedFile)
    setShowUploadModal(false)
    setSkinRating(5)
    setNotes('')
    setSelectedFile(null)
  }

  const handleCameraCapture = () => {
    // TODO: Implement camera capture
    console.log('Capture photo from camera')
  }

  const renderPhotosView = () => (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Progress Photos</h2>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="btn-primary"
          >
            <Camera className="w-4 h-4 mr-2" />
            Add Photo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(photo.date).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{photo.skinRating}/10</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{photo.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Before & After</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">January 1, 2024</h3>
            <p className="text-sm text-gray-500">Starting point</p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">5/10</span>
            </div>
          </div>
          <div className="text-center">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">January 15, 2024</h3>
            <p className="text-sm text-gray-500">Latest progress</p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">8/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTimelineView = () => (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress Timeline</h2>
      <div className="space-y-6">
        {mockPhotos.map((photo, index) => (
          <div key={photo.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">
                  Progress Photo
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(photo.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{photo.skinRating}/10</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{photo.notes}</p>
            </div>
            {index < mockPhotos.length - 1 && (
              <div className="absolute left-6 mt-12 w-px h-6 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderChartView = () => (
    <div className="space-y-6">
      {/* Rating Chart */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Skin Rating Over Time</h2>
        <div className="h-64 flex items-end justify-between space-x-2">
          {[...mockRatings].reverse().map((rating, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div 
                className="w-8 bg-gradient-to-t from-peach-500 to-peach-400 rounded-t"
                style={{ height: `${(rating.rating / 10) * 200}px` }}
              ></div>
              <span className="text-xs text-gray-500 transform -rotate-45 origin-center">
                {new Date(rating.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>Poor (1)</span>
          <span>Excellent (10)</span>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-peach-600 mb-1">{avg7.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Average Rating (7-day)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {(improvement >= 0 ? '+' : '') + improvement.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Improvement vs prev 7-day</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{goodDays}</div>
            <div className="text-sm text-gray-600">Good Days (≥7)</div>
          </div>
        </div>
      </div>
    </div>
  )

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracking</h1>
            <p className="text-gray-600">Monitor your skin's improvement over time</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              {(['photos', 'timeline', 'chart'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                    viewMode === mode
                      ? 'bg-peach-500 text-white'
                      : 'text-gray-700 hover:text-peach-600'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'photos' && renderPhotosView()}
        {viewMode === 'timeline' && renderTimelineView()}
        {viewMode === 'chart' && renderChartView()}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add Progress Photo</h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {/* Upload Options */}
              <div className="space-y-4 mb-6">
                <button 
                  onClick={handleCameraCapture}
                  className="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-peach-400 hover:bg-peach-50 transition-colors"
                >
                  <Camera className="w-8 h-8 text-gray-400 mr-3" />
                  <span className="text-gray-600">Take Photo</span>
                </button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-peach-400 hover:bg-peach-50 transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mr-3" />
                  <span className="text-gray-600">{selectedFile ? selectedFile.name : 'Upload from Gallery'}</span>
                </button>
              </div>

              {/* Skin Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How is your skin today? ({skinRating}/10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={skinRating}
                  onChange={(e) => setSkinRating(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How does your skin feel? Any changes you've noticed?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePhotoUpload}
                  className="flex-1 btn-primary"
                >
                  Save Progress
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}