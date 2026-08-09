/**
 * Chogadia Hisab & Kalkulator Falakiah Engine
 * Developed for arifwidiyanto.web.id/falakiah
 */

(function () {
    'use strict';

    // Data Translation Dictionary
    const TRANSLATIONS = {
        id: {
            subtitle: "Kalkulator Falakiah & Jam Planet",
            currentStatusLabel: "Waktu Saat Ini:",
            timeSlotLabel: "Rentang Jam",
            remainingLabel: "Sisa Waktu Jam Ini",
            planetLabel: "Pengaruh Planet",
            locationLabel: "Lokasi & Koordinat",
            dateLabel: "Tanggal",
            btnToday: "Hari Ini",
            sunriseLabel: "Terbit (Sunrise)",
            sunsetLabel: "Terbenam (Sunset)",
            dayDurationLabel: "Durasi Siang",
            tabDay: "Chogadia Siang (8 Jam)",
            tabNight: "Chogadia Malam (8 Jam)",
            thNum: "#",
            thName: "Nama Chogadia",
            thQuality: "Kualitas",
            thPlanet: "Planet",
            thTime: "Rentang Waktu",
            thStatus: "Status",
            legendTitle: "Panduan Kategori Chogadia & Kualitas",
            disclaimers: "Aplikasi ini menghitung waktu Chogadia secara akurat berdasarkan posisi Astronomi Matahari (Terbit & Terbenam) di koordinat Anda (Tahun 1900–2100). Dapat bekerja sepenuhnya 100% Offline.",
            activeNow: "AKTIF SEKARANG",
            upcoming: "Akan Datang",
            passed: "Selesai",
            dayMode: "Chogadia Siang",
            nightMode: "Chogadia Malam",
            qualities: {
                AMRIT: "Luar Biasa",
                SHUBH: "Baik",
                LABH: "Keuntungan",
                CHAR: "Normal / Dinamis",
                UDVEG: "Tidak Menguntungkan",
                ROG: "Tidak Menguntungkan",
                KAAL: "Sangat Tidak Baik"
            },
            names: {
                Amrit: "Amrit (Murni)",
                Shubh: "Shubh (Berkah)",
                Labh: "Labh (Untung)",
                Char: "Char (Dinamis)",
                Udveg: "Udveg (Cemas)",
                Rog: "Rog (Penyakit)",
                Kaal: "Kaal (Bahaya)"
            },
            planets: {
                Chandra: "Bulan (Chandra)",
                Guru: "Jupiter (Guru)",
                Budh: "Merkurius (Budh)",
                Shukra: "Venus (Shukra)",
                Surya: "Matahari (Surya)",
                Mangal: "Mars (Mangal)",
                Shani: "Saturnus (Shani)"
            }
        },
        en: {
            subtitle: "Falakiah Calculator & Planetary Hours",
            currentStatusLabel: "Current Active Period:",
            timeSlotLabel: "Time Range",
            remainingLabel: "Time Remaining",
            planetLabel: "Planetary Ruler",
            locationLabel: "Location & Coordinates",
            dateLabel: "Date",
            btnToday: "Today",
            sunriseLabel: "Sunrise",
            sunsetLabel: "Sunset",
            dayDurationLabel: "Day Duration",
            tabDay: "Day Chogadia (8 Slots)",
            tabNight: "Night Chogadia (8 Slots)",
            thNum: "#",
            thName: "Chogadia Name",
            thQuality: "Quality",
            thPlanet: "Planet",
            thTime: "Time Slot",
            thStatus: "Status",
            legendTitle: "Chogadia Category & Quality Guide",
            disclaimers: "Calculates precise Chogadia timing based on astronomical Solar positions (Sunrise & Sunset) for your location (1900–2100). Works 100% Offline.",
            activeNow: "ACTIVE NOW",
            upcoming: "Upcoming",
            passed: "Passed",
            dayMode: "Day Chogadia",
            nightMode: "Night Chogadia",
            qualities: {
                AMRIT: "Excellent",
                SHUBH: "Good",
                LABH: "Gain / Benefit",
                CHAR: "Neutral / Dynamic",
                UDVEG: "Unfavorable",
                ROG: "Unfavorable",
                KAAL: "Inauspicious"
            },
            names: {
                Amrit: "Amrit (Nectar)",
                Shubh: "Shubh (Auspicious)",
                Labh: "Labh (Gain)",
                Char: "Char (Neutral)",
                Udveg: "Udveg (Anxiety)",
                Rog: "Rog (Disease)",
                Kaal: "Kaal (Loss)"
            },
            planets: {
                Chandra: "Moon (Chandra)",
                Guru: "Jupiter (Guru)",
                Budh: "Mercury (Budh)",
                Shukra: "Venus (Shukra)",
                Surya: "Sun (Surya)",
                Mangal: "Mars (Mangal)",
                Shani: "Saturn (Shani)"
            }
        },
        ar: {
            subtitle: "حساب الفلكية وساعات الكواكب",
            currentStatusLabel: "الفترة الحالية النشطة:",
            timeSlotLabel: "النطاق الزمني",
            remainingLabel: "الوقت المتبقي",
            planetLabel: "الكوكب الحاكم",
            locationLabel: "الموقع والإحداثيات",
            dateLabel: "التاريخ",
            btnToday: "اليوم",
            sunriseLabel: "الشروق",
            sunsetLabel: "الغروب",
            dayDurationLabel: "مدة النهار",
            tabDay: "شوجاديا النهار (8 فترات)",
            tabNight: "شوجاديا الليل (8 فترات)",
            thNum: "#",
            thName: "اسم الشوجاديا",
            thQuality: "الجودة",
            thPlanet: "الكوكب",
            thTime: "الفترة الزمنية",
            thStatus: "الحالة",
            legendTitle: "دليل فئات الشوجاديا والجودة",
            disclaimers: "يحسب مواقيت الشوجاديا بدقة بناءً على الحسابات الفلكية لشروق الشمس وغروبها لموقعك (1900-2100). يعمل بالكامل بدون إنترنت.",
            activeNow: "نشط الآن",
            upcoming: "قادم",
            passed: "انتهى",
            dayMode: "شوجاديا النهار",
            nightMode: "شوجاديا الليل",
            qualities: {
                AMRIT: "ممتاز جداً",
                SHUBH: "جيد / مبارك",
                LABH: "مفيد / مكسب",
                CHAR: "محايد / متحرك",
                UDVEG: "غير مقلق",
                ROG: "غير مستحب",
                KAAL: "نحس / سيء"
            },
            names: {
                Amrit: "أمريت (ممتاز)",
                Shubh: "شوب (مبارك)",
                Labh: "لاب (ربح)",
                Char: "تشار (محايد)",
                Udveg: "أودفيغ (قلق)",
                Rog: "روغ (مرض)",
                Kaal: "كال (خسارة)"
            },
            planets: {
                Chandra: "القمر",
                Guru: "المشتري",
                Budh: "عطارد",
                Shukra: "الزهراء",
                Surya: "الشمس",
                Mangal: "المريخ",
                Shani: "زحل"
            }
        }
    };

    // Chogadia Definitions & Planet Rulers
    const CHOGADIYA_INFO = {
        Udveg: { quality: 'UDVEG', class: 'q-udveg', planet: 'Surya', icon: 'fa-sun' },
        Char:  { quality: 'CHAR',  class: 'q-char',  planet: 'Shukra', icon: 'fa-wind' },
        Labh:  { quality: 'LABH',  class: 'q-labh',  planet: 'Budh',   icon: 'fa-chart-line' },
        Amrit: { quality: 'AMRIT', class: 'q-amrit', planet: 'Chandra',icon: 'fa-droplet' },
        Kaal:  { quality: 'KAAL',  class: 'q-kaal',  planet: 'Shani',  icon: 'fa-skull-crossbones' },
        Shubh: { quality: 'SHUBH', class: 'q-shubh', planet: 'Guru',   icon: 'fa-star' },
        Rog:   { quality: 'ROG',   class: 'q-rog',   planet: 'Mangal', icon: 'fa-biohazard' }
    };

    const CHOGADIYA_CYCLE = ['Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'];

    const DAY_START_RULERS = ['Udveg', 'Amrit', 'Rog', 'Labh', 'Shubh', 'Char', 'Kaal'];
    const NIGHT_START_RULERS = ['Shubh', 'Char', 'Kaal', 'Udveg', 'Amrit', 'Rog', 'Labh'];

    // State Variables
    let currentLang = localStorage.getItem('chogadia_lang') || 'id';
    let currentTheme = localStorage.getItem('chogadia_theme') || 'dark';
    let selectedDate = new Date();
    let activeTab = 'day'; // 'day' or 'night'
    let currentCoords = { lat: -6.2088, lon: 106.8456, name: 'Jakarta, Indonesia' };
    let timerInterval = null;

    // DOM Elements
    const elements = {
        langSelect: document.getElementById('langSelect'),
        themeToggle: document.getElementById('themeToggle'),
        dateInput: document.getElementById('dateInput'),
        locationSelect: document.getElementById('locationSelect'),
        btnRefreshGps: document.getElementById('btnRefreshGps'),
        activeCoordsDisplay: document.getElementById('activeCoordsDisplay'),
        btnToday: document.getElementById('btnToday'),
        tabDay: document.getElementById('tabDay'),
        tabNight: document.getElementById('tabNight'),
        chogadiaTableBody: document.getElementById('chogadiaTableBody'),
        liveClock: document.getElementById('liveClock'),
        activeStatusCard: document.getElementById('activeStatusCard'),
        dayNightBadge: document.getElementById('dayNightBadge'),
        chogadiaIconCircle: document.getElementById('chogadiaIconCircle'),
        chogadiaMainIcon: document.getElementById('chogadiaMainIcon'),
        currentChogadiaName: document.getElementById('currentChogadiaName'),
        qualityTag: document.getElementById('qualityTag'),
        currentSlotRange: document.getElementById('currentSlotRange'),
        countdownTimer: document.getElementById('countdownTimer'),
        currentPlanet: document.getElementById('currentPlanet'),
        slotProgressBar: document.getElementById('slotProgressBar'),
        sunriseTime: document.getElementById('sunriseTime'),
        sunsetTime: document.getElementById('sunsetTime'),
        dayDuration: document.getElementById('dayDuration')
    };

    // NOAA Solar Calculations Algorithm
    function getSunTimes(lat, lon, dateObj) {
        const year = dateObj.getFullYear();
        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();

        let y = year;
        let m = month;
        if (m <= 2) {
            y -= 1;
            m += 12;
        }

        const A = Math.floor(y / 100);
        const B = 2 - A + Math.floor(A / 4);
        const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
        const JC = (JD - 2451545) / 36525;

        const geomMeanLongSun = (280.46646 + JC * (36000.76983 + JC * 0.0003032)) % 360;
        const geomMeanAnomSun = 357.52911 + JC * (35999.05029 - 0.0001537 * JC);
        const eccentEarthOrbit = 0.016708634 - JC * (0.00042037 + 0.0000001267 * JC);

        const sunEqOfCtr = Math.sin(toRad(geomMeanAnomSun)) * (1.914602 - JC * (0.004817 + 0.000014 * JC)) +
                           Math.sin(toRad(2 * geomMeanAnomSun)) * (0.019993 - 0.000101 * JC) +
                           Math.sin(toRad(3 * geomMeanAnomSun)) * 0.000289;

        const sunTrueLong = geomMeanLongSun + sunEqOfCtr;
        const sunAppLong = sunTrueLong - 0.00569 - 0.00478 * Math.sin(toRad(125.04 - 1934.13 * JC));

        const meanObliqEcliptic = 23 + (26 + ((21.448 - JC * (46.815 + JC * (0.00059 - JC * 0.001813)))) / 60) / 60;
        const obliqCorr = meanObliqEcliptic + 0.00256 * Math.cos(toRad(125.04 - 1934.13 * JC));

        const sunDeclin = toDeg(Math.asin(Math.sin(toRad(obliqCorr)) * Math.sin(toRad(sunAppLong))));

        const varY = Math.pow(Math.tan(toRad(obliqCorr / 2)), 2);
        const eqOfTime = 4 * toDeg(varY * Math.sin(2 * toRad(geomMeanLongSun)) -
                         2 * eccentEarthOrbit * Math.sin(toRad(geomMeanAnomSun)) +
                         4 * eccentEarthOrbit * varY * Math.sin(toRad(geomMeanAnomSun)) * Math.cos(2 * toRad(geomMeanLongSun)) -
                         0.5 * Math.pow(varY, 2) * Math.sin(4 * toRad(geomMeanLongSun)) -
                         1.25 * Math.pow(eccentEarthOrbit, 2) * Math.sin(2 * toRad(geomMeanAnomSun)));

        const zenith = 90.8333; // 90° 50' for sunrise/sunset atmospheric refraction
        const latR = toRad(lat);
        const decR = toRad(sunDeclin);

        const cosHA = (Math.cos(toRad(zenith)) / (Math.cos(latR) * Math.cos(decR))) - (Math.tan(latR) * Math.tan(decR));
        if (cosHA > 1 || cosHA < -1) {
            return null; // Extreme polar day/night
        }

        const ha = toDeg(Math.acos(cosHA));
        const solarNoonUtc = 720 - 4 * lon - eqOfTime; // in minutes UTC

        const sunriseUtc = solarNoonUtc - ha * 4;
        const sunsetUtc = solarNoonUtc + ha * 4;

        return { sunriseUtc, sunsetUtc };
    }

    function toRad(deg) { return deg * Math.PI / 180; }
    function toDeg(rad) { return rad * 180 / Math.PI; }

    function getLocalDateTimes(dateObj, lat, lon) {
        const sunUtc = getSunTimes(lat, lon, dateObj);
        if (!sunUtc) return null;

        // Next Day Sun Times for Night Calculation
        const nextDate = new Date(dateObj);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextSunUtc = getSunTimes(lat, lon, nextDate);

        // Convert UTC minutes to local Date objects
        const baseDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
        
        const sunrise = new Date(baseDate.getTime() + sunUtc.sunriseUtc * 60 * 1000);
        const sunset = new Date(baseDate.getTime() + sunUtc.sunsetUtc * 60 * 1000);
        
        const nextBaseDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate());
        const nextSunrise = new Date(nextBaseDate.getTime() + nextSunUtc.sunriseUtc * 60 * 1000);

        return { sunrise, sunset, nextSunrise };
    }

    // Build Day and Night Chogadia Slots
    function calculateChogadias(dateObj, lat, lon) {
        const sun = getLocalDateTimes(dateObj, lat, lon);
        if (!sun) return null;

        const dayOfWeek = dateObj.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

        // Day Chogadias (8 slots)
        const dayDurationMs = sun.sunset.getTime() - sun.sunrise.getTime();
        const daySlotMs = dayDurationMs / 8;
        const dayStartRuler = DAY_START_RULERS[dayOfWeek];
        const dayStartIndex = CHOGADIYA_CYCLE.indexOf(dayStartRuler);

        const daySlots = [];
        for (let i = 0; i < 8; i++) {
            const start = new Date(sun.sunrise.getTime() + i * daySlotMs);
            const end = new Date(sun.sunrise.getTime() + (i + 1) * daySlotMs);
            const name = CHOGADIYA_CYCLE[(dayStartIndex + i) % 7];
            daySlots.push({
                index: i + 1,
                name: name,
                start: start,
                end: end,
                info: CHOGADIYA_INFO[name]
            });
        }

        // Night Chogadias (8 slots)
        const nightDurationMs = sun.nextSunrise.getTime() - sun.sunset.getTime();
        const nightSlotMs = nightDurationMs / 8;
        const nightStartRuler = NIGHT_START_RULERS[dayOfWeek];
        const nightStartIndex = CHOGADIYA_CYCLE.indexOf(nightStartRuler);

        const nightSlots = [];
        for (let i = 0; i < 8; i++) {
            const start = new Date(sun.sunset.getTime() + i * nightSlotMs);
            const end = new Date(sun.sunset.getTime() + (i + 1) * nightSlotMs);
            const name = CHOGADIYA_CYCLE[(nightStartIndex + i) % 7];
            nightSlots.push({
                index: i + 1,
                name: name,
                start: start,
                end: end,
                info: CHOGADIYA_INFO[name]
            });
        }

        return { sun, daySlots, nightSlots };
    }

    // Formatting Helpers
    function formatTime(date) {
        if (!date) return '--:--';
        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        return `${h}:${m}`;
    }

    function formatDuration(ms) {
        const totalSec = Math.floor(ms / 1000);
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        return `${h} j ${m} m`;
    }

    // UI Updating Functions
    function applyTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('chogadia_theme', theme);
        const icon = elements.themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fa-solid fa-moon';
        } else {
            icon.className = 'fa-solid fa-sun';
        }
    }

    function applyLanguage(lang) {
        currentLang = lang;
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('chogadia_lang', lang);

        const t = TRANSLATIONS[lang] || TRANSLATIONS.id;
        document.getElementById('txtSubtitle').textContent = t.subtitle;
        document.getElementById('txtCurrentStatusLabel').textContent = t.currentStatusLabel;
        document.getElementById('txtTimeSlotLabel').textContent = t.timeSlotLabel;
        document.getElementById('txtRemainingLabel').textContent = t.remainingLabel;
        document.getElementById('txtPlanetLabel').textContent = t.planetLabel;
        document.getElementById('lblLocation').childNodes[1].nodeValue = " " + t.locationLabel;
        document.getElementById('lblDate').childNodes[1].nodeValue = " " + t.dateLabel;
        elements.btnToday.textContent = t.btnToday;
        document.getElementById('txtSunriseLabel').textContent = t.sunriseLabel;
        document.getElementById('txtSunsetLabel').textContent = t.sunsetLabel;
        document.getElementById('txtDayDurationLabel').textContent = t.dayDurationLabel;
        document.getElementById('txtTabDay').textContent = t.tabDay;
        document.getElementById('txtTabNight').textContent = t.tabNight;
        document.getElementById('thNum').textContent = t.thNum;
        document.getElementById('thName').textContent = t.thName;
        document.getElementById('thQuality').textContent = t.thQuality;
        document.getElementById('thPlanet').textContent = t.thPlanet;
        document.getElementById('thTime').textContent = t.thTime;
        document.getElementById('thStatus').textContent = t.thStatus;
        document.getElementById('txtLegendTitle').childNodes[1].nodeValue = " " + t.legendTitle;
        document.getElementById('txtDisclaimers').textContent = t.disclaimers;

        renderApp();
    }

    function renderApp() {
        const dateObj = selectedDate;
        const data = calculateChogadias(dateObj, currentCoords.lat, currentCoords.lon);
        if (!data) return;

        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

        // Render Sun Bar
        elements.sunriseTime.textContent = formatTime(data.sun.sunrise);
        elements.sunsetTime.textContent = formatTime(data.sun.sunset);
        elements.dayDuration.textContent = formatDuration(data.sun.sunset.getTime() - data.sun.sunrise.getTime());

        // Render Table
        const slots = activeTab === 'day' ? data.daySlots : data.nightSlots;
        elements.chogadiaTableBody.innerHTML = '';

        const now = new Date();

        slots.forEach(slot => {
            const tr = document.createElement('tr');
            const isActive = now >= slot.start && now < slot.end;

            if (isActive) {
                tr.className = 'active-row';
            }

            const qualityText = t.qualities[slot.info.quality];
            const nameText = t.names[slot.name];
            const planetText = t.planets[slot.info.planet];

            let statusBadge = '';
            if (isActive) {
                statusBadge = `<span class="badge-row-quality q-amrit"><i class="fa-solid fa-bolt"></i> ${t.activeNow}</span>`;
            } else if (now > slot.end) {
                statusBadge = `<span style="color:var(--text-muted); font-size:0.78rem;">${t.passed}</span>`;
            } else {
                statusBadge = `<span style="color:var(--text-muted); font-size:0.78rem;">${t.upcoming}</span>`;
            }

            tr.innerHTML = `
                <td><strong>${slot.index}</strong></td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i class="fa-solid ${slot.info.icon} ${slot.info.class}"></i>
                        <strong>${nameText}</strong>
                    </div>
                </td>
                <td><span class="badge-row-quality ${slot.info.class}">${qualityText}</span></td>
                <td>${planetText}</td>
                <td><strong>${formatTime(slot.start)} - ${formatTime(slot.end)}</strong></td>
                <td>${statusBadge}</td>
            `;
            elements.chogadiaTableBody.appendChild(tr);
        });

        updateActiveBanner(data, now);
    }

    function updateActiveBanner(data, now) {
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

        // Check whether now falls in day or night slots of today
        let activeSlot = null;
        let isNight = false;

        const allSlots = [...data.daySlots, ...data.nightSlots];
        for (let s of allSlots) {
            if (now >= s.start && now < s.end) {
                activeSlot = s;
                isNight = s.start >= data.sun.sunset;
                break;
            }
        }

        if (!activeSlot) {
            // Fallback if looking at future/past date
            elements.activeStatusCard.style.display = 'block';
            elements.dayNightBadge.innerHTML = `<i class="fa-solid fa-calendar"></i> ${selectedDate.toLocaleDateString()}`;
            elements.currentChogadiaName.textContent = t.names[data.daySlots[0].name];
            elements.qualityTag.textContent = t.qualities[data.daySlots[0].info.quality];
            elements.qualityTag.className = `quality-tag ${data.daySlots[0].info.class}`;
            elements.currentSlotRange.textContent = `${formatTime(data.daySlots[0].start)} - ${formatTime(data.daySlots[0].end)}`;
            elements.countdownTimer.textContent = "--:--:--";
            elements.currentPlanet.textContent = t.planets[data.daySlots[0].info.planet];
            elements.slotProgressBar.style.width = '0%';
            return;
        }

        elements.dayNightBadge.innerHTML = isNight ?
            `<i class="fa-solid fa-moon"></i> ${t.nightMode}` :
            `<i class="fa-solid fa-sun"></i> ${t.dayMode}`;

        elements.chogadiaIconCircle.className = `chogadia-badge-circle ${activeSlot.info.class}`;
        elements.chogadiaMainIcon.className = `fa-solid ${activeSlot.info.icon}`;

        elements.currentChogadiaName.textContent = t.names[activeSlot.name];
        elements.qualityTag.textContent = t.qualities[activeSlot.info.quality];
        elements.qualityTag.className = `quality-tag ${activeSlot.info.class}`;

        elements.currentSlotRange.textContent = `${formatTime(activeSlot.start)} - ${formatTime(activeSlot.end)}`;
        elements.currentPlanet.textContent = t.planets[activeSlot.info.planet];

        // Countdown & Progress
        const totalDurationMs = activeSlot.end.getTime() - activeSlot.start.getTime();
        const elapsedMs = now.getTime() - activeSlot.start.getTime();
        const remainingMs = Math.max(0, activeSlot.end.getTime() - now.getTime());

        const pct = Math.min(100, Math.max(0, (elapsedMs / totalDurationMs) * 100));
        elements.slotProgressBar.style.width = `${pct}%`;

        const remSec = Math.floor(remainingMs / 1000);
        const rh = Math.floor(remSec / 3600);
        const rm = Math.floor((remSec % 3600) / 60);
        const rs = remSec % 60;

        elements.countdownTimer.textContent = `${String(rh).padStart(2, '0')} j ${String(rm).padStart(2, '0')} m ${String(rs).padStart(2, '0')} d`;
    }

    function startLiveClock() {
        if (timerInterval) clearInterval(timerInterval);

        function tick() {
            const now = new Date();
            elements.liveClock.textContent = now.toLocaleTimeString();
            
            // Re-render banner & highlight row
            const data = calculateChogadias(selectedDate, currentCoords.lat, currentCoords.lon);
            if (data) {
                updateActiveBanner(data, now);
            }
        }

        tick();
        timerInterval = setInterval(tick, 1000);
    }

    // Location Handlers
    function setLocation(lat, lon, name) {
        currentCoords = { lat: parseFloat(lat), lon: parseFloat(lon), name: name };
        elements.activeCoordsDisplay.textContent = `Lat: ${currentCoords.lat.toFixed(4)}, Lon: ${currentCoords.lon.toFixed(4)}`;
        renderApp();
    }

    function getUserGPS() {
        if (!navigator.geolocation) {
            alert('Geolocation tidak didukung oleh browser Anda.');
            return;
        }

        elements.activeCoordsDisplay.textContent = 'Mendeteksi posisi GPS...';
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation(pos.coords.latitude, pos.coords.longitude, 'Lokasi Saya (GPS)');
            },
            (err) => {
                alert('Gagal mendeteksi lokasi GPS: ' + err.message);
                elements.activeCoordsDisplay.textContent = `Lat: ${currentCoords.lat.toFixed(4)}, Lon: ${currentCoords.lon.toFixed(4)}`;
            },
            { timeout: 10000, enableHighAccuracy: true }
        );
    }

    // Initialization & Event Listeners
    function init() {
        // Apply persisted settings
        applyTheme(currentTheme);

        // Date Picker Default to Today
        const todayStr = selectedDate.toISOString().split('T')[0];
        elements.dateInput.value = todayStr;

        // Bind Events
        elements.langSelect.value = currentLang;
        elements.langSelect.addEventListener('change', (e) => applyLanguage(e.target.value));

        elements.themeToggle.addEventListener('click', () => {
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });

        elements.dateInput.addEventListener('change', (e) => {
            if (e.target.value) {
                selectedDate = new Date(e.target.value + 'T00:00:00');
                renderApp();
            }
        });

        elements.btnToday.addEventListener('click', () => {
            selectedDate = new Date();
            elements.dateInput.value = selectedDate.toISOString().split('T')[0];
            renderApp();
        });

        elements.locationSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'auto') {
                getUserGPS();
            } else {
                const parts = val.split(',');
                setLocation(parts[0], parts[1], e.target.options[e.target.selectedIndex].text);
            }
        });

        elements.btnRefreshGps.addEventListener('click', getUserGPS);

        elements.tabDay.addEventListener('click', () => {
            activeTab = 'day';
            elements.tabDay.classList.add('active');
            elements.tabNight.classList.remove('active');
            renderApp();
        });

        elements.tabNight.addEventListener('click', () => {
            activeTab = 'night';
            elements.tabNight.classList.add('active');
            elements.tabDay.classList.remove('active');
            renderApp();
        });

        applyLanguage(currentLang);
        startLiveClock();
    }

    document.addEventListener('DOMContentLoaded', init);

})();
