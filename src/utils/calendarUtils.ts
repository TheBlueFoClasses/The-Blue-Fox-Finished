import { ArtClass } from '../types';
import { CLASSES_DATA } from '../data';

export interface ScheduledClass extends ArtClass {
  dateString: string; // "2026-07-14"
  exactDate: Date;
  slotsRemaining: number;
}

// Generate recurring classes for a given year (e.g., 2026)
export function getScheduledClassesForYear(year: number): ScheduledClass[] {
  const scheduled: ScheduledClass[] = [];
  
  // Deterministic seed helper for pseudo-random seats remaining
  const getSeedSlots = (day: number, month: number, price: number) => {
    const sum = day + month + price;
    return (sum % 5) + 3; // range 3 - 7
  };

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, ... 6 = Saturday
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      CLASSES_DATA.forEach((cl) => {
        let matches = false;
        
        const isOkeeffePetuniasNov = dateString === `${year}-11-06` || dateString === `${year}-11-13`;
        const isOkeeffeSquashSept = dateString === `${year}-09-17` || dateString === `${year}-09-24`;
        const isMonetPoplarsOct = dateString === `${year}-10-22` || dateString === `${year}-10-29`;
        const isHarvestMoonNov2 = dateString === `${year}-11-02`;
        const isHarvestMoonNov9 = dateString === `${year}-11-09`;
        const isDuckHuntNov17 = dateString === `${year}-11-17`;
        const isPokemonNov7 = dateString === `${year}-11-07`;
        const isBarnQuiltNov16 = dateString === `${year}-11-16`;
        const isBarnQuiltNov20 = dateString === `${year}-11-20`;
        const isComicBookNov21 = dateString === `${year}-11-21`;
        const isVanGoghOliveGroveNov = dateString === `${year}-11-05` || dateString === `${year}-11-12`;
        const isChrysanthemumNov19 = dateString === `${year}-11-19`;
        const isIntroToDrawingWed = 
          dateString === `${year}-11-04` || 
          dateString === `${year}-11-11` || 
          dateString === `${year}-11-18` || 
          dateString === `${year}-12-02` || 
          dateString === `${year}-12-09` || 
          dateString === `${year}-12-16`;

        // Match base classes with specific days of the week
        if (cl.dateLabel === 'Every Tuesday' && dayOfWeek === 2) matches = true;
        else if (cl.dateLabel === 'Every Saturday' && dayOfWeek === 6) matches = true;
        else if (cl.dateLabel === 'Every Thursday' && dayOfWeek === 4) matches = true;
        else if (cl.dateLabel === 'Every Wednesday' && dayOfWeek === 3) matches = true;
        else if (cl.dateLabel === 'Every Sunday' && dayOfWeek === 0) matches = true;
        else if ((dateString === `${year}-10-09` || dateString === `${year}-10-23` || dateString === `${year}-10-30` || isOkeeffePetuniasNov || isOkeeffeSquashSept || isMonetPoplarsOct || isHarvestMoonNov2 || isHarvestMoonNov9 || isDuckHuntNov17 || isPokemonNov7 || isBarnQuiltNov16 || isBarnQuiltNov20 || isComicBookNov21 || isVanGoghOliveGroveNov || isChrysanthemumNov19 || isIntroToDrawingWed) && cl.id === 'class-2') matches = true;

        if (matches) {
          const formattedDateLabel = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });

          const slots = getSeedSlots(day, month, cl.price);

          const isBarnQuiltAug1 = cl.title === 'Barn Quilt Painting' && dateString === `${year}-08-01`;
          const isSunflowerSept30 = dateString === `${year}-09-30`;
          const isMaryBlairOct3 = dateString === `${year}-10-03`;
          const isGoldenFallOct9 = dateString === `${year}-10-09`;
          const isAnimationOct10 = dateString === `${year}-10-10`;
          const isBarnQuiltOct14 = dateString === `${year}-10-14`;
          const isComicBookOct24 = dateString === `${year}-10-24`;
          const isSnowyOwlOct = dateString === `${year}-10-23` || dateString === `${year}-10-30`;
          const isColoredPencilSeries = dateString === `${year}-10-28` || dateString === `${year}-11-04` || dateString === `${year}-11-11` || dateString === `${year}-11-18`;
          const isWingsOfFireNov14 = dateString === `${year}-11-14`;
          const isBarnQuiltNovExcluded = dateString === `${year}-11-28`;
          const isBarnQuiltDecExcluded = 
            (cl.title.includes('Barn Quilt') || cl.id === 'class-2') && 
            (dateString === `${year}-12-05` || dateString === `${year}-12-12` || dateString === `${year}-12-19` || dateString === `${year}-12-26`);

          // Exclude Barn Quilt Painting on November 28th and December Saturdays (Dec 5, 12, 19, 26)
          if (isBarnQuiltNovExcluded || isBarnQuiltDecExcluded) {
            return;
          }

          // Exclude deleted classes
          if (cl.title === 'Carefree Acrylic Meadow Canvas' || cl.title === 'Mixed Media Nature Collages' || cl.title === 'Morning Forest Watercolor' || cl.title === 'Warm Sunset Reflections Workshop' || cl.title === 'Kids Creative Fingerprint Trees' || cl.title === 'Kids Creative Fingerpainting Trees') {
            return;
          }

          // On October 3rd, 10th & 24th, and November 7th, 14th & 21st, only retain one class instance
          if ((isMaryBlairOct3 || isAnimationOct10 || isComicBookOct24 || isWingsOfFireNov14 || isPokemonNov7 || isComicBookNov21) && cl.id !== 'class-2') {
            return;
          }

          // In September, delete/exclude all classes except September 17th, 24th, and 30th
          const isSeptember = month === 8;
          if (isSeptember && !isOkeeffeSquashSept && !isSunflowerSept30) {
            return;
          }

          // In October, delete/exclude all classes except October 3rd, 9th, 10th, 14th, 22nd, 23rd, 24th, 28th, 29th, and 30th
          const isOctoberAllowed = 
            isMaryBlairOct3 || 
            isGoldenFallOct9 || 
            isAnimationOct10 || 
            isBarnQuiltOct14 || 
            isMonetPoplarsOct || 
            isComicBookOct24 || 
            isSnowyOwlOct || 
            dateString === `${year}-10-28`;

          const isOctober = month === 9;
          if (isOctober && !isOctoberAllowed) {
            return;
          }

          const externalUrl = isBarnQuiltAug1 
            ? 'https://isd1.arux.app/course/677/fy-26-27/barn-quilt-painting-class' 
            : isOkeeffeSquashSept
            ? 'https://arb.umn.edu/learn/painting-okeeffe-squash'
            : isSunflowerSept30
            ? 'https://arb.umn.edu/learn/painting-sunflower'
            : isMaryBlairOct3
            ? 'https://district196.arux.app/course/48805/youth-fall-2026/art-of-mary-blair-for-disney-ages-6'
            : (isGoldenFallOct9 || isBarnQuiltOct14)
            ? 'https://arb.umn.edu/learn/painting-golden-fall'
            : isMonetPoplarsOct
            ? 'https://arb.umn.edu/learn/painting-monet-poplars'
            : isAnimationOct10
            ? 'https://osseoschools.arux.app/course/9423/youth-fall-26/animation-workshop'
            : isComicBookOct24
            ? 'https://osseoschools.arux.app/course/9424/youth-fall-26/comic-creation-workshop'
            : isSnowyOwlOct
            ? 'https://osseoschools.arux.app/course/9275/adult-fall-26/snowy-owl-acrylic-painting'
            : isOkeeffePetuniasNov
            ? 'https://osseoschools.arux.app/course/9276/adult-fall-26/georgia-o-keeffe-acrylic-painting-petunias'
            : isWingsOfFireNov14
            ? 'https://osseoschools.arux.app/course/9411/youth-fall-26/wings-of-fire-workshop'
            : isPokemonNov7
            ? 'https://district196.arux.app/course/48806/youth-fall-2026/pokemon-workshop-ages-6'
            : isComicBookNov21
            ? 'https://district196.arux.app/course/48807/youth-fall-2026/comic-creation-workshop-ages-6'
            : isBarnQuiltNov16
            ? 'https://www.whitebeararts.org/inspire-events/73086'
            : isBarnQuiltNov20
            ? 'https://www.cityblocksquiltshop.com/module/class/444427/wooden-barn-quilt-painting-workshop-112026'
            : isVanGoghOliveGroveNov
            ? 'https://arb.umn.edu/learn/painting-olive-grove'
            : isChrysanthemumNov19
            ? 'https://arb.umn.edu/learn/draw-chrysanthemums'
            : isIntroToDrawingWed
            ? 'https://arb.umn.edu/learn/intro-drawing'
            : isHarvestMoonNov2
            ? 'https://www.whitebeararts.org/inspire-events/73081'
            : isHarvestMoonNov9
            ? 'https://monticello.arux.app/course/6250/fall-2026—2/paint-with-aryn-harvest-moon'
            : isDuckHuntNov17
            ? 'https://monticello.arux.app/course/6251/fall-2026—2/paint-with-aryn-duck-hunt'
            : isColoredPencilSeries
            ? 'https://app.getoccasion.com/p/n/n6ZmrGW9/v5'
            : cl.externalUrl;

          const title = isOkeeffeSquashSept 
            ? "Georgia O'Keeffe-Inspired Squash Blossoms (2-part series)" 
            : isSunflowerSept30
            ? "Sunflower Painting Class"
            : isMaryBlairOct3
            ? "YOUTH: The Art of Mary Blair"
            : isGoldenFallOct9
            ? "Golden Fall Painting"
            : (isBarnQuiltOct14 || isBarnQuiltNov16 || isBarnQuiltNov20)
            ? "Barn Quilt Painting"
            : isMonetPoplarsOct
            ? "Monet-Inspired Poplars (2-part series)"
            : isAnimationOct10
            ? "YOUTH: Animation Workshop"
            : (isComicBookOct24 || isComicBookNov21)
            ? "YOUTH: Comic Book Workshop"
            : isSnowyOwlOct
            ? "Snowy Owl Painting (2-part series)"
            : isOkeeffePetuniasNov
            ? "Georgia O'Keeffe-Inspired Petunias (2-part series)"
            : isWingsOfFireNov14
            ? "YOUTH: Wings of Fire Workshop"
            : isPokemonNov7
            ? "YOUTH: Pokémon Workshop"
            : isVanGoghOliveGroveNov
            ? "Van Gogh-Inspired Olive Grove (2-part series)"
            : isChrysanthemumNov19
            ? "Chrysanthemum in Colored Pencil"
            : isIntroToDrawingWed
            ? "ONLINE: Intro to Drawing (6-week course)"
            : (isHarvestMoonNov2 || isHarvestMoonNov9)
            ? "Harvest Moon Acrylic Painting"
            : isDuckHuntNov17
            ? "Duck Hunt Painting"
            : isColoredPencilSeries
            ? "ONLINE Colored Pencil Drawing"
            : cl.title;

          const location = (isOkeeffeSquashSept || isSunflowerSept30 || isGoldenFallOct9 || isBarnQuiltOct14 || isMonetPoplarsOct || isVanGoghOliveGroveNov || isChrysanthemumNov19 || isIntroToDrawingWed) 
            ? "MN Landscape Arboretum" 
            : (isMaryBlairOct3 || isPokemonNov7 || isComicBookNov21)
            ? "District 196 Comm Ed"
            : (isAnimationOct10 || isComicBookOct24 || isSnowyOwlOct || isOkeeffePetuniasNov || isWingsOfFireNov14)
            ? "Osseo Comm Ed"
            : (isHarvestMoonNov2 || isBarnQuiltNov16)
            ? "White Bear Center for the Arts"
            : isBarnQuiltNov20
            ? "Quilt Shop Co-op Mpls"
            : (isHarvestMoonNov9 || isDuckHuntNov17)
            ? "Monti Comm Ed"
            : isColoredPencilSeries
            ? "Rum River Art Center"
            : cl.location;

          const subtitle = (isColoredPencilSeries || isIntroToDrawingWed) ? "6-week Course" : undefined;

          const timeLabel = (isOkeeffeSquashSept || isSunflowerSept30 || isGoldenFallOct9 || isBarnQuiltOct14) 
            ? "10:00 am - 12:30 pm" 
            : (isMonetPoplarsOct || isVanGoghOliveGroveNov || isChrysanthemumNov19)
            ? "9:30 am - 12:00 pm"
            : (isMaryBlairOct3 || isAnimationOct10 || isComicBookOct24 || isWingsOfFireNov14 || isPokemonNov7 || isComicBookNov21)
            ? "9:00 am - 12:00 pm"
            : (isSnowyOwlOct || isHarvestMoonNov2 || isHarvestMoonNov9 || isDuckHuntNov17)
            ? "6:00 pm - 8:00 pm"
            : (isOkeeffePetuniasNov || isBarnQuiltNov16 || isBarnQuiltNov20)
            ? "6:00 pm - 8:30 pm"
            : isIntroToDrawingWed
            ? "6:00 pm - 7:30 pm"
            : isColoredPencilSeries
            ? "10:00 am - 12:00 pm"
            : cl.timeLabel;

          const description = isOkeeffeSquashSept
            ? "Special session at the Minnesota Landscape Arboretum exploring Georgia O'Keeffe-inspired squash blossoms with acrylic painting."
            : isSunflowerSept30
            ? "Special session at the Minnesota Landscape Arboretum learning to paint vibrant sunflowers with acrylics through close observation of shape, texture, and color."
            : isMaryBlairOct3
            ? "Youth workshop with District 196 Community Education celebrating the whimsical, vibrant mid-century concept art and color styling of Disney legend Mary Blair."
            : isGoldenFallOct9
            ? "Special session at the Minnesota Landscape Arboretum exploring golden autumn foliage and rich forest scenery with acrylic painting."
            : isBarnQuiltOct14
            ? "Learn the beautiful heritage craft of Barn Quilt Painting at the Minnesota Landscape Arboretum. Select your geometric pattern, paint with weather-resistant exterior acrylics on a durable wooden board, and create a striking decorative piece."
            : isBarnQuiltNov16
            ? "Learn the beautiful heritage craft of Barn Quilt Painting at White Bear Center for the Arts. Select your geometric pattern, paint with weather-resistant exterior acrylics on a durable wooden board, and create a striking decorative piece."
            : isBarnQuiltNov20
            ? "Learn the beautiful heritage craft of Barn Quilt Painting at Quilt Shop Co-op Mpls. Select your geometric pattern, paint with weather-resistant exterior acrylics on a durable wooden board, and create a striking decorative piece."
            : isMonetPoplarsOct
            ? "Special session at the Minnesota Landscape Arboretum exploring Claude Monet's iconic Poplars series with acrylics, focusing on impressionistic brushwork, light, and vibrant color harmonies."
            : isAnimationOct10
            ? "Join Osseo Community Education for an exciting youth Animation Workshop! Learn fundamental animation concepts, character movement, and storytelling techniques."
            : isComicBookOct24
            ? "Join Osseo Community Education for an exciting youth Comic Book Workshop! Create dynamic characters, develop graphic storylines, and learn comic panel design."
            : isComicBookNov21
            ? "Youth art workshop with District 196 Community Education! Create dynamic comic characters, develop graphic storylines, and learn comic panel design and visual storytelling."
            : isSnowyOwlOct
            ? "Two-part acrylic painting series with Osseo Community Education. Learn step-by-step techniques to capture the majestic textures, feathery details, and serene winter ambiance of a Snowy Owl."
            : isOkeeffePetuniasNov
            ? "Acrylic painting workshop with Osseo Community Education inspired by Georgia O'Keeffe's vibrant petunias. Explore bold compositions, luminous color blending, and expressive floral forms."
            : isWingsOfFireNov14
            ? "Youth art workshop with Osseo Community Education inspired by Wings of Fire! Draw and illustrate dynamic dragons, character designs, fantasy scales, wings, and mythical worldbuilding."
            : isPokemonNov7
            ? "Youth art workshop with District 196 Community Education! Create fan-favorite Pokémon characters, draw dynamic anime-style action poses, and explore creative illustration techniques."
            : isVanGoghOliveGroveNov
            ? "Special session at the Minnesota Landscape Arboretum exploring Vincent van Gogh's expressive Olive Grove landscapes with acrylic painting, focusing on dynamic brushwork, vibrant color rhythms, and natural forms."
            : isChrysanthemumNov19
            ? "Special session at the Minnesota Landscape Arboretum exploring delicate botanical details, vibrant color blending, and layering techniques with colored pencils to draw graceful Chrysanthemums."
            : isIntroToDrawingWed
            ? "ONLINE 6-week course with the Minnesota Landscape Arboretum. Explore foundational drawing techniques, contour lines, shading, perspective, and composition from the comfort of home."
            : isHarvestMoonNov2
            ? "Acrylic painting workshop at White Bear Center for the Arts. Paint a glowing Harvest Moon landscape using rich blending techniques and layered atmospheric acrylics."
            : isHarvestMoonNov9
            ? "Acrylic painting workshop with Monticello Community Education. Paint a glowing Harvest Moon landscape using rich blending techniques and layered atmospheric acrylics."
            : isDuckHuntNov17
            ? "Acrylic painting workshop with Monticello Community Education. Paint a classic Duck Hunt scene featuring dynamic wildlife details, water reflections, and natural landscapes in acrylics."
            : isColoredPencilSeries
            ? "ONLINE 6-week Course with Rum River Art Center. Dive into colored pencil techniques, color blending, burnishing, and textured realism from the comfort of home."
            : cl.description;

          const medium = (isSunflowerSept30 || isGoldenFallOct9 || isBarnQuiltOct14 || isMonetPoplarsOct || isSnowyOwlOct || isOkeeffePetuniasNov || isHarvestMoonNov2 || isHarvestMoonNov9 || isDuckHuntNov17 || isBarnQuiltNov16 || isBarnQuiltNov20 || isVanGoghOliveGroveNov) 
            ? 'painting' 
            : (isMaryBlairOct3 || isAnimationOct10 || isComicBookOct24 || isColoredPencilSeries || isWingsOfFireNov14 || isPokemonNov7 || isComicBookNov21 || isChrysanthemumNov19 || isIntroToDrawingWed)
            ? 'mixed-media'
            : cl.medium;
          const mediumLabel = (isSunflowerSept30 || isGoldenFallOct9 || isMonetPoplarsOct || isOkeeffePetuniasNov || isHarvestMoonNov2 || isHarvestMoonNov9 || isDuckHuntNov17 || isVanGoghOliveGroveNov)
            ? 'Acrylics' 
            : (isBarnQuiltOct14 || isBarnQuiltNov16 || isBarnQuiltNov20)
            ? 'Barn Quilt Painting'
            : isMaryBlairOct3
            ? 'Mary Blair Workshop'
            : isAnimationOct10
            ? 'Animation Workshop'
            : (isComicBookOct24 || isComicBookNov21)
            ? 'Comic Workshop'
            : isWingsOfFireNov14
            ? 'Wings of Fire Workshop'
            : isPokemonNov7
            ? 'Pokémon Workshop'
            : isSnowyOwlOct
            ? 'Acrylics'
            : (isColoredPencilSeries || isChrysanthemumNov19)
            ? 'Colored Pencil'
            : isIntroToDrawingWed
            ? 'Drawing'
            : cl.mediumLabel;
          const isYouthClass = title.startsWith('YOUTH') || title.includes('YOUTH') || isMaryBlairOct3 || isAnimationOct10 || isComicBookOct24 || isWingsOfFireNov14 || isPokemonNov7 || isComicBookNov21;
          const isOnlineClass = title.startsWith('ONLINE') || isIntroToDrawingWed;
          const isColoredPencilClass = title.includes('Colored Pencil') || isChrysanthemumNov19;
          const isBarnQuiltClass = (title.includes('Barn Quilt') || isBarnQuiltOct14 || isBarnQuiltNov16 || isBarnQuiltNov20 || isBarnQuiltAug1 || title === 'Barn Quilt Painting') && !isYouthClass;

          // Color coding rules following The Blue Fox color story:
          // 1. YOUTH classes: The Blue Fox Yellow (mango) with Navy font (oiler-navy)
          // 2. ONLINE classes: Light Blue with navy font (The Blue Fox ocean-water & oiler-navy)
          // 3. Colored Pencil classes: The Blue Fox Royal Blue with white text (The Blue Fox brilliant-blue & white)
          // 4. Barn Quilt Painting classes: Sunset Orange with white text (The Blue Fox sunset-orange & white)
          // 5. Painting classes: Oiler Navy with white text (The Blue Fox oiler-navy & white)
          const dotsColor = isYouthClass
            ? 'bg-mango text-oiler-navy'
            : isOnlineClass
            ? 'bg-ocean-water text-oiler-navy'
            : isColoredPencilClass
            ? 'bg-brilliant-blue text-white'
            : isBarnQuiltClass
            ? 'bg-sunset-orange text-white'
            : 'bg-oiler-navy text-white';
          const ageGroup = (isSunflowerSept30 || isGoldenFallOct9 || isBarnQuiltOct14 || isMonetPoplarsOct || isSnowyOwlOct || isColoredPencilSeries || isOkeeffePetuniasNov || isHarvestMoonNov2 || isHarvestMoonNov9 || isDuckHuntNov17 || isBarnQuiltNov16 || isBarnQuiltNov20 || isVanGoghOliveGroveNov || isChrysanthemumNov19 || isIntroToDrawingWed) 
            ? 'adults' 
            : (isMaryBlairOct3 || isAnimationOct10 || isComicBookOct24 || isWingsOfFireNov14 || isPokemonNov7 || isComicBookNov21)
            ? 'kids-family'
            : cl.ageGroup;
          const ageLabel = (isSunflowerSept30 || isGoldenFallOct9 || isMonetPoplarsOct || isHarvestMoonNov2 || isHarvestMoonNov9 || isDuckHuntNov17 || isVanGoghOliveGroveNov || isChrysanthemumNov19 || isIntroToDrawingWed)
            ? 'Adults & All Levels' 
            : (isBarnQuiltOct14 || isSnowyOwlOct || isOkeeffePetuniasNov || isBarnQuiltNov16 || isBarnQuiltNov20)
            ? 'Adults (Ages 18+)'
            : (isMaryBlairOct3 || isPokemonNov7 || isComicBookNov21)
            ? 'Youth (Ages 6+)'
            : (isAnimationOct10 || isComicBookOct24 || isWingsOfFireNov14)
            ? 'Youth & Teens'
            : isColoredPencilSeries
            ? 'Adults & All Levels'
            : cl.ageLabel;

          scheduled.push({
            ...cl,
            title,
            location,
            subtitle,
            timeLabel,
            description,
            medium,
            mediumLabel,
            dotsColor,
            ageGroup,
            ageLabel,
            id: `${cl.id}-${dateString}`, // Unique ID for specific instance
            dateLabel: formattedDateLabel,
            dateString,
            exactDate: date,
            slotsRemaining: Math.min(slots, cl.capacity),
            externalUrl
          });
        }
      });
    }
  }

  // Monti Comm Ed: Pinewood - Nov 2nd, 9th, 16th
  const pinewoodDays = [2, 9, 16];
  pinewoodDays.forEach((dayNum) => {
    const dStr = `${year}-11-${String(dayNum).padStart(2, '0')}`;
    const dObj = new Date(year, 10, dayNum, 14, 20);
    scheduled.push({
      id: `youth-endangered-pinewood-${dStr}`,
      title: 'YOUTH: Endangered Animals Art & Music Camp',
      instructor: 'Aryn Lill',
      ageGroup: 'kids-family',
      ageLabel: 'Youth (Grades 1-5)',
      medium: 'mixed-media',
      mediumLabel: 'Art & Music Camp',
      timeLabel: '2:20 pm - 4:00 pm',
      dateLabel: dObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      price: 35,
      capacity: 15,
      dotsColor: 'bg-mango text-oiler-navy',
      description: 'Join Monticello Community Education at Pinewood for the Endangered Animals Art & Music Camp! Explore creative art projects celebrating endangered wildlife alongside engaging music activities for grades 1-5.',
      location: 'Monti Comm Ed: Pinewood',
      dateString: dStr,
      exactDate: dObj,
      slotsRemaining: 6,
      externalUrl: 'https://monticello.arux.app/course/6155/fall-2026—2/endangered-animals-art-music-camp-grades-1-5'
    });
  });

  // Monti Comm Ed: Little Mtn - Nov 4th, 11th, 18th
  const littleMtnDays = [4, 11, 18];
  littleMtnDays.forEach((dayNum) => {
    const dStr = `${year}-11-${String(dayNum).padStart(2, '0')}`;
    const dObj = new Date(year, 10, dayNum, 14, 20);
    scheduled.push({
      id: `youth-endangered-littlemtn-${dStr}`,
      title: 'YOUTH: Endangered Animals Art & Music Camp',
      instructor: 'Aryn Lill',
      ageGroup: 'kids-family',
      ageLabel: 'Youth (Grades 1-5)',
      medium: 'mixed-media',
      mediumLabel: 'Art & Music Camp',
      timeLabel: '2:20 pm - 4:00 pm',
      dateLabel: dObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      price: 35,
      capacity: 15,
      dotsColor: 'bg-mango text-oiler-navy',
      description: 'Join Monticello Community Education at Little Mtn for the Endangered Animals Art & Music Camp! Explore creative art projects celebrating endangered wildlife alongside engaging music activities for grades 1-5.',
      location: 'Monti Comm Ed: Little Mtn',
      dateString: dStr,
      exactDate: dObj,
      slotsRemaining: 6,
      externalUrl: 'https://monticello.arux.app/course/6155/fall-2026—2/endangered-animals-art-music-camp-grades-1-5'
    });
  });

  // MN Landscape Arboretum - Dec 2nd and 9th: Georgia O'Keeffe-Inspired Jack in the Pulpit (2-part series)
  const jackPulpitDays = [2, 9];
  jackPulpitDays.forEach((dayNum) => {
    const dStr = `${year}-12-${String(dayNum).padStart(2, '0')}`;
    const dObj = new Date(year, 11, dayNum, 10, 0);
    scheduled.push({
      id: `arb-jack-pulpit-${dStr}`,
      title: "Georgia O'Keeffe-Inspired Jack in the Pulpit (2-part series)",
      instructor: 'Aryn Lill',
      ageGroup: 'adults',
      ageLabel: 'Adults & All Levels',
      medium: 'painting',
      mediumLabel: 'Acrylics',
      timeLabel: '10:00 am - 12:30 pm',
      dateLabel: dObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      price: 55,
      capacity: 12,
      dotsColor: 'bg-oiler-navy text-white',
      description: "Special 2-part acrylic painting series at the Minnesota Landscape Arboretum exploring Georgia O'Keeffe's dramatic Jack-in-the-Pulpit series, focusing on bold organic forms, close-up composition, and rich color layering.",
      location: 'MN Landscape Arboretum',
      dateString: dStr,
      exactDate: dObj,
      slotsRemaining: 5,
      externalUrl: 'https://arb.umn.edu/learn/painting-jack-pulpit'
    });
  });

  // MN Landscape Arboretum - Dec 16th: Waxwing in Colored Pencil
  const waxwingDObj = new Date(year, 11, 16, 10, 0);
  const waxwingDStr = `${year}-12-16`;
  scheduled.push({
    id: `arb-waxwing-${waxwingDStr}`,
    title: 'Waxwing in Colored Pencil',
    instructor: 'Aryn Lill',
    ageGroup: 'adults',
    ageLabel: 'Adults & All Levels',
    medium: 'mixed-media',
    mediumLabel: 'Colored Pencil',
    timeLabel: '10:00 am - 12:30 pm',
    dateLabel: waxwingDObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    price: 45,
    capacity: 12,
    dotsColor: 'bg-brilliant-blue text-white',
    description: 'Special colored pencil workshop at the Minnesota Landscape Arboretum capturing the soft feather textures, subtle color gradations, and delicate berry details of a Cedar Waxwing.',
    location: 'MN Landscape Arboretum',
    dateString: waxwingDStr,
    exactDate: waxwingDObj,
    slotsRemaining: 5,
    externalUrl: 'https://arb.umn.edu/learn/draw-waxwing'
  });

  // Monti Comm Ed - Dec 7th: Georgia O'Keeffe-Inspired Red Canna
  const redCannaDObj = new Date(year, 11, 7, 18, 0);
  const redCannaDStr = `${year}-12-07`;
  scheduled.push({
    id: `monti-red-canna-${redCannaDStr}`,
    title: "Georgia O'Keeffe-Inspired Red Canna",
    instructor: 'Aryn Lill',
    ageGroup: 'adults',
    ageLabel: 'Adults & All Levels',
    medium: 'painting',
    mediumLabel: 'Acrylics',
    timeLabel: '6:00 pm - 8:30 pm',
    dateLabel: redCannaDObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    price: 38,
    capacity: 15,
    dotsColor: 'bg-oiler-navy text-white',
    description: "Join Monticello Community Education for an expressive acrylic painting workshop inspired by Georgia O'Keeffe's radiant Red Canna, focusing on enlarged floral perspectives, luminous warm palettes, and bold blended brushwork.",
    location: 'Monti Comm Ed',
    dateString: redCannaDStr,
    exactDate: redCannaDObj,
    slotsRemaining: 6,
    externalUrl: 'https://monticello.arux.app/course/6252/fall-2026—2/paint-with-aryn-georgia-o-keeffe-inspired-red-canna'
  });

  // Monti Comm Ed - Dec 14th: Minnehaha Falls Acrylic Painting
  const minnehahaDObj = new Date(year, 11, 14, 18, 0);
  const minnehahaDStr = `${year}-12-14`;
  scheduled.push({
    id: `monti-minnehaha-${minnehahaDStr}`,
    title: 'Minnehaha Falls Acrylic Painting',
    instructor: 'Aryn Lill',
    ageGroup: 'adults',
    ageLabel: 'Adults & All Levels',
    medium: 'painting',
    mediumLabel: 'Acrylics',
    timeLabel: '6:00 pm - 8:00 pm',
    dateLabel: minnehahaDObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    price: 38,
    capacity: 15,
    dotsColor: 'bg-oiler-navy text-white',
    description: 'Join Monticello Community Education for an inspiring evening of acrylic painting capturing the iconic rushing waters, limestone bluffs, and dramatic natural scenery of Minnehaha Falls.',
    location: 'Monti Comm Ed',
    dateString: minnehahaDStr,
    exactDate: minnehahaDObj,
    slotsRemaining: 6,
    externalUrl: 'https://monticello.arux.app/course/6253/fall-2026—2/paint-with-aryn-minnehaha-falls'
  });

  // White Bear Center for the Arts - Dec 3rd: Georgia O'Keeffe-Inspired Red Canna
  const wbcaRedCannaDObj = new Date(year, 11, 3, 18, 0);
  const wbcaRedCannaDStr = `${year}-12-03`;
  scheduled.push({
    id: `wbca-red-canna-${wbcaRedCannaDStr}`,
    title: "Georgia O'Keeffe-Inspired Red Canna",
    instructor: 'Aryn Lill',
    ageGroup: 'adults',
    ageLabel: 'Adults (Ages 18+)',
    medium: 'painting',
    mediumLabel: 'Acrylics',
    timeLabel: '6:00 pm - 8:30 pm',
    dateLabel: wbcaRedCannaDObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    price: 48,
    capacity: 15,
    dotsColor: 'bg-oiler-navy text-white',
    description: "Join White Bear Center for the Arts for an expressive acrylic painting workshop inspired by Georgia O'Keeffe's radiant Red Canna, focusing on enlarged floral perspectives, luminous warm palettes, and bold blended brushwork.",
    location: 'White Bear Center for the Arts',
    dateString: wbcaRedCannaDStr,
    exactDate: wbcaRedCannaDObj,
    slotsRemaining: 6,
    externalUrl: 'https://www.whitebeararts.org/inspire-events/73091'
  });

  // White Bear Center for the Arts - Dec 10th: Snowy Pine Painting
  const wbcaSnowyPineDObj = new Date(year, 11, 10, 18, 0);
  const wbcaSnowyPineDStr = `${year}-12-10`;
  scheduled.push({
    id: `wbca-snowy-pine-${wbcaSnowyPineDStr}`,
    title: 'Snowy Pine Painting',
    instructor: 'Aryn Lill',
    ageGroup: 'adults',
    ageLabel: 'Adults (Ages 18+)',
    medium: 'painting',
    mediumLabel: 'Acrylics',
    timeLabel: '6:00 pm - 8:00 pm',
    dateLabel: wbcaSnowyPineDObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    price: 45,
    capacity: 15,
    dotsColor: 'bg-oiler-navy text-white',
    description: 'Join White Bear Center for the Arts for a peaceful winter acrylic painting evening. Paint a serene snowy pine landscape step-by-step, exploring texture, contrast, and tranquil winter tones.',
    location: 'White Bear Center for the Arts',
    dateString: wbcaSnowyPineDStr,
    exactDate: wbcaSnowyPineDObj,
    slotsRemaining: 6,
    externalUrl: 'https://www.whitebeararts.org/inspire-events/73096'
  });

  // White Bear Center for the Arts - Dec 17th: Stargazers: Snoopy Painting
  const wbcaSnoopyDObj = new Date(year, 11, 17, 18, 0);
  const wbcaSnoopyDStr = `${year}-12-17`;
  scheduled.push({
    id: `wbca-snoopy-${wbcaSnoopyDStr}`,
    title: 'Stargazers: Snoopy Painting',
    instructor: 'Aryn Lill',
    ageGroup: 'adults',
    ageLabel: 'Adults (Ages 18+)',
    medium: 'painting',
    mediumLabel: 'Acrylics',
    timeLabel: '6:00 pm - 8:00 pm',
    dateLabel: wbcaSnoopyDObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    price: 45,
    capacity: 15,
    dotsColor: 'bg-oiler-navy text-white',
    description: 'Join White Bear Center for the Arts for a whimsical evening of acrylic painting featuring Snoopy stargazing under a glowing night sky, exploring starry skies, silhouette work, and playful storytelling.',
    location: 'White Bear Center for the Arts',
    dateString: wbcaSnoopyDStr,
    exactDate: wbcaSnoopyDObj,
    slotsRemaining: 6,
    externalUrl: 'https://www.whitebeararts.org/inspire-events/73101'
  });

  // District 196 Comm Ed - Dec 12th: YOUTH: Wing of Fire Workshop
  const dist196WingsDObj = new Date(year, 11, 12, 9, 0);
  const dist196WingsDStr = `${year}-12-12`;
  scheduled.push({
    id: `dist196-wings-of-fire-${dist196WingsDStr}`,
    title: 'YOUTH: Wing of Fire Workshop',
    instructor: 'Aryn Lill',
    ageGroup: 'kids-family',
    ageLabel: 'Youth (Ages 9+)',
    medium: 'mixed-media',
    mediumLabel: 'Wings of Fire Workshop',
    timeLabel: '9:00 am - 12:00 pm',
    dateLabel: dist196WingsDObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    price: 39,
    capacity: 12,
    dotsColor: 'bg-mango text-oiler-navy',
    description: 'Youth art workshop with District 196 Community Education inspired by Wings of Fire! Draw and illustrate dynamic dragons, character designs, fantasy scales, wings, and mythical worldbuilding.',
    location: 'District 196 Comm Ed',
    dateString: dist196WingsDStr,
    exactDate: dist196WingsDObj,
    slotsRemaining: 5,
    externalUrl: 'https://district196.arux.app/course/48808/youth-fall-2026/wings-of-fire-workshop-ages-9'
  });

  // Osseo Comm Ed - Dec 4th & 11th: Van Gogh-Inspired Cypress and Star (2-part series)
  const vanGoghDecDays = [4, 11];
  vanGoghDecDays.forEach((dayNum) => {
    const dStr = `${year}-12-${String(dayNum).padStart(2, '0')}`;
    const dObj = new Date(year, 11, dayNum, 18, 0);
    scheduled.push({
      id: `osseo-vangogh-cypress-${dStr}`,
      title: 'Van Gogh-Inspired Cypress and Star (2-part series)',
      instructor: 'Aryn Lill',
      ageGroup: 'adults',
      ageLabel: 'Adults & All Levels',
      medium: 'painting',
      mediumLabel: 'Acrylics',
      timeLabel: '6:00 pm - 8:30 pm',
      dateLabel: dObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      price: 55,
      capacity: 15,
      dotsColor: 'bg-oiler-navy text-white',
      description: "Two-part acrylic painting series with Osseo Community Education inspired by Vincent van Gogh's Road with Cypress and Star. Explore swirling impasto brushstrokes, vibrant night skies, and expressive color harmony.",
      location: 'Osseo Comm Ed',
      dateString: dStr,
      exactDate: dObj,
      slotsRemaining: 6,
      externalUrl: 'https://osseoschools.arux.app/course/9277/adult-fall-26/vincent-van-gogh-acrylic-painting-cypress-and-star'
    });
  });

  // Osseo Comm Ed - Dec 5th: YOUTH: Paint Your Pet
  const petDObj = new Date(year, 11, 5, 9, 0);
  const petDStr = `${year}-12-05`;
  scheduled.push({
    id: `osseo-paint-your-pet-${petDStr}`,
    title: 'YOUTH: Paint Your Pet',
    instructor: 'Aryn Lill',
    ageGroup: 'kids-family',
    ageLabel: 'Youth (Ages 6+)',
    medium: 'painting',
    mediumLabel: 'Paint Your Pet',
    timeLabel: '9:00 am - 12:00 pm',
    dateLabel: petDObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    price: 39,
    capacity: 12,
    dotsColor: 'bg-mango text-oiler-navy',
    description: 'Youth art workshop with Osseo Community Education! Kids paint a custom portrait of their beloved pet or favorite animal on canvas with guided step-by-step acrylic painting techniques.',
    location: 'Osseo Comm Ed',
    dateString: petDStr,
    exactDate: petDObj,
    slotsRemaining: 5,
    externalUrl: 'https://osseoschools.arux.app/course/9425/youth-fall-26/paint-your-pet-workshop'
  });

  // Osseo Comm Ed - Dec 19th: YOUTH: Art of Mary Blair
  const maryBlairDecDObj = new Date(year, 11, 19, 9, 0);
  const maryBlairDecDStr = `${year}-12-19`;
  scheduled.push({
    id: `osseo-mary-blair-${maryBlairDecDStr}`,
    title: 'YOUTH: Art of Mary Blair',
    instructor: 'Aryn Lill',
    ageGroup: 'kids-family',
    ageLabel: 'Youth (Ages 6+)',
    medium: 'mixed-media',
    mediumLabel: 'Art of Mary Blair',
    timeLabel: '9:00 am - 12:00 pm',
    dateLabel: maryBlairDecDObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    price: 39,
    capacity: 12,
    dotsColor: 'bg-mango text-oiler-navy',
    description: 'Youth art workshop with Osseo Community Education celebrating Disney legend Mary Blair! Explore her iconic whimsical mid-century concept art, playful shapes, and vibrant color palettes.',
    location: 'Osseo Comm Ed',
    dateString: maryBlairDecDStr,
    exactDate: maryBlairDecDObj,
    slotsRemaining: 5,
    externalUrl: 'https://osseoschools.arux.app/course/9426/youth-fall-26/art-of-mary-blair-for-disney-workshop'
  });

  // Sort chronologically by date and time
  return scheduled.sort((a, b) => {
    if (a.dateString !== b.dateString) {
      return a.dateString.localeCompare(b.dateString);
    }
    return a.timeLabel.localeCompare(b.timeLabel);
  });
}
