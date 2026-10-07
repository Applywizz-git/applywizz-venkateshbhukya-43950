"use client";

import { useMemo, useState, type MouseEvent, type ReactNode } from "react";
import { certFilters, certificationsData, publicationData } from "@/data/portfolio";
import type { IconType } from "react-icons";
import { HiOutlineChartPie, HiOutlineChip, HiOutlinePresentationChartBar } from "react-icons/hi";
import { SiGoogle, SiIeee } from "react-icons/si";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import CardIcon from "@/components/ui/CardIcon";

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

const certIcons: Record<string, IconType> = {
  google: SiGoogle,
  aws: HiOutlineChip,
  azure: HiOutlineChartPie,
  ibm: HiOutlineChip,
  gcp: HiOutlinePresentationChartBar,
  warehouse: HiOutlinePresentationChartBar,
};

export default function Certifications() {
  const [filter, setFilter] = useState<(typeof certFilters)[number]>("All");

  const showCerts = filter !== "Specialization";
  const showPaper = filter !== "Certificates";

  const certs = useMemo(() => (showCerts ? certificationsData : []), [showCerts]);

  return (
    <section id="certificates" data-bg="Hero" className="relative z-10 w-full overflow-hidden py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="Credentials"
            title="Certificates and Credentials"
            copy="Professional certifications and cloud data engineering credentials from Google Cloud, AWS, Microsoft, and Coursera."
          />
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {certFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-full border px-4 py-2 font-syne text-xs font-black tracking-widest whitespace-nowrap uppercase transition-all duration-300 sm:px-5 ${
                  filter === item
                    ? "border-accent bg-accent text-[#04140e]"
                    : "border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {certs.map((cert, index) => (
            <div key={cert.id} className={spans[index] ?? "lg:col-span-6"}>
              <TiltCard className="h-full" max={7}>
                <SpotlightCard>
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
                  <p className="mt-4 font-raj tracking-[0.22em] text-white/50 uppercase">Coursera credential</p>
                </SpotlightCard>
              </TiltCard>
            </div>
          ))}

          {showPaper ? (
            <div className="md:col-span-2 lg:col-span-12">
              <TiltCard className="h-full" max={5}>
                <SpotlightCard wide>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <CardIcon icon={SiIeee} />
                    <span className="font-space text-[11px] tracking-[0.28em] text-cyanx uppercase">{publicationData.venue}</span>
                  </div>
                  <p className="mt-6 font-space text-[11px] tracking-[0.28em] text-accent uppercase">
                    {publicationData.kind === "Specialization" ? `Specialization · ${publicationData.venue}` : `Publication · ${publicationData.venue}`}
                  </p>
                  <h3 className="mt-3 max-w-4xl font-syne text-xl leading-tight font-black break-words text-white transition-colors group-hover:text-accent sm:text-2xl md:text-3xl md:[transform:translateZ(28px)]">
                    {publicationData.title}
                  </h3>
                  <p className="mt-5 font-space text-sm tracking-[0.18em] text-muted uppercase">{publicationData.kind}</p>
                </SpotlightCard>
              </TiltCard>
            </div>
          ) : null}
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
