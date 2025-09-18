import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PulseCheckQuestionPage: React.FC = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options = [
    { id: 'lets-go', text: "Let's go!", emoji: '💪' },
    { id: 'feeling-good', text: 'Feeling good', emoji: '😀' },
    { id: 'curious', text: 'Curious', emoji: '🤔' },
    { id: 'bit-nervous', text: 'Bit nervous', emoji: '😥' },
    { id: 'overwhelmed', text: 'Overwhelmed', emoji: '😅' }
  ];

  const handleContinue = () => {
    if (selectedOption) {
      router.push('/pulse-check-sync');
    }
  };

  return (
    <>
      <Head>
        <title>Daily Pulse Check - rituals</title>
        <meta name="description" content="How ready are you to own your health?" />
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
            {/* Question */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-8">
                How ready are you to own your health?
              </h1>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                    selectedOption === option.id
                      ? 'bg-purple-600 border-2 border-purple-400'
                      : 'bg-purple-700 hover:bg-purple-600'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-white font-medium text-lg">{option.text}</span>
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button 
              onClick={handleContinue}
              disabled={!selectedOption}
              className={`w-full py-4 px-6 rounded-2xl font-semibold transition-colors ${
                selectedOption
                  ? 'bg-white text-purple-900 hover:bg-purple-100'
                  : 'bg-purple-600 text-purple-300 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PulseCheckQuestionPage;
