import React from 'react';
import { Bookmark, ThumbsUp, Clock, ExternalLink } from 'lucide-react';
import { formatTimestamp } from '../../utils/dateUtils';

interface StockNews {
  id: string;
  headline: string;
  summary: string[];
  imageUrl: string;
  datetime: number;
  source: string;
  url: string;
  related: string;
}

interface StockNewsCardProps {
  news: StockNews;
  onSave: () => void;
  onLike: () => void;
}

const StockNewsCard: React.FC<StockNewsCardProps> = ({ news, onSave, onLike }) => {
  const { headline, summary, imageUrl, datetime, source, url, related } = news;
  
  return (
    <div className="flex flex-col sm:flex-row border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition">
      {imageUrl && (
        <div className="sm:w-1/4 md:w-1/5">
          <img 
            src={imageUrl || 'https://images.pexels.com/photos/6801651/pexels-photo-6801651.jpeg'} 
            alt={headline}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      
      <div className={`p-4 flex-1 ${imageUrl ? '' : 'w-full'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-gray-500 text-xs">
            <Clock size={12} className="mr-1" />
            <span>{formatTimestamp(datetime)}</span>
          </div>
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
            {related}
          </span>
        </div>
        
        <h3 className="text-base font-semibold text-gray-800 mb-2">
          {headline}
        </h3>
        
        <div className="mb-3">
          <ul className="text-sm text-gray-600 space-y-1">
            {summary.slice(0, 2).map((point, index) => (
              <li key={index} className="flex">
                <span className="font-bold mr-2">•</span>
                <span className="line-clamp-1">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div className="flex space-x-3">
            <button 
              onClick={onSave}
              className="text-gray-500 hover:text-primary-600 transition"
              title="Save"
            >
              <Bookmark size={16} />
            </button>
            <button 
              onClick={onLike}
              className="text-gray-500 hover:text-primary-600 transition"
              title="Like"
            >
              <ThumbsUp size={16} />
            </button>
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-2">{source}</span>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 transition flex items-center"
            >
              <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockNewsCard;