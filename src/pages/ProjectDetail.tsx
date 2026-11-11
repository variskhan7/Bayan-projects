import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Share2,
  FileText
} from 'lucide-react';
import { getProjectBySlug, getAllProjects } from '../services/projectService';
import { Loader } from '../components/common/Loader';
import { Project } from '../types';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProjectBySlug(slug)
      .then((data) => {
        if (!data) {
          navigate('/projects', { replace: true });
          return;
        }
        setProject(data);
        setActiveImage(data.imageUrl);

        // Fetch related projects from same sector
        getAllProjects({ sector: data.sector }).then((all) => {
          setRelatedProjects(all.filter((p) => p.slug !== slug).slice(0, 3));
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load project details:', err);
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="py-32">
        <Loader message="Loading project specifications..." />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="flex flex-col">
      {/* LARGE HERO PROJECT BANNER */}
      <section className="relative h-[60vh] min-h-[460px] bg-navy text-white flex items-end overflow-hidden">
        <img
          src={activeImage || project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />

        <div className="section-container relative z-10 pb-12 w-full">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white uppercase tracking-wider mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Project Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className={`px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded ${
                project.status === 'Completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-accent text-white'
              }`}
            >
              {project.status}
            </span>

            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 rounded backdrop-blur-sm border border-white/20 text-white">
              {project.sector}
            </span>

            {project.completionDate && (
              <span className="text-xs text-gray-300 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5" /> Target Handover: {project.completionDate}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-4xl tracking-tight leading-tight">
            {project.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-200 mt-3 font-medium">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{project.location}</span>
            {project.client && (
              <>
                <span className="mx-2">&bull;</span>
                <span className="text-gray-300">Client: {project.client}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* MAIN SPECIFICATION DETAILS */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Scope & Narrative */}
            <div className="lg:col-span-8 space-y-10">
              {/* Project Overview */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4 border-l-4 border-accent pl-3">
                  Project Overview
                </h2>
                <p className="text-secondary-text leading-relaxed text-base">
                  {project.description}
                </p>
              </div>

              {/* Scope of Work */}
              {project.scopeOfWork && (
                <div>
                  <h3 className="text-xl font-bold text-navy mb-3">
                    Scope of Work & Turnkey Delivery
                  </h3>
                  <p className="text-secondary-text leading-relaxed text-sm bg-light-bg p-6 rounded-xl border border-gray-100">
                    {project.scopeOfWork}
                  </p>
                </div>
              )}

              {/* Project Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4">
                    Key Engineering Highlights
                  </h3>
                  <div className="space-y-3">
                    {project.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary-text font-medium leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4">
                    Site Construction Gallery
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[project.imageUrl, ...project.gallery].map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`relative h-32 sm:h-40 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImage === imgUrl ? 'border-accent shadow-md' : 'border-transparent hover:opacity-90'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Key Specifications Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-light-bg rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm sticky top-28">
                <h3 className="text-lg font-bold text-navy mb-6 pb-4 border-b border-gray-200">
                  Project Specifications
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-xs text-secondary-text uppercase tracking-wider block mb-1">
                      Sector
                    </span>
                    <span className="font-bold text-navy">{project.sector}</span>
                  </div>

                  <div>
                    <span className="text-xs text-secondary-text uppercase tracking-wider block mb-1">
                      Location
                    </span>
                    <span className="font-bold text-navy">{project.location}</span>
                  </div>

                  <div>
                    <span className="text-xs text-secondary-text uppercase tracking-wider block mb-1">
                      Execution Status
                    </span>
                    <span className="font-bold text-accent">{project.status}</span>
                  </div>

                  {project.client && (
                    <div>
                      <span className="text-xs text-secondary-text uppercase tracking-wider block mb-1">
                        Client Entity
                      </span>
                      <span className="font-bold text-navy">{project.client}</span>
                    </div>
                  )}

                  {project.specifications &&
                    Object.entries(project.specifications).map(([key, val]) => (
                      <div key={key} className="pt-2 border-t border-gray-100">
                        <span className="text-xs text-secondary-text uppercase tracking-wider block mb-1">
                          {key}
                        </span>
                        <span className="font-bold text-navy">{val}</span>
                      </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-gray-200 mt-6">
                  <Link
                    to="/contact"
                    className="w-full py-3 bg-navy hover:bg-corporate text-white font-semibold rounded text-center block text-sm transition-colors"
                  >
                    Inquire About This Capability
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-light-bg border-t border-gray-200">
          <div className="section-container">
            <h3 className="text-2xl font-bold text-navy mb-8">
              Related Projects in {project.sector}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-accent font-bold uppercase">{rel.status}</span>
                      <h4 className="font-bold text-navy text-base mt-1 line-clamp-2">{rel.title}</h4>
                      <p className="text-xs text-secondary-text mt-2 line-clamp-2">{rel.description}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <Link
                      to={`/projects/${rel.slug}`}
                      className="text-xs font-bold text-corporate hover:text-accent flex items-center gap-1"
                    >
                      View Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;

