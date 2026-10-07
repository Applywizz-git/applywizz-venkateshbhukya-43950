"use client";

import { skillsData } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillIcon from "@/components/Skills/SkillIcon";

export default function Skills() {
  return (
    <section id="tech" data-bg="Arsenal" className="relative z-10 w-full overflow-x-hidden py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Skills"
          title="Core Skills"
          copy="A working set of reporting, modeling, warehouse, and validation tools used across healthcare and business analytics."
        />
      </div>
      <div className="mt-12 flex flex-col gap-8">
        {skillsData.map((group, index) => {
          const items = [...group.items, ...group.items];
          const reverse = index % 2 === 1;
          return (
            <div key={group.id}>
              <div className="mx-auto mb-3 flex w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <p className="min-w-0 font-space text-[10px] leading-relaxed font-bold tracking-[0.12em] text-white/70 uppercase sm:text-xs sm:tracking-[0.22em]">
                  <span>Domain: {group.domain}</span>
                  <span className="mt-1 block text-accent/70 sm:mt-0 sm:ml-3 sm:inline">[ {group.items.length} items // active ]</span>
                </p>
              </div>
              <div className="marquee-row marquee-mask relative w-full overflow-hidden">
                <div className={`flex w-max gap-3 pr-3 sm:gap-4 ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}>
                  {items.map((skill, skillIndex) => (
                    <div
                      key={`${group.id}-${skill}-${skillIndex}`}
                      data-cursor
                      className="skill-tile glass-card group flex min-h-[124px] w-[112px] shrink-0 flex-col items-center justify-center rounded-xl border border-accent/10 px-2 py-3 text-center shadow-md hover:border-accent/40 hover:bg-accent/5 hover:shadow-[0_18px_30px_rgba(16,185,129,0.2)] sm:min-h-[140px] sm:w-[136px]"
                    >
                      <SkillIcon name={skill} />
                      <span className="font-space text-[9px] leading-tight font-bold tracking-[0.04em] break-words text-white uppercase sm:text-[10.5px] sm:tracking-[0.06em]">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-10 px-4 text-center font-space text-[10px] tracking-[0.12em] text-accent uppercase sm:text-xs sm:tracking-[0.28em]">
        Reporting, analytics, and data tools used in day-to-day work
      </p>
    </section>
  );
}
