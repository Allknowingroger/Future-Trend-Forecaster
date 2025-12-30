import React from 'react';

interface PredictionCardProps {
  index: number;
  title: string;
  description: string;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ index, title, description }) => {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/10">
      <div className="flex items-center mb-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold text-lg mr-4 border border-cyan-200 dark:border-cyan-400/30">
          {index}
        </span>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};