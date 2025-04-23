import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-700 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 animate-slide-up">
            Business News Simplified
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Get AI-powered summaries of the latest business news and stock market insights in bite-sized, actionable points.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/stock-news"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-900 bg-white hover:bg-gray-100 transition"
            >
              Stock Market News
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white hover:bg-primary-800 transition"
            >
              Get Started <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute right-0 top-0 -mr-20 -mt-20 w-80 h-80 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M47.1,-52.5C61.1,-42.2,72.9,-26.4,76.4,-8.5C79.9,9.4,75.2,29.3,63.2,42.2C51.2,55.1,31.9,61,11.8,65.8C-8.3,70.5,-29.2,74.1,-43.6,65.9C-58.1,57.8,-66.1,38,-68.8,18.5C-71.5,-1,-68.9,-20.1,-59.6,-33.3C-50.3,-46.4,-34.2,-53.6,-18.7,-63C-3.2,-72.3,12.7,-83.8,26.8,-77.9C40.9,-71.9,53.2,-48.6,47.1,-52.5Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="absolute left-0 bottom-0 -ml-20 -mb-20 w-80 h-80 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M36.8,-49.8C45.9,-39.5,50.4,-25.8,56.3,-10.3C62.1,5.3,69.3,22.7,64.4,35.5C59.5,48.3,42.4,56.6,25.8,61.7C9.2,66.9,-7,69,-23.1,65.4C-39.2,61.7,-55.3,52.2,-65.3,37.2C-75.4,22.3,-79.5,1.9,-74.4,-15.4C-69.3,-32.7,-55.1,-46.9,-40,-54.6C-24.8,-62.2,-8.7,-63.3,3.9,-68.1C16.5,-72.9,33,-73.4,36.8,-49.8Z" transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;