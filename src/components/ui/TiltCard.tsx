"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  max?: number;
  onClick?: () => void;
};

export default function TiltCard({ children, className = "", max = 8, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();

  const reset = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      transformPerspective: 1200,
    });
    if (glare.current) gsap.to(glare.current, { opacity: 0, duration: 0.35 });
  };

  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!fine || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    gsap.to(ref.current, {
      rotateX: (0.5 - py) * max,
      rotateY: (px - 0.5) * max,
      z: 18,
      scale: 1.02,
      duration: 0.45,
      ease: "power3.out",
      transformPerspective: 1200,
      transformOrigin: "center",
    });
    if (glare.current) {
      glare.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.28), transparent 46%)`;
      gsap.to(glare.current, { opacity: 1, duration: 0.25 });
    }
  };

  return (
    <div className={fine ? "[perspective:1400px]" : undefined}>
      <div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={reset}
        onClick={onClick}
        className={`relative touch-manipulation ${onClick ? "cursor-pointer" : ""} ${fine ? "transform-3d will-change-transform" : ""} ${className}`}
        style={fine ? { transformStyle: "preserve-3d" } : undefined}
      >
        {children}
        <div ref={glare} className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] opacity-0" />
      </div>
    </div>
  );
}
