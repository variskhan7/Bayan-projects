import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { STATIC_SECTORS, STATIC_PROJECTS } from '../data/staticData';
import { getCustomMedia, fetchRemoteMedia, SiteMediaMap, resolveVideoSource, getUploadedVideoObjectUrl } from '../services/mediaService';

const DEFAULT_HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2200&q=85',
    title: 'Well diversified Business Entity',
    subtitle: 'Presence across multiple sectors and one-stop solution provider for all customer needs'
  },
  {
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=2200&q=85',
    title: 'Delivering Sustainable Urban & Transit Infrastructure',
    subtitle: 'Connecting nations with high-speed metro rail, bridges, highways and civil landmarks'
  },
  {
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=85',
    title: 'Pioneering Clean Energy & Water Solutions',
    subtitle: 'Gigawatt-scale utility solar installations and high-recovery seawater desalination plants'
  }
];

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [customMedia, setCustomMedia] = useState<SiteMediaMap>(getCustomMedia());
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

  // Initial remote sync so other devices/phones load the exact video link & media
  useEffect(() => {
    fetchRemoteMedia().then((remote) => {
      if (remote) setCustomMedia(remote);
    });
  }, []);

  // Listen for real-time media updates made from the admin panel
  useEffect(() => {
    const handleUpdate = () => setCustomMedia(getCustomMedia());
    window.addEventListener('bayan_media_updated', handleUpdate);
    return () => window.removeEventListener('bayan_media_updated', handleUpdate);
  }, []);

  // Load uploaded video from server URL or local IndexedDB if active
  useEffect(() => {
    let activeBlobUrl: string | null = null;
    const loadUploadedVideo = async () => {
      // 1. If server uploaded URL is available (works on all devices)
      if (customMedia.spotlight_video_source === 'upload' && customMedia.spotlight_video_url) {
        setUploadedVideoUrl(customMedia.spotlight_video_url);
        return;
      }
      // 2. Fallback to IndexedDB if local browser cached it
      if (customMedia.spotlight_video_source === 'upload') {
        const url = await getUploadedVideoObjectUrl();
        if (url) {
          if (activeBlobUrl) URL.revokeObjectURL(activeBlobUrl);
          activeBlobUrl = url;
          setUploadedVideoUrl(url);
          return;
        }
      }
      setUploadedVideoUrl(null);
    };
    loadUploadedVideo();

    return () => {
      if (activeBlobUrl) URL.revokeObjectURL(activeBlobUrl);
    };
  }, [customMedia.spotlight_video_source, customMedia.spotlight_video_name, customMedia.spotlight_video_url]);

  // Auto-play hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DEFAULT_HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % STATIC_PROJECTS.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + STATIC_PROJECTS.length) % STATIC_PROJECTS.length);
  };

  const activeProject = STATIC_PROJECTS[currentProjectIndex] || STATIC_PROJECTS[0];

  // Dynamic projects with potential overrides
  const projectImage = (customMedia[`project_${activeProject.id}` as keyof SiteMediaMap] as string) || activeProject.imageUrl;
  const projectTitle = customMedia[`project_${activeProject.id}_title`] || activeProject.title;
  const projectDescription = customMedia[`project_${activeProject.id}_desc`] || activeProject.description;

  const heroSlideImages = [
    customMedia.hero_slide_1 || DEFAULT_HERO_SLIDES[0].image,
    customMedia.hero_slide_2 || DEFAULT_HERO_SLIDES[1].image,
    customMedia.hero_slide_3 || DEFAULT_HERO_SLIDES[2].image,
  ];

  const heroSlideTitles = [
    customMedia.hero_slide_1_title || DEFAULT_HERO_SLIDES[0].title,
    customMedia.hero_slide_2_title || DEFAULT_HERO_SLIDES[1].title,
    customMedia.hero_slide_3_title || DEFAULT_HERO_SLIDES[2].title,
  ];

  const heroSlideSubtitles = [
    customMedia.hero_slide_1_subtitle || DEFAULT_HERO_SLIDES[0].subtitle,
    customMedia.hero_slide_2_subtitle || DEFAULT_HERO_SLIDES[1].subtitle,
    customMedia.hero_slide_3_subtitle || DEFAULT_HERO_SLIDES[2].subtitle,
  ];

  const aboutTitle = customMedia.about_title || 'BAYAN PROJECTS';
  const aboutSubtitle = customMedia.about_subtitle || '#StrongFoundationForStrongNation #BuildingNation #TransformingLives';
  const aboutDescription = customMedia.about_description || 'Bayan Projects is one of the most admired Technology led Engineering, Procurement and Construction (EPC) companies. We have expertise in providing sustainable solutions in the execution of large and complex urban and industrial infrastructure projects while also demonstrating strong presence in refineries, power and water plants. We leverage our domain knowledge across various business segments to address the shift to clean energy to meet the nation’s Net Zero ambitions.';

  const videoTitle = customMedia.video_title || 'VIDEOS';
  const videoSubtitle = customMedia.video_subtitle || 'Bayan Projects is actively investing in its infrastructure, alleviating supply chain bottlenecks, and ensuring access to electricity, water, sanitation, and healthcare for all. Reflecting on the journey, Bayan Projects has cultivated capabilities, setting the stage for #TransformingLives.';

  const experienceBg = customMedia.about_experience_bg || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80';
  const videoSpotlightPoster = customMedia.video_spotlight_poster || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80';
  const activeVideoSrc = (customMedia.spotlight_video_source === 'upload' && uploadedVideoUrl)
    ? uploadedVideoUrl
    : customMedia.spotlight_video_url;
  const currentVideo = resolveVideoSource(activeVideoSrc);

  const sectorsFeatured = [
    {
      id: 'urban-infra',
      title: 'Urban Infrastructure',
      slug: 'urban-infrastructure',
      description: 'Urban infrastructure development is the foundation of every modern city and remains the key to ensuring basic services and economic prosperity...',
      iconImage: customMedia.sector_urban_infrastructure || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'advanced-tech',
      title: 'Advanced Technology Facilities',
      slug: 'advanced-technology',
      description: 'Bayan Projects stands at the forefront of delivering integrated turnkey solutions for Advanced Technology hubs, Tier IV hyperscale data centres and smart utilities...',
      iconImage: customMedia.sector_advanced_technology || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'transportation',
      title: 'Transportation',
      slug: 'transportation',
      description: 'Bayan Projects is a leading company in the region’s metro rail and airport construction sectors, wherein it provides comprehensive turnkey EPC execution...',
      iconImage: customMedia.sector_transportation || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* 1. HERO SLIDER SECTION (EXACT TATA STYLE) */}
      <section className="relative h-[72vh] min-h-[520px] max-h-[850px] w-full overflow-hidden bg-black">
        {DEFAULT_HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={heroSlideImages[idx]}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle dark gradient overlay just on left/bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

            {/* Hero Text exactly styled like Tata image 1 */}
            <div className="absolute left-4 sm:left-6 md:left-16 lg:left-24 right-4 bottom-20 sm:bottom-24 max-w-2xl text-white">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2 sm:mb-3 drop-shadow-md">
                {heroSlideTitles[idx]}
              </h1>
              <p className="text-xs sm:text-base text-gray-100 font-normal drop-shadow leading-relaxed line-clamp-3 sm:line-clamp-none">
                {heroSlideSubtitles[idx]}
              </p>
            </div>
          </div>
        ))}

        {/* Bottom Pagination Bar: Rounded rectangle outline pills with active blue fill */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-6 md:left-16 lg:left-24 z-20 flex items-center space-x-2 sm:space-x-3">
          {DEFAULT_HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 sm:h-2.5 rounded-full border border-white transition-all duration-300 ${
                idx === currentSlide ? 'w-8 sm:w-10 bg-[#006bb6] border-[#006bb6]' : 'w-4 sm:w-6 bg-transparent hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Floating Right Accessibility / Emergency Icons */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center space-x-2">
          <Link 
            to="/admin" 
            title="Admin Photo Manager"
            className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-md transition-all"
          >
            ⚙
          </Link>
          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-md cursor-pointer hover:opacity-90" title="Emergency / Alert">
            !
          </div>
          <div className="w-8 h-8 rounded-full bg-[#006bb6] text-white flex items-center justify-center text-xs shadow-md cursor-pointer hover:opacity-90" title="Accessibility">
            &#9855;
          </div>
        </div>
      </section>

      {/* 2. ABOUT US - "BAYAN PROJECTS / 25 Years Of Experience" SECTION */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#f3f8fd] to-white text-center relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-40 opacity-10 pointer-events-none bg-[radial-gradient(#006bb6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-wider uppercase mb-2">
            {aboutTitle}
          </h2>

          <div className="text-xs sm:text-sm font-bold text-[#006bb6] space-x-3 sm:space-x-5 mb-8">
            {aboutSubtitle.split(' ').map((tag, tIdx) => (
              <span key={tIdx}>{tag}</span>
            ))}
          </div>

          {/* Giant Number Cutout Graphic with Image Fill ("25") */}
          <div className="relative my-4 inline-block">
            <span 
              className="text-7xl sm:text-9xl lg:text-[160px] font-black tracking-tighter leading-none select-none text-transparent bg-clip-text"
              style={{
                backgroundImage: `url("${experienceBg}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                WebkitTextStroke: '2px rgba(0, 107, 182, 0.4)',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))'
              }}
            >
              25
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Years Of Experience
          </h3>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto font-normal">
            {aboutDescription}
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-8 h-8 rounded-full bg-[#006bb6] text-white flex items-center justify-center shadow-md animate-bounce">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. LANDMARK PROJECTS SLIDER */}
      <section className="py-20 lg:py-24 bg-[#0d1f35] text-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider mb-2">
              LANDMARK PROJECTS
            </h2>
            <div className="text-xs sm:text-sm font-semibold text-gray-300 space-x-3 sm:space-x-5">
              <span>#StrongFoundationForStrongNation</span>
              <span>#BuildingNation</span>
              <span>#TransformingLives</span>
            </div>
          </div>

          <div className="relative bg-[#091524] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="relative h-[250px] sm:h-[380px] md:h-[480px] w-full overflow-hidden">
              <img
                src={projectImage}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-transparent to-transparent" />

              <button
                onClick={prevProject}
                aria-label="Previous Landmark Project"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-9 sm:w-12 h-9 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:bg-gray-100 transition-transform active:scale-95 z-20"
              >
                <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>

              <button
                onClick={nextProject}
                aria-label="Next Landmark Project"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-9 sm:w-12 h-9 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:bg-gray-100 transition-transform active:scale-95 z-20"
              >
                <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8 bg-[#091524] border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="border-l-4 border-[#006bb6] pl-4 max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E99A36] block mb-1">
                  {activeProject.sector} &bull; {activeProject.location}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {projectTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
                  {projectDescription}
                </p>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <Link
                  to={`/projects/${activeProject.slug}`}
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 bg-[#006bb6] hover:bg-[#005590] text-white text-xs font-bold rounded uppercase tracking-wider transition-all"
                >
                  <span>Explore Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-2 mt-8">
            {STATIC_PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentProjectIndex(idx)}
                aria-label={`Project ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === currentProjectIndex ? 'w-8 bg-[#006bb6]' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR SECTORS SECTION */}
      <section className="py-20 lg:py-24 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider uppercase mb-3 text-gray-900">
              OUR SECTORS
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              We provide ready-to-deploy solutions for refineries, green fuels, roads, bridges, integrated rail & metro systems, commercial building & airports, power generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectorsFeatured.map((sec) => (
              <div
                key={sec.id}
                className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group relative"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#006bb6] transition-colors leading-snug">
                    {sec.title}
                  </h3>

                  <Link
                    to={`/sectors/${sec.slug}`}
                    className="w-10 h-10 rounded-lg bg-[#006bb6] text-white flex items-center justify-center shrink-0 shadow hover:bg-[#005590] transition-colors"
                    title="Explore Sector"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-3">
                  {sec.description}
                </p>

                <div className="mt-auto h-40 w-full rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                  <img
                    src={sec.iconImage}
                    alt={sec.title}
                    className="max-h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/sectors"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#006bb6] hover:bg-[#005590] text-white text-xs font-bold rounded uppercase tracking-wider shadow transition-all"
            >
              <span>View All 8 Sectors</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. VIDEOS & MEDIA SPOTLIGHT SECTION */}
      <section className="py-20 lg:py-24 bg-[#0d1f35] text-white relative overflow-hidden">
        <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <div 
            onClick={() => alert('Playing Previous Video Feature...')}
            className="bg-[#006bb6] text-white py-6 px-2.5 rounded-r-md cursor-pointer shadow-lg hover:bg-[#005590] transition-colors"
          >
            <span className="text-xs font-bold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
              Previous Video
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider uppercase mb-3">
            {videoTitle}
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 font-normal">
            {videoSubtitle}
          </p>

          <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
            <img
              src={videoSpotlightPoster}
              alt="Video Feature"
              className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              <button
                onClick={() => setVideoModalOpen(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#006bb6]/90 hover:bg-[#006bb6] text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 active:scale-95 mb-3"
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
              </button>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow">
                Click to Watch
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARTNER & CONTACT CALL TO ACTION */}
      <section className="py-16 bg-[#006bb6] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Partner With Bayan Projects Today
          </h2>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-6">
            Let’s engineer landmark infrastructure together. Get in touch with our corporate tender and execution teams.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white text-[#006bb6] hover:bg-gray-100 font-bold text-xs uppercase tracking-wider rounded shadow transition-all"
            >
              Contact Our Engineers
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3.5 border-2 border-white text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded transition-all"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal with Live Player */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#091524] rounded-2xl p-4 sm:p-6 max-w-4xl w-full text-white shadow-2xl border border-white/20 relative my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#006bb6] flex items-center justify-center shadow">
                  <Play className="w-4 h-4 fill-current text-white translate-x-0.5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    {videoTitle} - Corporate Presentation
                  </h3>
                  <span className="text-[11px] text-gray-400">
                    Bayan Projects Engineering & Infrastructure
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setVideoModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="Close Video"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-inner">
              {currentVideo.type === 'google-photos' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0a1b2e] to-[#040c16]">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500/20 text-[#006bb6] flex items-center justify-center mb-3 sm:mb-4 border border-blue-400/30">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5 text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                    Google Photos Shared Video
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-300 max-w-md mb-4 leading-relaxed">
                    Google Photos security policy external websites par embedded player allow nahi karti. Video ko dekhne ke liye neeche button par click karein.
                  </p>
                  <a
                    href={currentVideo.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006bb6] hover:bg-[#005590] text-white text-xs font-bold rounded-lg shadow transition-all active:scale-95"
                  >
                    <span>Watch in Google Photos</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : currentVideo.type === 'iframe' ? (
                <div className="w-full h-full relative">
                  <iframe
                    src={currentVideo.src}
                    title="Bayan Projects Corporate Video"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  {currentVideo.isGoogleDrive && currentVideo.originalUrl && (
                    <div className="absolute bottom-2 right-2 z-10">
                      <a
                        href={currentVideo.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-black/80 hover:bg-black text-[11px] text-white font-medium rounded backdrop-blur-sm transition-colors border border-white/20 inline-flex items-center gap-1.5 shadow"
                      >
                        <span>Open Drive Video</span>
                        <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <video
                  src={currentVideo.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-400">
              <p className="line-clamp-1 italic text-gray-300">
                {videoSubtitle}
              </p>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-5 py-2 bg-[#006bb6] hover:bg-[#005590] text-white rounded-lg text-xs font-bold self-end sm:self-auto shrink-0 transition-colors shadow"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
