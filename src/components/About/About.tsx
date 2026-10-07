"use client";

import { useEffect, useRef } from "react";
import { aboutBlocks, focusPills, identityCards, stats, terminalLines } from "@/data/portfolio";
import type { IconType } from "react-icons";
import {
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineLightningBolt,
  HiOutlinePresentationChartBar,
  HiOutlineTrendingDown,
} from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import CardIcon from "@/components/ui/CardIcon";

const identityIcons: Record<string, IconType> = {
  Status: HiOutlineCheckCircle,
  Specialization: HiOutlineChartBar,
};

const statIcons: Record<string, IconType> = {
  "Years experience": HiOutlineClock,
  "Daily records processed": HiOutlinePresentationChartBar,
  "ETL workflows orchestrated": HiOutlineChartPie,
  "Successful execution rate": HiOutlineTrendingDown,
  "Batch time reduction": HiOutlineLightningBolt,
};
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function About() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from("[data-about]", {
        y: 28,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" ref={root} data-bg="Identity" className="relative z-10 w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-10">
          <div data-about className="group relative mx-auto w-full max-w-[360px] lg:mx-0">
            <div className="absolute -inset-4 rounded-full bg-accent/10 blur-[50px] transition duration-700 group-hover:opacity-70" />
            <TiltCard max={11} className="rounded-[2rem]">
              <img
                src="/about.png"
                alt="Business analyst workspace with analytics, data modeling, and business intelligence"
                className="h-auto w-full rounded-[2rem] object-contain"
              />
            </TiltCard>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <div data-about>
              <SectionHeading kicker="About" title="Professional Profile" />
            </div>
            <div className="flex flex-col gap-3">
              {aboutBlocks.map((block) => (
                <p
                  key={block.slice(0, 24)}
                  className="border-l-4 border-accent/40 pl-5 font-space text-base leading-[1.6] text-muted sm:pl-6"
                >
                  {block}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
              {identityCards.map((card) => (
                <TiltCard key={card.label} className="h-full" max={9}>
                  <div className="group glass-card h-full rounded-2xl border border-white/5 px-5 py-4 transition-colors duration-500 hover:border-accent/40">
                    <CardIcon icon={identityIcons[card.label]} className="mb-4 h-11 w-11" />
                    <p className="font-space text-[11px] tracking-[0.28em] text-accent/70 uppercase">{card.label}</p>
                    <p className="mt-1 font-syne text-base font-black tracking-tight break-words text-white uppercase transition-colors group-hover:text-accent sm:text-lg">{card.value}</p>
                  </div>
                </TiltCard>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {focusPills.map((pill) => (
                <span
                  key={pill}
                  className="press-3d rounded-full border border-accent/10 bg-accent/5 px-4 py-1.5 font-space text-xs tracking-[0.16em] text-white/80 uppercase hover:border-accent hover:bg-accent/10"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          data-about
          className="glass-card mt-6 overflow-hidden rounded-2xl border border-accent/20 px-5 py-4 font-space text-xs sm:text-sm"
        >
          <div className="mb-2 flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/50" />
          </div>
          {terminalLines.map((line) => (
            <p key={line.label} className="break-words text-white/80">
              <span className="text-accent">&gt;</span> {line.label}: <span className="text-cyanx">{line.value}</span>
            </p>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat) => (
            <TiltCard key={stat.label} className="h-full" max={10}>
              <article className="h-full rounded-[1.6rem] border border-accent/35 bg-[#0c1424] px-4 py-6 shadow-[0_0_24px_rgba(16,185,129,0.14)] transition duration-500 hover:border-accent hover:shadow-[0_18px_32px_rgba(16,185,129,0.28)]">
                <CardIcon icon={statIcons[stat.label]} className="mb-4 h-11 w-11" />
                <p className="font-fancy text-3xl text-[#34d399] sm:text-4xl md:[transform:translateZ(24px)]">{stat.value}</p>
                <p className="mt-3 font-space text-[10px] leading-snug font-semibold tracking-[0.06em] text-white uppercase sm:text-[11px] sm:tracking-[0.12em] md:[transform:translateZ(12px)]">{stat.label}</p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

