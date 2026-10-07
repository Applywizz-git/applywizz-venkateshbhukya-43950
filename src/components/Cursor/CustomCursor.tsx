"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/hooks/usePrefersReducedMotion";

const TRAIL = 8;

export default function CustomCursor() {
  const reticle = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const dots = useRef<Array<HTMLDivElement | null>>([]);
  const fine = useFinePointer();
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const hoveringRef = useRef(false);

  useEffect(() => {
    if (!fine) return;
    document.body.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    const trail = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100, life: 0 }));
    let frame = 0;
    let raf = 0;

    const move = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };
    const over = (event: MouseEvent) => {
      const node = event.target as HTMLElement | null;
      if (!node) return;
      const hot = Boolean(node.closest("a, button, [data-cursor], [role='button']"));
      if (hoveringRef.current === hot) return;
      hoveringRef.current = hot;
      setHovering(hot);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const tick = () => {
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      const transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (reticle.current) reticle.current.style.transform = transform;
      if (glow.current) glow.current.style.transform = transform;

      if (Math.hypot(target.x - trail[0].x, target.y - trail[0].y) > 2) {
        for (let i = TRAIL - 1; i > 0; i -= 1) trail[i] = { ...trail[i - 1], life: trail[i - 1].life * 0.82 };
        trail[0] = { x: target.x, y: target.y, life: 1 };
      } else {
        trail.forEach((dot) => {
          dot.life *= 0.9;
        });
      }

      dots.current.forEach((dot, index) => {
        if (!dot) return;
        const point = trail[index];
        dot.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
        dot.style.opacity = String(point.life * (0.35 + (index / TRAIL) * 0.4));
      });

      if (ring.current && hoveringRef.current) {
        ring.current.style.transform = `rotate(${frame * 2}deg)`;
      }
      frame += 1;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("has-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [fine]);

  if (!fine) return null;

  const size = hovering ? 52 : 36;
  const colors = ["#10B981", "#00ffd5", "#ffffff"];

  return (
    <>
      {Array.from({ length: TRAIL }, (_, index) => (
        <div key={index} className="pointer-events-none fixed top-0 left-0 z-[108]">
          <div
            ref={(node) => {
              dots.current[index] = node;
            }}
            className="h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: colors[index % 3], opacity: 0 }}
          />
        </div>
      ))}

      <div ref={glow} className="pointer-events-none fixed top-0 left-0 z-[107]">
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full blur-[8px] transition-all duration-200"
          style={{
            width: hovering ? 90 : 60,
            height: hovering ? 90 : 60,
            opacity: hovering ? 0.25 : 0.12,
            background: "radial-gradient(circle, #10B981 0%, #00ffd5 40%, transparent 70%)",
          }}
        />
      </div>

      <div ref={reticle} className="pointer-events-none fixed top-0 left-0 z-[110]">
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200"
          style={{ width: size, height: size }}
        >
          <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="absolute overflow-visible">
            <path d={corner(size, 0)} fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity={clicking ? 0.4 : 1} />
            <path d={corner(size, 1)} fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity={clicking ? 0.4 : 1} />
            <path d={corner(size, 2)} fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity={clicking ? 0.4 : 1} />
            <path d={corner(size, 3)} fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity={clicking ? 0.4 : 1} />
            {hovering ? (
              <circle
                ref={ring}
                cx={size / 2}
                cy={size / 2}
                r={size * 0.44}
                fill="none"
                stroke="#10B981"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                strokeOpacity="0.5"
                style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
              />
            ) : null}
            <line x1={size * 0.5} y1="0" x2={size * 0.5} y2={size * 0.38} stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.6" />
            <line x1={size * 0.5} y1={size * 0.62} x2={size * 0.5} y2={size} stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.6" />
            <line x1="0" y1={size * 0.5} x2={size * 0.38} y2={size * 0.5} stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.6" />
            <line x1={size * 0.62} y1={size * 0.5} x2={size} y2={size * 0.5} stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.6" />
            <circle cx={size / 2} cy={size / 2} r={clicking ? 4 : hovering ? 3 : 2} fill={clicking ? "#fff" : "#10B981"} />
          </svg>
        </div>
      </div>
    </>
  );
}

function corner(size: number, index: number) {
  const a = size * 0.12;
  const b = size * 0.35;
  const c = size * 0.65;
  const d = size * 0.88;
  if (index === 0) return `M ${a} ${b} L ${a} ${a} L ${b} ${a}`;
  if (index === 1) return `M ${c} ${a} L ${d} ${a} L ${d} ${b}`;
  if (index === 2) return `M ${a} ${c} L ${a} ${d} L ${b} ${d}`;
  return `M ${c} ${d} L ${d} ${d} L ${d} ${c}`;
}
