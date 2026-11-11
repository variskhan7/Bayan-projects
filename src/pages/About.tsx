import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  Target, 
  Eye, 
  HeartHandshake, 
  Download, 
  Users, 
  CheckCircle2, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { COMPANY_STATS } from '../data/staticData';

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: 'Safety First (Target Zero)',
    description: 'We believe every workplace injury is preventable. Uncompromising safety is ingrained into daily site execution and executive accountability.'
  },
  {
    icon: Award,
    title: 'Engineering Quality',
    description: 'Relentless adherence to precision tolerances, advanced materials testing, and zero-defect handover benchmarks.'
  },
  {
    icon: Sparkles,
    title: 'Innovative Excellence',
    description: 'Deploying digital 4D BIM, modular off-site pre-assembly, and robotic inspection technologies to drive schedule efficiencies.'
  },
  {
    icon: HeartHandshake,
    title: 'Client Trust & Transparency',
    description: 'Cultivating enduring partnerships through open commercial books, earned-value progress metrics, and on-time delivery guarantees.'
  }
];

const LEADERSHIP_MEMBERS = [
  {
    name: 'Eng. Khalid Al-Mansoor',
    role: 'Chief Executive Officer',
    experience: '32+ Years Experience',
    bio: 'Former senior infrastructure director who has guided the execution of over USD $8 Billion in landmark rail, airport, and civil works.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dr. Tariq Al-Ghamdi',
    role: 'Chief Operating Officer & Head of EPC',
    experience: '28+ Years Experience',
    bio: 'Renowned expert in heavy industrial plant engineering, steam crackers, and large-scale seawater desalination projects.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sarah Jenkins, CEng',
    role: 'Chief Technical & Engineering Officer',
    experience: '22+ Years Experience',
    bio: 'Chartered structural engineer pioneering digital BIM execution, seismic modeling, and green concrete formulation across the Middle East.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Eng. Faisal Al-Sabah',
    role: 'Executive Director – Health, Safety & Sustainability',
    experience: '20+ Years Experience',
    bio: 'Champion of the Target Zero safety culture and architect of the company’s 2035 Net-Zero Operational Roadmap.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
  }
];

const CERTIFICATIONS = [
  {
    title: 'ISO 9001:2015',
    category: 'Quality Management System',
    description: 'Certified design, engineering, procurement, and construction quality management systems across all business units.'
  },
  {
    title: 'ISO 14001:2015',
    category: 'Environmental Management',
    description: 'Stringent environmental stewardship, carbon mitigation, zero-waste protocols, and ecological compliance.'
  },
  {
    title: 'ISO 45001:2018',
    category: 'Occupational Health & Safety',
    description: 'Systematic hazard identification, risk assessment, and safe working methodologies on all active megaproject jobsites.'
  },
  {
    title: 'ASME Code Stamps',
    category: 'Pressure Vessels & Piping',
    description: 'Authorized manufacturing and field assembly stamps for high-pressure industrial boilers, vessels, and piping systems.'
  }
];

