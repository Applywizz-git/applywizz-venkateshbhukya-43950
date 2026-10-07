"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projectFilters, projectsData, type ProjectItem } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import type { IconType } from "react-icons";
import { HiOutlineHeart, HiOutlineTrendingUp, HiOutlineTruck } from "react-icons/hi";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { lockPageScroll } from "@/components/Providers/SmoothScroll";
import CardIcon from "@/components/ui/CardIcon";

const projectIcons: Record<string, IconType> = {
  "banking-audit": HiOutlineTrendingUp,
  "healthcare-reference": HiOutlineHeart,
  "retail-ingestion": HiOutlineTruck,
};

export default function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const [active, setActive] = useState<ProjectItem | null>(null);
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const visible = useMemo(
    () => (filter === "All" ? projectsData : projectsData.filter((project) => project.category === filter)),
    [filter],
  );

  useEffect(() => {
    registerGsap();
    if (reduced) return;
    const cards = root.current?.querySelectorAll("[data-project]");
    if (!cards?.length) return;
    const tween = gsap.from(cards, {
      y: 36,
      duration: 0.85,
      stagger: 0.12,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: root.current, start: "top 78%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(cards, { clearProps: "all" });
    };
  }, [reduced, visible]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const previousHtml = html.style.overflow;
    const previousBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    lockPageScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = previousHtml;
      document.body.style.overflow = previousBody;
      lockPageScroll(false);
    };
  }, [active]);

  return (
    <section id="work" ref={root} data-bg="Lab" className="relative z-10 w-full overflow-x-clip">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHeading
          kicker="Projects"
          title="Selected Projects"
          copy="Three data engineering cases spanning financial auditing, healthcare reference standardization, and retail ingestion modernization."
        />
        <div className="relative z-20 mt-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {projectFilters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={`min-h-11 touch-manipulation rounded-full border px-4 py-2 font-syne text-xs font-black tracking-widest whitespace-nowrap uppercase transition-colors duration-300 sm:w-auto sm:px-5 ${
                filter === item
                  ? "border-accent bg-accent text-[#04140e]"
                  : "border-white/10 text-white/80 active:bg-white/10"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-6">
          {visible.map((project, index) => (
            <div key={project.id} data-project>
              <TiltCard className="h-full" max={5} onClick={() => setActive(project)}>
                <article
                  data-cursor
                  className="project-card group grid cursor-pointer overflow-clip rounded-[2rem] border border-accent/35 bg-[#0c1424] shadow-[0_0_24px_rgba(16,185,129,0.14)] transition duration-500 hover:border-accent hover:shadow-[0_0_32px_rgba(16,185,129,0.28)] lg:grid-cols-2"
                >
                  <div className={`overflow-clip ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={projectImages[project.id]}
                      alt={project.title}
                      className="h-52 w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-64 lg:h-full lg:min-h-[280px]"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8">
                    <CardIcon icon={projectIcons[project.id]} className="mb-5 h-11 w-11" />
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-space text-[11px] tracking-[0.24em] text-accent uppercase">{project.category}</p>
                      <span className="font-fancy text-sm tracking-[0.28em] text-white/40">{project.number}</span>
                    </div>
                    <h3 className="mt-4 font-syne text-xl leading-tight font-black tracking-tight break-words text-white uppercase transition group-hover:text-accent sm:text-2xl md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 font-space text-sm leading-relaxed text-muted">{project.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="font-space text-[12px] font-bold tracking-widest text-cyanx uppercase">
                          #{tech}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex w-fit rounded-full bg-accent px-5 py-2 font-syne text-xs font-black tracking-[0.2em] text-[#04140e] uppercase">
                      View Project
                    </span>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
      {active ? <Dossier project={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}

function Dossier({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!panel.current) return;
    gsap.fromTo(
      panel.current,
      { clipPath: "inset(12% 12% 12% 12%)", opacity: 0, scale: 0.96 },
      { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1, duration: 0.7, ease: "power4.out" },
    );
  }, [project]);

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[120] flex items-end justify-center overscroll-contain bg-black/70 p-3 backdrop-blur-md sm:items-center sm:p-4"
      onClick={onClose}
      onWheel={(event) => event.stopPropagation()}
    >
      <div
        ref={panel}
        data-lenis-prevent
        className="no-scrollbar glass-card max-h-[92svh] min-h-0 w-full min-w-0 max-w-5xl overflow-y-auto overscroll-contain rounded-[1.5rem] border border-accent/30 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:max-h-[90vh] sm:rounded-[2rem] sm:p-8"
        onClick={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <CardIcon icon={projectIcons[project.id]} className="h-11 w-11" />
            <p className="font-fancy text-sm tracking-[0.35em] text-accent">{project.number}</p>
          </div>
          <button type="button" onClick={onClose} className="shrink-0 rounded-full border border-white/15 px-4 py-2 font-raj text-xs tracking-[0.2em] text-white/70 uppercase">
            Close
          </button>
        </div>
        <div className="mt-4 grid min-w-0 gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0 overflow-hidden rounded-[1.6rem]">
            <img src={projectImages[project.id]} alt={project.title} className="h-auto max-h-[36svh] w-full object-contain sm:max-h-[70vh]" />
          </div>
          <div className="min-w-0">
            <p className="font-space text-xs tracking-[0.2em] text-accent uppercase sm:tracking-[0.28em]">{project.category}</p>
            <h3 className="mt-2 font-syne text-2xl leading-tight font-black break-words text-white uppercase sm:text-3xl sm:leading-[0.95]">{project.title}</h3>
            <div className="mt-5 space-y-3">
              {project.details.map((detail) => (
                <p key={detail} className="font-space text-sm leading-relaxed text-muted">
                  {detail}
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-accent/20 px-3 py-1 font-space text-xs tracking-widest text-white uppercase">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const projectImages: Record<string, string> = {
  "banking-audit": "/project1.png",
  "healthcare-reference": "/project2.png",
  "retail-ingestion": "/project3.png",
};
