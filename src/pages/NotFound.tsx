import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Building2 } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-24 bg-light-bg">
      <div className="section-container text-center max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-navy text-accent font-extrabold text-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border-2 border-accent">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-secondary-text leading-relaxed mb-8">
          The requested infrastructure page, case study, or document does not exist or has been relocated within our corporate registry.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-corporate text-white font-semibold rounded text-sm transition-all shadow"
          >
            <Home className="w-4 h-4 text-accent" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-navy/20 hover:border-navy text-navy font-semibold rounded text-sm transition-all"
          >
            <span>Browse Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

