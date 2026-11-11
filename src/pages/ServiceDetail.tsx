import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  FileCheck2,
  PhoneCall
} from 'lucide-react';
import { getServiceBySlug } from '../services/serviceService';
import { Loader } from '../components/common/Loader';
import { Service } from '../types';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getServiceBySlug(slug)
      .then((data) => {
        if (!data) {
          navigate('/services', { replace: true });
          return;
        }
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching service:', err);
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="py-32">
        <Loader message="Loading service offerings..." />
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="flex flex-col">
      {/* SERVICE HERO BANNER */}
      <section className="relative h-[55vh] min-h-[420px] bg-navy text-white flex items-end overflow-hidden">
        <img
          src={service.bannerUrl || service.imageUrl}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />

        <div className="section-container relative z-10 pb-12 w-full">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white uppercase tracking-wider mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Core Services
          </Link>

          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 rounded backdrop-blur-sm border border-white/20 text-white block w-fit mb-3">
            Core EPC Competency
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-4xl tracking-tight leading-tight">
            {service.title} Services
          </h1>

          <p className="text-base sm:text-lg text-gray-200 mt-3 max-w-3xl font-light">
            {service.description}
          </p>
        </div>
      </section>

      {/* SERVICE CONTENT */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 border-l-4 border-accent pl-3">
                  Scope of Service
                </h2>
                <p className="text-secondary-text leading-relaxed text-base">
                  {service.fullDescription || service.description}
                </p>
              </div>

              {service.features && service.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4">
                    Core Methodologies & Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-light-bg rounded-lg border border-gray-100">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary-text font-medium leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.deliverables && service.deliverables.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4">
                    Key Client Deliverables
                  </h3>
                  <div className="space-y-3">
                    {service.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <FileCheck2 className="w-5 h-5 text-corporate shrink-0 mt-0.5" />
                        <span className="text-sm text-navy font-semibold">{del}</span>
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
                  Inquire About {service.title}
                </h3>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Engage our certified discipline engineers to assess your specifications, tender packages, and contract terms.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="w-full py-3.5 bg-navy hover:bg-corporate text-white font-semibold rounded text-center block text-sm transition-all shadow"
                  >
                    Contact Discipline Lead
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;

