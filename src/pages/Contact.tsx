import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Building2
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { submitEnquiry } from '../services/enquiryService';

const contactSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid business email address'),
  phone: z.string().min(8, 'Please provide a valid phone number'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(15, 'Message must be at least 15 characters long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await submitEnquiry(data);
      if (res.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        setSubmitError('Failed to record inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submit error:', err);
      setSubmitError('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <section className="relative py-28 bg-navy text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Corporate Headquarters"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-corporate/80" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Get in Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Contact BAYAN PROJECTS
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              Connect with our corporate office, tender bidding teams, and technical discipline leaders for EPC inquiries, joint ventures, or vendor registrations.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <SectionHeading
                  badge="Headquarters"
                  title="Corporate Headquarters"
                  subtitle="Reach our executive management and regional operations departments."
                  alignment="left"
                />
              </div>

              <div className="space-y-5">
                {/* Office 1: Delhi India */}
                <div className="flex items-start gap-4 p-5 bg-light-bg rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-corporate/10 flex items-center justify-center text-corporate shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-accent tracking-wider block">Registered Office</span>
                    <h4 className="font-bold text-navy text-sm mb-1">New Delhi, India</h4>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      18, Block N, Green Park Extension,<br />
                      New Delhi, Delhi 110016, India
                    </p>
                  </div>
                </div>

                {/* Office 2: Riyadh Saudi Arabia */}
                <div className="flex items-start gap-4 p-5 bg-light-bg rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-corporate/10 flex items-center justify-center text-corporate shrink-0">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-corporate tracking-wider block">Regional Corporate Office</span>
                    <h4 className="font-bold text-navy text-sm mb-1">Riyadh, Saudi Arabia</h4>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      Bayan Corporate Tower, Level 14,<br />
                      King Fahd Road, Al-Olaya,<br />
                      Riyadh 12214, Saudi Arabia
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-5 bg-light-bg rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-corporate/10 flex items-center justify-center text-corporate shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm mb-1">Direct Contact &amp; Mobile</h4>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      Mobile: <a href="tel:+919456496286" className="text-corporate font-bold hover:underline">+91 94564 96286</a><br />
                      WhatsApp: <a href="https://wa.me/919456496286" target="_blank" rel="noreferrer" className="text-corporate hover:underline">+91 94564 96286</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-5 bg-light-bg rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-corporate/10 flex items-center justify-center text-corporate shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm mb-1">Official Email</h4>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      Official Contact: <a href="mailto:mkccc86@gmail.com" className="text-corporate font-bold hover:underline">mkccc86@gmail.com</a>
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 p-5 bg-light-bg rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-corporate/10 flex items-center justify-center text-corporate shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm mb-1">Official Business Hours</h4>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      Monday – Saturday: 09:00 AM – 06:30 PM (IST)<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-light-bg p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-2xl font-bold text-navy mb-2">Send an Official Inquiry</h3>
                <p className="text-xs text-secondary-text mb-8">
                  Complete the inquiry form below and our corporate business development team will respond within 24 hours.
                </p>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Inquiry Successfully Transmitted</h4>
                      <p className="text-xs text-emerald-700 mt-1">
                        Your message has been safely saved to our Firestore inquiries registry. A commercial representative will reach out shortly.
                      </p>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="name@company.com"
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
                        Contact Phone <span className="text-red-500">*</span>
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

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      Inquiry Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. EPC Tender Inquiry for Water Desalination Package"
                      {...register('subject')}
                      className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-navy focus:outline-none focus:ring-2 ${
                        errors.subject ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-corporate/20 focus:border-corporate'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-600 mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      Message / Project Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Please describe your project location, scope of work, estimated timeline, and requirements..."
                      {...register('message')}
                      className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-navy focus:outline-none focus:ring-2 ${
                        errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-corporate/20 focus:border-corporate'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry to Firebase...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Official Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAPS EMBED SECTION */}
      <section className="h-96 w-full relative bg-gray-200 border-t border-gray-200">
        <iframe
          title="BAYAN PROJECTS Headquarters Map Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116035.79796075908!2d46.60462791444007!3d24.713551717244583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d48939b%3A0x88f11d3550c60965!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-125"
        />
        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 max-w-xs pointer-events-none hidden sm:block">
          <div className="flex items-center gap-2 font-bold text-navy text-sm mb-1">
            <Building2 className="w-4 h-4 text-accent" />
            <span>BAYAN Corporate Tower</span>
          </div>
          <p className="text-xs text-secondary-text">
            King Fahd Road, Al-Olaya, Riyadh, Saudi Arabia
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;

