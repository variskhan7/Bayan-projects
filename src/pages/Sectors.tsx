import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { STATIC_SECTORS } from '../data/staticData';

export const Sectors: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <section className="relative py-28 bg-navy text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Engineering Sectors"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-corporate/80" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Market Presence
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Our Business Sectors
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              From transit networks and water reclamation to utility solar and advanced technology hubs, we deploy specialized EPC capabilities across 8 strategic industrial sectors.
            </p>
          </div>
        </div>
      </section>

      {/* SECTOR CARDS GRID */}
      <section className="py-20 lg:py-28 bg-light-bg">
        <div className="section-container">
          <SectionHeading
            badge="Comprehensive Portfolio"
            title="Strategic Infrastructure Divisions"
            subtitle="Explore how our multidisciplinary teams deliver engineering excellence tailored to the unique regulatory, technical, and environmental demands of each market."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATIC_SECTORS.map((sector, idx) => (
              <div
                key={sector.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-2 border border-gray-100"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={sector.imageUrl}
                      alt={sector.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 text-xs font-extrabold text-accent bg-navy/90 px-2.5 py-1 rounded backdrop-blur-sm">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy group-hover:text-corporate transition-colors mb-3">
                      {sector.title}
                    </h3>
                    <p className="text-xs text-secondary-text leading-relaxed line-clamp-3">
                      {sector.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-50">
                  <Link
                    to={`/sectors/${sector.slug}`}
                    className="w-full py-2.5 px-4 bg-light-bg hover:bg-navy hover:text-white text-navy font-semibold text-xs rounded flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <span>Explore Sector & Projects</span>
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

export default Sectors;

