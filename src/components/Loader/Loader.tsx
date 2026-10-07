"use client";

import { useEffect, useState } from "react";
import { loaderPhases, profile } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PHASE_MS = 850;

export default function Loader() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(0);
  const [within, setWithin] = useState(0);
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || reducedMotion) {
      setVisible(false);
      return;
    }

    const start = Date.now();
    const total = PHASE_MS * loaderPhases.length;
    let hideTimer = 0;
    let dismissed = false;

    const dismiss = (delay: number) => {
      if (dismissed) return;
      dismissed = true;
      setLeaving(true);
      hideTimer = window.setTimeout(() => setVisible(false), delay);
    };

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const index = Math.min(loaderPhases.length - 1, Math.floor(elapsed / PHASE_MS));
      const local = Math.min(1, (elapsed - index * PHASE_MS) / PHASE_MS);
      setPhase(index);
      setWithin(local);
      if (elapsed >= total) {
        window.clearInterval(tick);
        dismiss(700);
      }
    }, 40);

    const failsafe = window.setTimeout(() => dismiss(200), total + 800);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(failsafe);
      if (!dismissed) window.clearTimeout(hideTimer);
      document.body.style.overflow = previous;
    };
  }, [reduced]);

  if (!visible) return null;

  const width = Math.min(100, (phase / 3) * 100 + within * 33);

  return (
    <div
      className={`boot-screen fixed inset-0 z-[300] overflow-hidden bg-[#020208] transition-opacity duration-700 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60%, rgba(0,255,204,0.04) 0%, rgba(100,0,200,0.06) 40%, transparent 70%)",
        }}
      />
      <LoaderGrid />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,2,8,0.8) 100%)",
        }}
      />

      <div className="loader-scan pointer-events-none absolute inset-x-0 top-1/2 h-24 bg-gradient-to-b from-transparent via-[#00ffcc]/10 to-transparent" />

      <Frame />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 sm:gap-8">
        <div className="loader-stage relative h-40 w-40 sm:h-56 sm:w-56">
          <div className="loader-ring loader-spin-y absolute inset-4 rounded-full border border-[#00ffcc]/70 shadow-[0_0_24px_rgba(0,255,204,0.35)]" />
          <div className="loader-ring loader-spin-x absolute inset-4 rounded-full border border-[#bf00ff]/70 shadow-[0_0_24px_rgba(191,0,255,0.35)]" />
          <div className="loader-ring loader-spin-z absolute inset-10 rounded-full border border-dashed border-[#00ffcc]/50" />
          <div className="loader-core absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-[1.4rem] border border-[#00ffcc]/40 bg-[#05050a]/85 sm:h-28 sm:w-28 sm:rounded-[1.6rem]">
            <span className="font-fancy text-2xl tracking-[0.14em] text-[#00ffcc] sm:text-3xl sm:tracking-[0.18em]">SP</span>
          </div>
        </div>

        <div className="loader-rise text-center">
          <p className="font-fancy text-xs tracking-[0.16em] text-white uppercase sm:text-sm sm:tracking-[0.28em] md:tracking-[0.42em]">{profile.fullName}</p>
          <p className="mt-2 font-space text-[10px] tracking-[0.18em] text-[#00ffcc] uppercase sm:text-[11px] sm:tracking-[0.32em]">{profile.shortTitle}</p>
        </div>
      </div>

      <div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 flex w-[min(280px,80vw)] -translate-x-1/2 flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between font-space text-[10px] tracking-[0.28em] text-[#00ffcc]/70 uppercase">
          <span>{loaderPhases[phase]}</span>
          <span>{Math.round(width)}%</span>
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full" style={{ background: "#ffffff14" }}>
          <div
            className="h-full shadow-[0_0_16px_#00ffcc] transition-[width] duration-300"
            style={{ width: `${width}%`, background: "linear-gradient(90deg, #00ffcc, #bf00ff)" }}
          />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  const corner = "absolute h-8 w-8 border-[#00ffcc]/50";
  return (
    <>
      <span className={`${corner} top-6 left-6 border-t-2 border-l-2`} />
      <span className={`${corner} top-6 right-6 border-t-2 border-r-2`} />
      <span className={`${corner} bottom-6 left-6 border-b-2 border-l-2`} />
      <span className={`${corner} right-6 bottom-6 border-r-2 border-b-2`} />
    </>
  );
}

function LoaderGrid() {
  const horizontal = Array.from({ length: 8 }, (_, index) => ((index + 1) / 9) * 100);
  const vertical = Array.from({ length: 12 }, (_, index) => ((index + 1) / 13) * 100);

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      {horizontal.map((y, index) => (
        <line
          key={`h-${y}`}
          x1="0"
          y1={y}
          x2="100"
          y2={y}
          stroke="#00ffcc"
          strokeWidth="0.08"
          className="loader-grid-line"
          style={{ animationDelay: `${index * 0.18}s` }}
        />
      ))}
      {vertical.map((x, index) => (
        <line
          key={`v-${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="100"
          stroke="#00ffcc"
          strokeWidth="0.08"
          className="loader-grid-line"
          style={{ animationDelay: `${index * 0.12}s` }}
        />
      ))}
    </svg>
  );
}
