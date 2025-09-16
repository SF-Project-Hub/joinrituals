import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import Button from '../components/Button';
import RitualTabs from '../components/RitualTabs';
import { 
  markCompleted, 
  isCompleted, 
  getChallengeProgress 
} from '../lib/state';
import { getDayEntries, getChallengeById } from '../lib/challenges';
import { uiCopy } from '../lib/uiCopy';
import { RitualType } from '../lib/types';

const CheckInPage: React.FC = () => {
  const router = useRouter();
  const { challengeId, day, tab } = router.query;
  
  const [activeTab, setActiveTab] = useState<RitualType>('morning');
  const [morningCompleted, setMorningCompleted] = useState(false);
  const [eveningCompleted, setEveningCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const challengeIdStr = challengeId as string;
  const dayNum = parseInt(day as string);

  useEffect(() => {
    if (tab && (tab === 'morning' || tab === 'evening')) {
      setActiveTab(tab as RitualType);
    }
  }, [tab]);

  useEffect(() => {
    if (challengeIdStr && dayNum) {
      // Check if test mode is enabled (via URL parameter or localStorage)
      const urlParams = new URLSearchParams(window.location.search);
      const testModeParam = urlParams.get('test') === 'true';
      const testModeStorage = localStorage.getItem('test-mode') === 'true';
      setTestMode(testModeParam || testModeStorage);
      
      if (!testModeParam && !testModeStorage) {
        setMorningCompleted(isCompleted(challengeIdStr, dayNum, 'morning'));
        setEveningCompleted(isCompleted(challengeIdStr, dayNum, 'evening'));
      }
    }
  }, [challengeIdStr, dayNum]);

  const challenge = getChallengeById(challengeIdStr);
  const dayEntries = getDayEntries(challengeIdStr, dayNum);
  const currentEntry = dayEntries[activeTab];

  // Debug logging
  console.log('Debug:', { challengeIdStr, dayNum, challenge, dayEntries, currentEntry });

  if (!challenge || !currentEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-6 text-center">
          <p className="text-apple-gray-medium">
            Challenge or day not found.
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

  const isCurrentCompleted = activeTab === 'morning' ? morningCompleted : eveningCompleted;

  const handleMarkComplete = async () => {
    if (isCurrentCompleted) return;
    
    setIsSubmitting(true);
    
    try {
      markCompleted(challengeIdStr, dayNum, activeTab);
      
      if (activeTab === 'morning') {
        setMorningCompleted(true);
      } else {
        setEveningCompleted(true);
      }
      
      // Show success feedback briefly, then navigate
      setTimeout(() => {
        router.push('/');
      }, 1500);
      
    } catch (error) {
      console.error('Error marking complete:', error);
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  const handlePreviousDay = () => {
    if (dayNum > 1) {
      const testParam = testMode ? '&test=true' : '';
      router.push(`/checkin?challengeId=${challengeIdStr}&day=${dayNum - 1}${testParam}`);
    }
  };

  const handleNextDay = () => {
    if (dayNum < 30) {
      const testParam = testMode ? '&test=true' : '';
      router.push(`/checkin?challengeId=${challengeIdStr}&day=${dayNum + 1}${testParam}`);
    }
  };

  const toggleTestMode = () => {
    const newTestMode = !testMode;
    setTestMode(newTestMode);
    localStorage.setItem('test-mode', newTestMode.toString());
    
    if (newTestMode) {
      // Enable test mode - add test parameter to URL
      const url = new URL(window.location.href);
      url.searchParams.set('test', 'true');
      window.history.replaceState({}, '', url.toString());
    } else {
      // Disable test mode - remove test parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('test');
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <>
      <Head>
        <title>Check In - Day {dayNum} {activeTab === 'morning' ? '🌅' : '🌙'}</title>
      </Head>
      
      <div className="min-h-screen bg-apple-gray dark:bg-black">
        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="pt-safe-top flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleGoBack}
            >
              ← {uiCopy.common.back}
            </Button>
            <h1 className="text-xl font-semibold text-apple-gray-dark dark:text-white">
              {uiCopy.checkin.checkInTitle}
            </h1>
            <div className="w-16" /> {/* Spacer for center alignment */}
          </div>

          {/* Day indicator */}
          <div className="text-center">
            <p className="text-apple-gray-medium">
              Day {dayNum} of 30
            </p>
            {testMode && (
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                🧪 Test Mode - No data saved
              </p>
            )}
          </div>

          {/* Day Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousDay}
              disabled={dayNum <= 1}
              className="flex items-center gap-2"
            >
              ← Previous Day
            </Button>
            
            {testMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTestMode}
                className="text-orange-600 dark:text-orange-400"
              >
                Exit Test Mode
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextDay}
              disabled={dayNum >= 30}
              className="flex items-center gap-2"
            >
              Next Day →
            </Button>
          </div>

          {/* Ritual Tabs */}
          <RitualTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            morningCompleted={morningCompleted}
            eveningCompleted={eveningCompleted}
          />

          {/* Ritual Content */}
          <Card className="p-6 space-y-6">
            {/* Ritual Header */}
            <div className="text-center space-y-3">
              <div className="text-4xl">
                {activeTab === 'morning' ? '🌅' : '🌙'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-apple-gray-dark dark:text-white">
                  {currentEntry.title}
                </h2>
                {activeTab === 'morning' ? (
                  <p className="text-apple-gray-medium">
                    {uiCopy.home.morningRitual}
                  </p>
                ) : dayNum === 1 && activeTab === 'evening' ? (
                  <div className="flex justify-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="text-blue-600 dark:text-blue-400">⏱️</span>
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-300">8–10 Min</span>
                    </div>
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="text-yellow-600 dark:text-yellow-400">📊</span>
                      <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Mittel</span>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400">🕯️</span>
                      <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Beruhigend</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-apple-gray-medium">
                    {uiCopy.home.eveningRitual}
                  </p>
                )}
              </div>
            </div>

            {/* Micro Bite */}
            <div className="bg-apple-blue/10 dark:bg-apple-blue/20 rounded-lg p-4">
              <p className="text-sm font-medium text-apple-blue mb-2">
                {uiCopy.checkin.microBiteLabel}
              </p>
              <p className="text-apple-gray-dark dark:text-white">
                {currentEntry.microBite}
              </p>
            </div>

            {/* Separate Fields for Action, Product, Content */}
            {(currentEntry.action || currentEntry.product || currentEntry.content) && (
              <div className="space-y-3">
                {currentEntry.action && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">
                      🎯 Action: {currentEntry.action}
                    </p>
                    {currentEntry.actionDescription && (
                      <p className="text-xs text-green-600 dark:text-green-300 italic">
                        {currentEntry.actionDescription}
                      </p>
                    )}
                  </div>
                )}
                
                {currentEntry.product && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-2">
                      🥤 Product: {currentEntry.product}
                    </p>
                    {currentEntry.productDescription && (
                      <p className="text-xs text-purple-600 dark:text-purple-300 italic">
                        {currentEntry.productDescription}
                      </p>
                    )}
                  </div>
                )}
                
                {currentEntry.content && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <p className="text-sm font-medium text-orange-700 dark:text-orange-400 mb-2">
                      🎧 Content: {currentEntry.content}
                    </p>
                    {currentEntry.contentDescription && (
                      <p className="text-xs text-orange-600 dark:text-orange-300 italic">
                        {currentEntry.contentDescription}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Completion Status */}
            {isCurrentCompleted ? (
              <div className="text-center space-y-4">
                <div className="text-5xl">✨</div>
                <div>
                  <p className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">
                    Du hast dir heute Ruhe geschenkt
                  </p>
                  <p className="text-apple-gray-medium mb-3">
                    dein Körper darf jetzt loslassen und friedlich einschlafen.
                  </p>
                  {dayNum < 30 && (
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      🔮 Morgen wartet ein neuer Stack auf dich.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-apple-gray-medium">
                  {testMode 
                    ? "In test mode - you can navigate freely without saving progress."
                    : "Take a moment to practice this ritual mindfully."
                  }
                </p>
                {testMode ? (
                  <div className="space-y-2">
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => {
                        if (activeTab === 'morning') {
                          setMorningCompleted(true);
                        } else {
                          setEveningCompleted(true);
                        }
                      }}
                      className="w-full"
                    >
                      ✨ Ich habe mein Ritual abgeschlossen
                    </Button>
                    <p className="text-xs text-orange-600 dark:text-orange-400">
                      This won't be saved permanently
                    </p>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleMarkComplete}
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Completing...' : '✨ Ich habe mein Ritual abgeschlossen'}
                  </Button>
                )}
              </div>
            )}
          </Card>

          {/* Encouragement */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💪 {uiCopy.checkin.keepGoing}
              </p>
            </div>
          </Card>

          {/* Navigation hint */}
          {(morningCompleted || eveningCompleted) && !isCurrentCompleted && (
            <div className="text-center">
              <p className="text-xs text-apple-gray-medium">
                Switch tabs to check in on your other ritual
              </p>
            </div>
          )}

          {/* Bottom spacing */}
          <div className="pb-safe-bottom" />
        </div>
      </div>
    </>
  );
};

export default CheckInPage;
