import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Upload, 
  Trash2, 
  RotateCcw, 
  Image as ImageIcon, 
  Check, 
  LogOut, 
  Eye, 
  ExternalLink,
  Layers,
  Sparkles,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { useAdminAuth } from '../../context/AuthContext';
import { 
  getCustomMedia, 
  updateSingleMedia, 
  removeSingleMedia, 
  resetAllMedia, 
  fileToBase64, 
  SiteMediaMap 
} from '../../services/mediaService';
import { STATIC_PROJECTS, STATIC_SECTORS } from '../../data/staticData';

interface MediaSlotDef {
  key: keyof SiteMediaMap;
  title: string;
  category: 'Hero' | 'About' | 'Sectors' | 'Projects' | 'Video & Branding';
  description: string;
  defaultUrl: string;
  recommendedSize: string;
}

const MEDIA_SLOTS: MediaSlotDef[] = [
  // Brand
  {
    key: 'brand_logo',
    title: 'Brand Official Logo',
    category: 'Video & Branding',
    description: 'Header & Footer circular company logo',
    defaultUrl: '/logo.png',
    recommendedSize: '512x512 PNG / JPG'
  },
  // Hero
  {
    key: 'hero_slide_1',
    title: 'Hero Slide 1 - Well Diversified Entity',
    category: 'Hero',
    description: 'Homepage primary banner backdrop',
    defaultUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2200&q=85',
    recommendedSize: '1920x1080'
  },
  {
    key: 'hero_slide_2',
    title: 'Hero Slide 2 - Urban & Transit Infrastructure',
    category: 'Hero',
    description: 'Homepage second carousel banner',
    defaultUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=2200&q=85',
    recommendedSize: '1920x1080'
  },
  {
    key: 'hero_slide_3',
    title: 'Hero Slide 3 - Clean Energy & Water',
    category: 'Hero',
    description: 'Homepage third carousel banner',
    defaultUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=85',
    recommendedSize: '1920x1080'
  },
  // About
  {
    key: 'about_experience_bg',
    title: '25 Years Graphic Background Cutout',
    category: 'About',
    description: 'Masked picture texture inside the giant "25" Years cutout',
    defaultUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800'
  },
  {
    key: 'video_spotlight_poster',
    title: 'Videos Section Main Poster',
    category: 'Video & Branding',
    description: 'Central video spotlight thumbnail backdrop',
    defaultUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80',
    recommendedSize: '1400x800'
  },
  // Key Sectors
  {
    key: 'sector_urban_infrastructure',
    title: 'Sector: Urban Infrastructure',
    category: 'Sectors',
    description: 'Urban infrastructure card illustration',
    defaultUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80',
    recommendedSize: '800x600'
  },
  {
    key: 'sector_advanced_technology',
    title: 'Sector: Advanced Technology Facilities',
    category: 'Sectors',
    description: 'High-tech data centre & cleanroom card',
    defaultUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80',
    recommendedSize: '800x600'
  },
  {
    key: 'sector_transportation',
    title: 'Sector: Transportation',
    category: 'Sectors',
    description: 'Metro rail, highway & aviation card',
    defaultUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=500&q=80',
    recommendedSize: '800x600'
  },
  {
    key: 'sector_oil_gas',
    title: 'Sector: Oil & Gas',
    category: 'Sectors',
    description: 'Refineries, cracking units & downstream processing',
    defaultUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    recommendedSize: '800x600'
  },
  {
    key: 'sector_power',
    title: 'Sector: Power & Renewables',
    category: 'Sectors',
    description: 'Utility solar, wind & HV substations',
    defaultUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    recommendedSize: '800x600'
  },
  {
    key: 'sector_water_infrastructure',
    title: 'Sector: Water Infrastructure',
    category: 'Sectors',
    description: 'Seawater desalination & treatment plants',
    defaultUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    recommendedSize: '800x600'
  },
  // Key Projects
  {
    key: 'project_p1',
    title: 'Landmark Project: Metro Rail Corridor',
    category: 'Projects',
    description: 'Major transit line with TBM underground stations',
    defaultUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800'
  },
  {
    key: 'project_p2',
    title: 'Landmark Project: Seawater Desalination Plant',
    category: 'Projects',
    description: '600,000 m3/day mega SWRO facility',
    defaultUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800'
  },
  {
    key: 'project_p3',
    title: 'Landmark Project: Solar PV 800MW Park',
    category: 'Projects',
    description: 'Utility scale solar generation field',
    defaultUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800'
  },
  {
    key: 'project_p4',
    title: 'Landmark Project: Petrochemical Complex',
    category: 'Projects',
    description: 'Industrial cracker units & high-integrity piping',
    defaultUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800'
  }
];

