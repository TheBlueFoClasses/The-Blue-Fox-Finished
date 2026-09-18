import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PortfolioItem } from '../types';
import { PORTFOLIO_DATA } from '../data';

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'student' | 'class-ex' | 'family'>('all');
  const [portfolioItems] = useState<PortfolioItem[]>(PORTFOLIO_DATA);
  const [lightboxImage, setLightboxImage] = useState<PortfolioItem | null>(null);

  const filteredPortfolio = portfolioItems.filter((item) => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-ocean-water/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="portfolio-header-container">
          <h2
            id="portfolio-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-oiler-navy tracking-tight mb-4"
          >
            The Blue Fox Gallery
          </h2>
          <p className="text-lg text-oiler-navy/70 font-sans max-w-xl mx-auto">
            We offer drawing, acrylic painting, and barn quilt painting classes for adults, and creative summer camps for kids. Take a look at our portfolio by clicking on an image below.
          </p>
        </div>

        {/* First Row of Gallery Photos */}
        <div
          id="portfolio-grid-gallery-first-row"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPortfolio.slice(0, 3).map((item) => {
            return (
              <div
                id={`portfolio-item-card-${item.id}`}
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-ocean-water/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col relative"
              >
                {/* Image display */}
                <div className="relative aspect-square overflow-hidden bg-white/50">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Text details beneath */}
                <div className="p-5 flex items-center justify-between mt-auto">
                  <div className="text-left">
                    <h4 className="text-xl font-serif font-black text-oiler-navy leading-normal">
                      {item.title}
                    </h4>
                    <p className="text-xs text-oiler-navy/60 font-sans font-medium">
                      {['lady slipper', 'faded star', 'starry sky', 'by '].some(key => item.author.toLowerCase().includes(key)) ? item.author : `By ${item.author}`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Masterpieces Button Placement Under First Row */}
        <div className="text-center my-10" id="student-masterpieces-container">
          <button
            id="student-masterpieces-btn"
            onClick={() => {
              window.location.hash = '#student-masterpieces';
            }}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all cursor-pointer bg-brilliant-blue hover:bg-brilliant-blue/90 text-white"
          >
            <Sparkles className="w-4 h-4 text-mango" />
            <span>Student Masterpieces</span>
          </button>
        </div>

        {/* Remaining Gallery Grid Photos */}
        {filteredPortfolio.length > 3 && (
          <div
            id="portfolio-grid-gallery-remaining"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPortfolio.slice(3).map((item) => {
              return (
                <div
                  id={`portfolio-item-card-${item.id}`}
                  key={item.id}
                  onClick={() => setLightboxImage(item)}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-ocean-water/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col relative"
                >
                  {/* Image display */}
                  <div className="relative aspect-square overflow-hidden bg-white/50">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Text details beneath */}
                  <div className="p-5 flex items-center justify-between mt-auto">
                    <div className="text-left">
                      <h4 className="text-xl font-serif font-black text-oiler-navy leading-normal">
                        {item.title}
                      </h4>
                      <p className="text-xs text-oiler-navy/60 font-sans font-medium">
                        {['lady slipper', 'faded star', 'starry sky', 'by '].some(key => item.author.toLowerCase().includes(key)) ? item.author : `By ${item.author}`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox photo modal */}
      {lightboxImage && (
        <div
          id="portfolio-lightbox-overlay"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 bg-oiler-navy/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-white/20"
          >
            <div className="relative aspect-square">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                id="lightbox-close-btn"
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 bg-oiler-navy/80 hover:bg-sunset-orange text-white p-2.5 rounded-full transition-all"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-6 bg-white text-left">
              {lightboxImage.id !== 'port-1' && lightboxImage.categoryLabel && (
                <span className="bg-ocean-water text-oiler-navy text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full">
                  {lightboxImage.categoryLabel}
                </span>
              )}
              <h4 className="text-2xl font-serif font-black text-oiler-navy mt-3">
                {lightboxImage.title}
              </h4>
              <p className="text-sm text-oiler-navy/70 font-sans font-medium mt-1">
                {['lady slipper', 'faded star', 'starry sky', 'by '].some(key => lightboxImage.author.toLowerCase().includes(key)) ? (
                  <strong className="text-oiler-navy font-bold">{lightboxImage.author}</strong>
                ) : (
                  <>
                    Warmly painted by: <strong className="text-oiler-navy font-bold">{lightboxImage.author}</strong>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
