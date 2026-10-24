"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Languages,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/context/app-context";
import { translations } from "@/lib/translations";
import { TypingText } from "./typing-text";

/* ─── Gallery data ───────────────────────────────────────────── */
const MEZAN_COUNT = 37;
const GALLERIES: Record<string, string[]> = {
  ticket:  Array.from({ length: 8 },          (_, i) => `/projects/ticket/${z(i+1)}.png`),
  port:    Array.from({ length: 5 },          (_, i) => `/projects/port/${z(i+1)}.png`),
  Judical: Array.from({ length: MEZAN_COUNT }, (_, i) => `/projects/judical/${z(i+1)}.png`),
  faulty:  Array.from({ length: 8 },          (_, i) => `/projects/faulty/${z(i+1)}.png`),
  clinic:  Array.from({ length: 4 },          (_, i) => `/projects/clinic/${z(i+1)}.png`),
};
function z(n: number) { return String(n).padStart(2, "0"); }

/* ─── Scroll-reveal variant ──────────────────────────────────── */
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.46, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO PAGE
════════════════════════════════════════════════════════════════ */
export function PortfolioPage() {
  const { language, toggleLanguage } = useAppContext();
  const t   = translations[language];
  const rtl = language === "ar";

  const [filter, setFilter]     = useState(t.projects.filters[0]);
  const [projectId, setProj]    = useState<string | null>(null);
  const [slide, setSlide]       = useState(0);
  const [navOpen, setNavOpen]   = useState(false);

  useEffect(() => { if (projectId) setSlide(0); }, [projectId]);
  useEffect(() => { setFilter(translations[language].projects.filters[0]); }, [language]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") { setProj(null); setNavOpen(false); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const filtered = useMemo(() => {
    if (filter === t.projects.filters[0]) return t.projects.items;
    const m: Record<string, string> = {
      All:"All", Systems:"Systems", Management:"Management", Realtime:"Realtime",
      "الكل":"All", "أنظمة":"Systems", "إدارة":"Management", "لحظي":"Realtime",
    };
    return t.projects.items.filter((p) => p.category === m[filter]);
  }, [filter, t.projects]);

  const certFiles = [
    "/certificates/cib-certificate.pdf",
    "/certificates/iti-certificate.pdf",
    "/certificates/depi-certificate.pdf",
    "/certificates/docker-certificate.pdf",
  ];

  const activeProject = t.projects.items.find((p) => p.id === projectId);

  /* ── Skill categories derived from data ── */
  const techByCategory = useMemo(() => {
    const cats = new Map<string, typeof t.skills.technical>();
    t.skills.technical.forEach((s) => {
      if (!cats.has(s.category)) cats.set(s.category, []);
      cats.get(s.category)!.push(s);
    });
    return cats;
  }, [t.skills.technical]);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text-primary)" }}>

      {/* ══════════════════════════════════════════════════════════
          NAV
          Reference: minimal — name+subtitle left, small caps links
          center/right, language pill right
      ══════════════════════════════════════════════════════════ */}
      <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 40 }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

            {/* Wordmark */}
            <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "flex-end", gap: 0 }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text-primary)", lineHeight: 1 }}>
                {t.nav.name}
              </span>
              <span className="wordmark-dot" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden-mobile nav-menu">
              {t.nav.items.map((item) => (
                <a key={item.id} href={item.href} className="nav-link">{item.id}</a>
              ))}
            </nav>

            {/* Right controls */}
            <div className="header-actions">
              <button onClick={toggleLanguage} className="lang-pill" aria-label="Toggle language">
                {language === "en" ? "AR" : "EN"}
              </button>
              <a href="#contact" className="btn-dark header-cta" style={{ padding: "8px 20px", fontSize: "0.775rem" }}>
                {t.hero.ctaHire}
              </a>
              {/* Hamburger */}
              <button
                onClick={() => setNavOpen(v => !v)}
                aria-label="Menu"
                className="show-mobile menu-toggle"
              >
                {navOpen ? <X size={20}/> : <Menu size={20}/>}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="mobile-menu-panel" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
            <nav className="wrap" style={{ paddingBlock: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {t.nav.items.map((item) => (
                <a key={item.id} href={item.href} className="nav-link"
                  style={{ fontSize: "0.85rem" }}
                  onClick={() => setNavOpen(false)}>
                  {item.id}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════════════════
          HERO — Mikon split: dark left | teal right
      ══════════════════════════════════════════════════════════ */}
      <section className="hero" id="home">

        {/* LEFT — dark navy panel */}
        <div className="hero-l">
          <div style={{ maxWidth: 500 }}>
            {/* Availability */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                {t.hero.availability}
              </span>
            </div>

            {/* Name */}
            <h1 style={{ fontSize: "clamp(2.5rem,5.5vw,3.75rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.04, color: "#fff", margin: 0 }}>
              {rtl
                ? <>{t.hero.greeting} <span style={{ color: "var(--accent)" }}>{t.hero.name}</span></>
                : <>I&apos;m <span style={{ color: "var(--accent)" }}>{t.hero.name}</span></>
              }
            </h1>

            {/* Role box */}
            <div className="role-box">
              <span><TypingText words={t.hero.typedRoles} /></span>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a href="#contact" className="btn-dark">
                {t.hero.ctaHire} <ArrowRight size={14}/>
              </a>
              <a href="/Ahmed-Ehab-Abdulhamid-Hamed.pdf" download className="btn-ghost-light">
                {t.hero.ctaCv}
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div>
                <div className="stat-n">{t.expbreif.experinceNumber}</div>
                <div className="stat-l">{t.expbreif.experinceHeader}</div>
              </div>
              <div>
                <div className="stat-n">{t.expbreif.projectsNumber}</div>
                <div className="stat-l">{t.expbreif.projectsHeader}</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — accent-color panel, photo flush bottom */}
        <div className="hero-r">
          <Image
            src="/Picture-Photoroom.png"
            alt="Ahmed Ehab"
            width={380}
            height={700}
            objectPosition="relative"
            priority
            style={{ objectFit: "cover", objectPosition: "top center", maxHeight: "96%", width: "auto", display: "block" }}
          />
          {/* Decorative marks (Mikon) */}
          <span aria-hidden style={{ position: "absolute", top: "18%", right: "14%", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>✦</span>
          <span aria-hidden style={{ position: "absolute", bottom: "30%", left: "10%", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>✦</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVICES — white bg, two-column, stacked rows
      ══════════════════════════════════════════════════════════ */}
      <section id="about" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap sec">
          <div className="services-grid">

            {/* Left — sticky heading */}
            <div style={{ position: "relative", top: "5px" }}>
              <span className="label">{t.services.title}</span>
              <h2 className="h2" style={{ marginTop: 0, marginBottom: "1.75rem" }}>
                {t.about.content}
              </h2>
              <a href="#contact" className="btn-dark">
                {t.hero.ctaHire} <ArrowRight size={14}/>
              </a>
            </div>

            {/* Right — service rows */}
            <div>
              {t.services.items.slice(0, 6).map((s, i) => (
                <motion.div
                  key={s.title}
                  className="svc-row"
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={rise}
                >
                  <div className="svc-num">{z(i+1)}</div>
                  <div>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: 4 }}>
                      {s.title}
                    </p>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROJECTS — reference: full-width image + white info panel
      ══════════════════════════════════════════════════════════ */}
      <section id="projects" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap sec">

          {/* Header */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "2.5rem" }}>
            <div>
              <span className="label">{t.projects.title}</span>
              <h2 className="h2" style={{ margin: 0 }}>{t.projects.title}</h2>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {t.projects.filters.map((f) => (
                <button key={f} className={`filter-btn${filter===f?" active":""}`} onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={rise}
                className="proj-card"
                onClick={() => setProj(p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setProj(p.id)}
              >
                {/* Image */}
                <div className="proj-img-wrap">
                  {GALLERIES[p.id] ? (
                    <Image
                      src={GALLERIES[p.id][0]}
                      alt={p.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width:640px) 100vw, 1100px"
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>
                      ⚙️
                    </div>
                  )}
                </div>

                {/* Info panel — reference screenshot style */}
                <div className="proj-info">
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                    <div>
                      <h3 className="proj-title">{p.title}</h3>
                      <p className="proj-sub">{p.category}</p>
                    </div>
                    <button
                      type="button"
                      style={{ flexShrink: 0, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--text-secondary)" }}
                      onClick={(e) => { e.stopPropagation(); setProj(p.id); }}
                      aria-label="Open project"
                    >
                      <ArrowRight size={12}/>
                    </button>
                  </div>

                  <p className="proj-desc">{p.summary}</p>

                  <div className="proj-footer">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {p.tech.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    {GALLERIES[p.id] && (
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                        🖼 {GALLERIES[p.id].length} {language === "ar" ? "صورة" : "images"}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SKILLS — reference: two-col, left heading, right tag groups
      ══════════════════════════════════════════════════════════ */}
      <section id="skills" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap sec">
          <div className="skills-grid">

            {/* Left */}
            <div>
              <span className="label">{t.skills.title}</span>
              <h2 className="h2" style={{ marginTop: 0, marginBottom: "1.25rem" }}>
                {t.skills.technicalTitle}
              </h2>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                {t.about.content}
              </p>

              {/* Soft skills below description */}
              <div style={{ marginTop: "2.5rem" }}>
                <div className="skill-cat-label">{t.skills.softTitle}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {t.skills.soft.map((s) => (
                    <span key={s.name} className="skill-tag">{s.name}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — categorized tag groups */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {Array.from(techByCategory.entries()).map(([cat, items], ci) => (
                <motion.div
                  key={cat}
                  custom={ci}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={rise}
                >
                  <div className="skill-cat-label">{cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {items.map((s) => (
                      <span key={s.name} className="skill-tag">{s.name}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════════════════════════════ */}
      <section id="experience" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap sec">
          <span className="label">{t.experience.title}</span>
          <h2 className="h2" style={{ margin: "0 0 2rem" }}>{t.experience.title}</h2>

          <div>
            {t.experience.items.map((e, i) => (
              <motion.div
                key={`${e.company}-${i}`}
                className="timeline-row"
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={rise}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "0.3rem" }}>
                  <div className="t-dot"/>
                  {i < t.experience.items.length-1 && (
                    <div style={{ width: 1, flex: 1, background: "var(--border)", minHeight: 24, marginTop: "0.4rem" }}/>
                  )}
                </div>
                <div style={{ paddingBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>
                    {e.period}
                  </span>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: "0.25rem 0 0.2rem", color: "var(--text-primary)" }}>
                    {e.title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--link)", margin: "0 0 0.5rem" }}>
                    {e.company}
                  </p>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
                    {e.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ABOUT — dark section, circle + photo left, text right
      ══════════════════════════════════════════════════════════ */}
      <section id="about-me" className="about-section">
        <div className="wrap sec">
          <div className="about-grid">

            {/* Photo */}
            <div className="about-photo-area">
              <div className="about-circle"/>
              <Image
                src="/Picture-Photoroom.png"
                alt="Ahmed Ehab"
                width={230}
                height={290}
                className="about-photo"
              />
            </div>

            {/* Text */}
            <div>
              {/* Breadcrumb */}
              <span style={{ fontSize: "0.67rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,246,245,0.38)", display: "block", marginBottom: "0.625rem" }}>
                {t.about.title} · {t.hero.name}
              </span>

              <h2 className="h2-white" style={{ marginTop: 0, marginBottom: "1.25rem" }}>
                {t.hero.role}
              </h2>

              <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "rgba(244,246,245,0.65)", marginBottom: "1rem" }}>
                {t.about.content}
              </p>

              {/* Social icons */}
              <div className="about-social">
                {t.socialPlatforms.items.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" title={item.label}>
                    <Image src={item.image} alt={item.label} width={18} height={18} style={{ opacity: 0.75 }}/>
                  </a>
                ))}
              </div>

              <a href="/Ahmed-Ehab-Abdulhamid-Hamed.pdf" download className="btn-ghost-light" style={{ marginTop: "1.75rem", display: "inline-flex" }}>
                {t.hero.ctaCv}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap sec">
          <span className="label">{t.certifications.title}</span>
          <h2 className="h2" style={{ margin: "0 0 2rem" }}>{t.certifications.title}</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {t.certifications.items.map((c, idx) => (
              <motion.div
                key={`${c.issuer}-${idx}`}
                className="cert-card"
                custom={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={rise}
              >
                <span className="cert-badge">{t.certifications.status}</span>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>{c.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0 }}>{c.issuer}</p>
                {certFiles[idx] && (
                  <a
                    href={certFiles[idx]}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                    style={{ alignSelf: "flex-start", marginTop: "auto", padding: "7px 18px", fontSize: "0.75rem" }}
                  >
                    {t.certifications.buttonTitle} <ExternalLink size={11}/>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONTACT — reference: bg-alt, left photo col + right info
      ══════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap sec">

          <div className="contact-grid">

            {/* Left — photo + large heading (reference style) */}
            <div>
              {/* Square photo */}
              <div style={{ position: "relative", width: "100%", maxWidth: 320, aspectRatio: "1/1", overflow: "hidden", border: "1px solid var(--border)", marginBottom: "2rem" }}>
                <Image src="/Picture-Photoroom.png" alt="Ahmed Ehab" fill style={{ objectFit: "cover", objectPosition: "top" }}/>
              </div>

              <span className="label">{t.contact.title}</span>
              <h2 className="h2" style={{ margin: 0, fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
                {t.contact.subtitle}
              </h2>

              <a href="#contact" className="btn-dark" style={{ marginTop: "1.75rem", display: "inline-flex" }}>
                {t.hero.ctaHire} <ArrowRight size={14}/>
              </a>
            </div>

            {/* Right — platforms */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

              {/* Social */}
              <div>
                <h3 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--accent)" }}><BriefcaseBusiness size={14}/></span>
                  {t.socialPlatforms.title}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
                  {t.socialPlatforms.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
                    >
                      <div style={{ width: 50, height: 50, borderRadius: "50%", border: "1.5px solid var(--border)", overflow: "hidden", position: "relative", background: "var(--surface)" }}>
                        <Image src={item.image} alt={item.label} fill style={{ objectFit: "cover" }}/>
                      </div>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Freelance */}
              <div>
                <h3 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--accent)" }}><ExternalLink size={14}/></span>
                  {t.freelancePlatforms.title}
                </h3>
                <div className="platform-grid">
                  {t.freelancePlatforms.items.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="platform-item">
                      <div style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--border)", overflow: "hidden", position: "relative", background: "var(--surface)" }}>
                        <Image src={item.image} alt={item.label} fill style={{ objectFit: "cover" }}/>
                      </div>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 3 }}>
                        {item.label} <ExternalLink size={9}/>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer className="footer">
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", paddingBlock: "1.5rem" }}>
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "flex-end", gap: 0 }}>
            <span style={{ fontSize: "1rem", fontWeight: 900, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>{t.nav.name}</span>
            <span className="wordmark-dot"/>
          </a>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", margin: 0 }}>{t.footer}</p>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════
          PROJECT MODAL
      ══════════════════════════════════════════════════════════ */}
      {projectId && activeProject && (
        <div className="modal-bg" onClick={() => setProj(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>

            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", padding: "1.5rem 1.75rem 0" }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.25rem", letterSpacing: "-0.015em" }}>
                  {activeProject.title}
                </h3>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>{activeProject.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setProj(null)}
                style={{ flexShrink: 0, padding: "6px 16px", border: "1px solid var(--border)", background: "transparent", fontSize: "0.78rem", color: "var(--text-secondary)", cursor: "pointer" }}
              >
                ✕ Close
              </button>
            </div>

            {/* Gallery — reference: large image top */}
            {GALLERIES[projectId] && (
              <div style={{ marginTop: "1.25rem" }}>
                <Gallery
                  images={GALLERIES[projectId]}
                  slide={slide}
                  setSlide={setSlide}
                  label={activeProject.title}
                />
              </div>
            )}

            {/* Info panel */}
            <div style={{ padding: "1.5rem 1.75rem" }}>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                {activeProject.summary}
              </p>

              {/* Meta row */}
              <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", paddingBottom: "1.25rem", marginBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>CATEGORY</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{activeProject.category}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>STACK</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{activeProject.tech.join(", ")}</div>
                </div>
              </div>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {activeProject.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY
════════════════════════════════════════════════════════════════ */
function Gallery({
  images,
  slide,
  setSlide,
  label,
}: {
  images: string[];
  slide: number;
  setSlide: Dispatch<SetStateAction<number>>;
  label: string;
}) {
  const n = images.length;
  return (
    <div>
      {/* Main viewport — reference: full-width no border-radius */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "var(--bg-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <Image
          src={images[slide]}
          alt={`${label} — ${slide+1}/${n}`}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width:640px) 95vw, 900px"
          priority
        />
        <button
          type="button" aria-label="Previous"
          onClick={() => setSlide(s => (s-1+n)%n)}
          style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(20,43,59,0.6)", color:"#fff", border:"none", cursor:"pointer" }}
        >
          <ChevronLeft size={16}/>
        </button>
        <button
          type="button" aria-label="Next"
          onClick={() => setSlide(s => (s+1)%n)}
          style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(20,43,59,0.6)", color:"#fff", border:"none", cursor:"pointer" }}
        >
          <ChevronRight size={16}/>
        </button>
      </div>

      {/* Counter + dots */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem", padding:"0.75rem 1.75rem" }}>
        <span style={{ fontSize:"0.75rem", color:"var(--text-muted)" }}>{slide+1} / {n}</span>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", justifyContent:"center" }}>
          {images.map((_,i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i+1}`}
              className="gallery-dot"
              style={{ width: i===slide ? 20 : 6, backgroundColor: i===slide ? "var(--accent)" : "var(--border)" }}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
