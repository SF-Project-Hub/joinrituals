import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  isLoading,
  ...props
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium rounded-lg',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-3 focus:ring-apple-blue/30',
    'active:scale-95',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
  ];

  const variantClasses = {
    primary: [
      'bg-apple-blue text-white',
      'hover:bg-apple-blue-dark hover:shadow-apple-button',
      'active:bg-apple-blue-dark',
    ],
    secondary: [
      'bg-apple-gray text-apple-gray-dark',
      'hover:bg-gray-200 hover:shadow-apple-button',
      'dark:bg-apple-gray-dark dark:text-white',
      'dark:hover:bg-gray-700',
    ],
    outline: [
      'border-2 border-apple-blue text-apple-blue bg-transparent',
      'hover:bg-apple-blue hover:text-white hover:shadow-apple-button',
      'active:bg-apple-blue-dark active:border-apple-blue-dark',
    ],
    ghost: [
      'text-apple-blue bg-transparent',
      'hover:bg-apple-blue/10 hover:text-apple-blue-dark',
      'active:bg-apple-blue/20',
    ],
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
