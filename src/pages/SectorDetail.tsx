import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Award,
  Layers
} from 'lucide-react';
import { getSectorBySlug } from '../services/sectorService';
import { getAllProjects } from '../services/projectService';
import { Loader } from '../components/common/Loader';
import { Sector, Project } from '../types';

export const SectorDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [sector, setSector] = useState<Sector | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getSectorBySlug(slug)
      .then((data) => {
        if (!data) {
          navigate('/sectors', { replace: true });
          return;
        }
        setSector(data);

        // Fetch projects in this sector
        getAllProjects({ sector: data.title }).then((projList) => {
          setRelatedProjects(projList);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading sector detail:', err);
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="py-32">
        <Loader message="Loading sector capabilities..." />
      </div>
    );
  }

  if (!sector) return null;

  return (
    <div className="flex flex-col">
      {/* SECTOR HERO BANNER */}
      <section className="relative h-[55vh] min-h-[420px] bg-navy text-white flex items-end overflow-hidden">
        <img
          src={sector.bannerUrl || sector.imageUrl}
          alt={sector.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />

        <div className="section-container relative z-10 pb-12 w-full">
          <Link
            to="/sectors"
            className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white uppercase tracking-wider mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Business Sectors
          </Link>

          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 rounded backdrop-blur-sm border border-white/20 text-white block w-fit mb-3">
            Sector Division
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-4xl tracking-tight leading-tight">
            {sector.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-200 mt-3 max-w-3xl font-light">
            {sector.description}
          </p>
        </div>
      </section>

      {/* SECTOR OVERVIEW & CAPABILITIES */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 border-l-4 border-accent pl-3">
                  Sector Overview & Strategy
                </h2>
                <p className="text-secondary-text leading-relaxed text-base">
                  {sector.overview || sector.description}
                </p>
              </div>

              {sector.highlights && sector.highlights.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4">
                    Key Strengths & Differentiators
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sector.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-light-bg rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary-text font-medium leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sector.capabilities && sector.capabilities.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4">
                    Technical Capabilities & Scope
                  </h3>
                  <div className="space-y-3">
                    {sector.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Layers className="w-4 h-4 text-corporate shrink-0 mt-1" />
                        <span className="text-sm text-navy font-semibold">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA Card */}
            <div className="lg:col-span-4">
              <div className="bg-light-bg rounded-2xl p-8 border border-gray-200 sticky top-28 space-y-6">
                <h3 className="text-xl font-bold text-navy">
                  Partner with our {sector.title} Team
                </h3>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Our specialized engineering leads offer feasibility reviews, constructability consulting, and turnkey EPC bids tailored to your operational specifications.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded text-center block text-sm transition-all shadow"
                  >
                    Request Technical Proposal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SECTOR PROJECTS */}
      <section className="py-16 bg-light-bg border-t border-gray-200">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-navy">
                Delivered Landmarks in {sector.title}
              </h3>
              <p className="text-xs text-secondary-text mt-1">
                Representative project executions demonstrating our domain mastery.
              </p>
            </div>
            <Link
              to={`/projects?sector=${encodeURIComponent(sector.title)}`}
              className="text-xs font-bold text-corporate hover:text-navy flex items-center gap-1"
            >
              View Filtered Portfolio &rarr;
            </Link>
          </div>

          {relatedProjects.length === 0 ? (
            <p className="text-sm text-secondary-text">No active project listings under this sector.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 text-[11px] font-bold uppercase tracking-wider bg-accent text-white px-2 py-0.5 rounded">
                        {p.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 text-xs text-secondary-text mb-2">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>{p.location}</span>
                      </div>
                      <h4 className="font-bold text-navy text-base group-hover:text-corporate transition-colors mb-2">
                        {p.title}
                      </h4>
                      <p className="text-xs text-secondary-text line-clamp-2">{p.description}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="text-xs font-bold text-corporate hover:text-accent flex items-center gap-1"
                    >
                      View Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SectorDetail;

