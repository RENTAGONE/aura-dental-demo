"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { bi, taka } from "@/lib/i18n";
import { TREATMENTS } from "@/lib/data";
import { useLang } from "./Providers";
import { Photo } from "./Photo";

/** Scroll-driven horizontal gallery: vertical scroll moves the track sideways. */
export function TreatmentsShowcase() {
  const { tr, lang } = useLang();
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setVh(window.innerHeight);
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => { window.removeEventListener("resize", measure); ro.disconnect(); };
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <section ref={wrap} style={{ height: dist + vh }} className="relative bg-ink-950 text-white" id="treatments">
      <div className="grain sticky top-0 flex h-[100svh] flex-col justify-center gap-8 overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 animate-aurora rounded-full bg-lagoon-500/15 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-5 pt-20 sm:px-8">
          <h2 className="max-w-xl text-[clamp(2rem,4.2vw,3.5rem)] font-medium">{tr(bi("আপনার হাসির জন্য সিগনেচার ট্রিটমেন্ট", "Signature treatments for your smile"))}</h2>
          <Link href="/treatments" className="btn-ghost hidden sm:inline-flex">{tr(bi("সব ট্রিটমেন্ট", "All treatments"))}<ArrowRight className="h-4 w-4" /></Link>
        </div>

        <motion.div ref={track} style={{ x }} className="relative flex w-max gap-5 px-5 will-change-transform sm:gap-6 sm:px-8">
          {TREATMENTS.map((t) => (
            <Link key={t.slug} href={`/treatments/${t.slug}`} className="group relative block w-[78vw] shrink-0 overflow-hidden rounded-[2rem] ring-1 ring-white/10 sm:w-[44vw] lg:w-[30vw]">
              <div className="h-[48svh] transition-transform duration-700 group-hover:scale-105 sm:h-[52svh]"><Photo src={t.image} alt={tr(t.name)} art={t.art} className="h-full w-full" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3 className="text-2xl font-medium">{tr(t.name)}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/70">{tr(t.short)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-brass-300">{tr(bi("শুরু", "From"))} {taka(t.from, lang)}</p>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-brass-400 group-hover:text-ink-950"><ArrowUpRight className="h-5 w-5" /></span>
                </div>
              </div>
            </Link>
          ))}
          <Link href="/treatments" className="glass flex w-[60vw] shrink-0 flex-col items-start justify-end rounded-[2rem] p-8 sm:w-[28vw] lg:w-[20vw]">
            <p className="font-display text-2xl">{tr(bi("সব ট্রিটমেন্ট দেখুন", "See every treatment"))}</p>
            <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-brass-400 text-ink-950"><ArrowRight className="h-5 w-5" /></span>
          </Link>
        </motion.div>

        <div className="relative mx-auto h-px w-full max-w-7xl bg-white/10 px-5 sm:px-8"><motion.div style={{ scaleX: bar }} className="h-px origin-left bg-brass-300" /></div>
      </div>
    </section>
  );
}
