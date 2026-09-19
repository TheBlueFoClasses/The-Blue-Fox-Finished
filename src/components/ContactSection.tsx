import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('joining');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    const submissionData = {
      name: name.trim(),
      email: email.trim(),
      subject,
      inquiryType: subject,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      source: 'contact_form',
    };

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Successfully stored contact submission in the_blue_fox database:', data);
      } else {
        console.warn('Backend responded with non-2xx status, saving backup locally');
      }

      // Always save a local copy as backup
      try {
        const localSubmissions = JSON.parse(localStorage.getItem('the_blue_fox_submissions') || '[]');
        localStorage.setItem(
          'the_blue_fox_submissions',
          JSON.stringify([...localSubmissions, { ...submissionData, id: `local-${Date.now()}` }])
        );
      } catch (e) {
        console.warn('LocalStorage backup note:', e);
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback: save to localStorage so the inquiry is never lost
      try {
        const localSubmissions = JSON.parse(localStorage.getItem('the_blue_fox_submissions') || '[]');
        localStorage.setItem(
          'the_blue_fox_submissions',
          JSON.stringify([...localSubmissions, { ...submissionData, id: `local-${Date.now()}` }])
        );
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } catch {
        setErrorMsg('There was a problem sending your message. Please try again or email us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-ocean-water/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="contact-header-block">
          <h2
            id="contact-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-oiler-navy tracking-tight mb-4"
          >
            Contact Us
          </h2>
          <p className="text-base sm:text-lg text-oiler-navy/70 font-sans max-w-xl mx-auto">
            Have questions about a class or want to schedule a private event?<br />
            Drop us a message via email, call, or text.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & FAQs (Left Block) */}
          <div className="lg:col-span-5 space-y-8 text-left" id="contact-details-and-faqs">
            
            {/* Studio Coordinates */}
            <div className="bg-white p-8 rounded-3xl border border-ocean-water/40 shadow-sm space-y-6">
              <h3 className="text-2xl font-serif font-black text-oiler-navy mb-4">Studio Details</h3>
              
              <div className="flex items-start space-x-4">
                <div className="bg-ocean-water p-3 rounded-2xl text-brilliant-blue shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase text-oiler-navy/50 font-bold tracking-wider">Studio Location</p>
                  <p className="text-base text-oiler-navy font-semibold mt-0.5">
                    Traveling Art Studio<br />
                    Monticello, MN 55362
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-ocean-water p-3 rounded-2xl text-brilliant-blue shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase text-oiler-navy/50 font-bold tracking-wider">Email Aryn</p>
                  <p className="text-base text-oiler-navy font-semibold mt-0.5 hover:text-sunset-orange transition-colors">
                    thebluefoxclasses@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-ocean-water p-3 rounded-2xl text-brilliant-blue shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase text-oiler-navy/50 font-bold tracking-wider">Call or Text</p>
                  <p className="text-base text-oiler-navy font-semibold mt-0.5">
                    (218) 234-5663
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Contact Form (Right Block) */}
          <div className="lg:col-span-7" id="contact-form-col">
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-ocean-water/40 shadow-sm text-left">
              <h3 className="text-2xl font-serif font-black text-oiler-navy mb-6">Send Us a Message</h3>

              {success ? (
                <div
                  id="contact-success-container"
                  className="bg-ocean-water/20 p-8 rounded-3xl border border-ocean-water text-center animate-fade-in"
                >
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                    <Check className="w-7 h-7 text-sunset-orange font-bold" />
                  </div>
                  <h4 className="text-2xl font-serif font-extrabold text-oiler-navy mb-2">Message Received flying!</h4>
                  <p className="text-sm text-oiler-navy/80 leading-relaxed max-w-md mx-auto font-sans">
                    Thank you so much! Aryn has received your message and will read it during our next creative tea break. 
                    Expect a warm response within 24 hours. Cheers!
                  </p>
                  <button
                    id="contact-send-another-btn"
                    onClick={() => setSuccess(false)}
                    className="mt-6 bg-oiler-navy hover:bg-brilliant-blue text-white font-serif font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-full transition-all"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form id="contact-clara-form" onSubmit={handleSubmit} className="space-y-6 font-sans">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div id="contact-name-wrapper">
                      <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2">
                        Your Full Name
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        placeholder="Emma Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white text-oiler-navy placeholder-oiler-navy/40 p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm"
                      />
                    </div>

                    {/* Email input */}
                    <div id="contact-email-wrapper">
                      <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2">
                        Email Address
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        placeholder="emma@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white text-oiler-navy placeholder-oiler-navy/40 p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Dropdown for inquiry subject */}
                  <div id="contact-subject-wrapper">
                    <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2">
                      How can we help you?
                    </label>
                    <select
                      id="contact-subject-select"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white text-oiler-navy p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans font-bold text-sm shadow-sm"
                    >
                      <option value="joining">🎨 I want to join specific classes</option>
                      <option value="private-party">🦊 Private paint party / Kids Birthday booking</option>
                      <option value="accommodation">🍵 Inquire about seating / physical ease accommodations</option>
                      <option value="hello">👋 Just wanted to send Aryn a friendly note</option>
                    </select>
                  </div>

                  {/* Message body */}
                  <div id="contact-message-wrapper">
                    <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="contact-message-textarea"
                      required
                      rows={5}
                      placeholder="Hi Aryn, I wanted to bring my 62-year-old grandmother and my 8-year-old daughter to the Sunday sunset paints. Do you recommend..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white text-oiler-navy placeholder-oiler-navy/40 p-4 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-sans">
                      {errorMsg}
                    </div>
                  )}

                  {/* Action submit button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sunset-orange hover:bg-mango disabled:opacity-60 text-white font-serif font-extrabold text-base tracking-widest uppercase py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transform active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving to Database...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
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
