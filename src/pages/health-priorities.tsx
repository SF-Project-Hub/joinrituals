import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const HealthPrioritiesPage: React.FC = () => {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const healthGoals = [
    { id: 'move-more', title: 'Move more', icon: '○' },
    { id: 'build-muscle', title: 'Build muscle & strength', icon: '◐' },
    { id: 'weight-management', title: 'Weight management', icon: '◑' },
    { id: 'improve-sleep', title: 'Improve sleep quality', icon: '◒' },
    { id: 'reduce-stress', title: 'Reduce stress & boost mood', icon: '◓' },
    { id: 'improve-nutrition', title: 'Improve nutrition', icon: '●' },
    { id: 'healthy-aging', title: 'Healthy aging', icon: '◔' },
    { id: 'increase-energy', title: 'Increase daily energy', icon: '◕' }
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleSubmit = async () => {
    if (selectedGoals.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      localStorage.setItem('health-priorities', JSON.stringify(selectedGoals));
      router.push('/device-connection');
    } catch (error) {
      console.error('Error saving health priorities:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>rituals</title>
        <meta name="description" content="Select your health priorities" />
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
              Health Priorities
            </h2>
            
            {/* Subtitle */}
            <p className="text-sm text-gray-500">
              Select the health goals you'd like to focus on with rituals. (Don't worry, you can change this later.)
            </p>
            
            {/* Health Goals List */}
            <div className="mt-8 space-y-3">
              {healthGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedGoals.includes(goal.id)
                      ? 'bg-gray-800 border-gray-800 text-white'
                      : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <span className="font-medium">{goal.title}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Continue Button */}
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={selectedGoals.length === 0 || isSubmitting}
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

export default HealthPrioritiesPage;
