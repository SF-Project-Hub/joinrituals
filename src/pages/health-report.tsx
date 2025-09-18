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
      router.push('/checkin?challengeId=30-day-reset&day=1&tab=morning');
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
          <div className="max-w-[320px] mx-auto">
            {/* App Name */}
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              rituals
            </h1>
            
            {/* Weekly Health Report Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Weekly Health Report</h2>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>

              {/* Summary Section */}
              <div className="px-6 py-4 bg-blue-600 text-white">
                <h3 className="text-sm font-bold uppercase tracking-wide mb-2">SUMMARY</h3>
                <p className="text-sm leading-relaxed">
                  Your health data shows a proactive approach to fitness with a variety of workouts, which is excellent for your longevity goals. However, your sleep duration is consistently below the recommended range and shows signs of fragmentation. There's a potential conflict between your evening workout schedule and your primary goal of improving sleep quality.
                </p>
              </div>

              {/* Main Report Title */}
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Your Personal Health Report</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Date: September 17, 2025</p>
                  <p>Analysis Period: July 19, 2025 - September 17, 2025</p>
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
              <div className="px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Key Health Metrics This Week</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-800">Metric</th>
                        <th className="text-left py-2 font-medium text-gray-800">Your Value</th>
                        <th className="text-left py-2 font-medium text-gray-800">Trend</th>
                        <th className="text-left py-2 font-medium text-gray-800">What This Means</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Total Sleep</td>
                        <td className="py-2">6.8 hours</td>
                        <td className="py-2">→</td>
                        <td className="py-2">Consistent, but below optimal for recovery</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Workouts/Week</td>
                        <td className="py-2">3-4 sessions</td>
                        <td className="py-2">→</td>
                        <td className="py-2">Good variety, but strength training is infrequent</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Time Awake in Bed</td>
                        <td className="py-2">30-160 minutes</td>
                        <td className="py-2">→</td>
                        <td className="py-2">Some long awake periods, possible sleep disruption</td>
                      </tr>
                      <tr>
                        <td className="py-2">Daily Steps</td>
                        <td className="py-2">2,000-24,800</td>
                        <td className="py-2">→</td>
                        <td className="py-2">Active, with a few very high step days</td>
                      </tr>
                    </tbody>
                  </table>
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
                className="w-full py-4 px-6 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <span>✨</span>
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
