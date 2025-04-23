import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Bookmark, ThumbsUp, Share2, ExternalLink } from 'lucide-react';
import { getNewsById, saveNewsItem, likeNewsItem } from '../services/newsService';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/dateUtils';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface NewsItem {
  id: string;
  title: string;
  summary: string[];
  content?: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  url: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchNewsDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const newsData = await getNewsById(id);
        setNews(newsData);
        setError(null);
      } catch (err) {
        setError('Failed to load news details. Please try again later.');
        console.error('Error fetching news details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNewsDetails();
  }, [id]);
  
  const handleSaveNews = async () => {
    if (!currentUser || !id) {
      alert('Please log in to save news');
      return;
    }
    
    try {
      await saveNewsItem(id, currentUser.uid);
      alert('News saved successfully!');
    } catch (err) {
      console.error('Error saving news:', err);
      alert('Failed to save news. Please try again.');
    }
  };
  
  const handleLikeNews = async () => {
    if (!currentUser || !id) {
      alert('Please log in to like news');
      return;
    }
    
    try {
      await likeNewsItem(id, currentUser.uid);
      alert('News liked successfully!');
    } catch (err) {
      console.error('Error liking news:', err);
      alert('Failed to like news. Please try again.');
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news?.title,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error || !news) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-600">{error || 'News not found'}</p>
            <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft size={16} className="mr-1" />
          Back to all news
        </Link>
        
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-64 relative overflow-hidden">
            <img 
              src={news.imageUrl || 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg'} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-primary-600 text-white px-3 py-1 text-sm font-medium">
              {news.source}
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <Clock size={16} className="mr-1" />
              <span>{formatDate(news.publishedAt)}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {news.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-8">
              <button 
                onClick={handleSaveNews}
                className="inline-flex items-center text-gray-500 hover:text-primary-600 transition"
              >
                <Bookmark size={18} className="mr-1" />
                <span>Save</span>
              </button>
              
              <button 
                onClick={handleLikeNews}
                className="inline-flex items-center text-gray-500 hover:text-primary-600 transition"
              >
                <ThumbsUp size={18} className="mr-1" />
                <span>Like</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="inline-flex items-center text-gray-500 hover:text-primary-600 transition"
              >
                <Share2 size={18} className="mr-1" />
                <span>Share</span>
              </button>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                AI-Generated Summary
              </h2>
              <ul className="space-y-3 text-gray-700">
                {news.summary.map((point, index) => (
                  <li key={index} className="flex">
                    <span className="font-bold text-primary-600 mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {news.content && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Full Content
                </h2>
                <div className="prose text-gray-700">
                  <p>{news.content}</p>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-100 pt-6 mt-8">
              <a 
                href={news.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 transition"
              >
                <ExternalLink size={16} className="mr-2" />
                Read the original article
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage;