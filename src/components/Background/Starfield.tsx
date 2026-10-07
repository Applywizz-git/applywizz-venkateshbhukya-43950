"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Scene = "Hero" | "Identity" | "Arsenal" | "Lab" | "Transmission";

const INK = "#050816";
const DEEP = "#0d1117";

export default function Starfield() {
  const [scene, setScene] = useState<Scene>("Hero");
  const [scroll, setScroll] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-bg]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = visible.target.getAttribute("data-bg");
        if (next === "Hero" || next === "Identity" || next === "Arsenal" || next === "Lab" || next === "Transmission") {
          setScene(next);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[#050816] transition-opacity duration-1000">
      {scene === "Hero" ? <HeroGrid reduced={reduced} /> : null}
      {scene === "Identity" ? <IdentityRain reduced={reduced} scroll={scroll} /> : null}
      {scene === "Arsenal" ? <ArsenalField reduced={reduced} scroll={scroll} /> : null}
      {scene === "Lab" ? <LabField reduced={reduced} /> : null}
      {scene === "Transmission" ? <TransmissionField reduced={reduced} /> : null}
    </div>
  );
}

function useCanvas(draw: (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => void, active: boolean) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      draw(ctx, width, height, now / 1000);
      if (active) raf = requestAnimationFrame(frame);
    };

    resize();
    frame(performance.now());
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active, draw]);

  return ref;
}

function usePointer() {
  const pointer = useRef({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const move = (event: MouseEvent) => {
      pointer.current.x = event.clientX / window.innerWidth;
      pointer.current.y = event.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return pointer;
}

function useDensity() {
  const [density, setDensity] = useState(1);
  useEffect(() => {
    const update = () => {
      const cores = navigator.hardwareConcurrency || 4;
      const narrow = window.innerWidth < 768;
      setDensity(cores <= 2 ? 0.35 : narrow || cores <= 4 ? 0.6 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return density;
}

function HeroGrid({ reduced }: { reduced: boolean }) {
  const pointer = usePointer();
  const density = useDensity();
  const cols = Math.max(5, Math.floor(18 * density));
  const rows = Math.max(4, Math.floor(11 * density));
  const nodes = useMemo(
    () =>
      Array.from({ length: cols * rows }, (_, index) => ({
        col: index % cols,
        row: Math.floor(index / cols),
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
      })),
    [cols, rows],
  );

  const draw = useMemo(() => {
    return (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);
      const stepX = width / (cols - 1);
      const stepY = height / (rows - 1);
      const mx = pointer.current.x * width;
      const my = pointer.current.y * height;
      const t = reduced ? 0 : time;

      nodes.forEach((node, index) => {
        const x = node.col * stepX;
        const y = node.row * stepY;
        const neighbors = [
          node.col < cols - 1 ? nodes[index + 1] : null,
          node.row < rows - 1 ? nodes[index + cols] : null,
        ];
        neighbors.forEach((next) => {
          if (!next) return;
          const nx = next.col * stepX;
          const ny = next.row * stepY;
          const wave = (Math.sin(t * node.speed + node.phase) + 1) / 2;
          const dist = Math.hypot(mx - (x + nx) / 2, my - (y + ny) / 2);
          const near = Math.max(0, 1 - dist / (width * 0.25));
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = `rgba(16,185,129,${0.04 + wave * 0.04 + near * 0.2})`;
          ctx.lineWidth = 0.5 + near;
          ctx.stroke();
        });
      });

      nodes.forEach((node) => {
        const x = node.col * stepX;
        const y = node.row * stepY;
        const wave = (Math.sin(t * node.speed + node.phase) + 1) / 2;
        const dist = Math.hypot(mx - x, my - y);
        const near = Math.max(0, 1 - dist / (width * 0.18));
        const radius = 0.8 + wave * 0.8 + near * 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,211,153,${0.15 + wave * 0.2 + near * 0.7})`;
        ctx.fill();
        if (near > 0.3) {
          ctx.beginPath();
          ctx.arc(x, y, radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34,211,238,${0.3 * near})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    };
  }, [cols, nodes, pointer, reduced, rows]);

  const ref = useCanvas(draw, !reduced);
  return (
    <div className="absolute inset-0" style={{ background: INK }}>
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}

function IdentityRain({ reduced, scroll }: { reduced: boolean; scroll: number }) {
  const density = useDensity();
  const count = Math.floor(40 * density);
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        x: count <= 1 ? 50 : (index / (count - 1)) * 100,
        y: Math.random() * 100,
        speed: 0.5 + Math.random() * 1.5,
        len: 4 + Math.random() * 12,
        opacity: 0.1 + Math.random() * 0.4,
      })),
    [count],
  );
  const scrollRef = useRef(scroll);
  scrollRef.current = scroll;

  const draw = useMemo(() => {
    return (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = reduced ? 1.2 : time;
      drops.forEach((drop) => {
        const yPercent = (drop.y + scrollRef.current * 20 + t * drop.speed * 6) % 110 - 10;
        const x = (drop.x / 100) * width;
        const y = (yPercent / 100) * height;
        const len = (drop.len / 100) * height;
        const pulse = 0.6 + 0.4 * Math.sin(t * 2 + drop.x);
        const gradient = ctx.createLinearGradient(x, y - len, x, y);
        gradient.addColorStop(0, "rgba(16,185,129,0)");
        gradient.addColorStop(0.6, `rgba(52,211,153,${drop.opacity * pulse})`);
        gradient.addColorStop(1, `rgba(34,211,238,${drop.opacity * pulse * 1.5})`);
        ctx.beginPath();
        ctx.moveTo(x, y - len);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${drop.opacity * pulse * 2})`;
        ctx.fill();
      });
    };
  }, [drops, reduced]);

  const ref = useCanvas(draw, !reduced);
  return (
    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${INK} 0%, ${DEEP} 100%)` }}>
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}

function ArsenalField({ reduced, scroll }: { reduced: boolean; scroll: number }) {
  const density = useDensity();
  const traces = useMemo(() => {
    const total = Math.floor(30 * density);
    return Array.from({ length: total }, () => {
      const points: { x: number; y: number }[] = [];
      let x = Math.random();
      let y = Math.random();
      const steps = 3 + Math.floor(Math.random() * 5);
      for (let i = 0; i < steps; i += 1) {
        points.push({ x, y });
        if (Math.random() > 0.5) x = Math.min(1, Math.max(0, x + (Math.random() - 0.5) * 0.3));
        else y = Math.min(1, Math.max(0, y + (Math.random() - 0.5) * 0.3));
      }
      return { points, phase: Math.random(), delay: Math.random() };
    });
  }, [density]);
  const scrollRef = useRef(scroll);
  scrollRef.current = scroll;

  const draw = useMemo(() => {
    return (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = reduced ? 0.4 : time;
      traces.forEach((trace) => {
        const reveal = Math.max(
          0,
          Math.min(1, (scrollRef.current - trace.delay * 0.5) * 3 + Math.sin(t + trace.phase) * 0.1),
        );
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + trace.phase * 5);
        for (let i = 0; i < trace.points.length - 1; i += 1) {
          const a = trace.points[i];
          const b = trace.points[i + 1];
          ctx.beginPath();
          ctx.moveTo(a.x * width, a.y * height);
          ctx.lineTo(b.x * width, b.y * height);
          ctx.strokeStyle = `rgba(16,185,129,${0.04 + reveal * pulse * 0.3})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        trace.points.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x * width, point.y * height, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52,211,153,${0.08 + reveal * pulse * 0.5})`;
          ctx.fill();
        });
      });
    };
  }, [reduced, traces]);

  const ref = useCanvas(draw, !reduced);
  return (
    <div className="absolute inset-0" style={{ background: DEEP }}>
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}

function LabField({ reduced }: { reduced: boolean }) {
  const density = useDensity();
  const count = Math.floor(60 * density);
  const lines = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        y: (index / Math.max(1, count - 1)) * 100,
        opacity: 0.02 + Math.random() * 0.04,
      })),
    [count],
  );
  const blocks = useMemo(
    () =>
      Array.from({ length: Math.floor(20 * density) }, (_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        w: 2 + Math.random() * 8,
        h: 0.5 + Math.random() * 1.5,
        delay: Math.random() * 4,
      })),
    [density],
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #04060f 0%, #080d18 60%, #050816 100%)" }}
    >
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute right-0 left-0 h-px"
          style={{ top: `${line.y}%`, background: `rgba(16,185,129,${line.opacity})` }}
        />
      ))}
      {reduced ? null : (
        <div
          className="absolute right-0 left-0 h-0.5"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.15), transparent)",
            animation: "lab-sweep 14s linear infinite",
          }}
        />
      )}
      {blocks.map((block) => (
        <div
          key={block.id}
          className="absolute rounded-[1px]"
          style={{
            left: `${block.x}%`,
            top: `${block.y}%`,
            width: `${block.w}%`,
            height: `${block.h}%`,
            background: "rgba(52,211,153,0.1)",
            animation: reduced ? undefined : `lab-flicker 3.2s ease-in-out ${block.delay}s infinite`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_30%,rgba(5,8,22,0.7)_100%)]" />
    </div>
  );
}

function TransmissionField({ reduced }: { reduced: boolean }) {
  const density = useDensity();
  const pulses = useMemo(
    () => Array.from({ length: Math.max(2, Math.floor(4 * density)) }, (_, index) => ({ id: index, delay: index * 1.05 })),
    [density],
  );
  const rings = [16, 28, 40, 52, 64, 76];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: INK }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(52,211,153,0.16) 1.2px, transparent 1.2px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2">
        {rings.map((size) => (
          <div
            key={size}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#34d399]/70"
            style={{
              width: `${size}vmin`,
              height: `${size}vmin`,
              boxShadow: "0 0 22px rgba(52,211,153,0.22), inset 0 0 18px rgba(0,249,255,0.08)",
            }}
          />
        ))}
        <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#34d399] to-transparent" />
        <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00f9ff]/80 to-transparent" />
        {reduced ? null : (
          <div
            className="absolute inset-[6%] rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(16,185,129,0.12) 310deg, rgba(52,211,153,0.72) 360deg)",
              animation: "radar-sweep 7s linear infinite",
              WebkitMaskImage: "radial-gradient(circle, transparent 0 10%, #000 16%, #000 82%, transparent 90%)",
              maskImage: "radial-gradient(circle, transparent 0 10%, #000 16%, #000 82%, transparent 90%)",
            }}
          />
        )}
        {reduced
          ? null
          : pulses.map((ring) => (
              <div
                key={ring.id}
                className="absolute top-1/2 left-1/2 h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#34d399]"
                style={{ animation: `radar-ping 5.4s linear ${ring.delay}s infinite` }}
              />
            ))}
        <div className="radar-core absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34d399]" />
      </div>
    </div>
  );
}
