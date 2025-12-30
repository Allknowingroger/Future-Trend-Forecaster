import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500 dark:border-cyan-400"></div>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Forecasting the future...</p>
    </div>
  );
};