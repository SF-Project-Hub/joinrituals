import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'interactive' | 'elevated';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  onClick,
  variant = 'default' 
}) => {
  const baseClasses = [
    'bg-white dark:bg-apple-gray-dark',
    'border border-apple-gray dark:border-apple-gray-medium',
    'rounded-xl',
    'transition-all duration-200 ease-in-out',
  ];

  const variantClasses = {
    default: ['shadow-apple-card'],
    interactive: [
      'shadow-apple-card hover:shadow-lg',
      'cursor-pointer active:scale-98',
      'hover:border-apple-blue/30',
    ],
    elevated: [
      'shadow-lg hover:shadow-xl',
      'border-apple-blue/20',
    ],
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    className
  );

  if (onClick) {
    return (
      <button
        className={cn(classes, 'text-left w-full')}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;
