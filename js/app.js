/**
 * The Blue Fox - Fine Art Classes
 * Pure JavaScript Application Controller
 * Fully compatible with GitHub Pages static hosting
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  initHeader();
  initCalendar();
  initPortfolio();
  initBarnQuilts();
  initStudentMasterpieces();
  initModals();
  initLeadForm();
  initRouter();

  // Re-run icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// -------------------------------------------------------------
// 1. Header & Navigation
// -------------------------------------------------------------
function initHeader() {
  const header = document.getElementById('main-nav-container');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('bg-white', 'shadow-md', 'py-2', 'border-b', 'border-[#c4e7e5]/30');
      header.classList.remove('bg-white/90', 'backdrop-blur-md', 'py-4');
    } else {
      header.classList.remove('bg-white', 'shadow-md', 'py-2', 'border-b', 'border-[#c4e7e5]/30');
      header.classList.add('bg-white/90', 'backdrop-blur-md', 'py-4');
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenuDrawer.classList.contains('hidden');
      if (isHidden) {
        mobileMenuDrawer.classList.remove('hidden');
      } else {
        mobileMenuDrawer.classList.add('hidden');
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
      });
    });
  }
}

// -------------------------------------------------------------
// 2. Hash-based Router for Sub-pages vs Home Page
// -------------------------------------------------------------
function initRouter() {
  const handleRoute = () => {
    const hash = window.location.hash || '#home';
    const mainContent = document.getElementById('main-page-content');
    const barnQuiltsView = document.getElementById('barn-quilt-designs-page');
    const studentMasterpiecesView = document.getElementById('student-masterpieces-page');
    const classDetailView = document.getElementById('class-detail-page');

    // Hide all special views initially
    if (barnQuiltsView) barnQuiltsView.classList.add('hidden');
    if (studentMasterpiecesView) studentMasterpiecesView.classList.add('hidden');
    if (classDetailView) classDetailView.classList.add('hidden');
    if (mainContent) mainContent.classList.remove('hidden');

    // Update active state on nav links
    document.querySelectorAll('[data-nav-link]').forEach((el) => {
      const targetHash = el.getAttribute('href');
      if (targetHash === hash || (hash.startsWith('#class-') && targetHash === '#calendar')) {
        el.classList.add('text-sunset-orange');
        el.classList.remove('text-oiler-navy');
      } else {
        el.classList.remove('text-sunset-orange');
        el.classList.add('text-oiler-navy');
      }
    });

    if (hash === '#barn-quilt-designs') {
      if (mainContent) mainContent.classList.add('hidden');
      if (barnQuiltsView) barnQuiltsView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hash === '#student-masterpieces') {
      if (mainContent) mainContent.classList.add('hidden');
      if (studentMasterpiecesView) studentMasterpiecesView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hash.startsWith('#class-')) {
      const classId = hash.replace('#', '');
      const cls = BLUE_FOX_DATA.scheduledClasses.find((c) => c.id === classId);
      if (cls && classDetailView) {
        if (mainContent) mainContent.classList.add('hidden');
        renderClassDetail(cls);
        classDetailView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Normal hash jump
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

// -------------------------------------------------------------
// 3. Calendar Controller
// -------------------------------------------------------------
const blueFoxInitialDate = new Date();
let currentMonth = blueFoxInitialDate.getMonth(); // Starts in current month according to current date
let currentYear = blueFoxInitialDate.getFullYear();
let calendarSearch = '';
let calendarAgeFilter = 'all';
let calendarMediumFilter = 'all';
let calendarMode = 'monthly'; // 'monthly' | 'annual'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function initCalendar() {
  const searchInput = document.getElementById('calendar-search-input');
  const ageFilter = document.getElementById('calendar-age-filter');
  const mediumFilter = document.getElementById('calendar-medium-filter');
  const prevBtn = document.getElementById('prev-month-btn');
  const nextBtn = document.getElementById('next-month-btn');
  const monthlyTab = document.getElementById('calendar-tab-monthly');
  const annualTab = document.getElementById('calendar-tab-annual');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      calendarSearch = e.target.value.toLowerCase();
      renderCalendar();
    });
  }

  if (ageFilter) {
    ageFilter.addEventListener('change', (e) => {
      calendarAgeFilter = e.target.value;
      renderCalendar();
    });
  }

  if (mediumFilter) {
    mediumFilter.addEventListener('change', (e) => {
      calendarMediumFilter = e.target.value;
      renderCalendar();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentMonth > 0) {
        currentMonth--;
      } else {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentMonth < 11) {
        currentMonth++;
      } else {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  }

  if (monthlyTab && annualTab) {
    monthlyTab.addEventListener('click', () => {
      calendarMode = 'monthly';
      monthlyTab.className = 'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-sunset-orange text-white shadow-sm';
      annualTab.className = 'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-oiler-navy/70 hover:text-oiler-navy';
      document.getElementById('monthly-view-container').classList.remove('hidden');
      document.getElementById('annual-view-container').classList.add('hidden');
      renderCalendar();
    });

    annualTab.addEventListener('click', () => {
      calendarMode = 'annual';
      annualTab.className = 'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-sunset-orange text-white shadow-sm';
      monthlyTab.className = 'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-oiler-navy/70 hover:text-oiler-navy';
      document.getElementById('monthly-view-container').classList.add('hidden');
      document.getElementById('annual-view-container').classList.remove('hidden');
      renderAnnualCalendar();
    });
  }

  renderCalendar();
}

function getFilteredClasses() {
  return BLUE_FOX_DATA.scheduledClasses.filter((c) => {
    const matchesSearch = !calendarSearch || 
      c.title.toLowerCase().includes(calendarSearch) ||
      c.description.toLowerCase().includes(calendarSearch) ||
      (c.location && c.location.toLowerCase().includes(calendarSearch));

    const matchesAge = calendarAgeFilter === 'all' || c.ageGroup === calendarAgeFilter;
    const matchesMedium = calendarMediumFilter === 'all' || c.medium === calendarMediumFilter;

    return matchesSearch && matchesAge && matchesMedium;
  });
}

function renderCalendar() {
  const monthTitle = document.getElementById('calendar-month-title');
  const daysGrid = document.getElementById('calendar-days-grid');
  if (!monthTitle || !daysGrid) return;

  monthTitle.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

  const filtered = getFilteredClasses();
  const classesByDate = {};
  filtered.forEach((cls) => {
    if (!classesByDate[cls.dateString]) {
      classesByDate[cls.dateString] = [];
    }
    classesByDate[cls.dateString].push(cls);
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  daysGrid.innerHTML = '';

  // Blank days before first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    blank.className = 'min-h-[110px] bg-slate-50/50 p-2 border border-ocean-water/20 rounded-2xl opacity-40';
    daysGrid.appendChild(blank);
  }

  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayClasses = classesByDate[dStr] || [];

    const cell = document.createElement('div');
    cell.className = 'min-h-[125px] sm:min-h-[145px] bg-white p-2 sm:p-2.5 border border-ocean-water/40 rounded-2xl flex flex-col justify-between hover:border-sunset-orange/50 transition-colors shadow-xs';

    const header = document.createElement('div');
    header.className = 'flex items-center justify-between mb-1';
    header.innerHTML = `<span class="text-sm font-subhead font-medium ${dayClasses.length > 0 ? 'text-oiler-navy' : 'text-slate-400'}">${day}</span>`;
    cell.appendChild(header);

    const listContainer = document.createElement('div');
    listContainer.className = 'space-y-1.5 flex-1 flex flex-col justify-end';

    dayClasses.forEach((cls) => {
      const regUrl = cls.externalUrl || 'https://isd1.arux.app/course/677/fy-26-27/barn-quilt-painting-class';
      const pill = document.createElement('a');
      pill.href = regUrl;
      pill.target = '_blank';
      pill.rel = 'noopener noreferrer';
      pill.className = `text-[11px] p-2 rounded-xl cursor-pointer transition-all hover:scale-[1.02] shadow-xs flex flex-col group ${cls.dotsColor}`;
      pill.setAttribute('title', `Register directly for ${cls.title} on official registration portal`);
      pill.innerHTML = `
        <div class="flex items-start justify-between gap-1">
          <span class="font-subhead font-bold text-xs leading-snug">${cls.title}</span>
          <i data-lucide="external-link" class="w-3 h-3 opacity-75 group-hover:opacity-100 shrink-0 mt-0.5"></i>
        </div>
        <div class="text-[10px] opacity-90 mt-1 flex items-center gap-1 font-light">
          <i data-lucide="map-pin" class="w-2.5 h-2.5 shrink-0 opacity-80"></i>
          <span class="truncate">${cls.location || 'The Blue Fox Studio'}</span>
        </div>
        <div class="text-[10px] opacity-90 mt-0.5 flex items-center gap-1 font-light">
          <i data-lucide="clock" class="w-2.5 h-2.5 shrink-0 opacity-80"></i>
          <span>${cls.timeLabel}</span>
        </div>
      `;

      pill.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      listContainer.appendChild(pill);
    });

    cell.appendChild(listContainer);
    daysGrid.appendChild(cell);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderAnnualCalendar() {
  const container = document.getElementById('annual-months-container');
  if (!container) return;

  container.innerHTML = '';
  const filtered = getFilteredClasses();

  for (let m = 0; m < 12; m++) {
    const monthClasses = filtered.filter((c) => {
      const parts = c.dateString.split('-');
      return parseInt(parts[1], 10) === (m + 1);
    });

    const card = document.createElement('div');
    card.className = 'bg-white p-5 rounded-3xl border border-ocean-water/40 shadow-xs flex flex-col justify-between';

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between border-b border-ocean-water/30 pb-3 mb-3">
          <h4 class="font-subhead font-bold text-lg text-oiler-navy">${MONTH_NAMES[m]} ${currentYear}</h4>
        </div>
        <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
          ${monthClasses.length === 0 ? '<p class="text-xs text-oiler-navy/50 italic py-4 text-center font-light">No scheduled public classes</p>' : ''}
          ${monthClasses.map((c) => {
            const regUrl = c.externalUrl || 'https://isd1.arux.app/course/677/fy-26-27/barn-quilt-painting-class';
            return `
            <a href="${regUrl}" target="_blank" rel="noopener noreferrer" class="annual-class-item p-2.5 rounded-xl bg-ocean-water/10 hover:bg-ocean-water/30 cursor-pointer transition-colors border border-ocean-water/30 text-left block group" title="Register directly on official registration page">
              <div class="flex items-start justify-between gap-1">
                <p class="text-xs font-subhead font-bold text-oiler-navy leading-snug">${c.title}</p>
                <i data-lucide="external-link" class="w-3 h-3 text-sunset-orange opacity-75 group-hover:opacity-100 shrink-0 mt-0.5"></i>
              </div>
              <div class="text-[10px] text-oiler-navy/80 mt-1 flex items-center gap-1 font-light">
                <i data-lucide="map-pin" class="w-2.5 h-2.5 text-sunset-orange shrink-0"></i>
                <span class="truncate">${c.location || 'The Blue Fox Studio'}</span>
              </div>
              <div class="text-[10px] text-oiler-navy/80 mt-0.5 flex items-center justify-between font-light">
                <span class="flex items-center gap-1">
                  <i data-lucide="clock" class="w-2.5 h-2.5 text-sunset-orange shrink-0"></i>
                  <span>${c.timeLabel}</span>
                </span>
                <span class="text-sunset-orange font-medium text-[9px] uppercase tracking-wider font-subhead">Register →</span>
              </div>
            </a>
          `;
          }).join('')}
        </div>
      </div>
      <button data-jump-month="${m}" class="mt-4 text-xs font-subhead font-medium uppercase tracking-wider text-sunset-orange hover:text-mango py-2 text-center border-t border-ocean-water/30 transition-colors cursor-pointer">
        View ${MONTH_NAMES[m]} Grid →
      </button>
    `;

    // Jump to month button
    const jumpBtn = card.querySelector(`[data-jump-month="${m}"]`);
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        currentMonth = m;
        document.getElementById('calendar-tab-monthly').click();
      });
    }

    container.appendChild(card);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function openClassAction(cls) {
  // Directly link to official registration page
  const regUrl = cls.externalUrl || 'https://isd1.arux.app/course/677/fy-26-27/barn-quilt-painting-class';
  window.open(regUrl, '_blank', 'noopener,noreferrer');
}

// -------------------------------------------------------------
// 4. Class Detail View
// -------------------------------------------------------------
function renderClassDetail(cls) {
  const container = document.getElementById('class-detail-page');
  if (!container) return;

  container.innerHTML = `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Back button -->
      <button id="class-detail-back-btn" class="inline-flex items-center space-x-2 text-oiler-navy hover:text-sunset-orange font-bold text-xs uppercase tracking-wider mb-8 transition-colors cursor-pointer">
        <i data-lucide="arrow-left" class="w-4 h-4"></i>
        <span>Back to Calendar</span>
      </button>

      <!-- Banner -->
      <div class="relative rounded-3xl overflow-hidden shadow-lg border border-ocean-water/40 bg-oiler-navy text-white min-h-[300px] sm:min-h-[360px] flex flex-col justify-end p-6 sm:p-10 mb-8">
        <div class="absolute inset-0 bg-gradient-to-t from-oiler-navy via-oiler-navy/60 to-transparent z-10"></div>
        <img src="${BLUE_FOX_DATA.images.heroClassPhoto}" alt="${cls.title}" class="absolute inset-0 w-full h-full object-cover opacity-30">
        
        <div class="relative z-20">
          <span class="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${cls.dotsColor}">
            ${cls.mediumLabel}
          </span>
          <h1 class="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight mb-2">${cls.title}</h1>
          <p class="text-sm sm:text-base text-ocean-water">Hosted by <strong>${cls.instructor}</strong> • ${cls.ageLabel}</p>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Details Left -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-ocean-water/40 shadow-xs">
            <h3 class="font-serif font-bold text-xl text-oiler-navy mb-4">Class Overview</h3>
            <p class="text-base text-oiler-navy/80 font-sans leading-relaxed">${cls.description}</p>
          </div>

          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-ocean-water/40 shadow-xs">
            <h3 class="font-serif font-bold text-xl text-oiler-navy mb-4">What's Included</h3>
            <ul class="space-y-3 font-sans text-sm sm:text-base text-oiler-navy/80">
              <li class="flex items-start space-x-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-sunset-orange shrink-0 mt-0.5"></i>
                <span>All premium art materials, canvases, wooden boards, and professional-grade paints</span>
              </li>
              <li class="flex items-start space-x-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-sunset-orange shrink-0 mt-0.5"></i>
                <span>Step-by-step master instruction tailored to all skill levels by Aryn Lill</span>
              </li>
              <li class="flex items-start space-x-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-sunset-orange shrink-0 mt-0.5"></i>
                <span>Protective aprons, brush sets, palettes, clean water stations, and workspace tools</span>
              </li>
              <li class="flex items-start space-x-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-sunset-orange shrink-0 mt-0.5"></i>
                <span>Take home your own finished masterpiece ready to hang or display</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sticky Registration Card Right -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-ocean-water/40 shadow-md sticky top-24">
            <div class="flex items-center justify-between mb-6 pb-6 border-b border-ocean-water/30">
              <div>
                <span class="text-xs text-oiler-navy/60 uppercase font-subhead font-medium tracking-wider">Official Registration</span>
                <p class="text-lg font-subhead font-medium text-oiler-navy">Open For Enrollment</p>
              </div>
              <span class="text-xs font-subhead font-medium px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ${cls.slotsRemaining} seats left
              </span>
            </div>

            <div class="space-y-4 mb-8 text-sm text-oiler-navy/80">
              <div class="flex items-center space-x-3">
                <i data-lucide="calendar" class="w-4 h-4 text-sunset-orange shrink-0"></i>
                <span>${cls.dateLabel}</span>
              </div>
              <div class="flex items-center space-x-3">
                <i data-lucide="clock" class="w-4 h-4 text-sunset-orange shrink-0"></i>
                <span>${cls.timeLabel}</span>
              </div>
              <div class="flex items-center space-x-3">
                <i data-lucide="map-pin" class="w-4 h-4 text-sunset-orange shrink-0"></i>
                <span>${cls.location || 'The Blue Fox Art Studio'}</span>
              </div>
              <div class="flex items-center space-x-3">
                <i data-lucide="users" class="w-4 h-4 text-sunset-orange shrink-0"></i>
                <span>${cls.ageLabel}</span>
              </div>
            </div>

            ${cls.externalUrl ? `
              <a href="${cls.externalUrl}" target="_blank" rel="noopener noreferrer" class="w-full bg-sunset-orange hover:bg-mango text-white font-bold text-sm uppercase tracking-wider py-4 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 mb-3">
                <span>Official Registration</span>
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            ` : ''}

            <button id="class-detail-register-btn" class="w-full bg-oiler-navy hover:bg-brilliant-blue text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer">
              <span>Reserve with Studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind back button
  document.getElementById('class-detail-back-btn').addEventListener('click', () => {
    window.location.hash = '#calendar';
  });

  // Bind register button
  document.getElementById('class-detail-register-btn').addEventListener('click', () => {
    openRegistrationModal(cls);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// -------------------------------------------------------------
// 5. Portfolio Section Controller
// -------------------------------------------------------------
function initPortfolio() {
  const container = document.getElementById('portfolio-gallery-grid');
  if (!container) return;

  container.innerHTML = '';
  BLUE_FOX_DATA.portfolio.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-lg border border-ocean-water/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col';
    card.innerHTML = `
      <div class="relative aspect-square overflow-hidden bg-slate-50">
        <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover transform duration-500 group-hover:scale-105">
      </div>
      <div class="p-5 flex items-center justify-between mt-auto">
        <div class="text-left">
          <h4 class="text-lg font-serif font-black text-oiler-navy">${item.title}</h4>
          <p class="text-xs text-oiler-navy/60 font-sans font-medium mt-0.5">${item.author}</p>
        </div>
        <span class="w-8 h-8 rounded-full bg-ocean-water/30 flex items-center justify-center text-oiler-navy group-hover:bg-sunset-orange group-hover:text-white transition-colors">
          <i data-lucide="zoom-in" class="w-4 h-4"></i>
        </span>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(item.title, item.author, item.imageUrl);
    });

    container.appendChild(card);
  });
}

// -------------------------------------------------------------
// 6. Barn Quilt Designs View
// -------------------------------------------------------------
function initBarnQuilts() {
  const grid = document.getElementById('barn-quilts-grid');
  const backBtn = document.getElementById('back-to-gallery-from-bq');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.hash = '#portfolio';
    });
  }

  if (!grid) return;
  grid.innerHTML = '';

  BLUE_FOX_DATA.barnQuiltDesigns.forEach((design) => {
    const card = document.createElement('div');
    card.className = 'group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-ocean-water/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <div class="relative aspect-square overflow-hidden bg-slate-100">
          <img src="${design.imageUrl}" alt="${design.title}" class="w-full h-full object-cover transform duration-700 group-hover:scale-105">
          <span class="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-oiler-navy/80 backdrop-blur-md text-white">
            ${design.category}
          </span>
        </div>
        <div class="p-6 text-left">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xl font-serif font-black text-oiler-navy">${design.title}</h3>
            <span class="text-[11px] font-bold text-sunset-orange bg-sunset-orange/10 px-2.5 py-1 rounded-full">${design.difficulty}</span>
          </div>
          <p class="text-sm text-oiler-navy/70 font-sans leading-relaxed mb-4">${design.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-2">
            ${design.colorPalette.map((c) => `<span class="text-[10px] font-medium bg-ocean-water/20 text-oiler-navy/80 px-2 py-0.5 rounded-full">${c}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="px-6 pb-6 pt-2 border-t border-ocean-water/20 flex items-center justify-between">
        <span class="text-xs font-bold text-oiler-navy/60">${design.sizeOption}</span>
        <span class="text-xs font-bold text-sunset-orange group-hover:underline">View Details →</span>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(design.title, `${design.category} • ${design.difficulty}`, design.imageUrl, design.description);
    });

    grid.appendChild(card);
  });
}

// -------------------------------------------------------------
// 7. Student Masterpieces View
// -------------------------------------------------------------
let selectedSmCategory = 'All';

function initStudentMasterpieces() {
  const backBtn = document.getElementById('back-to-gallery-from-sm');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.hash = '#portfolio';
    });
  }

  const filterContainer = document.getElementById('sm-categories-filter');
  if (filterContainer) {
    const categories = ['All', 'Youth Art', 'Adult Drawing', 'Adult Painting', 'Barn Quilts'];
    filterContainer.innerHTML = '';
    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.className = `px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
        selectedSmCategory === cat
          ? 'bg-brilliant-blue text-white shadow-md'
          : 'bg-white text-oiler-navy/70 hover:text-oiler-navy border border-ocean-water/40'
      }`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        selectedSmCategory = cat;
        initStudentMasterpieces();
      });
      filterContainer.appendChild(btn);
    });
  }

  const grid = document.getElementById('student-masterpieces-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const items = BLUE_FOX_DATA.studentMasterpieces.filter((m) => {
    return selectedSmCategory === 'All' || m.category === selectedSmCategory;
  });

  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-ocean-water/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <div class="relative aspect-square overflow-hidden bg-slate-100">
          <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover transform duration-700 group-hover:scale-105">
          <span class="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-oiler-navy/80 backdrop-blur-md text-white">
            ${item.category}
          </span>
        </div>
        <div class="p-6 text-left">
          <h3 class="text-xl font-serif font-black text-oiler-navy mb-1">${item.title}</h3>
          <p class="text-xs font-bold text-sunset-orange mb-3">${item.artist} • ${item.medium}</p>
          <p class="text-sm text-oiler-navy/70 font-sans leading-relaxed mb-4">${item.description}</p>
          ${item.details ? `<p class="text-xs text-oiler-navy/60 italic bg-ocean-water/20 p-3 rounded-xl">${item.details}</p>` : ''}
        </div>
      </div>
      <div class="px-6 pb-6 pt-2 border-t border-ocean-water/20 flex items-center justify-between text-xs font-bold text-sunset-orange">
        <span>Zoom Artwork</span>
        <span>→</span>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(item.title, `${item.artist} (${item.medium})`, item.imageUrl, item.description);
    });

    grid.appendChild(card);
  });
}

// -------------------------------------------------------------
// 8. Modals (Lightbox & Registration)
// -------------------------------------------------------------
function initModals() {
  const lightboxModal = document.getElementById('lightbox-modal');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  const regModal = document.getElementById('registration-modal');
  const closeRegBtn = document.getElementById('close-registration-btn');
  if (closeRegBtn && regModal) {
    closeRegBtn.addEventListener('click', closeRegistrationModal);
    regModal.addEventListener('click', (e) => {
      if (e.target === regModal) closeRegistrationModal();
    });
  }

  const regForm = document.getElementById('registration-form');
  if (regForm) {
    regForm.addEventListener('submit', handleRegistrationSubmit);
  }
}

function openLightbox(title, author, imageUrl, description) {
  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const authorEl = document.getElementById('lightbox-author');
  const descEl = document.getElementById('lightbox-desc');

  if (!modal || !imgEl) return;

  imgEl.src = imageUrl;
  titleEl.textContent = title;
  authorEl.textContent = author;
  if (descEl) {
    descEl.textContent = description || '';
    descEl.style.display = description ? 'block' : 'none';
  }

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('open'), 10);
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  modal.classList.remove('open');
  setTimeout(() => modal.classList.add('hidden'), 250);
}

let activeRegistrationClass = null;

function openRegistrationModal(cls) {
  activeRegistrationClass = cls;
  const modal = document.getElementById('registration-modal');
  const classTitleEl = document.getElementById('modal-class-title');
  const classMetaEl = document.getElementById('modal-class-meta');
  const successBox = document.getElementById('reg-success-box');
  const formBox = document.getElementById('registration-form');

  if (!modal) return;

  if (classTitleEl) classTitleEl.textContent = cls ? cls.title : 'General Art Class Registration';
  if (classMetaEl && cls) {
    classMetaEl.textContent = `${cls.dateLabel} • ${cls.timeLabel} • ${cls.location || 'The Blue Fox Studio'}`;
  }

  if (successBox) successBox.classList.add('hidden');
  if (formBox) formBox.classList.remove('hidden');

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('open'), 10);
}

function closeRegistrationModal() {
  const modal = document.getElementById('registration-modal');
  if (!modal) return;
  modal.classList.remove('open');
  setTimeout(() => modal.classList.add('hidden'), 250);
}

// Helper to resolve the correct API base URL
function getApiBaseUrl() {
  if (window.THE_BLUE_FOX_API_URL) {
    return window.THE_BLUE_FOX_API_URL.replace(/\/+$/, '');
  }
  const hostname = window.location.hostname;
  // If hosted on GitHub Pages or custom external static domain, route to the live Cloud Run backend
  if (hostname.endsWith('github.io') || (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.includes('.run.app'))) {
    return 'https://ais-dev-mpw3lmgni5s5jkcjkkyntr-616523178071.us-west2.run.app';
  }
  return '';
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('reg-student-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  const count = document.getElementById('reg-attendees').value || '1';
  const cls = activeRegistrationClass;

  const registration = {
    classId: cls ? cls.id : 'custom',
    classTitle: cls ? cls.title : 'Custom',
    studentName: name,
    email,
    phone,
    attendees: parseInt(count, 10),
    timestamp: new Date().toISOString()
  };

  // 1. Local storage backup
  try {
    const existing = JSON.parse(localStorage.getItem('the_blue_fox_registrations') || '[]');
    existing.push(registration);
    localStorage.setItem('the_blue_fox_registrations', JSON.stringify(existing));
  } catch (err) {
    console.warn('Could not save registration to local storage:', err);
  }

  // 2. Save directly to MongoDB database the_blue_fox (submissions collection)
  const submissionPayload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    subject: `Class Registration: ${cls ? cls.title : 'Art Class'}`,
    message: `Registration for "${cls ? cls.title : 'Art Class'}" (${cls ? cls.dateLabel : ''}). Attendees: ${count}. Total: $${cls ? cls.price * parseInt(count, 10) : 55}`,
    inquiryType: 'class-registration',
    source: 'registration_modal',
    submittedAt: new Date().toISOString()
  };

  fetch(`${getApiBaseUrl()}/api/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submissionPayload)
  }).then((r) => r.json()).then((data) => {
    console.log('✅ Class registration stored in database:', data);
  }).catch((err) => {
    console.warn('Note: registration backed up locally:', err);
  });

  // Show success view inside modal
  const formBox = document.getElementById('registration-form');
  const successBox = document.getElementById('reg-success-box');
  if (formBox) formBox.classList.add('hidden');
  if (successBox) {
    successBox.classList.remove('hidden');
    document.getElementById('reg-confirm-name').textContent = name;
  }
  if (window.lucide) window.lucide.createIcons();
}

// -------------------------------------------------------------
// 9. Lead Capture & Contact Form (Stores into the_blue_fox.submissions)
// -------------------------------------------------------------
function initLeadForm() {
  const form = document.getElementById('lead-capture-form');
  const errorAlert = document.getElementById('lead-error-alert');
  const errorMessageEl = document.getElementById('lead-error-message');
  const confirmationCard = document.getElementById('lead-confirmation-card');
  const submitBtn = document.getElementById('lead-submit-btn');
  const resetBtn = document.getElementById('lead-reset-btn');

  if (!form) return;

  // Reset button to send another message
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      if (confirmationCard) confirmationCard.classList.add('hidden');
      if (errorAlert) errorAlert.classList.add('hidden');
      form.classList.remove('hidden');
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('lead-name');
    const emailInput = document.getElementById('lead-email');
    const phoneInput = document.getElementById('lead-phone');
    const messageInput = document.getElementById('lead-message');
    const inquiryTypeSelect = document.getElementById('lead-inquiry-type');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';
    const inquiryType = inquiryTypeSelect ? inquiryTypeSelect.value : 'general';
    const inquiryText = inquiryTypeSelect && inquiryTypeSelect.options[inquiryTypeSelect.selectedIndex] 
      ? inquiryTypeSelect.options[inquiryTypeSelect.selectedIndex].text 
      : inquiryType;

    // Clear previous error
    if (errorAlert) errorAlert.classList.add('hidden');

    // UI Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
        <span>Saving to Database...</span>
      `;
      if (window.lucide) window.lucide.createIcons();
    }

    const payload = {
      name,
      email,
      phone,
      subject: inquiryText,
      message,
      inquiryType,
      source: 'contact_form',
      submittedAt: new Date().toISOString()
    };

    // 1. Always save to localStorage as resilient offline backup
    try {
      const existing = JSON.parse(localStorage.getItem('the_blue_fox_leads') || '[]');
      existing.unshift(payload);
      localStorage.setItem('the_blue_fox_leads', JSON.stringify(existing));
    } catch (err) {
      console.warn('Could not save lead to local storage:', err);
    }

    // 2. Submit to backend API connected to MongoDB Atlas database 'the_blue_fox' (collection: 'submissions')
    let submissionRefId = 'sub_' + Math.random().toString(36).substring(2, 9);
    let isSavedToMongo = false;

    try {
      const apiUrl = `${getApiBaseUrl()}/api/submissions`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        isSavedToMongo = true;
        submissionRefId = data.id || submissionRefId;
        console.log(`✅ Form successfully saved to MongoDB Atlas the_blue_fox.submissions (ID: ${submissionRefId})`);
      } else {
        throw new Error(data.error || 'Server was unable to save your submission.');
      }
    } catch (err) {
      console.warn('Backend note:', err?.message || err);
      // If validation error from server, display it
      if (err.message && err.message.toLowerCase().includes('validation error')) {
        if (errorAlert && errorMessageEl) {
          errorMessageEl.textContent = err.message;
          errorAlert.classList.remove('hidden');
          errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Send Message</span>
          `;
          if (window.lucide) window.lucide.createIcons();
        }
        return;
      }
      // If network offline, submission is safely saved in local backup
      submissionRefId = 'offline_' + Date.now().toString(36);
    }

    // 3. Display rich confirmation card
    const confirmNameEl = document.getElementById('confirm-user-name');
    const confirmEmailEl = document.getElementById('confirm-user-email');
    const confirmTopicEl = document.getElementById('confirm-topic');
    const confirmRefIdEl = document.getElementById('confirm-ref-id');
    const confirmTimestampEl = document.getElementById('confirm-timestamp');

    if (confirmNameEl) confirmNameEl.textContent = name || 'Friend';
    if (confirmEmailEl) confirmEmailEl.textContent = email;
    if (confirmTopicEl) confirmTopicEl.textContent = inquiryText;
    if (confirmRefIdEl) {
      confirmRefIdEl.textContent = submissionRefId;
      if (isSavedToMongo) {
        confirmRefIdEl.className = 'font-mono text-xs text-emerald-700 font-bold';
      }
    }
    if (confirmTimestampEl) {
      const now = new Date();
      confirmTimestampEl.textContent = `${now.toLocaleDateString()} at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    // Hide form, show confirmation card
    form.classList.add('hidden');
    if (confirmationCard) {
      confirmationCard.classList.remove('hidden');
      confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Restore button for next time
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <i data-lucide="send" class="w-4 h-4"></i>
        <span>Send Message</span>
      `;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
}
