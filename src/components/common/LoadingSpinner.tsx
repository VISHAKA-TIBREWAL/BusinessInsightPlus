import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-12 w-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
      <p className="mt-4 text-gray-500 text-sm">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;