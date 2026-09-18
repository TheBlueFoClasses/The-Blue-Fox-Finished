import { useState, useMemo } from 'react';
import { Search, Users, Clock, AlertCircle, ChevronLeft, ChevronRight, LayoutGrid, CalendarDays, X } from 'lucide-react';
import { ArtClass } from '../types';
import { getScheduledClassesForYear, ScheduledClass } from '../utils/calendarUtils';

interface CalendarSectionProps {
  onClassSelect: (artClass: ArtClass) => void;
  onViewClassDetails: (scheduledClass: ScheduledClass) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarSection({ onClassSelect, onViewClassDetails }: CalendarSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAge, setSelectedAge] = useState<'all' | 'kids-family' | 'adults'>('all');
  const [selectedMedium, setSelectedMedium] = useState<string>('all');
  const [deletedClassIds, setDeletedClassIds] = useState<string[]>([]);
  
  const handleDeleteClassInstance = (id: string) => {
    setDeletedClassIds((prev) => [...prev, id]);
  };
  
  // Annual calendar states
  const year = 2026;
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); // default to current month (July for local time 2026-07-14)
  const [activeTab, setActiveTab] = useState<'monthly' | 'annual'>('monthly');

  // Load chronological scheduled classes for the year 2026
  const scheduledClasses = useMemo(() => {
    return getScheduledClassesForYear(year);
  }, []);

  // Derive unique mediums for filter dropdown
  const mediumsList = useMemo(() => {
    const list = new Set(scheduledClasses.map((c) => c.medium));
    return Array.from(list);
  }, [scheduledClasses]);

  // Filter scheduled classes based on filters
  const filteredClasses = useMemo(() => {
    return scheduledClasses.filter((c) => {
      if (deletedClassIds.includes(c.id)) return false;
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (c.location ? c.location.toLowerCase().includes(searchQuery.toLowerCase()) : false);
      const matchesAge = selectedAge === 'all' || c.ageGroup === selectedAge || (c.ageGroup === 'all');
      const matchesMedium = selectedMedium === 'all' || c.medium === selectedMedium;
      return matchesSearch && matchesAge && matchesMedium;
    });
  }, [scheduledClasses, searchQuery, selectedAge, selectedMedium, deletedClassIds]);

  // Group classes by dateString for calendar rendering
  const classesByDate = useMemo(() => {
    const map: Record<string, ScheduledClass[]> = {};
    filteredClasses.forEach((c) => {
      if (!map[c.dateString]) {
        map[c.dateString] = [];
      }
      map[c.dateString].push(c);
    });
    return map;
  }, [filteredClasses]);

  // Generate day items for the current selectedMonth monthly grid
  const gridDays = useMemo(() => {
    const firstDayIndex = new Date(year, selectedMonth, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const totalDays = new Date(year, selectedMonth + 1, 0).getDate(); // Days in selectedMonth
    
    const prevMonthIndex = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const prevMonthYear = selectedMonth === 0 ? year - 1 : year;
    const prevMonthTotalDays = new Date(prevMonthYear, prevMonthIndex + 1, 0).getDate();

    const days = [];

    // Pad start with previous month's ending days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dNum = prevMonthTotalDays - i;
      const mNum = prevMonthIndex + 1;
      const yNum = prevMonthYear;
      const dateString = `${yNum}-${String(mNum).padStart(2, '0')}-${String(dNum).padStart(2, '0')}`;
      days.push({
        dayNumber: dNum,
        isCurrentMonth: false,
        dateString,
      });
    }

    // Add current month days
    for (let i = 1; i <= totalDays; i++) {
      const dateString = `${year}-${String(selectedMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNumber: i,
        isCurrentMonth: true,
        dateString,
      });
    }

    // Pad end with next month's starting days only to complete the final week row (avoids extra transparent row below the month)
    const targetLength = Math.ceil(days.length / 7) * 7;
    const remaining = targetLength - days.length;
    const nextMonthIndex = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const nextMonthYear = selectedMonth === 11 ? year + 1 : year;
    for (let i = 1; i <= remaining; i++) {
      const dateString = `${nextMonthYear}-${String(nextMonthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNumber: i,
        isCurrentMonth: false,
        dateString,
      });
    }

    return days;
  }, [selectedMonth, year]);

  // Handler to slide months
  const handlePrevMonth = () => {
    setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  // Mini-calendar day calculator for a specific month (used in the annual grid overview)
  const getMiniMonthDays = (monthIdx: number) => {
    const firstDayIdx = new Date(year, monthIdx, 1).getDay();
    const totalDays = new Date(year, monthIdx + 1, 0).getDate();
    const days = [];
    
    // pad start
    for (let i = 0; i < firstDayIdx; i++) {
      days.push(null);
    }
    // real days
    for (let i = 1; i <= totalDays; i++) {
      const dateString = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNumber: i,
        dateString,
      });
    }
    return days;
  };

  return (
    <section id="calendar" className="py-20 lg:py-28 bg-white relative">
      {/* Wave background decoration */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-ocean-water/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="calendar-header-block">
          <h2
            id="calendar-main-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-oiler-navy tracking-tight mb-4"
          >
            The Blue Fox Calendar
          </h2>
          <div className="space-y-3 text-lg text-oiler-navy/75 font-sans max-w-3xl mx-auto leading-relaxed">
            <p>
              Our classes are offered at White Bear Center for the Arts, the University of MN Landscape Arboretum, Rum River Art Center, and Maple Grove Art Center. We also teach at a variety of Community Ed locations, including Monticello, Osseo, Apple Valley, Robinsdale, New Hope, Centennial, and more!
            </p>
            <p>
              Click on a class description to find out more and register for an upcoming class, or search the calendar by category.
            </p>
          </div>
        </div>

        {/* View mode toggle switch */}
        <div className="flex justify-center mb-10" id="calendar-view-toggle">
          <div className="bg-ocean-water/30 p-1.5 rounded-2xl border border-ocean-water/50 flex space-x-1.5 shadow-sm">
            <button
              id="view-toggle-monthly"
              onClick={() => setActiveTab('monthly')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'monthly'
                  ? 'bg-oiler-navy text-white shadow-md'
                  : 'text-oiler-navy/80 hover:text-oiler-navy hover:bg-white/50'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Monthly Planner</span>
            </button>
            <button
              id="view-toggle-annual"
              onClick={() => setActiveTab('annual')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'annual'
                  ? 'bg-oiler-navy text-white shadow-md'
                  : 'text-oiler-navy/80 hover:text-oiler-navy hover:bg-white/50'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Annual Overview</span>
            </button>
          </div>
        </div>

        {/* Search & Filters block */}
        <div
          id="calendar-filters-container"
          className="bg-ocean-water/20 p-6 sm:p-8 rounded-3xl border border-ocean-water/40 mb-10 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            
            {/* Search inputs */}
            <div className="lg:col-span-5 relative" id="search-bar-wrapper">
              <label className="block text-xs font-bold text-oiler-navy/80 uppercase tracking-widest mb-2">
                Search location by city.
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-oiler-navy/50" />
                <input
                  id="class-search-input"
                  type="text"
                  placeholder="Search city, 'barn quilt', 'drawing'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-oiler-navy placeholder-oiler-navy/50 pl-12 pr-4 py-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans text-base shadow-sm"
                />
              </div>
            </div>

            {/* Age Group selects */}
            <div className="lg:col-span-4" id="age-filter-wrapper">
              <label className="block text-xs font-bold text-oiler-navy/80 uppercase tracking-widest mb-2">
                Who is attending?
              </label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'adults', 'kids-family'] as const).map((age) => (
                  <button
                    id={`filter-age-${age}`}
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
                      selectedAge === age
                        ? 'bg-brilliant-blue text-white border-brilliant-blue shadow-sm'
                        : 'bg-white text-oiler-navy hover:bg-ocean-water border-ocean-water/50'
                    }`}
                  >
                    {age === 'all' && 'ALL AGES'}
                    {age === 'adults' && 'ADULTS'}
                    {age === 'kids-family' && 'KIDS'}
                  </button>
                ))}
              </div>
            </div>

            {/* Medium selects */}
            <div className="lg:col-span-3" id="medium-filter-wrapper">
              <label className="block text-xs font-bold text-oiler-navy/80 uppercase tracking-widest mb-2">
                Preferred Material
              </label>
              <select
                id="medium-select-dropdown"
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
                className="w-full bg-white text-oiler-navy p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans font-bold text-sm shadow-sm"
              >
                <option value="all">🖌️ All Craft Mediums</option>
                {mediumsList.map((m) => (
                  <option key={m} value={m}>
                    {m === 'watercolor' && 'Drawing'}
                    {m === 'painting' && 'Acrylic Paintings'}
                    {m === 'clay' && 'Clay & Sculpting'}
                    {m === 'mixed-media' && 'Barn Quilt Painting'}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Calendar View Area */}
        {activeTab === 'monthly' ? (
          /* Monthly Planner Calendar View */
          <div id="monthly-planner-container" className="bg-white rounded-[2.5rem] border border-ocean-water/50 overflow-hidden shadow-lg mb-16">
            
            {/* Month selector header */}
            <div className="bg-oiler-navy p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
              
              {/* Month Switcher Controls */}
              <div className="flex items-center space-x-6">
                <button
                  id="prev-month-btn"
                  onClick={handlePrevMonth}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <h3 id="current-month-label" className="text-2xl font-serif font-black tracking-tight min-w-[180px] text-center">
                  {MONTH_NAMES[selectedMonth]} {year}
                </h3>

                <button
                  id="next-month-btn"
                  onClick={handleNextMonth}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Jump Dropdown */}
              <select
                id="jump-to-month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="bg-white/10 text-white font-sans font-semibold text-xs border border-white/25 rounded-xl px-4 py-2 focus:outline-none focus:bg-white focus:text-oiler-navy cursor-pointer transition-colors"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={idx} value={idx} className="text-oiler-navy font-semibold">
                    Jump to {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Color Legend */}
            <div id="calendar-color-legend" className="bg-ocean-water/20 border-b border-ocean-water/40 px-4 py-2.5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] font-sans font-bold">
              <span className="text-oiler-navy/60 uppercase tracking-widest text-[10px]">Categories:</span>
              <div className="flex items-center space-x-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-mango text-oiler-navy shadow-xs text-[10px] font-extrabold uppercase tracking-wider">Youth</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-oiler-navy text-white shadow-xs text-[10px] font-extrabold uppercase tracking-wider">Painting</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-sunset-orange text-white shadow-xs text-[10px] font-extrabold uppercase tracking-wider">Barn Quilt Painting</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-brilliant-blue text-white shadow-xs text-[10px] font-extrabold uppercase tracking-wider">Colored Pencil</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-ocean-water text-oiler-navy border border-oiler-navy/20 shadow-xs text-[10px] font-extrabold uppercase tracking-wider">Online</span>
              </div>
            </div>

            {/* Days Column Header */}
            <div className="grid grid-cols-7 bg-ocean-water/10 border-b border-ocean-water/30 text-center py-3 text-xs font-black uppercase tracking-widest text-oiler-navy/80 font-sans">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Grid days */}
            <div className="grid grid-cols-7 border-l border-t border-ocean-water/20">
              {gridDays.map((dayItem, idx) => {
                const dayClasses = classesByDate[dayItem.dateString] || [];
                return (
                  <div
                    key={idx}
                    className={`min-h-[110px] sm:min-h-[140px] p-2 border-r border-b border-ocean-water/20 flex flex-col justify-between transition-colors ${
                      dayItem.isCurrentMonth ? 'bg-white' : 'bg-gray-50/50 opacity-40'
                    }`}
                  >
                    {/* Day number */}
                    <span className={`text-sm font-bold font-mono self-end ${
                      dayItem.isCurrentMonth ? 'text-oiler-navy/80' : 'text-oiler-navy/30'
                    }`}>
                      {dayItem.dayNumber}
                    </span>

                     {/* Classes container inside day */}
                     <div className="space-y-1.5 mt-1 flex-grow flex flex-col justify-end">
                       {dayClasses.map((cl) => (
                         <div key={cl.id} className="relative group">
                           {cl.externalUrl ? (
                             <a
                               id={`cal-item-${cl.id}`}
                               href={cl.externalUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className={`w-full text-left p-1.5 rounded-lg text-[10px] font-sans font-bold leading-tight transition-all transform hover:scale-102 hover:-translate-y-0.5 shadow-sm flex flex-col border border-black/5 hover:shadow-md cursor-pointer ${cl.dotsColor}`}
                             >
                               <span className="font-extrabold line-clamp-2 leading-snug">{cl.title}</span>
                               {cl.location && (
                                 <span className="text-[9px] font-medium opacity-90 line-clamp-1 mt-0.5">
                                   {cl.location}
                                 </span>
                               )}
                               {cl.subtitle && (
                                 <span className="text-[9px] font-medium opacity-90 line-clamp-1 mt-0.5">
                                   {cl.subtitle}
                                 </span>
                               )}
                               <span className="opacity-80 font-mono text-[9px] mt-0.5">{cl.timeLabel}</span>
                             </a>
                           ) : (
                             <button
                               id={`cal-item-${cl.id}`}
                               onClick={() => onViewClassDetails(cl)}
                               className={`w-full text-left p-1.5 rounded-lg text-[10px] font-sans font-bold leading-tight transition-all transform hover:scale-102 hover:-translate-y-0.5 shadow-sm flex flex-col border border-black/5 hover:shadow-md cursor-pointer ${cl.dotsColor}`}
                             >
                               <span className="font-extrabold line-clamp-2 leading-snug">{cl.title}</span>
                               {cl.location && (
                                 <span className="text-[9px] font-medium opacity-90 line-clamp-1 mt-0.5">
                                   {cl.location}
                                 </span>
                               )}
                               {cl.subtitle && (
                                 <span className="text-[9px] font-medium opacity-90 line-clamp-1 mt-0.5">
                                   {cl.subtitle}
                                 </span>
                               )}
                               <span className="opacity-80 font-mono text-[9px] mt-0.5">{cl.timeLabel}</span>
                             </button>
                           )}
                           
                           <button
                             id={`delete-btn-${cl.id}`}
                             onClick={(e) => {
                               e.stopPropagation();
                               handleDeleteClassInstance(cl.id);
                             }}
                             className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 cursor-pointer"
                             title="Delete event"
                           >
                             <X className="w-2 h-2" />
                           </button>
                         </div>
                       ))}
                     </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          /* Annual 12-Month Calendar Overview Grid */
          <div id="annual-overview-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 animate-fade-in">
            {MONTH_NAMES.map((monthName, mIdx) => {
              const miniDays = getMiniMonthDays(mIdx);
              
              // Count number of classes in this month
              const countClasses = scheduledClasses.filter(sc => {
                const parts = sc.dateString.split('-');
                return Number(parts[1]) === mIdx + 1;
              }).length;

              return (
                <div
                  key={mIdx}
                  id={`annual-month-card-${mIdx}`}
                  className={`bg-white rounded-3xl p-5 border shadow-sm hover:shadow-md transition-all duration-300 ${
                    selectedMonth === mIdx
                      ? 'border-sunset-orange ring-2 ring-sunset-orange/25'
                      : 'border-ocean-water/40'
                  }`}
                >
                  {/* Mini Month title and select control */}
                  <div className="flex items-center justify-between border-b border-ocean-water/20 pb-3 mb-3">
                    <button
                      onClick={() => {
                        setSelectedMonth(mIdx);
                        setActiveTab('monthly');
                      }}
                      className="font-serif font-black text-lg text-oiler-navy hover:text-sunset-orange text-left hover:underline cursor-pointer"
                    >
                      {monthName}
                    </button>
                    {countClasses > 0 && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-ocean-water text-oiler-navy px-2 py-1 rounded-full border border-ocean-water/50">
                        {countClasses} Classes
                      </span>
                    )}
                  </div>

                  {/* Week days mini header */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-oiler-navy/40 font-sans uppercase mb-1.5">
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                  </div>

                  {/* Mini Days Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {miniDays.map((day, dIdx) => {
                      if (!day) return <div key={dIdx}></div>;

                      // Check if day has class
                      const classesOnDay = classesByDate[day.dateString] || [];
                      const hasClass = classesOnDay.length > 0;

                      return (
                        <button
                          key={dIdx}
                          id={`mini-${mIdx}-day-${day.dayNumber}`}
                          onClick={() => {
                            setSelectedMonth(mIdx);
                            setActiveTab('monthly');
                          }}
                          className={`aspect-square rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                            hasClass
                              ? 'bg-sunset-orange text-white ring-2 ring-sunset-orange/20 scale-110 shadow-sm font-black'
                              : 'text-oiler-navy/70 hover:bg-ocean-water/30'
                          }`}
                        >
                          {day.dayNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* End of calendar view containers */}
      </div>
    </section>
  );
}
