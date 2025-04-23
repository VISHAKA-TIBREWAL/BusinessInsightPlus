import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import { getLatestNewsFromFirestore, NewsItemFromFirestore } from '../contexts/HomePageNews';
import NewsCard from '../components/news/NewsCard';
import HeroSection from '../components/home/HeroSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { saveNewsForUser} from '../services/newsSavingService';

interface NewsItem {
  id: string;
  title: string | null | undefined;
  summary: string[] | null | undefined;
  imageUrl: string | null | undefined;
  publishedAt: string | null | undefined;
  source: string | null | undefined;
  url: string | null | undefined;
}

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        const latestNewsData: NewsItemFromFirestore[] = await getLatestNewsFromFirestore();
        
        const formattedNews: NewsItem[] = latestNewsData.map(item => ({
          id: item.id || '',
          title: item.title || null,
          summary: item.summary || null,
          imageUrl: item.imageUrl || null,
          publishedAt: item.publishedAt || null,
          source: item.source || null,
          url: item.url || null,
        }));

        setNews(formattedNews);
        setError(null);
      } catch (err) {
        setError('Failed to load latest news. Please try again later.');
        console.error('Error fetching latest news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  // const handleSaveNews = async (newsId: string) => {
  //   if (!currentUser) {
  //     alert('Please log in to save news');
  //     return;
  //   }

  //   try {
  //     const itemToSave = news.find(item => item.id === newsId);
  //     if (itemToSave) {
  //       const success = await saveNewsForUser(currentUser.uid, newsId, {
  //         title: itemToSave.title as string | null, // Tell TypeScript to trust us
  //         imageUrl: itemToSave.imageUrl as string | null,
  //         publishedAt: itemToSave.publishedAt as string | null
  //         // add any other fields you want to save
  //         ,
  //         summary: null,
  //         source: null,
  //         url: null
  //       });
        
  //       if(success == "already there"){
  //         alert('News Already saved !');          
  //       }
  //       else if (success) {
  //         alert('News saved successfully!');
  //       } else {
  //         alert('Failed to save news. Please try again.');
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Error saving news:', err);
  //     alert('Failed to save news. Please try again.');
  //   }
  // };
  
  const handleSaveNews = async (newsId: string) => {
    if (!currentUser) {
      await Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to save news articles',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const itemToSave = news.find(item => item.id === newsId);
      if (!itemToSave) {
        await Swal.fire({
          icon: 'error',
          title: 'Not Found',
          text: 'News article could not be found',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Show save confirmation dialog
      const saveResult = await Swal.fire({
        title: 'Save this news?',
        text: 'Do you want to save this article to your collection?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'Cancel'
      });

      if (!saveResult.isConfirmed) return;

      const result = await saveNewsForUser(currentUser.uid, newsId, {
        title: itemToSave.title as string | null,
        imageUrl: itemToSave.imageUrl as string | null,
        publishedAt: itemToSave.publishedAt as string | null,
        summary: itemToSave.summary as string[] | null,
        source: itemToSave.source as string | null,
        url: itemToSave.url as string | null
      });

      if (result === "already there") {
        await Swal.fire({
          icon: 'info',
          title: 'Already Saved',
          text: 'This news article is already in your saved collection',
          confirmButtonText: 'OK'
        });
      } else if (result) {
        await Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: 'News article saved successfully',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        throw new Error('Failed to save news');
      }
    } catch (err) {
      console.error('Error saving news:', err);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save news article. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Business News</h2>
          <Link
            to="/dashboard"
            className="text-primary-600 hover:text-primary-700 flex items-center"
          >
            {currentUser && (
              <>
                View saved news <ArrowRight size={16} className="ml-1" />
              </>
            )}
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                onSave={() => handleSaveNews(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;