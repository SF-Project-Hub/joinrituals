import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const DeviceConnectionPage: React.FC = () => {
  const router = useRouter();
  const [selectedDevices, setSelectedDevices] = useState<string[]>(['apple-health']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const devices = [
    { 
      id: 'apple-health', 
      name: 'Apple Health', 
      icon: '❤️',
      brandColor: 'bg-red-500',
      isSelected: true
    },
    { 
      id: 'oura-ring', 
      name: 'Oura Ring', 
      icon: '💍',
      brandColor: 'bg-blue-500'
    },
    { 
      id: 'whoop', 
      name: 'WHOOP', 
      icon: '⌚',
      brandColor: 'bg-black'
    },
    { 
      id: 'garmin', 
      name: 'Garmin', 
      icon: '🏃',
      brandColor: 'bg-blue-600'
    }
  ];

  const toggleDevice = (deviceId: string) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleSubmit = async () => {
    if (selectedDevices.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      localStorage.setItem('connected-devices', JSON.stringify(selectedDevices));
      router.push('/lab-results');
    } catch (error) {
      console.error('Error saving device connections:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>rituals</title>
        <meta name="description" content="Connect your health devices" />
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
              Connect your devices
            </h2>
            
            {/* Subtitle */}
            <p className="text-sm text-gray-500">
              Sync data from your favorite health tracking devices.
            </p>
            
            {/* Device List */}
            <div className="mt-8 space-y-3">
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => toggleDevice(device.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedDevices.includes(device.id)
                      ? 'bg-gray-800 border-gray-800 text-white'
                      : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center text-white ${device.brandColor}`}>
                        <span className="text-sm">{device.icon}</span>
                      </div>
                      <span className="font-medium">{device.name}</span>
                    </div>
                    {selectedDevices.includes(device.id) && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Continue Button */}
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={selectedDevices.length === 0 || isSubmitting}
                className="w-full py-3 px-6 bg-yellow-400 text-gray-800 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Connecting...' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceConnectionPage;
