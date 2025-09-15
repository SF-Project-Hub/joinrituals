import React from 'react';
import { cn } from '../lib/utils';
import { RitualType } from '../lib/types';

interface RitualTabsProps {
  activeTab: RitualType;
  onTabChange: (tab: RitualType) => void;
  morningCompleted?: boolean;
  eveningCompleted?: boolean;
  className?: string;
}

const RitualTabs: React.FC<RitualTabsProps> = ({
  activeTab,
  onTabChange,
  morningCompleted = false,
  eveningCompleted = false,
  className,
}) => {
  const tabs = [
    {
      id: 'morning' as RitualType,
      label: 'Morning',
      icon: '🌅',
      completed: morningCompleted,
    },
    {
      id: 'evening' as RitualType,
      label: 'Evening', 
      icon: '🌙',
      completed: eveningCompleted,
    },
  ];

  return (
    <div className={cn('flex bg-apple-gray dark:bg-apple-gray-dark rounded-lg p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md',
            'font-medium text-sm transition-all duration-200 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2',
            activeTab === tab.id
              ? 'bg-white dark:bg-apple-gray-medium text-apple-blue shadow-sm'
              : 'text-apple-gray-medium hover:text-apple-gray-dark dark:hover:text-white'
          )}
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{tab.label}</span>
          {tab.completed && (
            <span className="text-green-500">
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default RitualTabs;
