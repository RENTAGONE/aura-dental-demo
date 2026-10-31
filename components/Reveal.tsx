"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useLang } from "./Providers";

export const SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({ children, className, delay = 0, y = 36 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease: SOFT }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Count-up that starts when the number scrolls into view.
 * Uses IntersectionObserver + requestAnimationFrame (no framer-motion hooks) so it cannot get stuck at 0.
 */
export function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const { lang } = useLang();
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || to === 0) return;
    let raf = 0;
    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 1800, 1);
        setV(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === "undefined") { setV(to); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);

  const text = v.toLocaleString(lang === "bn" ? "bn-BD" : "en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref}>{text}{suffix}</span>;
}

export function Marquee({ children, reverse = false, className }: { children: ReactNode; reverse?: boolean; className?: string }) {
  const track = cn("flex min-w-full shrink-0 animate-marquee items-center gap-6 pr-6 group-hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]");
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div className={track}>{children}</div>
      <div className={track} aria-hidden>{children}</div>
    </div>
  );
}

export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18 });
  const y = useSpring(my, { stiffness: 220, damping: 18 });
  const move = (e: RPointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0); }} className="inline-block">
      {children}
    </motion.div>
  );
}
