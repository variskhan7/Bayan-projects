import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-navy';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variantClasses = {
    primary: 'bg-accent hover:bg-accent-hover text-white shadow-md hover:shadow-lg',
    secondary: 'bg-corporate hover:bg-corporate-dark text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-white/80 hover:border-white text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm',
    'outline-navy': 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
  };

  const sizeClasses = {
    sm: 'text-sm px-4 py-2 gap-1.5',
    md: 'text-base px-6 py-3 gap-2',
    lg: 'text-lg px-8 py-3.5 gap-2.5',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
};

