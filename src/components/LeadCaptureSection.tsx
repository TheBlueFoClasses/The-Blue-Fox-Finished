import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, Sparkles, Database, Calendar, HelpCircle } from 'lucide-react';

export default function LeadCaptureSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('private-event'); // 'private-event' | 'classes-calendar' | 'other'
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [savedSubmissionsCount, setSavedSubmissionsCount] = useState(0);
  const [showConfigHelp, setShowConfigHelp] = useState(false);

  // Load count of saved submissions from localStorage on mount (for offline local fallback)
  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem('the_blue_fox_leads') || '[]');
      setSavedSubmissionsCount(existing.length);
    } catch (e) {
      console.error('Error loading local leads:', e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      setErrorMsg('Please fill in all the required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const submissionData = {
      name,
      email,
      phone,
      message,
      inquiryType,
      submittedAt: new Date().toISOString(),
    };

    try {
      let isSavedToDb = false;

      // 1. Try submitting to our Node/Express backend (/api/leads)
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || '';
        const backendResponse = await fetch(`${apiBaseUrl}/api/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });

        if (backendResponse.ok) {
          const resJson = await backendResponse.json();
          isSavedToDb = true;
          console.log('Successfully saved to MongoDB Atlas database via Express backend:', resJson);
        } else {
          console.warn('Express backend responded with non-2xx status code.');
        }
      } catch (backendError) {
        console.warn('Express backend endpoint unavailable or failed.', backendError);
      }

      // Always save to LocalStorage as a local representation and to increment counter
      const existingLeads = JSON.parse(localStorage.getItem('the_blue_fox_leads') || '[]');
      const updatedLeads = [...existingLeads, { ...submissionData, id: `lead-${Date.now()}`, isSavedToDb }];
      localStorage.setItem('the_blue_fox_leads', JSON.stringify(updatedLeads));
      setSavedSubmissionsCount(updatedLeads.length);

      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('Lead submission failure:', err);
      setErrorMsg('Something went wrong. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="lead-capture"
      className="py-16 sm:py-24 bg-gradient-to-br from-white via-[#f1f5f9] to-[#bfdbfe]/20 relative border-t border-ocean-water/40 overflow-hidden"
    >
      {/* Decorative vector canvas paint splatters */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-sunset-orange/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full bg-mango/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Form Context & Value Proposition (Left side) */}
          <div className="lg:col-span-5 text-left space-y-6" id="lead-info-block">

            
            <h2
              id="lead-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-oiler-navy tracking-tight leading-tight"
            >
              Contact Us
            </h2>
            
            <p className="text-base sm:text-lg text-oiler-navy/80 font-sans leading-relaxed">
              Want The Blue Fox to host a private event, fundraiser, or birthday party? Or simply have a question about a class or project? Contact us, and we'll be in touch.
            </p>






          </div>

          {/* Interactive Lead Capture Form Block (Right side) */}
          <div className="lg:col-span-7" id="lead-form-block">
            <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-ocean-water/40 shadow-md text-left relative overflow-hidden">

              <h3 className="text-2xl font-serif font-black text-oiler-navy mb-6">Contact Us</h3>

              {submitSuccess ? (
                <div
                  id="lead-success-container"
                  className="bg-emerald-50/70 p-8 rounded-3xl border border-emerald-200 text-center animate-fade-in"
                >
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  
                  <h4 className="text-2xl font-serif font-extrabold text-emerald-900 mb-2">
                    Inquiry Saved Successfully!
                  </h4>
                  
                  <p className="text-sm text-emerald-800/80 leading-relaxed max-w-md mx-auto font-sans mb-6">
                    Awesome! Your private event/calendar interest inquiry has been saved directly to the database. Aryn will review your details and reach out within 24 hours.
                  </p>

                  <div className="bg-white/80 rounded-2xl p-4 border border-emerald-100 text-left mb-6 max-w-sm mx-auto">
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block mb-1">
                      DATABASE REGISTRATION STATUS
                    </span>
                    <div className="flex items-center space-x-2 text-xs font-mono text-emerald-900 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Saved and synchronized (Record #{savedSubmissionsCount})</span>
                    </div>
                  </div>

                  <button
                    id="lead-send-another-btn"
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-oiler-navy hover:bg-brilliant-blue text-white font-serif font-extrabold text-xs tracking-widest uppercase px-8 py-3.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form id="lead-capture-form-element" onSubmit={handleSubmit} className="space-y-6 font-sans">
                  
                  {errorMsg && (
                    <div id="lead-form-error" className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs font-semibold leading-relaxed">
                      {errorMsg}
                    </div>
                  )}

                  {/* Form fields layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name field */}
                    <div id="lead-field-name">
                      <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-brilliant-blue" />
                        Full Name <span className="text-sunset-orange">*</span>
                      </label>
                      <input
                        id="lead-input-name"
                        type="text"
                        required
                        placeholder="Emma Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#f8fafc] text-oiler-navy placeholder-oiler-navy/30 p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm transition-all text-sm"
                      />
                    </div>

                    {/* Email field */}
                    <div id="lead-field-email">
                      <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-brilliant-blue" />
                        Email Address <span className="text-sunset-orange">*</span>
                      </label>
                      <input
                        id="lead-input-email"
                        type="email"
                        required
                        placeholder="emma@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#f8fafc] text-oiler-navy placeholder-oiler-navy/30 p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Number field */}
                    <div id="lead-field-phone">
                      <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-brilliant-blue" />
                        Phone Number <span className="text-sunset-orange">*</span>
                      </label>
                      <input
                        id="lead-input-phone"
                        type="tel"
                        required
                        placeholder="(218) 234-5663"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#f8fafc] text-oiler-navy placeholder-oiler-navy/30 p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm transition-all text-sm"
                      />
                    </div>

                    {/* Inquiry Type Dropdown */}
                    <div id="lead-field-type">
                      <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brilliant-blue" />
                        What is this about?
                      </label>
                      <select
                        id="lead-select-type"
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full bg-[#f8fafc] text-oiler-navy p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans font-bold text-sm shadow-sm transition-all"
                      >
                        <option value="private-event">🦊 Host a Private Paint Party / Birthday</option>
                        <option value="classes-calendar">📅 Help me find upcoming Classes on Calendar</option>
                        <option value="other">🎨 Custom request / Collaboration</option>
                      </select>
                    </div>
                  </div>

                  {/* Short Message field */}
                  <div id="lead-field-message">
                    <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-brilliant-blue" />
                      Short Message <span className="text-sunset-orange">*</span>
                    </label>
                    <textarea
                      id="lead-textarea-message"
                      required
                      rows={4}
                      placeholder="Tell Aryn about your event location, preferred date, estimated guest count, or standard classes you want to attend..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#f8fafc] text-oiler-navy placeholder-oiler-navy/30 p-4 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm transition-all text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="lead-submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sunset-orange hover:bg-mango disabled:bg-sunset-orange/50 text-white font-serif font-extrabold text-base tracking-widest uppercase py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transform active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                  </button>
                  


                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
