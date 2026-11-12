import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight,
  Search, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook, 
  Menu, 
  X,
  Lock,
  Phone,
  Mail,
  Building2,
  Briefcase,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { STATIC_SECTORS } from '../../data/staticData';
import { getCustomMedia } from '../../services/mediaService';

export const Header: React.FC = () => {
  const [sectorsDropdown, setSectorsDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [mediaDropdown, setMediaDropdown] = useState(false);
  const [careersDropdown, setCareersDropdown] = useState(false);

  // Mobile drawer and accordion states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);
  const [mobileCareersOpen, setMobileCareersOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const custom = getCustomMedia();
    if (custom.brand_logo) setLogoSrc(custom.brand_logo);

    const handleUpdate = () => {
      const up = getCustomMedia();
      if (up.brand_logo) setLogoSrc(up.brand_logo);
      else setLogoSrc('/logo.png');
    };
    window.addEventListener('bayan_media_updated', handleUpdate);
    return () => window.removeEventListener('bayan_media_updated', handleUpdate);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSectorsDropdown(false);
    setAboutDropdown(false);
    setMediaDropdown(false);
    setCareersDropdown(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white">
      <div className="flex flex-col md:flex-row w-full">
        {/* Brand Logo Box */}
        <div className="bg-white flex items-center justify-between px-4 sm:px-6 md:px-8 py-2.5 md:py-3 md:w-[300px] lg:w-[340px] shrink-0 border-r border-gray-100 z-20">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <img 
              src={logoSrc} 
              alt="BAYAN PROJECTS Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded-full shadow-sm border border-amber-200/50 p-0.5 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl lg:text-2xl font-black text-[#0b4887] tracking-wider leading-none">
                BAYAN
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#0b4887] tracking-widest leading-none mt-1">
                PROJECTS
              </span>
            </div>
          </Link>

          {/* Mobile Right Controls: Search button & Hamburger */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:text-[#006bb6] hover:bg-gray-100 transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-[#006bb6] text-white flex items-center justify-center shadow-sm hover:bg-[#005590] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Right Blue Two-Tier Header Bar (Desktop Only) */}
        <div className="hidden md:flex flex-1 bg-[#006bb6] text-white flex-col justify-between py-1.5 px-4 lg:px-8">
          {/* Top Row: Utility navigation & Socials */}
          <div className="flex items-center justify-end space-x-5 lg:space-x-6 text-[12px] font-medium border-b border-white/20 pb-1.5">
            <NavLink to="/" className="hover:text-amber-300 transition-colors">
              Home
            </NavLink>
            <NavLink to="/news" className="hover:text-amber-300 transition-colors">
              Blogs
            </NavLink>
            <NavLink to="/projects" className="hover:text-amber-300 transition-colors">
              Landmark Projects
            </NavLink>
            <NavLink to="/contact" className="hover:text-amber-300 transition-colors">
              Partner With Us
            </NavLink>
            <NavLink to="/contact" className="hover:text-amber-300 transition-colors">
              Contact Us
            </NavLink>
            <NavLink to="/admin" className="text-amber-300 hover:underline flex items-center gap-1 font-bold">
              <Lock className="w-3 h-3" /> Admin
            </NavLink>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 pl-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-5 h-5 rounded-full bg-white text-[#006bb6] flex items-center justify-center hover:opacity-90">
                <Linkedin className="w-3 h-3 fill-current" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90">
                <Instagram className="w-3 h-3" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center hover:opacity-90">
                <Youtube className="w-3 h-3 fill-current" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center hover:opacity-90">
                <Facebook className="w-3 h-3 fill-current" />
              </a>
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                title="Search"
                className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40"
              >
                <Search className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Bottom Row: Main Mega Navigation Bar */}
          <div className="flex items-center justify-end space-x-5 lg:space-x-8 text-[13px] font-semibold pt-1.5">
            {/* About Us */}
            <div 
              className="relative py-1 cursor-pointer"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <NavLink to="/about" className="flex items-center gap-1 hover:text-amber-300">
                About Us <ChevronDown className="w-3 h-3" />
              </NavLink>
              {aboutDropdown && (
                <div className="absolute top-full left-0 w-48 bg-white text-gray-800 shadow-xl rounded-b-md py-2 border-t-2 border-[#006bb6] z-50">
                  <Link to="/about" className="block px-4 py-2 hover:bg-blue-50 text-xs font-medium">Company Overview</Link>
                  <Link to="/about" className="block px-4 py-2 hover:bg-blue-50 text-xs font-medium">Mission & Vision</Link>
                  <Link to="/about" className="block px-4 py-2 hover:bg-blue-50 text-xs font-medium">Leadership Team</Link>
                  <Link to="/about" className="block px-4 py-2 hover:bg-blue-50 text-xs font-medium">Accreditations</Link>
                </div>
              )}
            </div>

            {/* Sectors */}
            <div 
              className="relative py-1 cursor-pointer"
              onMouseEnter={() => setSectorsDropdown(true)}
              onMouseLeave={() => setSectorsDropdown(false)}
            >
              <NavLink to="/sectors" className="flex items-center gap-1 hover:text-amber-300">
                Sectors <ChevronDown className="w-3 h-3" />
              </NavLink>
              {sectorsDropdown && (
                <div className="absolute top-full -left-20 w-64 bg-white text-gray-800 shadow-xl rounded-b-md py-2 border-t-2 border-[#006bb6] z-50">
                  {STATIC_SECTORS.map((s) => (
                    <Link 
                      key={s.id} 
                      to={`/sectors/${s.slug}`}
                      className="block px-4 py-2 hover:bg-blue-50 text-xs font-medium text-gray-700"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services */}
            <NavLink to="/services" className="hover:text-amber-300 py-1">
              Services
            </NavLink>

            {/* Sustainability */}
            <NavLink to="/sustainability" className="flex items-center gap-1 hover:text-amber-300 py-1">
              Sustainability
            </NavLink>

            {/* Media Center */}
            <div 
              className="relative py-1 cursor-pointer"
              onMouseEnter={() => setMediaDropdown(true)}
              onMouseLeave={() => setMediaDropdown(false)}
            >
              <NavLink to="/news" className="flex items-center gap-1 hover:text-amber-300">
                Media Center <ChevronDown className="w-3 h-3" />
              </NavLink>
              {mediaDropdown && (
                <div className="absolute top-full left-0 w-44 bg-white text-gray-800 shadow-xl rounded-b-md py-2 border-t-2 border-[#006bb6] z-50">
                  <Link to="/news" className="block px-4 py-2 hover:bg-blue-50 text-xs font-medium">Press Releases</Link>
                  <Link to="/news" className="block px-4 py-2 hover:bg-blue-50 text-xs font-medium">Videos & Media</Link>
                </div>
              )}
            </div>

            {/* Careers */}
            <div 
              className="relative py-1 cursor-pointer"
              onMouseEnter={() => setCareersDropdown(true)}
              onMouseLeave={() => setCareersDropdown(false)}
            >
              <NavLink to="/careers" className="flex items-center gap-1 hover:text-amber-300">
                Careers <ChevronDown className="w-3 h-3" />
              </NavLink>
              {careersDropdown && (
                <div className="absolute top-full left-0 w-44 bg-white text-gray-800 shadow-xl rounded-b-md py-2 border-t-2 border-[#006bb6] z-50">
                  <Link to="/careers" className="block px-4 py-2 hover:bg-blue-50 text-xs font-medium">Job Openings</Link>
                  <Link to="/careers" className="block px-4 py-2 hover:bg-blue-50 text-xs font-medium">Campus Hiring</Link>
                </div>
              )}
            </div>

            {/* Health & Safety */}
            <NavLink to="/sustainability" className="hover:text-amber-300 py-1">
              Health & Safety
            </NavLink>
          </div>
        </div>
      </div>

      {/* Global Search Bar Overlay */}
      {searchOpen && (
        <div className="bg-white border-b border-gray-200 shadow-lg py-3 px-4 sm:px-6 animate-fadeIn">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-[#006bb6] shrink-0" />
            <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Search projects, sectors, engineering capabilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm outline-none text-navy placeholder:text-gray-400 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 focus:bg-white focus:border-[#006bb6]"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#006bb6] text-white text-xs font-bold rounded-lg hover:bg-[#005590] shrink-0"
              >
                Search
              </button>
            </form>
            <button 
              onClick={() => setSearchOpen(false)} 
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-navy hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Modern Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] sm:top-[68px] z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-start">
          <div className="bg-[#0b213b] text-white w-full max-h-[calc(100vh-68px)] overflow-y-auto shadow-2xl flex flex-col justify-between border-t border-white/10 animate-fadeIn">
            {/* Navigation Links List */}
            <div className="p-5 space-y-1 divide-y divide-white/10">
              {/* Home */}
              <div className="pb-2">
                <Link 
                  to="/" 
                  className="flex items-center justify-between py-2.5 text-sm font-bold text-white hover:text-amber-300"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>

              {/* About Us (Accordion) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="w-full flex items-center justify-between py-2.5 text-sm font-bold text-white hover:text-amber-300 text-left"
                >
                  <span>About Us</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileAboutOpen ? 'rotate-180 text-amber-300' : ''}`} />
                </button>
                {mobileAboutOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-2 bg-white/5 rounded-lg mt-1 text-xs text-gray-300">
                    <Link to="/about" className="block py-1.5 hover:text-amber-300 font-medium">Company Overview</Link>
                    <Link to="/about" className="block py-1.5 hover:text-amber-300 font-medium">Mission, Vision & Values</Link>
                    <Link to="/about" className="block py-1.5 hover:text-amber-300 font-medium">Executive Leadership</Link>
                    <Link to="/about" className="block py-1.5 hover:text-amber-300 font-medium">Quality & ISO Accreditations</Link>
                  </div>
                )}
              </div>

              {/* Sectors (Accordion with all 8 sectors) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
                  className="w-full flex items-center justify-between py-2.5 text-sm font-bold text-white hover:text-amber-300 text-left"
                >
                  <span className="flex items-center gap-2">
                    <span>Business Sectors</span>
                    <span className="text-[10px] bg-[#006bb6] text-white px-2 py-0.5 rounded-full">8 Divisions</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileSectorsOpen ? 'rotate-180 text-amber-300' : ''}`} />
                </button>
                {mobileSectorsOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1.5 bg-white/5 rounded-lg mt-1 text-xs text-gray-300">
                    <Link to="/sectors" className="block py-1.5 font-bold text-amber-300 border-b border-white/10 mb-1">
                      Explore All Sectors &rarr;
                    </Link>
                    {STATIC_SECTORS.map((sec) => (
                      <Link 
                        key={sec.id} 
                        to={`/sectors/${sec.slug}`}
                        className="block py-1.5 hover:text-amber-300 font-medium"
                      >
                        &bull; {sec.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services */}
              <div className="py-2">
                <Link 
                  to="/services" 
                  className="flex items-center justify-between py-2.5 text-sm font-bold text-white hover:text-amber-300"
                >
                  <span>Our Services</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>

              {/* Landmark Projects */}
              <div className="py-2">
                <Link 
                  to="/projects" 
                  className="flex items-center justify-between py-2.5 text-sm font-bold text-white hover:text-amber-300"
                >
                  <span>Landmark Projects</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>

              {/* Sustainability & Safety */}
              <div className="py-2">
                <Link 
                  to="/sustainability" 
                  className="flex items-center justify-between py-2.5 text-sm font-bold text-white hover:text-amber-300"
                >
                  <span>Sustainability & HSE</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>

              {/* Media Center (Accordion) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setMobileMediaOpen(!mobileMediaOpen)}
                  className="w-full flex items-center justify-between py-2.5 text-sm font-bold text-white hover:text-amber-300 text-left"
                >
                  <span>Media Center</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileMediaOpen ? 'rotate-180 text-amber-300' : ''}`} />
                </button>
                {mobileMediaOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-2 bg-white/5 rounded-lg mt-1 text-xs text-gray-300">
                    <Link to="/news" className="block py-1.5 hover:text-amber-300 font-medium">Press Releases & News</Link>
                    <Link to="/news" className="block py-1.5 hover:text-amber-300 font-medium">Corporate Video Gallery</Link>
                  </div>
                )}
              </div>

              {/* Careers (Accordion) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => setMobileCareersOpen(!mobileCareersOpen)}
                  className="w-full flex items-center justify-between py-2.5 text-sm font-bold text-white hover:text-amber-300 text-left"
                >
                  <span>Careers & Opportunities</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileCareersOpen ? 'rotate-180 text-amber-300' : ''}`} />
                </button>
                {mobileCareersOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-2 bg-white/5 rounded-lg mt-1 text-xs text-gray-300">
                    <Link to="/careers" className="block py-1.5 hover:text-amber-300 font-medium">Job Openings</Link>
                    <Link to="/careers" className="block py-1.5 hover:text-amber-300 font-medium">Online Candidacy Application</Link>
                  </div>
                )}
              </div>

              {/* Contact Us */}
              <div className="py-2">
                <Link 
                  to="/contact" 
                  className="flex items-center justify-between py-2.5 text-sm font-bold text-white hover:text-amber-300"
                >
                  <span>Contact Corporate Office</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>

              {/* Admin Panel Link */}
              <div className="pt-3 pb-1">
                <Link 
                  to="/admin" 
                  className="flex items-center justify-between p-3 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-300 font-bold text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Admin Control Panel</span>
                  </span>
                  <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-black">
                    LOGIN
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile Footer CTAs and Social Links */}
            <div className="p-5 bg-[#081729] border-t border-white/10 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="tel:+966114567890" 
                  className="flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-gray-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Us</span>
                </a>
                <a 
                  href="mailto:info@bayanprojects.com" 
                  className="flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-gray-200 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email</span>
                </a>
              </div>

              {/* Social Icons row */}
              <div className="flex items-center justify-center space-x-4 pt-1">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#006bb6]">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-600">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
