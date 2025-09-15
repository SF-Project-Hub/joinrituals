import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import Button from '../components/Button';
import { initializeChallenge } from '../lib/state';
import { defaultChallenge } from '../lib/challenges';
import { uiCopy } from '../lib/uiCopy';

type RitualPreference = 'morning' | 'evening' | 'both';

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [selectedPreference, setSelectedPreference] = useState<RitualPreference>('both');
  const [isStarting, setIsStarting] = useState(false);

  const preferences = [
    {
      id: 'morning' as RitualPreference,
      title: uiCopy.onboarding.morningTitle,
      description: uiCopy.onboarding.morningDescription,
      icon: '🌅',
      gradient: 'from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900',
    },
    {
      id: 'evening' as RitualPreference,
      title: uiCopy.onboarding.eveningTitle,
      description: uiCopy.onboarding.eveningDescription,
      icon: '🌙',
      gradient: 'from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900',
    },
    {
      id: 'both' as RitualPreference,
      title: uiCopy.onboarding.bothTitle,
      description: uiCopy.onboarding.bothDescription,
      icon: '✨',
      gradient: 'from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900',
    },
  ];

  const handleStartJourney = async () => {
    setIsStarting(true);
    
    try {
      // Initialize the challenge in local storage
      initializeChallenge(defaultChallenge.id);
      
      // Store preference (for future use)
      localStorage.setItem('ritual-preference', selectedPreference);
      
      // Navigate to home page
      router.push('/');
    } catch (error) {
      console.error('Error starting challenge:', error);
      setIsStarting(false);
    }
  };

  const handleSkip = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>30-Day Reset - Get Started</title>
      </Head>
      
      <div className="min-h-screen bg-apple-gray dark:bg-black">
        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="pt-safe-top text-center space-y-4">
            <div className="text-4xl">🌱</div>
            <div>
              <h1 className="text-3xl font-bold text-apple-gray-dark dark:text-white mb-2">
                {uiCopy.onboarding.headline}
              </h1>
              <p className="text-apple-gray-medium">
                {uiCopy.onboarding.subtitle}
              </p>
            </div>
          </div>

          {/* Ritual Preferences */}
          <div className="space-y-4">
            {preferences.map((preference) => (
              <Card
                key={preference.id}
                variant="interactive"
                className={`p-6 transition-all duration-200 ${
                  selectedPreference === preference.id
                    ? 'ring-2 ring-apple-blue bg-gradient-to-r ' + preference.gradient
                    : ''
                }`}
                onClick={() => setSelectedPreference(preference.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{preference.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-apple-gray-dark dark:text-white mb-1">
                      {preference.title}
                    </h3>
                    <p className="text-apple-gray-medium text-sm">
                      {preference.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                        selectedPreference === preference.id
                          ? 'bg-apple-blue border-apple-blue'
                          : 'border-apple-gray-medium'
                      }`}
                    >
                      {selectedPreference === preference.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Info Card */}
          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <div className="text-xl">💡</div>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">Don't worry!</p>
                <p>You can always adjust your preferences later. The key is to start building consistent habits that work for your lifestyle.</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartJourney}
              isLoading={isStarting}
              className="w-full"
            >
              {uiCopy.onboarding.startButton}
            </Button>
            
            <Button
              variant="ghost"
              size="md"
              onClick={handleSkip}
              className="w-full"
              disabled={isStarting}
            >
              {uiCopy.onboarding.skipButton}
            </Button>
          </div>

          {/* Bottom spacing for safe area */}
          <div className="pb-safe-bottom" />
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
