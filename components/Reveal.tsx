"use client";

import { animate, motion, useInView, useMotionValue, useSpring } from "framer-motion";
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

export function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const { lang } = useLang();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: SOFT, onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
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
