"use client";

import { useEffect, useRef } from "react";
import { experienceData } from "@/data/portfolio";
import type { IconType } from "react-icons";
import { HiOutlineChartBar, HiOutlineDatabase, HiOutlineDocumentReport } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import CardIcon from "@/components/ui/CardIcon";

const roleIcons: Record<string, IconType> = {
  truist: HiOutlineDocumentReport,
  molina: HiOutlineChartBar,
  augur: HiOutlineDatabase,
};
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-exp]").forEach((card) => {
        gsap.from(card, {
          y: 48,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: card, start: "top 86%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="experience" ref={root} data-bg="Identity" className="relative z-10 w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHeading kicker="Experience" title="Professional Experience" />
        <div className="relative mt-14">
          <div className="timeline-line absolute top-0 bottom-0 left-4 w-px md:left-1/2" />
          <div className="flex flex-col gap-10">
            {experienceData.map((item, index) => {
              const left = index % 2 === 0;
              return (
                <article key={item.id} data-exp className="relative md:grid md:grid-cols-2 md:gap-16">
                  <span className="absolute top-6 left-4 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-accent font-syne text-[10px] font-black text-[#04140e] shadow-[0_0_0_4px_#111827] sm:h-11 sm:w-11 sm:text-xs md:left-1/2">
                    {item.mark}
                  </span>
                  <div className={`min-w-0 ${left ? "md:col-start-1 md:pr-8" : "md:col-start-2 md:pl-8"}`}>
                    <TiltCard max={7} className="ml-8 sm:ml-10 md:ml-0">
                    <div
                      data-cursor
                      className={`group relative rounded-[2rem] border-b-4 border-accent bg-panel px-4 py-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-shadow duration-500 before:absolute before:top-8 before:hidden before:h-3 before:w-3 before:rotate-45 before:bg-panel before:content-[''] hover:shadow-[0_18px_40px_rgba(16,185,129,0.2)] sm:px-5 sm:py-6 md:before:block ${left ? "md:before:-right-1.5" : "md:before:-left-1.5"}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <CardIcon icon={roleIcons[item.id]} className="mb-4 h-11 w-11" />
                          <h3 className="font-syne text-xl leading-[1.05] font-black tracking-tight break-words text-white uppercase sm:text-[22px] md:text-[28px]">
                            {item.role}
                          </h3>
                          <p className="mt-2 font-space text-[12px] font-black tracking-[0.08em] break-words text-accent uppercase sm:tracking-[0.16em] md:text-[14px] md:tracking-[0.22em]">
                            {item.company}
                          </p>
                        </div>
                        <p className="font-fancy text-xs tracking-[0.2em] text-white/40">0{index + 1}</p>
                      </div>
                      <p className="mt-3 font-space text-xs tracking-[0.08em] break-words text-muted uppercase sm:tracking-[0.18em]">
                        {item.dates} · {item.location}
                      </p>
                      <ul className="mt-5 list-disc space-y-2 pl-5">
                        {item.points.map((point) => (
                          <li key={point} className="font-space text-[14px] leading-relaxed text-gray-300">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    </TiltCard>
                  </div>
                  <div className={`mt-3 ml-10 hidden font-space text-sm text-muted md:ml-0 md:block ${left ? "md:col-start-2 md:self-center md:pl-10" : "md:col-start-1 md:row-start-1 md:self-center md:pr-10 md:text-right"}`}>
                    <p className="tracking-[0.22em] uppercase">{item.dates}</p>
                    <p className="mt-1 text-white/80">{item.location}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
