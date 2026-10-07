"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { educationData } from "@/data/portfolio";
import type { IconType } from "react-icons";
import { HiOutlineAcademicCap } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import CardIcon from "@/components/ui/CardIcon";

const schoolIcons: Record<string, IconType> = {
  eiu: HiOutlineAcademicCap,
};
import { gsap, registerGsap } from "@/lib/gsap";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Education() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    registerGsap();
    const desktop = window.matchMedia("(min-width: 768px) and (min-height: 640px)");
    let ctx: ReturnType<typeof gsap.context> | undefined;

    const setup = () => {
      ctx?.revert();
      ctx = undefined;
      const scene = stage.current;
      if (!scene || reduced || !desktop.matches) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          scene,
          { rotateX: 22, rotateY: -10 },
          {
            rotateX: 12,
            rotateY: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 80%",
              end: "center 60%",
              scrub: 0.6,
            },
          },
        );
      }, root);
    };

    setup();
    desktop.addEventListener("change", setup);
    return () => {
      desktop.removeEventListener("change", setup);
      ctx?.revert();
    };
  }, [reduced]);

  const tilt = (event: MouseEvent<HTMLDivElement>) => {
    if (!fine || reduced || !stage.current || window.innerWidth < 768) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(stage.current, {
      rotateY: px * 14,
      rotateX: 12 - py * 8,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const reset = () => {
    if (!stage.current || reduced || window.innerWidth < 768) return;
    gsap.to(stage.current, {
      rotateY: 0,
      rotateX: 12,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section id="education" ref={root} data-bg="Identity" className="relative z-10 w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHeading kicker="Education" title="Academic Background" />

        <div
          className="relative mt-10 h-auto md:mt-14 md:h-[560px] md:[perspective:1600px]"
          onMouseMove={tilt}
          onMouseLeave={reset}
        >
          <div
            ref={stage}
            className={`relative mx-auto grid h-auto w-full max-w-5xl grid-cols-1 items-stretch gap-6 md:h-full md:grid-cols-2 md:items-center md:[transform-style:preserve-3d] ${
              reduced ? "" : "md:[transform:rotateX(12deg)]"
            }`}
          >
            <div className="pointer-events-none absolute inset-x-[6%] bottom-6 hidden h-48 origin-bottom rounded-[2rem] border border-accent/20 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),transparent_68%)] [transform:rotateX(72deg)] md:block" />

            {educationData.map((item, index) => {
              const pose =
                reduced
                  ? ""
                  : index === 0
                    ? "md:[transform:translateX(-6%)_translateZ(40px)_rotateY(-16deg)]"
                    : "md:[transform:translateX(6%)_translateZ(10px)_rotateY(16deg)]";
              return (
                <article
                  key={item.id}
                  data-cursor
                  className="group relative mx-auto w-full max-w-[460px] md:[transform-style:preserve-3d]"
                >
                  <div
                    className={`rounded-[2rem] border border-accent/30 bg-[#0c1424]/95 p-5 shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition duration-500 sm:p-6 md:p-8 ${pose}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <CardIcon icon={schoolIcons[item.id]} />
                      <span className="max-w-[48%] text-right font-space text-[11px] tracking-[0.14em] text-white/50 uppercase sm:tracking-[0.22em]">{item.location}</span>
                    </div>
                    <h3 className="mt-6 font-syne text-xl leading-[1.1] font-black tracking-tight break-words text-white uppercase sm:text-[22px] md:text-[26px]">
                      {item.degree}
                    </h3>
                    <p className="mt-4 font-space text-[13px] font-black tracking-[0.08em] break-words text-accent uppercase sm:tracking-[0.16em]">{item.school}</p>
                    <p className="mt-4 font-space text-sm text-muted">{item.dates}</p>
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
