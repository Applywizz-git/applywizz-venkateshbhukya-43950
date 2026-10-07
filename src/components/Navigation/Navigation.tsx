"use client";

import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiOutlineBriefcase,
  HiOutlineFolder,
  HiOutlineHome,
  HiOutlineMail,
  HiOutlineStar,
  HiOutlineUser,
} from "react-icons/hi";
import { navItems, profile } from "@/data/portfolio";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Icon3D from "@/components/ui/Icon3D";

const navIcons: Record<string, IconType> = {
  home: HiOutlineHome,
  about: HiOutlineUser,
  experience: HiOutlineBriefcase,
  projects: HiOutlineFolder,
  skills: HiOutlineStar,
  education: HiOutlineAcademicCap,
  certifications: HiOutlineBadgeCheck,
  contact: HiOutlineMail,
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [radius, setRadius] = useState(200);
  const [shift, setShift] = useState(28);
  const [activeId, setActiveId] = useState(navItems[0].id);
  const reduced = usePrefersReducedMotion();
  const active = navItems.find((item) => item.id === activeId) ?? navItems[0];

  useEffect(() => {
    const updateRadius = () => {
      const header = 108;
      const footer = 88;
      const pill = 26;
      const top = header + pill;
      const bottom = window.innerHeight - footer - pill;
      const center = (top + bottom) / 2;
      const vertical = Math.max(0, (bottom - top) / 2);
      const horizontal = Math.max(0, window.innerWidth / 2 - 150);
      setRadius(Math.max(72, Math.min(210, vertical, horizontal)));
      setShift(center - window.innerHeight / 2);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = navItems
      .map((item) => document.querySelector(item.href))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const match = navItems.find((item) => item.href === `#${visible.target.id}`);
        if (match) setActiveId(match.id);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.2, 0.45, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    registerGsap();
    const nodes = gsap.utils.toArray<HTMLElement>("[data-orbit]");
    const disc = document.querySelector("[data-orbit-disc]");
    if (!disc) return;

    if (open) {
      gsap.to(disc, {
        opacity: 1,
        duration: reduced ? 0 : 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
      nodes.forEach((node) => {
        const x = Number(node.dataset.x);
        const y = Number(node.dataset.y);
        gsap.to(node, {
          x,
          y,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          opacity: 1,
          duration: reduced ? 0 : 0.75,
          delay: reduced ? 0 : Number(node.dataset.i) * 0.04,
          ease: "power4.out",
          overwrite: "auto",
        });
      });
    } else {
      gsap.to(nodes, {
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        scale: 0.2,
        opacity: 0,
        duration: reduced ? 0 : 0.35,
        ease: "power3.in",
        overwrite: "auto",
      });
      gsap.to(disc, {
        opacity: 0,
        duration: reduced ? 0 : 0.35,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  }, [open, reduced, radius]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`pointer-events-none fixed top-0 z-[80] flex w-full py-3 pt-[max(0.75rem,env(safe-area-inset-top))] transition-colors duration-500 sm:py-4 ${
          scrolled ? "bg-[#050816]/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <a href="#home" className="group pointer-events-auto flex min-w-0 items-center gap-2 sm:gap-3" data-cursor>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#05050A] p-1.5 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,249,255,0.4)] sm:h-12 sm:w-12">
              <Mark />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-fancy text-[11px] leading-none font-bold tracking-[0.12em] text-white drop-shadow-[0_0_10px_#00F9FF] min-[380px]:text-xs sm:text-sm sm:tracking-[0.16em] lg:text-base lg:tracking-[0.18em]">
                SAI <span className="text-cyanx">PATANGE.</span>
              </span>
              <span className="mt-1 inline-flex w-fit border-l-2 border-cyanx bg-[rgba(0,249,255,0.1)] px-1.5 py-0.5 font-raj text-[9px] font-semibold tracking-wider text-cyanx uppercase sm:text-[10px]">
                BI Analyst
              </span>
            </span>
          </a>

          <button
            type="button"
            className="pointer-events-auto absolute left-1/2 hidden max-w-[40vw] -translate-x-1/2 items-center gap-2 truncate rounded-full border bg-[#05050A]/80 px-5 py-2 font-raj text-sm tracking-[0.18em] uppercase backdrop-blur-md transition-all duration-300 hover:bg-white/10 lg:flex"
            style={{
              color: active.hue,
              borderColor: `${active.hue}66`,
              boxShadow: `0 0 15px ${active.hue}33`,
            }}
            onClick={() => document.querySelector(active.href)?.scrollIntoView({ behavior: "smooth" })}
          >
            {active.label}
          </button>

          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#05050A]/80 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,249,255,0.4)]"
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span className={`h-px bg-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px bg-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[70] overflow-hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div
          data-orbit-disc
          className="absolute inset-0 bg-[#05050A]/96 opacity-0 backdrop-blur-[28px]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,249,255,0.05) 1px, transparent 1px), linear-gradient(rgba(0,249,255,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className={`nav-stack absolute inset-0 z-[76] items-center overflow-y-auto px-5 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] transition-opacity duration-300 ${
            open ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div className="my-auto flex w-full max-w-md flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(13,17,23,0.85)] px-4 py-3 text-white/80"
              >
                <Icon3D icon={navIcons[item.id]} className="h-5 w-5 shrink-0" />
                <span className="font-raj text-base font-semibold tracking-wide" style={{ color: item.hue }}>
                  {item.label}
                </span>
              </a>
            ))}
            <a
              href={profile.emailHref}
              className="mt-2 px-1 text-center font-raj text-xs tracking-[0.14em] break-all text-cyanx uppercase"
            >
              {profile.email}
            </a>
          </div>
        </div>
        <div className="nav-orbit absolute top-1/2 left-1/2 z-[75] hidden md:block" style={{ transform: `translateY(${shift}px)` }}>
          {navItems.map((item, index) => {
            const angle = (index / navItems.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={item.id}
                data-orbit
                data-i={index}
                data-x={x}
                data-y={y}
                className="absolute top-0 left-0 opacity-0"
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group relative flex items-center gap-2 rounded-xl border border-white/10 bg-[rgba(13,17,23,0.85)] px-2.5 py-2 text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:gap-2.5 sm:px-3 sm:py-2.5"
                  style={{ ["--hue" as string]: item.hue }}
                >
                  <Icon3D icon={navIcons[item.id]} className="h-5 w-5" />
                  <span
                    className="font-raj text-[11px] leading-none font-semibold tracking-wide whitespace-nowrap sm:text-xs"
                    style={{ color: item.hue }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100"
                    style={{ boxShadow: `0 0 20px ${item.hue}, inset 0 0 10px ${item.hue}`, border: `1px solid ${item.hue}` }}
                  />
                </a>
              </div>
            );
          })}
        </div>
        {open ? (
          <a
            href={profile.emailHref}
            className="nav-email-float absolute bottom-8 left-1/2 z-[76] hidden max-w-[90vw] -translate-x-1/2 px-4 text-center font-raj text-xs tracking-[0.16em] break-all text-cyanx uppercase sm:text-sm md:block"
          >
            {profile.email}
          </a>
        ) : null}
      </div>
    </>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="sp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00F9FF" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#070b16" stroke="url(#sp)" />
      <text x="32" y="40" textAnchor="middle" fontSize="20" fontFamily="Orbitron, sans-serif" fill="url(#sp)">
        SP
      </text>
    </svg>
  );
}
