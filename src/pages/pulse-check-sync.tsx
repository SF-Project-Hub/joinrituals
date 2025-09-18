import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PulseCheckSyncPage: React.FC = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <Head>
        <title>Daily Pulse Check - rituals</title>
        <meta name="description" content="Let's sync your data and set your baseline" />
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
            <div className="w-8 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 pb-6">
          <div className="bg-purple-800 rounded-2xl p-6 h-full flex flex-col">
            {/* Illustration */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <div className="w-64 h-48 flex items-center justify-center">
                {/* Simple illustration of people relaxing */}
                <svg className="w-full h-full text-white" viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="2">
                  {/* Background elements */}
                  <path d="M20 100 Q50 80 80 100" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                  <path d="M120 100 Q150 80 180 100" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                  
                  {/* Tree */}
                  <path d="M30 120 L30 100" stroke="currentColor" strokeWidth="3" />
                  <circle cx="30" cy="95" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Person 1 (seated, legs extended) */}
                  <circle cx="80" cy="70" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M80 78 L80 95" stroke="currentColor" strokeWidth="2" />
                  <path d="M80 95 L70 110" stroke="currentColor" strokeWidth="2" />
                  <path d="M80 95 L90 110" stroke="currentColor" strokeWidth="2" />
                  <path d="M80 85 L65 90" stroke="currentColor" strokeWidth="2" />
                  <path d="M80 85 L95 90" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Person 2 (seated, legs bent) */}
                  <circle cx="120" cy="75" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M120 83 L120 100" stroke="currentColor" strokeWidth="2" />
                  <path d="M120 100 L110 115" stroke="currentColor" strokeWidth="2" />
                  <path d="M120 100 L130 115" stroke="currentColor" strokeWidth="2" />
                  <path d="M120 90 L105 95" stroke="currentColor" strokeWidth="2" />
                  <path d="M120 90 L135 95" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Grass/landscape elements */}
                  <path d="M10 120 Q20 115 30 120 Q40 125 50 120" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                  <path d="M50 120 Q60 115 70 120 Q80 125 90 120" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                  <path d="M90 120 Q100 115 110 120 Q120 125 130 120" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                  
                  {/* Dots representing grass or water */}
                  <circle cx="25" cy="125" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="35" cy="127" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="45" cy="125" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="55" cy="127" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="65" cy="125" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="75" cy="127" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="85" cy="125" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="95" cy="127" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="105" cy="125" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="115" cy="127" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="125" cy="125" r="1" fill="currentColor" opacity="0.6" />
                  <circle cx="135" cy="127" r="1" fill="currentColor" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center mb-8">
              <p className="text-purple-300 text-sm mb-2">Today's focus:</p>
              <h1 className="text-2xl font-bold text-white mb-4">
                Let's sync your data and set your baseline
              </h1>
              <p className="text-purple-200 leading-relaxed">
                I'll start syncing your health data throughout the day. In the meantime, take a moment to connect your devices or start your first chat — even something simple like what you ate for breakfast or how you slept last night.
              </p>
            </div>

            {/* Continue Button */}
            <button 
              onClick={handleContinue}
              className="w-full bg-white text-purple-900 py-4 px-6 rounded-2xl font-semibold hover:bg-purple-100 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PulseCheckSyncPage;
