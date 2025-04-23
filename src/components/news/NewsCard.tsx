import React from 'react';
// import { Link } from 'react-router-dom';
import { Bookmark,Clock, ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface NewsItem {
  id: string;
  title: string | null | undefined;
  summary: string[] | null | undefined;
  imageUrl: string | null | undefined;
  publishedAt: string | null | undefined;
  source: string | null | undefined;
  url: string | null | undefined;
  // Remove savedAt since NewsCard doesn't use it
}

interface NewsCardProps {
  news: NewsItem;
  onSave: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onSave }) => {
  const { title,  imageUrl, publishedAt, source, url } = news;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg'}
          alt={title || 'News Image'}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-primary-600 text-white px-3 py-1 text-xs font-medium">
          {source}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Clock size={14} className="mr-1" />
          <span>{publishedAt ? formatDate(publishedAt) : 'N/A'}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {title || 'No Title'}
        </h3>

        {/* <ul className="mb-4 text-sm text-gray-600 space-y-1">
          {summary?.slice(0, 3).map((point, index) => (
            <li key={index} className="flex">
              <span className="font-bold mr-2">•</span>
              <span className="line-clamp-1">{point}</span>
            </li>
          )) || <li className="text-gray-500">No summary available.</li>}
        </ul> */}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            <button
              onClick={onSave}
              className="text-gray-500 hover:text-primary-600 transition"
              title="Save"
            >
              <Bookmark size={18} />
            </button>
          </div>

          <div className="flex space-x-2">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition flex items-center"
                title="Original Article"
              >
                <ExternalLink size={16} className="mr-1" />
                <span className="text-xs">Source</span>
              </a>
            )}
            {/* <Link to={`/article/${encodeURIComponent(news.url || '')}`}>
              Read Full Article
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;