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
  PlusCircle,
  Briefcase,
  ToggleLeft,
  ToggleRight,
  MapPin,
  Clock,
  Building,
  Layers,
  X,
  Users,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  Clock4,
  Inbox,
  Save,
  Type,
  Video,
  Play,
  Link2,
  Film
} from 'lucide-react';
import { useAdminAuth } from '../../context/AuthContext';
import { 
  getCustomMedia, 
  updateSingleMedia, 
  updateMediaText,
  removeSingleMedia, 
  removeSlotMediaAndText,
  resetAllMedia, 
  fileToBase64,
  videoFileToBase64,
  resolveVideoSource,
  SiteMediaMap 
} from '../../services/mediaService';
import { 
  getAllAdminJobs, 
  addAdminJob, 
  deleteAdminJob, 
  togglePublishJob,
  clearAllJobs 
} from '../../services/jobService';
import { 
  getAllApplications, 
  updateApplicationStatus, 
  deleteApplication, 
  clearAllApplications 
} from '../../services/applicationService';
import { 
  getAllEnquiries, 
  deleteEnquiry 
} from '../../services/enquiryService';
import { JobOpening, JobApplication, Enquiry } from '../../types';

interface MediaSlotDef {
  key: string;
  title: string;
  category: 'Hero' | 'About' | 'Sectors' | 'Projects' | 'Video & Branding';
  description: string;
  defaultUrl: string;
  recommendedSize: string;
  hasTextControls?: boolean;
  titleKey?: string;
  subtitleKey?: string;
  defaultTitle?: string;
  defaultSubtitle?: string;
  titleLabel?: string;
  subtitleLabel?: string;
}

const MEDIA_SLOTS: MediaSlotDef[] = [
  {
    key: 'hero_slide_1',
    title: 'Hero Slide 1 - Primary Banner',
    category: 'Hero',
    description: 'Homepage primary slide (Top carousel banner)',
    defaultUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2200&q=85',
    recommendedSize: '1920x1080',
    hasTextControls: true,
    titleKey: 'hero_slide_1_title',
    subtitleKey: 'hero_slide_1_subtitle',
    defaultTitle: 'Well diversified Business Entity',
    defaultSubtitle: 'Presence across multiple sectors and one-stop solution provider for all customer needs',
    titleLabel: 'Slide 1 Bold Title',
    subtitleLabel: 'Slide 1 Description / Subtitle'
  },
  {
    key: 'hero_slide_2',
    title: 'Hero Slide 2 - Urban & Transit',
    category: 'Hero',
    description: 'Homepage second slide (Urban & Transit)',
    defaultUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=2200&q=85',
    recommendedSize: '1920x1080',
    hasTextControls: true,
    titleKey: 'hero_slide_2_title',
    subtitleKey: 'hero_slide_2_subtitle',
    defaultTitle: 'Delivering Sustainable Urban & Transit Infrastructure',
    defaultSubtitle: 'Connecting nations with high-speed metro rail, bridges, highways and civil landmarks',
    titleLabel: 'Slide 2 Bold Title',
    subtitleLabel: 'Slide 2 Description / Subtitle'
  },
  {
    key: 'hero_slide_3',
    title: 'Hero Slide 3 - Clean Energy & Water',
    category: 'Hero',
    description: 'Homepage third slide (Clean Energy & Water)',
    defaultUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=85',
    recommendedSize: '1920x1080',
    hasTextControls: true,
    titleKey: 'hero_slide_3_title',
    subtitleKey: 'hero_slide_3_subtitle',
    defaultTitle: 'Pioneering Clean Energy & Water Solutions',
    defaultSubtitle: 'Gigawatt-scale utility solar installations and high-recovery seawater desalination plants',
    titleLabel: 'Slide 3 Bold Title',
    subtitleLabel: 'Slide 3 Description / Subtitle'
  },
  {
    key: 'about_experience_bg',
    title: '25 Years Experience Cutout & Section',
    category: 'About',
    description: 'Masked picture texture inside the giant "25" Years cutout',
    defaultUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800',
    hasTextControls: true,
    titleKey: 'about_title',
    subtitleKey: 'about_subtitle',
    defaultTitle: 'BAYAN PROJECTS',
    defaultSubtitle: '#StrongFoundationForStrongNation #BuildingNation #TransformingLives',
    titleLabel: 'Section Bold Heading',
    subtitleLabel: 'Hashtags / Tagline'
  },
  {
    key: 'video_spotlight_poster',
    title: 'Videos Section Spotlight Poster',
    category: 'Video & Branding',
    description: 'Central video spotlight thumbnail backdrop',
    defaultUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80',
    recommendedSize: '1400x800',
    hasTextControls: true,
    titleKey: 'video_title',
    subtitleKey: 'video_subtitle',
    defaultTitle: 'VIDEOS',
    defaultSubtitle: 'Bayan Projects is actively investing in its infrastructure, alleviating supply chain bottlenecks, and ensuring access to electricity, water, sanitation, and healthcare for all.',
    titleLabel: 'Videos Bold Heading',
    subtitleLabel: 'Videos Subtitle / Narrative'
  },
  {
    key: 'project_p1',
    title: 'Landmark Project: Metro Rail Corridor',
    category: 'Projects',
    description: 'Major transit line with TBM underground stations',
    defaultUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800',
    hasTextControls: true,
    titleKey: 'project_p1_title',
    subtitleKey: 'project_p1_desc',
    defaultTitle: 'Metro Rail Underground Corridor',
    defaultSubtitle: 'Urban transit corridor spanning 33.5 km with automated subterranean stations.',
    titleLabel: 'Project Bold Title',
    subtitleLabel: 'Project Short Description'
  },
  {
    key: 'project_p2',
    title: 'Landmark Project: Seawater Desalination Plant',
    category: 'Projects',
    description: '600,000 m3/day mega SWRO facility',
    defaultUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800',
    hasTextControls: true,
    titleKey: 'project_p2_title',
    subtitleKey: 'project_p2_desc',
    defaultTitle: 'Seawater Desalination Plant',
    defaultSubtitle: '600,000 m3/day mega SWRO facility ensuring water security.',
    titleLabel: 'Project Bold Title',
    subtitleLabel: 'Project Short Description'
  },
  {
    key: 'project_p3',
    title: 'Landmark Project: Solar PV 800MW Park',
    category: 'Projects',
    description: 'Utility scale solar generation field',
    defaultUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800',
    hasTextControls: true,
    titleKey: 'project_p3_title',
    subtitleKey: 'project_p3_desc',
    defaultTitle: 'Solar PV 800MW Park',
    defaultSubtitle: 'Utility scale solar generation field powering clean energy transition.',
    titleLabel: 'Project Bold Title',
    subtitleLabel: 'Project Short Description'
  },
  {
    key: 'project_p4',
    title: 'Landmark Project: Petrochemical Complex',
    category: 'Projects',
    description: 'Industrial cracker units & high-integrity piping',
    defaultUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    recommendedSize: '1200x800',
    hasTextControls: true,
    titleKey: 'project_p4_title',
    subtitleKey: 'project_p4_desc',
    defaultTitle: 'Petrochemical Complex',
    defaultSubtitle: 'Industrial cracker units & high-integrity piping infrastructure.',
    titleLabel: 'Project Bold Title',
    subtitleLabel: 'Project Short Description'
  },
  {
    key: 'brand_logo',
    title: 'Brand Official Logo',
    category: 'Video & Branding',
    description: 'Header & Footer circular company logo',
    defaultUrl: '/logo.png',
    recommendedSize: '512x512 PNG / JPG'
  },
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
  }
];

