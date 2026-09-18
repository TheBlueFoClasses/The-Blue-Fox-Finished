import { Coffee, Palette, Smile, Sparkles } from 'lucide-react';
import { IMAGES } from '../data';

export default function InstructorBio() {
  const values = [
    {
      title: 'Fun',
      desc: 'Splatter paint, try something new, share stories, and meet new friends. A Blue Fox class is all about having fun and making memories while learning new techniques.',
      icon: Smile,
      color: 'bg-sunset-orange text-white',
    },
    {
      title: 'Inviting',
      desc: 'Slow down, enjoy the ride, and feel at home. Our inviting spaces are chosen to make you feel comfortable and welcome, no matter your background or baggage, whatever your age or skill level.',
      icon: Coffee,
      color: 'bg-ocean-water text-oiler-navy',
    },
    {
      title: 'Technical',
      desc: 'We are passionate about helping every student grow. Our curriculum is rooted in classical realism and emphasizes the fundamental elements of art, with proven application methods to guide your process.',
      icon: Palette,
      color: 'bg-brilliant-blue text-white',
    },
    {
      title: 'Creative',
      desc: 'Discover your unique visual voice. We encourage customization, self-expression, experimentation, and completely free styling.',
      icon: Sparkles,
      color: 'bg-mango text-oiler-navy',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-ocean-water/10 relative overflow-hidden"
    >
      {/* Decorative paint shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-ocean-water/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-mango/5 blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Portrait Grid Left */}
          <div className="lg:col-span-5 relative" id="instructor-portrait-col">
            <div className="absolute -inset-4 bg-gradient-to-br from-brilliant-blue to-ocean-water opacity-40 rounded-[2.5rem] transform rotate-3" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-ocean-water rounded-full -z-10 opacity-70" />
            
            <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl aspect-[3/4]">
              <img
                id="instructor-portrait-img"
                src={IMAGES.instructor}
                alt="Aryn Lill - Instructor & Founder of The Blue Fox Art Studio"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-oiler-navy/80 via-oiler-navy/30 to-transparent p-6 text-white">
                <p className="font-serif text-2xl font-bold">Aryn Lill Diemand</p>
                <p className="text-sm text-ocean-water font-sans font-medium tracking-wide">Lead Instructor & Founder</p>
              </div>
            </div>
          </div>

          {/* Biography Text Right */}
          <div className="lg:col-span-7 flex flex-col" id="instructor-biography-col">
            <h2
              id="instructor-bio-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-oiler-navy tracking-tight mb-6"
            >
              Meet the Instructor
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-oiler-navy/80 font-sans leading-relaxed">
              <p>
                Meet your lead instructor of art, <strong>Aryn Lill Diemand</strong>! An award-winning muralist and fine artist, Aryn has been sparking creativity in students since 2005. Whether she’s painting public art across Minnesota or teaching her signature curriculum through The Blue Fox, Aryn’s goal is to help every student—&ldquo;big or small&rdquo;—find their unique style.
              </p>
              <p>
                With degrees in Studio Arts and Fashion Design, Aryn brings a world of creative experience to every class. She spent years honing her teaching craft in California’s top art programs before returning home to MN to launch her own traveling studio. Join her for a class to see why her students love her!
              </p>
            </div>

            {/* Signature Quote */}
            <div className="mt-8 p-5 bg-white rounded-2xl border-l-4 border-sunset-orange shadow-sm">
              <span className="font-serif italic text-oiler-navy/70 block text-base md:text-lg">
                "Create something that comes from your soul and share it with the world."
              </span>
              <span className="text-xs font-bold text-sunset-orange uppercase tracking-wider block mt-2 text-right">— ARYN</span>
            </div>
          </div>

        </div>

        {/* Brand values / Core feelings section */}
        <div className="mt-24" id="brand-values-grid-container">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="text-2xl font-serif font-bold text-oiler-navy">Our Studio Philosophy</h3>
            <p className="text-sm text-oiler-navy/70 mt-2 font-sans">
              Four simple pillars that make art classes at The Blue Fox a breath of fresh air.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => {
              const IconComp = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white p-6 rounded-2xl border border-ocean-water/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left flex flex-col"
                >
                  <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mb-5 shadow-inner`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-serif font-black text-oiler-navy mb-2">{v.title}</h4>
                  <p className="text-sm text-oiler-navy/75 leading-relaxed font-sans mt-auto">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
