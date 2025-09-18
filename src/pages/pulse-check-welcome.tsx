import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PulseCheckWelcomePage: React.FC = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/pulse-check-question');
  };

  return (
    <>
      <Head>
        <title>Daily Pulse Check - rituals</title>
        <meta name="description" content="Your daily health insights start now" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className="min-h-screen flex flex-col bg-purple-900 relative" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 py-2 text-sm text-white">
          <span>23:27</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
            <div className="ml-2 text-xs bg-white text-purple-900 px-1 rounded">70</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-white font-medium">Daily Pulse Check</span>
          </div>
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 hover:bg-purple-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-4 mb-6">
          <div className="flex gap-2">
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-8 h-1 bg-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 pb-6">
          <div className="bg-purple-800 rounded-2xl p-6 h-full flex flex-col">
            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                Your daily health insights start now
              </h1>
              <p className="text-purple-200 leading-relaxed">
                Welcome to rituals! Every day, I'll analyze your health data and deliver a personalized Pulse Check — your daily snapshot of progress, insights, and recommendations to help you own your health journey.
              </p>
            </div>

            {/* Illustration */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <div className="w-64 h-48 flex items-center justify-center">
                {/* Simple illustration of people at a table */}
                <svg className="w-full h-full text-white" viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="2">
                  {/* Table */}
                  <rect x="20" y="80" width="160" height="8" rx="4" fill="currentColor" />
                  
                  {/* Person 1 (left) */}
                  <circle cx="50" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 72 L50 90" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 90 L40 100" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 90 L60 100" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 80 L35 85" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 80 L65 85" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Person 2 (right) */}
                  <circle cx="150" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M150 72 L150 90" stroke="currentColor" strokeWidth="2" />
                  <path d="M150 90 L140 100" stroke="currentColor" strokeWidth="2" />
                  <path d="M150 90 L160 100" stroke="currentColor" strokeWidth="2" />
                  <path d="M150 80 L135 85" stroke="currentColor" strokeWidth="2" />
                  <path d="M150 80 L165 85" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Person 3 (front) */}
                  <circle cx="100" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M100 60 L100 75" stroke="currentColor" strokeWidth="2" />
                  <path d="M100 75 L90 85" stroke="currentColor" strokeWidth="2" />
                  <path d="M100 75 L110 85" stroke="currentColor" strokeWidth="2" />
                  <path d="M100 70 L85 75" stroke="currentColor" strokeWidth="2" />
                  <path d="M100 70 L115 75" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Plant */}
                  <circle cx="30" cy="70" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M30 62 L25 55" stroke="currentColor" strokeWidth="2" />
                  <path d="M30 62 L35 55" stroke="currentColor" strokeWidth="2" />
                  <path d="M30 62 L20 60" stroke="currentColor" strokeWidth="2" />
                  <path d="M30 62 L40 60" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Continue Button */}
            <button 
              onClick={handleContinue}
              className="w-full bg-white text-purple-900 py-4 px-6 rounded-2xl font-semibold hover:bg-purple-100 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PulseCheckWelcomePage;
