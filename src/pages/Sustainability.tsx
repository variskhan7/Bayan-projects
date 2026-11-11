import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Sun, 
  Droplet, 
  Recycle, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';

const PILLARS = [
  {
    icon: Leaf,
    title: 'Environmental Responsibility',
    subtitle: 'Decarbonizing Construction',
    description: 'We are pioneering low-carbon pozzolanic concrete mixes, recycled aggregate sub-bases, and electrified field machinery to mitigate lifecycle greenhouse gas emissions.',
    metrics: ['35% embodied carbon reduction', '100% compliant ISO 14001 jobsites']
  },
  {
    icon: Sun,
    title: 'Green Energy & Decarbonization',
    subtitle: 'Renewable Jobsite Power',
    description: 'Transitioning jobsite temporary power from fossil-fueled generators to hybrid microgrid solar arrays with battery energy storage systems.',
    metrics: ['60% temporary power solarized', '800MW+ clean energy built for clients']
  },
  {
    icon: Droplet,
    title: 'Water Conservation',
    subtitle: 'Zero-Liquid Discharge',
    description: 'Water is precious. We implement closed-loop concrete washouts, on-site effluent filtration, and high-recovery desalination technologies across all works.',
    metrics: ['95% construction water recycled', '1.5M m3/day municipal water created']
  },
  {
    icon: Recycle,
    title: 'Waste Management & Circularity',
    subtitle: 'Landfill Diversion Protocols',
    description: 'Rigorous jobsite segregation of structural steel, timber formwork, scrap rebar, and packaging materials ensuring maximum recycling and reuse.',
    metrics: ['90% landfill diversion target', '100% scrap metal recycled']
  },
  {
    icon: ShieldCheck,
    title: 'Workplace Health & Safety',
    subtitle: 'Target Zero Safety Culture',
    description: 'Every employee and contractor returns home safely every day. Our behavior-based safety management framework drives continuous hazard elimination.',
    metrics: ['15 Million Safe Man-Hours achieved', 'Zero Lost-Time Incident standard']
  },
  {
    icon: Users,
    title: 'Community Development',
    subtitle: 'Empowering Local Ecosystems',
    description: 'Investing in local vocational training, hiring from surrounding communities, and supporting educational infrastructure wherever we build.',
    metrics: ['45% local procurement expenditure', 'Graduate engineering mentoring']
  }
];

export const Sustainability: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <section className="relative py-28 bg-navy text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=80"
          alt="Clean Energy Wind and Solar"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-corporate/80" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              ESG & Decarbonization
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Sustainability & HSE Leadership
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              Building enduring infrastructure that balances economic progress, environmental preservation, and social well-being for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                badge="Sustainability Charter"
                title="Engineering for People & Planet"
                subtitle="We integrate environmental stewardship, resource circularity, and human safety into the earliest design phases of every megaproject."
                alignment="left"
              />

              <p className="text-secondary-text leading-relaxed text-base">
                At BAYAN PROJECTS, sustainability is not an afterthought or an add-on; it is an intrinsic engineering discipline. We recognize that heavy construction operations have tangible environmental footprints. By applying cutting-edge low-carbon materials, clean temporary energy, and zero-waste frameworks, we help our clients meet rigorous ESG criteria.
              </p>

              <div className="p-6 bg-light-bg rounded-xl border-l-4 border-emerald-600 space-y-2">
                <h4 className="font-bold text-navy text-base">2035 Net-Zero Operational Target</h4>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Our audited decarbonization roadmap outlines measurable phase-outs of diesel equipment, 100% renewable power for corporate offices, and circular recycling mandates across every active project site.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
                  alt="Solar Field Inspection"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-navy/90 backdrop-blur-md text-white rounded-xl border border-white/10">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
                    Audited Performance
                  </span>
                  <h4 className="text-lg font-bold">Over 1.2M Tonnes CO2 Displaced Annually</h4>
                  <p className="text-xs text-gray-300">Through client clean energy generation projects and low-carbon cement substitutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIX PILLARS GRID */}
      <section className="py-20 lg:py-28 bg-light-bg">
        <div className="section-container">
          <SectionHeading
            badge="Foundational Pillars"
            title="Our Six Pillars of Sustainability"
            subtitle="Explore how our targeted initiatives deliver tangible environmental and social impact across active job sites."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PILLARS.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-corporate/10 flex items-center justify-center text-corporate mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-bold text-corporate uppercase tracking-wider block mb-1">
                      {pillar.subtitle}
                    </span>

                    <h3 className="text-xl font-bold text-navy mb-3">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-secondary-text leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    {pillar.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-xs font-bold text-navy">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAFETY FIRST CALLOUT */}
      <section className="py-20 bg-navy text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider">
              Health, Safety & Environment
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Target Zero: Because Every Life Matters
            </h2>

            <p className="text-base text-gray-300 leading-relaxed font-light">
              Our safety commitment is unwavering. Through certified ISO 45001 procedures, comprehensive daily tool-box briefings, mobile safety incident reporting, and mandatory stop-work authority for every worker, we maintain an industry-leading safety record across challenging heavy industrial projects.
            </p>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded shadow-lg text-sm transition-all"
              >
                <span>Inquire About HSE Protocols</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;

