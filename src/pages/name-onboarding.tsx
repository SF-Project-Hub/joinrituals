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
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Orange grobkörniger Hintergrund */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="relative z-10 text-center max-w-md mx-auto space-y-8">
          {/* App Name */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-orange-800 dark:text-orange-900">
              Node
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-900">
              What's your name?
            </h2>
            <p className="text-gray-600 dark:text-gray-700">
              We'll use this to personalize your experience.
            </p>
          </div>
          
          {/* Name Input */}
          <Card className="p-6 bg-white/90 dark:bg-gray-50/90 backdrop-blur-sm border border-orange-200 dark:border-orange-300">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-white dark:text-gray-900 placeholder-gray-500"
                  autoFocus
                />
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleSubmit}
                  disabled={!name.trim() || isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {isSubmitting ? 'Saving...' : 'Continue'}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSkip}
                  className="w-full text-gray-600 dark:text-gray-500"
                >
                  Skip for now
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default NameOnboardingPage;
