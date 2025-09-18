import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const HealthReportLoadingPage: React.FC = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Analyzing your health data...",
    "Processing biomarkers...",
    "Identifying patterns...",
    "Generating insights...",
    "Creating your personalized report..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate to health report after completion
          setTimeout(() => {
            router.push('/health-report');
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>rituals</title>
        <meta name="description" content="Generating your health report" />
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

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-8 max-w-[280px] mx-auto">
            {/* App Name */}
            <h1 className="text-3xl font-bold text-gray-800">
              rituals
            </h1>
            
            {/* Loading Animation */}
            <div className="mt-12">
              <div className="w-24 h-24 mx-auto mb-8">
                <div className="relative w-full h-full">
                  {/* Spinning Circle */}
                  <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                  <div 
                    className="absolute inset-0 border-4 border-yellow-400 rounded-full border-t-transparent animate-spin"
                    style={{ animationDuration: '1s' }}
                  ></div>
                  
                  {/* Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Progress Text */}
            <div className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </div>
            
            {/* Current Step */}
            <div className="text-center">
              <p className="text-lg font-medium text-gray-800 mb-2">
                Creating your health report
              </p>
              <p className="text-sm text-gray-600">
                {steps[currentStep]}
              </p>
            </div>
            
            {/* Features being processed */}
            <div className="mt-8 space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Health data analysis</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Pattern recognition</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Personalized insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthReportLoadingPage;
