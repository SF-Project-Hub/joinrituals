import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ProgressRing from '../../components/ProgressRing';
import { 
  getStats, 
  getChallengeProgress,
  getCurrentDay 
} from '../../lib/state';
import { getChallengeById, getTotalDays } from '../../lib/challenges';
import { uiCopy } from '../../lib/uiCopy';
import { getStreakEmoji, getStreakMessage, formatDate } from '../../lib/utils';

const ProgressPage: React.FC = () => {
  const router = useRouter();
  const { challengeId } = router.query;
  
  const [stats, setStats] = useState({
    totalMorningCompleted: 0,
    totalEveningCompleted: 0,
    totalDaysWithBothCompleted: 0,
    totalDaysStarted: 0,
    morningStreak: 0,
    eveningStreak: 0,
    startedAt: '' as string | undefined,
  });
  const [currentDay, setCurrentDay] = useState(1);

  const challengeIdStr = challengeId as string;
  const challenge = getChallengeById(challengeIdStr);
  const totalDays = getTotalDays(challengeIdStr);

  useEffect(() => {
    if (challengeIdStr) {
      const challengeStats = getStats(challengeIdStr);
      const day = getCurrentDay(challengeIdStr);
      setStats(challengeStats);
      setCurrentDay(day);
    }
  }, [challengeIdStr]);

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-6 text-center">
          <p className="text-apple-gray-medium">
            Challenge not found.
          </p>
          <Button 
            variant="primary" 
            onClick={() => router.push('/')}
            className="mt-4"
          >
            Go Home
          </Button>
        </Card>
      </div>
    );
  }

  const totalPossibleCompletions = totalDays * 2; // morning + evening
  const totalCompletions = stats.totalMorningCompleted + stats.totalEveningCompleted;
  const overallProgress = Math.round((totalCompletions / totalPossibleCompletions) * 100);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '30-Day Reset Progress',
          text: `I'm ${overallProgress}% through my 30-Day Reset journey! 🌱 Morning streak: ${stats.morningStreak} days, Evening streak: ${stats.eveningStreak} days.`,
          url: window.location.origin,
        });
      } catch (error) {
        // Fall back to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const text = `I'm ${overallProgress}% through my 30-Day Reset journey! 🌱 Morning streak: ${stats.morningStreak} days, Evening streak: ${stats.eveningStreak} days. Join me at ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    // You could show a toast notification here
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Progress - {challenge.name}</title>
      </Head>
      
      <div className="min-h-screen bg-apple-gray dark:bg-black">
        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="pt-safe-top flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToHome}
            >
              ← {uiCopy.progress.backToHome}
            </Button>
            <h1 className="text-xl font-semibold text-apple-gray-dark dark:text-white">
              {uiCopy.progress.yourProgress}
            </h1>
            <div className="w-16" />
          </div>

          {/* Overall Progress */}
          <Card className="p-6 text-center space-y-4">
            <h2 className="text-lg font-semibold text-apple-gray-dark dark:text-white">
              {challenge.name}
            </h2>
            
            <div className="flex justify-center">
              <ProgressRing
                completed={totalCompletions}
                total={totalPossibleCompletions}
                size="lg"
                color="blue"
                showPercentage={false}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-apple-blue">
                    {overallProgress}%
                  </div>
                  <div className="text-xs text-apple-gray-medium">
                    Complete
                  </div>
                </div>
              </ProgressRing>
            </div>

            <div className="text-center">
              <p className="text-apple-gray-medium">
                Day {currentDay} of {totalDays}
              </p>
              {stats.startedAt && (
                <p className="text-xs text-apple-gray-medium">
                  Started {formatDate(stats.startedAt)}
                </p>
              )}
            </div>
          </Card>

          {/* Streaks */}
          <div className="grid grid-cols-2 gap-4">
            {/* Morning Streak */}
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2">🌅</div>
              <div className="text-2xl font-bold text-orange-500 mb-1">
                {stats.morningStreak}
              </div>
              <p className="text-sm font-medium text-apple-gray-dark dark:text-white">
                {uiCopy.progress.morningStreak}
              </p>
              <div className="text-lg mt-1">
                {getStreakEmoji(stats.morningStreak)}
              </div>
              <p className="text-xs text-apple-gray-medium mt-1">
                {getStreakMessage(stats.morningStreak)}
              </p>
            </Card>

            {/* Evening Streak */}
            <Card className="p-4 text-center">
              <div className="text-2xl mb-2">🌙</div>
              <div className="text-2xl font-bold text-purple-500 mb-1">
                {stats.eveningStreak}
              </div>
              <p className="text-sm font-medium text-apple-gray-dark dark:text-white">
                {uiCopy.progress.eveningStreak}
              </p>
              <div className="text-lg mt-1">
                {getStreakEmoji(stats.eveningStreak)}
              </div>
              <p className="text-xs text-apple-gray-medium mt-1">
                {getStreakMessage(stats.eveningStreak)}
              </p>
            </Card>
          </div>

          {/* Detailed Stats */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-apple-gray-dark dark:text-white">
              Detailed Statistics
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-apple-blue">
                  {stats.totalMorningCompleted}
                </div>
                <p className="text-sm text-apple-gray-medium">
                  Morning Rituals
                </p>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-apple-blue">
                  {stats.totalEveningCompleted}
                </div>
                <p className="text-sm text-apple-gray-medium">
                  Evening Rituals
                </p>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {stats.totalDaysWithBothCompleted}
                </div>
                <p className="text-sm text-apple-gray-medium">
                  Perfect Days
                </p>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-apple-blue">
                  {stats.totalDaysStarted}
                </div>
                <p className="text-sm text-apple-gray-medium">
                  Active Days
                </p>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          {(stats.morningStreak >= 7 || stats.eveningStreak >= 7) && (
            <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
              <div className="text-center">
                <div className="text-2xl mb-2">🏆</div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Achievement Unlocked!
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  You've built some serious momentum!
                </p>
              </div>
            </Card>
          )}

          {/* Share Progress */}
          <div className="space-y-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              className="w-full"
            >
              📤 {uiCopy.progress.shareProgress}
            </Button>
          </div>

          {/* Motivational Quote */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <p className="text-sm italic text-blue-800 dark:text-blue-200">
                "The journey of a thousand miles begins with one step."
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                Keep going, you're doing amazing! 🌟
              </p>
            </div>
          </Card>

          {/* Bottom spacing */}
          <div className="pb-safe-bottom" />
        </div>
      </div>
    </>
  );
};

export default ProgressPage;
