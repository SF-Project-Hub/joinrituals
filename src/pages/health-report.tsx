import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const HealthReportPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    setIsSubmitting(true);
    
    try {
      localStorage.setItem('health-report-viewed', 'true');
      router.push('/checkin?challengeId=30-day-reset&day=1&tab=morning');
    } catch (error) {
      console.error('Error saving health report:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>rituals</title>
        <meta name="description" content="Your personalized health report" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Off-white grobkörniger Hintergrund */}
        <div className="absolute inset-0 bg-gray-50">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

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
        <div className="relative z-10 px-4 py-8 flex-1">
          <div className="text-center space-y-6 max-w-[280px] mx-auto">
            {/* App Name */}
            <h1 className="text-3xl font-bold text-gray-800">
              rituals
            </h1>
            
            {/* Page Title */}
            <h2 className="text-xl font-semibold text-gray-800">
              Your Health Report
            </h2>
            
            {/* Success Icon */}
            <div className="mt-8 mb-6">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-600">
              Your personalized health report has been generated based on your data and goals.
            </p>
            
            {/* Report Summary */}
            <div className="mt-8 space-y-4 text-left">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">Key Insights</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sleep quality: 7.2/10</li>
                  <li>• Activity level: Moderate</li>
                  <li>• Stress patterns: Evening peaks</li>
                  <li>• Recovery score: 85%</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">Recommendations</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Focus on evening wind-down</li>
                  <li>• Increase morning movement</li>
                  <li>• Monitor stress levels</li>
                  <li>• Maintain current sleep schedule</li>
                </ul>
              </div>
            </div>
            
            {/* Continue Button */}
            <div className="mt-8">
              <button
                onClick={handleContinue}
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-yellow-400 text-gray-800 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Starting...' : 'Start your journey'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthReportPage;
