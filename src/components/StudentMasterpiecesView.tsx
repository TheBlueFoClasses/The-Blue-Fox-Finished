import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Palette } from 'lucide-react';
import { STUDENT_MASTERPIECES, StudentMasterpiece } from '../data/studentMasterpiecesData';

interface StudentMasterpiecesViewProps {
  onBack: () => void;
  onRegisterClick?: () => void;
}

export default function StudentMasterpiecesView({ onBack, onRegisterClick }: StudentMasterpiecesViewProps) {
  const [selectedItem, setSelectedItem] = useState<StudentMasterpiece | null>(null);

  return (
    <div id="student-masterpieces-page" className="min-h-screen bg-ocean-water/10 py-12 lg:py-20 relative">
      {/* Decorative ambient background blur blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-ocean-water/30 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-mango/15 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            id="back-to-gallery-btn"
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-oiler-navy hover:text-sunset-orange font-bold text-sm bg-white px-5 py-2.5 rounded-full shadow-sm border border-ocean-water/40 transition-all hover:shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-sunset-orange" />
            <span>Back to The Blue Fox Gallery</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="student-masterpieces-header-container">
          <div className="inline-flex items-center space-x-2 bg-sunset-orange/10 text-sunset-orange font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-sunset-orange/20">
            <Sparkles className="w-3.5 h-3.5 text-mango" />
            <span>Created in Our Studio & Workshops</span>
          </div>
          <h1
            id="student-masterpieces-page-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-oiler-navy tracking-tight mb-4"
          >
            Student Masterpieces
          </h1>
          <p className="text-base sm:text-lg text-oiler-navy/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Explore inspiring original artwork created by students of all ages across our drawing, acrylic painting, barn quilt painting, and youth art workshops!
          </p>
        </div>

        {/* Masterpieces Grid */}
        <div
          id="student-masterpieces-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {STUDENT_MASTERPIECES.map((item) => (
            <div
              id={`student-masterpiece-card-${item.id}`}
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-ocean-water/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image display */}
                <div className="relative aspect-square overflow-hidden bg-white/50">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-oiler-navy text-xs font-bold px-3 py-1 rounded-full border border-ocean-water/40">
                    {item.category}
                  </div>
                </div>

                {/* Content underneath image with title */}
                <div className="p-6 text-left">
                  <h3 className="text-xl font-serif font-black text-oiler-navy leading-snug mb-1 group-hover:text-brilliant-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-sunset-orange mb-2">
                    {item.artist}
                  </p>
                  <div className="mb-3">
                    <span className="inline-block text-[11px] font-bold text-oiler-navy/70 bg-ocean-water/40 px-2.5 py-0.5 rounded-full">
                      {item.medium}
                    </span>
                  </div>
                  <p className="text-xs text-oiler-navy/70 font-sans line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 bg-gradient-to-tr from-oiler-navy via-[#1f2d60] to-oiler-navy text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sunset-orange/15 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mb-4">
              Inspired to Create Your Own Masterpiece?
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-sans mb-8 leading-relaxed">
              Join us for drawing, acrylic painting, or barn quilt painting. All art supplies and warm, step-by-step instruction are included!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#calendar"
                className="w-full sm:w-auto bg-sunset-orange hover:bg-sunset-orange/90 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all transform hover:scale-105 text-center"
              >
                Browse Upcoming Classes
              </a>
              <button
                onClick={onBack}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm px-6 py-3.5 rounded-full transition-all text-center cursor-pointer"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Masterpiece Detail */}
      {selectedItem && (
        <div
          id="student-masterpiece-modal-overlay"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 bg-oiler-navy/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-white/20 cursor-default"
          >
            <div className="relative aspect-square bg-white/50">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                id="close-masterpiece-modal-btn"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-oiler-navy/80 hover:bg-sunset-orange text-white p-2.5 rounded-full transition-all text-xs font-bold"
              >
                ✕ Close
              </button>
              <div className="absolute bottom-4 left-4 bg-oiler-navy/80 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
                {selectedItem.artist}
              </div>
            </div>

            <div className="p-6 sm:p-8 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-ocean-water text-oiler-navy text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full">
                  {selectedItem.category}
                </span>
                <span className="text-xs font-bold text-brilliant-blue">
                  {selectedItem.medium}
                </span>
              </div>

              <h3 className="text-2xl font-serif font-black text-oiler-navy mt-1 mb-2">
                {selectedItem.title}
              </h3>

              <p className="text-sm text-oiler-navy/80 font-sans leading-relaxed mb-4">
                {selectedItem.description}
              </p>

              {selectedItem.details && (
                <div className="bg-ocean-water/20 rounded-2xl p-4 mb-6">
                  <h4 className="text-xs uppercase font-black text-oiler-navy tracking-wider mb-1 flex items-center space-x-1.5">
                    <Palette className="w-3.5 h-3.5 text-brilliant-blue" />
                    <span>Artwork Details</span>
                  </h4>
                  <p className="text-xs text-oiler-navy/80 font-sans leading-relaxed">
                    {selectedItem.details}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#calendar"
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 bg-sunset-orange hover:bg-sunset-orange/90 text-white font-bold text-sm py-3.5 px-4 rounded-full text-center shadow-md transition-all"
                >
                  Join an Art Class
                </a>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-ocean-water/40 hover:bg-ocean-water/60 text-oiler-navy font-bold text-sm py-3.5 px-6 rounded-full text-center transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
