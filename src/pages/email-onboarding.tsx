import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const EmailOnboardingPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState(''); // Empty input field
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      localStorage.setItem('user-email', email.trim());
      router.push('/health-priorities');
    } catch (error) {
      console.error('Error saving email:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>rituals</title>
        <meta name="description" content="Personalize your experience with rituals" />
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

        {/* Header mit Back Button - genau wie im Screenshot */}
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
        
        {/* Main Content - alles oben angeordnet wie im Screenshot */}
        <div className="relative z-10 px-4 py-8">
          <div className="text-center space-y-6 max-w-[280px] mx-auto">
            {/* App Name - rituals */}
            <h1 className="text-3xl font-bold text-gray-800">
              rituals
            </h1>
            
            {/* Question - What's your email? */}
            <h2 className="text-xl font-semibold text-gray-800">
              What's your email?
            </h2>
            
            {/* Subtitle - Updates and insights */}
            <p className="text-sm text-gray-500">
              We'll use this to send you important updates and insights.
            </p>
            
            {/* Input Field - genau wie im Screenshot */}
            <div className="mt-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="w-full px-4 py-4 text-lg border-0 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                autoFocus
              />
            </div>
            
            {/* Continue Button - genau wie im Screenshot */}
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={!email.trim() || isSubmitting}
                className="w-full py-3 px-6 bg-yellow-400 text-gray-800 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default EmailOnboardingPage;
