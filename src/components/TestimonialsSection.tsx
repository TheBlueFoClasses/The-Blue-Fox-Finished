import React from 'react';
import { TESTIMONIALS_DATA } from '../data';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-24 bg-ocean-water/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="testimonials-block">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-oiler-navy mt-1 tracking-tight">
              What Our Artists Say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                id={`testimonial-bubble-${t.id}`}
                key={t.id}
                className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-ocean-water/40 shadow-sm relative flex flex-col justify-between"
              >
                {/* Giant orange citation quote */}
                <span className="absolute top-6 left-6 text-sunset-orange/15 font-serif text-8xl pointer-events-none -mt-4 font-black">
                  “
                </span>

                <p className="text-base sm:text-lg text-oiler-navy/85 italic leading-relaxed font-sans relative z-10 font-medium">
                  "{t.text}"
                </p>

                <div className="mt-8 pt-6 border-t border-ocean-water/30 flex items-center space-x-4">
                  {/* Colored avatar */}
                  <div className="w-11 h-11 bg-gradient-to-tr from-brilliant-blue to-ocean-water rounded-full flex items-center justify-center font-serif text-white font-black text-sm uppercase shadow-inner">
                    {t.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-serif font-black text-oiler-navy text-base leading-tight">{t.author}</p>
                    {t.role && <p className="text-xs text-oiler-navy/60 font-sans tracking-wide mt-0.5">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
