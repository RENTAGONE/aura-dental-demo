"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Clock, Wallet } from "lucide-react";
import { bi, taka } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { TREATMENTS } from "@/lib/data";
import { useLang } from "./Providers";
import { Photo } from "./Photo";
import { SOFT } from "./Reveal";
import { Section, SectionHead } from "./ui";

/** Pick a treatment on the left, see everything about it on the right. No scroll-jacking. */
export function TreatmentExplorer() {
  const { tr, lang } = useLang();
  const [i, setI] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const n = TREATMENTS.length;
  const t = TREATMENTS[i];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (next === null) return;
    e.preventDefault();
    setI(next);
    tabs.current[next]?.focus();
  };

  return (
    <Section tone="dark" id="treatments">
      <div className="grain absolute inset-0" />
      <SectionHead dark title={bi("আমাদের ট্রিটমেন্টসমূহ", "Our treatments")} sub={bi("একটি বেছে নিন — কী হয়, কতক্ষণ লাগে ও কত খরচ, সব এক জায়গায়।", "Pick one to see what it involves, how long it takes and what it costs.")} />

      <div className="relative mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div role="tablist" aria-label={tr(bi("ট্রিটমেন্ট", "Treatments"))} onKeyDown={onKey}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
          {TREATMENTS.map((x, idx) => {
            const active = idx === i;
            return (
              <button key={x.slug} ref={(el) => { tabs.current[idx] = el; }} role="tab" id={`tab-${x.slug}`} aria-selected={active} aria-controls="treatment-panel" tabIndex={active ? 0 : -1}
                onClick={() => setI(idx)}
                className={cn("relative shrink-0 rounded-2xl px-5 py-3 text-left transition-colors lg:w-full lg:py-4", active ? "text-white" : "text-white/60 hover:text-white")}>
                {active && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-2xl bg-white/10 ring-1 ring-white/15" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                <span className="relative flex items-center justify-between gap-4">
                  <span>
                    <span className="block whitespace-nowrap font-display text-lg lg:whitespace-normal lg:text-2xl">{tr(x.name)}</span>
                    <span className="hidden text-sm text-brass-300 lg:block">{tr(bi("শুরু", "From"))} {taka(x.from, lang)} {tr(x.unit)}</span>
                  </span>
                  <ChevronRight className={cn("hidden h-5 w-5 transition-transform lg:block", active && "translate-x-1 text-brass-300")} />
                </span>
              </button>
            );
          })}
        </div>

        <div id="treatment-panel" role="tabpanel" aria-labelledby={`tab-${t.slug}`} className="lg:min-h-[30rem]">
          <AnimatePresence mode="wait">
            <motion.div key={t.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: SOFT }} className="grid items-center gap-8 md:grid-cols-2">
              <Photo src={t.image} alt={tr(t.name)} art={t.art} className="aspect-[4/5] w-full rounded-[2rem] ring-1 ring-white/15 md:aspect-[3/4]" />
              <div>
                <h3 className="text-3xl font-medium sm:text-4xl">{tr(t.name)}</h3>
                <p className="mt-3 text-white/70">{tr(t.short)}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-sm">
                  <span className="glass flex items-center gap-2 rounded-full px-3 py-1.5"><Clock className="h-4 w-4 text-lagoon-300" />{tr(t.duration)}</span>
                  <span className="glass flex items-center gap-2 rounded-full px-3 py-1.5"><Wallet className="h-4 w-4 text-brass-300" />{taka(t.from, lang)} – {taka(t.to, lang)}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {t.benefits.map((b) => (
                    <li key={b.en} className="flex gap-3 text-white/85"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />{tr(b)}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/treatments/${t.slug}`} className="btn-brass">{tr(bi("বিস্তারিত দেখুন", "See details"))}<ArrowRight className="h-4 w-4" /></Link>
                  <Link href="/pricing#calculator" className="btn-ghost">{tr(bi("খরচ হিসাব করুন", "Estimate cost"))}</Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
