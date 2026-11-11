import React from 'react';

interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[240px]">
      <div
        className={`${sizeClasses[size]} border-gray-200 border-t-accent rounded-full animate-spin mb-4`}
      />
      {message && <p className="text-sm font-medium text-secondary-text">{message}</p>}
    </div>
  );
};