export const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <section className="relative py-28 bg-navy text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Architecture"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-corporate/80" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Corporate Heritage
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              About BAYAN PROJECTS
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              A premier corporate engineering, procurement, and construction (EPC) enterprise building the foundational infrastructure that empowers sustainable modern economies.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: COMPANY OVERVIEW */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                badge="Company Overview"
                title="Engineering National Foundations Since 1999"
                subtitle="From regional beginnings to a multidisciplinary EPC powerhouse managing multibillion-dollar capital infrastructure programs."
                alignment="left"
              />

              <p className="text-secondary-text leading-relaxed text-base">
                BAYAN PROJECTS was established with a singular vision: to deliver world-class infrastructure that creates lasting economic and social value. Over more than two decades, we have evolved from specialized civil engineering contractors into a comprehensive EPC conglomerate.
              </p>

              <p className="text-secondary-text leading-relaxed text-base">
                Our portfolio encompasses high-speed transportation networks, cutting-edge water desalination facilities, utility solar parks, complex petrochemical units, and mission-critical data centres. We pride ourselves on executing challenging engineering projects in remote, harsh, or dense urban environments without ever compromising on safety or schedule.
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-sm text-navy font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>Turnkey EPC Execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>8,500+ Qualified Personnel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>Over 150 Landmark Projects</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80"
                  alt="Transit Construction"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-xl shadow">
                  <h4 className="font-extrabold text-navy text-base mb-1">Unwavering Commitment to Quality</h4>
                  <p className="text-xs text-secondary-text">Adhering to rigorous international engineering standards and precision execution metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="bg-navy py-16 border-y border-white/10 text-white">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {COMPANY_STATS.slice(0, 4).map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-accent">{stat.value}</div>
                <div className="font-bold text-white text-base">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION, VISION, & VALUES */}
      <section className="py-20 lg:py-28 bg-light-bg">
        <div className="section-container">
          <SectionHeading
            badge="Purpose & Direction"
            title="Our Strategic North Star"
            subtitle="Guiding every decision, project, and safety initiative across our regional footprint."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md border-t-4 border-corporate flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-corporate/10 flex items-center justify-center text-corporate mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-corporate uppercase tracking-wider block mb-2">Our Vision</span>
                <h3 className="text-2xl font-bold text-navy mb-4">To Be the Most Trusted Engineering & Infrastructure Partner</h3>
                <p className="text-secondary-text leading-relaxed text-sm">
                  We aspire to lead the regional transformation into high-performance, sustainable, and smart infrastructure, setting international benchmarks for engineering innovation, environmental stewardship, and human capital development.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md border-t-4 border-accent flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-2">Our Mission</span>
                <h3 className="text-2xl font-bold text-navy mb-4">Delivering Critical Infrastructure Safely, Reliably, and Sustainably</h3>
                <p className="text-secondary-text leading-relaxed text-sm">
                  Our mission is to execute complex engineering, procurement, and construction challenges with zero-incident safety, uncompromising technical quality, and scheduled precision, creating enduring value for our clients, workforce, and communities.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-navy text-center mb-8">Our Guiding Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CORE_VALUES.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded bg-navy/5 flex items-center justify-center text-corporate mb-4">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="font-bold text-navy text-base mb-2">{val.title}</h4>
                    <p className="text-xs text-secondary-text leading-relaxed">{val.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: EXECUTIVE LEADERSHIP */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-container">
          <SectionHeading
            badge="Executive Leadership"
            title="Steered by Industry Leaders"
            subtitle="Our executive team brings together decades of deep technical mastery, project governance, and strategic business leadership."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEADERSHIP_MEMBERS.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 group">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-3 left-4 text-xs font-bold text-accent bg-navy/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    {member.experience}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-navy text-lg group-hover:text-corporate transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-corporate block mb-3">{member.role}</span>
                  <p className="text-xs text-secondary-text leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CERTIFICATIONS */}
      <section className="py-20 lg:py-28 bg-light-bg">
        <div className="section-container">
          <SectionHeading
            badge="Quality & Accreditations"
            title="International Standards & Accreditations"
            subtitle="Demonstrating verifiable adherence to the world’s most stringent engineering, safety, and environmental auditing frameworks."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-corporate flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-corporate/10 flex items-center justify-center text-corporate mb-4">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-extrabold text-navy text-lg mb-1">{cert.title}</h4>
                  <span className="text-xs font-semibold text-corporate block mb-3">{cert.category}</span>
                  <p className="text-xs text-secondary-text leading-relaxed">{cert.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified & Audited Active
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: COMPANY PROFILE DOWNLOAD CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
            <div className="space-y-3">
              <span className="text-accent text-xs font-bold uppercase tracking-wider block">
                Official Corporate Documentation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Download BAYAN PROJECTS Corporate Profile
              </h3>
              <p className="text-sm text-gray-300 max-w-xl">
                Get an in-depth view into our corporate structure, complete project track records, equipment assets, and audited safety metrics in our comprehensive PDF brochure.
              </p>
            </div>

            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                alert('Downloading BAYAN PROJECTS Corporate Profile Brochure (PDF)...');
              }}
              className="inline-flex items-center gap-2 px-7 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded shadow-lg whitespace-nowrap transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF (8.4 MB)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

