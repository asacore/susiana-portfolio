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
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Graphic Design" | "UI/UX Design" | "Web Development";
  institution: "Gunadarma I/O" | "Media Mahasiswa Gunadarma" | "UI/UX Case Study" | "Gunadarma University" | "Gunadarma Code Week 4.0";
  tag: string;
  image: string;
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
     GUNADARMA CODE WEEK 4.0 (Graphic Design)
     ══════════════════════════════════════════════════════════════════ */
  {
    id: "gcw-coming-soon",
    title: "Gunadarma Code Week 4.0 — Coming Soon",
    category: "Graphic Design",
    institution: "Gunadarma Code Week 4.0",
    tag: "Key Visual & Announcement",
    image: "/project gcw 4.0/COMING SOON GCW.png",
    width: 1080,
    height: 1440,
    featured: true,
    links: {
      instagram: "https://www.instagram.com/p/DWlG2a7knTJ/?stkn=eWVwYWtxZmxjaHZk",
    }
  },
  {
    id: "gcw-hc-handbook",
    title: "HC Handbook — Gunadarma Code Week 4.0",
    category: "Graphic Design",
    institution: "Gunadarma Code Week 4.0",
    tag: "Handbook Design",
    image: "/project gcw 4.0/HC - Handbook cover.png",
    width: 1080,
    height: 1440,
    links: {
      handbook: "/project gcw 4.0/HC - Handbook.pdf",
    },
  },
  {
    id: "gcw-hc-guidebook",
    title: "HC Guidebook — Gunadarma Code Week 4.0",
    category: "Graphic Design",
    institution: "Gunadarma Code Week 4.0",
    tag: "Guidebook Design",
    image: "/project gcw 4.0/HC - Guidebook cover.png",
    width: 1080,
    height: 1440,
    links: {
      guidebook: "/project gcw 4.0/HC - Guidebook.pdf",
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
    links: {
      prototype: "https://www.figma.com/proto/bca-mobile-redesign-example",
    },
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
    links: {
      prototype: "https://www.figma.com/proto/ecommerce-mobile-example",
    },
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
    groupDescription: "Built as a group assignment; my role was the programmer.",
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
    groupDescription: "Final project for a course, built in a group; my role was the programmer.",
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
    title: "Modern Web & Mobile Dashboard UI",
    category: "UI/UX Design",
    institution: "UI/UX Case Study",
    tag: "Dashboard UI System",
    image: "/uiux/HOME UI.png",
    width: 2602,
    height: 1794,
    featured: true,
  },

  /* ══════════════════════════════════════════════════════════════════
     GUNADARMA I/O (Graphic Design)
     ══════════════════════════════════════════════════════════════════ */
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
];