import React from 'react';
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
  Globe2
} from 'lucide-react';
import { STATIC_SECTORS } from '../../data/staticData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t-4 border-accent relative overflow-hidden">
      {/* Decorative subtle background grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Company Profile with Logo */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="BAYAN PROJECTS" 
                className="w-12 h-12 rounded-full object-contain bg-white p-0.5 shadow-md border border-amber-300"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-wider leading-none text-white">
                  BAYAN <span className="text-accent font-light">PROJECTS</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-gray-400 mt-1">
                  Engineering & Infrastructure
                </span>
              </div>
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              BAYAN PROJECTS is a premier corporate engineering, procurement, and construction (EPC) enterprise delivering complex, sustainable, and nation-building infrastructure across transportation, energy, water, and advanced industrial sectors.
            </p>

            {/* Certifications preview badge */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded border border-white/10">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded border border-white/10">
                <Award className="w-4 h-4 text-accent" />
                <span>ISO 45001:2018</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded border border-white/10">
                <Globe2 className="w-4 h-4 text-accent" />
                <span>ISO 14001:2015</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded bg-white/5 hover:bg-corporate flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200 border border-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded bg-white/5 hover:bg-corporate flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200 border border-white/10"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded bg-white/5 hover:bg-corporate flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200 border border-white/10"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded bg-white/5 hover:bg-corporate flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200 border border-white/10"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-accent pl-3">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/about" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  About BAYAN
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  Sustainability & HSE
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  News & Media
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  Careers & Culture
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  Contact Corporate Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Business Sectors */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-accent pl-3">
              Core Sectors
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {STATIC_SECTORS.slice(0, 6).map((sector) => (
                <li key={sector.id}>
                  <Link
                    to={`/sectors/${sector.slug}`}
                    className="hover:text-accent transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-accent" />
                    {sector.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/sectors" className="text-accent hover:underline text-xs font-semibold pt-1 inline-block">
                  View All 8 Sectors &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Services & Headquarters Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-accent pl-3">
              Corporate Office
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>
                  Bayan Corporate Tower, Level 14<br />
                  King Fahd Road, Al-Olaya<br />
                  Riyadh 12214, Saudi Arabia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+966114567890" className="hover:text-accent transition-colors">
                  +966 (11) 456-7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:info@bayanprojects.com" className="hover:text-accent transition-colors">
                  info@bayanprojects.com
                </a>
              </div>
              <div className="pt-2">
                <span className="text-xs text-gray-400 block mb-1">Business Hours:</span>
                <span className="text-xs text-gray-200">Sun – Thu: 08:00 AM – 05:30 PM (AST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} BAYAN PROJECTS Co. All rights reserved. Engineering & Infrastructure Excellence.
          </p>

          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-accent transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/sustainability" className="hover:text-accent transition-colors">
              HSE Charter
            </Link>
            <Link to="/contact" className="hover:text-accent transition-colors">
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
