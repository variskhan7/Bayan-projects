import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Send,
  AlertCircle
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { STATIC_JOB_OPENINGS } from '../data/staticData';
import { submitApplication } from '../services/applicationService';
import { JobOpening } from '../types';

const applicationSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid contact phone number'),
  position: z.string().min(2, 'Please select or enter the job position'),
  introduction: z.string().min(20, 'Please write at least 20 characters introducing your experience and interest'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const BENEFITS = [
  {
    title: 'World-Class Megaprojects',
    description: 'Work on landmark transit corridors, gigawatt solar parks, and complex industrial complexes shaping the nation.'
  },
  {
    title: 'Professional Mentorship',
    description: 'Direct collaboration with chartered engineers, project directors, and international technical advisors.'
  },
  {
    title: 'Health & Comprehensive Coverage',
    description: 'Premium medical insurance for employees and families, wellness allowances, and on-site occupational health teams.'
  },
  {
    title: 'Target Zero Safety Culture',
    description: 'An industry-leading safety framework where every worker has unquestioned stop-work authority.'
  }
];

export const Careers: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setValue('position', job.title);
    const formElement = document.getElementById('application-form-section');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await submitApplication(data);
      if (res.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        setSubmitError('Unable to record application. Please try again or reach out directly.');
      }
    } catch (err) {
      console.error('Job application error:', err);
      setSubmitError('Submission failed. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <section className="relative py-28 bg-navy text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=80"
          alt="Engineering Team Careers"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-corporate/80" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Career Opportunities
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Build Your Career at BAYAN PROJECTS
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              Join a dynamic, diverse community of over 8,500 engineers, project directors, and craft specialists shaping the region’s landmark infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-container">
          <SectionHeading
            badge="Culture & Values"
            title="Why Build Your Future With Us?"
            subtitle="We invest in human capital, fostering career development, technical innovation, and an uncompromising safety-first ethos."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((b, idx) => (
              <div key={idx} className="bg-light-bg p-8 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-corporate/10 flex items-center justify-center text-corporate mb-4 font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{b.title}</h3>
                  <p className="text-xs text-secondary-text leading-relaxed">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRENT JOB OPENINGS */}
      <section className="py-20 bg-light-bg border-t border-gray-200">
        <div className="section-container">
          <SectionHeading
            badge="Vacancies"
            title="Featured Job Openings"
            subtitle="Discover open opportunities across engineering, project controls, safety management, and graduate development."
          />

          <div className="space-y-6 max-w-4xl mx-auto">
            {STATIC_JOB_OPENINGS.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-corporate uppercase tracking-wider block mb-1">
                      {job.department}
                    </span>
                    <h3 className="text-xl font-bold text-navy">{job.title}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-light-bg text-dark-text px-3 py-1.5 rounded-full font-semibold border border-gray-200">
                      {job.type}
                    </span>
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded shadow transition-all transform active:scale-95 whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-secondary-text mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> {job.location}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" /> Experience: {job.experience}
                  </span>
                </div>

                <p className="text-xs text-secondary-text leading-relaxed mb-4">
                  {job.description}
                </p>

                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-navy block mb-1">Key Responsibilities:</span>
                    <ul className="list-disc list-inside space-y-1 text-secondary-text">
                      {job.responsibilities.slice(0, 2).map((r, rIdx) => (
                        <li key={rIdx} className="line-clamp-1">{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-navy block mb-1">Candidate Requirements:</span>
                    <ul className="list-disc list-inside space-y-1 text-secondary-text">
                      {job.requirements.slice(0, 2).map((req, reqIdx) => (
                        <li key={reqIdx} className="line-clamp-1">{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="application-form-section" className="py-20 lg:py-28 bg-white">
        <div className="section-container max-w-2xl mx-auto">
          <SectionHeading
            badge="Online Application"
            title="Submit Your Candidacy"
            subtitle="Apply for one of our published openings or submit an open application for our regional engineering talent roster."
          />

          {submitSuccess && (
            <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-800">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-base mb-1">Application Submitted Successfully!</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Thank you for your interest in BAYAN PROJECTS. Your application has been logged into our talent management database. Our recruitment team will review your credentials and contact you if your profile aligns with our requirements.
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-light-bg p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Eng. Mansoor Al-Harbi"
                {...register('fullName')}
                className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-navy focus:outline-none focus:ring-2 ${
                  errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-corporate/20 focus:border-corporate'
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                  className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-navy focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-corporate/20 focus:border-corporate'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+966 50 123 4567"
                  {...register('phone')}
                  className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-navy focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-corporate/20 focus:border-corporate'
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Job Position */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Job Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Lead Civil & Structural Engineer"
                {...register('position')}
                className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-navy focus:outline-none focus:ring-2 ${
                  errors.position ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-corporate/20 focus:border-corporate'
                }`}
              />
              {errors.position && (
                <p className="text-xs text-red-600 mt-1">{errors.position.message}</p>
              )}
            </div>

            {/* Short Introduction */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Short Introduction & Relevant Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Summarize your professional qualifications, major project roles, and why you are interested in joining BAYAN PROJECTS..."
                {...register('introduction')}
                className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-navy focus:outline-none focus:ring-2 ${
                  errors.introduction ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-corporate/20 focus:border-corporate'
                }`}
              />
              {errors.introduction && (
                <p className="text-xs text-red-600 mt-1">{errors.introduction.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Application to HR...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-secondary-text text-center mt-3">
                Your application is saved directly to our secure Firestore recruitment registry.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Careers;

