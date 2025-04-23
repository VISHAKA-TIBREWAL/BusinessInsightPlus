import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import { unsaveNewsForUser, getUserSavedNews } from '../services/newsSavingService';
import SavedNewsCard from '../components/news/SavedNewsCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface SavedNewsItem {
  id: string;
  title: string;
  summary: string[];
  imageUrl: string;
  publishedAt: string;
  source: string;
  url: string;
  savedAt: string;
}

const DashboardPage: React.FC = () => {
  const [savedNews, setSavedNews] = useState<SavedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  
  const fetchSavedNews = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError(null);
      const savedNewsData = await getUserSavedNews(currentUser.uid);
      setSavedNews(savedNewsData);
    } catch (err) {
      setError('Failed to load saved news');
      console.error("Error fetching saved news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedNews();
  }, [currentUser]);
  
  // const handleUnsave = async (newsId: string) => {
  //   if (!currentUser) return;
    
  //   try {
  //     await unsaveNewsForUser(currentUser.uid, newsId);
  //     // Optimistic update
  //     setSavedNews(prev => prev.filter(item => item.id !== newsId));
  //   } catch (err) {
  //     console.error("Error unsaving news:", err);
  //     // Revert if error
  //     fetchSavedNews();
  //   }
  // };
  
  const handleUnsave = async (newsId: string) => {
    if (!currentUser) return;
  
    const result = await Swal.fire({
      title: 'Remove saved news?',
      text: `Are you sure you want to remove ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    });
  
    if (!result.isConfirmed) return;
  
    try {
      setSavedNews(prev => prev.filter(item => item.id !== newsId));
      await unsaveNewsForUser(currentUser.uid, newsId);
      
      Swal.fire(
        'Removed!',
        'The news has been removed from your saved News.',
        'success'
      );
    } catch (err) {
      console.error("Error unsaving news:", err);
      fetchSavedNews();
      Swal.fire(
        'Error!',
        'Failed to remove the news.',
        'error'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Dashboard</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className="py-4 px-6 text-center border-b-2 font-medium text-sm border-primary-500 text-primary-600"
              >
                Saved News ({savedNews.length})
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">
                {error}
              </div>
            ) : savedNews.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">You haven't saved any news articles yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedNews
                  .sort((a, b) => 
                    new Date(b.savedAt).getTime() - 
                    new Date(a.savedAt).getTime()
                  )
                  .map((item) => (
                    <SavedNewsCard 
                      key={item.id}
                      news={item}
                      onUnsave={handleUnsave}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;