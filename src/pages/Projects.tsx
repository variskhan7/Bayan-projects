import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar,
  X
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Loader } from '../components/common/Loader';
import { getAllProjects } from '../services/projectService';
import { STATIC_PROJECTS, STATIC_SECTORS } from '../data/staticData';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [loading, setLoading] = useState(true);

  // Filters from URL query params or state
  const currentSearch = searchParams.get('search') || '';
  const currentSector = searchParams.get('sector') || 'All';
  const currentStatus = searchParams.get('status') || 'All';

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [selectedSector, setSelectedSector] = useState(currentSector);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  useEffect(() => {
    setLoading(true);
    getAllProjects({
      sector: selectedSector !== 'All' ? selectedSector : undefined,
      status: selectedStatus !== 'All' ? selectedStatus : undefined,
      search: searchTerm.trim() ? searchTerm.trim() : undefined,
    })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load projects:', err);
        setProjects(STATIC_PROJECTS);
        setLoading(false);
      });
  }, [selectedSector, selectedStatus, searchTerm]);

  // Sync state changes to searchParams
  const handleSectorChange = (sector: string) => {
    setSelectedSector(sector);
    const newParams = new URLSearchParams(searchParams);
    if (sector === 'All') newParams.delete('sector');
    else newParams.set('sector', sector);
    setSearchParams(newParams);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    const newParams = new URLSearchParams(searchParams);
    if (status === 'All') newParams.delete('status');
    else newParams.set('status', status);
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchTerm.trim()) newParams.set('search', searchTerm.trim());
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSector('All');
    setSelectedStatus('All');
    setSearchParams({});
  };

  const hasActiveFilters = searchTerm !== '' || selectedSector !== 'All' || selectedStatus !== 'All';

  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <section className="relative py-28 bg-navy text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=2000&q=80"
          alt="Major Construction Program"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-corporate/80" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Project Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Our Projects
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              Explore our landmark infrastructure developments spanning transportation, clean water, power plants, petrochemical units, and smart urban communities.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS BAR */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm py-4">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects by name, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-light-bg rounded-lg border border-gray-200 focus:outline-none focus:border-corporate text-navy"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
              {/* Status Tabs */}
              <div className="flex items-center bg-light-bg p-1 rounded-lg border border-gray-200 text-xs font-bold text-secondary-text">
                {['All', 'Ongoing', 'Completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      selectedStatus === st
                        ? 'bg-navy text-white shadow-sm'
                        : 'hover:text-navy'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Sector Dropdown */}
              <select
                value={selectedSector}
                onChange={(e) => handleSectorChange(e.target.value)}
                className="text-xs font-semibold py-2 px-3 bg-light-bg border border-gray-200 rounded-lg text-navy focus:outline-none focus:border-corporate"
              >
                <option value="All">All Sectors</option>
                {STATIC_SECTORS.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="py-16 bg-light-bg min-h-[500px]">
        <div className="section-container">
          {/* Results count header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-semibold text-secondary-text">
              Showing <span className="font-bold text-navy">{projects.length}</span> Landmark Projects
            </span>
            {hasActiveFilters && (
              <span className="text-xs bg-corporate/10 text-corporate px-2.5 py-1 rounded-full font-bold">
                Filtered Results
              </span>
            )}
          </div>

          {loading ? (
            <Loader message="Loading portfolio landmarks..." />
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center max-w-lg mx-auto shadow-sm">
              <h3 className="text-lg font-bold text-navy mb-2">No projects match your filter criteria</h3>
              <p className="text-sm text-secondary-text mb-6">
                Try searching with different keywords or clearing your active sector and status filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 bg-navy text-white text-xs font-bold rounded shadow hover:bg-corporate transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-2 border border-gray-100"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

                      {/* Status Badge */}
                      <div className="absolute top-3.5 right-3.5">
                        <span
                          className={`px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded shadow-sm ${
                            project.status === 'Completed'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-accent text-white'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Sector Tag */}
                      <div className="absolute bottom-3 left-4">
                        <span className="text-xs font-semibold text-gray-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                          {project.sector}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-secondary-text mb-2">
                        <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>

                      <h3 className="text-base font-bold text-navy group-hover:text-corporate transition-colors line-clamp-2 mb-2">
                        {project.title}
                      </h3>

                      <p className="text-xs text-secondary-text leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-6 pt-0">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="w-full py-2.5 px-4 bg-light-bg hover:bg-navy hover:text-white text-navy font-semibold text-xs rounded flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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

export default Projects;

