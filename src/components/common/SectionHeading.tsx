import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  alignment = 'center',
  light = false,
  className = '',
}) => {
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 ${
          light 
            ? 'bg-white/10 text-accent border border-white/20' 
            : 'bg-corporate/10 text-corporate border border-corporate/20'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight ${
        light ? 'text-white' : 'text-navy'
      }`}>
        {title}
      </h2>
      <div className={`mt-3 h-1 w-20 rounded bg-accent ${isCenter ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${
          light ? 'text-gray-300' : 'text-secondary-text'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

