"use client";

import { useState, type MouseEvent } from "react";
import type { IconType } from "react-icons";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { profile } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon3D from "@/components/ui/Icon3D";
import TiltCard from "@/components/ui/TiltCard";

const contactIcons: Record<string, IconType> = {
  Location: HiOutlineLocationMarker,
  Phone: HiOutlinePhone,
  Email: HiOutlineMail,
};

const details = [
  {
    label: "Location",
    value: profile.location,
    note: "Primary work location",
    href: undefined,
  },
  {
    label: "Phone",
    value: profile.phone,
    note: "Direct line",
    href: profile.phoneHref,
  },
  {
    label: "Email",
    value: profile.email,
    note: "Direct email",
    href: profile.emailHref,
  },
];

export default function Contact() {
  return (
    <section id="contact" data-bg="Transmission" className="relative z-10 w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHeading kicker="Contact" title="Get in Touch" copy={`${profile.fullName} · ${profile.title}`} />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {details.map((item) => (
            <DetailCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailCard({
  label,
  value,
  note,
  href,
}: {
  label: string;
  value: string;
  note: string;
  href?: string;
}) {
  const [spot, setSpot] = useState({ x: 30, y: 24 });

  const move = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const body = (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${spot.x}% ${spot.y}%, rgba(16,185,129,0.24), transparent 62%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="relative flex h-full flex-col">
        <Icon3D icon={contactIcons[label]} className="mb-5 h-8 w-8 text-accent" />
        <span className="font-space text-[11px] tracking-[0.32em] text-accent uppercase">{label}</span>
        <span
          className={`mt-5 font-syne text-xl leading-tight font-black break-words text-white transition-colors group-hover:text-accent sm:text-2xl ${
            label === "Email" ? "text-[15px] break-all normal-case sm:text-lg" : "uppercase"
          }`}
        >
          {value}
        </span>
        <span className="mt-4 font-space text-sm leading-relaxed break-all text-white/60">{note}</span>
      </div>
    </>
  );

  const className =
    "group relative flex min-h-[200px] flex-col overflow-hidden rounded-[2rem] border border-accent/35 bg-[#0c1424] p-5 shadow-[0_0_24px_rgba(16,185,129,0.14)] transition duration-500 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_0_36px_rgba(16,185,129,0.32)] sm:min-h-[220px] sm:p-7";

  const external = href?.startsWith("http");
  const card = href ? (
    <a
      data-cursor
      href={href}
      onMouseMove={move}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={className}
    >
      {body}
    </a>
  ) : (
    <article data-cursor onMouseMove={move} className={className}>
      {body}
    </article>
  );

  return (
    <TiltCard className="h-full" max={10}>
      {card}
    </TiltCard>
  );
}