export const AdminDashboard: React.FC = () => {
  const { isAdminAuthenticated, logout, adminEmail } = useAdminAuth();
  const navigate = useNavigate();
  const [mediaMap, setMediaMap] = useState<SiteMediaMap>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    setMediaMap(getCustomMedia());

    const handleUpdate = () => setMediaMap(getCustomMedia());
    window.addEventListener('bayan_media_updated', handleUpdate);
    return () => window.removeEventListener('bayan_media_updated', handleUpdate);
  }, [isAdminAuthenticated, navigate]);

  const handleFileUpload = async (key: keyof SiteMediaMap, file: File) => {
    setUploadingKey(key);
    try {
      const base64 = await fileToBase64(file);
      updateSingleMedia(key, base64);
      setStatusMessage({ text: `Updated image successfully!`, type: 'success' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      console.error('File to base64 conversion failed:', err);
      alert('Failed to process image file. Please try another image.');
    } finally {
      setUploadingKey(null);
    }
  };

  const handleRemovePhoto = (key: keyof SiteMediaMap) => {
    if (confirm('Revert this photo back to default?')) {
      removeSingleMedia(key);
      setStatusMessage({ text: `Reverted to default.`, type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset ALL custom photos back to default?')) {
      resetAllMedia();
      setStatusMessage({ text: 'All media restored to defaults.', type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const categories = ['All', 'Hero', 'About', 'Sectors', 'Projects', 'Video & Branding'];

  const filteredSlots = selectedCategory === 'All'
    ? MEDIA_SLOTS
    : MEDIA_SLOTS.filter(s => s.category === selectedCategory);

  const customCount = Object.keys(mediaMap).length;

  return (
    <div className="min-h-screen bg-gray-50 text-dark-text pb-24">
      {/* Top Admin Bar */}
      <header className="bg-navy text-white px-6 py-4 shadow-md sticky top-0 z-40 border-b-2 border-accent">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#006bb6] flex items-center justify-center text-white font-extrabold text-xl shadow">
              <span className="text-accent">B</span>
            </div>
            <div>
              <span className="text-lg font-black tracking-wider block leading-none">
                BAYAN MEDIA CONTROL
              </span>
              <span className="text-[11px] text-gray-300 font-medium">
                Admin: {adminEmail}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-bold">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-gray-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
              <ExternalLink className="w-3 h-3 text-accent" />
            </Link>

            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 px-3 py-2 bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white rounded border border-red-500/30 transition-colors"
              title="Reset all images to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-accent hover:bg-accent-hover text-white rounded shadow transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Banner Alert Notification */}
        {statusMessage && (
          <div className={`mb-6 p-4 rounded-xl shadow-sm flex items-center justify-between text-sm ${
            statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">{statusMessage.text}</span>
            </div>
          </div>
        )}

        {/* Dashboard Title & Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-black text-navy">
              Website Image & Photo Management
            </h1>
            <p className="text-xs sm:text-sm text-secondary-text mt-1">
              Upload, replace, and customize every photo on the BAYAN PROJECTS website. Photos are stored directly as high-performance base64 images and applied in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-light-bg px-4 py-2.5 rounded-xl border border-gray-200 text-center">
              <span className="text-xs text-secondary-text block">Available Slots</span>
              <span className="text-lg font-black text-navy">{MEDIA_SLOTS.length}</span>
            </div>
            <div className="bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 text-center">
              <span className="text-xs text-emerald-700 block">Customized</span>
              <span className="text-lg font-black text-emerald-800">{customCount}</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#006bb6] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:text-navy border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Photo Management Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSlots.map((slot) => {
            const isCustom = Boolean(mediaMap[slot.key]);
            const currentImg = mediaMap[slot.key] || slot.defaultUrl;
            const isBusy = uploadingKey === slot.key;

            return (
              <div
                key={slot.key}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Image Preview Area */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden group">
                    <img
                      src={currentImg}
                      alt={slot.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="text-xs text-white font-medium text-center">
                        Recommended: {slot.recommendedSize}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      {isCustom ? (
                        <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white rounded-full shadow-md">
                          Customized
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white rounded-full backdrop-blur-sm">
                          Default
                        </span>
                      )}
                    </div>

                    {/* Category Tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-white/90 text-navy rounded shadow-sm">
                        {slot.category}
                      </span>
                    </div>
                  </div>

                  {/* Slot Details */}
                  <div className="p-5">
                    <h3 className="font-bold text-navy text-sm mb-1 line-clamp-1">
                      {slot.title}
                    </h3>
                    <p className="text-xs text-secondary-text leading-relaxed line-clamp-2">
                      {slot.description}
                    </p>
                  </div>
                </div>

                {/* Upload & Action Controls */}
                <div className="p-5 pt-0 border-t border-gray-100 mt-2 flex items-center gap-2">
                  {/* File Upload Button */}
                  <label className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold text-center cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isBusy
                      ? 'bg-gray-200 text-gray-500 cursor-wait'
                      : 'bg-[#006bb6] hover:bg-[#005590] text-white active:scale-95'
                  }`}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isBusy ? 'Saving Base64...' : 'Change Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isBusy}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(slot.key, file);
                      }}
                    />
                  </label>

                  {/* Reset Single Slot */}
                  {isCustom && (
                    <button
                      onClick={() => handleRemovePhoto(slot.key)}
                      title="Revert back to default photo"
                      className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

