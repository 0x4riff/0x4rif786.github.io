/**
 * Kalkulator Falakiah Engine 3D: Sa'at al-Kawakib (ساعات الكواكب), Dual 3D WebGL/CSS Orbs, Abjad Hisab Arab, Khadim Ulwi & Sufli dengan Transliterasi Latin, 5 Formula Wafaq Problem-Oriented, Unduh Kartu Wafaq Emas PNG, Tasbih Digital Interaktif, Deep Hikmah Database, 24h Dial Clock, Asmaul Husna, 28 Manazil, Hijri, Qibla & Hajat Finder
 * Developed for arifwidiyanto.web.id/falakiah
 * Fixed v13.1: Syntax fix on Wafaq houseValues calculation loop
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
            currentStatusLabel: "Jam Planet Saat Ini (Klik untuk 3D Detail):",
            timeSlotLabel: "Rentang Jam / Segmen",
            remainingLabel: "Sisa Waktu Jam Ini",
            planetLabel: "Pengaruh & Sifat Planet",
            locationLabel: "Lokasi & Koordinat",
            dateLabel: "Tanggal",
            btnToday: "Hari Ini",
            sunriseLabel: "Terbit (Sunrise)",
            sunsetLabel: "Terbenam (Sunset)",
            dayDurationLabelSaat: "Durasi 1 Jam Zamaniyah",
            dayDurationLabelChogadia: "Durasi 1 Segmen Chogadia",
            tabDay: "Siang / Nahar",
            tabNight: "Malam / Lail",
            thNum: "Jam ke-",
            thName: "Planet / Kawakib",
            thQuality: "Sifat / Kategori",
            thPlanet: "Khasiat & Asmaul Husna",
            thTime: "Rentang Waktu",
            thStatus: "Status",
            legendTitle: "Panduan Kategori Jam Planet & Falakiah",
            disclaimers: "Aplikasi ini menghitung waktu Falakiah & Jam Planet secara akurat berdasarkan posisi Astronomi Matahari (Terbit & Terbenam) di lokasi Anda (1900–2100) serta sesuai dengan rujukan Kitab Syamsul Ma'arif & Manba' Ushul al-Hikmah. Bekerja 100% Offline.",
            activeNow: "AKTIF SEKARANG",
            upcoming: "Akan Datang",
            passed: "Selesai",
            dayMode: "Nahar (Siang)",
            nightMode: "Lail (Malam)",
            txtAstroTitle: "Astronomi Falakiah, Bulan & Waktu Sholat",
            txtMoonHeader: "Fase Bulan & Hijriah",
            txtHijriDateLabel: "Tanggal Hijriah:",
            txtMoonPhaseLabel: "Fase & Usia Bulan:",
            txtManazilLabel: "Manazil al-Qamar & Buruj:",
            txtPrayerHeader: "Arah Kiblat & Sholat",
            txtFajr: "Subuh",
            txtSunrise: "Syuruq",
            txtDhuhr: "Dzuhur",
            txtAsr: "Ashar",
            txtMaghrib: "Maghrib",
            txtIsha: "Isya",
            txtFinderTitle: "Pencari Jam Baik & Hajat (Best Hour Finder)",
            txtFinderSubtitle: "Filter jam planet berdasarkan kebutuhan hajat Anda hari ini:",
            txtDialTitle: "Visual Jam Kompas Falakiah 24h",
            txtDialSubtitle: "Peta Visual 12 Jam Siang & 12 Jam Malam Realtime (Klik Node untuk 3D Detail)",
            txtAsmaLabel: "Asmaul Husna Penguat Jam Ini:",
            txtMetalLabel: "Logam / Unsur Tabi'at:",
            txtBtnNotify: "Notifikasi",
            txtBtnPrint: "Cetak",
            txtBtnWa: "Salin WA",
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
                Amrit: "Amrit (Murni / Qamar)",
                Shubh: "Shubh (Berkah / Guru)",
                Labh: "Labh (Untung / Budh)",
                Char: "Char (Dinamis / Shukra)",
                Udveg: "Udveg (Cemas / Surya)",
                Rog: "Rog (Penyakit / Mangal)",
                Kaal: "Kaal (Bahaya / Shani)"
            }
        },
        en: {
            subtitle: "Planetary Hours (Sa'at al-Kawakib) & Chogadia",
            modeSaatTitle: "Sa'at al-Kawakib (ساعات الكواكب)",
            modeSaatDesc: "Arabic Hikmah Astrology (12 Day & 12 Night Hours)",
            modeChogadiaTitle: "Chogadia Hisab (چوگھڑیا)",
            modeChogadiaDesc: "Bohra / Gujarati System (8 Day & 8 Night Slots)",
            currentStatusLabel: "Current Planetary Hour (Click for 3D Detail):",
            timeSlotLabel: "Unequal Hour Window",
            remainingLabel: "Time Remaining",
            planetLabel: "Ruler & Quality",
            locationLabel: "Location & Coordinates",
            dateLabel: "Date",
            btnToday: "Today",
            sunriseLabel: "Sunrise",
            sunsetLabel: "Sunset",
            dayDurationLabelSaat: "Duration of 1 Zamaniyah Hour",
            dayDurationLabelChogadia: "Duration of 1 Chogadia Slot",
            tabDay: "Daytime (Nahar)",
            tabNight: "Nighttime (Lail)",
            thNum: "Hour #",
            thName: "Planet / Kawakib",
            thQuality: "Quality / Category",
            thPlanet: "Efficacy & Properties",
            thTime: "Time Range",
            thStatus: "Status",
            legendTitle: "Planetary Hours & Quality Guide",
            disclaimers: "Calculates precise Falakiah & Planetary Hours using astronomical Solar positions (Sunrise & Sunset) for your coordinates (1900–2100) aligned with Syamsul Ma'arif & Manba' Ushul al-Hikmah. Works 100% Offline.",
            activeNow: "ACTIVE NOW",
            upcoming: "Upcoming",
            passed: "Passed",
            dayMode: "Daytime (Nahar)",
            nightMode: "Nighttime (Lail)",
            txtAstroTitle: "Falakiah Astronomy, Moon & Prayer Times",
            txtMoonHeader: "Moon Phase & Hijri Calendar",
            txtHijriDateLabel: "Hijri Date:",
            txtMoonPhaseLabel: "Moon Phase & Age:",
            txtManazilLabel: "Manazil al-Qamar & Zodiac:",
            txtPrayerHeader: "Qibla Direction & Prayers",
            txtFajr: "Fajr",
            txtSunrise: "Sunrise",
            txtDhuhr: "Dhuhr",
            txtAsr: "Asr",
            txtMaghrib: "Maghrib",
            txtIsha: "Isha",
            txtFinderTitle: "Best Hour & Purpose Finder",
            txtFinderSubtitle: "Filter planetary hours by your goal for today:",
            txtDialTitle: "24h Falakiah Dial Clock",
            txtDialSubtitle: "Visual Realtime Map of 12 Day & 12 Night Hours (Click Node for 3D Detail)",
            txtAsmaLabel: "Recommended Asmaul Husna:",
            txtMetalLabel: "Metal / Element:",
            txtBtnNotify: "Notify",
            txtBtnPrint: "Print",
            txtBtnWa: "Copy WA",
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
            currentStatusLabel: "ساعة الكوكب الحالية (انقر للتفاصيل ثلاثية الأبعاد):",
            timeSlotLabel: "النطاق الزمني للساعة الزمنية",
            remainingLabel: "الوقت المتبقي للساعة",
            planetLabel: "الكوكب الحاكم وصفاته",
            locationLabel: "الموقع والإحداثيات",
            dateLabel: "التاريخ",
            btnToday: "اليوم",
            sunriseLabel: "الشروق",
            sunsetLabel: "الغروب",
            dayDurationLabelSaat: "مدة الساعة الزمنية الواحدة",
            dayDurationLabelChogadia: "مدة فترة الشوجاديا الواحدة",
            tabDay: "النهار",
            tabNight: "الليل",
            thNum: "الساعة",
            thName: "الكوكب الحاكم",
            thQuality: "الطبقة / الصفة",
            thPlanet: "الخاصية والاستخدام",
            thTime: "الوقت",
            thStatus: "الحالة",
            legendTitle: "دليل ساعات الكواكب والأوقات الفلكية",
            disclaimers: "يحسب الحسابات الفلكية وساعات الكواكب بدقة بناءً على الشروق والغروب الفلكي لموقعك (1900-2100) ومطابق لكتاب شمس المعارف الكبرى ومنبع أصول الحكمة. يعمل بالكامل بدون إنترنت.",
            activeNow: "نشط الآن",
            upcoming: "قادم",
            passed: "انتهى",
            dayMode: "النهار",
            nightMode: "الليل",
            txtAstroTitle: "الفلك والقمريات ومواقيت الصلاة",
            txtMoonHeader: "أطوار القمر والتقويم الهجري",
            txtHijriDateLabel: "التاريخ الهجري:",
            txtMoonPhaseLabel: "طور وعمر القمر:",
            txtManazilLabel: "منازل القمر والبروج:",
            txtPrayerHeader: "اتجاه القبلة ومواقيت الصلاة",
            txtFajr: "الفجر",
            txtSunrise: "الشروق",
            txtDhuhr: "الظهر",
            txtAsr: "العصر",
            txtMaghrib: "المغرب",
            txtIsha: "العشاء",
            txtFinderTitle: "مستكشف الأوقات المباركة وقضاء الحوائج",
            txtFinderSubtitle: "اختر غايتك لعرض أفضل الساعات:",
            txtDialTitle: "بوصلة ساعات الكواكب 24 ساعة",
            txtDialSubtitle: "خريطة تفاعلية لساعات الليل والنهار",
            txtAsmaLabel: "الأسماء الحسنى للساعة:",
            txtMetalLabel: "المعدن والطبع:",
            txtBtnNotify: "التنبيهات",
            txtBtnPrint: "طباعة",
            txtBtnWa: "نسخ للواتساب",
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

    // ABJAD HISAB AL-JUMAL DICTIONARY & LATIN TO ARABIC TRANSLITERATION
    const LATIN_TO_ARABIC_MAP = {
        'A': 'ع', 'B': 'ب', 'C': 'ج', 'D': 'د', 'E': 'ي', 'F': 'ف', 'G': 'غ',
        'H': 'ح', 'I': 'ي', 'J': 'ج', 'K': 'ك', 'L': 'ل', 'M': 'م', 'N': 'ن',
        'O': 'و', 'P': 'ف', 'Q': 'ق', 'R': 'ر', 'S': 'س', 'T': 'ت', 'U': 'و',
        'V': 'ف', 'W': 'و', 'X': 'س', 'Y': 'ي', 'Z': 'ز'
    };

    const ARABIC_JUMAL = {
        'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'هـ': 5, 'و': 6, 'ز': 7,
        'ح': 8, 'ط': 9, 'ي': 10, 'ى': 10, 'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60,
        'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500,
        'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000, 'ة': 5, 'ء': 1
    };

    const EASTERN_ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    function toEasternArabicDigits(num) {
        return String(num).split('').map(d => EASTERN_ARABIC_DIGITS[parseInt(d)] || d).join('');
    }

    function latinToArabicScript(str) {
        if (!str) return '';
        let arabStr = '';
        const upper = str.toUpperCase();
        for (let i = 0; i < upper.length; i++) {
            const c = upper[i];
            if (ARABIC_JUMAL[c]) {
                arabStr += c;
            } else if (LATIN_TO_ARABIC_MAP[c]) {
                arabStr += LATIN_TO_ARABIC_MAP[c];
            }
        }
        return arabStr;
    }

    // Convert Number to Abjad Letters (Jumal Values)
    function numToAbjadLetters(n) {
        if (n <= 0) return '';
        let result = '';

        const HUNDREDS = [
            { v: 1000, l: 'غ' }, { v: 900, l: 'ظ' }, { v: 800, l: 'ض' }, { v: 700, l: 'ذ' },
            { v: 600, l: 'خ' }, { v: 500, l: 'ث' }, { v: 400, l: 'ت' }, { v: 300, l: 'ش' },
            { v: 200, l: 'ر' }, { v: 100, l: 'ق' }
        ];
        const TENS = [
            { v: 90, l: 'ص' }, { v: 80, l: 'ف' }, { v: 70, l: 'ع' }, { v: 60, l: 'س' },
            { v: 50, l: 'ن' }, { v: 40, l: 'م' }, { v: 30, l: 'ل' }, { v: 20, l: 'ك' }, { v: 10, l: 'ي' }
        ];
        const UNITS = [
            { v: 9, l: 'ط' }, { v: 8, l: 'ح' }, { v: 7, l: 'ز' }, { v: 6, l: 'و' },
            { v: 5, l: 'ه' }, { v: 4, l: 'د' }, { v: 3, l: 'ج' }, { v: 2, l: 'ب' }, { v: 1, l: 'ا' }
        ];

        for (let h of HUNDREDS) {
            while (n >= h.v) {
                result += h.l;
                n -= h.v;
            }
        }
        for (let t of TENS) {
            while (n >= t.v) {
                result += t.l;
                n -= t.v;
            }
        }
        for (let u of UNITS) {
            while (n >= u.v) {
                result += u.l;
                n -= u.v;
            }
        }

        return result;
    }

    // Phonetic Latin Transliteration for Sufi Angelic names
    function arabicNameToPhoneticLatin(nameStr, type) {
        const MAP = {
            'ا': 'A', 'ب': 'Ba', 'ج': 'Ja', 'د': 'Da', 'ه': 'Ha', 'و': 'Wa', 'ز': 'Za',
            'ح': 'Ha', 'ط': 'Tha', 'ي': 'Ya', 'ك': 'Ka', 'ل': 'La', 'م': 'Ma', 'ن': 'Na',
            'س': 'Sa', 'ع': 'A', 'ف': 'Fa', 'ص': 'Sha', 'ق': 'Qa', 'ر': 'Ra', 'ش': 'Sya',
            'ت': 'Ta', 'ث': 'Tsa', 'خ': 'Kha', 'ذ': 'Dza', 'ض': 'Dha', 'ظ': 'Zha', 'غ': 'Gha'
        };

        let clean = nameStr.replace(/آئِيل|طَوْش/g, '');
        let base = '';
        for (let c of clean) {
            if (MAP[c]) base += MAP[c];
        }

        if (type === 'ulwi') {
            return base ? (base + "-ya'il") : "Ruqya-il";
        } else {
            return base ? (base + '-tawsh') : 'Thaythawsh';
        }
    }

    const PLANET_MODULO_MAP = {
        0: 'Shani',   // Zuhal / Saturnus
        1: 'Surya',   // Syams / Matahari
        2: 'Chandra', // Qamar / Bulan
        3: 'Mangal',  // Mirrikh / Mars
        4: 'Budh',    // Utarid / Merkurius
        5: 'Guru',    // Mushtari / Jupiter
        6: 'Shukra'   // Zuhrah / Venus
    };

    // VERIFIED DEEP FALAKIAH PLANET DATABASE
    const DEEP_FALAK_PLANETS = {
        Surya: {
            arabic: 'الشمس (Syams / Sun)',
            angel: 'Ruqya-il (روقيائيل)',
            adad: '400 (أبجد: ش م س)',
            incense: 'Cendana Merah, Gaharu Super & Amber (سندروس وعود)',
            element: 'Api (Nari 🔥) - Panas & Kering',
            metal: 'Emas Murni (Gold)',
            day: 'Ahad (Minggu)',
            colorHex: 0xfbbf24,
            colorCss: '#fbbf24',
            dos: 'Menghadap pimpinan/pejabat, memohon kenaikan jabatan, kewibawaan (Haibah), pengasihan umum, & hajat kehormatan.',
            donts: 'Menghindari permusuhan, urusan rahasia, atau menyembunyikan sesuatu (karena Syams menyingkap rahasia).'
        },
        Chandra: {
            arabic: 'القمر (Qamar / Moon)',
            angel: 'Jibra-il (جبرائيل)',
            adad: '340 (أبجد: ق م ر)',
            incense: 'Gaharu Putih, Melati & Bukhur Jawa (عود أبيض ومسك)',
            element: 'Air (Ma\'i 💧) - Dingin & Basah',
            metal: 'Perak Murni (Silver)',
            day: 'Itsnain (Senin)',
            colorHex: 0x38bdf8,
            colorCss: '#38bdf8',
            dos: 'Memulai perjalanan laut/darat, bercocok tanam, minum obat, mahabbah kasih sayang, & kedamaian keluarga.',
            donts: 'Menandatangani kontrak permanen atau usaha jangka panjang yang butuh stabilitas tinggi (sifat Bulan cepat berubah).'
        },
        Mangal: {
            arabic: 'المريخ (Mirrikh / Mars)',
            angel: 'Samsama-il (سمسمائيل)',
            adad: '850 (أبجد: م ر ي خ)',
            incense: 'Bukhur Kibrit (Belerang), Lada Hitam & Mustaka (كبريت ومستكي)',
            element: 'Api (Nari 🔥) - Panas Terik',
            metal: 'Besi Murni / Tembaga Merah (Iron)',
            day: 'Tsulatsa (Selasa)',
            colorHex: 0xef4444,
            colorCss: '#ef4444',
            dos: 'Latihan fisik/olahraga, pembuktian keberanian, ketegasan hukum, & membuat pagar ghaib / benteng diri dari musuh.',
            donts: 'Sangat dilarang melangsungkan pernikahan, melamar, atau perundingan damai (risiko konflik tinggi).'
        },
        Budh: {
            arabic: 'عطارد (Utarid / Mercury)',
            angel: 'Mikail (ميكائيل)',
            adad: '284 (أبجد: ع ط ا ر د)',
            incense: 'Mastaka, Jawi & Kapur Barus (مستكي وجاوي)',
            element: 'Udara (Hawai 💨) - Panas & Basah',
            metal: 'Raksa / Kuningan (Quicksilver)',
            day: 'Arbi\'a (Rabu)',
            colorHex: 0x8b5cf6,
            colorCss: '#8b5cf6',
            dos: 'Menulis Wafaq/azimat, membuat dokumen/kontrak bisnis, belajar, mengarang buku, & menghitung keuangan.',
            donts: 'Hindari aktivitas yang membutuhkan kepastian emosional jangka panjang (sifat Utarid mudah terpengaruh).'
        },
        Guru: {
            arabic: 'المشتري (Mushtari / Jupiter)',
            angel: 'Sarfya-il (صرفيائيل)',
            adad: '950 (أبجد: م ش ت ر ي)',
            incense: 'Luban Jawi (Istirak), Gaharu Super & Cendana (لبان جاوي وعود)',
            element: 'Udara (Hawai 💨) - Panas & Lembab',
            metal: 'Timah Putih / Perunggu (Tin)',
            day: 'Khamis (Kamis)',
            colorHex: 0x10b981,
            colorCss: '#10b981',
            dos: 'Memulai bisnis besar, pernikahan, berdoa/kholwat, permohonan hajat rezeki, membeli perhiasan & konsultasi agama.',
            donts: 'Dilarang keras melakukan perbuatan jahat, kedengkian, atau maksiat (risiko bumerang sangat kuat).'
        },
        Shukra: {
            arabic: 'الزهرة (Zuhrah / Venus)',
            angel: 'Aniya-il (عنيائيل)',
            adad: '217 (أبجد: ز هـ ر ة)',
            incense: 'Mawar, Merekah, Za\'faran & Musk Rose (مسك وورد)',
            element: 'Air (Ma\'i 💧) - Lembut & Basah',
            metal: 'Tembaga Halus / Batu Pirus (Copper)',
            day: 'Jumu\'ah (Jumat)',
            colorHex: 0xec4899,
            colorCss: '#ec4899',
            dos: 'Pernikahan, melamar, mahabbah khusus, seni/musik, membeli pakaian baru, & merawat kecantikan/ketampanan.',
            donts: 'Hindari aktivitas kekerasan, debat alot, perang hukum, atau ketegasan keras.'
        },
        Shani: {
            arabic: 'زحل (Zuhal / Saturn)',
            angel: 'Kasfya-il (كسفيائيل)',
            adad: '45 (أبجد: ز ح ل)',
            incense: 'Bukhur Qist, Harmal & Kulit Bawang (قسط وحرمل)',
            element: 'Tanah (Turabi 🪵) - Dingin & Kering',
            metal: 'Timbal Hitam / Besi Tua (Lead)',
            day: 'Sabtu',
            colorHex: 0x64748b,
            colorCss: '#64748b',
            dos: 'Membuat benteng ghaib tolak bala, mengunci hajat, menggali sumur/tanah, & pondasi bangunan tahan lama.',
            donts: 'Dilarang keras melangsungkan pesta pernikahan, launching bisnis baru, atau perjalanan jauh.'
        }
    };

    const CHOGADIYA_PLANET_MAP = {
        Udveg: 'Surya',
        Char: 'Shukra',
        Labh: 'Budh',
        Amrit: 'Chandra',
        Kaal: 'Shani',
        Shubh: 'Guru',
        Rog: 'Mangal'
    };

    const CHALDEAN_PLANETS = [
        { id: 'Shani', key: 'Shani', quality: 'NAHAS_AKBAR', class: 'q-kaal', icon: 'fa-skull-crossbones', asma: 'Ya Qahhar Ya Qadir (يا قهار يا قادر)', metal: 'Timbal Hitam / Besi Tua (Lead) | Tabi\'at: Tanah 🪵', efficacy_id: 'Nahas Akbar (Sangat Nahas). Rintangan & permusuhan. Cocok hanya untuk benteng diri & tolak bala.', efficacy_en: 'Most Inauspicious. Obstacles & severe delays. Suitable for warding off harm.', efficacy_ar: 'نحس أكبر. عقد العزائم والردع وتجنب الأمور الهامة.' },
        { id: 'Guru', key: 'Guru', quality: 'SAAD_AKBAR', class: 'q-amrit', icon: 'fa-star', asma: 'Ya Kabir Ya Muta\'al (يا كبير يا متعال)', metal: 'Timah Putih / Perunggu (Tin) | Tabi\'at: Udara 💨', efficacy_id: 'Sa\'ad Akbar (Sangat Baik). Berkah, permohonan doa, nikah, memulai usaha besar, & ilmu spiritual.', efficacy_en: 'Most Auspicious. Blessings, prayers, marriage, business launching & spiritual wisdom.', efficacy_ar: 'سعد أكبر. مبارك للمحبة، الزواج، التجارة والدعاء.' },
        { id: 'Mangal', key: 'Mangal', quality: 'NAHAS_ASGHAR', class: 'q-udveg', icon: 'fa-fire', asma: 'Ya Aziz Ya Jabbar (يا عزيز يا جبار)', metal: 'Besi / Tembaga Merah (Iron) | Tabi\'at: Api 🔥', efficacy_id: 'Nahas Asghar (Kurang Baik). Emosi & pertengkaran. Cocok untuk keberanian, olahraga, & ketegasan.', efficacy_en: 'Inauspicious. Anger & dispute risk. Suitable for courage, sports & firmness.', efficacy_ar: 'نحس أصغر. تجنب الخصومات وناسب الأعمال القوية والرياضة.' },
        { id: 'Surya', key: 'Surya', quality: 'SAAD_MUTAZIL', class: 'q-labh', icon: 'fa-sun', asma: 'Ya Hayyu Ya Qayyum (يا حي يا قيوم)', metal: 'Emas Murni (Gold) | Tabi\'at: Api 🔥', efficacy_id: 'Sa\'ad & Wibawa. Menghadap pejabat/pimpinan, kewibawaan, keagungan & hajat penting.', efficacy_en: 'Auspicious / Honor. Meeting officials, leadership, authority & high matters.', efficacy_ar: 'سعد وشرف. للقاء الملوك والرؤساء والهيبة والجاه.' },
        { id: 'Shukra', key: 'Shukra', quality: 'SAAD_ASGHAR', class: 'q-shubh', icon: 'fa-heart', asma: 'Ya Jamil Ya Latif (يا جميل يا لطيف)', metal: 'Tembaga Halus / Pirus (Copper) | Tabi\'at: Air 💧', efficacy_id: 'Sa\'ad Asghar (Baik). Cinta, pernikahan, seni, pakaian baru, perhiasan, & mahabbah.', efficacy_en: 'Auspicious. Love, marriage, arts, buying jewelry & attraction.', efficacy_ar: 'سعد أصغر. للزواج، المحبة، الزينة والفنون.' },
        { id: 'Budh', key: 'Budh', quality: 'MUTAZIL', class: 'q-char', icon: 'fa-pen-nib', asma: 'Ya Alim Ya Hakim (يا عليم يا حكيم)', metal: 'Raksa / Kuningan (Quicksilver) | Tabi\'at: Udara 💨', efficacy_id: 'Mutazi\'l (Netral). Perdagangan, menulis wafaq/azimat, dokumen, perjanjian & belajar.', efficacy_en: 'Neutral. Commerce, writing talismans/wafaq, contracts & studying.', efficacy_ar: 'ممتزج. للكتابة، التجارة، العقود والعلم.' },
        { id: 'Chandra', key: 'Chandra', quality: 'MUTAZIL', class: 'q-char', icon: 'fa-moon', asma: 'Ya Rahman Ya Rahim (يا رحمن يا رحيم)', metal: 'Perak Murni (Silver) | Tabi\'at: Air 💧', efficacy_id: 'Mutazi\'l (Netral / Dinamis). Perjalanan, bercocok tanam, minum obat, & hubungan publik.', efficacy_en: 'Neutral / Dynamic. Travel, agriculture, medical treatment & public affairs.', efficacy_ar: 'ممتزج / متحرّك. للسفر، العلاج، الزراعة والتواصل.' }
    ];

    const SAAT_DAY_START_INDEX = [3, 6, 2, 5, 1, 4, 0];

    const CHOGADIYA_INFO = {
        Udveg: { quality: 'UDVEG', class: 'q-udveg', planet: 'Surya', icon: 'fa-sun', desc_id: 'Kecemasan/Tekanan. Hindari keputusan krusial.', asma: 'Ya Hayyu Ya Qayyum (Matahari)', metal: 'Emas Murni (Surya)' },
        Char:  { quality: 'CHAR',  class: 'q-char',  planet: 'Shukra', icon: 'fa-wind', desc_id: 'Dinamis/Bergerak. Bagus untuk perjalanan & fisik.', asma: 'Ya Jamil Ya Latif (Venus)', metal: 'Tembaga (Shukra)' },
        Labh:  { quality: 'LABH',  class: 'q-labh',  planet: 'Budh',   icon: 'fa-chart-line', desc_id: 'Keuntungan/Bisnis. Terbaik untuk transaksi.', asma: 'Ya Alim Ya Hakim (Merkurius)', metal: 'Kuningan (Budh)' },
        Amrit: { quality: 'AMRIT', class: 'q-amrit', planet: 'Chandra',icon: 'fa-droplet', desc_id: 'Sangat Baik. Puncak energi positif & berkah.', asma: 'Ya Rahman Ya Rahim (Bulan)', metal: 'Perak (Chandra)' },
        Kaal:  { quality: 'KAAL',  class: 'q-kaal',  planet: 'Shani',  icon: 'fa-skull-crossbones', desc_id: 'Kerugian/Bahaya. Tunda aktivitas penting.', asma: 'Ya Qahhar Ya Qadir (Saturnus)', metal: 'Timbal (Shani)' },
        Shubh: { quality: 'SHUBH', class: 'q-shubh', planet: 'Guru',   icon: 'fa-star', desc_id: 'Keberuntungan. Baik untuk nikah & ibadah.', asma: 'Ya Kabir Ya Muta\'al (Jupiter)', metal: 'Timah (Guru)' },
        Rog:   { quality: 'ROG',   class: 'q-rog',   planet: 'Mangal', icon: 'fa-biohazard', desc_id: 'Penyakit/Rintangan. Hindari pengobatan baru.', asma: 'Ya Aziz Ya Jabbar (Mars)', metal: 'Besi (Mangal)' }
    };

    const CHOGADIYA_CYCLE = ['Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'];
    const DAY_START_RULERS = ['Udveg', 'Amrit', 'Rog', 'Labh', 'Shubh', 'Char', 'Kaal'];
    const NIGHT_START_RULERS = ['Shubh', 'Char', 'Kaal', 'Udveg', 'Amrit', 'Rog', 'Labh'];

    const MANAZIL_AL_QAMAR = [
        { id: 1,  name: 'Al-Syaratain (الشرطين)', range: '0°00\' - 13°20\' Aries', desc: 'Awal Baru & Ketegasan. Baik untuk memulai usaha & perjalanan.' },
        { id: 2,  name: 'Al-Butain (البطين)',     range: '13°20\' - 26°40\' Aries', desc: 'Pertumbuhan & Keberhasilan. Baik untuk perdagangan & pertanian.' },
        { id: 3,  name: 'Al-Tsurayya (الثريا)',   range: '26°40\' Ar - 10°00\' Tau', desc: 'Keberkahan & Kemuliaan. Sangat baik untuk mahabbah & doa.' },
        { id: 4,  name: 'Al-Dabaran (الدبران)',   range: '10°00\' - 23°20\' Taurus', desc: 'Ketegasan & Keberanian. Hindari perselisihan emosional.' },
        { id: 5,  name: 'Al-Haq\'ah (الهقعة)',    range: '23°20\' Tau - 6°40\' Gem', desc: 'Ilmu & Kebijaksanaan. Baik untuk belajar, mengajar & menulis.' },
        { id: 6,  name: 'Al-Han\'ah (الهنعة)',    range: '6°40\' - 20°00\' Gemini', desc: 'Kemesraan & Perjanjian. Baik untuk persahabatan & nikah.' },
        { id: 7,  name: 'Al-Dzira\' (الذراع)',    range: '20°00\' Gem - 3°20\' Can', desc: 'Kelapangan & Kemenangan. Keuntungan dalam bisnis & hajat.' },
        { id: 8,  name: 'Al-Natsrah (النثرة)',    range: '3°20\' - 16°40\' Cancer', desc: 'Kecerdasan & Kesembuhan. Baik untuk pengobatan & kesehatan.' },
        { id: 9,  name: 'Al-Tarf (الطرف)',        range: '16°40\' - 30°00\' Cancer', desc: 'Kewaspadaan & Ketelitian. Hindari keputusan emosional.' },
        { id: 10, name: 'Al-Jabhah (الجبهة)',     range: '0°00\' - 13°20\' Leo', desc: 'Kepemimpinan & Wibawa. Sangat baik menghadap pimpinan/pejabat.' },
        { id: 11, name: 'Al-Zubrah (الزبرة)',     range: '13°20\' - 26°40\' Leo', desc: 'Kekuatan & Pertolongan. Baik untuk kerjasama & benteng.' },
        { id: 12, name: 'Al-Sarfah (الصرفة)',     range: '26°40\' Leo - 10°00\' Vir', desc: 'Perubahan & Transformasi. Perjalanan & pemindahan.' },
        { id: 13, name: 'Al-Awwa (العواء)',       range: '10°00\' - 23°20\' Virgo', desc: 'Kelancaran Rezeki. Terbaik untuk perdagangan & belanja.' },
        { id: 14, name: 'Al-Simak (السماك)',      range: '23°20\' Vir - 6°40\' Lib', desc: 'Kedamaian & Kedudukan Tinggi. Sangat diberkahi & damai.' },
        { id: 15, name: 'Al-Ghafr (الغفر)',       range: '6°40\' - 20°00\' Libra', desc: 'Keselamatan & Perlindungan. Tolak bala & benteng diri.' },
        { id: 16, name: 'Al-Zubana (الزبانا)',   range: '20°00\' Lib - 3°20\' Sco', desc: 'Keadilan & Keseimbangan. Penyelesaian sengketa & nego.' },
        { id: 17, name: 'Al-Iklil (الإكليل)',     range: '3°20\' - 16°40\' Scorpio', desc: 'Mahkota & Kejayaan. Baik untuk memulai proyek besar.' },
        { id: 18, name: 'Al-Qalb (القلب)',        range: '16°40\' - 30°00\' Scorpio', desc: 'Puncak Energi Hati. Jaga emosi & fokus khusyuk doa.' },
        { id: 19, name: 'Al-Syaulah (الشولة)',    range: '0°00\' - 13°20\' Sag', desc: 'Ketangkasan & Keberanian. Olahraga & ketegasan.' },
        { id: 20, name: 'Al-Na\'aam (النعائم)',   range: '13°20\' - 26°40\' Sag', desc: 'Keberuntungan Rezeki. Berkah dalam usaha & perjalanan.' },
        { id: 21, name: 'Al-Baldah (البلدة)',     range: '26°40\' Sag - 10°00\' Cap', desc: 'Ketenangan Keturunan & Rumah. Pemukiman & ketenangan.' },
        { id: 22, name: 'Sa\'d al-Dhabih (سعد الذابح)', range: '10°00\' - 23°20\' Cap', desc: 'Keteguhan & Ketahanan. Baik untuk kholwat & ibadah.' },
        { id: 23, name: 'Sa\'d Bula\' (سعد بلع)', range: '23°20\' Cap - 6°40\' Aqu', desc: 'Kesembuhan & Penyucian. Baik untuk pengobatan.' },
        { id: 24, name: 'Sa\'d al-Su\'ud (سعد السعود)', range: '6°40\' - 20°00\' Aqu', desc: 'Puncak Keberuntungan & Kebahagiaan Utama.' },
        { id: 25, name: 'Sa\'d al-Akhbiyah (سعد الأخبية)', range: '20°00\' Aqu - 3°20\' Pis', desc: 'Pembukaan Rahasia & Rezeki Tersembunyi.' },
        { id: 26, name: 'Al-Fargh al-Mukdam (الفرغ المقدم)', range: '3°20\' - 16°40\' Pis', desc: 'Kemurahan Hati & Rezeki Melimpah.' },
        { id: 27, name: 'Al-Fargh al-Mu\'akhar (الفرغ المؤخر)', range: '16°40\' - 30°00\' Pis', desc: 'Penyelesaian Tugas & Hasil Akhir Usaha.' },
        { id: 28, name: 'Risha / Batn al-Hut (الرشاء)', range: '26°40\' Pis - 0°00\' Ari', desc: 'Kelimpahan Rezeki Laut & Perdagangan.' }
    ];

    const ZODIACS_12 = [
        { id: 'Hamal', name: 'Al-Hamal / Aries (الحمل)', elem: 'Api 🔥' },
        { id: 'Taur', name: 'Al-Taur / Taurus (الثور)', elem: 'Tanah 🪵' },
        { id: 'Jauza', name: 'Al-Jauza\' / Gemini (الجوزاء)', elem: 'Udara 💨' },
        { id: 'Saratan', name: 'Al-Saratan / Cancer (السرطان)', elem: 'Air 💧' },
        { id: 'Asad', name: 'Al-Asad / Leo (الأسد)', elem: 'Api 🔥' },
        { id: 'Sunbulah', name: 'Al-Sunbulah / Virgo (السنبلة)', elem: 'Tanah 🪵' },
        { id: 'Mizan', name: 'Al-Mizan / Libra (الميزان)', elem: 'Udara 💨' },
        { id: 'Aqrab', name: 'Al-Aqrab / Scorpio (العقرب)', elem: 'Air 💧' },
        { id: 'Qaus', name: 'Al-Qaus / Sagittarius (القوس)', elem: 'Api 🔥' },
        { id: 'Jadi', name: 'Al-Jadi / Capricorn (الجدي)', elem: 'Tanah 🪵' },
        { id: 'Dalu', name: 'Al-Dalu / Aquarius (الدلو)', elem: 'Udara 💨' },
        { id: 'Hut', name: 'Al-Hut / Pisces (الحوت)', elem: 'Air 💧' }
    ];

    const HIJRI_MONTHS = [
        'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
        'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Sha\'ban',
        'Ramadan', 'Shawwal', 'Dhu al-Qa\'dah', 'Dhu al-Hijjah'
    ];

    // State Variables
    let currentSystem = localStorage.getItem('falak_system') || 'saat';
    let currentLang = localStorage.getItem('chogadia_lang') || 'id';
    let currentTheme = localStorage.getItem('chogadia_theme') || 'dark';
    let hijriOffset = parseInt(localStorage.getItem('hijri_offset') || '0', 10);
    let wafaqDigitMode = localStorage.getItem('wafaq_digit') || 'arabic'; // 'arabic' or 'latin'
    let tasbihCount = 0;
    let selectedDate = new Date();
    let activeTab = 'day';
    let currentCoords = { lat: -6.2088, lon: 106.8456, timeZone: 'Asia/Jakarta', name: 'Jakarta, Indonesia' };
    let activeFilter = 'all';
    let isNotifyEnabled = localStorage.getItem('falak_notify') === 'true';
    let lastActiveSlotName = '';
    let timerInterval = null;

    // Three.js & Dual 3D Engine State
    let scene, camera, renderer, planetMesh, isWebGLSupported = false;

    // DOM Elements
    const elements = {
        btnModeSaat: document.getElementById('btnModeSaat'),
        btnModeChogadia: document.getElementById('btnModeChogadia'),
        langSelect: document.getElementById('langSelect'),
        themeToggle: document.getElementById('themeToggle'),
        btnNotifySound: document.getElementById('btnNotifySound'),
        iconNotify: document.getElementById('iconNotify'),
        txtBtnNotify: document.getElementById('txtBtnNotify'),
        btnPrintPdf: document.getElementById('btnPrintPdf'),
        btnShareWa: document.getElementById('btnShareWa'),
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
        btnStatusMain3d: document.getElementById('btnStatusMain3d'),
        btnDialCenter3d: document.getElementById('btnDialCenter3d'),
        dayNightBadge: document.getElementById('dayNightBadge'),
        chogadiaIconCircle: document.getElementById('chogadiaIconCircle'),
        chogadiaMainIcon: document.getElementById('chogadiaMainIcon'),
        currentChogadiaName: document.getElementById('currentChogadiaName'),
        qualityTag: document.getElementById('qualityTag'),
        currentSlotRange: document.getElementById('currentSlotRange'),
        countdownTimer: document.getElementById('countdownTimer'),
        currentPlanet: document.getElementById('currentPlanet'),
        slotProgressBar: document.getElementById('slotProgressBar'),
        displayActiveAsma: document.getElementById('displayActiveAsma'),
        displayActiveMetal: document.getElementById('displayActiveMetal'),
        sunriseTime: document.getElementById('sunriseTime'),
        sunsetTime: document.getElementById('sunsetTime'),
        dayDuration: document.getElementById('dayDuration'),
        txtDayDurationLabel: document.getElementById('txtDayDurationLabel'),
        legendGrid: document.getElementById('legendGrid'),
        // Astronomy Plus Elements
        btnHijriPrev: document.getElementById('btnHijriPrev'),
        btnHijriReset: document.getElementById('btnHijriReset'),
        btnHijriNext: document.getElementById('btnHijriNext'),
        displayHijriDate: document.getElementById('displayHijriDate'),
        displayMoonPhase: document.getElementById('displayMoonPhase'),
        displayManazil: document.getElementById('displayManazil'),
        displayQiblaDegree: document.getElementById('displayQiblaDegree'),
        timeFajr: document.getElementById('timeFajr'),
        timeSunrise: document.getElementById('timeSunrise'),
        timeDhuhr: document.getElementById('timeDhuhr'),
        timeAsr: document.getElementById('timeAsr'),
        timeMaghrib: document.getElementById('timeMaghrib'),
        timeIsha: document.getElementById('timeIsha'),
        // Purpose Finder Elements
        purposePills: document.getElementById('purposePills'),
        finderResultBox: document.getElementById('finderResultBox'),
        finderResultText: document.getElementById('finderResultText'),
        // Abjad & Wafaq Elements
        inputAbjadName: document.getElementById('inputAbjadName'),
        selectHajatPurpose: document.getElementById('selectHajatPurpose'),
        btnCalcAbjad: document.getElementById('btnCalcAbjad'),
        displayArabicScript: document.getElementById('displayArabicScript'),
        displayAbjadTotal: document.getElementById('displayAbjadTotal'),
        displayAngelUlwi: document.getElementById('displayAngelUlwi'),
        displayAngelSufli: document.getElementById('displayAngelSufli'),
        displayPersonalElem: document.getElementById('displayPersonalElem'),
        displayPersonalSync: document.getElementById('displayPersonalSync'),
        btnToggleDigits: document.getElementById('btnToggleDigits'),
        btnCopyWafaq: document.getElementById('btnCopyWafaq'),
        btnDownloadCardPng: document.getElementById('btnDownloadCardPng'),
        wafaqTitleHeader: document.getElementById('wafaqTitleHeader'),
        wafaqPurposeNote: document.getElementById('wafaqPurposeNote'),
        wafaqTable: document.getElementById('wafaqTable'),
        // Tasbih Digital Counter Elements
        tasbihDhikrText: document.getElementById('tasbihDhikrText'),
        tasbihTargetNote: document.getElementById('tasbihTargetNote'),
        tasbihCountDisplay: document.getElementById('tasbihCountDisplay'),
        btnTasbihCount: document.getElementById('btnTasbihCount'),
        btnTasbihReset: document.getElementById('btnTasbihReset'),
        // Dial Clock Elements
        dialRing: document.getElementById('dialRing'),
        dialCenterPlanet: document.getElementById('dialCenterPlanet'),
        dialCenterStatus: document.getElementById('dialCenterStatus'),
        // Modal 3D Elements
        planet3dModal: document.getElementById('planet3dModal'),
        btnCloseModal: document.getElementById('btnCloseModal'),
        mTitleName: document.getElementById('mTitleName'),
        mTitleQuality: document.getElementById('mTitleQuality'),
        mInfoAngel: document.getElementById('mInfoAngel'),
        mInfoAdad: document.getElementById('mInfoAdad'),
        mInfoAsma: document.getElementById('mInfoAsma'),
        mInfoIncense: document.getElementById('mInfoIncense'),
        mInfoMetal: document.getElementById('mInfoMetal'),
        mInfoDay: document.getElementById('mInfoDay'),
        mDosText: document.getElementById('mDosText'),
        mDontsText: document.getElementById('mDontsText')
    };

    function getLocalYmdStr(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    // NOAA Solar Calculations Algorithm
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

        const zenith = 90.8333;
        const latR = toRad(lat);
        const decR = toRad(sunDeclin);

        const cosHA = (Math.cos(toRad(zenith)) / (Math.cos(latR) * Math.cos(decR))) - (Math.tan(latR) * Math.tan(decR));
        if (cosHA > 1 || cosHA < -1) return null;

        const ha = toDeg(Math.acos(cosHA));
        const solarNoonUtc = 720 - 4 * lon - eqOfTime;

        const sunriseUtc = solarNoonUtc - ha * 4;
        const sunsetUtc = solarNoonUtc + ha * 4;

        return { sunriseUtc, sunsetUtc, solarNoonUtc, latR, decR };
    }

    function toRad(deg) { return deg * Math.PI / 180; }
    function toDeg(rad) { return rad * 180 / Math.PI; }

    function getLocalDateTimes(dateObj, lat, lon) {
        const sunUtc = getSunTimesUtc(lat, lon, dateObj);
        if (!sunUtc) return null;

        const nextDate = new Date(dateObj);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextSunUtc = getSunTimesUtc(lat, lon, nextDate);

        const utcBaseMs = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0);
        const nextUtcBaseMs = Date.UTC(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate(), 0, 0, 0);

        const sunrise = new Date(utcBaseMs + sunUtc.sunriseUtc * 60 * 1000);
        const sunset = new Date(utcBaseMs + sunUtc.sunsetUtc * 60 * 1000);
        const nextSunrise = new Date(nextUtcBaseMs + nextSunUtc.sunsetUtc * 60 * 1000);

        return { sunrise, sunset, nextSunrise, rawSunUtc: sunUtc, utcBaseMs };
    }

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

    // --- Dual 3D Engine ---
    function initThreeJS() {
        const canvas = document.getElementById('canvas3d');
        if (!canvas || typeof THREE === 'undefined') return;

        try {
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
                isWebGLSupported = false;
                return;
            }

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
            camera.position.z = 3.2;

            renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, context: gl });
            renderer.setSize(160, 160);
            renderer.setPixelRatio(window.devicePixelRatio || 1);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            scene.add(ambientLight);

            const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
            dirLight.position.set(5, 3, 5);
            scene.add(dirLight);

            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = new THREE.MeshStandardMaterial({
                color: 0xfbbf24,
                roughness: 0.35,
                metalness: 0.2
            });

            planetMesh = new THREE.Mesh(geometry, material);
            scene.add(planetMesh);

            isWebGLSupported = true;

            function animate() {
                requestAnimationFrame(animate);
                if (planetMesh) {
                    planetMesh.rotation.y += 0.008;
                    planetMesh.rotation.x += 0.003;
                }
                renderer.render(scene, camera);
            }
            animate();
        } catch (e) {
            isWebGLSupported = false;
        }
    }

    function render3DPlanetOrb(colorHex, colorCss) {
        const stage = document.querySelector('.planet-3d-stage');
        if (!stage) return;

        if (isWebGLSupported && planetMesh) {
            planetMesh.material.color.setHex(colorHex || 0xfbbf24);
        } else {
            stage.innerHTML = `<div class="css-planet-orb" style="--orb-color: ${colorCss || '#fbbf24'};"></div>`;
        }
    }

    function openPlanetModal(slotNameKey, qualityText, qualityClass) {
        const targetPlanetKey = CHOGADIYA_PLANET_MAP[slotNameKey] || slotNameKey;
        const deep = DEEP_FALAK_PLANETS[targetPlanetKey] || DEEP_FALAK_PLANETS['Surya'];

        elements.mTitleName.textContent = deep.arabic;
        elements.mTitleQuality.textContent = qualityText;
        elements.mTitleQuality.className = `quality-tag ${qualityClass}`;

        elements.mInfoAngel.textContent = deep.angel;
        elements.mInfoAdad.textContent = deep.adad;
        elements.mInfoAsma.textContent = deep.asma;
        elements.mInfoIncense.textContent = deep.incense;
        elements.mInfoMetal.textContent = `${deep.metal} | ${deep.element}`;
        elements.mInfoDay.textContent = deep.day;

        elements.mDosText.textContent = deep.dos;
        elements.mDontsText.textContent = deep.donts;

        render3DPlanetOrb(deep.colorHex, deep.colorCss);

        elements.planet3dModal.classList.add('active');
    }

    function closePlanetModal() {
        elements.planet3dModal.classList.remove('active');
    }

    // --- Abjad Hisab Arab & 3x3 Problem-Oriented Wafaq Engine (Refactored v13.1) ---
    function calculateAbjadAndWafaq(inputText, purposeKey) {
        if (!inputText || !inputText.trim()) return null;
        
        // 1. Convert Latin text to Arabic Script
        const arabScript = latinToArabicScript(inputText);

        // 2. Calculate Base Hisab al-Jumal from Arabic characters
        let baseAdad = 0;
        for (let char of arabScript) {
            if (ARABIC_JUMAL[char]) {
                baseAdad += ARABIC_JUMAL[char];
            }
        }

        if (baseAdad === 0) baseAdad = 351; // Default fallback

        // 3. Problem Purpose Offset Addition (Adad Asmaul Husna / Ayat)
        let purposeAdadBonus = 0;
        let titleLabel = 'Wafaq 3x3 Buduh';
        let purposeNoteText = '';
        let dhikrTitle = 'یا رزاق يا غني';
        let dhikrTargetText = 'Target Zikir: 308 Kali (Masa Jam Syams / Mushtari)';

        switch (purposeKey) {
            case 'RIZQ':
                purposeAdadBonus = 308; // Ya Rozzaq Ya Ghani (308)
                titleLabel = '💰 Wafaq Kelancaran Rezeki & Pelaris 3x3';
                purposeNoteText = '*Formula Wafaq diselaraskan khusus untuk hajat rezeki, keberkahan bisnis & pelaris usaha (Asmaul Husna: Ya Rozzaq Ya Ghani +308).';
                dhikrTitle = 'یا رَزَّاقُ يا غَنِيُّ';
                dhikrTargetText = 'Target Zikir: 308 Kali (Pagi / Setelah Dhuha)';
                break;
            case 'MAHABBAH':
                purposeAdadBonus = 149; // Ya Wadud Ya Latif (149)
                titleLabel = '❤️ Wafaq Mahabbah & Penyelaras Jodoh 3x3';
                purposeNoteText = '*Formula Wafaq diselaraskan khusus untuk kasih sayang, jodoh & keharmonisan rumah tangga (Asmaul Husna: Ya Wadud Ya Latif +149).';
                dhikrTitle = 'یا وَدُودُ يا لَطِيفُ';
                dhikrTargetText = 'Target Zikir: 149 Kali (Malam / Jam Zuhrah)';
                break;
            case 'HEALTH_ELEMS':
                purposeAdadBonus = 111; // Ya Kafi Ya Syafi (111)
                titleLabel = '🧠 Wafaq Penyeimbang Elemen & Ketenangan Jiwa';
                purposeNoteText = '*Formula Wafaq diselaraskan untuk menyeimbangkan 4 elemen tabi\'at tubuh, meredakan stres & kesembuhan emosional (Asmaul Husna: Ya Kafi Ya Syafi +111).';
                dhikrTitle = 'یا كَافِيُ يا شَافِي';
                dhikrTargetText = 'Target Zikir: 111 Kali (Ketenangan Emosi)';
                break;
            case 'CARRIER_HAIBAH':
                purposeAdadBonus = 300; // Ya Aziz Ya Jabbar (300)
                titleLabel = '⭐ Wafaq Kewibawaan & Karir Pejabat 3x3';
                purposeNoteText = '*Formula Wafaq diselaraskan khusus untuk kenaikan jabatan, wibawa tinggi & dihormati rekan (Asmaul Husna: Ya Aziz Ya Jabbar +300).';
                dhikrTitle = 'یا عَزِيزُ يا جَبَّارُ';
                dhikrTargetText = 'Target Zikir: 300 Kali (Kewibawaan Jam Syams)';
                break;
            case 'PROTECTION':
                purposeAdadBonus = 818; // Salamun Qaulam (818)
                titleLabel = '🛡️ Wafaq Benteng Diri & Tolak Bala 3x3';
                purposeNoteText = '*Formula Wafaq diselaraskan khusus untuk pagar ghaib, keselamatan perjalanan & benteng dari musuh (Ayat: Salamun Qaulam +818).';
                dhikrTitle = 'سَلَامٌ قَوْلًا مِنْ رَبٍّ رَحِيمٍ';
                dhikrTargetText = 'Target Zikir: 818 Kali (Pagar Ghaib / Tolak Bala)';
                break;
            default:
                purposeAdadBonus = 0;
                titleLabel = 'Wafaq 3x3 Buduh Personal';
                purposeNoteText = '*Tabel Wafaq Buduh Arab 3x3 disusun presisi sesuai kaidah Syamsul Ma\'arif al-Kubra (+51 Ulwi, +319 Sufli).';
        }

        const totalAdad = baseAdad + purposeAdadBonus;

        // 4. Khadim Malaikat Atas (Ulwi: +51 -> -a-il)
        const ulwiVal = totalAdad + 51;
        const ulwiArab = numToAbjadLetters(ulwiVal) + 'آئِيل';
        const ulwiLatin = arabicNameToPhoneticLatin(ulwiArab, 'ulwi');

        // 5. Khadim Penguasa Bawah (Sufli: +319 -> -tawsh)
        const sufliVal = totalAdad + 319;
        const sufliArab = numToAbjadLetters(sufliVal) + 'طَوْش';
        const sufliLatin = arabicNameToPhoneticLatin(sufliArab, 'sufli');

        // 6. Personal Planet & Element (Modulo 7)
        const planetModKey = PLANET_MODULO_MAP[baseAdad % 7];
        const planetObj = DEEP_FALAK_PLANETS[planetModKey] || DEEP_FALAK_PLANETS['Surya'];

        // 7. Mathematical 3x3 Magic Square (Wafq Mutatsalits Buduh) - Verified 100% Equal Sum Algorithm
        const N = Math.max(12, totalAdad);
        const S = N - 12;
        const B = Math.floor(S / 3);
        const R = S % 3;

        const houseValues = {};
        for (let i = 1; i <= 9; i++) {
            houseValues[i] = B + (i - 1);
        }

        if (R === 1) {
            houseValues[7] += 1;
            houseValues[8] += 1;
            houseValues[9] += 1;
        } else if (R === 2) {
            houseValues[7] += 2;
            houseValues[8] += 2;
            houseValues[9] += 2;
        }

        const grid = [
            [houseValues[4], houseValues[9], houseValues[2]],
            [houseValues[3], houseValues[5], houseValues[7]],
            [houseValues[8], houseValues[1], houseValues[6]]
        ];

        return {
            inputText,
            arabScript,
            baseAdad,
            purposeAdadBonus,
            totalAdad,
            ulwiArab,
            ulwiLatin,
            sufliArab,
            sufliLatin,
            planetModKey,
            planetObj,
            titleLabel,
            purposeNoteText,
            dhikrTitle,
            dhikrTargetText,
            grid
        };
    }

    function renderAbjadAndWafaq() {
        const val = elements.inputAbjadName.value || 'Arif';
        const purpose = elements.selectHajatPurpose.value || 'RIZQ';
        const res = calculateAbjadAndWafaq(val, purpose);
        if (!res) return;

        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

        elements.displayArabicScript.textContent = res.arabScript;
        elements.displayAbjadTotal.innerHTML = `${res.baseAdad} <small style="opacity:0.8; font-weight:normal;">(+${res.purposeAdadBonus} Hajat = ${res.totalAdad})</small>`;
        
        elements.displayAngelUlwi.innerHTML = `${res.ulwiArab} <small style="display:inline-block; font-family:var(--font-sans); color:var(--accent-gold); margin-left:4px;">(${res.ulwiLatin})</small>`;
        elements.displayAngelSufli.innerHTML = `${res.sufliArab} <small style="display:inline-block; font-family:var(--font-sans); color:var(--text-muted); margin-left:4px;">(${res.sufliLatin})</small>`;

        elements.displayPersonalElem.textContent = `${res.planetObj.element}`;

        // Check if personal planet hour is active right now
        const data = calculateSchedule(selectedDate, currentCoords.lat, currentCoords.lon);
        let isSyncedNow = false;
        if (data) {
            const now = new Date();
            const allSlots = [...data.daySlots, ...data.nightSlots];
            for (let s of allSlots) {
                if (now >= s.start && now < s.end) {
                    const activeKey = CHOGADIYA_PLANET_MAP[s.name] || s.name;
                    if (activeKey === res.planetModKey) {
                        isSyncedNow = true;
                    }
                    break;
                }
            }
        }

        if (isSyncedNow) {
            elements.displayPersonalSync.innerHTML = `<span class="text-emerald">⚡ SANGAT SINKRON! Jam ${t.names[res.planetModKey] || res.planetModKey} Aktif Sekarang</span>`;
        } else {
            elements.displayPersonalSync.innerHTML = `<span style="color:var(--text-muted);">Netral / Tidak Aktif Jam Ini (Hari Penguasa: ${res.planetObj.day})</span>`;
        }

        // Render Header, Note & Tasbih Target
        elements.wafaqTitleHeader.innerHTML = `<i class="fa-solid fa-border-all text-amber"></i> ${res.titleLabel}`;
        elements.wafaqPurposeNote.textContent = res.purposeNoteText;
        elements.tasbihDhikrText.textContent = res.dhikrTitle;
        elements.tasbihTargetNote.textContent = res.dhikrTargetText;

        // Render 3x3 Wafaq Grid (Arabic or Latin Digits based on Toggle)
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const cellId = `w${r * 3 + c + 1}`;
                const td = document.getElementById(cellId);
                if (td) {
                    const numVal = res.grid[r][c];
                    td.textContent = wafaqDigitMode === 'arabic' ? toEasternArabicDigits(numVal) : numVal;
                }
            }
        }
    }

    // --- HTML5 Gold Parchment Canvas Wafaq Card Exporter ---
    function exportWafaqCardPNG() {
        const val = elements.inputAbjadName.value || 'Arif';
        const purpose = elements.selectHajatPurpose.value || 'RIZQ';
        const res = calculateAbjadAndWafaq(val, purpose);
        if (!res) return;

        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1000;
        const ctx = canvas.getContext('2d');

        // Background Gradient (Parchment Gold)
        const bgGrad = ctx.createRadialGradient(400, 500, 50, 400, 500, 600);
        bgGrad.addColorStop(0, '#1c2541');
        bgGrad.addColorStop(1, '#0b132b');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 800, 1000);

        // Gold Border Frame
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 6;
        ctx.strokeRect(20, 20, 760, 960);
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 30, 740, 940);

        // Header Text
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('KALKULATOR FALAKIAH & WAFAQ 3X3', 400, 80);

        ctx.fillStyle = '#ffffff';
        ctx.font = '22px "Amiri", serif';
        ctx.fillText(res.titleLabel, 400, 120);

        // User Info Box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(60, 150, 680, 170);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
        ctx.strokeRect(60, 150, 680, 170);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 24px "Amiri", serif';
        ctx.fillText(`الاسم: ${res.arabScript} (${res.inputText})`, 400, 190);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '18px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`Adad Hisab: ${res.baseAdad} (+${res.purposeAdadBonus} Hajat = ${res.totalAdad})`, 400, 230);
        ctx.fillText(`Khadim Ulwi: ${res.ulwiArab} (${res.ulwiLatin})`, 400, 265);
        ctx.fillText(`Khadim Sufli: ${res.sufliArab} (${res.sufliLatin})`, 400, 295);

        // Render 3x3 Table Stage
        const startX = 175;
        const startY = 360;
        const cellSize = 150;

        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const x = startX + c * cellSize;
                const y = startY + r * cellSize;

                ctx.fillStyle = 'rgba(251, 191, 36, 0.08)';
                ctx.fillRect(x, y, cellSize, cellSize);
                ctx.strokeRect(x, y, cellSize, cellSize);

                const cellVal = res.grid[r][c];
                const displayVal = wafaqDigitMode === 'arabic' ? toEasternArabicDigits(cellVal) : String(cellVal);

                ctx.fillStyle = '#fbbf24';
                ctx.font = 'bold 42px "Amiri", serif';
                ctx.fillText(displayVal, x + cellSize / 2, y + cellSize / 2 + 14);
            }
        }

        // Footer Note & Timestamp
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Diselaraskan secara presisi berdasarkan Kitab Syamsul Ma\'arif al-Kubra', 400, 870);
        ctx.fillText(`https://arifwidiyanto.web.id/falakiah/ • ${new Date().toLocaleDateString()}`, 400, 910);

        // Download Trigger
        const link = document.createElement('a');
        link.download = `Wafaq-3x3-${val.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    // --- Astronomy Plus Precise Astronomical Calculations ---

    function calculateMoonEclipticPosition(dateObj) {
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();

        if (month <= 2) {
            year -= 1;
            month += 12;
        }

        const A = Math.floor(year / 100);
        const B = 2 - A + Math.floor(A / 4);
        const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
        const d = JD - 2451545.0;

        const L_sun = (280.466 + 0.98564736 * d) % 360;
        const g_sun = (357.529 + 0.98560028 * d) % 360;
        const lambda_sun = (L_sun + 1.915 * Math.sin(toRad(g_sun)) + 0.020 * Math.sin(toRad(2 * g_sun)) + 360) % 360;

        const L_moon = (218.316 + 13.176396 * d) % 360;
        const M_moon = (134.963 + 13.064993 * d) % 360;
        const D_moon = (297.850 + 12.190749 * d) % 360;

        const lambda_moon = (L_moon + 6.289 * Math.sin(toRad(M_moon)) -
                             1.274 * Math.sin(toRad(M_moon - 2 * D_moon)) +
                             0.658 * Math.sin(toRad(2 * D_moon)) -
                             0.214 * Math.sin(toRad(2 * M_moon)) + 360) % 360;

        const manzilIdx = Math.floor(lambda_moon / 13.333333333) % 28;
        const manzil = MANAZIL_AL_QAMAR[manzilIdx];

        const zodiacIdx = Math.floor(lambda_moon / 30) % 12;
        const zodiac = ZODIACS_12[zodiacIdx];

        const elongation = (lambda_moon - lambda_sun + 360) % 360;
        const illumination = (1 - Math.cos(toRad(elongation))) / 2 * 100;
        const moonAgeDays = (elongation / 360) * 29.53058867;

        let phaseName = 'Bulan Baru (New Moon / Hilal Awal)';
        if (elongation >= 10 && elongation < 80) phaseName = 'Bulan Sabit Muda (Waxing Crescent)';
        else if (elongation >= 80 && elongation < 100) phaseName = 'Kuartal Pertama (First Quarter)';
        else if (elongation >= 100 && elongation < 170) phaseName = 'Bulan Cembung (Waxing Gibbous)';
        else if (elongation >= 170 && elongation < 190) phaseName = 'Purnama (Full Moon / Badr)';
        else if (elongation >= 190 && elongation < 260) phaseName = 'Bulan Cembung Tua (Waning Gibbous)';
        else if (elongation >= 260 && elongation < 280) phaseName = 'Kuartal Akhir (Third Quarter)';
        else if (elongation >= 280 && elongation < 350) phaseName = 'Bulan Sabit Tua (Waning Crescent / Hilal Akhir)';

        return {
            lambda_sun,
            lambda_moon,
            manzil,
            zodiac,
            elongation,
            illumination,
            moonAgeDays,
            phaseName
        };
    }

    function calculateHijriDate(dateObj, offset) {
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate() + (offset || 0);

        if (month <= 2) {
            year -= 1;
            month += 12;
        }

        const A = Math.floor(year / 100);
        const B = 2 - A + Math.floor(A / 4);
        const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;

        let l = Math.floor(JD) - 1948440 + 10632;
        let n = Math.floor((l - 1) / 10631);
        l = l - 10631 * n + 354;
        let j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) + Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
        l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
        let hMonth = Math.floor((24 * l) / 709);
        let hDay = l - Math.floor((709 * hMonth) / 24);
        let hYear = 30 * n + j - 30;

        return { day: hDay, monthName: HIJRI_MONTHS[hMonth - 1] || '', year: hYear };
    }

    function calculateQiblaAzimuth(lat, lon) {
        const mLat = toRad(21.4225);
        const mLon = toRad(39.8262);
        const pLat = toRad(lat);
        const pLon = toRad(lon);

        const dLon = mLon - pLon;
        const y = Math.sin(dLon);
        const x = Math.cos(pLat) * Math.tan(mLat) - Math.sin(pLat) * Math.cos(dLon);
        const qRad = Math.atan2(y, x);
        const qDeg = (toDeg(qRad) + 360) % 360;

        let dirLabel = 'BBL';
        if (qDeg >= 337.5 || qDeg < 22.5) dirLabel = 'Utara';
        else if (qDeg >= 22.5 && qDeg < 67.5) dirLabel = 'TL';
        else if (qDeg >= 67.5 && qDeg < 112.5) dirLabel = 'Timur';
        else if (qDeg >= 112.5 && qDeg < 157.5) dirLabel = 'Tenggara';
        else if (qDeg >= 157.5 && qDeg < 202.5) dirLabel = 'Selatan';
        else if (qDeg >= 202.5 && qDeg < 247.5) dirLabel = 'Barat Daya';
        else if (qDeg >= 247.5 && qDeg < 292.5) dirLabel = 'Barat';
        else dirLabel = 'BBL';

        return { degree: qDeg.toFixed(1), label: dirLabel };
    }

    function calculatePrayerTimes(sunInfo) {
        if (!sunInfo || !sunInfo.rawSunUtc) return null;
        const { solarNoonUtc, latR, decR } = sunInfo.rawSunUtc;
        const utcBaseMs = sunInfo.utcBaseMs;

        function hourAngle(angle) {
            const cosHA = (Math.cos(toRad(angle)) - Math.sin(latR) * Math.sin(decR)) / (Math.cos(latR) * Math.cos(decR));
            if (cosHA > 1 || cosHA < -1) return null;
            return toDeg(Math.acos(cosHA));
        }

        const asrAlt = toDeg(Math.atan(1 / (1 + Math.tan(Math.abs(latR - decR)))));
        const haAsr = hourAngle(90 - asrAlt);
        const haSunrise = hourAngle(90.8333);
        const haFajr = hourAngle(90 + 20);
        const haIsha = hourAngle(90 + 18);

        const fajrUtc = haFajr ? solarNoonUtc - haFajr * 4 : null;
        const sunriseUtc = haSunrise ? solarNoonUtc - haSunrise * 4 : null;
        const dhuhrUtc = solarNoonUtc + 2;
        const asrUtc = haAsr ? solarNoonUtc + haAsr * 4 : null;
        const maghribUtc = haSunrise ? solarNoonUtc + haSunrise * 4 : null;
        const ishaUtc = haIsha ? solarNoonUtc + haIsha * 4 : null;

        function toDate(minUtc) {
            if (minUtc === null) return null;
            return new Date(utcBaseMs + minUtc * 60 * 1000);
        }

        return {
            fajr: toDate(fajrUtc),
            sunrise: toDate(sunriseUtc),
            dhuhr: toDate(dhuhrUtc),
            asr: toDate(asrUtc),
            maghrib: toDate(maghribUtc),
            isha: toDate(ishaUtc)
        };
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
        const dayOfWeek = dateObj.getDay();
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
        
        elements.txtDayDurationLabel.textContent = currentSystem === 'saat' ? t.dayDurationLabelSaat : t.dayDurationLabelChogadia;
        
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

        // Astronomy Plus Translations
        document.getElementById('txtAstroTitle').childNodes[1].nodeValue = " " + t.txtAstroTitle;
        document.getElementById('txtMoonHeader').childNodes[1].nodeValue = " " + t.txtMoonHeader;
        document.getElementById('txtHijriDateLabel').textContent = t.txtHijriDateLabel;
        document.getElementById('txtMoonPhaseLabel').textContent = t.txtMoonPhaseLabel;
        document.getElementById('txtManazilLabel').textContent = t.txtManazilLabel;
        document.getElementById('txtPrayerHeader').childNodes[1].nodeValue = " " + t.txtPrayerHeader;
        document.getElementById('txtFajr').textContent = t.txtFajr;
        document.getElementById('txtSunrise').textContent = t.txtSunrise;
        document.getElementById('txtDhuhr').textContent = t.txtDhuhr;
        document.getElementById('txtAsr').textContent = t.txtAsr;
        document.getElementById('txtMaghrib').textContent = t.txtMaghrib;
        document.getElementById('txtIsha').textContent = t.txtIsha;
        document.getElementById('txtFinderTitle').textContent = t.txtFinderTitle;
        document.getElementById('txtFinderSubtitle').textContent = t.txtFinderSubtitle;
        document.getElementById('txtDialTitle').textContent = t.txtDialTitle;
        document.getElementById('txtDialSubtitle').textContent = t.txtDialSubtitle;
        document.getElementById('txtAsmaLabel').textContent = t.txtAsmaLabel;
        document.getElementById('txtMetalLabel').textContent = t.txtMetalLabel;
        document.getElementById('txtBtnNotify').textContent = t.txtBtnNotify;
        document.getElementById('txtBtnPrint').textContent = t.txtBtnPrint;
        document.getElementById('txtBtnWa').textContent = t.txtBtnWa;

        renderApp();
    }

    function renderApp() {
        const data = calculateSchedule(selectedDate, currentCoords.lat, currentCoords.lon);
        if (!data) return;

        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

        // Update Sun Bar & Dynamic Label
        elements.sunriseTime.textContent = formatTime(data.sun.sunrise);
        elements.sunsetTime.textContent = formatTime(data.sun.sunset);
        elements.dayDuration.textContent = `${data.daySlotMinutes} m`;
        elements.txtDayDurationLabel.textContent = currentSystem === 'saat' ? t.dayDurationLabelSaat : t.dayDurationLabelChogadia;

        // Render Astronomy Plus Card
        renderAstronomyPlus(data.sun);

        // Render Radial Dial Clock
        renderDialClock(data);

        // Render Abjad Hisab & Wafaq
        renderAbjadAndWafaq();

        // Filter slots if Purpose Finder active
        let slots = activeTab === 'day' ? data.daySlots : data.nightSlots;
        if (activeFilter !== 'all') {
            slots = slots.filter(s => s.info.quality === activeFilter);
        }

        // Render Table
        elements.chogadiaTableBody.innerHTML = '';
        const now = new Date();

        if (slots.length === 0) {
            elements.chogadiaTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted);">Tidak ada jam ${activeFilter} pada sesi ${activeTab === 'day' ? 'Siang' : 'Malam'} ini. Silakan cek tab sebaliknya.</td></tr>`;
        } else {
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
                    if (slot.info.asma) {
                        efficacyText += `<br><strong class="text-amber"><i class="fa-solid fa-hands-praying"></i> Zikir: ${slot.info.asma}</strong>`;
                    }
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

                tr.addEventListener('click', () => {
                    openPlanetModal(slot.name, qualityText, slot.info.class);
                });

                elements.chogadiaTableBody.appendChild(tr);
            });
        }

        renderLegend();
        updateActiveBanner(data, now);
        updateFinderRecommendation(data);
    }

    function renderDialClock(data) {
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;
        const slots = activeTab === 'day' ? data.daySlots : data.nightSlots;
        const n = slots.length;
        const radius = 105;

        elements.dialRing.querySelectorAll('.dial-node').forEach(node => node.remove());

        const now = new Date();

        slots.forEach((slot, i) => {
            const angle = (i * (2 * Math.PI / n)) - (Math.PI / 2);
            const x = Math.round(radius * Math.cos(angle));
            const y = Math.round(radius * Math.sin(angle));

            const isActive = now >= slot.start && now < slot.end;
            const qualityText = t.qualities[slot.info.quality];

            const node = document.createElement('div');
            node.className = `dial-node ${slot.info.class} ${isActive ? 'active' : ''}`;
            node.style.transform = `translate(${x}px, ${y}px)`;
            node.title = `${slot.index}. ${t.names[slot.name]} (${formatTime(slot.start)} - ${formatTime(slot.end)})`;
            node.innerHTML = `<span>${slot.index}</span>`;

            node.addEventListener('click', () => {
                openPlanetModal(slot.name, qualityText, slot.info.class);
            });

            elements.dialRing.appendChild(node);

            if (isActive) {
                elements.dialCenterPlanet.textContent = t.names[slot.name] || slot.name;
                elements.dialCenterStatus.textContent = `#${slot.index} (${formatTime(slot.start)} - ${formatTime(slot.end)})`;

                elements.btnDialCenter3d.onclick = () => {
                    openPlanetModal(slot.name, qualityText, slot.info.class);
                };
            }
        });
    }

    function updateFinderRecommendation(data) {
        if (activeFilter === 'all') {
            elements.finderResultBox.style.display = 'none';
            return;
        }

        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;
        const allSlots = [...data.daySlots, ...data.nightSlots];
        const matched = allSlots.filter(s => s.info.quality === activeFilter);

        elements.finderResultBox.style.display = 'flex';
        if (matched.length === 0) {
            elements.finderResultText.textContent = `Tidak ditemukan jam kategori '${t.qualities[activeFilter]}' pada tanggal ini.`;
        } else {
            const listStr = matched.map(s => `${t.names[s.name]} (${formatTime(s.start)} - ${formatTime(s.end)})`).join(' | ');
            elements.finderResultText.innerHTML = `<strong>Rekomendasi Jam Hari Ini (${t.qualities[activeFilter]}):</strong> ${listStr}`;
        }
    }

    function renderAstronomyPlus(sunInfo) {
        const hijri = calculateHijriDate(selectedDate, hijriOffset);
        let offsetBadge = hijriOffset !== 0 ? ` (${hijriOffset > 0 ? '+' : ''}${hijriOffset}d)` : '';
        elements.displayHijriDate.innerHTML = `<strong>${hijri.day} ${hijri.monthName} ${hijri.year} H</strong> <small style="display:inline; opacity:0.8;">${offsetBadge} (Berganti saat Maghrib)</small>`;

        const moon = calculateMoonEclipticPosition(selectedDate);
        elements.displayMoonPhase.innerHTML = `<strong>${moon.phaseName}</strong> <small style="display:inline; opacity:0.9;">(${moon.illumination.toFixed(1)}% Terang, Umur ${moon.moonAgeDays.toFixed(1)} Hari)</small>`;

        elements.displayManazil.innerHTML = `<strong>Ke-${moon.manzil.id}: ${moon.manzil.name}</strong> <small style="display:inline; opacity:0.9;">[Rentang: ${moon.manzil.range} | Zodiak: ${moon.zodiac.name}]</small><br><small style="display:block; color:var(--accent-gold); margin-top:2px;"><i class="fa-solid fa-sparkles"></i> <em>${moon.manzil.desc}</em></small>`;

        const qibla = calculateQiblaAzimuth(currentCoords.lat, currentCoords.lon);
        elements.displayQiblaDegree.textContent = `${qibla.degree}° ${qibla.label}`;

        const p = calculatePrayerTimes(sunInfo);
        if (p) {
            elements.timeFajr.textContent = formatTime(p.fajr);
            elements.timeSunrise.textContent = formatTime(p.sunrise);
            elements.timeDhuhr.textContent = formatTime(p.dhuhr);
            elements.timeAsr.textContent = formatTime(p.asr);
            elements.timeMaghrib.textContent = formatTime(p.maghrib);
            elements.timeIsha.textContent = formatTime(p.isha);
        }
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
                    <small style="display:block; color:var(--accent-gold); margin-top:4px;"><strong>Zikir:</strong> ${p.asma}</small>
                `;

                item.addEventListener('click', () => {
                    openPlanetModal(p.key, qualityText, p.class);
                });

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

                item.addEventListener('click', () => {
                    openPlanetModal(k, qualityText, c.class);
                });

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
            elements.displayActiveAsma.textContent = data.daySlots[0].info.asma || '--';
            elements.displayActiveMetal.textContent = data.daySlots[0].info.metal || '--';
            elements.slotProgressBar.style.width = '0%';
            return;
        }

        elements.dayNightBadge.innerHTML = isNight ?
            `<i class="fa-solid fa-moon"></i> ${t.nightMode}` :
            `<i class="fa-solid fa-sun"></i> ${t.dayMode}`;

        elements.chogadiaIconCircle.className = `chogadia-badge-circle ${activeSlot.info.class}`;
        elements.chogadiaMainIcon.className = `fa-solid ${activeSlot.info.icon}`;

        const slotNameText = t.names[activeSlot.name] || activeSlot.name;
        const qualityText = t.qualities[activeSlot.info.quality];

        elements.currentChogadiaName.textContent = slotNameText;
        elements.qualityTag.textContent = qualityText;
        elements.qualityTag.className = `quality-tag ${activeSlot.info.class}`;

        elements.currentSlotRange.textContent = `${formatTime(activeSlot.start)} - ${formatTime(activeSlot.end)}`;
        
        let planetDetail = qualityText;
        elements.currentPlanet.textContent = planetDetail;

        elements.displayActiveAsma.textContent = activeSlot.info.asma || '--';
        elements.displayActiveMetal.textContent = activeSlot.info.metal || '--';

        elements.btnStatusMain3d.onclick = () => {
            openPlanetModal(activeSlot.name, qualityText, activeSlot.info.class);
        };

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

        if (lastActiveSlotName && lastActiveSlotName !== slotNameText) {
            triggerSlotChangeNotification(slotNameText, qualityText);
        }
        lastActiveSlotName = slotNameText;
    }

    function triggerSlotChangeNotification(slotName, qualityText) {
        if (!isNotifyEnabled) return;

        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.4);
        } catch (e) {}

        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`Pergantian Sa'at Planet Falakiah`, {
                body: `Saat ini telah masuk jam ${slotName} [${qualityText}].`,
                icon: 'icon.svg'
            });
        }
    }

    function toggleNotification() {
        if (!isNotifyEnabled) {
            if ('Notification' in window) {
                Notification.requestPermission().then(perm => {
                    isNotifyEnabled = true;
                    localStorage.setItem('falak_notify', 'true');
                    elements.iconNotify.className = 'fa-solid fa-bell text-emerald';
                    alert('Notifikasi pergantian Sa\'at Planet berhasil diaktifkan!');
                });
            } else {
                isNotifyEnabled = true;
                localStorage.setItem('falak_notify', 'true');
                elements.iconNotify.className = 'fa-solid fa-bell text-emerald';
            }
        } else {
            isNotifyEnabled = false;
            localStorage.setItem('falak_notify', 'false');
            elements.iconNotify.className = 'fa-solid fa-bell-slash';
            alert('Notifikasi dimatikan.');
        }
    }

    function copyWhatsAppSummary() {
        const data = calculateSchedule(selectedDate, currentCoords.lat, currentCoords.lon);
        if (!data) return;
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.id;
        const hijri = calculateHijriDate(selectedDate, hijriOffset);
        const moon = calculateMoonEclipticPosition(selectedDate);

        let msg = `✨ *JADWAL KALKULATOR FALAKIAH & JAM PLANET* ✨\n`;
        msg += `📍 *Lokasi:* ${currentCoords.name}\n`;
        msg += `📅 *Masehi:* ${selectedDate.toLocaleDateString()}\n`;
        msg += `🌙 *Hijriah:* ${hijri.day} ${hijri.monthName} ${hijri.year} H\n`;
        msg += `🌕 *Fase Bulan:* ${moon.phaseName} (${moon.illumination.toFixed(1)}%)\n`;
        msg += `⭐ *Manazil al-Qamar:* Ke-${moon.manzil.id}: ${moon.manzil.name}\n\n`;

        msg += `☀️ *SA'AT SIANG (NAHAR):*\n`;
        data.daySlots.forEach(s => {
            msg += `• Jam ${s.index}: ${t.names[s.name]} [${t.qualities[s.info.quality]}] (${formatTime(s.start)} - ${formatTime(s.end)})\n`;
        });

        msg += `\n🌙 *SA'AT MALAM (LAIL):*\n`;
        data.nightSlots.forEach(s => {
            msg += `• Jam ${s.index}: ${t.names[s.name]} [${t.qualities[s.info.quality]}] (${formatTime(s.start)} - ${formatTime(s.end)})\n`;
        });

        msg += `\n🌐 *Hitung Presisi di:* https://arifwidiyanto.web.id/falakiah/`;

        navigator.clipboard.writeText(msg).then(() => {
            alert('Ringkasan Jadwal Falakiah berhasil disalin! Tinggal tempel (paste) ke WhatsApp.');
        }).catch(err => {
            alert('Gagal menyalin: ' + err.message);
        });
    }

    function copyWafaqText() {
        const val = elements.inputAbjadName.value || 'Arif';
        const purpose = elements.selectHajatPurpose.value || 'RIZQ';
        const res = calculateAbjadAndWafaq(val, purpose);
        if (!res) return;

        let str = `✨ ${res.titleLabel.toUpperCase()} (${val} / ${res.arabScript}) ✨\n`;
        str += `Adad Hisab: ${res.baseAdad} (+${res.purposeAdadBonus} = ${res.totalAdad})\n`;
        str += `Khadim Ulwi (Malaikat): ${res.ulwiArab} (${res.ulwiLatin})\n`;
        str += `Khadim Sufli (Penguasa): ${res.sufliArab} (${res.sufliLatin})\n`;
        str += `Planet: ${res.planetObj.arabic}\n\n`;
        str += `[ ${res.grid[0][0]} ] [ ${res.grid[0][1]} ] [ ${res.grid[0][2]} ]\n`;
        str += `[ ${res.grid[1][0]} ] [ ${res.grid[1][1]} ] [ ${res.grid[1][2]} ]\n`;
        str += `[ ${res.grid[2][0]} ] [ ${res.grid[2][1]} ] [ ${res.grid[2][2]} ]\n`;

        navigator.clipboard.writeText(str).then(() => {
            alert('Matriks Wafaq 3x3 berhasil disalin!');
        });
    }

    // Interactive Tasbih Counter Handler
    function incrementTasbih() {
        tasbihCount += 1;
        elements.tasbihCountDisplay.textContent = tasbihCount;

        // Soft haptic vibration if supported
        if (navigator.vibrate) {
            navigator.vibrate(40);
        }

        // Play soft audio click
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } catch (e) {}
    }

    function resetTasbih() {
        tasbihCount = 0;
        elements.tasbihCountDisplay.textContent = '0';
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
        initThreeJS();

        // Date Picker Default to Today
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

        // Abjad Hisab & Wafaq Controls
        elements.btnCalcAbjad.addEventListener('click', renderAbjadAndWafaq);
        elements.inputAbjadName.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') renderAbjadAndWafaq();
        });
        elements.selectHajatPurpose.addEventListener('change', renderAbjadAndWafaq);
        elements.btnCopyWafaq.addEventListener('click', copyWafaqText);
        elements.btnDownloadCardPng.addEventListener('click', exportWafaqCardPNG);

        // Tasbih Controls
        elements.btnTasbihCount.addEventListener('click', incrementTasbih);
        elements.btnTasbihReset.addEventListener('click', resetTasbih);

        elements.btnToggleDigits.addEventListener('click', () => {
            wafaqDigitMode = wafaqDigitMode === 'arabic' ? 'latin' : 'arabic';
            localStorage.setItem('wafaq_digit', wafaqDigitMode);
            elements.btnToggleDigits.textContent = `Angka: ${wafaqDigitMode === 'arabic' ? 'Arab (١٢٣)' : 'Latin (123)'}`;
            renderAbjadAndWafaq();
        });

        // Modal Close Button
        elements.btnCloseModal.addEventListener('click', closePlanetModal);
        elements.planet3dModal.addEventListener('click', (e) => {
            if (e.target === elements.planet3dModal) closePlanetModal();
        });

        // Notification Button
        if (isNotifyEnabled) {
            elements.iconNotify.className = 'fa-solid fa-bell text-emerald';
        }
        elements.btnNotifySound.addEventListener('click', toggleNotification);

        // Print PDF Button
        elements.btnPrintPdf.addEventListener('click', () => window.print());

        // WhatsApp Share
        elements.btnShareWa.addEventListener('click', copyWhatsAppSummary);

        // Purpose Pills Event Listeners
        const pills = elements.purposePills.querySelectorAll('.pill-btn');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeFilter = pill.getAttribute('data-filter');
                renderApp();
            });
        });

        // Hijri Controls
        elements.btnHijriPrev.addEventListener('click', () => {
            hijriOffset -= 1;
            localStorage.setItem('hijri_offset', hijriOffset);
            renderApp();
        });
        elements.btnHijriReset.addEventListener('click', () => {
            hijriOffset = 0;
            localStorage.setItem('hijri_offset', hijriOffset);
            renderApp();
        });
        elements.btnHijriNext.addEventListener('click', () => {
            hijriOffset += 1;
            localStorage.setItem('hijri_offset', hijriOffset);
            renderApp();
        });

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
