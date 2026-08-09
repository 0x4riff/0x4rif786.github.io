import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

# Palette Definition
C_PRIMARY = colors.HexColor('#0b132b')    # Deep Celestial Navy
C_SECONDARY = colors.HexColor('#1c2541')  # Royal Indigo
C_ACCENT_GOLD = colors.HexColor('#d97706')# Rich Amber Gold
C_GOLD_BG = colors.HexColor('#fef3c7')   # Soft Warm Gold Light
C_TEXT_DARK = colors.HexColor('#0f172a')  # Slate 900
C_TEXT_MUTED = colors.HexColor('#475569') # Slate 600
C_BORDER = colors.HexColor('#cbd5e1')     # Slate 300
C_LIGHT_BG = colors.HexColor('#f8fafc')   # Slate 50

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        if self._pageNumber > 1:
            # Header
            self.setFont('Helvetica-Bold', 8)
            self.setFillColor(C_TEXT_MUTED)
            self.drawString(36, 812, "ILMU FALAKIAH & RAHASIA WAKTU KOSMIK LINTAS TRADISI PERADABAN")
            self.setStrokeColor(C_BORDER)
            self.setLineWidth(0.5)
            self.line(36, 804, 559, 804)
            
            # Footer
            self.setFont('Helvetica', 8)
            self.drawString(36, 28, "Panduan Kebijaksanaan Waktu * Penyusunan oleh Arif Widiyanto * arifwidiyanto.web.id/falakiah")
            page_text = f"Halaman {self._pageNumber} dari {page_count}"
            self.drawRightString(559, 28, page_text)
            self.setLineWidth(0.5)
            self.line(36, 38, 559, 38)
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom Paragraph Styles
    style_cover_title = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=30,
        textColor=C_GOLD_BG,
        alignment=1,
        spaceAfter=12
    )

    style_cover_subtitle = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11.5,
        leading=16.5,
        textColor=colors.HexColor('#e2e8f0'),
        alignment=1,
        spaceAfter=18
    )

    style_cover_meta = ParagraphStyle(
        'CoverMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=14,
        textColor=C_GOLD_BG,
        alignment=1
    )

    style_h1 = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=C_PRIMARY,
        spaceBefore=16,
        spaceAfter=6,
        keepWithNext=True
    )

    style_h2 = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=C_SECONDARY,
        spaceBefore=12,
        spaceAfter=4,
        keepWithNext=True
    )

    style_body = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.8,
        textColor=C_TEXT_DARK,
        spaceAfter=6
    )

    style_callout = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13.8,
        textColor=colors.HexColor('#78350f')
    )

    style_th = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=colors.white,
        alignment=1
    )

    style_td = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=C_TEXT_DARK
    )

    story = []

    # ==================== COVER & PENGANTAR (HALAMAN 1) ====================
    story.append(Spacer(1, 20))
    cover_content = [
        [Paragraph("PETA ZAMAN & RAHASIA WAKTU KOSMIK", style_cover_title)],
        [Paragraph("Kajian Mendalam & Sintesis Praktis Menghitung Waktu Baik (Sa'ad) serta Menghindari Waktu Nahas Berdasarkan Rujukan 4 Peradaban Dunia", style_cover_subtitle)],
        [Paragraph("<b>Integrasi Kitab Rujukan Autentik:</b><br/>Syamsul Ma'arif al-Kubra & Manba' Ushul al-Hikmah (Arab) * Chogadia Hisab (Bohra) * Primbon Jawa Betaljumur Adammakna * Jyotish Veda (Rahukaal)", style_cover_meta)],
        [Spacer(1, 8)],
        [Paragraph("Disusun & Diuraikan oleh: <b>Arif Widiyanto</b><br/>Edisi Pembelajaran Eksklusif * arifwidiyanto.web.id/falakiah", style_cover_meta)]
    ]
    
    cover_table = Table(cover_content, colWidths=[523])
    cover_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 24),
        ('BOTTOMPADDING', (0,0), (-1,-1), 24),
        ('LEFTPADDING', (0,0), (-1,-1), 20),
        ('RIGHTPADDING', (0,0), (-1,-1), 20),
        ('LINEBELOW', (0,0), (-1,0), 2, C_ACCENT_GOLD),
    ]))
    story.append(cover_table)
    story.append(Spacer(1, 14))

    intro_html = """
    Pernahkah Anda memperhatikan dalam perjalanan hidup bahwa usaha manusia tidak selalu berbanding lurus dengan hasilnya? Ada kalanya sebuah keputusan yang dibuat dengan persiapan sederhana berjalan sangat mulus, seolah alam semesta membuka jalan. Di sisi lain, tak jarang proyek besar yang dirancang dengan modal dan tenaga melimpah justru menemui jalan buntu yang tak masuk akal.
    <br/><br/>
    Manusia modern sering menganggap fenomena ini sebagai kebetulan atau keberuntungan belaka. Namun bagi para cendekiawan dan pujangga kuno—mulai dari ulama Falak di Timur Tengah, para empu hikmah Jawa, hingga para resi Veda di India—waktu bukanlah wadah kosong yang pasif. <b>Waktu adalah bentangan gelombang energi yang dinamis.</b>
    <br/><br/>
    Buku ini disusun untuk menguraikan kaidah-kaidah ilmu Falakiah dan perhitungan jam kosmik secara terperinci, sistematis, dan tanpa kompromi, sehingga Anda dapat memahami alasan di balik setiap momen dan menggunakannya secara bijaksana.
    """
    story.append(Paragraph(intro_html, style_body))
    story.append(Spacer(1, 8))

    callout_content = [[
        Paragraph("<b>💡 Kaidah Filosofis Kebijaksanaan Waktu:</b><br/><i>'Barangsiapa memahami hukum pergiliran waktu, ia bagaikan pelaut yang tahu kapan harus membentangkan layar dan kapan harus berlabuh. Keberhasilan bukanlah tentang memaksa alam, melainkan menyelaraskan niat dengan takdir momen yang tepat.'</i>", style_callout)
    ]]
    callout_table = Table(callout_content, colWidths=[523])
    callout_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_GOLD_BG),
        ('BORDER', (0,0), (-1,-1), 1, C_ACCENT_GOLD),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(callout_table)
    story.append(Spacer(1, 14))

    # ==================== BAB 1: FILSAFAT HIKMAH & HUKUM WAKTU ====================
    story.append(Paragraph("BAB 1: FILSAFAT HIKMAH & HUKUM WAKTU KOSMIK", style_h1))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT_GOLD, spaceAfter=8))

    b1_text = """
    Dalam pandangan kosmologi Falakiah, bumi dan seluruh penghuninya berada di bawah pengaruh pergerakan benda-benda langit. Matahari memancarkan energi vital (vitality/ruhaniyah), Bulan memengaruhi cairan dan batin, sedangkan planet-planet lain memancarkan kualitas gelombang yang spesifik.
    <br/><br/>
    <b>1. Jam Zamaniyah (Unequal Hours) vs Jam Mekanis</b><br/>
    Kesalahan terbesar manusia modern adalah mengukur waktu baik/nahas dengan jam dinding 60 menit yang kaku. Dalam ilmu Falakiah autentik, rentang waktu siang (Matahari Terbit hingga Terbenam) dibagi menjadi tepat <b>12 Jam Zamaniyah Siang</b>, dan malam (Terbenam hingga Terbit) dibagi menjadi <b>12 Jam Zamaniyah Malam</b>.
    <br/><br/>
    Panjang 1 Jam Zamaniyah senantiasa berubah setiap hari tergantung letak lintang geografis lokasi Anda dan posisi deklinasi Matahari. Karena itulah, perhitungan Falakiah yang benar harus dihitung berdasarkan koordinat lokasi tempat Anda berada.
    <br/><br/>
    <b>2. Klasifikasi Kualitas Energi Waktu</b><br/>
    Secara umum, peradaban dunia membagi energi jam menjadi tiga tingkatan:
    <br/>• <b>Sa'ad (Auspicious / Baik)</b>: Energi pembukaan, keberkahan, kemudahan, dan keharmonisan.
    <br/>• <b>Mutazi'l (Neutral / Netral)</b>: Energi dinamis, cocok untuk aktivitas intelektual, menulis, dan fleksibilitas.
    <br/>• <b>Nahas (Inauspicious / Kurang Baik)</b>: Energi pengetatan, rintangan, dan konflik. Waktu ini disiapkan khusus untuk pertahanan diri dan pembersihan batin.
    """
    story.append(Paragraph(b1_text, style_body))
    story.append(Spacer(1, 14))

    # ==================== BAB 2: TRADISI FALAK ARAB (SA'AT AL-KAWAKIB) ====================
    story.append(Paragraph("BAB 2: TRADISI FALAK ARAB (SA'AT AL-KAWAKIB & 7 KAWAKIB)", style_h1))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT_GOLD, spaceAfter=8))

    b2_text = """
    Rujukan utama tradisi ini bersumber dari kitab klasik <i>Syamsul Ma'arif al-Kubra</i> dan <i>Manba' Ushul al-Hikmah</i> karya Syeikh Ahmad bin Ali Al-Buni. Tujuh planet penguasa berputar berdasarkan urutan Kaldani (Chaldean Order). Berikut ulasan terperinci setiap planet:
    """
    story.append(Paragraph(b2_text, style_body))

    p_detail_1 = """
    <b>1. Mushtari / Jupiter (المشتري) — Sa'ad Akbar (Puncak Keberkahan)</b><br/>
    • <i>Malaikat Pengawas:</i> Sarfya-il (صرفيائيل) | <i>Hisab Abjad:</i> 950 (م ش ت ر ي)<br/>
    • <i>Zikir Penguat:</i> Ya Kabir Ya Muta'al (يا كبير يا متعال) | <i>Logam:</i> Timah Putih / Perunggu<br/>
    • <i>Wewangian Bukhur:</i> Luban Jawi (Istirak), Gaharu Super & Cendana.<br/>
    • <i>Uraian Hajat (Dos):</i> Waktu terbaik untuk memulai bisnis besar, pernikahan, akad nikah, permohonan hajat rezeki, konsultasi keagamaan, dan kholwat spiritual.<br/>
    • <i>Hal Dilarang (Don'ts):</i> Dilarang keras melakukan perbuatan jahat atau kedengkian karena energi Mushtari akan mengembalikan bumerang secara cepat.
    <br/><br/>
    <b>2. Zuhrah / Venus (الزهرة) — Sa'ad Asghar (Keharmonisan & Cinta)</b><br/>
    • <i>Malaikat Pengawas:</i> Aniya-il (عنيائيل) | <i>Hisab Abjad:</i> 217 (ز هـ ر ة)<br/>
    • <i>Zikir Penguat:</i> Ya Jamil Ya Latif (يا جميل يا لطيف) | <i>Logam:</i> Tembaga Halus / Pirus<br/>
    • <i>Wewangian Bukhur:</i> Mawar, Merekah, Za'faran & Musk Rose.<br/>
    • <i>Uraian Hajat (Dos):</i> Pelaksanaan pernikahan, melamar, mahabbah kasih sayang, kesenian, membeli pakaian baru/perhiasan, serta perawatan kecantikan.<br/>
    • <i>Hal Dilarang (Don'ts):</i> Hindari perdebatan alot, sengketa hukum, atau tindakan berkarakter keras.
    <br/><br/>
    <b>3. Syams / Matahari (الشمس) — Sa'ad & Wibawa (Keagungan)</b><br/>
    • <i>Malaikat Pengawas:</i> Ruqya-il (روقيائيل) | <i>Hisab Abjad:</i> 400 (ش م س)<br/>
    • <i>Zikir Penguat:</i> Ya Hayyu Ya Qayyum (يا حي يا قيوم) | <i>Logam:</i> Emas Murni<br/>
    • <i>Wewangian Bukhur:</i> Cendana Merah, Gaharu Super & Amber.<br/>
    • <i>Uraian Hajat (Dos):</i> Menghadap pejabat, pimpinan, atau tokoh penting; memohon kenaikan pangkat, kewibawaan (Haibah), serta hajat kehormatan publik.<br/>
    • <i>Hal Dilarang (Don'ts):</i> Hindari taktik gelap atau menyembunyikan sesuatu karena sifat Syams menyingkap segala yang tersembunyi.
    """
    story.append(Paragraph(p_detail_1, style_body))

    p_detail_2 = """
    <b>4. Utarid / Merkurius (عطارد) — Mutazi'l (Intelektual & Perdagangan)</b><br/>
    • <i>Malaikat Pengawas:</i> Mikail (ميكائيل) | <i>Hisab Abjad:</i> 284 (ع ط ا ر د)<br/>
    • <i>Zikir Penguat:</i> Ya Alim Ya Hakim (يا عليم يا حكيم) | <i>Logam:</i> Raksa / Kuningan<br/>
    • <i>Wewangian Bukhur:</i> Mastaka, Jawi & Kapur Barus.<br/>
    • <i>Uraian Hajat (Dos):</i> Menulis Wafaq/azimat, menyusun dokumen/kontrak bisnis, belajar, mengarang buku, akuntansi, dan negosiasi transaksi pasar.<br/>
    • <i>Hal Dilarang (Don'ts):</i> Hindari komitmen emosional kaku yang membutuhkan stabilitas tanpa perubahan.
    <br/><br/>
    <b>5. Qamar / Bulan (القمر) — Mutazi'l (Dinamis & Perjalanan)</b><br/>
    • <i>Malaikat Pengawas:</i> Jibra-il (جبرائيل) | <i>Hisab Abjad:</i> 340 (ق م ر)<br/>
    • <i>Zikir Penguat:</i> Ya Rahman Ya Rahim (يا رحمن يا رحيم) | <i>Logam:</i> Perak Murni<br/>
    • <i>Wewangian Bukhur:</i> Gaharu Putih, Melati & Bukhur Jawa.<br/>
    • <i>Uraian Hajat (Dos):</i> Memulai perjalanan laut/darat, bercocok tanam, minum obat pengobatan, mahabbah kasih sayang keluarga, & hubungan publik.<br/>
    • <i>Hal Dilarang (Don'ts):</i> Menandatangani kesepakatan permanen yang membutuhkan kepastian jangka panjang.
    <br/><br/>
    <b>6. Mirrikh / Mars (المريخ) — Nahas Asghar (Ketegasan & Keberanian)</b><br/>
    • <i>Malaikat Pengawas:</i> Samsama-il (سمسمائيل) | <i>Hisab Abjad:</i> 850 (م ر ي خ)<br/>
    • <i>Zikir Penguat:</i> Ya Aziz Ya Jabbar (يا عزيز يا جبار) | <i>Logam:</i> Besi Murni / Tembaga Merah<br/>
    • <i>Wewangian Bukhur:</i> Bukhur Kibrit (Belerang), Lada Hitam & Mustaka.<br/>
    • <i>Uraian Hajat (Dos):</i> Latihan fisik, olahraga, ketegasan hukum, dan pembuatan pagar ghaib/benteng diri dari kejahatan musuh.<br/>
    • <i>Hal Dilarang (Don'ts):</i> Sangat dilarang melangsungkan pernikahan, melamar, atau perundingan damai.
    <br/><br/>
    <b>7. Zuhal / Saturnus (زحل) — Nahas Akbar (Benteng & Pembersihan)</b><br/>
    • <i>Malaikat Pengawas:</i> Kasfya-il (كسفيائيل) | <i>Hisab Abjad:</i> 45 (ز ح ل)<br/>
    • <i>Zikir Penguat:</i> Ya Qahhar Ya Qadir (يا قهار يا قادر) | <i>Logam:</i> Timbal Hitam / Besi Tua<br/>
    • <i>Wewangian Bukhur:</i> Bukhur Qist, Harmal & Kulit Bawang.<br/>
    • <i>Uraian Hajat (Dos):</i> Pembuatan benteng tolak bala, mengunci hajat, menggali sumur/tanah, dan peletakan batu pertama pondasi bangunan.<br/>
    • <i>Hal Dilarang (Don'ts):</i> Dilarang keras melangsungkan pesta pernikahan, launching bisnis baru, atau perjalanan jauh.
    """
    story.append(Paragraph(p_detail_2, style_body))
    story.append(Spacer(1, 14))

    # ==================== BAB 3: TRADISI JAWA (SAAT LIMA) & VEDA (RAHUKAAL) ====================
    story.append(Paragraph("BAB 3: TRADISI JAWA (SAAT LIMA) & VEDA (RAHUKAAL)", style_h1))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT_GOLD, spaceAfter=8))

    story.append(Paragraph("1. Petungan 'Saat Lima' Primbon Jawa", style_h2))
    b3_jawa = """
    Dalam Kitab Primbon Jawa <i>Betaljumur Adammakna</i>, waktu siang terbit hingga terbenam dibagi menjadi 5 bagian utama yang mewakili lima energi alami:
    <br/>• <b>Selamat / Rejeki</b>: Puncak berkah & keberhasilan hajat.
    <br/>• <b>Sri</b>: Kehormatan, kemakmuran, & ketenangan keluarga.
    <br/>• <b>Pangkalan</b>: Waktu netral untuk kerja fisik rutin.
    <br/>• <b>Pati</b>: Halangan & rintangan batin.
    <br/>• <b>Kala / Maya</b>: Risiko marabahaya & kerugian.
    """
    story.append(Paragraph(b3_jawa, style_body))

    jawa_data = [
        [Paragraph("<b>Hari</b>", style_th), Paragraph("<b>Saat 1 (Fajar)</b>", style_th), Paragraph("<b>Saat 2 (Pagi)</b>", style_th), Paragraph("<b>Saat 3 (Siang)</b>", style_th), Paragraph("<b>Saat 4 (Sore)</b>", style_th), Paragraph("<b>Saat 5 (Senja)</b>", style_th)],
        [Paragraph("<b>Ahad</b>", style_td), Paragraph("🟢 Rejeki", style_td), Paragraph("🟡 Pati", style_td), Paragraph("🔵 Sri", style_td), Paragraph("⚪ Pangkalan", style_td), Paragraph("🔴 Kala", style_td)],
        [Paragraph("<b>Senin</b>", style_td), Paragraph("🔵 Sri", style_td), Paragraph("🟢 Rejeki", style_td), Paragraph("🟡 Pati", style_td), Paragraph("🔴 Kala", style_td), Paragraph("⚪ Pangkalan", style_td)],
        [Paragraph("<b>Selasa</b>", style_td), Paragraph("🟡 Pati", style_td), Paragraph("🔴 Kala", style_td), Paragraph("🔵 Sri", style_td), Paragraph("🟢 Rejeki", style_td), Paragraph("⚪ Pangkalan", style_td)],
        [Paragraph("<b>Rabu</b>", style_td), Paragraph("⚪ Pangkalan", style_td), Paragraph("🔵 Sri", style_td), Paragraph("🟢 Rejeki", style_td), Paragraph("🟡 Pati", style_td), Paragraph("🔴 Kala", style_td)],
        [Paragraph("<b>Kamis</b>", style_td), Paragraph("🔴 Kala", style_td), Paragraph("🟢 Rejeki", style_td), Paragraph("🔵 Sri", style_td), Paragraph("⚪ Pangkalan", style_td), Paragraph("🟡 Pati", style_td)],
        [Paragraph("<b>Jumat</b>", style_td), Paragraph("🟢 Rejeki", style_td), Paragraph("🔵 Sri", style_td), Paragraph("⚪ Pangkalan", style_td), Paragraph("🟡 Pati", style_td), Paragraph("🔴 Kala", style_td)],
        [Paragraph("<b>Sabtu</b>", style_td), Paragraph("🟡 Pati", style_td), Paragraph("⚪ Pangkalan", style_td), Paragraph("🔴 Kala", style_td), Paragraph("🔵 Sri", style_td), Paragraph("🟢 Rejeki", style_td)],
    ]
    t_jawa = Table(jawa_data, colWidths=[65, 91, 91, 91, 91, 94])
    t_jawa.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_SECONDARY),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_jawa)
    story.append(Spacer(1, 10))

    story.append(Paragraph("2. Rahukaal (राहु काल) Astrologi Veda", style_h2))
    b3_rahu = """
    Dalam Astrologi Veda (Jyotish), siang hari dibagi menjadi 8 bagian (~90 menit). Terdapat 1 bagian jam khusus yang dikuasai oleh <b>Rahu</b> (Energi Nahas). Pada jam Rahukaal ini, warga India kuno tidak akan memulai usaha baru atau transaksi keuangan.
    """
    story.append(Paragraph(b3_rahu, style_body))

    rahu_data = [
        [Paragraph("<b>Hari</b>", style_th), Paragraph("<b>Slot Rahukaal (dari 8 Bagian Siang)</b>", style_th), Paragraph("<b>Estimasi Jam Lokal (WIB)</b>", style_th)],
        [Paragraph("<b>Senin</b>", style_td), Paragraph("Slot Ke-2", style_td), Paragraph("07:30 – 09:00 WIB", style_td)],
        [Paragraph("<b>Selasa</b>", style_td), Paragraph("Slot Ke-7", style_td), Paragraph("15:00 – 16:30 WIB", style_td)],
        [Paragraph("<b>Rabu</b>", style_td), Paragraph("Slot Ke-5", style_td), Paragraph("12:00 – 13:30 WIB", style_td)],
        [Paragraph("<b>Kamis</b>", style_td), Paragraph("Slot Ke-6", style_td), Paragraph("13:30 – 15:00 WIB", style_td)],
        [Paragraph("<b>Jumat</b>", style_td), Paragraph("Slot Ke-4", style_td), Paragraph("10:30 – 12:00 WIB", style_td)],
        [Paragraph("<b>Sabtu</b>", style_td), Paragraph("Slot Ke-3", style_td), Paragraph("09:00 – 10:30 WIB", style_td)],
        [Paragraph("<b>Minggu (Ahad)</b>", style_td), Paragraph("Slot Ke-8", style_td), Paragraph("16:30 – 18:00 WIB", style_td)],
    ]
    t_rahu = Table(rahu_data, colWidths=[120, 200, 203])
    t_rahu.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_rahu)
    story.append(Spacer(1, 14))

    # ==================== BAB 4: ENSIKLOPEDIA 28 MANAZIL AL-QAMAR ====================
    story.append(Paragraph("BAB 4: ENSIKLOPEDIA 28 MANAZIL AL-QAMAR (RUMAH BULAN)", style_h1))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT_GOLD, spaceAfter=8))

    manazil_intro = """
    Dalam ilmu Falakiah, pergerakan Bulan melintasi 28 sektor ekliptika (masing-masing <b>13° 20'</b>). Berikut adalah daftar lengkap 28 Manazil al-Qamar beserta karakteristik energi dan rekomendasi hikmahnya:
    """
    story.append(Paragraph(manazil_intro, style_body))

    manazil_full_data = [
        [Paragraph("<b>No</b>", style_th), Paragraph("<b>Nama Manazil al-Qamar</b>", style_th), Paragraph("<b>Rentang Ekliptika</b>", style_th), Paragraph("<b>Karakter & Rekomendasi Hikmah</b>", style_th)],
        [Paragraph("1", style_td), Paragraph("Al-Syaratain (الشرطين)", style_td), Paragraph("0°00' - 13°20' Aries", style_td), Paragraph("Awal Baru & Ketegasan. Baik untuk memulai usaha & perjalanan.", style_td)],
        [Paragraph("2", style_td), Paragraph("Al-Butain (البطين)", style_td), Paragraph("13°20' - 26°40' Aries", style_td), Paragraph("Pertumbuhan & Keberhasilan. Baik untuk perdagangan & pertanian.", style_td)],
        [Paragraph("3", style_td), Paragraph("Al-Tsurayya (الثريا)", style_td), Paragraph("26°40' Ar - 10°00' Tau", style_td), Paragraph("Keberkahan & Kemuliaan. Sangat baik untuk mahabbah & doa.", style_td)],
        [Paragraph("4", style_td), Paragraph("Al-Dabaran (الدبران)", style_td), Paragraph("10°00' - 23°20' Taurus", style_td), Paragraph("Ketegasan & Keberanian. Hindari perselisihan emosional.", style_td)],
        [Paragraph("5", style_td), Paragraph("Al-Haq'ah (الهقعة)", style_td), Paragraph("23°20' Tau - 6°40' Gem", style_td), Paragraph("Ilmu & Kebijaksanaan. Baik untuk belajar, mengajar & menulis.", style_td)],
        [Paragraph("6", style_td), Paragraph("Al-Han'ah (الهنعة)", style_td), Paragraph("6°40' - 20°00' Gemini", style_td), Paragraph("Kemesraan & Perjanjian. Baik untuk persahabatan & nikah.", style_td)],
        [Paragraph("7", style_td), Paragraph("Al-Dzira' (الذراع)", style_td), Paragraph("20°00' Gem - 3°20' Can", style_td), Paragraph("Kelapangan & Kemenangan. Keuntungan dalam bisnis & hajat.", style_td)],
        [Paragraph("8", style_td), Paragraph("Al-Natsrah (النثرة)", style_td), Paragraph("3°20' - 16°40' Cancer", style_td), Paragraph("Kecerdasan & Kesembuhan. Baik untuk pengobatan & kesehatan.", style_td)],
        [Paragraph("9", style_td), Paragraph("Al-Tarf (الطرف)", style_td), Paragraph("16°40' - 30°00' Cancer", style_td), Paragraph("Kewaspadaan & Ketelitian. Hindari keputusan emosional.", style_td)],
        [Paragraph("10", style_td), Paragraph("Al-Jabhah (الجبهة)", style_td), Paragraph("0°00' - 13°20' Leo", style_td), Paragraph("Kepemimpinan & Wibawa. Sangat baik menghadap pimpinan/pejabat.", style_td)],
        [Paragraph("11", style_td), Paragraph("Al-Zubrah (الزبرة)", style_td), Paragraph("13°20' - 26°40' Leo", style_td), Paragraph("Kekuatan & Pertolongan. Baik untuk kerjasama & benteng.", style_td)],
        [Paragraph("12", style_td), Paragraph("Al-Sarfah (الصرفة)", style_td), Paragraph("26°40' Leo - 10°00' Vir", style_td), Paragraph("Perubahan & Transformasi. Perjalanan & pemindahan.", style_td)],
        [Paragraph("13", style_td), Paragraph("Al-Awwa (العواء)", style_td), Paragraph("10°00' - 23°20' Virgo", style_td), Paragraph("Kelancaran Rezeki. Terbaik untuk perdagangan & belanja.", style_td)],
        [Paragraph("14", style_td), Paragraph("Al-Simak (السماك)", style_td), Paragraph("23°20' Vir - 6°40' Lib", style_td), Paragraph("Kedamaian & Kedudukan Tinggi. Sangat diberkahi & damai.", style_td)],
        [Paragraph("15", style_td), Paragraph("Al-Ghafr (الغفر)", style_td), Paragraph("6°40' - 20°00' Libra", style_td), Paragraph("Keselamatan & Perlindungan. Tolak bala & benteng diri.", style_td)],
        [Paragraph("16", style_td), Paragraph("Al-Zubana (الزبانا)", style_td), Paragraph("20°00' Lib - 3°20' Sco", style_td), Paragraph("Keadilan & Keseimbangan. Penyelesaian sengketa & nego.", style_td)],
        [Paragraph("17", style_td), Paragraph("Al-Iklil (الإكليل)", style_td), Paragraph("3°20' - 16°40' Scorpio", style_td), Paragraph("Mahkota & Kejayaan. Baik untuk memulai proyek besar.", style_td)],
        [Paragraph("18", style_td), Paragraph("Al-Qalb (القلب)", style_td), Paragraph("16°40' - 30°00' Scorpio", style_td), Paragraph("Puncak Energi Hati. Jaga emosi & fokus khusyuk doa.", style_td)],
        [Paragraph("19", style_td), Paragraph("Al-Syaulah (الشولة)", style_td), Paragraph("0°00' - 13°20' Sag", style_td), Paragraph("Ketangkasan & Keberanian. Olahraga & ketegasan.", style_td)],
        [Paragraph("20", style_td), Paragraph("Al-Na'aam (النعائم)", style_td), Paragraph("13°20' - 26°40' Sag", style_td), Paragraph("Keberuntungan Rezeki. Berkah dalam usaha & perjalanan.", style_td)],
        [Paragraph("21", style_td), Paragraph("Al-Baldah (البلدة)", style_td), Paragraph("26°40' Sag - 10°00' Cap", style_td), Paragraph("Ketenangan Keturunan & Rumah. Pemukiman & ketenangan.", style_td)],
        [Paragraph("22", style_td), Paragraph("Sa'd al-Dhabih (سعد الذابح)", style_td), Paragraph("10°00' - 23°20' Cap", style_td), Paragraph("Keteguhan & Ketahanan. Baik untuk kholwat & ibadah.", style_td)],
        [Paragraph("23", style_td), Paragraph("Sa'd Bula' (سعد بلع)", style_td), Paragraph("23°20' Cap - 6°40' Aqu", style_td), Paragraph("Kesembuhan & Penyucian. Baik untuk pengobatan.", style_td)],
        [Paragraph("24", style_td), Paragraph("Sa'd al-Su'ud (سعد السعود)", style_td), Paragraph("6°40' - 20°00' Aqu", style_td), Paragraph("Puncak Keberuntungan & Kebahagiaan Utama.", style_td)],
        [Paragraph("25", style_td), Paragraph("Sa'd al-Akhbiyah (سعد الأخبية)", style_td), Paragraph("20°00' Aqu - 3°20' Pis", style_td), Paragraph("Pembukaan Rahasia & Rezeki Tersembunyi.", style_td)],
        [Paragraph("26", style_td), Paragraph("Al-Fargh al-Mukdam (الفرغ المقدم)", style_td), Paragraph("3°20' - 16°40' Pis", style_td), Paragraph("Kemurahan Hati & Rezeki Melimpah.", style_td)],
        [Paragraph("27", style_td), Paragraph("Al-Fargh al-Mu'akhar (الفرغ المؤخر)", style_td), Paragraph("16°40' - 30°00' Pis", style_td), Paragraph("Penyelesaian Tugas & Hasil Akhir Usaha.", style_td)],
        [Paragraph("28", style_td), Paragraph("Risha / Batn al-Hut (الرشاء)", style_td), Paragraph("26°40' Pis - 0°00' Ari", style_td), Paragraph("Kelimpahan Rezeki Laut & Perdagangan.", style_td)]
    ]
    t_manazil_full = Table(manazil_full_data, colWidths=[22, 140, 128, 233])
    t_manazil_full.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('PADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_manazil_full)
    story.append(Spacer(1, 14))

    # ==================== BAB 5: SINTESIS KONSENSUS LINTAS TRADISI ====================
    story.append(Paragraph("BAB 5: SINTESIS KONSENSUS WAKTU & APLIKASI PRAKTIS", style_h1))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT_GOLD, spaceAfter=8))

    sintesis_text = """
    Setelah membedah ke-4 tradisi besar peradaban dunia, kita menemukan satu muara konsensus universal yang utuh:
    <br/><br/>
    <b>1. Konsensus Momen Keberkahan (Sa'ad Akbar & Rejeki):</b><br/>
    Seluruh tradisi sepakat bahwa momen terbaik untuk membuka hajat rezeki, pernikahan, dan doa sakral jatuh pada jam yang dikuasai oleh energi <b>Jupiter (Mushtari)</b> / <b>Amrit</b> / <b>Saat Rejeki Jawa</b>. Momen ini diperkuat jika terjadi di luar jam <i>Rahukaal</i>.
    <br/><br/>
    <b>2. Konsensus Momen Pengetatan (Kala & Rahukaal):</b><br/>
    Setiap tradisi memperingatkan agar tidak memulai urusan penting pada jam <b>Saturnus (Zuhal)</b>, jam <b>Kaal</b>, atau slot <b>Rahukaal</b>. Waktu-waktu ini dialokasikan khusus untuk pembersihan diri, benteng spiritual, dan permohonan perlindungan dari marabahaya.
    <br/><br/>
    <b>3. Penggunaan Aplikasi Kalkulator Falakiah 3D:</b><br/>
    Untuk mempermudah penerapannya tanpa perlu menghitung rumus manual yang rumit, Anda dapat menggunakan aplikasi Web App presisi kami di <b>https://arifwidiyanto.web.id/falakiah/</b> yang telah mengintegrasikan seluruh perhitungan ini secara otomatis dan 100% offline.
    """
    story.append(Paragraph(sintesis_text, style_body))
    story.append(Spacer(1, 16))

    close_content = [[
        Paragraph("<b>Disusun untuk Edukasi & Kebijaksanaan Hidup</b><br/><i>'Semoga Allah SWT senantiasa membimbing langkah kita dalam keberkahan waktu dan melapangkan setiap hajat kebaikan.'</i><br/><br/><b>Arif Widiyanto</b> * arifwidiyanto.web.id", ParagraphStyle('CloseStyle', parent=styles['Normal'], alignment=1, textColor=C_PRIMARY, fontSize=9, leading=13.5))
    ]]
    close_table = Table(close_content, colWidths=[523])
    close_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_GOLD_BG),
        ('BORDER', (0,0), (-1,-1), 1, C_ACCENT_GOLD),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(close_table)

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated: {filename}")

if __name__ == '__main__':
    output_filename = "C:\\Users\\user\\OneDrive\\Documents\\ARIF\\arifwidiyanto.web.id\\falakiah\\Materi-Falakiah-Waktu-Baik-dan-Nahas.pdf"
    build_pdf(output_filename)
