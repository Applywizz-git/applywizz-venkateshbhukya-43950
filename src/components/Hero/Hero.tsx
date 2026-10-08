"use client";

import { useEffect, useRef } from "react";
import { HiOutlineBriefcase, HiOutlineDownload } from "react-icons/hi";
import { profile } from "@/data/portfolio";
import Magnetic from "@/components/ui/Magnetic";
import TiltCard from "@/components/ui/TiltCard";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .from("[data-hero='kicker']", { y: 24, opacity: 0, duration: 0.7 }, 0.15)
        .from("[data-hero='line']", { yPercent: 120, duration: 1, stagger: 0.08 }, 0.25)
        .from("[data-hero='rule']", { scaleX: 0, transformOrigin: "left center", duration: 0.6 }, 0.7)
        .from("[data-hero='copy']", { y: 20, opacity: 0, duration: 0.7 }, 0.8)
        .from("[data-hero='actions']", { y: 16, opacity: 0, duration: 0.6 }, 0.95)
        .from("[data-hero='visual']", { x: 40, opacity: 0, duration: 1.1, ease: "power3.out" }, 0.35);

      gsap.to("[data-hero='visual']", {
        y: -24,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="home"
      ref={root}
      data-bg="Hero"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-10 px-4 py-28 sm:px-6 md:flex-row md:items-center md:py-24 lg:px-8">
        <div className="flex w-full min-w-0 flex-1 flex-col items-center text-center md:items-start md:text-left">
          <div data-hero="kicker" className="mb-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl border border-accent/30 bg-panel/50 p-1 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md md:h-16 md:w-16">
              <HeroMark />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-syne text-[10px] font-black tracking-[0.4em] text-accent uppercase md:text-xs">
                Data Engineer
              </span>
              <span className="mt-1 font-space text-[8px] font-bold tracking-tight text-white/60 uppercase md:text-[10px]">
                {profile.location}
              </span>
            </div>
          </div>

          <h1 className="w-full max-w-full font-fancy text-[clamp(2rem,12vw,3.25rem)] leading-[0.92] font-medium tracking-tight text-white uppercase md:text-[clamp(2.4rem,4.2vw,4.5rem)]">
            <span className="block overflow-hidden">
              <span data-hero="line" className="block">
                Venkatesh
              </span>
            </span>
            <span className="block overflow-hidden text-accent">
              <span data-hero="line" className="block">
                Bhukya.
              </span>
            </span>
          </h1>

          <div data-hero="rule" className="mt-6 flex w-full max-w-xl items-center justify-center gap-3 md:justify-start">
            <div className="h-0.5 w-6 shrink-0 bg-accent/50 sm:w-8 md:w-12" />
            <p className="min-w-0 text-left font-syne text-[10px] font-black tracking-[0.08em] text-accent uppercase sm:text-xs sm:tracking-[0.12em] md:text-sm">
              {profile.heroRole}
            </p>
          </div>

          <p
            data-hero="copy"
            className="mt-6 w-full max-w-2xl border-l-2 border-accent/20 pl-4 text-left font-space text-sm leading-relaxed font-medium text-muted sm:pl-6 sm:text-base md:text-lg"
          >
            {profile.heroCopy}
          </p>

          <div data-hero="actions" className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start">
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#experience"
                className="press-3d inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 font-fancy text-[10px] font-bold tracking-widest text-[#04140e] uppercase shadow-[0_0_30px_rgba(16,185,129,0.28)] hover:opacity-90 sm:w-auto sm:px-6 sm:py-4 md:px-8 md:py-5"
              >
                <HiOutlineBriefcase className="h-4 w-4" />
                View Experience
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href="/resume.pdf"
                download="resume.pdf"
                className="press-3d inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-accent/30 px-5 py-3.5 font-fancy text-[10px] font-bold tracking-widest text-accent uppercase hover:bg-white/5 sm:w-auto sm:px-6 sm:py-4 md:px-8 md:py-5"
              >
                <HiOutlineDownload className="h-4 w-4" />
                Download Resume
              </a>
            </Magnetic>
          </div>
        </div>

        <div data-hero="visual" className="group relative w-full min-w-0 max-w-[560px] flex-1 md:max-w-none">
          <div className="absolute inset-8 rounded-full bg-accent/10 blur-[90px] transition-all duration-700 group-hover:opacity-60" />
          <TiltCard max={12} className="rounded-[2rem]">
            <img
              src="/hero.png"
              alt="Healthcare analytics dashboard covering claims, providers, payments, and operations"
              className="relative z-10 h-auto w-full rounded-[2rem] object-contain shadow-[0_24px_50px_rgba(16,185,129,0.28)]"
            />
          </TiltCard>
          <div className="absolute top-[8%] -right-2 z-10 hidden rounded-2xl border border-accent/30 bg-black/60 p-4 shadow-xl backdrop-blur-xl xl:block">
            <p className="font-space text-[10px] tracking-[0.28em] text-white/50 uppercase">Active analyst</p>
            <p className="mt-1 font-syne text-sm font-black tracking-widest text-accent">{profile.years} YEARS</p>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 md:block" aria-label="Scroll to about">
        <span className="flex h-[55px] w-[30px] items-start justify-center rounded-3xl border-2 border-accent/30 p-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_10px_#10b981]" />
        </span>
      </a>
    </section>
  );
}

function HeroMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <rect width="64" height="64" rx="16" fill="#071018" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="#10b981" strokeWidth="1.5" />
      <text x="32" y="37" textAnchor="middle" fontSize="12" fill="#00f9ff" fontFamily="Orbitron, sans-serif">
        VB
      </text>
    </svg>
  );
}

