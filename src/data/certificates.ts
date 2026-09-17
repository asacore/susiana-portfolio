export type CertificateCategory = "Gunadarma" | "LPK" | "Bootcamp";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: CertificateCategory;
  date: string;
  credentialId?: string;      // Nomor sertifikat, kalau tercantum di PDF
  credentialUrl?: string;     // Link verifikasi ONLINE pihak ketiga (kalau ada)
  pdfPath?: string;           // Path file PDF di /public/certificates (kalau tidak ada verifikasi online)
  skills?: string[];
  description?: string;
}

// Semua file PDF ditaruh rata di satu folder: /public/certificates/
// Sesuaikan nama file di bawah ini persis dengan nama file yang kamu taruh di folder itu.

export const certificatesData: CertificateItem[] = [
  /* ══════════════════════════════════════════════════════════════════
     GUNADARMA (Internal Kampus, Pelatihan & Organisasi)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "cert-guna-web-basic-2023",
    title: "Dasar Pemrograman Berbasis Web",
    issuer: "Universitas Gunadarma",
    category: "Gunadarma",
    date: "Februari 2023",
    credentialId: "773638",
    pdfPath: "/certificates/dasar-pemrograman-berbasis-web-2023.pdf",
    skills: ["Web Programming", "Go", "J2EE & Servlet", ".NET & C#", "ASP.NET"],
    description:
      "Pelatihan dasar pemrograman berbasis web mencakup pengenalan Go, J2EE/Servlet, Java Server Page, serta .NET Framework dan C# untuk pengembangan aplikasi web.",
  },
  {
    id: "cert-guna-dbms-fundamental-2023",
    title: "Dasar Sistem Manajemen Basis Data",
    issuer: "Universitas Gunadarma",
    category: "Gunadarma",
    date: "Agustus 2023",
    credentialId: "210920",
    pdfPath: "/certificates/dasar-sistem-manajemen-basis-data-2023.pdf",
    skills: ["MySQL", "SQL Server", "Oracle", "Database Design"],
    description:
      "Pelatihan konsep dasar database relasional serta praktik DDL & DML pada MySQL, SQL Server, dan Oracle.",
  },
  {
    id: "cert-guna-go-beginner-2024",
    title: "Pemrograman Go untuk Tingkat Pemula",
    issuer: "Universitas Gunadarma",
    category: "Gunadarma",
    date: "Februari 2024",
    credentialId: "713898",
    pdfPath: "/certificates/pemrograman-go-pemula-2024.pdf",
    skills: ["Go Language", "Polymer", "Web Server"],
    description:
      "Pelatihan dasar bahasa pemrograman Go mencakup variabel, tipe data, struct, pointer, slice, map, hingga instalasi dan routing dengan Polymer.",
  },
  {
    id: "cert-guna-oracle-beginner-2024",
    title: "Oracle untuk Tingkat Pemula",
    issuer: "Universitas Gunadarma",
    category: "Gunadarma",
    date: "Agustus 2024",
    credentialId: "486567",
    pdfPath: "/certificates/oracle-pemula-2024.pdf",
    skills: ["Oracle 11g", "PL/SQL", "Database Administration"],
    description:
      "Pelatihan instalasi Oracle 11g, pembuatan database & user, single-row functions, hingga dasar PL/SQL.",
  },
  {
    id: "cert-guna-gdgoc-bootcamp-mentee-2025",
    title: "Mentee — Bootcamp Kilat GDG on Campus UG x Neotic.id",
    issuer: "Google Developer Groups on Campus (GDGoC) Universitas Gunadarma",
    category: "Gunadarma",
    date: "31 Maret 2025",
    credentialId: "BSS180325P20",
    pdfPath: "/certificates/gdgoc-bootcamp-kilat-mentee-2025.pdf",
    skills: ["UI/UX", "Mentorship", "Active Participation"],
    description:
      "Sertifikat apresiasi sebagai Mentee pada program Bootcamp Kilat GDG on Campus UG x Neotic.id 2025 atas dedikasi dan partisipasi aktif selama program.",
  },
  {
    id: "cert-guna-gdgoc-uiux-week1-2025",
    title: "Weekly Class UI/UX — Week 1: Think Like a User",
    issuer: "Google Developer Groups on Campus (GDGoC) Universitas Gunadarma",
    category: "Gunadarma",
    date: "10 Januari 2025",
    credentialId: "WYUIUX10012590PT",
    pdfPath: "/certificates/gdgoc-weekly-class-uiux-week1-2025.pdf",
    skills: ["UX Design Essentials", "User Research"],
    description:
      "Partisipasi pada Week 1 Weekly Class UI/UX: 'Think Like a User: Practical UX Design Essentials'.",
  },
  {
    id: "cert-guna-gdgoc-uiux-week2-2025",
    title: "Weekly Class UI/UX — Week 2: UI, Branding & AI Era",
    issuer: "Google Developer Groups on Campus (GDGoC) Universitas Gunadarma",
    category: "Gunadarma",
    date: "17 Januari 2025",
    credentialId: "WYUIUX17012518PT",
    pdfPath: "/certificates/gdgoc-weekly-class-uiux-week2-2025.pdf",
    skills: ["UI Design", "Branding", "Design in the AI Era"],
    description:
      "Partisipasi pada Week 2 Weekly Class UI/UX: 'UI, Branding, and the Evolving Role of Designers in the AI Era'.",
  },
  {
    id: "cert-guna-gdgoc-techtalk-2025",
    title: "Tech Talk UI/UX — Design Your Future",
    issuer: "Google Developer Groups on Campus (GDGoC) Universitas Gunadarma",
    category: "Gunadarma",
    date: "25 Januari 2025",
    credentialId: "MYUIUX2501251PT",
    pdfPath: "/certificates/gdgoc-tech-talk-uiux-2025.pdf",
    skills: ["Career Development", "UI/UX Industry Insight"],
    description:
      "Partisipasi pada Tech Talk UI/UX: 'Design Your Future: Mastering UI/UX and Career Essentials'.",
  },
  {
    id: "cert-guna-go-intermediate-2025",
    title: "Pemrograman Go untuk Tingkat Menengah",
    issuer: "Universitas Gunadarma",
    category: "Gunadarma",
    date: "Februari 2025",
    credentialId: "094764",
    pdfPath: "/certificates/pemrograman-go-menengah-2025.pdf",
    skills: ["Go Language", "Unit Testing", "HTTP Request", "Deployment"],
    description:
      "Pelatihan lanjutan bahasa Go mencakup TDD & unit test, function & method, SQL pada Go, HTTP request, hingga deployment aplikasi.",
  },
  {
    id: "cert-guna-oracle-intermediate-2025",
    title: "Oracle untuk Tingkat Menengah",
    issuer: "Universitas Gunadarma",
    category: "Gunadarma",
    date: "Agustus 2025",
    credentialId: "178748",
    pdfPath: "/certificates/oracle-menengah-2025.pdf",
    skills: ["Oracle", "PL/SQL", "Cursors & Exception Handling"],
    description:
      "Pelatihan lanjutan Oracle mencakup pembuatan tabel & view, sub query, explicit cursors, hingga penanganan kesalahan (exception handling).",
  },
  {
    id: "cert-guna-web-design-basic-2025",
    title: "Dasar Perancangan Aplikasi Web",
    issuer: "Universitas Gunadarma",
    category: "Gunadarma",
    date: "22–27 September 2025",
    credentialId: "051281",
    pdfPath: "/certificates/dasar-perancangan-aplikasi-web-2025.pdf",
    skills: ["System Analysis", "Database Design", "UI Design", "PHP & XAMPP"],
    description:
      "Pelatihan perancangan aplikasi web dari analisis sistem, perancangan database & UI, hingga implementasi dengan PHP dan XAMPP.",
  },
  {
    id: "cert-guna-js-fundamental-2025",
    title: "Dasar Bahasa Pemrograman JavaScript",
    issuer: "Universitas Gunadarma",
    category: "Gunadarma",
    date: "5 Desember 2025",
    credentialId: "678621",
    pdfPath: "/certificates/javascript-fundamental-2025.pdf",
    skills: ["JavaScript", "OOP Fundamentals", "DOM Basics"],
    description:
      "Pelatihan dasar JavaScript mencakup struktur program, tipe data, array, percabangan & perulangan, serta pemrograman berorientasi objek.",
  },
  {
    id: "cert-guna-web-app-dev-2026",
    title: "Dasar Pembuatan Aplikasi Web",
    issuer: "Universitas Gunadarma",
    category: "Gunadarma",
    date: "25 Mei – 6 Juni 2026",
    credentialId: "417659",
    pdfPath: "/certificates/dasar-pembuatan-aplikasi-web-2026.pdf",
    skills: ["System Development", "Database Implementation", "UI Implementation"],
    description:
      "Pelatihan pembuatan aplikasi web dari pengenalan tools, pembuatan sistem, implementasi database, UI, hingga bahasa pemrograman.",
  },

  /* ══════════════════════════════════════════════════════════════════
     LPK LUAR (Lembaga Pelatihan Kerja & Sertifikasi Profesi)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "cert-lpk-geti-uiux-mobile-2024",
    title: "Belajar Mendesain UI/UX Aplikasi Mobile bagi Calon Desainer UI/UX",
    issuer: "LPK GeTI Incubator",
    category: "LPK",
    date: "20 Juli 2024",
    credentialId: "A.541289/PKPK/GETI/VII/2024",
    pdfPath: "/certificates/lpk-geti-uiux-mobile-2024.pdf",
    skills: ["UI Design", "UX Design", "SKKNI No. 44 Tahun 2017"],
    description:
      "Sertifikat penyelesaian pelatihan 15 jam mendesain UI/UX aplikasi mobile, mengacu pada SKKNI No. 44 Tahun 2017 tentang Software Development, diverifikasi oleh Prakerja.",
  },
  {
    id: "cert-lpk-dian-nusantara-frontend-2024",
    title: "Membangun Website (Frontend Web Development)",
    issuer: "LPK Dian Nusantara — via Karier.mu",
    category: "LPK",
    date: "18 Agustus 2024",
    credentialId: "10625823",
    pdfPath: "/certificates/lpk-dian-nusantara-frontend-2024.pdf",
    skills: ["HTML/CSS", "User Interface", "SKKNI No. 282 Tahun 2016"],
    description:
      "Sertifikat penyelesaian program Membangun Website (Frontend Web Development) dengan predikat Sangat Baik, durasi belajar 15 jam, nilai aktivitas 85. Diverifikasi oleh Prakerja.",
  },

  /* ══════════════════════════════════════════════════════════════════
     BOOTCAMP LUAR (Bootcamp & Program Eksternal)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "cert-bootcamp-generationgirl-2023",
    title: "Front End Week 1 — Summer Club Explorer",
    issuer: "Generation Girl",
    category: "Bootcamp",
    date: "11–22 September 2023",
    pdfPath: "/certificates/generation-girl-summer-club-explorer-2023.pdf",
    skills: ["Front End Basics", "HTML/CSS"],
    description:
      "Menyelesaikan course Front End Week 1 dalam program Summer Club Explorer 2023 by Generation Girl, didukung SAP, Peak XV, Gojek, Coffee Ventures, Banana Capital, Monk's Hill Ventures, dan Brodo.",
  },
  {
    id: "cert-bootcamp-dibimbing-dsf23",
    title: "DSF 23 — Front End Developer",
    issuer: "dibimbing.id",
    category: "Bootcamp",
    date: "2023",
    pdfPath: "/certificates/dibimbing-dsf23-frontend-developer.pdf",
    skills: ["Front End Development"],
    description:
      "Sertifikat partisipasi aktif dalam program DSF 23 — Front End Developer oleh dibimbing.id.",
  },
  {
    id: "cert-bootcamp-efset-english-2026",
    title: "EF SET English Certificate — C2 Proficient",
    issuer: "EF Standard English Test (EF SET)",
    category: "Bootcamp",
    date: "12 Juli 2026",
    credentialUrl: "https://cert.efset.org/id/dffdcG",
    skills: ["English Proficiency", "Reading", "Listening", "CEFR C2"],
    description:
      "Sertifikat kemampuan bahasa Inggris dari EF SET dengan skor 94/100, setara level C2 Mahir (Proficient) sesuai Kerangka Acuan Umum Eropa (CEFR) — Membaca: 100, Mendengarkan: 87.",
  },
];