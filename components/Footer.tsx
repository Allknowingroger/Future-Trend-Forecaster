import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>Powered by Gemini. For informational purposes only.</p>
      </div>
    </footer>
  );
};