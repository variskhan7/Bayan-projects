import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Youtube,
  ShieldCheck,
  Award,
  Globe2,
  Clock
} from 'lucide-react';
import { STATIC_SECTORS } from '../../data/staticData';
import { getCustomMedia } from '../../services/mediaService';

export const Footer: React.FC = () => {
  const [logoSrc, setLogoSrc] = useState('/logo.png');

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

  return (
    <footer className="bg-[#081729] text-white pt-16 pb-8 border-t-4 border-[#D4AF37] relative overflow-hidden">
      {/* Decorative subtle background grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="section-container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Company Profile with Logo (Styled exactly as Image 4) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex flex-col items-start gap-3 group">
              <div className="flex items-center gap-3.5">
                <img 
                  src={logoSrc} 
                  alt="BAYAN PROJECTS Logo" 
                  className="w-14 h-14 rounded-full object-contain bg-white p-0.5 shadow-xl border-2 border-[#D4AF37]"
                />
                <div>
                  {/* Luxury 3D Gold Gradient Title matching 4th image */}
                  <h2 className="text-xl sm:text-2xl font-black tracking-wider leading-tight uppercase bg-gradient-to-r from-[#FCEBB6] via-[#D4AF37] to-[#AA771C] bg-clip-text text-transparent drop-shadow">
                    BAYAN PROJECTS PVT LTD
                  </h2>
                  {/* Decorative Builders & Developers sub-line */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-[#E5C158]">
                      BUILDERS &amp; DEVELOPERS
                    </span>
                    <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </div>
                </div>
              </div>
            </Link>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              BAYAN PROJECTS PVT LTD is a premier corporate engineering, procurement, and construction (EPC) enterprise delivering complex, sustainable, and nation-building infrastructure across India and the Middle East.
            </p>

            {/* Certifications preview badge */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-300 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-300 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>ISO 45001:2018</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-300 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>ISO 14001:2015</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded bg-white/5 hover:bg-[#006bb6] flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200 border border-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded bg-white/5 hover:bg-[#006bb6] flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200 border border-white/10"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded bg-white/5 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200 border border-white/10"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded bg-white/5 hover:bg-blue-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200 border border-white/10"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#D4AF37] pl-3">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  About BAYAN
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  Sustainability &amp; HSE
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  News &amp; Media
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  Careers &amp; Opportunities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  Contact Corporate Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Business Sectors */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#D4AF37] pl-3">
              Core Sectors
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              {STATIC_SECTORS.slice(0, 6).map((sector) => (
                <li key={sector.id}>
                  <Link
                    to={`/sectors/${sector.slug}`}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                    {sector.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/sectors" className="text-amber-300 hover:underline text-xs font-semibold pt-1 inline-block">
                  View All 8 Sectors &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Both Corporate Offices & Contact Info (Requested in prompt) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#D4AF37] pl-3">
              Corporate Offices
            </h3>
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-300">
              {/* Office 1: Delhi India */}
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold text-white text-xs block mb-0.5 text-amber-300">
                    Registered Office (India):
                  </span>
                  <span className="text-[12px] text-gray-300">
                    18, Block N, Green Park Extension,<br />
                    New Delhi, Delhi 110016, India
                  </span>
                </div>
              </div>

              {/* Office 2: Riyadh Saudi Arabia */}
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5">
                <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold text-white text-xs block mb-0.5 text-amber-300">
                    Regional Office (Middle East):
                  </span>
                  <span className="text-[12px] text-gray-300">
                    Bayan Corporate Tower, Level 14,<br />
                    King Fahd Road, Al-Olaya, Riyadh 12214, Saudi Arabia
                  </span>
                </div>
              </div>

              {/* Mobile / Phone Number */}
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+919456496286" className="text-xs sm:text-sm font-bold text-white hover:text-amber-300 transition-colors">
                  +91 94564 96286
                </a>
              </div>

              {/* Email Address */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:mkccc86@gmail.com" className="text-xs sm:text-sm font-medium text-white hover:text-amber-300 transition-colors truncate">
                  mkccc86@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} BAYAN PROJECTS PVT LTD. All rights reserved. Builders &amp; Developers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link to="/about" className="hover:text-amber-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-amber-300 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/sustainability" className="hover:text-amber-300 transition-colors">
              HSE Charter
            </Link>
            <Link to="/contact" className="hover:text-amber-300 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
