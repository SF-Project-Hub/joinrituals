import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import Button from '../components/Button';

const NameOnboardingPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Store the user's name
      localStorage.setItem('user-name', name.trim());
      
      // Navigate to the main onboarding
      router.push('/onboarding');
    } catch (error) {
      console.error('Error saving name:', error);
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/onboarding');
  };

  return (
    <>
      <Head>
        <title>Node - What's your name?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Clean off-white Hintergrund */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        
        {/* Header mit Back Button */}
        <div className="relative z-10 pt-12 pb-4 px-4">
          <button 
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8">
          <div className="text-center space-y-6 max-w-sm mx-auto">
            {/* App Name - clean design */}
            <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              node
            </h1>
            
            {/* Question - genau wie im Screenshot */}
            <h2 className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              What's your name?
            </h2>
            
            {/* Subtitle - genau wie im Screenshot */}
            <p className="text-sm text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              We'll use this to personalize your experience.
            </p>
            
            {/* Input Field - genau wie im Screenshot */}
            <div className="mt-8">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                className="w-full px-4 py-4 text-lg border-0 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                autoFocus
              />
            </div>
            
            {/* Continue Button - clean design */}
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || isSubmitting}
                className="w-full py-3 px-6 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {isSubmitting ? 'Saving...' : 'Continue'}
              </button>
            </div>
            
            {/* Skip Button */}
            <div className="mt-4">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NameOnboardingPage;
