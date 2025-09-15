import React from 'react';
import { cn } from '../lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
}) => {
  const sizeConfig = {
    sm: {
      track: 'w-10 h-6',
      thumb: 'w-4 h-4',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-12 h-7',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-8',
      thumb: 'w-6 h-6',
      translate: 'translate-x-6',
    },
  };

  const { track, thumb, translate } = sizeConfig[size];

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center justify-between">
      {(label || description) && (
        <div className="flex-1 mr-4">
          {label && (
            <label className="text-base font-medium text-apple-gray-dark dark:text-white">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-apple-gray-medium">
              {description}
            </p>
          )}
        </div>
      )}
      
      <button
        type="button"
        className={cn(
          'relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer',
          'transition-colors ease-in-out duration-200',
          'focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2',
          track,
          checked
            ? 'bg-apple-blue'
            : 'bg-apple-gray dark:bg-apple-gray-medium',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow-lg',
            'transform ring-0 transition ease-in-out duration-200',
            thumb,
            checked ? translate : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
};

export default Toggle;