export const AdminDashboard: React.FC = () => {
  const { isAdminAuthenticated, logout, adminEmail } = useAdminAuth();
  const navigate = useNavigate();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'applications' | 'jobs' | 'video' | 'enquiries' | 'photos'>('applications');

  // Media state
  const [mediaMap, setMediaMap] = useState<SiteMediaMap>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [slotTexts, setSlotTexts] = useState<Record<string, string>>({});

  // Video state
  const [videoLinkInput, setVideoLinkInput] = useState('');
  const [videoUploading, setVideoUploading] = useState(false);

  const getSlotTextValue = (key?: string, defaultVal: string = '') => {
    if (!key) return '';
    if (slotTexts[key] !== undefined) return slotTexts[key];
    return mediaMap[key] || defaultVal;
  };

  const handleSaveSlotText = (
    titleKey?: string,
    defaultTitle?: string,
    subtitleKey?: string,
    defaultSubtitle?: string
  ) => {
    if (titleKey) {
      const val = slotTexts[titleKey] !== undefined ? slotTexts[titleKey] : (mediaMap[titleKey] || defaultTitle || '');
      updateMediaText(titleKey, val);
    }
    if (subtitleKey) {
      const val = slotTexts[subtitleKey] !== undefined ? slotTexts[subtitleKey] : (mediaMap[subtitleKey] || defaultSubtitle || '');
      updateMediaText(subtitleKey, val);
    }
    setStatusMessage({ text: 'Slide text (Title & Description) saved and live on website!', type: 'success' });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleResetSlot = (slot: MediaSlotDef) => {
    if (confirm(`Reset "${slot.title}" photo and text to default?`)) {
      removeSlotMediaAndText(slot.key, slot.titleKey, slot.subtitleKey);
      if (slot.titleKey) {
        setSlotTexts(prev => {
          const next = { ...prev };
          delete next[slot.titleKey!];
          return next;
        });
      }
      if (slot.subtitleKey) {
        setSlotTexts(prev => {
          const next = { ...prev };
          delete next[slot.subtitleKey!];
          return next;
        });
      }
      setStatusMessage({ text: `Reset "${slot.title}" to default.`, type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Video spotlight handlers
  const handleSaveVideoLink = () => {
    const trimmed = videoLinkInput.trim();
    if (!trimmed) {
      removeSingleMedia('spotlight_video_url');
      removeSingleMedia('spotlight_video_name');
      setStatusMessage({ text: 'Video link cleared. Default showcase video restored.', type: 'info' });
    } else {
      updateMediaText('spotlight_video_url', trimmed);
      updateMediaText('spotlight_video_name', 'Linked Video');
      setStatusMessage({ text: 'Video link saved successfully and live on website!', type: 'success' });
    }
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleVideoFileUpload = async (file: File) => {
    setVideoUploading(true);
    try {
      const base64 = await videoFileToBase64(file);
      updateSingleMedia('spotlight_video_url', base64);
      updateMediaText('spotlight_video_name', file.name);
      setVideoLinkInput('');
      setStatusMessage({ text: `Video file "${file.name}" uploaded successfully!`, type: 'success' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: any) {
      console.error('Video upload error:', err);
      alert(err.message || 'Failed to upload video file.');
    } finally {
      setVideoUploading(false);
    }
  };

  const handleResetVideo = () => {
    if (confirm('Reset Video to default corporate presentation?')) {
      removeSingleMedia('spotlight_video_url');
      removeSingleMedia('spotlight_video_name');
      removeSingleMedia('video_spotlight_poster');
      removeSlotMediaAndText('spotlight_video_url', 'video_title', 'video_subtitle');
      setVideoLinkInput('');
      setStatusMessage({ text: 'Video spotlight restored to default.', type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Jobs state
  const [jobsList, setJobsList] = useState<JobOpening[]>(getAllAdminJobs());
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    department: 'Engineering & Design',
    location: 'Riyadh, Saudi Arabia',
    type: 'Full-Time, Permanent',
    experience: '5+ Years',
    description: '',
    responsibilities: '',
    requirements: '',
    published: true
  });

  // Candidate applications state
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [appSearchTerm, setAppSearchTerm] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('All');

  // Contact enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const loadAllData = () => {
    const media = getCustomMedia();
    setMediaMap(media);
    setVideoLinkInput(media.spotlight_video_url || '');
    setJobsList(getAllAdminJobs());
    getAllApplications().then(setApplications);
    getAllEnquiries().then(setEnquiries);
  };

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadAllData();

    const handleMediaUpdate = () => {
      const media = getCustomMedia();
      setMediaMap(media);
      if (media.spotlight_video_url && !videoLinkInput) {
        setVideoLinkInput(media.spotlight_video_url);
      }
    };
    const handleJobsUpdate = () => setJobsList(getAllAdminJobs());
    const handleAppsUpdate = () => getAllApplications().then(setApplications);
    const handleEnqUpdate = () => getAllEnquiries().then(setEnquiries);

    window.addEventListener('bayan_media_updated', handleMediaUpdate);
    window.addEventListener('bayan_jobs_updated', handleJobsUpdate);
    window.addEventListener('bayan_applications_updated', handleAppsUpdate);
    window.addEventListener('bayan_enquiries_updated', handleEnqUpdate);

    return () => {
      window.removeEventListener('bayan_media_updated', handleMediaUpdate);
      window.removeEventListener('bayan_jobs_updated', handleJobsUpdate);
      window.removeEventListener('bayan_applications_updated', handleAppsUpdate);
      window.removeEventListener('bayan_enquiries_updated', handleEnqUpdate);
    };
  }, [isAdminAuthenticated, navigate]);

  // Media handlers
  const handleFileUpload = async (key: string, file: File) => {
    setUploadingKey(key);
    try {
      const base64 = await fileToBase64(file);
      updateSingleMedia(key, base64);
      setStatusMessage({ text: 'Updated image successfully in Base64!', type: 'success' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      console.error('File to base64 conversion failed:', err);
      alert('Failed to process image file.');
    } finally {
      setUploadingKey(null);
    }
  };

  const handleRemovePhoto = (key: string) => {
    if (confirm('Revert this photo back to default?')) {
      removeSingleMedia(key);
      setStatusMessage({ text: 'Reverted to default.', type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleResetAllMedia = () => {
    if (confirm('Reset ALL custom photos back to default?')) {
      resetAllMedia();
      setStatusMessage({ text: 'All media restored to defaults.', type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Job handlers
  const handlePublishJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobFormData.title.trim()) {
      alert('Please enter a job title');
      return;
    }

    const respArray = jobFormData.responsibilities
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    const reqArray = jobFormData.requirements
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    addAdminJob({
      title: jobFormData.title.trim(),
      department: jobFormData.department.trim(),
      location: jobFormData.location.trim(),
      type: jobFormData.type.trim(),
      experience: jobFormData.experience.trim(),
      description: jobFormData.description.trim() || 'Exciting engineering opening at BAYAN PROJECTS.',
      responsibilities: respArray.length > 0 ? respArray : ['Deliver high-standard engineering and construction tasks.'],
      requirements: reqArray.length > 0 ? reqArray : ['Relevant professional degree or equivalent field experience.'],
      published: jobFormData.published
    });

    setShowJobModal(false);
    setJobFormData({
      title: '',
      department: 'Engineering & Design',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-Time, Permanent',
      experience: '5+ Years',
      description: '',
      responsibilities: '',
      requirements: '',
      published: true
    });

    setStatusMessage({ text: 'New Job Published! It is now live on the Careers page.', type: 'success' });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleToggleJob = (id: string, title: string) => {
    togglePublishJob(id);
    setStatusMessage({ text: `Updated visibility for "${title}".`, type: 'info' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the job: "${title}"?`)) {
      deleteAdminJob(id);
      setStatusMessage({ text: `Deleted job "${title}".`, type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleClearAllJobs = () => {
    if (confirm('Delete ALL jobs? The website Careers page will show 0 openings.')) {
      clearAllJobs();
      setStatusMessage({ text: 'All job postings cleared.', type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Application handlers
  const handleUpdateAppStatus = (id: string, status: 'New' | 'Reviewed' | 'Shortlisted' | 'Rejected') => {
    updateApplicationStatus(id, status);
    getAllApplications().then((updated) => {
      setApplications(updated);
      if (selectedApplication?.id === id) {
        setSelectedApplication({ ...selectedApplication, status });
      }
    });
    setStatusMessage({ text: `Status updated to "${status}".`, type: 'info' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDeleteApp = (id: string, name: string) => {
    if (confirm(`Delete application submitted by ${name}?`)) {
      deleteApplication(id);
      getAllApplications().then(setApplications);
      if (selectedApplication?.id === id) setSelectedApplication(null);
      setStatusMessage({ text: `Application by ${name} deleted.`, type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleClearAllApps = () => {
    if (confirm('Delete ALL candidate applications permanently?')) {
      clearAllApplications();
      setApplications([]);
      setSelectedApplication(null);
      setStatusMessage({ text: 'All applications cleared.', type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Enquiry handlers
  const handleDeleteEnquiry = (id: string, name: string) => {
    if (confirm(`Delete enquiry from ${name}?`)) {
      deleteEnquiry(id);
      getAllEnquiries().then(setEnquiries);
      setStatusMessage({ text: `Enquiry from ${name} deleted.`, type: 'info' });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const categories = ['All', 'Hero', 'About', 'Sectors', 'Projects', 'Video & Branding'];
  const filteredSlots = selectedCategory === 'All'
    ? MEDIA_SLOTS
    : MEDIA_SLOTS.filter(s => s.category === selectedCategory);

  const publishedJobsCount = jobsList.filter(j => j.published !== false).length;

  // Filtered applications
  const filteredApplications = applications.filter((app) => {
    const matchesStatus = appStatusFilter === 'All' || app.status === appStatusFilter;
    const term = appSearchTerm.toLowerCase();
    const matchesSearch = 
      !term || 
      app.fullName.toLowerCase().includes(term) ||
      app.email.toLowerCase().includes(term) ||
      app.phone.toLowerCase().includes(term) ||
      app.position.toLowerCase().includes(term) ||
      app.introduction.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-dark-text pb-24">
      {/* Top Admin Header */}
      <header className="bg-navy text-white px-6 py-4 shadow-md sticky top-0 z-40 border-b-2 border-accent">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#006bb6] flex items-center justify-center text-white font-extrabold text-xl shadow">
              <span className="text-accent">B</span>
            </div>
            <div>
              <span className="text-lg font-black tracking-wider block leading-none">
                BAYAN CONTROL PANEL
              </span>
              <span className="text-[11px] text-gray-300 font-medium">
                Admin: {adminEmail}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-bold">
            <Link
              to="/careers"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-gray-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Careers</span>
              <ExternalLink className="w-3 h-3 text-accent" />
            </Link>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-gray-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Home</span>
              <ExternalLink className="w-3 h-3 text-accent" />
            </Link>

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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Status Message */}
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

        {/* Primary Five Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'applications'
                ? 'bg-[#006bb6] text-white shadow-md'
                : 'text-gray-600 hover:text-navy hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applications ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'jobs'
                ? 'bg-[#006bb6] text-white shadow-md'
                : 'text-gray-600 hover:text-navy hover:bg-gray-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Jobs Manager ({publishedJobsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'video'
                ? 'bg-[#006bb6] text-white shadow-md'
                : 'text-gray-600 hover:text-navy hover:bg-gray-50'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Spotlight</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'enquiries'
                ? 'bg-[#006bb6] text-white shadow-md'
                : 'text-gray-600 hover:text-navy hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'photos'
                ? 'bg-[#006bb6] text-white shadow-md'
                : 'text-gray-600 hover:text-navy hover:bg-gray-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photos & Media</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CANDIDATE SUBMISSIONS & APPLICATIONS */}
        {/* ======================================================== */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <h1 className="text-2xl font-black text-navy flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#006bb6]" />
                  <span>Submitted Candidate Applications</span>
                </h1>
                <p className="text-xs sm:text-sm text-secondary-text mt-1">
                  Yaha par un sabhi candidates ki applications aur details live dikhayi deti hain jo website ke Careers page ke form se submit karte hain.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {applications.length > 0 && (
                  <button
                    onClick={handleClearAllApps}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg text-xs border border-red-200 transition-colors"
                  >
                    Clear All Submissions
                  </button>
                )}
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate name, email, phone, role..."
                  value={appSearchTerm}
                  onChange={(e) => setAppSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-navy focus:outline-none focus:border-[#006bb6]"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-gray-500">Status:</span>
                {['All', 'New', 'Reviewed', 'Shortlisted', 'Rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setAppStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      appStatusFilter === st
                        ? 'bg-[#006bb6] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:text-navy'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Applications List */}
            {filteredApplications.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border-2 border-dashed border-gray-200">
                <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-1">No Applications Found</h3>
                <p className="text-xs sm:text-sm text-secondary-text max-w-md mx-auto mb-6">
                  {applications.length === 0
                    ? 'Abhi tak kisi candidate ne Careers page par form submit nahi kiya hai. Jaise hi koi submit karega, uski puri detail yaha dikhegi.'
                    : 'Aapke filter/search criteria ke hisaab se koi candidate nahi mila.'}
                </p>
                <Link
                  to="/careers"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006bb6] hover:bg-[#005590] text-white font-bold text-xs rounded-lg shadow"
                >
                  <Eye className="w-4 h-4" />
                  <span>Go to Careers Page & Test Submit</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Candidates List Column */}
                <div className={`${selectedApplication ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-3`}>
                  {filteredApplications.map((app) => {
                    const isSelected = selectedApplication?.id === app.id;
                    return (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApplication(app)}
                        className={`bg-white rounded-xl p-5 border cursor-pointer transition-all duration-200 hover:shadow-md ${
                          isSelected
                            ? 'border-[#006bb6] ring-2 ring-[#006bb6]/20 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h3 className="font-bold text-navy text-base leading-tight">
                              {app.fullName}
                            </h3>
                            <span className="text-xs font-semibold text-corporate block mt-0.5">
                              Applying for: {app.position}
                            </span>
                          </div>

                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0 ${
                            app.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-800' :
                            app.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {app.status || 'New'}
                          </span>
                        </div>

                        <div className="space-y-1 text-xs text-secondary-text mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span className="truncate">{app.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{app.phone}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 line-clamp-2 italic bg-gray-50 p-2 rounded border border-gray-100 mb-2">
                          &quot;{app.introduction}&quot;
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                          <span className="flex items-center gap-1">
                            <Clock4 className="w-3 h-3" /> {app.submittedAt || 'Recent'}
                          </span>
                          <span className="text-corporate font-bold">
                            View Full Dossier &rarr;
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Candidate Full Detail View Modal / Side Panel */}
                {selectedApplication && (
                  <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg sticky top-24 self-start space-y-6">
                    <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase ${
                            selectedApplication.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-800' :
                            selectedApplication.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                            selectedApplication.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {selectedApplication.status || 'New'}
                          </span>
                          <span className="text-xs text-gray-400">
                            Submitted: {selectedApplication.submittedAt || 'Recent'}
                          </span>
                        </div>
                        <h2 className="text-2xl font-black text-navy">
                          {selectedApplication.fullName}
                        </h2>
                        <span className="text-sm font-bold text-corporate block mt-0.5">
                          Target Role: {selectedApplication.position}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedApplication(null)}
                        className="p-1.5 text-gray-400 hover:text-navy rounded-lg hover:bg-gray-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Direct Contact Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href={`mailto:${selectedApplication.email}?subject=BAYAN PROJECTS Application: ${encodeURIComponent(selectedApplication.position)}`}
                        className="p-4 bg-light-bg hover:bg-blue-50 rounded-xl border border-gray-200 transition-colors group flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-corporate/10 text-corporate flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-[11px] text-gray-500 font-semibold block">Send Email</span>
                          <span className="text-xs font-bold text-navy truncate block group-hover:text-corporate">
                            {selectedApplication.email}
                          </span>
                        </div>
                      </a>

                      <a
                        href={`tel:${selectedApplication.phone}`}
                        className="p-4 bg-light-bg hover:bg-emerald-50 rounded-xl border border-gray-200 transition-colors group flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] text-gray-500 font-semibold block">Call / WhatsApp</span>
                          <span className="text-xs font-bold text-navy block group-hover:text-emerald-700">
                            {selectedApplication.phone}
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Candidate Introduction & Cover Letter */}
                    <div>
                      <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#006bb6]" />
                        <span>Candidate Introduction & Experience Statement</span>
                      </h4>
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-dark-text leading-relaxed whitespace-pre-wrap">
                        {selectedApplication.introduction}
                      </div>
                    </div>

                    {/* Status Changer Actions */}
                    <div>
                      <span className="text-xs font-bold text-navy uppercase tracking-wider block mb-2">
                        Update Candidate Application Status:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(['New', 'Reviewed', 'Shortlisted', 'Rejected'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => selectedApplication.id && handleUpdateAppStatus(selectedApplication.id, st)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              selectedApplication.status === st
                                ? 'bg-navy text-white shadow'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Mark {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Delete action */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400">ID: {selectedApplication.id}</span>
                      <button
                        onClick={() => selectedApplication.id && handleDeleteApp(selectedApplication.id, selectedApplication.fullName)}
                        className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" /> Delete Candidate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: JOBS & CAREERS PUBLISHER */}
        {/* ======================================================== */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <h1 className="text-2xl font-black text-navy">
                  Careers & Job Openings Control
                </h1>
                <p className="text-xs sm:text-sm text-secondary-text mt-1">
                  Control what visitors see on the Careers page. If zero jobs are published, website displays an empty state.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {jobsList.length > 0 && (
                  <button
                    onClick={handleClearAllJobs}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg text-xs border border-red-200 transition-colors"
                  >
                    Clear All ({jobsList.length})
                  </button>
                )}

                <button
                  onClick={() => setShowJobModal(true)}
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg text-xs shadow-md flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish New Job</span>
                </button>
              </div>
            </div>

            {/* Current Jobs List */}
            {jobsList.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-navy mb-1">Zero Jobs Currently Active</h3>
                <p className="text-xs text-secondary-text max-w-md mx-auto mb-6">
                  Website ke Careers page pe abhi koi bhi job nahi dikhegi. Nayi job add karne ke liye &quot;Publish New Job&quot; button dabayein.
                </p>
                <button
                  onClick={() => setShowJobModal(true)}
                  className="px-6 py-2.5 bg-[#006bb6] hover:bg-[#005590] text-white font-bold text-xs rounded-lg shadow"
                >
                  Create First Job Posting
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {jobsList.map((job) => {
                  const isLive = job.published !== false;
                  return (
                    <div
                      key={job.id}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                            isLive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {isLive ? '● Live on Website' : '○ Unpublished (Hidden)'}
                          </span>
                          <span className="text-xs font-bold text-corporate">
                            {job.department}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-navy">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-secondary-text">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-accent" /> {job.location}
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-accent" /> {job.experience}
                          </span>
                          <span>&bull;</span>
                          <span>Type: {job.type}</span>
                        </div>

                        <p className="text-xs text-secondary-text line-clamp-2">
                          {job.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-4 md:pt-0">
                        <button
                          onClick={() => handleToggleJob(job.id, job.title)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                            isLive
                              ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          {isLive ? <ToggleRight className="w-4 h-4 text-amber-600" /> : <ToggleLeft className="w-4 h-4 text-emerald-600" />}
                          <span>{isLive ? 'Unpublish' : 'Publish'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: VIDEO SPOTLIGHT MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <h1 className="text-2xl font-black text-navy flex items-center gap-2.5">
                  <Video className="w-7 h-7 text-[#006bb6]" />
                  <span>Corporate Video Spotlight Control</span>
                </h1>
                <p className="text-xs sm:text-sm text-secondary-text mt-1">
                  Website ke VIDEOS section par play hone wali video aur poster image ko yaha se control karein. Google Drive, Google Photos, ya YouTube link paste karein ya direct video file upload karein.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetVideo}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-xs border border-red-200 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Video to Default</span>
                </button>
              </div>
            </div>

            {/* Main Video Management Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Live Video Player Preview (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-navy text-sm flex items-center gap-2">
                      <Film className="w-4 h-4 text-[#006bb6]" />
                      <span>Live Website Video Player</span>
                    </h3>

                    {mediaMap.spotlight_video_url ? (
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-100 text-emerald-800">
                        ● Custom Video Active
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-gray-100 text-gray-600">
                        ○ Default Presentation Video
                      </span>
                    )}
                  </div>

                  {/* Player Container */}
                  {(() => {
                    const resolved = resolveVideoSource(mediaMap.spotlight_video_url);
                    return (
                      <div className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-md border border-gray-800">
                        {resolved.type === 'iframe' ? (
                          <iframe
                            src={resolved.src}
                            title="Admin Video Preview"
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={resolved.src}
                            controls
                            className="w-full h-full object-contain bg-black"
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    );
                  })()}

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-gray-600 min-w-0">
                      <Link2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-medium truncate">
                        {mediaMap.spotlight_video_url ? mediaMap.spotlight_video_url : 'Playing Default Engineering Video'}
                      </span>
                    </div>

                    {mediaMap.spotlight_video_url && (
                      <button
                        onClick={() => {
                          removeSingleMedia('spotlight_video_url');
                          removeSingleMedia('spotlight_video_name');
                          setVideoLinkInput('');
                          setStatusMessage({ text: 'Custom video removed. Default restored.', type: 'info' });
                          setTimeout(() => setStatusMessage(null), 3000);
                        }}
                        className="text-xs text-red-600 font-bold hover:underline shrink-0 ml-3"
                      >
                        Remove Video
                      </button>
                    )}
                  </div>
                </div>

                {/* Video Thumbnail Poster Setting */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-navy text-sm">
                        Section Thumbnail Poster Photo
                      </h3>
                      <p className="text-xs text-secondary-text mt-0.5">
                        Ye photo website ke VIDEOS section par play button ke pichhe dikhti hai.
                      </p>
                    </div>

                    {mediaMap.video_spotlight_poster && (
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-100 text-emerald-800">
                        Custom Poster
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-48 h-28 bg-gray-100 rounded-xl overflow-hidden shrink-0 border">
                      <img
                        src={mediaMap.video_spotlight_poster || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80'}
                        alt="Poster Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <label className="w-full py-2.5 px-4 bg-[#006bb6] hover:bg-[#005590] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow transition-all">
                        <Upload className="w-4 h-4" />
                        <span>Change Poster Photo (Base64)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload('video_spotlight_poster', file);
                          }}
                        />
                      </label>

                      {mediaMap.video_spotlight_poster && (
                        <button
                          onClick={() => handleRemovePhoto('video_spotlight_poster')}
                          className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold border border-red-200 transition-colors"
                        >
                          Revert Poster to Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Controls, Links, File Upload, Text (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. Paste Video Link */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#006bb6] flex items-center justify-center font-bold">
                      <Link2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm">
                        Option 1: Paste Video Link
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        Google Drive, Google Photos, YouTube, ya MP4 Link
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-navy uppercase mb-1">
                      Video Sharing URL / Link
                    </label>
                    <div className="space-y-2">
                      <input
                        type="url"
                        placeholder="https://drive.google.com/file/d/.../view OR https://youtu.be/..."
                        value={videoLinkInput}
                        onChange={(e) => setVideoLinkInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-navy focus:bg-white focus:outline-none focus:border-[#006bb6]"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSaveVideoLink}
                          className="flex-1 py-2.5 bg-[#006bb6] hover:bg-[#005590] text-white rounded-lg text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Apply & Save Video Link</span>
                        </button>

                        {videoLinkInput && (
                          <button
                            onClick={() => setVideoLinkInput('')}
                            className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Instructions Box in Hindi */}
                  <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 space-y-2 text-xs text-navy">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-[#006bb6] block">
                      📌 Link Paste Karne Ke Niyam:
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-gray-700 list-disc list-inside">
                      <li>
                        <strong>Google Drive:</strong> Drive me video par right click karke <em>Share &gt; Anyone with the link</em> karein, fir copy link yaha paste karein.
                      </li>
                      <li>
                        <strong>YouTube:</strong> YouTube video ka link (e.g. <code>https://youtu.be/...</code>) paste karein.
                      </li>
                      <li>
                        <strong>Google Photos / Cloud MP4:</strong> Video ka public web view link paste karein.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 2. Direct Video File Upload */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm">
                        Option 2: Direct Video File Upload
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        Apne computer se direct MP4 / WebM video upload karein
                      </p>
                    </div>
                  </div>

                  <label className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border-2 border-dashed ${
                    videoUploading 
                      ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-wait' 
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 active:scale-95'
                  }`}>
                    <Upload className="w-4 h-4" />
                    <span>{videoUploading ? 'Processing & Saving Video...' : 'Choose MP4 Video File (< 25MB)'}</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg"
                      disabled={videoUploading}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleVideoFileUpload(file);
                      }}
                    />
                  </label>

                  <p className="text-[10px] text-gray-400 text-center">
                    Note: Badi video files (25MB se badi) ke liye Google Drive ya YouTube link use karna behtar rehta hai.
                  </p>
                </div>

                {/* 3. Section Titles & Narrative */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                      <Type className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm">
                        Videos Section Title & Narrative
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        Heading aur description badlein
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-navy uppercase mb-1">
                      Main Heading (Bold)
                    </label>
                    <input
                      type="text"
                      value={getSlotTextValue('video_title', 'VIDEOS')}
                      onChange={(e) => setSlotTexts({ ...slotTexts, video_title: e.target.value })}
                      placeholder="VIDEOS"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-navy focus:bg-white focus:outline-none focus:border-[#006bb6]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-navy uppercase mb-1">
                      Description / Narrative Text
                    </label>
                    <textarea
                      rows={3}
                      value={getSlotTextValue('video_subtitle', 'Bayan Projects is actively investing in its infrastructure, alleviating supply chain bottlenecks, and ensuring access to electricity, water, sanitation, and healthcare for all. Reflecting on the journey, Bayan Projects has cultivated capabilities, setting the stage for #TransformingLives.')}
                      onChange={(e) => setSlotTexts({ ...slotTexts, video_subtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 focus:bg-white focus:outline-none focus:border-[#006bb6] leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={() => handleSaveSlotText('video_title', 'VIDEOS', 'video_subtitle', 'Bayan Projects is actively investing in its infrastructure, alleviating supply chain bottlenecks, and ensuring access to electricity, water, sanitation, and healthcare for all. Reflecting on the journey, Bayan Projects has cultivated capabilities, setting the stage for #TransformingLives.')}
                    className="w-full py-2.5 bg-[#006bb6] hover:bg-[#005590] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-all active:scale-95"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Heading & Description</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CONTACT INQUIRIES */}
        {/* ======================================================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h1 className="text-2xl font-black text-navy flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-[#006bb6]" />
                <span>Submitted Contact Form Inquiries</span>
              </h1>
              <p className="text-xs sm:text-sm text-secondary-text mt-1">
                Website ke Contact Us page par aaye sabhi messages aur tenders yaha show hote hain.
              </p>
            </div>

            {enquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border-2 border-dashed border-gray-200">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-1">No Inquiries Received Yet</h3>
                <p className="text-xs sm:text-sm text-secondary-text max-w-md mx-auto">
                  Jaise hi koi client ya vendor Contact Us page se inquiry send karega, message yaha aa jayega.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-navy text-base">{enq.fullName}</h3>
                        <span className="text-xs font-bold text-[#006bb6]">{enq.subject}</span>
                      </div>
                      <button
                        onClick={() => enq.id && handleDeleteEnquiry(enq.id, enq.fullName)}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1 text-xs text-secondary-text">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-accent" />
                        <a href={`mailto:${enq.email}`} className="text-navy hover:underline">{enq.email}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-accent" />
                        <a href={`tel:${enq.phone}`} className="text-navy hover:underline">{enq.phone}</a>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs text-dark-text leading-relaxed">
                      {enq.message}
                    </div>

                    <div className="text-[11px] text-gray-400 text-right">
                      Received: {enq.submittedAt || 'Recent'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: PHOTOS & MEDIA (BASE64) */}
        {/* ======================================================== */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <h1 className="text-2xl font-black text-navy">
                  Website Image & Photo Management (Base64)
                </h1>
                <p className="text-xs sm:text-sm text-secondary-text mt-1">
                  Upload, replace, and customize every photo on the BAYAN PROJECTS website. Photos are stored as Base64 images and applied in real-time.
                </p>
              </div>

              <button
                onClick={handleResetAllMedia}
                className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-700 font-semibold rounded-lg text-xs border border-red-200 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Media Defaults</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
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
                const isImageCustom = Boolean(mediaMap[slot.key]);
                const isTitleCustom = Boolean(slot.titleKey && mediaMap[slot.titleKey]);
                const isSubtitleCustom = Boolean(slot.subtitleKey && mediaMap[slot.subtitleKey]);
                const isAnyCustom = isImageCustom || isTitleCustom || isSubtitleCustom;
                const currentImg = mediaMap[slot.key] || slot.defaultUrl;
                const isBusy = uploadingKey === slot.key;

                const currentTitle = slot.hasTextControls ? getSlotTextValue(slot.titleKey, slot.defaultTitle) : '';
                const currentSubtitle = slot.hasTextControls ? getSlotTextValue(slot.subtitleKey, slot.defaultSubtitle) : '';

                return (
                  <div
                    key={slot.key}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="relative h-56 bg-gray-100 overflow-hidden group">
                        <img
                          src={currentImg}
                          alt={slot.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Live Text Overlay Simulation for slide slots */}
                        {slot.hasTextControls && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 flex flex-col justify-end p-4 text-white pointer-events-none transition-all">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                                Live Slide Preview
                              </span>
                            </div>
                            <h4 className="text-sm font-bold leading-snug drop-shadow line-clamp-2 mb-1">
                              {currentTitle}
                            </h4>
                            <p className="text-[11px] text-gray-200 font-normal drop-shadow leading-snug line-clamp-2">
                              {currentSubtitle}
                            </p>
                          </div>
                        )}

                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          {isAnyCustom ? (
                            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white rounded-full shadow-md">
                              Customized
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white rounded-full backdrop-blur-sm">
                              Default
                            </span>
                          )}
                        </div>

                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-white/90 text-navy rounded shadow-sm">
                            {slot.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="font-bold text-navy text-sm line-clamp-1">
                            {slot.title}
                          </h3>
                          <p className="text-xs text-secondary-text leading-relaxed line-clamp-2">
                            {slot.description}
                          </p>
                        </div>

                        {/* Editable Slide Text Fields (Bold Title & Description) */}
                        {slot.hasTextControls && (
                          <div className="pt-2 border-t border-gray-100 space-y-2.5 bg-gray-50/80 p-3.5 rounded-xl border border-gray-200/70">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#006bb6] flex items-center gap-1.5">
                                <Type className="w-3.5 h-3.5" />
                                <span>Slide Text Control</span>
                              </span>
                              {(isTitleCustom || isSubtitleCustom) && (
                                <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                                  Text Modified
                                </span>
                              )}
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-navy uppercase mb-1">
                                {slot.titleLabel || 'Slide Title (Bold Heading)'}
                              </label>
                              <input
                                type="text"
                                value={currentTitle}
                                onChange={(e) => setSlotTexts(prev => ({ ...prev, [slot.titleKey!]: e.target.value }))}
                                placeholder={slot.defaultTitle}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-navy focus:outline-none focus:border-[#006bb6] focus:ring-1 focus:ring-[#006bb6]"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-navy uppercase mb-1">
                                {slot.subtitleLabel || 'Slide Description / Subtitle'}
                              </label>
                              <textarea
                                rows={2}
                                value={currentSubtitle}
                                onChange={(e) => setSlotTexts(prev => ({ ...prev, [slot.subtitleKey!]: e.target.value }))}
                                placeholder={slot.defaultSubtitle}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#006bb6] focus:ring-1 focus:ring-[#006bb6] leading-relaxed"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => handleSaveSlotText(slot.titleKey, slot.defaultTitle, slot.subtitleKey, slot.defaultSubtitle)}
                              className="w-full py-2 bg-[#006bb6] hover:bg-[#005590] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Slide Text Live</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-gray-100 mt-2 flex items-center gap-2">
                      <label className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold text-center cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm ${
                        isBusy
                          ? 'bg-gray-200 text-gray-500 cursor-wait'
                          : 'bg-navy hover:bg-[#005590] text-white active:scale-95'
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

                      {isAnyCustom && (
                        <button
                          onClick={() => handleResetSlot(slot)}
                          title="Revert back to default photo and text"
                          className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors flex items-center gap-1 text-xs font-bold"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* PUBLISH JOB MODAL */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#006bb6]" />
                <h3 className="text-lg font-bold text-navy">Publish New Job Opening</h3>
              </div>
              <button
                onClick={() => setShowJobModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishJob} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Project Manager – Transportation"
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-[#006bb6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={jobFormData.department}
                    onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-[#006bb6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase mb-1">
                    Job Location
                  </label>
                  <input
                    type="text"
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-[#006bb6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase mb-1">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    value={jobFormData.type}
                    onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-[#006bb6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase mb-1">
                    Required Experience
                  </label>
                  <input
                    type="text"
                    value={jobFormData.experience}
                    onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-[#006bb6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">
                  Job Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Summary of the role and scope..."
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-[#006bb6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Manage project schedules in Primavera P6&#10;Lead on-site contractor packages&#10;Enforce safety protocols"
                  value={jobFormData.responsibilities}
                  onChange={(e) => setJobFormData({ ...jobFormData, responsibilities: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-[#006bb6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">
                  Candidate Requirements (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Bachelor's degree in Civil Engineering&#10;10+ years experience on rail or infrastructure projects"
                  value={jobFormData.requirements}
                  onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-navy focus:outline-none focus:border-[#006bb6]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheckbox"
                  checked={jobFormData.published}
                  onChange={(e) => setJobFormData({ ...jobFormData, published: e.target.checked })}
                  className="w-4 h-4 text-[#006bb6] rounded"
                />
                <label htmlFor="publishedCheckbox" className="text-xs font-semibold text-gray-700">
                  Publish immediately (Make visible on Careers page)
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#006bb6] hover:bg-[#005590] text-white rounded-lg text-xs font-bold shadow"
                >
                  Publish Job Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
