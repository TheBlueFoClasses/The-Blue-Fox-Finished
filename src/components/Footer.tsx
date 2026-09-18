import { Compass, Landmark, Calendar, Image as ImageIcon, MessageSquare, Heart } from 'lucide-react';
import { IMAGES } from '../data';

export default function Footer() {
  const links = [
    { name: 'HOME', href: '#home', icon: Compass },
    { name: 'ABOUT', href: '#about', icon: Landmark },
    { name: 'CALENDAR', href: '#calendar', icon: Calendar },
    { name: 'PORTFOLIO', href: '#portfolio', icon: ImageIcon },
    { name: 'CONTACT', href: '#lead-capture', icon: MessageSquare },
  ];

  return (
    <footer id="app-footer" className="bg-oiler-navy text-white pt-20 pb-12 relative overflow-hidden">
      
      {/* Absolute design circle backing */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brilliant-blue/5 -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-sunset-orange/5 -ml-36 -mb-36 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          
          {/* Logo Brand bio */}
          <div className="space-y-6" id="footer-logo-col">
            <a href="#home" className="inline-flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 shrink-0">
                <img
                  src={IMAGES.mascotFooter}
                  alt="The Blue Fox Mascot Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white">
                  The Blue <span className="text-sunset-orange">Fox</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-ocean-water font-sans font-semibold">
                  Fine Art Classes
                </span>
              </div>
            </a>
            
            <p className="text-sm text-white/70 font-sans leading-relaxed">
              Unleash your imagination and join us on Facebook to be a part of The Blue Fox artist community!
            </p>

            <a
              id="footer-facebook-btn"
              href="http://www.facebook.com/thebluefoxclasses"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit The Blue Fox on Facebook"
              className="inline-flex items-center space-x-2.5 bg-sunset-orange hover:bg-mango text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:shadow-sunset-orange/30 transform hover:scale-105 shrink-0"
              title="Visit our Facebook page"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Follow Us on Facebook</span>
            </a>
          </div>

          {/* Quick Navigations */}
          <div className="space-y-4" id="footer-links-col">
            <h4 className="text-base font-serif font-black text-mango tracking-wider uppercase mb-2">
              Explore Inside
            </h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2 font-sans font-semibold text-sm">
              {links.map((ln) => {
                const Icon = ln.icon;
                return (
                  <a
                    key={ln.name}
                    href={ln.href}
                    className="text-white/80 hover:text-sunset-orange hover:translate-x-1 transition-all flex items-center space-x-2 py-1"
                  >
                    <Icon className="w-3.5 h-3.5 text-ocean-water" />
                    <span>{ln.name}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Friendly Studio note */}
          <div className="space-y-4" id="footer-tea-time-col">
            <h4 className="text-base font-serif font-black text-mango tracking-wider uppercase mb-2">
              Our Promise
            </h4>
            <p className="text-sm text-white/70 font-sans leading-relaxed italic">
              "We will always inspire your creative spirit, boost your self-worth, listen to your ideas, and help guide your artistic journey."
            </p>
            <p className="text-xs text-white/50 font-sans">
              — Aryn, Founder & Teacher
            </p>
          </div>

        </div>

        {/* Horizontal separator */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/50">
          <div className="flex items-center space-x-1.5 justify-center">
            <span>© {new Date().getFullYear()} The Blue Fox Art Studio. All rights reserved.</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-sunset-orange fill-sunset-orange animate-pulse" />
            <span>in Monticello, MN</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
