/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import InstructorBio from './components/InstructorBio';
import CalendarSection from './components/CalendarSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import LeadCaptureSection from './components/LeadCaptureSection';
import RegistrationModal from './components/RegistrationModal';
import ClassDetailView from './components/ClassDetailView';
import BarnQuiltDesignsView from './components/BarnQuiltDesignsView';
import StudentMasterpiecesView from './components/StudentMasterpiecesView';
import Footer from './components/Footer';
import { ArtClass } from './types';
import { getScheduledClassesForYear, ScheduledClass } from './utils/calendarUtils';

export default function App() {
  const [selectedClassForReg, setSelectedClassForReg] = useState<ArtClass | null>(null);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'calendar' | 'contact' | 'class-detail' | 'barn-quilt-designs' | 'student-masterpieces'>('home');
  const [selectedClassForDetail, setSelectedClassForDetail] = useState<ScheduledClass | null>(null);

  const scheduledClassesList = getScheduledClassesForYear(2026);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#barn-quilt-designs') {
        setCurrentView('barn-quilt-designs');
        setSelectedClassForDetail(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#student-masterpieces') {
        setCurrentView('student-masterpieces');
        setSelectedClassForDetail(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#calendar') {
        setCurrentView('home');
        setSelectedClassForDetail(null);
        setTimeout(() => {
          const element = document.getElementById('calendar');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else if (hash === '#contact') {
        setCurrentView('home');
        setSelectedClassForDetail(null);
        setTimeout(() => {
          const element = document.getElementById('lead-capture');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else if (hash.startsWith('#class-')) {
        const fullId = hash.replace('#class-', '');
        const found = scheduledClassesList.find((c) => c.id === fullId);
        if (found) {
          setSelectedClassForDetail(found);
          setCurrentView('class-detail');
        } else {
          setCurrentView('home');
          setSelectedClassForDetail(null);
          setTimeout(() => {
            const element = document.getElementById('calendar');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('home');
        setSelectedClassForDetail(null);
        if (hash && hash !== '#home') {
          setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial load

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Open modal with specific art class pre-selected
  const handleOpenRegistration = (artClass: ArtClass | null = null) => {
    setSelectedClassForReg(artClass);
    setIsRegModalOpen(true);
  };

  const handleCloseRegistration = () => {
    setSelectedClassForReg(null);
    setIsRegModalOpen(false);
  };

  const handleViewClassDetails = (scheduledClass: ScheduledClass) => {
    window.location.hash = `#class-${scheduledClass.id}`;
  };

  const handleBackToCalendar = () => {
    window.location.hash = '#calendar';
  };

  return (
    <div id="application-layout-frame" className="min-h-screen bg-white text-oiler-navy flex flex-col font-sans select-none antialiased">
      {/* 1. Navigation Header */}
      <Header onRegisterClick={() => handleOpenRegistration(null)} />

      {/* Main layout container support calendar and home page switcher */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'calendar' ? (
            <motion.div
              key="calendar-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* 4. Filterable Art Classes & Live Calendar (as a standalone page) */}
              <CalendarSection
                onClassSelect={(clObj) => handleOpenRegistration(clObj)}
                onViewClassDetails={handleViewClassDetails}
              />
            </motion.div>
          ) : currentView === 'class-detail' && selectedClassForDetail ? (
            <motion.div
              key="class-detail-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ClassDetailView
                scheduledClass={selectedClassForDetail}
                onBack={handleBackToCalendar}
                onRegister={() => handleOpenRegistration(selectedClassForDetail)}
              />
            </motion.div>
          ) : currentView === 'barn-quilt-designs' ? (
            <motion.div
              key="barn-quilt-designs-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <BarnQuiltDesignsView
                onBack={() => {
                  window.location.hash = '#portfolio';
                }}
                onRegisterClick={() => handleOpenRegistration(null)}
              />
            </motion.div>
          ) : currentView === 'student-masterpieces' ? (
            <motion.div
              key="student-masterpieces-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <StudentMasterpiecesView
                onBack={() => {
                  window.location.hash = '#portfolio';
                }}
                onRegisterClick={() => handleOpenRegistration(null)}
              />
            </motion.div>
          ) : currentView === 'contact' ? (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* 7. Contact Info & FAQs Accordion wrapper */}
              <ContactSection />
            </motion.div>
          ) : (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* 2. Hero Section */}
              <Hero onRegisterClick={() => handleOpenRegistration(null)} />

              {/* 3. Instructor Profile & Studio Beliefs */}
              <InstructorBio />

              {/* 4. Student Masterpieces Gallery - The Blue Fox Gallery */}
              <PortfolioSection />

              {/* 5. Interactive Annual & Monthly Studio Calendar */}
              <CalendarSection
                onClassSelect={(clObj) => handleOpenRegistration(clObj)}
                onViewClassDetails={handleViewClassDetails}
              />

              {/* 6. What Our Artists Say - Testimonials Section */}
              <TestimonialsSection />

              {/* 7. Professional Lead Capture Form */}
              <LeadCaptureSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 8. Footer component with hours & copyrights */}
      <Footer />

      {/* 9. Interactive step-by-step Class Registration Overlay */}
      {isRegModalOpen && (
        <RegistrationModal
          selectedClass={selectedClassForReg}
          onClose={handleCloseRegistration}
        />
      )}
    </div>
  );
}

