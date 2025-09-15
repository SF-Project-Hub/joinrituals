import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressRing from '../components/ProgressRing';
import { 
  hasStartedChallenge, 
  getChallengeProgress, 
  getCurrentDay, 
  getStats,
  isCompleted,
  loadProgress,
  saveProgress
} from '../lib/state';
import { defaultChallenge } from '../lib/challenges';
import { uiCopy } from '../lib/uiCopy';
import { getStreakEmoji } from '../lib/utils';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [hasChallenge, setHasChallenge] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [stats, setStats] = useState({
    totalMorningCompleted: 0,
    totalEveningCompleted: 0,
    morningStreak: 0,
    eveningStreak: 0,
  });
  const [morningCompleted, setMorningCompleted] = useState(false);
  const [eveningCompleted, setEveningCompleted] = useState(false);

  useEffect(() => {
    const challengeStarted = hasStartedChallenge();
    setHasChallenge(challengeStarted);

    if (challengeStarted) {
      const challengeId = defaultChallenge.id;
      const day = getCurrentDay(challengeId);
      const challengeStats = getStats(challengeId);
      
      setCurrentDay(day);
      setStats(challengeStats);
      setMorningCompleted(isCompleted(challengeId, day, 'morning'));
      setEveningCompleted(isCompleted(challengeId, day, 'evening'));
    }
  }, []);

  const handleStartChallenge = () => {
    router.push('/onboarding');
  };

  const handleSkipOnboarding = () => {
    // Initialize challenge without onboarding
    const challengeId = defaultChallenge.id;
    const progress = getChallengeProgress(challengeId);
    if (!progress.startedAt) {
      // Start the challenge
      const newProgress = {
        ...progress,
        startedAt: new Date().toISOString(),
      };
      // Save progress
      const allProgress = loadProgress();
      allProgress[challengeId] = newProgress;
      saveProgress(allProgress);
    }
    // Refresh the page to show the challenge
    window.location.reload();
  };

  const handleMorningCheckIn = () => {
    const day = Math.max(1, currentDay);
    router.push(`/checkin?challengeId=${defaultChallenge.id}&day=${day}&tab=morning`);
  };

  const handleEveningCheckIn = () => {
    const day = Math.max(1, currentDay);
    router.push(`/checkin?challengeId=${defaultChallenge.id}&day=${day}&tab=evening`);
  };

  const handleViewProgress = () => {
    router.push(`/progress/${defaultChallenge.id}`);
  };

  if (!hasChallenge) {
    return (
      <>
        <Head>
          <title>30-Day Reset - Start Your Journey</title>
        </Head>
        
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-apple-gray-dark dark:text-white">
                {uiCopy.app.name}
              </h1>
              <p className="text-lg text-apple-gray-medium">
                {uiCopy.app.tagline}
              </p>
            </div>
            
            <div className="text-6xl">
              🌱
            </div>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-apple-gray-dark dark:text-white">
                Transform Your Habits
              </h2>
              <p className="text-apple-gray-medium mb-6">
                Build lasting change through mindful morning and evening rituals. 
                Just 30 days to create the foundation for a better you.
              </p>
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleStartChallenge}
                  className="w-full"
                >
                  {uiCopy.onboarding.startButton}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSkipOnboarding}
                  className="w-full text-orange-600 dark:text-orange-400"
                >
                  🧪 Skip Onboarding (Test Mode)
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>30-Day Reset - Day {currentDay}</title>
      </Head>
      
      <div className="min-h-screen bg-apple-gray dark:bg-black">
        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="pt-safe-top text-center space-y-2">
            <h1 className="text-2xl font-bold text-apple-gray-dark dark:text-white">
              {uiCopy.home.welcomeBack}
            </h1>
            <p className="text-apple-gray-medium">
              {uiCopy.home.dayLabel} {currentDay} of 30
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <ProgressRing
                completed={stats.totalMorningCompleted + stats.totalEveningCompleted}
                total={60} // 30 days × 2 rituals
                size="lg"
                color="blue"
                showPercentage={false}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-apple-blue">
                    {Math.round(((stats.totalMorningCompleted + stats.totalEveningCompleted) / 60) * 100)}%
                  </div>
                  <div className="text-xs text-apple-gray-medium">
                    Complete
                  </div>
                </div>
              </ProgressRing>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleViewProgress}
                className="flex-1"
              >
                View Progress
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push(`/checkin/${defaultChallenge.id}/1?test=true`)}
                className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800"
              >
                🧪 Test Mode
              </Button>
            </div>
          </Card>

          {/* Today's Rituals */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-apple-gray-dark dark:text-white">
              {uiCopy.home.todaysRituals}
            </h2>
            
            {/* Morning Ritual */}
            <Card 
              variant={morningCompleted ? 'default' : 'interactive'}
              className="p-4"
              onClick={!morningCompleted ? handleMorningCheckIn : undefined}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🌅</div>
                  <div>
                    <h3 className="font-medium text-apple-gray-dark dark:text-white">
                      {uiCopy.home.morningRitual}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-apple-gray-medium">
                        Streak: {stats.morningStreak} {getStreakEmoji(stats.morningStreak)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {morningCompleted ? (
                    <div className="text-green-500 text-xl">✓</div>
                  ) : (
                    <Button variant="primary" size="sm">
                      {uiCopy.home.checkInButton}
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Evening Ritual */}
            <Card 
              variant={eveningCompleted ? 'default' : 'interactive'}
              className="p-4"
              onClick={!eveningCompleted ? handleEveningCheckIn : undefined}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🌙</div>
                  <div>
                    <h3 className="font-medium text-apple-gray-dark dark:text-white">
                      {uiCopy.home.eveningRitual}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-apple-gray-medium">
                        Streak: {stats.eveningStreak} {getStreakEmoji(stats.eveningStreak)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {eveningCompleted ? (
                    <div className="text-green-500 text-xl">✓</div>
                  ) : (
                    <Button variant="primary" size="sm">
                      {uiCopy.home.checkInButton}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Motivational Message */}
          {(morningCompleted && eveningCompleted) && (
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="text-center">
                <div className="text-2xl mb-2">🎉</div>
                <p className="text-green-800 font-medium">
                  Perfect day! You completed both rituals.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
