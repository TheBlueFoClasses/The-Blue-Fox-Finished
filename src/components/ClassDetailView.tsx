import React from 'react';
import { ArrowLeft, Clock, Calendar as CalIcon, Users, DollarSign, Sparkles, Coffee, Heart, CheckCircle2, ShieldAlert, MapPin } from 'lucide-react';
import { ScheduledClass } from '../utils/calendarUtils';

interface ClassDetailViewProps {
  scheduledClass: ScheduledClass;
  onBack: () => void;
  onRegister: () => void;
}

const MEDIUM_IMAGES = {
  watercolor: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&auto=format&fit=crop&q=80',
  clay: 'https://images.unsplash.com/photo-1565192647048-f997ded8795c?w=1200&auto=format&fit=crop&q=80',
  painting: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&auto=format&fit=crop&q=80',
  'mixed-media': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80',
};

export default function ClassDetailView({ scheduledClass, onBack, onRegister }: ClassDetailViewProps) {
  const imageUrl = MEDIUM_IMAGES[scheduledClass.medium] || MEDIUM_IMAGES.painting;

  // Medium descriptions for what is included
  const getMediumSpecificDetails = (medium: string) => {
    if (scheduledClass.title.toLowerCase().includes('quilt')) {
      return [
        'Durable, custom-cut pre-primed wooden quilt boards (2x2 feet)',
        'Weather-resistant, rich exterior acrylic paints in vibrant hues',
        'Precision drafting rulers, low-tack painters tape, and tracing tools',
        'Warm spiced apple cider with freshly baked snickerdoodle cookies'
      ];
    }

    switch (medium) {
      case 'watercolor':
        return [
          'Professional-grade cold-press watercolor sheets (300gsm)',
          'Bespoke watercolor palettes featuring honey-based rich pigments',
          'Selection of fine natural sable and synthetic detail brushes',
          'Freshly brewed seasonal herbal tea and lavender sugar cookies'
        ];
      case 'clay':
        return [
          'Air-dry premium sculpting clay (up to 2 lbs per family)',
          'Wood carving tools, rolling pins, and texture stamps',
          'Safe non-toxic acrylic glaze set with high-luster finish',
          'Kiln-style firing simulation support and modeling board'
        ];
      case 'painting':
        return [
          'Pre-stretched premium cotton canvas (12x16 or 16x20 inches)',
          'High-density heavy body acrylic paints (unlimited supply)',
          'Heavy-duty table easel and variety of flat, round, and fan brushes',
          'Fresh artisan drip coffee or hot cocoa during class'
        ];
      default:
        return [
          'Assortment of handmade textured papers and real pressed flora',
          'Archival ink pens, charcoal sticks, and metallic foil accents',
          'pH-neutral safe adhesive mediums and wooden canvas frames',
          'Hot cider with cinnamon sticks to spark your creative thoughts'
        ];
    }
  };

  return (
    <div id="class-detail-page-container" className="py-12 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation link */}
        <button
          id="detail-back-button"
          onClick={onBack}
          className="group inline-flex items-center space-x-2 text-oiler-navy hover:text-sunset-orange font-sans font-bold text-xs uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Annual Calendar</span>
        </button>

        {/* Hero banner layout */}
        <div id="detail-hero-banner" className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-md mb-12 border border-ocean-water/30">
          <img
            src={imageUrl}
            alt={scheduledClass.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-oiler-navy/90 via-oiler-navy/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-white">
            <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 ${scheduledClass.dotsColor}`}>
              {scheduledClass.mediumLabel}
            </span>
            <h1 id="detail-main-heading" className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight">
              {scheduledClass.title}
            </h1>
            <p className="text-sm md:text-base text-ocean-water/90 font-sans mt-2">
              Hosted by <strong className="text-white">{scheduledClass.instructor}</strong> • {scheduledClass.ageLabel}
            </p>
          </div>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main detailed text - Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10" id="detail-left-content">
            
            {/* Description Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ocean-water/40 shadow-sm">
              <h2 className="text-2xl font-serif font-black text-oiler-navy mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sunset-orange" />
                About This Studio Session
              </h2>
              <p className="text-lg text-oiler-navy/85 leading-relaxed font-sans">
                {scheduledClass.description}
              </p>
              <p className="text-base text-oiler-navy/70 leading-relaxed font-sans mt-4">
                At The Blue Fox Art Studio, we believe that making art shouldn't feel like taking a test. 
                Whether you're painting a misty forest or shaping a small ceramic animal, Instructor Aryn Lill 
                guides your hand at a relaxing pace. There is no rush, no criticism, and absolute space for beginners.
              </p>
            </div>

            {/* Materials Included Card */}
            <div className="bg-ocean-water/10 rounded-3xl p-6 sm:p-8 border border-ocean-water/30">
              <h3 className="text-xl font-serif font-black text-oiler-navy mb-6 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-mango" />
                Premium Materials & Treats Included
              </h3>
              <p className="text-sm text-oiler-navy/70 font-sans mb-6">
                We take care of all the prep work! Your seat registration includes the absolute best tools and 
                warm home-brewed treats so you can walk in worry-free:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-sm text-oiler-navy">
                {getMediumSpecificDetails(scheduledClass.medium).map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-3 bg-white p-3.5 rounded-2xl border border-ocean-water/40">
                    <CheckCircle2 className="w-5 h-5 text-brilliant-blue shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What you will learn */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ocean-water/40 shadow-sm">
              <h3 className="text-xl font-serif font-black text-oiler-navy mb-4">
                What to Expect During Your {scheduledClass.mediumLabel} Class:
              </h3>
              <div className="space-y-4 font-sans text-sm text-oiler-navy/80">
                <p>
                  <strong>1. Cozy Settling & Palette Priming:</strong> We start with a hot beverage, select our brushes, and talk about our inspirations. No pressure to jump right in!
                </p>
                <p>
                  <strong>2. Step-by-Step Gentle Demos:</strong> Aryn demonstrates essential strokes, color values, or modeling secrets, explaining the "why" and "how" simply.
                </p>
                <p>
                  <strong>3. Independent Free play & 1:1 Coaching:</strong> You spend the majority of the session experimenting. Aryn sits with each guest to softly coach and mix colors.
                </p>
                <p>
                  <strong>4. Celebration & Soft Glazing:</strong> We sign our creations, capture a beautiful photo under studio lights, and take a moment to admire our handiwork.
                </p>
              </div>
            </div>

            {/* Safety & Cancellation */}
            <div className="flex items-start space-x-4 bg-orange-50/50 p-6 rounded-3xl border border-orange-100">
              <ShieldAlert className="w-6 h-6 text-sunset-orange shrink-0 mt-1" />
              <div>
                <h4 className="font-serif font-black text-oiler-navy text-base">Carefree Reservation Guarantee</h4>
                <p className="text-sm text-oiler-navy/75 font-sans mt-1 leading-relaxed">
                  We understand that family plans and general circumstances shift! You can reschedule your session 
                  or request a full refund up to 24 hours before class. Simply drop us an email or give us a call.
                </p>
              </div>
            </div>

          </div>

          {/* Sticky checkout options - Right Column (4 cols) */}
          <div className="lg:col-span-4 sticky top-28" id="detail-right-checkout">
            <div className="bg-white rounded-3xl border-2 border-sunset-orange/40 shadow-lg p-6 sm:p-8 overflow-hidden relative">
              
              {/* Popular indicator ribbon */}
              {scheduledClass.isPopular && (
                <div className="absolute top-0 right-0 left-0 bg-sunset-orange text-white text-center py-1.5 text-[9px] uppercase tracking-widest font-black">
                  🔥 HIGHLY POPULAR SESSION
                </div>
              )}

              <div className="pt-4 space-y-6">
                
                {/* Pricing summary */}
                <div className="text-center pb-6 border-b border-ocean-water/30">
                  <span className="text-xs uppercase text-oiler-navy/50 font-bold block mb-1">Session Fee</span>
                  <div className="flex items-baseline justify-center text-oiler-navy font-serif font-black">
                    <span className="text-4xl">${scheduledClass.price}</span>
                    <span className="text-sm font-sans font-normal text-oiler-navy/60 ml-1">/ student seat</span>
                  </div>
                  <span className="text-xs text-brilliant-blue font-bold font-sans mt-2 block bg-ocean-water px-3 py-1 rounded-full inline-block">
                    All tools & snacks included
                  </span>
                </div>

                {/* Date & Time block */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm font-sans text-oiler-navy">
                    <div className="p-2 bg-ocean-water rounded-xl">
                      <CalIcon className="w-5 h-5 text-brilliant-blue" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-oiler-navy/50 block">Session Date</span>
                      <strong className="text-oiler-navy text-sm block leading-tight">{scheduledClass.dateLabel}</strong>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-sm font-sans text-oiler-navy">
                    <div className="p-2 bg-ocean-water rounded-xl">
                      <Clock className="w-5 h-5 text-mango" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-oiler-navy/50 block">Session Hours</span>
                      <strong className="text-oiler-navy text-sm block">{scheduledClass.timeLabel}</strong>
                    </div>
                  </div>

                  {scheduledClass.location && (
                    <div className="flex items-center space-x-3 text-sm font-sans text-oiler-navy">
                      <div className="p-2 bg-ocean-water rounded-xl">
                        <MapPin className="w-5 h-5 text-sunset-orange" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-oiler-navy/50 block">Location</span>
                        <strong className="text-oiler-navy text-sm block leading-tight">{scheduledClass.location}</strong>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 text-sm font-sans text-oiler-navy">
                    <div className="p-2 bg-ocean-water rounded-xl">
                      <Users className="w-5 h-5 text-sunset-orange" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-oiler-navy/50 block">Studio Capacity</span>
                      <strong className="text-oiler-navy text-sm block">Only {scheduledClass.capacity} Cozy Seats Max</strong>
                    </div>
                  </div>
                </div>

                {/* Booking Seats Warning */}
                <div className="p-4 bg-ocean-water/25 rounded-2xl border border-ocean-water/40 text-center text-xs font-sans text-oiler-navy/80">
                  ⚡ <strong>{scheduledClass.slotsRemaining} seats left</strong> for this particular date. Grab yours today!
                </div>

                {/* Primary Button to register */}
                {scheduledClass.externalUrl ? (
                  <a
                    id="checkout-register-button"
                    href={scheduledClass.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-sunset-orange hover:bg-mango text-white font-serif font-black text-sm tracking-widest uppercase py-4 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-4 h-4 fill-current animate-pulse" />
                    <span>SECURE MY SEAT NOW</span>
                  </a>
                ) : (
                  <button
                    id="checkout-register-button"
                    onClick={onRegister}
                    className="w-full bg-sunset-orange hover:bg-mango text-white font-serif font-black text-sm tracking-widest uppercase py-4 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-4 h-4 fill-current animate-pulse" />
                    <span>SECURE MY SEAT NOW</span>
                  </button>
                )}

                <p className="text-[10px] text-center text-oiler-navy/50 font-sans">
                  {scheduledClass.externalUrl 
                    ? (scheduledClass.externalUrl.includes('arb.umn.edu')
                        ? 'Registration will continue on the Minnesota Landscape Arboretum portal.'
                        : 'Registration will continue on our partner registration portal.')
                    : 'No immediate charge! Pay safely on the day of class with cash, check, or card.'}
                </p>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
