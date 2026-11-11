import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { STATIC_SERVICES } from '../data/staticData';

export const Services: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <section className="relative py-28 bg-navy text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
          alt="Engineering Services"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-corporate/80" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Turnkey Lifecycle Capabilities
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Our Core Services
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              From front-end engineering design to global equipment procurement, disciplined field construction, and lifecycle asset management, we execute with uncompromising rigor.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES LISTING */}
      <section className="py-20 lg:py-28 bg-light-bg">
        <div className="section-container space-y-16">
          <SectionHeading
            badge="Full Lifecycle EPC"
            title="End-to-End Delivery Excellence"
            subtitle="Explore each phase of our integrated EPC framework engineered to de-risk capital expenditures and guarantee technical performance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STATIC_SERVICES.map((service, idx) => (
              <div
                key={service.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group border border-gray-100 transform hover:-translate-y-2"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 text-xs font-extrabold text-accent bg-navy/90 px-3 py-1 rounded backdrop-blur-sm">
                      Phase 0{idx + 1}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy group-hover:text-corporate transition-colors mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-secondary-text leading-relaxed line-clamp-3 mb-4">
                      {service.description}
                    </p>

                    {service.features && (
                      <div className="space-y-1.5 pt-2 border-t border-gray-100">
                        {service.features.slice(0, 2).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-dark-text">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-50">
                  <Link
                    to={`/services/${service.slug}`}
                    className="w-full py-2.5 px-4 bg-light-bg hover:bg-navy hover:text-white text-navy font-semibold text-xs rounded flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <span>View Service Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

