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
      router.push('/chat');
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
          <div className="max-w-[360px] mx-auto">
            {/* App Name */}
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              rituals
            </h1>
            
            {/* Weekly Health Report Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Weekly Health Report</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Summary Section */}
              <div className="px-6 py-5 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide">SUMMARY</h3>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Your health data shows a proactive approach to fitness with a variety of workouts, which is excellent for your longevity goals. However, your sleep duration is consistently below the recommended range and shows signs of fragmentation. There's a potential conflict between your evening workout schedule and your primary goal of improving sleep quality.
                  </p>
                </div>
              </div>

              {/* Main Report Title */}
              <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Your Personal Health Report</h2>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>September 17, 2025</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>July 19 - Sep 17, 2025</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-4"></div>
              </div>

              {/* Executive Summary */}
              <div className="px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Executive Summary</h3>
                <div className="text-sm text-gray-700 space-y-3">
                  <p>
                    This report brings you fresh, personalized insights to help you reach your health goals. You've made strong efforts to stay active, which supports your long-term health. Your variety of workouts is a big win for your longevity and fitness.
                  </p>
                  <p>
                    Two important findings stand out. First, your evening workouts may be cutting into your sleep time. Second, building muscle will require a more regular strength training routine. In this report you'll learn what changes can make the biggest difference and get a clear action plan to move forward.
                  </p>
                </div>
              </div>

              {/* Key Health Metrics */}
              <div className="px-6 py-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Key Health Metrics This Week</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-800">Total Sleep</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">6.8h</span>
                        <span className="text-gray-500">→</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Consistent, but below optimal for recovery</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-800">Workouts/Week</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-yellow-600">3-4</span>
                        <span className="text-gray-500">→</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Good variety, but strength training is infrequent</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-800">Time Awake in Bed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-purple-600">30-160m</span>
                        <span className="text-gray-500">→</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Some long awake periods, possible sleep disruption</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-800">Daily Steps</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-600">2K-24K</span>
                        <span className="text-gray-500">→</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Active, with a few very high step days</p>
                  </div>
                </div>
              </div>

              {/* Progress Toward Goals */}
              <div className="px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Progress Toward Your Goals</h3>
                <div className="text-sm text-gray-700 space-y-3">
                  <p>
                    <strong>Sleep:</strong> You're aware that sleep matters and have kept a regular bedtime, but your evening workouts may be making it harder to get enough rest. Focusing on workout timing will help.
                  </p>
                  <p>
                    <strong>Muscle:</strong> You've done well to include strength training, but the sessions are too spread out for optimal muscle growth. Increasing frequency is the next step.
                  </p>
                  <p>
                    <strong>Longevity:</strong> Your activity mix — including cardio and strength sessions — is a strong foundation for healthy aging. Keep up the variety.
                  </p>
                </div>
              </div>

              {/* Key Discoveries */}
              <div className="px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">This Week's Key Discoveries</h3>
                <h4 className="text-lg font-bold text-gray-800 mb-3">Evening Workouts May Be Reducing Sleep Duration</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-gray-800 mb-1">Why This Matters to You:</h5>
                    <p className="text-sm text-gray-700">Sleep is essential for recovery, muscle growth, and daily energy. Less sleep can slow your progress.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-gray-800 mb-1">What We Found:</h5>
                    <p className="text-sm text-gray-700">On days when you work out, especially in the late afternoon or evening, you often get less sleep. For example, after workouts on August 13th and 14th, you slept over 2 hours less than your normal average.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-gray-800 mb-1">The Science Made Simple:</h5>
                    <p className="text-sm text-gray-700">Intense exercise close to bedtime raises your heart rate and body temperature, making it harder for your body to wind down for sleep — similar to trying to relax after a suspenseful movie.</p>
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              <div className="px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Your Action Plan:</h3>
                <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Schedule intense workouts (like running or strength training) to end before 4 PM whenever possible.</li>
                  <li>If you must work out later, choose low-intensity options like walking or gentle stretching.</li>
                  <li>Try this for two weeks and track if your sleep improves.</li>
                </ol>
              </div>

              {/* Expected Benefits */}
              <div className="px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Expected Benefits:</h3>
                <p className="text-sm text-gray-700">
                  You'll likely see longer, more restful sleep — helping your recovery, muscle growth, and daily mood.
                </p>
              </div>

              {/* Q&A Section */}
              <div className="px-6 py-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Q&A</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Q: Why would working out negatively affect my sleep? I thought it was supposed to help.</p>
                    <p className="text-gray-700">A: Exercise is great for you, but intense workouts close to bedtime can make it harder to fall asleep because they ramp up your body and mind.</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Q: Is walking in the evening okay?</p>
                    <p className="text-gray-700">A: Yes, gentle activities like walking in the evening are usually fine and can even help you wind down before bed.</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Q: How important is consistency for building muscle?</p>
                    <p className="text-gray-700">A: Very important. Muscles grow when you challenge them regularly — aim for at least two strength training sessions per week to see steady progress.</p>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="px-6 py-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Important Notes</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>This analysis is based on your logged workouts and sleep data. Some activities may not have been captured if not logged.</li>
                  <li>No clinical or nutrition data was available, so recommendations focus on activity and sleep patterns.</li>
                  <li>Your data shows consistent patterns over the analysis period, giving us good confidence in these insights.</li>
                </ul>
              </div>
            </div>
            
            {/* Continue Button */}
            <div className="mt-8">
              <button
                onClick={handleContinue}
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-medium hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-lg">✨</span>
                {isSubmitting ? 'Starting...' : "Let's make a plan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthReportPage;
