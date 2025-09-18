import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ChatPage: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleViewFullReport = () => {
    router.push('/health-report');
  };

  return (
    <>
      <Head>
        <title>rituals</title>
        <meta name="description" content="Chat with rituals AI assistant" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-800">
          <span>23:26</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            </div>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
            <div className="ml-2 text-xs bg-gray-800 text-white px-1 rounded">70</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="font-medium text-gray-800">Chat with rituals</span>
          </div>
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 px-4 py-6 space-y-4">
          {/* Weekly Report Card */}
          <div className="bg-indigo-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">Weekly Report</span>
              </div>
              <span className="text-sm text-indigo-200">Sep 17</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your health data shows a proactive approach to fitness with a variety of workouts, which is excellent for your longevity goals. However, your sleep duration is consistently below the recommended range and shows signs of fragmentation. There's a potential conflict between your evening workout schedule and your primary goal of improving sleep quality.
            </p>
            <button 
              onClick={handleViewFullReport}
              className="w-full bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-indigo-800 transition-colors"
            >
              View full report
            </button>
          </div>

          {/* AI Response */}
          <div className="bg-gray-100 rounded-2xl p-4 max-w-[85%]">
            <p className="text-sm text-gray-800 mb-3">
              <strong>Your report recommends:</strong>
            </p>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>Move intense workouts earlier in the day (before 4 PM) for better sleep.</li>
              <li>Add a second strength training session each week and schedule them.</li>
              <li>Use lighter activities like walking or stretching in the evening.</li>
            </ol>
            <p className="text-sm text-gray-800 mt-3">
              Which should we tackle first, or do you want to plan all three?
            </p>
            <div className="text-xs text-gray-500 mt-2">11:26 PM</div>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-xs text-gray-500">rituals can make mistakes. Talk to your doctor.</p>
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="bg-gray-100 rounded-2xl p-4 max-w-[85%]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">rituals is typing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Replies */}
        <div className="px-4 py-3 space-y-2">
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => handleSuggestion('Move workouts earlier')}
              className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Move workouts earlier
            </button>
            <button 
              onClick={() => handleSuggestion('Add more strength training')}
              className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Add more strength training
            </button>
            <button 
              onClick={() => handleSuggestion('Plan all three')}
              className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Plan all three
            </button>
          </div>
        </div>

        {/* Input Area */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>
            
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-3 bg-green-500 rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
