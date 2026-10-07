"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function Magnetic({ children, className = "", strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || !fine || reduced) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      if (Math.hypot(dx, dy) < 140) {
        xTo(dx * strength);
        yTo(dy * strength);
      }
    };

    const reset = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [fine, reduced, strength]);

  return (
    <div ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </div>
  );
}
