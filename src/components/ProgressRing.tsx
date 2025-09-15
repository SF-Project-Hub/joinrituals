import React from 'react';
import { calculatePercentage } from '../lib/utils';

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'orange';
  showPercentage?: boolean;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  completed,
  total,
  size = 'md',
  color = 'blue',
  showPercentage = true,
  children,
}) => {
  const percentage = calculatePercentage(completed, total);
  
  const sizeConfig = {
    sm: { diameter: 60, strokeWidth: 4, fontSize: 'text-xs' },
    md: { diameter: 100, strokeWidth: 6, fontSize: 'text-sm' },
    lg: { diameter: 140, strokeWidth: 8, fontSize: 'text-base' },
  };
  
  const colorConfig = {
    blue: '#007AFF',
    green: '#30D158', 
    orange: '#FF9F0A',
  };

  const { diameter, strokeWidth, fontSize } = sizeConfig[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={diameter}
        height={diameter}
      >
        {/* Background circle */}
        <circle
          className="text-apple-gray dark:text-apple-gray-medium"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
        />
        {/* Progress circle */}
        <circle
          className="transition-all duration-500 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke={colorConfig[color]}
          fill="transparent"
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
        />
      </svg>
      
      {/* Center content */}
      <div className={`absolute inset-0 flex items-center justify-center ${fontSize} font-medium text-apple-gray-dark dark:text-white`}>
        {children || (showPercentage && (
          <span className="text-center">
            <div className="font-bold">{percentage}%</div>
            <div className="text-xs text-apple-gray-medium">
              {completed}/{total}
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressRing;
