import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ExternalLink, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface SavedNewsItem {
  id: string;
  savedAt: string;
  title: string | null;
  summary: string[] | null;
  imageUrl: string | null;
  publishedAt: string | null;
  source: string | null;
  url: string | null;
}

interface SavedNewsCardProps {
  news: SavedNewsItem;
  onUnsave: (newsId: string) => void;
}

const SavedNewsCard: React.FC<SavedNewsCardProps> = ({ news, onUnsave }) => {
  const { id, title, summary, imageUrl, publishedAt, source, url, savedAt } = news;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300 border-l-4 border-primary-500">
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
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{publishedAt ? formatDate(publishedAt) : 'N/A'}</span>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Clock size={12} className="mr-1" />
            <span>Saved {savedAt ? formatDate(savedAt) : 'recently'}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {title || 'No Title'}
        </h3>

        <ul className="mb-4 text-sm text-gray-600 space-y-1">
          {summary?.slice(0, 3).map((point, index) => (
            <li key={index} className="flex">
              <span className="font-bold mr-2">•</span>
              <span className="line-clamp-1">{point}</span>
            </li>
          )) || <li className="text-gray-500">No summary available.</li>}
        </ul>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onUnsave(id)}
            className="text-gray-500 hover:text-red-600 transition flex items-center"
            title="Remove from saved"
          >
            <Trash2 size={18} className="mr-1" />
            <span className="text-xs">Remove</span>
          </button>

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
            <Link 
              to={`/article/${encodeURIComponent(url || '')}`}
              className="text-primary-500 hover:text-primary-700 text-sm font-medium"
            >
              Read Full Article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedNewsCard;