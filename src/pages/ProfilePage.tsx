import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile } from '../services/userService';
import { User, Bell, Mail, PieChart } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    stockAlerts: false,
    breakingNews: true,
    weeklyReport: true
  });
  const [saving, setSaving] = useState(false);
  
  const handleSaveProfile = async () => {
    if (!currentUser) return;
    
    try {
      setSaving(true);
      await updateUserProfile(currentUser.uid, {
        displayName,
        notifications
      });
      
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };
  
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Profile</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center mr-6 mb-4 sm:mb-0">
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'User'} 
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-primary-600" />
                )}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-lg mb-2"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    {currentUser?.displayName || 'User'}
                  </h2>
                )}
                
                <p className="text-gray-500">
                  {currentUser?.email}
                </p>
              </div>
              
              <div>
                {isEditing ? (
                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition mt-4 sm:mt-0"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Bell size={20} className="mr-2 text-primary-600" />
              Notification Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium text-gray-800">Email Digest</h4>
                  <p className="text-sm text-gray-500">Receive a daily digest of top business news</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="email-digest"
                    className="sr-only"
                    checked={notifications.emailDigest}
                    onChange={() => toggleNotification('emailDigest')}
                  />
                  <label
                    htmlFor="email-digest"
                    className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
                      notifications.emailDigest ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                        notifications.emailDigest ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium text-gray-800">Stock Price Alerts</h4>
                  <p className="text-sm text-gray-500">Get notified about significant stock price changes</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="stock-alerts"
                    className="sr-only"
                    checked={notifications.stockAlerts}
                    onChange={() => toggleNotification('stockAlerts')}
                  />
                  <label
                    htmlFor="stock-alerts"
                    className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
                      notifications.stockAlerts ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                        notifications.stockAlerts ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium text-gray-800">Breaking News</h4>
                  <p className="text-sm text-gray-500">Receive alerts for important business news</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="breaking-news"
                    className="sr-only"
                    checked={notifications.breakingNews}
                    onChange={() => toggleNotification('breakingNews')}
                  />
                  <label
                    htmlFor="breaking-news"
                    className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
                      notifications.breakingNews ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                        notifications.breakingNews ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium text-gray-800">Weekly Market Report</h4>
                  <p className="text-sm text-gray-500">Get a weekly summary of market trends</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="weekly-report"
                    className="sr-only"
                    checked={notifications.weeklyReport}
                    onChange={() => toggleNotification('weeklyReport')}
                  />
                  <label
                    htmlFor="weekly-report"
                    className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
                      notifications.weeklyReport ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                        notifications.weeklyReport ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;