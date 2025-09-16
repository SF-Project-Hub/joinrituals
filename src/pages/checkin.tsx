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
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

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

  const toggleStepExpansion = (stepId: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      
      // Auto-collapse the current step after completion
      setExpandedSteps(prev => prev.filter(id => id !== stepId));
      
      // Move to next step if not the last one
      if (stepId < 3) {
        setCurrentStep(stepId + 1);
      } else {
        // All steps completed, mark ritual as complete
        handleMarkComplete();
      }
    }
  };

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
          <Card className={`p-6 space-y-6 ${activeTab === 'morning' ? 'bg-white/90 dark:bg-gray-50/90' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
            {/* Ritual Header */}
            <div className="text-center space-y-3">
              {currentEntry.headerImageUrl ? (
                <>
                  <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={currentEntry.headerImageUrl} 
                      alt={currentEntry.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    {currentEntry.title}
                  </h2>
                  {((dayNum === 1 && activeTab === 'morning') || (dayNum === 1 || dayNum === 2 || dayNum === 3) && activeTab === 'evening') && (
                      <div className="flex justify-center gap-2 mb-3">
                        <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          <span className="text-xs font-medium text-white">{dayNum === 1 && activeTab === 'morning' ? '7 Min' : dayNum === 1 && activeTab === 'evening' ? '8–10 Min' : dayNum === 2 ? '15–20 Min' : 'ca. 12 Min'}</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-0.5">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          {dayNum === 2 && <div className="w-1 h-1 bg-white rounded-full"></div>}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          <span className="text-xs font-medium text-white">{dayNum === 1 && activeTab === 'morning' ? 'Energisierend' : dayNum === 3 ? 'Balancierend' : 'Beruhigend'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  </div>
                </>
              ) : (
                <div className="text-4xl">
                  {activeTab === 'morning' ? '🌅' : '🌙'}
                </div>
              )}
              {!currentEntry.headerImageUrl && (
                <div>
                  <h2 className="text-2xl font-bold text-apple-gray-dark dark:text-white">
                    {currentEntry.title}
                  </h2>
                  {activeTab === 'morning' && dayNum === 1 ? (
                    <div className="flex justify-center gap-3 mt-3">
                      <div className="bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full flex items-center gap-1 border border-gray-200 dark:border-gray-700">
                        <span className="text-gray-700 dark:text-gray-300">⏱️</span>
                        <span className="text-xs font-medium text-gray-800 dark:text-gray-200">7 Min</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full flex items-center gap-1 border border-gray-200 dark:border-gray-700">
                        <span className="text-gray-700 dark:text-gray-300">📊</span>
                        <div className="flex items-center gap-0.5">
                          <div className="w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full flex items-center gap-1 border border-gray-200 dark:border-gray-700">
                        <span className="text-gray-700 dark:text-gray-300">✨</span>
                        <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Energisierend</span>
                      </div>
                    </div>
                  ) : activeTab === 'morning' ? (
                    <p className="text-apple-gray-medium">
                      {uiCopy.home.morningRitual}
                    </p>
                  ) : (dayNum === 1 || dayNum === 2 || dayNum === 3) && activeTab === 'evening' ? (
                  <div className="flex justify-center gap-3 mt-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="text-blue-600 dark:text-blue-400">⏱️</span>
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-300">{dayNum === 1 ? '8–10 Min' : dayNum === 2 ? '15–20 Min' : 'ca. 12 Min'}</span>
                    </div>
           <div className="bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full flex items-center gap-1">
             <span className="text-yellow-600 dark:text-yellow-400">📊</span>
             <div className="flex items-center gap-0.5">
               <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full"></div>
               {dayNum === 2 && <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full"></div>}
             </div>
           </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="text-purple-600 dark:text-purple-400">✨</span>
                      <span className="text-xs font-medium text-purple-700 dark:text-purple-300">{dayNum === 3 ? 'Balancierend' : 'Beruhigend'}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-apple-gray-medium">
                    {uiCopy.home.eveningRitual}
                  </p>
                )}
              </div>
              )}
            </div>

            {/* Micro Bite */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                {uiCopy.checkin.microBiteLabel}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {currentEntry.microBite}
              </p>
            </div>

            {/* Step-by-Step Flow for Day 1 Morning & Day 1, 2 & 3 Evening */}
            {((dayNum === 1 && activeTab === 'morning') || (dayNum === 1 || dayNum === 2 || dayNum === 3) && activeTab === 'evening') && currentEntry.steps ? (
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="flex items-center justify-center space-x-2">
                  {currentEntry.steps.map((_, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        completedSteps.includes(index + 1) 
                          ? 'bg-white/20 backdrop-blur-sm border border-white/30 text-white' 
                          : currentStep === index + 1 
                            ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white' 
                            : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      {index < (currentEntry.steps?.length || 0) - 1 && (
                        <div className={`w-8 h-0.5 mx-2 ${
                          completedSteps.includes(index + 1) ? 'bg-white/30' : 'bg-gray-200 dark:bg-gray-700'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Current Step */}
                {currentEntry.steps.map((step) => (
                  <div key={step.id} className={`rounded-lg border transition-all duration-300 relative ${
                    step.id === currentStep
                      ? activeTab === 'morning' 
                        ? 'bg-white/80 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 shadow-lg'
                        : 'bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 shadow-lg'
                      : step.id < currentStep
                        ? activeTab === 'morning'
                          ? 'bg-white/60 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700'
                          : 'bg-gray-100 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700'
                        : activeTab === 'morning'
                          ? 'bg-white/40 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700 opacity-50'
                          : 'bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700 opacity-50'
                  }`}>
                    {step.id < currentStep && (
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 rounded-lg pointer-events-none"></div>
                    )}
                    {/* Step Header - Clickable Area */}
                    <div 
                      className={`p-4 cursor-pointer transition-all duration-200 ${
                        step.id <= currentStep 
                          ? 'hover:bg-gray-100/50 dark:hover:bg-gray-700/30' 
                          : 'cursor-not-allowed'
                      }`}
                      onClick={() => step.id <= currentStep && toggleStepExpansion(step.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          {step.imageUrl && (
                            <img 
                              src={step.imageUrl} 
                              alt={step.title}
                              className="w-12 h-12 rounded-lg object-cover shadow-sm"
                            />
                          )}
                          <div className="flex-1">
                         <h3 className={`font-medium ${
                           step.id === currentStep
                             ? activeTab === 'morning' 
                               ? 'text-gray-900 dark:text-gray-100'
                               : 'text-gray-900 dark:text-gray-100'
                               : step.id < currentStep
                                 ? activeTab === 'morning'
                                   ? 'text-gray-900 dark:text-gray-300'
                                   : 'text-gray-700 dark:text-gray-300'
                                 : activeTab === 'morning'
                                   ? 'text-gray-800 dark:text-gray-400'
                                   : 'text-gray-500 dark:text-gray-400'
                         }`}>
                              {step.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs ${activeTab === 'morning' ? 'text-gray-700 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                {step.duration}
                              </span>
                              {step.id <= currentStep && (
                                <>
                                  <span className={`text-xs ${activeTab === 'morning' ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400'}`}>•</span>
                                  <span className={`text-xs ${activeTab === 'morning' ? 'text-gray-700 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {expandedSteps.includes(step.id) ? 'Weniger Details' : 'Mehr Details'}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {/* Status Indicator */}
                          {step.id < currentStep ? (
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-medium px-2 py-1 rounded-full">Erledigt</div>
                          ) : step.id === currentStep ? (
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-2 py-1 rounded-full">Aktiv</div>
                          ) : (
                            <div className="text-gray-400 text-xs font-medium">Warten</div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Content */}
                    {expandedSteps.includes(step.id) && (
                      <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                        <div className="pt-4 space-y-3">
                        {/* So geht's */}
                        {step.tips && (
                          <div className={`p-3 rounded-lg border ${activeTab === 'morning' ? 'bg-white/70 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'}`}>
                            <div className="flex items-start gap-2">
                              <span className="text-gray-700 dark:text-gray-300">💡</span>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                  So geht's
                                </p>
                                <p className="text-xs text-gray-700 dark:text-gray-300">
                                  {step.tips}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                          {/* Warum */}
                          {step.why && (
                            <div className={`p-3 rounded-lg border ${activeTab === 'morning' ? 'bg-white/70 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'}`}>
                              <div className="flex items-start gap-2">
                                <span className="text-gray-700 dark:text-gray-300">🧠</span>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                    Warum?
                                  </p>
                                  <p className="text-xs text-gray-700 dark:text-gray-300">
                                    {step.why}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          
                          {/* Audio Player for Step 3 */}
                          {step.id === 3 && step.hasAudio && step.id === currentStep && (
                            <div className={`p-3 rounded-lg border ${activeTab === 'morning' ? 'bg-white/70 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'}`}>
                              <div className="flex items-start gap-2">
                                <span className="text-gray-700 dark:text-gray-300">🎧</span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    Audio-Content
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <button className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors">
                                      ▶️ Abspielen
                                    </button>
                                    <span className="text-xs text-gray-700 dark:text-gray-300">
                                      3 Min Audio
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Action Button - Only for current step */}
                          {step.id === currentStep && (
                            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                              <button
                                onClick={() => handleStepComplete(step.id)}
                                className={`w-full text-sm font-medium py-2 px-4 rounded-md transition-all duration-200 hover:shadow-sm active:scale-95 ${
                                  activeTab === 'morning' 
                                    ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                                    : 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
                                }`}
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Wird abgeschlossen...</span>
                                  </div>
                                ) : (
                                  <span>{step.id === 3 ? 'Ritual abschließen' : 'Erledigt'}</span>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback to old cards for other days */
              (currentEntry.action || currentEntry.product || currentEntry.content) && (
                <div className="space-y-3">
                  {currentEntry.action && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">
                        🎯 {currentEntry.action}
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
                        🥤 {currentEntry.product}
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
                        🎧 {currentEntry.content}
                      </p>
                      {currentEntry.contentDescription && (
                        <p className="text-xs text-orange-600 dark:text-orange-300 italic">
                          {currentEntry.contentDescription}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )
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
                {!testMode && (
                  <p className="text-apple-gray-medium">
                    Take a moment to practice this ritual mindfully.
                  </p>
                )}
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
