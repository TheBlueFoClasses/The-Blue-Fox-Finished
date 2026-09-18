import React from 'react';
import { Calendar } from 'lucide-react';
import { IMAGES } from '../data';

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 lg:pt-32 pb-16 bg-white overflow-hidden flex items-center"
    >
      {/* Whimsical background paint splatters / blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-ocean-water/30 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-mango/10 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brilliant-blue/[0.02] blur-3xl -z-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left" id="hero-text-content">
            {/* Required Headline */}
            <h1
              id="hero-headline"
              className="text-3xl sm:text-4xl lg:text-4xl font-serif font-black text-oiler-navy leading-tight mb-6 tracking-tight text-balance"
            >
              At The Blue Fox, we believe that creating art shouldn't be stressful, and that{' '}
              <span className="relative inline-block text-sunset-orange">
                anyone can be an artist
                <span className="absolute bottom-1 left-0 w-full h-3 bg-ocean-water -z-10 transform -rotate-2 rounded" />
              </span>{' '}
              as long as you believe in yourself!
            </h1>

            {/* Subtext description */}
            <p
              id="hero-subtext"
              className="text-base sm:text-lg text-oiler-navy/80 font-normal leading-relaxed mb-8 max-w-xl font-sans"
            >
              Whether you're picking up a paintbrush for the first time in years or refining your unique artistic style, our welcoming classes are designed for you. With expert guidance, proven teaching methods, a supportive atmosphere, and a vibrant creative community, it's easy to see why students return again and again. The joy of creating and becoming your best self is the real journey.
            </p>

            {/* CTA Container */}
            <div
              id="hero-cta-group"
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
            >
              <a
                id="hero-secondary-btn"
                href="#calendar"
                className="text-oiler-navy hover:text-brilliant-blue font-bold tracking-wider text-sm text-center py-3.5 px-5 rounded-full border border-oiler-navy/20 hover:border-brilliant-blue transition-all bg-transparent flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5 text-sunset-orange" />
                <span>VIEW CALENDAR</span>
              </a>
            </div>
          </div>

          {/* Artistic Image Canvas contained within layout */}
          <div
            className="w-full mt-12 lg:mt-0 lg:col-span-7 relative"
            id="hero-image-canvas"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]">
              {/* Offset colored backdrop frame for depth */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brilliant-blue via-ocean-water to-mango opacity-80 transform -rotate-1.5 -z-10 animate-fade-in" />

              {/* Single Large Image with premium rounded corners */}
              <div className="group relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-2xl border-4 border-white select-none">
                <img
                  src={IMAGES.classPhoto}
                  alt="Students holding fox masks at The Blue Fox paint class"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
