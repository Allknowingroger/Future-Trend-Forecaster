import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PredictionCard } from './components/PredictionCard';
import { Loader } from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { getFuturePredictions } from './services/geminiService';
import type { Prediction } from './types';

const App: React.FC = () => {
  const [industry, setIndustry] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const handlePrediction = useCallback(async () => {
    if (!industry.trim()) {
      setError('Please enter an industry, platform, or niche.');
      return;
    }

    setIsLoading(true);
    setPredictions(null);
    setError(null);

    try {
      const result = await getFuturePredictions(industry);
      setPredictions(result);
    } catch (e) {
      console.error(e);
      setError('An error occurred while forecasting. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [industry]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePrediction();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 animate-fade-in-down">
            Predict What Comes Next
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up">
            Analyze the trajectory of any industry, platform, or niche. Get 3 strategic moves to stay ahead of the curve.
          </p>

          <div className="relative w-full max-w-xl mx-auto mb-8">
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., 'creator economy', 'quantum computing', 'fast fashion'"
              className="w-full pl-4 pr-32 py-4 text-lg bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
              disabled={isLoading}
            />
            <button
              onClick={handlePrediction}
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Predict
            </button>
          </div>
        </div>

        <div className="w-full max-w-4xl mt-8">
          {isLoading && <Loader />}
          {error && <p className="text-center text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/50 p-4 rounded-lg">{error}</p>}
          {predictions && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {predictions.map((prediction, index) => (
                <PredictionCard key={index} index={index + 1} title={prediction.title} description={prediction.description} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;