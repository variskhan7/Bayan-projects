import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to Top"
      className="fixed bottom-6 right-6 z-40 p-3.5 bg-navy hover:bg-corporate text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent border border-white/20"
    >
      <ArrowUp className="w-5 h-5 text-accent" />
    </button>
  );
};

