import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  User, 
  Mail, 
  Bell,
  Shield,
  Palette,
  HelpCircle,
  LogOut,
  Edit3,
  Save,
  X,
  Leaf,
  Settings,
  HardDrive,
  Trash2,
  ChevronRight,
} from 'lucide-react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    skinType: 'combination',
    skinConcerns: ['acne', 'dryness'],
    notifications: {
      routineReminders: true,
      progressUpdates: true,
      productRecommendations: false
    },
    privacy: {
      profileIsPublic: false,
      shareUsageData: true,
    }
  })

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving profile:', profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotificationChange = (setting: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: value
      }
    }))
  }

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }))
  }

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
              <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-5 h-5 text-peach-600" />
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skin Type
                  </label>
                  {isEditing ? (
                    <select
                      value={profileData.skinType}
                      onChange={(e) => handleInputChange('skinType', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent"
                    >
                      <option value="oily">Oily</option>
                      <option value="dry">Dry</option>
                      <option value="combination">Combination</option>
                      <option value="sensitive">Sensitive</option>
                      <option value="normal">Normal</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 capitalize">{profileData.skinType}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-5 h-5 text-peach-600" />
                <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Routine Reminders</h3>
                    <p className="text-sm text-gray-500">Get notified about your daily skincare routine</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.routineReminders}
                      onChange={(e) => handleNotificationChange('routineReminders', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-peach-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-peach-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Progress Updates</h3>
                    <p className="text-sm text-gray-500">Weekly summaries of your skincare progress</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.progressUpdates}
                      onChange={(e) => handleNotificationChange('progressUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-peach-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-peach-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Product Recommendations</h3>
                    <p className="text-sm text-gray-500">Personalized product suggestions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.productRecommendations}
                      onChange={(e) => handleNotificationChange('productRecommendations', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-peach-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-peach-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

           {/* Privacy & Data Management */}
           <div className="card p-6">
             <div className="flex items-center space-x-3 mb-6">
               <Shield className="w-5 h-5 text-peach-600" />
               <h2 className="text-xl font-semibold text-gray-900">Privacy & Data</h2>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="text-sm font-medium text-gray-900">Public Profile</h3>
                   <p className="text-sm text-gray-500">Allow others to view your profile</p>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                   <input
                     type="checkbox"
                     checked={profileData.privacy.profileIsPublic}
                     onChange={(e) => handlePrivacyChange('profileIsPublic', e.target.checked)}
                     className="sr-only peer"
                   />
                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-peach-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-peach-600"></div>
                 </label>
               </div>
               <div className="flex items-center justify-between">
                  <div>
                   <h3 className="text-sm font-medium text-gray-900">Share Usage Data</h3>
                   <p className="text-sm text-gray-500">Help us improve by sharing anonymous usage data</p>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                   <input
                     type="checkbox"
                     checked={profileData.privacy.shareUsageData}
                      onChange={(e) => handlePrivacyChange('shareUsageData', e.target.checked)}
                     className="sr-only peer"
                   />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-peach-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-peach-600"></div>
                 </label>
               </div>
               <button className="w-full flex justify-between items-center pt-4 border-t border-gray-200 text-left">
                 <div>
                   <h3 className="text-sm font-medium text-gray-900">Export My Data</h3>
                   <p className="text-sm text-gray-500">Download all your data in a JSON file</p>
                 </div>
                  <HardDrive className="w-5 h-5 text-gray-500"/>
               </button>
                <button className="w-full flex justify-between items-center pt-4 border-t border-gray-200 text-left text-red-600">
                 <div>
                   <h3 className="text-sm font-medium">Delete Account</h3>
                   <p className="text-sm text-red-400">Permanently delete your account and data</p>
                 </div>
                  <Trash2 className="w-5 h-5"/>
               </button>
             </div>
           </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/calendar" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-peach-50 transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Manage Routines</span>
                </Link>
                <Link to="/progress" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-peach-50 transition-colors">
                  <Palette className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">View Progress</span>
                </Link>
                <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-peach-50 transition-colors w-full text-left">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Privacy Settings</span>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Support</h2>
              <div className="space-y-3">
                <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-peach-50 transition-colors w-full text-left">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Help Center</span>
                </button>
                <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-peach-50 transition-colors w-full text-left">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Contact Support</span>
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
              <div className="space-y-3">
                <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left text-red-600">
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}