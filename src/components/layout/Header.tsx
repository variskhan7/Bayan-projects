import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Search, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook, 
  Menu, 
  X,
  Lock
} from 'lucide-react';
import { STATIC_SECTORS } from '../../data/staticData';
import { getCustomMedia } from '../../services/mediaService';

export const Header: React.FC = () => {
  const [sectorsDropdown, setSectorsDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [mediaDropdown, setMediaDropdown] = useState(false);
  const [careersDropdown, setCareersDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSectorsDropdown(false);
    setAboutDropdown(false);
    setMediaDropdown(false);
    setCareersDropdown(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left White Brand Logo Box with Official Logo */}
        <div className="bg-white flex items-center justify-between px-4 sm:px-6 md:px-8 py-2 md:py-3 md:w-[300px] lg:w-[340px] shrink-0 border-r border-gray-100 shadow-sm z-20">
          <Link to="/" className="flex items-center gap-3 group">
            {/* User Uploaded Logo Icon */}
            <img 
              src={logoSrc} 
              alt="BAYAN PROJECTS Logo" 
              className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full shadow-sm border border-amber-200/50 p-0.5 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-black text-[#0b4887] tracking-wider leading-none">
                BAYAN
              </span>
              <span className="text-xs font-bold text-[#0b4887] tracking-widest leading-none mt-1">
                PROJECTS
              </span>
            </div>
          </Link>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-gray-600 hover:text-[#006bb6]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#006bb6]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Right Blue Two-Tier Header Bar */}
        <div className="flex-1 bg-[#006bb6] text-white flex flex-col justify-between py-1.5 px-4 lg:px-8">
          {/* Top Row: Utility navigation & Socials */}
          <div className="hidden md:flex items-center justify-end space-x-6 text-[12px] font-medium border-b border-white/20 pb-1.5">
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

            {/* Social Icons matching Tata header */}
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
          <div className="hidden md:flex items-center justify-end space-x-6 lg:space-x-8 text-[13px] font-semibold pt-1.5">
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

            {/* Sustainability */}
            <div className="relative py-1">
              <NavLink to="/sustainability" className="flex items-center gap-1 hover:text-amber-300">
                Sustainability <ChevronDown className="w-3 h-3" />
              </NavLink>
            </div>

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
        <div className="bg-white border-b border-gray-200 shadow-md py-3 px-6 animate-fadeIn">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Search className="w-5 h-5 text-gray-400" />
            <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Search Bayan Projects, sectors, landmark projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm outline-none text-gray-800 placeholder:text-gray-400"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#006bb6] text-white text-xs font-semibold rounded hover:bg-[#005590]"
              >
                Search
              </button>
            </form>
            <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#006bb6] text-white px-6 py-5 border-t border-white/20 space-y-3">
          <Link to="/" className="block py-1 text-sm font-semibold hover:text-amber-300">Home</Link>
          <Link to="/about" className="block py-1 text-sm font-semibold hover:text-amber-300">About Us</Link>
          <Link to="/sectors" className="block py-1 text-sm font-semibold hover:text-amber-300">Sectors</Link>
          <Link to="/services" className="block py-1 text-sm font-semibold hover:text-amber-300">Our Services</Link>
          <Link to="/projects" className="block py-1 text-sm font-semibold hover:text-amber-300">Landmark Projects</Link>
          <Link to="/sustainability" className="block py-1 text-sm font-semibold hover:text-amber-300">Sustainability</Link>
          <Link to="/news" className="block py-1 text-sm font-semibold hover:text-amber-300">Media Center</Link>
          <Link to="/careers" className="block py-1 text-sm font-semibold hover:text-amber-300">Careers</Link>
          <Link to="/contact" className="block py-1 text-sm font-semibold hover:text-amber-300">Contact Us</Link>
          <Link to="/admin" className="block py-1 text-sm font-semibold text-amber-300">Admin Panel</Link>
        </div>
      )}
    </header>
  );
};
