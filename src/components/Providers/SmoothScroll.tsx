"use client";

import { useEffect, type ReactNode } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ScrollLock = {
  stop: () => void;
  start: () => void;
};

let pageScroll: ScrollLock | null = null;
let scrollLocked = false;

export function lockPageScroll(locked: boolean) {
  scrollLocked = locked;
  if (!pageScroll) return;
  if (locked) pageScroll.stop();
  else pageScroll.start();
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    if (reduced) return;

    let cancelled = false;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const instance = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        lerp: 0.085,
      });
      instance.on("scroll", ScrollTrigger.update);
      pageScroll = instance;
      if (scrollLocked) instance.stop();
      const ticker = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(ticker);
        pageScroll = null;
        instance.destroy();
      };
    };

    let cleanup: (() => void) | undefined;
    start().then((fn) => {
      if (cancelled) {
        fn?.();
        return;
      }
      cleanup = fn;
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);

  return <>{children}</>;
}
