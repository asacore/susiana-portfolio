"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { projectsData, ProjectItem } from "@/data/projects";
import { certificatesData, CertificateItem, CertificateCategory } from "@/data/certificates";
import {
  TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator,
  TbBrandFigma,
  TbBrandAdobeIndesign,
  TbBrandAdobeXd,
  TbBrandAdobePremiere,
  TbBrandHtml5,
  TbBrandCss3,
  TbBrandPhp,
  TbBrandMysql,
  TbBrandJavascript,
  TbBrandTailwind,
  TbBrandNextjs,
} from "react-icons/tb";


/* ── Scroll Reveal Hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ── Reveal Wrapper ── */
function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "up" | "fade";
  delay?: number;
  className?: string;
}) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal-init reveal-${variant} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

const ITEMS_PER_PAGE = 12;
const CERT_ITEMS_PER_PAGE = 6;

function getCertYear(dateStr: string): number {
  const matches = dateStr.match(/\d{4}/g);
  if (!matches) return 0;
  return Math.max(...matches.map((y) => parseInt(y, 10)));
}

function getPageNumbers(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All Works");
  const [activeInstitution, setActiveInstitution] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [activeCertCategory, setActiveCertCategory] = useState<string>("All");
  const [certCurrentPage, setCertCurrentPage] = useState<number>(1);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<string | null>(null);
  const [galleryDotIndex, setGalleryDotIndex] = useState<number>(0);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const galleryCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryRafRef = useRef<number | null>(null);
  const worksSectionRef = useRef<HTMLElement>(null);
  const GALLERY_DOTS = 5;

  const updateGalleryArc = () => {
    const container = galleryScrollRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    galleryCardRefs.current.forEach((card) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = (cardCenter - centerX) / (rect.width / 2);
      const clamped = Math.max(-1, Math.min(1, distance));
      const translateY = Math.abs(clamped) * 26;
      const rotate = clamped * 7;
      const scale = 1 - Math.abs(clamped) * 0.1;
      card.style.transform = `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`;
      card.style.opacity = String(1 - Math.abs(clamped) * 0.2);
    });
  };

  const handleGalleryScroll = () => {
    const el = galleryScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    const idx = Math.min(
      GALLERY_DOTS - 1,
      Math.round(ratio * (GALLERY_DOTS - 1))
    );
    setGalleryDotIndex(idx);

    if (galleryRafRef.current) cancelAnimationFrame(galleryRafRef.current);
    galleryRafRef.current = requestAnimationFrame(updateGalleryArc);
  };

  const scrollGalleryBy = (direction: "next" | "prev") => {
    const el = galleryScrollRef.current;
    if (!el) return;

    const amount = Math.max(el.clientWidth * 0.72, 260);
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateGalleryArc();
    window.addEventListener("resize", updateGalleryArc);
    return () => window.removeEventListener("resize", updateGalleryArc);
  }, []);

  // Reset gallery slide when project changes
  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [selectedProject?.id]);

  // Show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const certCategories = useMemo(
    () => [
      { label: "All", display: "All Certificates", count: certificatesData.length },
      {
        label: "Gunadarma",
        display: "Gunadarma",
        count: certificatesData.filter((c) => c.category === "Gunadarma").length,
      },
      {
        label: "LPK",
        display: "LPK",
        count: certificatesData.filter((c) => c.category === "LPK").length,
      },
      {
        label: "Bootcamp",
        display: "Bootcamp",
        count: certificatesData.filter((c) => c.category === "Bootcamp").length,
      },
    ],
    []
  );

  const filteredCertificates = useMemo(() => {
    const base =
      activeCertCategory === "All"
        ? certificatesData
        : certificatesData.filter((c) => c.category === activeCertCategory);
    return [...base].sort((a, b) => getCertYear(b.date) - getCertYear(a.date));
  }, [activeCertCategory]);

  const certTotalPages = Math.max(
    1,
    Math.ceil(filteredCertificates.length / CERT_ITEMS_PER_PAGE)
  );

  const displayedCertificates = useMemo(() => {
    const startIndex = (certCurrentPage - 1) * CERT_ITEMS_PER_PAGE;
    return filteredCertificates.slice(startIndex, startIndex + CERT_ITEMS_PER_PAGE);
  }, [filteredCertificates, certCurrentPage]);

  const handleCertPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > certTotalPages || newPage === certCurrentPage) return;
    setCertCurrentPage(newPage);
    document
      .getElementById("certificates-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCertCategorySelect = (cat: string) => {
    setActiveCertCategory(cat);
    setCertCurrentPage(1);
  };

  // Filter options with item counts
  const categories = useMemo(() => [
    { label: "All Works", count: projectsData.length },
    {
      label: "Graphic Design",
      count: projectsData.filter((p) => p.category === "Graphic Design").length,
    },
    {
      label: "UI/UX Design",
      count: projectsData.filter((p) => p.category === "UI/UX Design").length,
    },
    {
      label: "Web Development",
      count: projectsData.filter((p) => p.category === "Web Development").length,
    },
  ], []);

  const backgroundExperiences = useMemo(
    () => [
      {
        title: "Gunadarma I/O",
        role: "Graphic Designer",
        period: "2025 - 2026",
        overview:
          "Crafting high-impact visual communications and digital branding assets to support community initiatives and major tech events.",
        contributions: [
          'Spearheaded the visual identity and promotional campaign assets for key initiatives, including "Weekly Class IoT" and "Codefest 4.0".',
          "Conceptualized and designed official organizational merchandise, aligning with brand guidelines.",
          "Collaborated closely with cross-functional technical teams to translate complex concepts into engaging visual content.",
        ],
      },
      {
        title: "Media Mahasiswa Gunadarma",
        role: "Head of Graphic Design Team",
        period: "2024 - 2025",
        overview:
          "Led the design division in defining, establishing, and scaling the organization's overall visual media identity.",
        contributions: [
          "Directed the end-to-end design strategy for internal and external media channels.",
          "Designed official recruitment campaign materials and organizational collateral, including custom ID cards and lanyards.",
          "Conceptualized creative social media series (trivia and educational fun facts) to drive student engagement.",
        ],
      },
      {
        title: "Information Systems Laboratory Gunadarma University",
        role: "Tutor & Laboratory Assistant",
        period: "2024 - 2025",
        overview:
          "Instructed, mentored, and evaluated university students in core information technology, design software, and programming fundamentals.",
        contributions: [
          "Facilitated practical laboratory sessions on Inkscape, Scilab, MySQL, UML, and C Programming.",
          "Designed self-developed instructional PPT modules and challenge tasks to improve real-time student comprehension.",
          "Authored official examination materials and assessments to evaluate academic performance.",
        ],
      },
    ],
    []
  );

  const institutions = useMemo(() => [
    { label: "All", display: "All Affiliation" },
    {
      label: "Gunadarma I/O",
      display: "Gunadarma I/O",
      count: projectsData.filter((p) => p.institution === "Gunadarma I/O").length,
    },
    {
      label: "Media Mahasiswa Gunadarma",
      display: "Media Mahasiswa Gunadarma",
      count: projectsData.filter((p) => p.institution === "Media Mahasiswa Gunadarma").length,
    },
    {
      label: "UI/UX Case Study",
      display: "UI/UX Case Study",
      count: projectsData.filter((p) => p.institution === "UI/UX Case Study").length,
    },
    {
      label: "Gunadarma University",
      display: "Gunadarma University",
      count: projectsData.filter((p) => p.institution === "Gunadarma University").length,
    },
    {
      label: "Gunadarma Code Week 4.0",
      display: "Gunadarma Code Week 4.0",
      count: projectsData.filter((p) => p.institution === "Gunadarma Code Week 4.0").length,
    },
  ], []);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);

    // If the currently active institution has no projects in the newly
    // selected category, reset it back to "All" instead of showing 0 results.
    if (activeInstitution !== "All") {
      const hasMatch = projectsData.some(
        (p) => p.institution === activeInstitution && (cat === "All Works" || p.category === cat)
      );
      if (!hasMatch) {
        setActiveInstitution("All");
      }
    }
  };

  const handleInstitutionSelect = (inst: string) => {
    setActiveInstitution(inst);
    setCurrentPage(1);

    // If the currently active category has no projects for the newly
    // selected institution, switch to a category that institution actually has.
    if (inst !== "All" && activeCategory !== "All Works") {
      const hasMatch = projectsData.some(
        (p) => p.institution === inst && p.category === activeCategory
      );
      if (!hasMatch) {
        const fallbackCategory =
          projectsData.find((p) => p.institution === inst)?.category ?? "All Works";
        setActiveCategory(fallbackCategory);
      }
    }
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchCategory =
        activeCategory === "All Works" || project.category === activeCategory;
      const matchInstitution =
        activeInstitution === "All" || project.institution === activeInstitution;
      return matchCategory && matchInstitution;
    });
  }, [activeCategory, activeInstitution]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));

  const displayedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (worksSectionRef.current) {
      const topPos = worksSectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
      if (window.scrollY > topPos) {
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
    }
  };

  const currentIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filteredProjects.length - 1;

  const handlePrev = () => {
    if (hasPrev) setSelectedProject(filteredProjects[currentIndex - 1]);
  };
  const handleNext = () => {
    if (hasNext) setSelectedProject(filteredProjects[currentIndex + 1]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      } else if (e.key === "ArrowLeft") {
        if (hasPrev) setSelectedProject(filteredProjects[currentIndex - 1]);
      } else if (e.key === "ArrowRight") {
        if (hasNext) setSelectedProject(filteredProjects[currentIndex + 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject, currentIndex, hasPrev, hasNext, filteredProjects]);

  return (
    <main className="bg-white dark:bg-ink text-ink dark:text-white min-h-screen transition-colors relative selection:bg-pink selection:text-white">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-ink/95 backdrop-blur-md border-b border-[#31081F]/10 dark:border-[#31081F]/30">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex items-center justify-between h-[68px] md:h-[76px]">

          {/* Logo */}
          <a href="#" className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/logo-susiana.svg"
              alt="Susiana"
              width={168}
              height={30}
              className="h-[22px] md:h-[26px] w-auto"
            />
          </a>

          {/* Nav links — center */}
          <div className="hidden md:flex items-center gap-3.5 lg:gap-5 xl:gap-6 text-[17px] lg:text-[21px] xl:text-[23px]">
            <a
              href="#about"
              style={{ color: "#B91372" }}
              className="font-normal hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              about
            </a>
            {/* Separator garis tunggal memanjang */}
            <span className="select-none inline-block w-[16px] lg:w-[22px] h-[2px] bg-[#31081F] dark:bg-white/80 rounded-full shrink-0" aria-hidden="true" />
            <a
              href="#journey"
              style={{ color: "#B91372" }}
              className="font-normal hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              experiences
            </a>
            <span className="select-none inline-block w-[16px] lg:w-[22px] h-[2px] bg-[#31081F] dark:bg-white/80 rounded-full shrink-0" aria-hidden="true" />
            <a
              href="#works"
              style={{ color: "#B91372" }}
              className="font-normal hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              works
            </a>
          </div>

          {/* Right: Connect (desktop) + Hamburger + ThemeToggle */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Let's Connect Button — desktop only, moved into burger menu on mobile */}
            <a
              href="#contact"
              className="hidden md:group md:relative md:inline-flex items-center justify-center px-3.5 sm:px-5 py-1.5 sm:py-[7px] rounded-full text-[13px] sm:text-[15px] lg:text-[17px] font-bold whitespace-nowrap overflow-hidden transition-colors duration-300 border-2 border-magenta dark:border-pink/80 text-magenta dark:text-white bg-white dark:bg-[#180010] hover:text-white dark:hover:text-white hover:border-pink dark:hover:border-pink shrink-0"
            >
              <span
                className="absolute inset-0 bg-gradient-to-b from-[#FA198B] to-[#B91372] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10">Let&apos;s Connect!</span>
            </a>

            {/* Hamburger — mobile only, modern morphing icon, no border/circle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden relative flex items-center justify-center w-9 h-9 rounded-lg text-magenta dark:text-white shrink-0 transition-colors hover:bg-magenta/[0.08] dark:hover:bg-white/10"
            >
              <span className="relative flex flex-col items-center justify-center w-[18px] h-[13px]">
                <span
                  className={`absolute h-[2px] w-full bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? "rotate-45 top-1/2 -translate-y-1/2" : "top-0"
                    }`}
                />
                <span
                  className={`absolute h-[2px] bg-current rounded-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] top-1/2 -translate-y-1/2 ${mobileMenuOpen ? "w-0 opacity-0" : "w-full opacity-100"
                    }`}
                />
                <span
                  className={`absolute h-[2px] w-full bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : "bottom-0"
                    }`}
                />
              </span>
            </button>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile dropdown menu — links + Connect CTA, shown below the bar */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-t border-[#31081F]/10 dark:border-[#31081F]/30 bg-white/98 dark:bg-ink/98 backdrop-blur-md ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-t-0"
            }`}
        >
          <div className="px-4 sm:px-8 py-4 flex flex-col gap-4 text-[17px] font-normal">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#B91372" }}
              className="hover:opacity-70 transition-opacity"
            >
              about
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#B91372" }}
              className="hover:opacity-70 transition-opacity"
            >
              experiences
            </a>
            <a
              href="#works"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#B91372" }}
              className="hover:opacity-70 transition-opacity"
            >
              works
            </a>

            {/* Let's Connect — inside mobile menu */}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center w-full px-5 py-2.5 rounded-full text-[15px] font-bold bg-gradient-to-b from-[#FA198B] to-[#B91372] text-white shadow-sm transition-transform active:scale-95"
            >
              Let&apos;s Connect!
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-4 sm:px-8 max-w-[1360px] mx-auto pt-10 md:pt-16 flex flex-col items-center">
        <Reveal variant="fade" delay={50} className="w-full flex flex-col items-center">
          <h1 className="relative z-0 text-pink font-bold text-center tracking-tighter leading-none select-none text-[clamp(3rem,15.5vw,218px)] mb-[clamp(-210px,-15vw,-65px)] w-full">
            PORTFOLIO
          </h1>

          <div className="relative z-10 pointer-events-none w-full">
            <Image
              src="/hero.svg"
              alt="Susiana Salsa Putri"
              width={1399}
              height={705}
              priority
              className="w-full h-auto select-none"
            />
          </div>
        </Reveal>
      </section>


      {/* GET TO KNOW ME */}
      <section id="about" className="px-4 sm:px-8 max-w-[1360px] mx-auto mt-20 md:mt-32">
        <Reveal variant="up">
          <h2 className="text-pink text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold flex items-center gap-3 sm:gap-4 tracking-tight">
            <Image
              src="/element-star.svg"
              alt=""
              width={44}
              height={44}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 inline-block shrink-0"
            />
            GET TO KNOW ME!
          </h2>
        </Reveal>

        {/* Bio text */}
        <Reveal variant="up" delay={80} className="mt-4 md:mt-6 w-full">
          <p className="w-full text-xl sm:text-2xl md:text-[26px] lg:text-[29px] leading-snug md:leading-normal text-ink dark:text-white font-normal">
            <strong className="font-bold">Hi there!</strong> I&apos;m{" "}
            <span className="text-pink font-bold">Susiana Salsa Putri</span>, an{" "}
            Information Systems graduate, Graphic Designer, UI/UX Designer, and Web Developer. Obsessed with clean visuals and functional code, I help turn complex concepts into engaging digital products.
          </p>
        </Reveal>

        {/* Modern Tech Stack Cards */}
        <Reveal variant="up" delay={140} className="mt-8 md:mt-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-pink animate-pulse"></span>
              <h3 className="text-pink text-xl sm:text-2xl font-bold tracking-tight">
                Tools & Tech Stack
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { name: "Photoshop", category: "Design", icon: TbBrandAdobePhotoshop, color: "hover:text-[#31A8FF] hover:border-[#31A8FF]/40", bg: "group-hover:bg-[#31A8FF]/10", tag: "Creative" },
                { name: "Illustrator", category: "Vector", icon: TbBrandAdobeIllustrator, color: "hover:text-[#FF9A00] hover:border-[#FF9A00]/40", bg: "group-hover:bg-[#FF9A00]/10", tag: "Creative" },
                { name: "Figma", category: "UI/UX", icon: TbBrandFigma, color: "hover:text-[#F24E1E] hover:border-[#F24E1E]/40", bg: "group-hover:bg-[#F24E1E]/10", tag: "Product" },
                { name: "InDesign", category: "Layout", icon: TbBrandAdobeIndesign, color: "hover:text-[#FF3366] hover:border-[#FF3366]/40", bg: "group-hover:bg-[#FF3366]/10", tag: "Editorial" },
                { name: "Adobe XD", category: "Prototyping", icon: TbBrandAdobeXd, color: "hover:text-[#FF61F6] hover:border-[#FF61F6]/40", bg: "group-hover:bg-[#FF61F6]/10", tag: "UI/UX" },
                { name: "Premiere Pro", category: "Video", icon: TbBrandAdobePremiere, color: "hover:text-[#9999FF] hover:border-[#9999FF]/40", bg: "group-hover:bg-[#9999FF]/10", tag: "Video" },
                { name: "HTML5", category: "Markup", icon: TbBrandHtml5, color: "hover:text-[#E34F26] hover:border-[#E34F26]/40", bg: "group-hover:bg-[#E34F26]/10", tag: "Frontend" },
                { name: "CSS3", category: "Styling", icon: TbBrandCss3, color: "hover:text-[#1572B6] hover:border-[#1572B6]/40", bg: "group-hover:bg-[#1572B6]/10", tag: "Frontend" },
                { name: "Tailwind CSS", category: "Framework", icon: TbBrandTailwind, color: "hover:text-[#06B6D4] hover:border-[#06B6D4]/40", bg: "group-hover:bg-[#06B6D4]/10", tag: "Frontend" },
                { name: "JavaScript", category: "Logic", icon: TbBrandJavascript, color: "hover:text-[#F7DF1E] hover:border-[#F7DF1E]/40", bg: "group-hover:bg-[#F7DF1E]/10", tag: "Language" },
                { name: "PHP", category: "Backend", icon: TbBrandPhp, color: "hover:text-[#777BB4] hover:border-[#777BB4]/40", bg: "group-hover:bg-[#777BB4]/10", tag: "Backend" },
                { name: "MySQL", category: "Database", icon: TbBrandMysql, color: "hover:text-[#4479A1] hover:border-[#4479A1]/40", bg: "group-hover:bg-[#4479A1]/10", tag: "Database" },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/10 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${item.color}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-black/[0.03] dark:bg-white/[0.06] transition-colors duration-300 ${item.bg}`}>
                        <IconComponent className="text-2xl transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-ink/60 dark:text-white/60">
                        {item.tag}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-ink dark:text-white group-hover:text-pink transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-ink/50 dark:text-white/50 font-medium">
                        {item.category}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* INTERACTIVE HORIZONTAL GALLERY */}
        <Reveal variant="up" delay={200} className="mt-14 md:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-pink animate-pulse"></span>
                <h3 className="text-pink text-xl sm:text-2xl font-bold tracking-tight">
                  Life & Highlights Gallery
                </h3>
              </div>
              <p className="text-sm sm:text-base text-ink/70 dark:text-white/70 mt-1 font-medium">
                Moments, milestones, and behind-the-scenes memories (use the arrows to explore, click to enlarge)
              </p>
            </div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-pink/10 text-pink border border-pink/20 w-fit self-start sm:self-auto">
              16 Captured Moments
            </div>
          </div>

          {/* Curved horizontal gallery — drag/swipe + arrow navigation */}
          <div className="relative group/gallery">
            {/* Previous arrow */}
            <button
              type="button"
              onClick={() => scrollGalleryBy("prev")}
              aria-label="Previous gallery items"
              className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-[#180010]/95 border border-[#31081F]/10 dark:border-white/10 text-ink dark:text-white shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:bg-pink hover:text-white hover:border-pink hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div
              ref={galleryScrollRef}
              onScroll={handleGalleryScroll}
              className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden px-12 sm:px-14 pt-7 pb-7 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
              style={{ perspective: "1000px", touchAction: "pan-y" }}
            >
              {[
                { src: "/gallery/Awarding 1st Winner.JPG", caption: "Awarding 1st Winner" },
                { src: "/gallery/Celebrating unoficially graduate (1).jpg", caption: "Celebrating Graduation" },
                { src: "/gallery/Celebrating unoficially graduate (2).jpg", caption: "Celebrating Graduation" },
                { src: "/gallery/Faculty PKKMB Committee.jpeg", caption: "Faculty PKKMB Committee" },
                { src: "/gallery/Faculty PKKMB Committee.JPG", caption: "Faculty PKKMB Committee" },
                { src: "/gallery/Final Competition UIUX GDGoC Gunadarma.JPG", caption: "Final Competition GDGoC" },
                { src: "/gallery/Graphic Design Team.JPG", caption: "Graphic Design Team" },
                { src: "/gallery/Gunadarma Code Week 2 (1).jpeg", caption: "Gunadarma Code Week 2" },
                { src: "/gallery/Gunadarma Code Week 2 (2).jpeg", caption: "Gunadarma Code Week 2" },
                { src: "/gallery/Gunadarma Code Week 2 (3).jpeg", caption: "Gunadarma Code Week 2" },
                { src: "/gallery/Gunadarma Code Week 2 (4).jpeg", caption: "Gunadarma Code Week 2" },
                { src: "/gallery/information systems laboratory (1).jpg", caption: "Information Systems Laboratory" },
                { src: "/gallery/information systems laboratory (2).jpg", caption: "Information Systems Laboratory" },
                { src: "/gallery/information systems laboratory (3).jpg", caption: "Information Systems Laboratory" },
                { src: "/gallery/Moderator at InfoSession Gunadarma IO (1).JPG", caption: "Moderator at InfoSession" },
                { src: "/gallery/Moderator at InfoSession Gunadarma IO (2).JPG", caption: "Moderator at InfoSession" },
              ].map((photo, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    galleryCardRefs.current[i] = el;
                  }}
                  className="group flex-shrink-0 w-[140px] sm:w-[160px] md:w-[178px] snap-start transition-transform duration-300 ease-out will-change-transform"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedGalleryPhoto(photo.src)}
                    className="relative block w-full aspect-square rounded-2xl overflow-hidden bg-plum/5 dark:bg-white/5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-xl group-hover:shadow-pink/20 group-hover:ring-pink/40 group-hover:-translate-y-1"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      draggable={false}
                      sizes="(max-width: 768px) 160px, 178px"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                  </button>
                  <p className="mt-2 text-sm sm:text-base font-semibold text-ink dark:text-white truncate">
                    {photo.caption}
                  </p>
                </div>
              ))}
            </div>

            {/* Next arrow */}
            <button
              type="button"
              onClick={() => scrollGalleryBy("next")}
              aria-label="Next gallery items"
              className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-[#180010]/95 border border-[#31081F]/10 dark:border-white/10 text-ink dark:text-white shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:bg-pink hover:text-white hover:border-pink hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Pagination bullets */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: GALLERY_DOTS }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === galleryDotIndex
                    ? "w-5 bg-pink"
                    : "w-1.5 bg-ink/20 dark:bg-white/20"
                  }`}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* BACKGROUND CHECK */}
      <section id="journey" className="px-4 sm:px-8 max-w-[1360px] mx-auto mt-24 md:mt-40">
        <Reveal variant="up">
          <h2 className="text-pink text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold flex items-center gap-3 sm:gap-4 tracking-tight">
            <Image
              src="/element-star.svg"
              alt=""
              width={44}
              height={44}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 inline-block shrink-0"
            />
            BACKGROUND CHECK
          </h2>
          <p className="text-pink text-xl sm:text-2xl md:text-3xl font-bold mt-2 md:mt-3">
            My Journey So Far
          </p>
        </Reveal>

        <div className="mt-14 md:mt-20 relative">
          {/* Timeline spine — left-aligned on mobile, centered on desktop */}
          <div className="absolute left-[9px] sm:left-[11px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-pink via-magenta/50 to-pink/10 dark:from-pink dark:via-magenta/40 dark:to-pink/5" />

          <div className="space-y-16 md:space-y-8">
            {backgroundExperiences.map((exp, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={exp.title} variant="up" delay={60 + i * 40}>
                  <div className="relative md:grid md:grid-cols-2 md:gap-x-10 lg:gap-x-16 md:py-8">
                    {/* Timeline node, centered on the spine */}
                    <span className="absolute left-[10px] sm:left-[12px] md:left-1/2 top-1.5 md:top-7 -translate-x-1/2 z-10 flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-pink to-magenta ring-4 ring-white dark:ring-ink shadow-md shrink-0" />

                    {/* Period pill — sits on the "empty" side, opposite the card, desktop only */}
                    <div
                      className={`hidden md:flex ${isEven ? "order-1 justify-end pr-10 lg:pr-16" : "order-2 justify-start pl-10 lg:pl-16"
                        } items-start pt-6`}
                    >
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-magenta to-pink text-white text-xs lg:text-sm font-bold shadow-md whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    {/* Content card */}
                    <div
                      className={`${isEven ? "order-2" : "order-1"
                        } pl-9 sm:pl-12 md:pl-0 ${isEven ? "md:pl-10 lg:pl-16" : "md:pr-10 lg:pr-16"}`}
                    >
                      {/* Mobile-only pill above the card */}
                      <span className="md:hidden inline-flex items-center px-3 py-1 mb-2 rounded-full bg-gradient-to-r from-magenta to-pink text-white text-xs font-bold shadow-md">
                        {exp.period}
                      </span>

                      <div className="rounded-2xl md:rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 shadow-sm hover:shadow-lg dark:hover:shadow-pink/5 backdrop-blur-md p-4 sm:p-5 md:p-6 transition-all duration-300 hover:-translate-y-1">
                        <ExperienceItem
                          title={exp.title}
                          role={exp.role}
                          period={exp.period}
                          overview={exp.overview}
                          contributions={exp.contributions}
                          hidePeriod
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACADEMIC & TROPHIES */}
      <section className="px-4 sm:px-8 max-w-[1360px] mx-auto mt-24 md:mt-40">
        <Reveal variant="up">
          <h2 className="text-pink text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold flex items-center gap-3 sm:gap-4 tracking-tight">
            <Image
              src="/element-star.svg"
              alt=""
              width={44}
              height={44}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 inline-block shrink-0"
            />
            ACADEMIC &amp; TROPHIES
          </h2>
          <p className="text-pink text-xl sm:text-2xl md:text-3xl font-bold mt-2 md:mt-3">
            Where it started
          </p>
        </Reveal>

        <div className="mt-6 md:mt-8 space-y-10 md:space-y-14">
          <Reveal variant="up" delay={60}>
            <div>
              <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl text-ink dark:text-white">
                Gunadarma University
              </h3>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-ink/90 dark:text-white/90 mt-1">
                Bachelor of Information Systems{" "}
                <span className="text-pink font-bold">| GPA: 3.78 / 4.00</span>
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-ink/80 dark:text-white/80 mt-1 mb-4">
                2022 - 2026
              </p>

              <div className="space-y-3 md:space-y-4 text-xl sm:text-2xl md:text-[26px] lg:text-[29px] text-ink/90 dark:text-white/90 leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="inline-block w-6 md:w-8 h-1 md:h-1.5 bg-ink dark:bg-white rounded-full mt-[14px] md:mt-[18px] shrink-0"></span>
                  <p>
                    <strong>Key Focus :</strong> Systems Analysis, Database Management, Software Engineering, and Web Development.
                  </p>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <span className="inline-block w-6 md:w-8 h-1 md:h-1.5 bg-ink dark:bg-white rounded-full mt-[14px] md:mt-[18px] shrink-0"></span>
                    <p>
                      <strong>Trophy &amp; Achievement :</strong>
                    </p>
                  </div>
                  <ul className="list-disc ml-12 md:ml-16 mt-2 space-y-1.5 text-xl sm:text-2xl md:text-[26px] lg:text-[29px]">
                    <li>
                      1st Place Winner — UI/UX Competition by Google Developer Groups on Campus (GDGoC) Gunadarma (2025).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <div>
              <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl text-ink dark:text-white">
                SMK Bakti Mandiri Bekasi
              </h3>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-ink/90 dark:text-white/90 mt-1">
                Diploma in Multimedia
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-ink/80 dark:text-white/80 mt-1 mb-4">
                2019 - 2022
              </p>

              <div className="space-y-3 md:space-y-4 text-xl sm:text-2xl md:text-[26px] lg:text-[29px] text-ink/90 dark:text-white/90 leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="inline-block w-6 md:w-8 h-1 md:h-1.5 bg-ink dark:bg-white rounded-full mt-[14px] md:mt-[18px] shrink-0"></span>
                  <p>
                    <strong>Key Focus :</strong> Graphic Design, Visual Layouts, Photographs, Video Production, and Digital Media Fundamentals.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="inline-block w-6 md:w-8 h-1 md:h-1.5 bg-ink dark:bg-white rounded-full mt-[14px] md:mt-[18px] shrink-0"></span>
                  <p>
                    Established the core artistic foundation in visual communication and design principles.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VIEW MY WORKS */}
      <section
        id="works"
        ref={worksSectionRef}
        className="px-4 sm:px-8 max-w-[1360px] mx-auto mt-24 md:mt-40 pb-28 md:pb-36"
      >
        <Reveal variant="up">
          <h2 className="text-pink text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold flex items-center gap-3 sm:gap-4 tracking-tight">
            <Image
              src="/element-star.svg"
              alt=""
              width={44}
              height={44}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 inline-block shrink-0"
            />
            VIEW MY WORKS
          </h2>
          <p className="text-pink text-xl sm:text-2xl md:text-3xl font-bold mt-2 md:mt-3">
            selected works &amp; highlights
          </p>
        </Reveal>

        {/* Category & Institution Filters */}
        <Reveal variant="fade" delay={60}>
          <div className="mt-8 md:mt-10 space-y-4">
            {/* Primary Filter: Category Tabs */}
            <div className="flex flex-wrap gap-2.5 sm:gap-4">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    onClick={() => handleCategorySelect(cat.label)}
                    className={`group px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-normal transition-all cursor-pointer flex items-center gap-2 ${isSelected
                      ? "bg-pink text-white shadow-md ring-2 ring-pink/30"
                      : "bg-[#31081F]/5 dark:bg-white/10 text-ink/80 dark:text-white/80 hover:bg-pink hover:text-white dark:hover:bg-pink dark:hover:text-white"
                      }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${isSelected
                        ? "bg-white/25 text-white"
                        : "bg-[#31081F]/10 dark:bg-white/15 text-ink dark:text-white group-hover:bg-white/20 group-hover:text-white"
                        }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Secondary Filter: Institution Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#31081F]/10 dark:border-white/10">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-pink mr-1 select-none">
                AFFILIATION:
              </span>
              {institutions.map((inst) => {
                const isSelected = activeInstitution === inst.label;
                return (
                  <button
                    key={inst.label}
                    onClick={() => handleInstitutionSelect(inst.label)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer flex items-center gap-1.5 ${isSelected
                      ? "bg-magenta text-white font-bold shadow-sm"
                      : "bg-white dark:bg-[#1f0015] border border-[#31081F]/15 dark:border-white/15 text-ink/80 dark:text-white/80 hover:border-pink hover:text-pink"
                      }`}
                  >
                    <span>{inst.display}</span>
                    {inst.count !== undefined && (
                      <span className="opacity-70 text-xs">({inst.count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Status Count & Reset Filter */}
        <div className="mt-6 flex items-center justify-between text-xs sm:text-sm text-ink/60 dark:text-white/60">
          <span>
            Showing{" "}
            <strong className="text-ink dark:text-white font-bold">
              {filteredProjects.length > 0
                ? `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredProjects.length
                )}`
                : 0}
            </strong>{" "}
            of{" "}
            <strong className="text-ink dark:text-white font-bold">
              {filteredProjects.length}
            </strong>{" "}
            projects
            {totalPages > 1 && (
              <span className="opacity-80"> (Page {currentPage} of {totalPages})</span>
            )}
            {activeInstitution !== "All" && ` • ${activeInstitution}`}
            {activeCategory !== "All Works" && ` • ${activeCategory}`}
          </span>
          {(activeCategory !== "All Works" || activeInstitution !== "All" || currentPage !== 1) && (
            <button
              onClick={() => {
                setActiveCategory("All Works");
                setActiveInstitution("All");
                setCurrentPage(1);
              }}
              className="text-pink hover:underline font-bold text-xs cursor-pointer"
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mt-6">
          {displayedProjects.map((project, index) => (
            <Reveal key={project.id} variant="up" delay={(index % 6) * 40}>
              <div
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#31081F]/10 dark:border-white/10 bg-[#FAF7F9] dark:bg-[#160010] hover:border-pink/50 dark:hover:border-pink/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col h-full cursor-pointer text-left"
              >

                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] bg-white/70 dark:bg-black/30 overflow-hidden border-b border-[#31081F]/5 dark:border-white/5 flex items-center justify-center p-4 sm:p-5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="block w-full h-full object-contain object-center scale-[1.12] transition-transform duration-500 ease-out group-hover:scale-[1.18] select-none"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 z-10 bg-black/40 dark:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-full bg-white text-ink text-xs sm:text-sm font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                      <span>Preview Project</span>
                    </span>
                  </div>
                </div>

                {/* Card Info Section */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    {/* Project Type / Category + Tag */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#B91372]/10 text-[#B91372] dark:bg-pink/20 dark:text-pink border border-[#B91372]/20 dark:border-pink/30">
                        {project.category}
                      </span>
                      <span className="text-xs font-normal text-ink/50 dark:text-white/45">
                        #{project.tag}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h3 className="font-bold text-base sm:text-lg md:text-xl text-ink dark:text-white group-hover:text-pink transition-colors line-clamp-2 leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  {/* CTA to View Details + Available Links Indicator */}
                  <div className="pt-2.5 border-t border-[#31081F]/5 dark:border-white/5 text-xs sm:text-sm font-bold text-pink flex items-center justify-between">
                    <span>View Details</span>
                    {project.links && (
                      <div className="flex items-center gap-1.5 text-ink/40 dark:text-white/40">
                        {project.links.prototype && (
                          <span title="Figma Prototype available" className="hover:text-pink transition-colors">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></svg>
                          </span>
                        )}
                        {project.links.github && (
                          <span title="GitHub repository available" className="hover:text-pink transition-colors">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                          </span>
                        )}
                        {project.links.instagram && (
                          <span title="Instagram post available" className="hover:text-pink transition-colors">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                          </span>
                        )}
                        {project.links.twibbon && (
                          <span title="Twibbon campaign available" className="hover:text-pink transition-colors">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                          </span>
                        )}
                        {project.links.live && (
                          <span
                            title="Live website available"
                            className="hover:text-pink transition-colors"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          </span>
                        )}
                        {project.links.handbook && (
                          <span
                            title="Handbook / PDF available"
                            className="hover:text-pink transition-colors"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="9" y1="13" x2="15" y2="13" />
                              <line x1="9" y1="17" x2="15" y2="17" />
                            </svg>
                          </span>
                        )}
                        {project.links.guidebook && (
                          <span
                            title="Guidebook / PDF available"
                            className="hover:text-pink transition-colors"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="9" y1="13" x2="15" y2="13" />
                              <line x1="9" y1="17" x2="15" y2="17" />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Reveal variant="fade" delay={80}>
            <nav
              className="flex items-center justify-center gap-2 sm:gap-3 mt-12 md:mt-16 select-none"
              aria-label="Projects pagination"
            >
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`group inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${currentPage === 1
                  ? "opacity-25 cursor-not-allowed pointer-events-none bg-[#31081F]/5 dark:bg-white/5 text-ink/40 dark:text-white/40 border border-transparent"
                  : "bg-white dark:bg-[#180010] border border-[#31081F]/15 dark:border-white/15 text-ink/90 dark:text-white/90 hover:border-pink hover:text-pink hover:bg-pink/5 dark:hover:bg-pink/10 hover:shadow-md active:scale-95"
                  }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:-translate-x-0.5"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {getPageNumbers(currentPage, totalPages).map((page, idx) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-7 h-9 sm:w-9 sm:h-11 flex items-center justify-center text-ink/40 dark:text-white/40 font-bold text-xs sm:text-sm select-none"
                      >
                        …
                      </span>
                    );
                  }

                  const pageNum = Number(page);
                  const isActive = currentPage === pageNum;

                  return (
                    <button
                      key={`page-${pageNum}`}
                      onClick={() => handlePageChange(pageNum)}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Page ${pageNum}`}
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center justify-center ${isActive
                        ? "bg-pink text-white shadow-md shadow-pink/30 ring-2 ring-pink/20 scale-105"
                        : "bg-[#31081F]/5 dark:bg-white/10 text-ink/80 dark:text-white/80 hover:bg-pink hover:text-white dark:hover:bg-pink dark:hover:text-white hover:scale-105 active:scale-95"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`group inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${currentPage === totalPages
                  ? "opacity-25 cursor-not-allowed pointer-events-none bg-[#31081F]/5 dark:bg-white/5 text-ink/40 dark:text-white/40 border border-transparent"
                  : "bg-white dark:bg-[#180010] border border-[#31081F]/15 dark:border-white/15 text-ink/90 dark:text-white/90 hover:border-pink hover:text-pink hover:bg-pink/5 dark:hover:bg-pink/10 hover:shadow-md active:scale-95"
                  }`}
              >
                <span className="hidden sm:inline">Next</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </nav>
          </Reveal>
        )}

        {/* CERTIFICATES & LICENSES */}
        <div id="certificates-section" />
        <Reveal variant="up" className="mt-24 md:mt-32">
          <h2 className="text-pink text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold flex items-center gap-3 sm:gap-4 tracking-tight">
            <Image
              src="/element-star.svg"
              alt=""
              width={44}
              height={44}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 inline-block shrink-0"
            />
            CERTIFICATES &amp; LICENSES
          </h2>
          <p className="text-pink text-xl sm:text-2xl md:text-3xl font-bold mt-2 md:mt-3">
            recognized skills &amp; industry credentials
          </p>
        </Reveal>

        {/* Certificate Category Tabs */}
        <Reveal variant="fade" delay={60}>
          <div className="flex flex-wrap gap-2.5 sm:gap-3.5 mt-8 md:mt-10">
            {certCategories.map((cat) => {


              const isSelected = activeCertCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => handleCertCategorySelect(cat.label)}
                  className={`group px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-normal transition-all cursor-pointer flex items-center gap-2 ${isSelected
                    ? "bg-pink text-white shadow-md ring-2 ring-pink/30"
                    : "bg-[#31081F]/5 dark:bg-white/10 text-ink/80 dark:text-white/80 hover:bg-pink hover:text-white dark:hover:bg-pink dark:hover:text-white"
                    }`}
                >
                  <span>{cat.display}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${isSelected
                      ? "bg-white/25 text-white"
                      : "bg-[#31081F]/10 dark:bg-white/15 text-ink dark:text-white group-hover:bg-white/20 group-hover:text-white"
                      }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-8 md:mt-10">
          {displayedCertificates.map((cert, index) => {
            const isGunadarma = cert.category === "Gunadarma";
            const isLPK = cert.category === "LPK";

            return (
              <Reveal key={cert.id} variant="up" delay={(index % 6) * 50}>
                <div className="group rounded-[26px] sm:rounded-[30px] border border-[#31081F]/10 dark:border-white/10 bg-[#FAF7F9] dark:bg-[#160010] p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-pink/40 relative overflow-hidden">
                  {/* Subtle decorative glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink/5 rounded-full blur-3xl group-hover:bg-pink/15 transition-all pointer-events-none" />

                  <div>
                    {/* Header: Category Badge + Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${isGunadarma
                          ? "bg-[#B91372]/10 text-[#B91372] dark:bg-pink/20 dark:text-pink border-[#B91372]/20 dark:border-pink/30"
                          : isLPK
                            ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 border-blue-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-500/20"
                          }`}
                      >
                        {cert.category}
                      </span>
                      <span className="text-xs font-bold text-ink/60 dark:text-white/60 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        {cert.date}
                      </span>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="font-bold text-lg sm:text-xl text-ink dark:text-white group-hover:text-pink transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs sm:text-sm font-bold text-pink mt-1 mb-2.5">
                      {cert.issuer}
                    </p>

                    {/* Credential ID + verification status */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {cert.credentialId && (
                        <span className="text-xs font-normal px-2.5 py-1 rounded-lg bg-[#31081F]/5 dark:bg-white/5 text-ink/70 dark:text-white/70 border border-[#31081F]/5 dark:border-white/5 inline-block select-all">
                          No. {cert.credentialId}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${cert.credentialUrl
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-ink/40 dark:text-white/40"
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${cert.credentialUrl ? "bg-emerald-500" : "bg-ink/30 dark:bg-white/30"
                            }`}
                        />
                        {cert.credentialUrl ? "Verified online" : "Certificate on file"}
                      </span>
                    </div>

                    {/* Description */}
                    {cert.description && (
                      <p className="text-xs sm:text-sm text-ink/75 dark:text-white/75 leading-relaxed mb-4">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  <div>
                    {/* Skills pills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#31081F]/5 dark:border-white/5 mb-4">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2.5 py-0.5 rounded-full bg-white dark:bg-white/10 text-ink/80 dark:text-white/80 border border-[#31081F]/10 dark:border-white/10 font-normal"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Button: Verify Credential (link eksternal) / View Certificate (PDF lokal) */}
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-[#31081F]/15 dark:border-white/15 hover:border-pink text-xs sm:text-sm font-bold text-ink dark:text-white hover:text-pink hover:shadow-sm transition-all group/btn"
                      >
                        <span className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                          <span>Verify Credential</span>
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    ) : cert.pdfPath ? (
                      <a
                        href={cert.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-[#31081F]/15 dark:border-white/15 hover:border-pink text-xs sm:text-sm font-bold text-ink dark:text-white hover:text-pink hover:shadow-sm transition-all group/btn"
                      >
                        <span className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                          <span>View Certificate (PDF)</span>
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Certificates Pagination Controls */}
        {certTotalPages > 1 && (
          <Reveal variant="fade" delay={80}>
            <nav
              className="flex items-center justify-center gap-2 sm:gap-3 mt-12 md:mt-16 select-none"
              aria-label="Certificates pagination"
            >
              {/* Prev Button */}
              <button
                onClick={() => handleCertPageChange(certCurrentPage - 1)}
                disabled={certCurrentPage === 1}
                aria-label="Previous page"
                className={`group inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${certCurrentPage === 1
                  ? "opacity-25 cursor-not-allowed pointer-events-none bg-[#31081F]/5 dark:bg-white/5 text-ink/40 dark:text-white/40 border border-transparent"
                  : "bg-white dark:bg-[#180010] border border-[#31081F]/15 dark:border-white/15 text-ink/90 dark:text-white/90 hover:border-pink hover:text-pink hover:bg-pink/5 dark:hover:bg-pink/10 hover:shadow-md active:scale-95"
                  }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:-translate-x-0.5"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {getPageNumbers(certCurrentPage, certTotalPages).map((page, idx) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`cert-ellipsis-${idx}`}
                        className="w-7 h-9 sm:w-9 sm:h-11 flex items-center justify-center text-ink/40 dark:text-white/40 font-bold text-xs sm:text-sm select-none"
                      >
                        …
                      </span>
                    );
                  }

                  const pageNum = Number(page);
                  const isActive = certCurrentPage === pageNum;

                  return (
                    <button
                      key={`cert-page-${pageNum}`}
                      onClick={() => handleCertPageChange(pageNum)}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Page ${pageNum}`}
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center justify-center ${isActive
                        ? "bg-pink text-white shadow-md shadow-pink/30 ring-2 ring-pink/20 scale-105"
                        : "bg-[#31081F]/5 dark:bg-white/10 text-ink/80 dark:text-white/80 hover:bg-pink hover:text-white dark:hover:bg-pink dark:hover:text-white hover:scale-105 active:scale-95"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handleCertPageChange(certCurrentPage + 1)}
                disabled={certCurrentPage === certTotalPages}
                aria-label="Next page"
                className={`group inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${certCurrentPage === certTotalPages
                  ? "opacity-25 cursor-not-allowed pointer-events-none bg-[#31081F]/5 dark:bg-white/5 text-ink/40 dark:text-white/40 border border-transparent"
                  : "bg-white dark:bg-[#180010] border border-[#31081F]/15 dark:border-white/15 text-ink/90 dark:text-white/90 hover:border-pink hover:text-pink hover:bg-pink/5 dark:hover:bg-pink/10 hover:shadow-md active:scale-95"
                  }`}
              >
                <span className="hidden sm:inline">Next</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </nav>
          </Reveal>
        )}
      </section>

      {/* LET'S CONNECT / CONTACT */}
      <section
        id="contact"
        className="px-4 sm:px-8 max-w-[1360px] mx-auto mt-24 md:mt-40 pb-20 md:pb-28"
      >
        <Reveal variant="up">
          <h2 className="text-pink text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold flex items-center gap-3 sm:gap-4 tracking-tight">
            <Image
              src="/element-star.svg"
              alt=""
              width={44}
              height={44}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 inline-block shrink-0"
            />
            LET&apos;S CONNECT!
          </h2>
          <p className="text-pink text-xl sm:text-2xl md:text-3xl font-bold mt-2 md:mt-3">
            have a project in mind or want to collaborate? let&apos;s talk!
          </p>
        </Reveal>

        <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (lg:col-span-5): Availability Status & Introductory Message */}
          <Reveal variant="up" delay={60} className="lg:col-span-5 space-y-4">
            {/* Availability Status Card */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Available for Freelance &amp; Full-Time Opportunities</span>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-ink/80 dark:text-white/80 leading-relaxed pt-1">
              Whether you have a UI/UX design project, visual branding needs, freelance inquiry, or full-time opportunity, I&apos;m always excited to collaborate and create meaningful digital experiences.
            </p>
          </Reveal>

          {/* Right Column (lg:col-span-7): 3 Contact Channels */}
          <Reveal variant="up" delay={120} className="lg:col-span-7 space-y-3.5">
            {/* 1. Email Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F9] dark:bg-[#160010] border border-pink/25 dark:border-pink/35 shadow-sm hover:border-pink/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-pink/10 text-pink flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-xs uppercase tracking-wider font-bold text-pink block mb-0.5">Email</span>
                  <span className="text-sm sm:text-base font-bold text-ink dark:text-white select-all block truncate">
                    susianasalsap@gmail.com
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyEmail("susianasalsap@gmail.com")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${copiedEmail
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-[#31081F]/5 dark:bg-white/10 hover:bg-pink hover:text-white text-ink dark:text-white"
                    }`}
                >
                  {copiedEmail ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
                <a
                  href="mailto:susianasalsap@gmail.com"
                  className="px-4 py-2 rounded-xl bg-pink text-white hover:bg-[#d01580] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Send Mail</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </a>
              </div>
            </div>

            {/* 2. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/susiana-salsa-putri"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#FAF7F9] dark:bg-[#160010] border border-[#31081F]/10 dark:border-white/10 hover:border-[#0077B5]/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#0077B5] block mb-0.5">LinkedIn</span>
                  <span className="text-sm sm:text-base font-bold text-ink dark:text-white group-hover:text-pink transition-colors">Susiana Salsa Putri</span>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ink/40 dark:text-white/40 group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
            </a>

            {/* 3. GitHub */}
            <a
              href="https://github.com/asacore"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#FAF7F9] dark:bg-[#160010] border border-[#31081F]/10 dark:border-white/10 hover:border-pink/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-black/10 dark:bg-white/10 text-ink dark:text-white flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-ink/60 dark:text-white/60 block mb-0.5">GitHub</span>
                  <span className="text-sm sm:text-base font-bold text-ink dark:text-white group-hover:text-pink transition-colors">susianasalsa</span>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ink/40 dark:text-white/40 group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Floating Scroll-to-top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-pink text-white shadow-lg shadow-pink/30 flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#d01580] hover:scale-110 active:scale-95 ${showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>


      {/* FOOTER */}
      <footer className="border-t border-[#31081F]/10 dark:border-white/10 bg-white dark:bg-[#0E0004] py-8 sm:py-10 transition-colors">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Image
            src="/logo-susiana.svg"
            alt="Susiana"
            width={140}
            height={26}
            className="h-[20px] md:h-[22px] w-auto"
          />
          <span className="text-xs text-ink/60 dark:text-white/60">
            &copy; {new Date().getFullYear()} Susiana Salsa Putri. Designed &amp; built with ♥
          </span>
        </div>
      </footer>

      {/* ── Interactive Lightbox / Modal ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer text-xl font-bold shadow-lg"
            aria-label="Close Preview"
          >
            ✕
          </button>

          {/* Previous Button */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-pink text-white flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer hover:scale-110 shadow-lg"
              aria-label="Previous Project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          )}

          {/* Next Button */}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-pink text-white flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer hover:scale-110 shadow-lg"
              aria-label="Next Project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          )}

          {/* Modal Content */}
          <div
            className="relative max-w-5xl w-full max-h-[94vh] flex flex-col items-center justify-center overflow-y-auto py-2 custom-scrollbar animate-modalPopIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Preview Area */}
            <div className="relative w-full h-[52vh] sm:h-[62vh] flex items-center justify-center">
              <Image
                src={
                  selectedProject.gallery && selectedProject.gallery[activeGalleryIndex]
                    ? selectedProject.gallery[activeGalleryIndex].image
                    : selectedProject.image
                }
                alt={
                  selectedProject.gallery && selectedProject.gallery[activeGalleryIndex]
                    ? selectedProject.gallery[activeGalleryIndex].title
                    : selectedProject.title
                }
                fill
                priority
                sizes="90vw"
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none rounded-xl transition-all duration-300"
              />

              {/* In-gallery Previous / Next buttons if multiple photos */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveGalleryIndex((prev) =>
                        prev > 0 ? prev - 1 : (selectedProject.gallery?.length ?? 1) - 1
                      );
                    }}
                    className="absolute left-2 sm:left-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-pink text-white flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer shadow-lg"
                    aria-label="Previous Photo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveGalleryIndex((prev) =>
                        prev < (selectedProject.gallery?.length ?? 1) - 1 ? prev + 1 : 0
                      );
                    }}
                    className="absolute right-2 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-pink text-white flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer shadow-lg"
                    aria-label="Next Photo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </>
              )}
            </div>

            {/* Gallery Thumbnail Selector */}
            {selectedProject.gallery && selectedProject.gallery.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3 flex-wrap z-10 px-2">
                {selectedProject.gallery.map((item, idx) => {
                  const isActive = activeGalleryIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGalleryIndex(idx);
                      }}
                      className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${isActive
                        ? "bg-pink text-white border-pink shadow-lg shadow-pink/30 scale-105 ring-2 ring-white/30"
                        : "bg-white/15 hover:bg-white/25 text-white/90 border-white/20"
                        }`}
                    >
                      <div className="relative w-4 h-4 rounded overflow-hidden bg-black/40 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="line-clamp-1">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Info Card */}
            <div className="mt-3.5 w-full max-w-3xl px-5 py-4 sm:px-6 sm:py-5 rounded-2xl bg-white/10 dark:bg-black/75 backdrop-blur-xl border border-white/15 text-white flex flex-col gap-3 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink text-white shadow-sm">
                      {selectedProject.institution}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-normal bg-white/20 text-white/90">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-pink-200">#{selectedProject.tag}</span>
                    {selectedProject.gallery && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/20">
                        {selectedProject.gallery.length} Photos
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-lg sm:text-xl text-white">
                    {selectedProject.title}
                  </h4>
                  {selectedProject.gallery && selectedProject.gallery[activeGalleryIndex]?.title && (
                    <p className="text-xs sm:text-sm text-pink font-bold">
                      Photo {activeGalleryIndex + 1} of {selectedProject.gallery.length}: {selectedProject.gallery[activeGalleryIndex].title}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <span className="text-xs text-white/60 font-mono">
                    {currentIndex + 1} / {filteredProjects.length}
                  </span>
                </div>
              </div>

              {/* Achievement / Award Highlight */}
              {selectedProject.award && (
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold shadow-inner">
                  <span className="text-base">🏆</span>
                  <span>{selectedProject.award}</span>
                </div>
              )}

              {/* Detail description */}
              {selectedProject.description && (
                <div className="pt-3 border-t border-white/15 text-xs sm:text-sm md:text-[15px] text-white/95 leading-relaxed font-normal">
                  <p>{selectedProject.description}</p>
                </div>
              )}

              {/* Project External Links (Prototype, GitHub, Instagram, Twibbon, Live) */}
              {selectedProject.links && (
                <div className="pt-3 border-t border-white/15 flex flex-wrap items-center gap-2.5">
                  <span className="text-xs text-white/70 font-bold mr-1 select-none">
                    Project Links:
                  </span>
                  {selectedProject.links.prototype && (
                    <a
                      href={selectedProject.links.prototype}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FA198B] hover:bg-[#ff309c] text-white shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                      {/* Figma / Prototype icon */}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /></svg>
                      <span>Figma Prototype</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </a>
                  )}
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/25 shadow-sm transition-all hover:scale-105 active:scale-95"
                    >
                      {/* GitHub icon */}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                      <span>GitHub</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </a>
                  )}
                  {selectedProject.links.instagram && (
                    <a
                      href={selectedProject.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    >
                      {/* Instagram icon */}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      <span>Instagram</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </a>
                  )}
                  {selectedProject.links.twibbon && (
                    <a
                      href={selectedProject.links.twibbon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#B91372] hover:bg-[#d01580] text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    >
                      {/* Twibbon / Campaign icon */}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                      <span>Twibbon Campaign</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </a>
                  )}
                  {selectedProject.links.live && (
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    >
                      {/* Globe icon */}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                      <span>Live Site</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </a>
                  )}
                  {selectedProject.links.handbook && (
                    <a
                      href={selectedProject.links.handbook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    >
                      {/* PDF / Document icon */}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>
                      <span>Handbook</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </a>
                  )}
                  {selectedProject.links.guidebook && (
                    <a
                      href={selectedProject.links.guidebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    >
                      {/* PDF / Document icon */}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>
                      <span>Guidebook</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GALLERY PHOTO LIGHTBOX MODAL */}
      {selectedGalleryPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedGalleryPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center animate-modalPopIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGalleryPhoto(null)}
              aria-label="Close photo preview"
              className="absolute -top-12 right-0 sm:right-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="relative w-full h-[70vh] sm:h-[80vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <Image
                src={selectedGalleryPhoto}
                alt="Enlarged gallery photo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ExperienceItem({
  title,
  role,
  period,
  overview,
  contributions,
  hidePeriod = false,
}: {
  title: string;
  role: string;
  period: string;
  overview: string;
  contributions: string[];
  hidePeriod?: boolean;
}) {
  return (
    <div>
      <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-ink dark:text-white">
        {title} <span className="text-pink font-bold">| {role}</span>
      </h3>
      {!hidePeriod && (
        <p className="text-sm sm:text-base md:text-lg font-bold text-ink/80 dark:text-white/80 mt-1 mb-3">
          {period}
        </p>
      )}

      <div
        className={`space-y-2 md:space-y-3 text-sm sm:text-base md:text-lg text-ink/90 dark:text-white/90 leading-relaxed ${hidePeriod ? "mt-2 md:mt-3" : ""
          }`}
      >
        <div className="flex items-start gap-3">
          <span className="inline-block w-5 md:w-6 h-1 bg-ink dark:bg-white rounded-full mt-[10px] md:mt-[12px] shrink-0"></span>
          <p>
            <strong>Overview :</strong> {overview}
          </p>
        </div>

        <div>
          <div className="flex items-start gap-3">
            <span className="inline-block w-5 md:w-6 h-1 bg-ink dark:bg-white rounded-full mt-[10px] md:mt-[12px] shrink-0"></span>
            <p>
              <strong>Key Contributions :</strong>
            </p>
          </div>
          <ul className="list-disc ml-10 md:ml-12 mt-2 space-y-1 text-sm sm:text-base md:text-lg">
            {contributions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}