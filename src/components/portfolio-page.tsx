"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Languages,
  Moon,
  Sun,
  UsersRound
} from "lucide-react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppContext } from "@/context/app-context";
import { translations } from "@/lib/translations";
import { TypingText } from "./typing-text";

const MEZAN_GALLERY_COUNT = 37;

const PROJECT_GALLERIES: Record<string, string[]> = {
  ticket: Array.from({ length: 8 }, (_, i) => `/projects/ticket/${String(i + 1).padStart(2, "0")}.png`),
  port: Array.from({ length: 5 }, (_, i) => `/projects/port/${String(i + 1).padStart(2, "0")}.png`),
  Judical: Array.from({ length: MEZAN_GALLERY_COUNT }, (_, i) => `/projects/judical/${String(i + 1).padStart(2, "0")}.png`),
  faulty: Array.from({ length: 8 }, (_, i) => `/projects/faulty/${String(i + 1).padStart(2, "0")}.png`),
  clinic: Array.from({ length: 4 }, (_, i) => `/projects/clinic/${String(i + 1).padStart(2, "0")}.png`),
};

export function PortfolioPage() {
  const { language, theme, toggleLanguage, toggleTheme } = useAppContext();
  const t = translations[language];
  const [activeFilter, setActiveFilter] = useState(t.projects.filters[0]);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [gallerySlide, setGallerySlide] = useState(0);

  useEffect(() => {
    if (projectId && PROJECT_GALLERIES[projectId]) setGallerySlide(0);
  }, [projectId]);

  useEffect(() => {
    setActiveFilter(translations[language].projects.filters[0]);
  }, [language]);

  const projects = useMemo(() => {
    if (activeFilter === t.projects.filters[0]) return t.projects.items;
    const map: Record<string, string> = {
      All: "All",
      Systems: "Systems",
      Management: "Management",
      Realtime: "Realtime",
      "الكل": "All",
      "أنظمة": "Systems",
      "إدارة": "Management",
      "لحظي": "Realtime",
    };
    return t.projects.items.filter((x) => x.category === map[activeFilter]);
  }, [activeFilter, t.projects.filters, t.projects.items]);
  const certificationFiles = [
    "/certificates/cib-certificate.pdf",
    "/certificates/iti-certificate.pdf",
    "/certificates/depi-certificate.pdf",
    "/certificates/docker-certificate.pdf",
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070b14] text-zinc-100">
      <ParticleCanvas />
      <div className="noise-overlay pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl"
          animate={{ x: [0, 30, -15, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-0 top-40 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl"
          animate={{ x: [0, -20, 10, 0], y: [0, 20, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#090f1dcc]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <a className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text font-extrabold text-transparent" href="#">
            {t.nav.name}
          </a>
          <nav className="hidden gap-5 md:flex">
            {t.nav.items.map((item) => (
              <a key={item.id} href={item.href} className="text-sm text-zinc-300 transition hover:text-white">
                {item.id}
              </a>
            ))}
          </nav>
          <div className="flex gap-2">
            <button className="rounded-full border border-white/20 bg-white/10 p-2 transition hover:bg-white/20" onClick={toggleLanguage} aria-label="Toggle language">
              <Languages size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-24 px-4 py-12 md:px-8">
        <section className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.04] p-8 backdrop-blur-2xl md:p-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-300">{t.hero.greeting}</p>
              <h1 className="mt-4 bg-gradient-to-r from-cyan-300 via-white to-violet-400 bg-clip-text text-3xl font-black text-transparent md:text-5xl">{t.hero.name}</h1>
              <p className="mt-3 text-lg text-zinc-300 md:text-2xl">{t.hero.role}</p>
              <p className="mt-3 text-xl font-semibold"><TypingText words={t.hero.typedRoles} /></p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 font-semibold shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5">{t.hero.ctaHire}</a>
                <a href="/Ahmed-Ehab-Abdulhamid-Hamed.pdf" download className="rounded-full border border-white/25 bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/15">{t.hero.ctaCv}</a>
              </div>
            </div>
            <div className="relative mx-auto flex flex-col items-center md:pt-2">
              <div className="mb-4 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-300 md:absolute md:left-1/2 md:top-0 md:mb-0 md:-translate-x-1/2 md:-translate-y-[calc(100%+0.75rem)]">
                {t.hero.availability}
              </div>
              <div className="h-56 w-56 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-1 shadow-[0_0_80px_rgba(59,130,246,0.35)]">
                <Image src="/Picture.png" alt="Ahmed Ehab" width={224} height={224} className="h-full w-full rounded-full object-cover" />
              </div>
              <div className="absolute -left-10 top-8 rounded-xl border border-white/20 bg-[#0f172fcc] px-3 py-2 text-xs">
                <p className="text-zinc-400">{t.expbreif.experinceHeader}</p>
                <p className="font-semibold text-zinc-100">{t.expbreif.experinceNumber}</p>
              </div>
              <div className="absolute -right-10 bottom-8 rounded-xl border border-white/20 bg-[#0f172fcc] px-3 py-2 text-xs">
                <p className="text-zinc-400">{t.expbreif.projectsHeader}</p>
                <p className="font-semibold text-zinc-100">{t.expbreif.projectsNumber}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <Title>{t.about.title}</Title>
          <Card>{t.about.content}</Card>
        </section>
        <section>
          <Title>{t.services.title}</Title>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {t.services.items.map((s) => (
              <motion.article key={s.title} whileHover={{ y: -5 }} className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{s.description}</p>
              </motion.article>
            ))}
          </div>
        </section>
        <section id="skills">
          <Title>{t.skills.title}</Title>
          <h3 className="mt-6 text-lg font-semibold tracking-wide text-zinc-200">{t.skills.technicalTitle}</h3>
          <SkillBars
            items={t.skills.technical}
            barClass="from-cyan-400 to-fuchsia-500"
          />
          <h3 className="mt-10 text-lg font-semibold tracking-wide text-zinc-200">{t.skills.softTitle}</h3>
          <SkillBars
            items={t.skills.soft}
            barClass="from-emerald-400 to-teal-400"
          />
        </section>
        
        <section id="experience">
          <Title>{t.experience.title}</Title>
          <div className="mt-6 border-s border-white/20 ps-6">
            <div className="space-y-5">
              {t.experience.items.map((e, index) => (
                <motion.article
                  key={`${e.company}-${e.period}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, rotateX: 8, scale: 0.98 }}
                  whileInView={{ opacity: 1, x: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                  className="group relative rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl"
                >
                  <span className="absolute -start-[34px] top-7 h-3 w-3 rounded-full bg-cyan-400" />
                  <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-violet-500/0 opacity-0 blur-xl transition group-hover:opacity-100 group-hover:from-blue-500/20 group-hover:to-violet-500/20" />
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="text-sm text-cyan-300">{e.company} - {e.period}</p>
                  <p className="mt-2 text-sm text-zinc-300">{e.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section id="projects">
          <Title>{t.projects.title}</Title>
          <div className="mt-5 grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <motion.article
                whileHover={{ y: -6 }}
                key={p.id}
                className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl"
              >
                {!PROJECT_GALLERIES[p.id] ? (
                  <div className="grid h-36 shrink-0 place-items-center border-b border-white/10 bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-4xl sm:h-40">
                    ⚙️
                  </div>
                ) : (
                  <div
                    className="shrink-0 border-b border-white/10 bg-gradient-to-r from-fuchsia-500/15 via-transparent to-cyan-500/15 py-2 sm:py-2.5"
                    aria-hidden
                  />
                )}
                <div className="flex min-w-0 flex-col p-4 sm:p-5">
                  <h3 className="break-words text-base font-semibold leading-snug sm:text-lg">{p.title}</h3>
                  <p className="mt-2 min-w-0 break-words text-sm leading-relaxed text-zinc-300">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((x) => (
                      <span
                        key={x}
                        className="max-w-full break-words rounded-full border border-cyan-500/40 px-2 py-1 text-xs text-cyan-200"
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-4 inline-flex w-full max-w-full items-center justify-center gap-2 rounded-xl border border-fuchsia-400/45 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 px-4 py-2.5 text-sm font-medium text-fuchsia-100 shadow-sm shadow-fuchsia-900/20 transition hover:border-fuchsia-400/70 hover:from-fuchsia-500/30 hover:to-violet-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400/60 sm:mt-4 sm:w-fit sm:self-start"
                    onClick={() => setProjectId(p.id)}
                  >
                    {t.projects.viewDetails}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <section>
          <Title>{t.certifications.title}</Title>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {t.certifications.items.map((c, index) => (
              <motion.article
                key={`${c.issuer}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl"
              >
                <div className="mb-3 inline-flex rounded-full border border-emerald-400/35 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  {t.certifications.status}
                </div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-zinc-300">{c.issuer}</p>
                {certificationFiles[index] ? (
                  <a
                    href={certificationFiles[index]}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 transition hover:bg-cyan-500/20"
                  >
                    {t.certifications.buttonTitle}
                  </a>
                ) : null}
              </motion.article>
            ))}
          </div>
        </section>
        <section id="contact">
          <Title>{t.contact.title}</Title>
          <p className="mt-2 text-zinc-300">{t.contact.subtitle}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <span className="rounded-lg bg-blue-500/20 p-1.5 text-blue-300"><UsersRound size={16}/></span>
                {t.socialPlatforms.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {t.socialPlatforms.items.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20 shadow-lg shadow-blue-900/25 transition duration-300 group-hover:scale-110 group-hover:border-cyan-400/60">
                      <Image src={item.image} alt={item.label} fill className="object-cover" />
                    </div>
                    <span className="text-xs text-zinc-300">{item.label}</span>
                  </a>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <span className="rounded-lg bg-violet-500/20 p-1.5 text-violet-300"><BriefcaseBusiness size={16} /></span>
                {t.freelancePlatforms.title}              
                </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {t.freelancePlatforms.items.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 transition hover:border-violet-400/50 hover:bg-white/10">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20 shadow-lg shadow-violet-900/25 transition duration-300 group-hover:scale-110 group-hover:border-violet-400/60">
                      <Image src={item.image} alt={item.label} fill className="object-cover" />
                    </div>
                    <span className="flex items-center gap-1 text-xs text-zinc-300">
                      {item.label}
                      <ExternalLink size={12} className="text-zinc-500" />
                    </span>
                  </a>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>

      {projectId ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 sm:items-center sm:p-4"
          onClick={() => setProjectId(null)}
        >
          <div
            className={`mb-[max(0px,env(safe-area-inset-bottom))] max-h-[min(92dvh,920px)] w-full max-w-[calc(100vw-1.5rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[#0e1425] p-4 shadow-2xl sm:mb-0 sm:max-h-[min(94dvh,1000px)] sm:p-6 ${PROJECT_GALLERIES[projectId] ? "max-w-6xl" : "max-w-lg"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="break-words text-lg font-semibold leading-snug sm:text-xl">
              {t.projects.items.find((p) => p.id === projectId)?.title}
            </h3>
            <p className="mt-2 break-words text-sm leading-relaxed text-zinc-300">
              {t.projects.items.find((p) => p.id === projectId)?.summary}
            </p>
            {PROJECT_GALLERIES[projectId] ? (
              <ProjectGallery
                images={PROJECT_GALLERIES[projectId]}
                slide={gallerySlide}
                setSlide={setGallerySlide}
                label={t.projects.items.find((p) => p.id === projectId)?.title ?? "Project"}
              />
            ) : null}
            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm transition hover:border-white/35 hover:bg-white/20 hover:shadow-md hover:shadow-black/20 active:scale-[0.98] sm:mt-5 sm:w-auto sm:py-2"
              onClick={() => setProjectId(null)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-zinc-400">{t.footer}</footer>
    </main>
  );
}

function ProjectGallery({
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
    <div className="mt-4 min-w-0 sm:mt-5">
      <div className="relative aspect-video w-full min-h-[12rem] min-w-0 overflow-hidden rounded-xl border border-white/10 bg-black/50 sm:min-h-0">
        <Image
          src={images[slide]}
          alt={`${label} — screen ${slide + 1} of ${n}`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 96vw, (max-width: 1152px) 92vw, 1100px"
          priority
        />
        <button
          type="button"
          aria-label="Previous screenshot"
          className="absolute left-1 top-1/2 flex h-9 w-9 shrink-0 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/85 sm:left-2 sm:h-10 sm:w-10"
          onClick={() => setSlide((s) => (s - 1 + n) % n)}
        >
          <ChevronLeft className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
        </button>
        <button
          type="button"
          aria-label="Next screenshot"
          className="absolute right-1 top-1/2 flex h-9 w-9 shrink-0 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/85 sm:right-2 sm:h-10 sm:w-10"
          onClick={() => setSlide((s) => (s + 1) % n)}
        >
          <ChevronRight className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-zinc-500">
        {slide + 1} / {n}
      </p>
      <div className="mt-2 flex max-w-full gap-2 overflow-x-auto overflow-y-hidden pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to screenshot ${i + 1}`}
            aria-current={i === slide ? "true" : undefined}
            className={`h-2 shrink-0 rounded-full transition touch-manipulation ${i === slide ? "w-6 bg-fuchsia-400" : "w-2 bg-white/30 hover:bg-white/50"}`}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}

function SkillBars({ items, barClass }: { items: { name: string; level: number }[]; barClass: string }) {
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      {items.map((s) => (
        <Card key={s.name}>
          <div className="mb-2 flex justify-between text-sm">
            <span>{s.name}</span>
            <span>{s.level}%</span>
          </div>
          <div className="h-2 rounded-full bg-zinc-700/50">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${s.level}%` }}
              viewport={{ once: true }}
              className={`h-full rounded-full bg-gradient-to-r ${barClass}`}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

function Title({ children }: { children: string }) {
  return <h2 className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent">{children}</h2>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <article className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">{children}</article>;
}

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.4,
      });
    }

    let frame = 0;
    const draw = () => {
      frame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 155, 255, 0.35)";
        ctx.fill();
      });
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 opacity-60" />;
}
