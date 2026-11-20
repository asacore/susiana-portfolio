export interface ProjectGalleryItem {
  image: string;
  title: string;
}

export interface ProjectLinks {
  instagram?: string;  // Link ke postingan Instagram / Carousel
  twibbon?: string;    // Link Twibbon / Google Drive asset
  prototype?: string;  // Link Figma Prototype / Canvas
  github?: string;     // Link GitHub repository
  live?: string;       // Link Live Website / Demo
  guidebook?: string;  // Link PDF Guidebook / dokumen panduan
  handbook?: string;   // Link PDF Handbook / dokumen panduan
  pdf?: string;        // Link file PDF / dokumen
  video?: string;      // Link video / file media
}

export interface ProjectItem {
  id: string;
  title: string;
  category:
  | "Graphic Design"
  | "UI/UX Design"
  | "Web Development"
  | "Photography"
  | "Video Editing";
  institution:
  | "Gunadarma I/O"
  | "Media Mahasiswa Gunadarma"
  | "UI/UX Case Study"
  | "Gunadarma University"
  | "Gunadarma Code Week 2.0"
  | "SMK Bakti Mandiri"
  | "Freelance";
  tag: string;
  image: string;
  video?: string;
  width: number;
  height: number;
  featured?: boolean;
  gallery?: ProjectGalleryItem[];
  description?: string;
  award?: string;
  group?: string;
  groupDescription?: string;
  links?: ProjectLinks;
}

