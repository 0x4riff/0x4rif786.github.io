/**
 * Kalkulator Falakiah Engine: Sa'at al-Kawakib (ساعات الكواكب) & Chogadia Hisab
 * Developed for arifwidiyanto.web.id/falakiah
 * Fix: Precise Astronomical Solar Time & Full Timezone Awareness (Intl.DateTimeFormat)
 */

(function () {
    'use strict';

    // 1. Translation Dictionary
    const TRANSLATIONS = {
        id: {
            subtitle: "Jam Planet (ساعات الكواكب) & Chogadia",
            modeSaatTitle: "Sa'at al-Kawakib (ساعات الكواكب)",
            modeSaatDesc: "Ilmu Falak Hikmah Arabic (12 Jam Siang & 12 Jam Malam)",
            modeChogadiaTitle: "Chogadia Hisab (چوگھڑیا)",
            modeChogadiaDesc: "Sistem Bohra / Gujarati (8 Jam Siang & 8 Jam Malam)",
            currentStatusLabel: "Jam Planet Saat Ini:",
            timeSlotLabel: "Rentang Jam Zamaniyah",
            remainingLabel: "Sisa Waktu Jam Ini",
            planetLabel: "Pengaruh & Sifat Planet",
            locationLabel: "Lokasi & Koordinat",
            dateLabel: "Tanggal",
            btnToday: "Hari Ini",
            sunriseLabel: "Terbit (Sunrise)",
            sunsetLabel: "Terbenam (Sunset)",
            dayDurationLabel: "Durasi 1 Jam Zamaniyah",
            tabDay: "Siang / Nahar",
            tabNight: "Malam / Lail",
            thNum: "Jam ke-",
            thName: "Planet / Kawakib",
            thQuality: "Sifat / Kategori",
            thPlanet: "Khasiat & Hikmah",
            thTime: "Rentang Waktu",
            thStatus: "Status",
            legendTitle: "Panduan Kategori Jam Planet & Falakiah",
            disclaimers: "Aplikasi ini menghitung waktu Falakiah & Jam Planet secara akurat berdasarkan posisi Astronomi Matahari (Terbit & Terbenam) di lokasi Anda (1900–2100). Bekerja 100% Offline.",
            activeNow: "AKTIF SEKARANG",
            upcoming: "Akan Datang",
            passed: "Selesai",
            dayMode: "Nahar (Siang)",
            nightMode: "Lail (Malam)",
            qualities: {
                SAAD_AKBAR: "Sa'ad Akbar (Sangat Baik)",
                SAAD_ASGHAR: "Sa'ad Asghar (Baik)",
                SAAD_MUTAZIL: "Sa'ad / Wibawa",
                MUTAZIL: "Mutazi'l (Netral)",
                NAHAS_ASGHAR: "Nahas Asghar (Kurang Baik)",
                NAHAS_AKBAR: "Nahas Akbar (Sangat Nahas)",
                AMRIT: "Luar Biasa",
                SHUBH: "Baik",
                LABH: "Keuntungan",
                CHAR: "Normal / Dinamis",
                UDVEG: "Tidak Menguntungkan",
                ROG: "Tidak Menguntungkan",
                KAAL: "Sangat Tidak Baik"
            },
            names: {
                Shani: "Zuhal / Saturnus (زحل)",
                Guru: "Mushtari / Jupiter (المشتري)",
                Mangal: "Mirrikh / Mars (المريخ)",
                Surya: "Syams / Matahari (الشمس)",
                Shukra: "Zuhrah / Venus (الزهرة)",
                Budh: "Utarid / Merkurius (عطارد)",
                Chandra: "Qamar / Bulan (القمر)",
                Amrit: "Amrit (Murni)",
                Shubh: "Shubh (Berkah)",
                Labh: "Labh (Untung)",
                Char: "Char (Dinamis)",
                Udveg: "Udveg (Cemas)",
                Rog: "Rog (Penyakit)",
                Kaal: "Kaal (Bahaya)"
            }
        },
        en: {
            subtitle: "Planetary Hours (Sa'at al-Kawakib) & Chogadia",
            modeSaatTitle: "Sa'at al-Kawakib (ساعات الكواكب)",
            modeSaatDesc: "Arabic Hikmah Astrology (12 Day & 12 Night Hours)",
            modeChogadiaTitle: "Chogadia Hisab (چوگھڑیا)",
            modeChogadiaDesc: "Bohra / Gujarati System (8 Day & 8 Night Slots)",
            currentStatusLabel: "Current Planetary Hour:",
            timeSlotLabel: "Unequal Hour Window",
            remainingLabel: "Time Remaining",
            planetLabel: "Ruler & Quality",
            locationLabel: "Location & Coordinates",
            dateLabel: "Date",
            btnToday: "Today",
            sunriseLabel: "Sunrise",
            sunsetLabel: "Sunset",
            dayDurationLabel: "Duration of 1 Zamaniyah Hour",
            tabDay: "Daytime (Nahar)",
            tabNight: "Nighttime (Lail)",
            thNum: "Hour #",
            thName: "Planet / Kawakib",
            thQuality: "Quality / Category",
            thPlanet: "Efficacy & Properties",
            thTime: "Time Range",
            thStatus: "Status",
            legendTitle: "Planetary Hours & Quality Guide",
            disclaimers: "Calculates precise Falakiah & Planetary Hours using astronomical Solar positions (Sunrise & Sunset) for your coordinates (1900–2100). Works 100% Offline.",
            activeNow: "ACTIVE NOW",
            upcoming: "Upcoming",
            passed: "Passed",
            dayMode: "Daytime (Nahar)",
            nightMode: "Nighttime (Lail)",
            qualities: {
                SAAD_AKBAR: "Sa'ad Akbar (Most Auspicious)",
                SAAD_ASGHAR: "Sa'ad Asghar (Auspicious)",
                SAAD_MUTAZIL: "Sa'ad / Honor",
                MUTAZIL: "Mutazi'l (Neutral)",
                NAHAS_ASGHAR: "Nahas Asghar (Inauspicious)",
                NAHAS_AKBAR: "Nahas Akbar (Most Inauspicious)",
                AMRIT: "Excellent",
                SHUBH: "Good",
                LABH: "Gain / Benefit",
                CHAR: "Neutral / Dynamic",
                UDVEG: "Unfavorable",
                ROG: "Unfavorable",
                KAAL: "Inauspicious"
            },
            names: {
                Shani: "Zuhal / Saturn (زحل)",
                Guru: "Mushtari / Jupiter (المشتري)",
                Mangal: "Mirrikh / Mars (المريخ)",
                Surya: "Syams / Sun (الشمس)",
                Shukra: "Zuhrah / Venus (الزهرة)",
                Budh: "Utarid / Mercury (عطارد)",
                Chandra: "Qamar / Moon (القمر)",
                Amrit: "Amrit (Nectar)",
                Shubh: "Shubh (Auspicious)",
                Labh: "Labh (Gain)",
                Char: "Char (Neutral)",
                Udveg: "Udveg (Anxiety)",
                Rog: "Rog (Disease)",
                Kaal: "Kaal (Loss)"
            }
        },
        ar: {
            subtitle: "ساعات الكواكب والحساب الفلكي",
            modeSaatTitle: "ساعات الكواكب الفلكية",
            modeSaatDesc: "حساب الفلك والعلماء (12 ساعة نهاراً و 12 ساعة ليلاً)",
            modeChogadiaTitle: "حساب الشوجاديا (چوگھڑیا)",
            modeChogadiaDesc: "نظام البهرة والغوجاراتي (8 فترات نهاراً و 8 ليلاً)",
            currentStatusLabel: "ساعة الكوكب الحالية:",
            timeSlotLabel: "النطاق الزمني للساعة الزمنية",
            remainingLabel: "الوقت المتبقي للساعة",
            planetLabel: "الكوكب الحاكم وصفاته",
            locationLabel: "الموقع والإحداثيات",
            dateLabel: "التاريخ",
            btnToday: "اليوم",
            sunriseLabel: "الشروق",
            sunsetLabel: "الغروب",
            dayDurationLabel: "مدة الساعة الزمنية الواحدة",
            tabDay: "النهار",
            tabNight: "الليل",
            thNum: "الساعة",
            thName: "الكوكب الحاكم",
            thQuality: "الطبقة / الصفة",
            thPlanet: "الخاصية واستخدام",
            thTime: "الوقت",
            thStatus: "الحالة",
            legendTitle: "دليل ساعات الكواكب والأوقات الفلكية",
            disclaimers: "يحسب الحسابات الفلكية وساعات الكواكب بدقة بناءً على الشروق والغروب الفلكي لموقعك (1900-2100). يعمل بالكامل بدون إنترنت.",
            activeNow: "نشط الآن",
            upcoming: "قادم",
            passed: "انتهى",
            dayMode: "النهار",
            nightMode: "الليل",
            qualities: {
                SAAD_AKBAR: "سعد أكبر (ممتاز جداً)",
                SAAD_ASGHAR: "سعد أصغر (جيد)",
                SAAD_MUTAZIL: "سعد وشرف",
                MUTAZIL: "ممتزج (محايد)",
                NAHAS_ASGHAR: "نحس أصغر (مكروه)",
                NAHAS_AKBAR: "نحس أكبر (شديد النحوسة)",
                AMRIT: "ممتاز جداً",
                SHUBH: "مبارك / جيد",
                LABH: "مكسب / نافع",
                CHAR: "محايد / متحرك",
                UDVEG: "قلق / نحس",
                ROG: "مرض / نحس",
                KAAL: "خسارة / نحس"
            },
            names: {
                Shani: "زحل (Saturn)",
                Guru: "المشتري (Jupiter)",
                Mangal: "المريخ (Mars)",
                Surya: "الشمس (Sun)",
                Shukra: "الزهراء (Venus)",
                Budh: "عطارد (Mercury)",
                Chandra: "القمر (Moon)",
                Amrit: "أمريت",
                Shubh: "شوب",
                Labh: "لاب",
                Char: "تشار",
                Udveg: "أودفيغ",
                Rog: "روغ",
                Kaal: "كال"
            }
        }
    };

    // 2. Arabic Sa'at al-Kawakib Planet Definitions (Chaldean Order)
    const CHALDEAN_PLANETS = [
        {
            id: 'Shani',
            key: 'Shani',
            quality: 'NAHAS_AKBAR',
            class: 'q-kaal',
            icon: 'fa-skull-crossbones',
            efficacy_id: 'Nahas Akbar (Sangat Nahas). Rintangan & permusuhan. Cocok hanya untuk benteng diri & tolak bala.',
            efficacy_en: 'Most Inauspicious. Obstacles & severe delays. Suitable for warding off harm.',
            efficacy_ar: 'نحس أكبر. عقد العزائم والردع وتجنب الأمور الهامة.'
        },
        {
            id: 'Guru',
            key: 'Guru',
            quality: 'SAAD_AKBAR',
            class: 'q-amrit',
            icon: 'fa-star',
            efficacy_id: 'Sa\'ad Akbar (Sangat Baik). Berkah, permohonan doa, nikah, memulai usaha besar, & ilmu spiritual.',
            efficacy_en: 'Most Auspicious. Blessings, prayers, marriage, business launching & spiritual wisdom.',
            efficacy_ar: 'سعد أكبر. مبارك للمحبة، الزواج، التجارة والدعاء.'
        },
        {
            id: 'Mangal',
            key: 'Mangal',
            quality: 'NAHAS_ASGHAR',
            class: 'q-udveg',
            icon: 'fa-fire',
            efficacy_id: 'Nahas Asghar (Kurang Baik). Emosi & pertengkaran. Cocok untuk keberanian, olahraga, & ketegasan.',
            efficacy_en: 'Inauspicious. Anger & dispute risk. Suitable for courage, sports & firmness.',
            efficacy_ar: 'نحس أصغر. تجنب الخصومات وناسب الأعمال القوية والرياضة.'
        },
        {
            id: 'Surya',
            key: 'Surya',
            quality: 'SAAD_MUTAZIL',
            class: 'q-labh',
            icon: 'fa-sun',
            efficacy_id: 'Sa\'ad & Wibawa. Menghadap pejabat/pimpinan, kewibawaan, keagungan & hajat penting.',
            efficacy_en: 'Auspicious / Honor. Meeting officials, leadership, authority & high matters.',
            efficacy_ar: 'سعد وشرف. للقاء الملوك والرؤساء والهيبة والجاه.'
        },
        {
            id: 'Shukra',
            key: 'Shukra',
            quality: 'SAAD_ASGHAR',
            class: 'q-shubh',
            icon: 'fa-heart',
            efficacy_id: 'Sa\'ad Asghar (Baik). Cinta, pernikahan, seni, pakaian baru, perhiasan, & mahabbah.',
            efficacy_en: 'Auspicious. Love, marriage, arts, buying jewelry & attraction.',
            efficacy_ar: 'سعد أصغر. للزواج، المحبة، الزينة والفنون.'
        },
        {
            id: 'Budh',
            key: 'Budh',
            quality: 'MUTAZIL',
            class: 'q-char',
            icon: 'fa-pen-nib',
            efficacy_id: 'Mutazi\'l (Netral). Perdagangan, menulis wafaq/azimat, dokumen, perjanjian & belajar.',
            efficacy_en: 'Neutral. Commerce, writing talismans/wafaq, contracts & studying.',
            efficacy_ar: 'ممتزج. للكتابة، التجارة، العقود والعلم.'
        },
        {
            id: 'Chandra',
            key: 'Chandra',
            quality: 'MUTAZIL',
            class: 'q-char',
            icon: 'fa-moon',
            efficacy_id: 'Mutazi\'l (Netral / Dinamis). Perjalanan, bercocok tanam, minum obat, & hubungan publik.',
            efficacy_en: 'Neutral / Dynamic. Travel, agriculture, medical treatment & public affairs.',
            efficacy_ar: 'ممتزج / متحرّك. للسفر، العلاج، الزراعة والتواصل.'
        }
    ];

    const SAAT_DAY_START_INDEX = [3, 6, 2, 5, 1, 4, 0];

    // 3. Bohra / Gujarati Chogadia Definitions
    const CHOGADIYA_INFO = {
        Udveg: { quality: 'UDVEG', class: 'q-udveg', planet: 'Surya', icon: 'fa-sun', desc_id: 'Kecemasan/Tekanan. Hindari keputusan krusial.' },
        Char:  { quality: 'CHAR',  class: 'q-char',  planet: 'Shukra', icon: 'fa-wind', desc_id: 'Dinamis/Bergerak. Bagus untuk perjalanan & fisik.' },
        Labh:  { quality: 'LABH',  class: 'q-labh',  planet: 'Budh',   icon: 'fa-chart-line', desc_id: 'Keuntungan/Bisnis. Terbaik untuk transaksi.' },
        Amrit: { quality: 'AMRIT', class: 'q-amrit', planet: 'Chandra',icon: 'fa-droplet', desc_id: 'Sangat Baik. Puncak energi positif & berkah.' },
        Kaal:  { quality: 'KAAL',  class: 'q-kaal',  planet: 'Shani',  icon: 'fa-skull-crossbones', desc_id: 'Kerugian/Bahaya. Tunda aktivitas penting.' },
        Shubh: { quality: 'SHUBH', class: 'q-shubh', planet: 'Guru',   icon: 'fa-star', desc_id: 'Keberuntungan. Baik untuk nikah & ibadah.' },
        Rog:   { quality: 'ROG',   class: 'q-rog',   planet: 'Mangal', icon: 'fa-biohazard', desc_id: 'Penyakit/Rintangan. Hindari pengobatan baru.' }
    };

    const CHOGADIYA_CYCLE = ['Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'];
    const DAY_START_RULERS = ['Udveg', 'Amrit', 'Rog', 'Labh', 'Shubh', 'Char', 'Kaal'];
    const NIGHT_START_RULERS = ['Shubh', 'Char', 'Kaal', 'Udveg', 'Amrit', 'Rog', 'Labh'];

    // State Variables
    let currentSystem = localStorage.getItem('falak_system') || 'saat';
    let currentLang = localStorage.getItem('chogadia_lang') || 'id';
    let currentTheme = localStorage.getItem('chogadia_theme') || 'dark';
    let selectedDate = new Date();
    let activeTab = 'day';
    let currentCoords = { lat: -6.2088, lon: 106.8456, timeZone: 'Asia/Jakarta', name: 'Jakarta, Indonesia' };
    let timerInterval = null;

    // DOM Elements
    const elements = {
        btnModeSaat: document.getElementById('btnModeSaat'),
        btnModeChogadia: document.getElementById('btnModeChogadia'),
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
        dayDuration: document.getElementById('dayDuration'),
        legendGrid: document.getElementById('legendGrid')
    };

    // Helper for Local Date YYYY-MM-DD format (avoids toISOString UTC date shift bug)
    function getLocalYmdStr(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    // NOAA Solar Calculations Algorithm (Returns Sunrise & Sunset in Minutes from 00:00 UTC)
    function getSunTimesUtc(lat, lon, dateObj) {
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

        const zenith = 90.8333; // 90° 50' standard atmospheric refraction
        const latR = toRad(lat);
        const decR = toRad(sunDeclin);

        const cosHA = (Math.cos(toRad(zenith)) / (Math.cos(latR) * Math.cos(decR))) - (Math.tan(latR) * Math.tan(decR));
        if (cosHA > 1 || cosHA < -1) return null;

        const ha = toDeg(Math.acos(cosHA));
        const solarNoonUtc = 720 - 4 * lon - eqOfTime; // minutes UTC from 00:00 UTC

        const sunriseUtc = solarNoonUtc - ha * 4;
        const sunsetUtc = solarNoonUtc + ha * 4;

        return { sunriseUtc, sunsetUtc };
    }

    function toRad(deg) { return deg * Math.PI / 180; }
    function toDeg(rad) { return rad * 180 / Math.PI; }

    function getLocalDateTimes(dateObj, lat, lon) {
        const sunUtc = getSunTimesUtc(lat, lon, dateObj);
        if (!sunUtc) return null;

        const nextDate = new Date(dateObj);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextSunUtc = getSunTimesUtc(lat, lon, nextDate);

        // Build exact UTC timestamp (00:00:00 UTC of target date)
        const utcBaseMs = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0);
        const nextUtcBaseMs = Date.UTC(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate(), 0, 0, 0);

        const sunrise = new Date(utcBaseMs + sunUtc.sunriseUtc * 60 * 1000);
        const sunset = new Date(utcBaseMs + sunUtc.sunsetUtc * 60 * 1000);
        const nextSunrise = new Date(nextUtcBaseMs + nextSunUtc.sunriseUtc * 60 * 1000);

        return { sunrise, sunset, nextSunrise };
    }

    // Timezone-aware Time Formatter using Intl.DateTimeFormat
    function formatTime(date) {
        if (!date) return '--:--';
        const tz = currentCoords.timeZone || 'Asia/Jakarta';
        try {
            return new Intl.DateTimeFormat('en-GB', {
                timeZone: tz,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(date);
        } catch (e) {
            const h = String(date.getHours()).padStart(2, '0');
            const m = String(date.getMinutes()).padStart(2, '0');
            return `${h}:${m}`;
        }
    }

    // Calculation Router
    function calculateSchedule(dateObj, lat, lon) {
        const sun = getLocalDateTimes(dateObj, lat, lon);
        if (!sun) return null;

        if (currentSystem === 'saat') {
            return calculateSaatAlKawakib(dateObj, sun);
        } else {
            return calculateChogadia(dateObj, sun);
        }
    }

    // Sa'at al-Kawakib (12 Hours Day, 12 Hours Night)
    function calculateSaatAlKawakib(dateObj, sun) {
        const dayOfWeek = dateObj.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const startPlanetIndex = SAAT_DAY_START_INDEX[dayOfWeek];

        const dayDurationMs = sun.sunset.getTime() - sun.sunrise.getTime();
        const daySlotMs = dayDurationMs / 12;

        const daySlots = [];
        for (let i = 0; i < 12; i++) {
            const start = new Date(sun.sunrise.getTime() + i * daySlotMs);
            const end = new Date(sun.sunrise.getTime() + (i + 1) * daySlotMs);
            const planetObj = CHALDEAN_PLANETS[(startPlanetIndex + i) % 7];

            daySlots.push({
                index: i + 1,
                name: planetObj.key,
                start: start,
                end: end,
                info: planetObj
            });
        }

        const nightDurationMs = sun.nextSunrise.getTime() - sun.sunset.getTime();
        const nightSlotMs = nightDurationMs / 12;

        const nightSlots = [];
        for (let i = 0; i < 12; i++) {
            const start = new Date(sun.sunset.getTime() + i * nightSlotMs);
            const end = new Date(sun.sunset.getTime() + (i + 1) * nightSlotMs);
            const planetObj = CHALDEAN_PLANETS[(startPlanetIndex + 12 + i) % 7];

            nightSlots.push({
                index: i + 1,
                name: planetObj.key,
                start: start,
                end: end,
                info: planetObj
            });
        }

        return { sun, daySlots, nightSlots, daySlotMinutes: (daySlotMs / 60000).toFixed(1) };
    }

    // Chogadia Hisab (8 Slots Day, 8 Slots Night)
    function calculateChogadia(dateObj, sun) {
        const dayOfWeek = dateObj.getDay();

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

        return { sun, daySlots, nightSlots, daySlotMinutes: (daySlotMs / 60000).toFixed(1) };
    }

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
        document.getElementById('txtModeSaatTitle').textContent = t.modeSaatTitle;
        document.getElementById('txtModeSaatDesc').textContent = t.modeSaatDesc;
        document.getElementById('txtModeChogadiaTitle').textContent = t.modeChogadiaTitle;
        document.getElementById('txtModeChogadiaDesc').textContent = t.modeChogadiaDesc;

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
        const data = calculateSchedule(selectedDate, currentCoords.lat, currentCoords.lon);
        if (!data) return;

        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

        // Render Sun Bar
        elements.sunriseTime.textContent = formatTime(data.sun.sunrise);
        elements.sunsetTime.textContent = formatTime(data.sun.sunset);
        elements.dayDuration.textContent = `${data.daySlotMinutes} m`;

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
            const nameText = t.names[slot.name] || slot.name;

            let efficacyText = '';
            if (currentSystem === 'saat') {
                if (currentLang === 'ar') efficacyText = slot.info.efficacy_ar;
                else if (currentLang === 'en') efficacyText = slot.info.efficacy_en;
                else efficacyText = slot.info.efficacy_id;
            } else {
                efficacyText = slot.info.desc_id;
            }

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
                <td><small>${efficacyText}</small></td>
                <td><strong>${formatTime(slot.start)} - ${formatTime(slot.end)}</strong></td>
                <td>${statusBadge}</td>
            `;
            elements.chogadiaTableBody.appendChild(tr);
        });

        renderLegend();
        updateActiveBanner(data, now);
    }

    function renderLegend() {
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;
        elements.legendGrid.innerHTML = '';

        if (currentSystem === 'saat') {
            CHALDEAN_PLANETS.forEach(p => {
                const item = document.createElement('div');
                item.className = `legend-item ${p.class}`;
                const nameText = t.names[p.key];
                const qualityText = t.qualities[p.quality];
                let eff = currentLang === 'ar' ? p.efficacy_ar : (currentLang === 'en' ? p.efficacy_en : p.efficacy_id);

                item.innerHTML = `
                    <div class="legend-badge"><i class="fa-solid ${p.icon}"></i> ${nameText} - ${qualityText}</div>
                    <p>${eff}</p>
                `;
                elements.legendGrid.appendChild(item);
            });
        } else {
            Object.keys(CHOGADIYA_INFO).forEach(k => {
                const c = CHOGADIYA_INFO[k];
                const item = document.createElement('div');
                item.className = `legend-item ${c.class}`;
                const nameText = t.names[k];
                const qualityText = t.qualities[c.quality];

                item.innerHTML = `
                    <div class="legend-badge"><i class="fa-solid ${c.icon}"></i> ${nameText} - ${qualityText}</div>
                    <p>${c.desc_id}</p>
                `;
                elements.legendGrid.appendChild(item);
            });
        }
    }

    function updateActiveBanner(data, now) {
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

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
            elements.activeStatusCard.style.display = 'block';
            elements.dayNightBadge.innerHTML = `<i class="fa-solid fa-calendar"></i> ${selectedDate.toLocaleDateString()}`;
            elements.currentChogadiaName.textContent = t.names[data.daySlots[0].name] || data.daySlots[0].name;
            elements.qualityTag.textContent = t.qualities[data.daySlots[0].info.quality];
            elements.qualityTag.className = `quality-tag ${data.daySlots[0].info.class}`;
            elements.currentSlotRange.textContent = `${formatTime(data.daySlots[0].start)} - ${formatTime(data.daySlots[0].end)}`;
            elements.countdownTimer.textContent = "--:--:--";
            elements.currentPlanet.textContent = t.qualities[data.daySlots[0].info.quality];
            elements.slotProgressBar.style.width = '0%';
            return;
        }

        elements.dayNightBadge.innerHTML = isNight ?
            `<i class="fa-solid fa-moon"></i> ${t.nightMode}` :
            `<i class="fa-solid fa-sun"></i> ${t.dayMode}`;

        elements.chogadiaIconCircle.className = `chogadia-badge-circle ${activeSlot.info.class}`;
        elements.chogadiaMainIcon.className = `fa-solid ${activeSlot.info.icon}`;

        elements.currentChogadiaName.textContent = t.names[activeSlot.name] || activeSlot.name;
        elements.qualityTag.textContent = t.qualities[activeSlot.info.quality];
        elements.qualityTag.className = `quality-tag ${activeSlot.info.class}`;

        elements.currentSlotRange.textContent = `${formatTime(activeSlot.start)} - ${formatTime(activeSlot.end)}`;
        
        let planetDetail = t.qualities[activeSlot.info.quality];
        elements.currentPlanet.textContent = planetDetail;

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
            try {
                elements.liveClock.textContent = new Intl.DateTimeFormat('en-GB', {
                    timeZone: currentCoords.timeZone || 'Asia/Jakarta',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).format(now) + ` (${currentCoords.timeZone.split('/')[1] || currentCoords.timeZone})`;
            } catch (e) {
                elements.liveClock.textContent = now.toLocaleTimeString();
            }
            
            const data = calculateSchedule(selectedDate, currentCoords.lat, currentCoords.lon);
            if (data) {
                updateActiveBanner(data, now);
            }
        }

        tick();
        timerInterval = setInterval(tick, 1000);
    }

    // Location Handlers
    function setLocation(lat, lon, timeZone, name) {
        currentCoords = { lat: parseFloat(lat), lon: parseFloat(lon), timeZone: timeZone || 'Asia/Jakarta', name: name };
        elements.activeCoordsDisplay.textContent = `Lat: ${currentCoords.lat.toFixed(4)}, Lon: ${currentCoords.lon.toFixed(4)} (${currentCoords.timeZone})`;
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
                const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Jakarta';
                setLocation(pos.coords.latitude, pos.coords.longitude, userTz, 'Lokasi Saya (GPS)');
            },
            (err) => {
                alert('Gagal mendeteksi lokasi GPS: ' + err.message);
                elements.activeCoordsDisplay.textContent = `Lat: ${currentCoords.lat.toFixed(4)}, Lon: ${currentCoords.lon.toFixed(4)} (${currentCoords.timeZone})`;
            },
            { timeout: 10000, enableHighAccuracy: true }
        );
    }

    // Initialization & Event Listeners
    function init() {
        applyTheme(currentTheme);

        // Date Picker Default to Today (Local YYYY-MM-DD string)
        elements.dateInput.value = getLocalYmdStr(selectedDate);

        // Parse initial location select value right away
        const initialVal = elements.locationSelect.value;
        if (initialVal !== 'auto') {
            const parts = initialVal.split(',');
            setLocation(parts[0], parts[1], parts[2], elements.locationSelect.options[elements.locationSelect.selectedIndex].text);
        }

        if (currentSystem === 'saat') {
            elements.btnModeSaat.classList.add('active');
            elements.btnModeChogadia.classList.remove('active');
        } else {
            elements.btnModeChogadia.classList.add('active');
            elements.btnModeSaat.classList.remove('active');
        }

        elements.btnModeSaat.addEventListener('click', () => {
            currentSystem = 'saat';
            localStorage.setItem('falak_system', 'saat');
            elements.btnModeSaat.classList.add('active');
            elements.btnModeChogadia.classList.remove('active');
            renderApp();
        });

        elements.btnModeChogadia.addEventListener('click', () => {
            currentSystem = 'chogadia';
            localStorage.setItem('falak_system', 'chogadia');
            elements.btnModeChogadia.classList.add('active');
            elements.btnModeSaat.classList.remove('active');
            renderApp();
        });

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
            elements.dateInput.value = getLocalYmdStr(selectedDate);
            renderApp();
        });

        elements.locationSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'auto') {
                getUserGPS();
            } else {
                const parts = val.split(',');
                setLocation(parts[0], parts[1], parts[2], e.target.options[e.target.selectedIndex].text);
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
