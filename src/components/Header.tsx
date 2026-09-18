import { useState, useEffect } from 'react';
import { Menu, X, Landmark, Compass, Calendar, Image as ImageIcon, Mail, MessageSquare, Flame, Palette } from 'lucide-react';
import { IMAGES } from '../data';

interface HeaderProps {
  onRegisterClick?: () => void;
}

export default function Header({ onRegisterClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');

  // Smooth scroll and handle header state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active hash changes to highlight the current navigation tab
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const menuItems = [
    { name: 'HOME', href: '#home', icon: Compass },
    { name: 'ABOUT', href: '#about', icon: Landmark },
    { name: 'CALENDAR', href: '#calendar', icon: Calendar },
    { name: 'PORTFOLIO', href: '#portfolio', icon: ImageIcon },
    { name: 'CONTACT', href: '#lead-capture', icon: MessageSquare },
  ];

  return (
    <header
      id="main-nav-container"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2 border-b border-ocean-water/30'
          : 'bg-white/90 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <a
            id="brand-logo-link"
            href="#home"
            className="flex items-center space-x-3 group"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brilliant-blue transition-transform duration-300 group-hover:scale-105">
              <img
                id="brand-mascot-img"
                src={IMAGES.mascotHeader}
                alt="The Blue Fox Mascot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span
                id="brand-name-text"
                className="text-2xl font-serif font-black tracking-tight text-oiler-navy group-hover:text-brilliant-blue transition-colors duration-200"
              >
                The Blue <span className="text-sunset-orange font-bold">Fox</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#19244e]/70 font-sans font-semibold -mt-1">
                Fine Art Classes
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-navigation-links" className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = activeHash === item.href || (activeHash.startsWith('#class-') && item.href === '#calendar');
              return (
                <a
                  id={`nav-${item.name.toLowerCase()}`}
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold tracking-wider transition-colors py-2 relative group ${
                    isActive ? 'text-sunset-orange' : 'text-oiler-navy hover:text-sunset-orange'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-sunset-orange transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA: Facebook Icon */}
          <div id="desktop-cta-container" className="hidden lg:flex items-center">
            <a
              id="desktop-facebook-nav-btn"
              href="http://www.facebook.com/thebluefoxclasses"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit The Blue Fox on Facebook"
              className="w-11 h-11 rounded-full bg-sunset-orange hover:bg-mango text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sunset-orange/30 transform hover:scale-110 shrink-0"
              title="Visit our Facebook page"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          {/* Mobile hamburger button & Facebook icon */}
          <div id="mobile-menu-trigger-container" className="lg:hidden flex items-center space-x-3">
            <a
              id="mobile-header-facebook-btn"
              href="http://www.facebook.com/thebluefoxclasses"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit The Blue Fox on Facebook"
              className="w-10 h-10 rounded-full bg-sunset-orange hover:bg-mango text-white flex items-center justify-center transition-all shadow-sm"
              title="Visit our Facebook page"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-oiler-navy hover:text-sunset-orange hover:bg-ocean-water/20 focus:outline-none focus:ring-2 focus:ring-brilliant-blue transition-all"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation-drawer"
        className={`lg:hidden fixed inset-0 top-[72px] z-40 bg-white transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3 bg-white border-b border-ocean-water/50 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeHash === item.href || (activeHash.startsWith('#class-') && item.href === '#calendar');
            return (
              <a
                id={`mobile-nav-${item.name.toLowerCase()}`}
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive ? 'text-sunset-orange bg-ocean-water/10' : 'text-oiler-navy hover:text-sunset-orange hover:bg-ocean-water/20'
                }`}
              >
                <IconComponent className={`h-5 w-5 ${isActive ? 'text-sunset-orange' : 'text-brilliant-blue'}`} />
                <span>{item.name}</span>
              </a>
            );
          })}
          <div className="pt-4 px-4">
            <a
              id="mobile-facebook-drawer-btn"
              href="http://www.facebook.com/thebluefoxclasses"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full bg-sunset-orange hover:bg-mango text-white font-bold tracking-widest py-3 px-6 rounded-full text-center transition-all shadow-md flex items-center justify-center space-x-2 uppercase text-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>FOLLOW US ON FACEBOOK</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