export const projectsData: ProjectItem[] = [

  /* ══════════════════════════════════════════════════════════════════
     Gunadarma Code Week 2.0 (Graphic Design)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "gcw-coming-soon",
    title: "Gunadarma Code Week 2.0 — Coming Soon",
    category: "Graphic Design",
    institution: "Gunadarma Code Week 2.0",
    tag: "Key Visual & Announcement",
    image: "/project gcw 2.0/COMING SOON GCW.png",
    width: 1080,
    height: 1440,
    featured: true,
    links: {
      instagram: "https://www.instagram.com/p/DWlG2a7knTJ/?stkn=eWVwYWtxZmxjaHZk",
    }
  },
  {
    id: "gcw-hc-handbook",
    title: "HC Handbook — Gunadarma Code Week 2.0",
    category: "Graphic Design",
    institution: "Gunadarma Code Week 2.0",
    tag: "Handbook Design",
    image: "/project gcw 2.0/HC - Handbook cover.png",
    width: 1080,
    height: 1440,
    featured: true,
    description:
      "Hackathon Judges Handbook for Gunadarma Code Week 2.0, designed to guide the judging panel through the competition timeline (Proposal Submission, Video Pitch & Deck, and Grand Final), the 6-component scoring breakdown, and the judges' evaluation flow and responsibilities.",
    links: {
      handbook: "/project gcw 2.0/HC - Handbook.pdf",
    },
  },
  {
    id: "gcw-hc-guidebook",
    title: "HC Guidebook — Gunadarma Code Week 2.0",
    category: "Graphic Design",
    institution: "Gunadarma Code Week 2.0",
    tag: "Guidebook Design",
    image: "/project gcw 2.0/HC - Guidebook cover.png",
    width: 1080,
    height: 1440,
    description:
      "Official Hackathon Guidebook for Gunadarma Code Week 2.0 under the theme \"BuildLocal: Tech Solutions for Indonesian MSMEs.\" Covers the competition description, sub-themes, participant requirements, timeline, technical execution across three phases, registration procedure, scoring components, and prizes.",
    links: {
      guidebook: "/project gcw 2.0/HC - Guidebook.pdf",
    },
  },

  /* ══════════════════════════════════════════════════════════════════
     WEB DEVELOPMENT (Academic / Thesis Project)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "web-jajanbekasi",
    title: "JajanBekasi! — Local Culinary Recommendation Website",
    category: "Web Development",
    institution: "Gunadarma University",
    tag: "Thesis Project",
    image: "/project web/jajanbekasi.png",
    width: 1920,
    height: 1080,
    featured: true,
    description:
      "JajanBekasi! is a web-based local culinary recommendation platform for Bekasi City, developed as a thesis project. The system applies content-based filtering and KNN to generate relevant culinary recommendations, complemented by a rule-based chatbot to help users discover local food options.",
    links: {
      live: "https://jajanbekasi.web.id/",
    },
  },
  /* ══════════════════════════════════════════════════════════════════
     UI/UX DESIGN (GDGoC Gunadarma / Case Studies)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "uiux-d2fashion",
    title: "D Two Fashion Web Application",
    category: "UI/UX Design",
    institution: "Gunadarma University",
    tag: "research project",
    image: "/uiux/d2fashion.png",
    width: 6302,
    height: 5105,
    featured: true,
    description:
      "A UI/UX web design project for D Two Fashion aiming to digitize and streamline product management. Developed through the Design Thinking framework using Figma and validated via Maze usability testing, achieving an Excellent Usability Score of 92 and 98% SUS score.",
    links: {
      prototype: "https://www.figma.com/proto/wwaJU6ThGMwKv3sqFPTEG9/D-Two-Fashion?page-id=4%3A4&node-id=400-135&starting-point-node-id=400%3A135&t=woQCl5o8quvwAafS-1",
    },
  },
  {
    id: "uiux-delicieux",
    title: "Delicieux — French Dessert Mobile App",
    category: "UI/UX Design",
    institution: "UI/UX Case Study",
    tag: "1st Place Winner • GDGoC",
    image: "/uiux/MOCKUP.png",
    width: 6302,
    height: 5105,
    featured: true,
    award: "1st Place Winner — UI/UX Competition by Google Developer Groups on Campus (GDGoC) Gunadarma (2025)",
    description:
      "Delicieux is a mobile app for selling French-style desserts like croissants and pastries. Designed as a case study, it focuses on branding, target audience, and app prototyping, with a user-friendly interface for dessert lovers of all ages.",
    links: {
      prototype: "https://www.figma.com/proto/JzcSPYcrY8cPqt0NjjNHcK/Delicieux?node-id=1-463&t=aupmG6VCambsrrhK-1",
    },
  },
  {
    id: "uiux-bca",
    title: "BCA Mobile Banking App Redesign",
    category: "UI/UX Design",
    institution: "UI/UX Case Study",
    tag: "Mobile App UI/UX",
    image: "/uiux/bca.png",
    width: 2909,
    height: 1404,
    featured: true,
    description:
      "A collaborative redesign of BCA Mobile Banking by Susiana Salsa Putri, Amara, Huwaida, and Rosalinda, focused on improving usability and modernizing the interface while maintaining BCA’s brand identity. The result offers cleaner navigation, clearer visuals, and a more secure, user-friendly banking experience.",
  },
  {
    id: "uiux-ecommerce",
    title: "Mobile E-Commerce Gaming Experience",
    category: "UI/UX Design",
    institution: "UI/UX Case Study",
    tag: "Mobile App UI/UX",
    image: "/uiux/mobille ecommerce.png",
    width: 6096,
    height: 2942,
    featured: true,
  },
  {
    id: "web-notes",
    title: "NOTICE! — Minimalist Note-Taking Web App",
    category: "Web Development",
    institution: "Gunadarma University",
    tag: "Productivity App",
    image: "/project web/notice!.png",
    width: 10272,
    height: 9372,
    featured: true,
    description:
      "NOTICE! is a minimalist note-taking web application that supports dynamic notes, to-do checklists, and bookmarks organized into custom folders. Built collaboratively as a university group assignment.",
    group: "Group Project",
    groupDescription:
      "Built as a group assignment for a university course, together with Gita Pangestuti (UI/UX Designer) and Cindy Novita Hidayat (Database); my role was the developer.",
    gallery: [
      {
        image: "/uiux/notes.png",
        title: "UI/UX Wireframes — NOTICE! Web App (Design by Gita Pangestuti)",
      },
    ],
    links: {
      github: "https://github.com/asacore/web-notes",
    },
  },
  {
    id: "web-yursayur",
    title: "Yur Sayur! — Vegetable Marketplace Website",
    category: "Web Development",
    institution: "Gunadarma University",
    tag: "Group Project",
    image: "/project web/yur-sayur.png",
    width: 1920,
    height: 1080,
    group: "Group Project",
    groupDescription:
      "Built as a group assignment together with Asti, Belinda, Aldiansya, and Malvin; my role was the developer.",
    links: {
      github: "https://github.com/asacore/yur-sayur",
    },
  },
  {
    id: "web-spskenanga",
    title: "SPS Kenanga — Kindergarten School Website",
    category: "Web Development",
    institution: "Gunadarma University",
    tag: "Group Project",
    image: "/project web/sps-kenanga.png",
    width: 1920,
    height: 1080,
    group: "Group Project",
    groupDescription:
      "Final project for the Software & Information Systems Design (PPSI) course, submitted in place of the midterm exam, with Asti (UI/UX), Belinda (Project Manager), Aldiansya & Pretty (Business Analysts), Susiana (Programmer), and Malvin (Testing).",
    links: {
      github: "https://github.com/asacore/sps-kenanga",
    },
  },
  {
    id: "web-inventaris",
    title: "Sistem Inventaris — CodeIgniter 4 Inventory Management",
    category: "Web Development",
    institution: "Gunadarma University",
    tag: "LSP Certification Project",
    image: "/project web/inventaris.png",
    width: 1920,
    height: 1080,
    description:
      "An inventory management web application built with CodeIgniter 4, developed as a project for LSP (Lembaga Sertifikasi Profesi) certification.",
    links: {
      github: "https://github.com/asacore/inventaris-ci4",
    },
  },
  {
    id: "uiux-home-dashboard",
    title: "Home Buying & Rental Mobile App UI",
    category: "UI/UX Design",
    institution: "UI/UX Case Study",
    tag: "Mobile App UI System",
    image: "/uiux/HOME UI.png",
    width: 2602,
    height: 1794,
    featured: true,
  },

  /* ══════════════════════════════════════════════════════════════════
     GUNADARMA I/O (Graphic Design & Photography)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "io-journey-recap-2025-2026",
    title: "Gunadarma I/O — Journey Recap 2025/2026",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Social Media Carousel",
    image: "/project io/RECAP 1_LEFT.jpg",
    width: 2160,
    height: 2880,
    featured: true,
    gallery: [
      {
        image: "/project io/RECAP 1_LEFT.jpg",
        title: "Journey Recap 2025/2026 — Part 1 (Left Feed)",
      },
      {
        image: "/project io/RECAP 2_MIDDLE.jpg",
        title: "Journey Recap 2025/2026 — Part 2 (Middle Feed)",
      },
      {
        image: "/project io/RECAP 3_RIGHT.jpg",
        title: "Journey Recap 2025/2026 — Part 3 (Right Feed)",
      },
    ],
    description:
      "A visual recap capturing the memorable moments, activities, and journey of Gunadarma I/O throughout the 2025/2026 period. Designed as a seamless Instagram carousel feed showcasing community milestones, workshops, events, and collaborative achievements.",
  },
  {
    id: "io-codefest-pdd-photography",
    title: "Codefest 4.0 — Event Documentation & Photography",
    category: "Photography",
    institution: "Gunadarma I/O",
    tag: "Event Photography • Divisi PDD",
    image: "/project io/codefest (1).jpg",
    width: 2000,
    height: 1333,
    featured: true,
    gallery: [
      {
        image: "/project io/codefest (1).jpg",
        title: "Awarding Ceremony — 1st Champion Codefest 4.0",
      },
      {
        image: "/project io/codefest (3).jpg",
        title: "Podium Session — Champions & Organizing Committee",
      },
      {
        image: "/project io/codefest (4).jpg",
        title: "Grand Photo — All Participants, Mentors & Committee",
      },
      {
        image: "/project io/codefest (7).jpg",
        title: "Hackathon Hacking Session & Participant Discussion",
      },
      {
        image: "/project io/codefest (11).jpg",
        title: "Live Competitive Programming on Stage",
      },
    ],
    description:
      "Dokumentasi fotografi resmi untuk rangkaian kompetisi teknologi Codefest 4.0 yang diselenggarakan oleh Gunadarma I/O. Bertanggung jawab penuh sebagai anggota Divisi PDD (Publikasi, Dekorasi, dan Dokumentasi) saat Codefest, yang meliput dan mendokumentasikan keseluruhan momen berharga dari awal hingga akhir acara—mulai dari sesi hackathon peserta, asistensi mentor, presentasi karya, hingga serah terima piala dan awarding ceremony kepada para juara.",
    links: {
      pdf: "/project io/certificate codefest 4.0.pdf",
    },
  },
  {
    id: "io-codefest-certificate-design",
    title: "Codefest 4.0 — Official Certificate Design",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Certificate Design • Codefest 4.0",
    image: "/project io/certificate codefest 4.0.png",
    width: 1684,
    height: 1190,
    featured: true,
    description:
      "Desain sertifikat penghargaan dan partisipasi resmi untuk kompetisi teknologi Codefest 4.0 yang diselenggarakan oleh Gunadarma I/O. Mengusung identitas visual modern bertema deep blue dan neon tech nodes, tata letak tipografi yang proporsional, serta struktur pengesahan formal oleh Faculty Advisor, Lead Gunadarma I/O, dan Chief Executive Codefest 4.0.",
    links: {
      pdf: "/project io/certificate codefest 4.0.pdf",
    },
  },
  {
    id: "io-weekly-class-1",
    title: "Weekly Class IoT #1: Rheval Keiza",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Key Visual & Poster",
    image: "/project io/Weekly Class 1_IoT_Rheval Keiza.png",
    width: 1080,
    height: 1440,
    featured: true,
    links: {
      instagram: "https://www.instagram.com/p/DTtw71mkj0C/?stkn=bWtzZnlkZWQ3NjBp",
    },
  },
  {
    id: "io-twibbon-codefest",
    title: "Official Codefest 4.0 Twibbon Campaign",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Campaign & Twibbon",
    image: "/project io/TWIBBON PESERTA CODEFEST OFFICIAL.png",
    width: 1080,
    height: 1440,
    featured: true,
    links: {
      twibbon: "https://www.twibbonize.com/twibboncf4-0",
    },
  },
  {
    id: "io-merch-notebook",
    title: "Gunadarma I/O Official Notebook Merch",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Merchandise Design",
    image: "/project io/Merch_Notebook_IO.png",
    width: 2045,
    height: 1534,
    featured: true,
  },
  {
    id: "io-merch-totebag",
    title: "Gunadarma I/O Official Tote Bag",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Merchandise Design",
    image: "/project io/Merch_ToteBag_IO.png",
    width: 1764,
    height: 1323,
    featured: true,
  },
  {
    id: "io-thumbnail-yt",
    title: "YouTube Thumbnail: Weekly Class IoT Week 1",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Digital Asset & Thumbnail",
    image: "/project io/THUMBNAIL YT FINAL Week 1_IoT.png",
    width: 1280,
    height: 720,
  },
  {
    id: "io-vbg-zoom",
    title: "Virtual Background: IoT Weekly Class",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Virtual Asset",
    image: "/project io/VBG ZOOM_IoT.png",
    width: 1920,
    height: 1080,
  },
  {
    id: "io-awareness-1",
    title: "IoT Awareness Series - Part 1",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Social Media Carousel",
    image: "/project io/AWARENESS 1_IoT_Slide 1.png",
    width: 1080,
    height: 1440,
    links: {
      instagram: "https://www.instagram.com/p/DT1hKodkodA/?stkn=eDB5aHczdzB5dms3",
    }
  },
  {
    id: "io-awareness-2",
    title: "IoT Awareness Series - Part 2",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Social Media Carousel",
    image: "/project io/AWARENESS 2_IoT_Slide 1.png",
    width: 1080,
    height: 1440,
    links: {
      instagram: "https://www.instagram.com/p/DUIDIccEjMB/?stkn=MTY1ZXVoYmJta2M1bw==",
    }
  },
  {
    id: "io-awareness-3",
    title: "IoT Awareness Series - Part 3",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Social Media Carousel",
    image: "/project io/AWARENESS 3_IoT_Slide 1.png",
    width: 1080,
    height: 1440,
    links: {
      instagram: "https://www.instagram.com/p/DVNfGc4EoXO/?stkn=MXQxOWVpczEzMGx0Zg==",
    }
  },
  {
    id: "io-awareness-4",
    title: "IoT Awareness Series - Part 4",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Social Media Carousel",
    image: "/project io/AWARENESS 4_IoT_Slide 1.png",
    width: 1080,
    height: 1440,
    links: {
      instagram: "https://www.instagram.com/p/DVfoFFJko0p/?stkn=b3lubG93MWloNnNh",
    }
  },
  {
    id: "io-oprec",
    title: "Gunadarma I/O Community Open Recruitment",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Recruitment Campaign",
    image: "/project io/OPREC MEMBER COMMUNITY.png",
    width: 1080,
    height: 1440,
  },
  {
    id: "io-vice-lead",
    title: "Executive Reveal: Vice Lead Gunadarma I/O",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Organizational Identity",
    image: "/project io/Vice Lead Gunadarma IO.png",
    width: 1080,
    height: 1350,
    links: {
      instagram: "https://www.instagram.com/p/DSH4fgmEtbQ/?stkn=MWJrcjVpNGpsYWVueA==",
    }
  },
  {
    id: "io-introducing-academic",
    title: "Introducing Academic Division",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Division Profile",
    image: "/project io/Introducing Academic.png",
    width: 1080,
    height: 1350,
    links: {
      instagram: "https://www.instagram.com/p/DSH36q7klwK/?stkn=MWx3Mml6YXAzMHR1dA==",
    }
  },
  {
    id: "io-info-session",
    title: "What is the Info Session?",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Information Design",
    image: "/project io/What is the Info Session.png",
    width: 2160,
    height: 2880,
    links: {
      instagram: "https://www.instagram.com/p/DTZyKf0kmNQ/?stkn=MXBmeWx3ejFzdjVvZA==",
    }
  },
  {
    id: "io-extend-gemas",
    title: "Announcement: Extended Registration GEMASTIK",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Event Notice",
    image: "/project io/ANNOUNCEMENT EXTEND GEMAS.png",
    width: 2160,
    height: 2880,
    links: {
      instagram: "https://www.instagram.com/p/DaIODtpSjbj/?stkn=b3Z2ajd0bjZjdHQ5",
    }
  },
  {
    id: "io-winner-announcement",
    title: "Winner Announcement Codefest 4.0",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "Competition & Event",
    image: "/project io/WINNER ANNOUNCEMENT.png",
    width: 1080,
    height: 1440,
    links: {
      instagram: "https://www.instagram.com/p/DYKElXZEo_Z/?stkn=MWVpZzdkY2F5ZHI1cg==",
    }
  },
  {
    id: "io-kartini",
    title: "Kartini Day",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "National Commemoration",
    image: "/project io/Apr 21_Kartini.png",
    width: 1080,
    height: 1440,
    links: {
      instagram: "https://www.instagram.com/p/DXYt-FiknUp/?stkn=MWsweWwydWxlYmY4aw==",
    }
  },
  {
    id: "io-hut-ri",
    title: "Indonesian Independence day",
    category: "Graphic Design",
    institution: "Gunadarma I/O",
    tag: "National Commemoration",
    image: "/project io/Aug 17_HUT RI.png",
    width: 2160,
    height: 2880,
    links: {
      instagram: "https://www.instagram.com/p/DcHqCObSAVJ/?stkn=MWV2aTc0aWR5Yndldg==",
    }
  },

  /* ══════════════════════════════════════════════════════════════════
     MEDIA MAHASISWA GUNADARMA (MHG) (Graphic Design)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "mhg-idcard-lanyard",
    title: "Official Member ID Card & Lanyard",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Corporate Identity",
    image: "/project mhg/id card mhg front.png",
    width: 1164,
    height: 874,
    featured: true,
    gallery: [
      {
        image: "/project mhg/id card mhg front.png",
        title: "Official Crew ID Card (Front)",
      },
      {
        image: "/project mhg/id card mhg back.png",
        title: "Official Crew ID Card (Back)",
      },
      {
        image: "/project mhg/Lanyardd@2x.png",
        title: "Media Mahasiswa Official Lanyard Strap",
      },
    ],
    description:
      "This ID card and lanyard design was created for Media Mahasiswa Gunadarma to reflect the organization's identity, pride, and professionalism, while also showcasing its creative and collaborative spirit.",
  },
  {
    id: "mhg-sertifikat",
    title: "Certificate of Appreciation for Media Mahasiswa Gunadarma Members",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Award & Certificate",
    image: "/project mhg/sertifikat mhg.png",
    width: 1584,
    height: 1224,
  },
  {
    id: "mhg-oprec",
    title: "Open Recruitment Media Mahasiswa Gunadarma",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Recruitment Campaign",
    image: "/project mhg/oprec.png",
    width: 2160,
    height: 2160,
    links: {
      instagram: "https://www.instagram.com/p/DET-_Bfyxwj/?stkn=dWd5cTFob28zajQ5",
    }
  },
  {
    id: "mhg-collab-chiprek",
    title: "Media Partner: MHG x Ayam Geprek Chiprek",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Brand Partnership",
    image: "/project mhg/poster mhg x chiprek.png",
    width: 2160,
    height: 2700,
    links: {
      instagram: "https://www.instagram.com/p/DBbP_iZSFBk/?stkn=MTkyMDU5aDA1YzM0Mg==",
    }
  },
  {
    id: "mhg-trivia-ipk",
    title: "Trivia Mahasiswa: Seputar IPK & Tips Sukses",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Social Media Series",
    image: "/project mhg/trivia ipk.png",
    width: 3240,
    height: 4050,
    links: {
      instagram: "https://www.instagram.com/p/DJTfuuyRrUd/?stkn=MWVvYWdzcGRkeTZwdg==",
    }
  },
  {
    id: "mhg-trivia-mahasiswa",
    title: "Trivia Series: Dinamika Kehidupan Kampus",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Social Media Series",
    image: "/project mhg/trivia mahasiswa.png",
    width: 2160,
    height: 2700,
    links: {
      instagram: "https://www.instagram.com/p/DN2P5Qv5s7W/?stkn=ZjhleG43YXRxNjA=",
    }
  },
  {
    id: "mhg-trivia-perkuliahan",
    title: "Trivia Series: Tips Efektif Perkuliahan",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Social Media Series",
    image: "/project mhg/trivia perkuliahan.png",
    width: 3240,
    height: 4050,
    links: {
      instagram: "https://www.instagram.com/p/DLUkFseyeQw/?stkn=ODNvamVudDFjcXli",
    }
  },
  {
    id: "mhg-funfact-otak",
    title: "Fun Fact Otak: Rahasia Konsentrasi Belajar",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Educational Infographic",
    image: "/project mhg/funfact otak.png",
    width: 4320,
    height: 5400,
    links: {
      instagram: "https://www.instagram.com/p/DLKDLmayzaa/?stkn=MXNjdWRrcDFrbmEzZQ==",
    }
  },
  {
    id: "mhg-kalender",
    title: "Kalender Akademik Universitas Gunadarma",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Academic Guide",
    image: "/project mhg/kalender akademik gundar (1).png",
    width: 3240,
    height: 4050,
    gallery: [
      {
        image: "/project mhg/kalender akademik gundar (1).png",
        title: "Kalender Akademik — Part 1",
      },
      {
        image: "/project mhg/kalender akademik gundar (2).png",
        title: "Kalender Akademik — Part 2",
      },
    ],
    links: {
      instagram: "https://www.instagram.com/p/DN-Z0plEYQo/?stkn=aTZuc3VkOGRqOXUx",
    }
  },
  {
    id: "mhg-logo-horrorin",
    title: "Program Identity Logo: Horrorin",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Logo & Visual Identity",
    image: "/project mhg/logo horrorin.png",
    width: 2000,
    height: 2000,
  },
  {
    id: "mhg-pp-ramadhan",
    title: "Rate Card Paid Promote Edisi Ramadhan",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Seasonal Campaign",
    image: "/project mhg/PP RAMADHAN.png",
    width: 2000,
    height: 2000,
    links: {
      instagram: "https://www.instagram.com/p/DGxaiKsScYn/?stkn=enZpdDdhdGJuN2Jh",
    }
  },
  {
    id: "mhg-chinese-new-year",
    title: "Tahun Baru Imlek (Chinese New Year)",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Cultural Celebration",
    image: "/project mhg/chinese-new-year.png",
    width: 2160,
    height: 2700,
    links: {
      instagram: "https://www.instagram.com/p/DFYpY4iyghj/?stkn=MTN4enJhNGVsZmswZw==",
    }
  },
  {
    id: "mhg-hardiknas",
    title: "Hari Pendidikan Nasional (Hardiknas)",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "National Commemoration",
    image: "/project mhg/hardiknas.png",
    width: 3240,
    height: 4050,
    links: {
      instagram: "https://www.instagram.com/p/DJIVO0wTXP9/?stkn=MTB5YWlvdTVsaGo0OQ==",
    }
  },
  {
    id: "mhg-kesaktian-pancasila",
    title: "Peringatan Hari Kesaktian Pancasila",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "National Commemoration",
    image: "/project mhg/hari-kesaktian-pancasila.png",
    width: 2160,
    height: 2160,
  },
  {
    id: "mhg-sumpah-pemuda",
    title: "Peringatan Hari Sumpah Pemuda",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "National Commemoration",
    image: "/project mhg/Sumpah Pemuda.png",
    width: 2160,
    height: 2700,
    links: {
      instagram: "https://www.instagram.com/p/DBplLvzSQm5/?stkn=MTdiNmcwemQ0dWpqZg==",
    }
  },
  {
    id: "mhg-kenaikan-yesus",
    title: "Kenaikan Isa Almasih",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Religious Holiday",
    image: "/project mhg/kenaikan yesus.png",
    width: 2160,
    height: 2700,
    links: {
      instagram: "https://www.instagram.com/p/DKN3LjrSl5x/?stkn=aGN3b24ydHhzeWwz",
    }
  },
  {
    id: "mhg-waisak",
    title: "Hari Raya Tri Suci Waisak",
    category: "Graphic Design",
    institution: "Media Mahasiswa Gunadarma",
    tag: "Religious Holiday",
    image: "/project mhg/waisak@3x.png",
    width: 3240,
    height: 4050,
    links: {
      instagram: "https://www.instagram.com/p/DJiRC8YSL9a/?stkn=MTg3bXZkZGg3YXUwYg==",
    }
  },

  /* ══════════════════════════════════════════════════════════════════
     SMK Bakti Mandiri (Graphic Design, Photography & Video Editing)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "smk-short-movie-impact",
    title: "Short Movie: IMPACT — Ujikom Multimedia SMK",
    category: "Video Editing",
    institution: "SMK Bakti Mandiri",
    tag: "Short Movie • Ujikom SMK",
    image: "/project smk/impact_poster.jpg",
    video: "https://drive.google.com/file/d/1-m5_CsnNVQlD-37cQ589LJ4ozxi6s1dp/view?usp=sharing",
    width: 1920,
    height: 1080,
    featured: true,
    description:
      "Short movie \"IMPACT\" yang diproduksi dan diedit sebagai proyek Uji Kompetensi Keahlian (Ujikom) Multimedia saat bersekolah di SMK Bakti Mandiri. Meliputi proses sinematografi, penyusunan naskah cerita, directing, video editing, ritme cutting, color grading sinematik, serta penataan audio mixing dan sound effects untuk menghadirkan pesan cerita yang kuat dan menggugah.",
    links: {
      video: "https://drive.google.com/file/d/1-m5_CsnNVQlD-37cQ589LJ4ozxi6s1dp/view?usp=sharing",
    },
  },
  {
    id: "smk-poster-iklan-oreo",
    title: "Mini Oreo Strawberry — Commercial Advertising Poster",
    category: "Graphic Design",
    institution: "SMK Bakti Mandiri",
    tag: "Commercial Poster",
    image: "/project smk/Poster Iklan Oreo.png",
    width: 2481,
    height: 3508,
    featured: true,
    description:
      "Commercial advertising poster for Mini Oreo Strawberry featuring playful visual composition, vibrant product highlights, and engaging promotional copy.",
  },
  {
    id: "smk-poster-dimsum",
    title: "Dimsum Mentai 'Savöry' — Promotional Food Poster",
    category: "Graphic Design",
    institution: "SMK Bakti Mandiri",
    tag: "Food & Beverage Poster",
    image: "/project smk/poster_dimsum.png",
    width: 1191,
    height: 1684,
    description:
      "Promotional poster design for Dimsum Mentai by Savöry, crafted with appetizing photography, bold headline typography, and clear promotional pricing structure.",
    links: {
      pdf: "/project smk/Poster Dimsum.pdf",
    },
  },
  {
    id: "smk-photo-product-dimsum",
    title: "Dimsum Mentai — Commercial Product Photography",
    category: "Photography",
    institution: "SMK Bakti Mandiri",
    tag: "Product Photography",
    image: "/project smk/photo_product_dimsum.png",
    width: 1191,
    height: 1684,
    description:
      "Commercial product photography and food styling session for Dimsum Mentai, capturing authentic textures, traditional bamboo steamers, and savory dipping sauce details.",
    links: {
      pdf: "/project smk/Photo Product Dimsum.pdf",
    },
  },
  {
    id: "smk-logo-produk-makanan",
    title: "Savöry & Bon Appétit — Food Brand Identity & Logo Design",
    category: "Graphic Design",
    institution: "SMK Bakti Mandiri",
    tag: "Brand Identity & Logo",
    image: "/project smk/logo_produk_makanan.png",
    width: 2160,
    height: 1440,
    description:
      "Brand identity exploration and culinary logo concepts for 'Savöry' and 'Bon Appétit', featuring minimalist typography, culinary cutlery accents, and versatile color applications.",
    links: {
      pdf: "/project smk/Logo Produk Makanan.pdf",
    },
  },

  /* ══════════════════════════════════════════════════════════════════
     Freelance (Editorial, Photobook & Merchandise)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "freelance-photobook-exxonmobil",
    title: "ExxonMobil Permian & Houston Campus Visit — Photobook & Editorial Design",
    category: "Graphic Design",
    institution: "Freelance",
    tag: "Editorial & Photobook",
    image: "/project freelance/photobook_cover.png",
    width: 1920,
    height: 1080,
    featured: true,
    description:
      "Comprehensive multi-page photobook and editorial publication designed for the ExxonMobil Permian and Houston Campus executive delegation visit (December 2021). Features refined visual grid layouts, curated photographic documentation, and corporate event storytelling.",
    links: {
      pdf: "/project freelance/Photobook_Unconventional and EMHC Visit.pdf",
    },
    gallery: [
      {
        image: "/project freelance/photobook_cover.png",
        title: "Photobook Cover — ExxonMobil Permian & Houston Campus Visit",
      },
      {
        image: "/project freelance/photobook_page_4.png",
        title: "Executive Delegation Gathering & Arrival",
      },
      {
        image: "/project freelance/photobook_page_3.png",
        title: "Key Attendees & Photo Highlights",
      },
      {
        image: "/project freelance/photobook_page_5.png",
        title: "Facility Showcase & Banyu Urip Placard",
      },
      {
        image: "/project freelance/photobook_page_10.png",
        title: "Site Tour & Operational Presentation",
      },
      {
        image: "/project freelance/photobook_page_15.png",
        title: "Executive Tour & Discussion Session",
      },
    ],
  },
  {
    id: "freelance-stiker-piala",
    title: "Pesantren Ramadhan 1443H — Trophy & Plaque Sticker Design",
    category: "Graphic Design",
    institution: "Freelance",
    tag: "Trophy & Merchandise",
    image: "/project freelance/stiker piala.jpg",
    width: 2479,
    height: 2771,
    description:
      "Commemorative plaque and trophy emblem sticker design for RTQ Al-Akmaliyyah's Pesantren Ramadhan 1443H themed 'Indahnya Bersama Al-Qur'an di Bulan Ramadhan', featuring Islamic geometric motifs, gold crescents, and festive typography.",
  },
];