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


  return (
    <>
      <Head>
        <title>Node - What's your name?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Clean off-white Hintergrund */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        
        
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
                className="w-full px-4 py-4 text-lg border-0 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                autoFocus
              />
            </div>
            
            {/* Continue Button - pastellblau design */}
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || isSubmitting}
                className="w-full py-3 px-6 bg-blue-400 text-white rounded-lg font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {isSubmitting ? 'Saving...' : 'Continue'}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default NameOnboardingPage;
