"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { certificationsData } from "@/data/portfolio";
import type { IconType } from "react-icons";
import { HiOutlineChartPie, HiOutlineChip, HiOutlinePresentationChartBar } from "react-icons/hi";
import { SiGoogle } from "react-icons/si";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import CardIcon from "@/components/ui/CardIcon";

const spans = [
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-12",
];

const certIcons: Record<string, IconType> = {
  google: SiGoogle,
  aws: HiOutlineChip,
  azure: HiOutlineChartPie,
  ibm: HiOutlineChip,
  "gcp-specialization": HiOutlinePresentationChartBar,
};

export default function Certifications() {
  return (
    <section id="certificates" data-bg="Hero" className="relative z-10 w-full overflow-hidden py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Credentials"
          title="Certifications and Credentials"
          copy="Professional certifications and cloud data engineering credentials from Google Cloud, AWS, Microsoft, and Coursera."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {certificationsData.map((cert, index) => (
            <div key={cert.id} className={spans[index] ?? "lg:col-span-6"}>
              <TiltCard className="h-full" max={7}>
                <SpotlightCard wide={index === 4}>
                  <div className="flex items-center justify-between gap-4">
                    <CardIcon icon={certIcons[cert.id]} />
                    <span className="font-fancy text-sm tracking-[0.28em] text-white/40">0{index + 1}</span>
                  </div>
                  <p className="mt-6 font-space text-[11px] tracking-[0.28em] text-accent uppercase">
                    Certificate · {cert.issuer}
                  </p>
                  <h3 className="mt-3 font-syne text-xl leading-tight font-black break-words text-white transition-colors group-hover:text-accent sm:text-2xl md:[transform:translateZ(28px)]">
                    {cert.title}
                  </h3>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/70 to-transparent" />
                  <p className="mt-4 font-raj tracking-[0.22em] text-white/50 uppercase">Verified Credential</p>
                </SpotlightCard>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotlightCard({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  const [spot, setSpot] = useState({ x: 30, y: 20 });

  const move = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <article
      data-cursor
      onMouseMove={move}
      className={`group relative h-full overflow-hidden rounded-[2rem] border border-accent/35 bg-[#0c1424] shadow-[0_0_24px_rgba(16,185,129,0.14)] transition duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_32px_rgba(16,185,129,0.28)] ${
        wide ? "p-6 md:p-8" : "p-6 sm:p-7"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at ${spot.x}% ${spot.y}%, rgba(16,185,129,0.22), transparent 58%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent opacity-70" />
      <div className="relative">{children}</div>
    </article>
  );
}
