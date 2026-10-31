"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { bi } from "@/lib/i18n";
import { JOURNEY } from "@/lib/data";
import { useLang } from "./Providers";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./ui";

export function Journey({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { tr } = useLang();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dark = tone === "dark";
  return (
    <Section tone={tone}>
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead dark={dark} title={bi("আপনার ট্রিটমেন্ট যাত্রা", "Your treatment journey")} sub={bi("প্রথম কনসালটেশন থেকে আফটারকেয়ার পর্যন্ত — প্রতিটি ধাপ স্বচ্ছ।", "From first consultation to aftercare, every step is transparent.")} />
        </div>
        <ol ref={ref} className="relative space-y-14 pl-16">
          <div className={`absolute bottom-2 left-[1.45rem] top-2 w-px ${dark ? "bg-white/10" : "bg-ink-950/10"}`} />
          <motion.div style={{ scaleY: grow }} className="absolute bottom-2 left-[1.45rem] top-2 w-px origin-top bg-gradient-to-b from-lagoon-400 to-brass-400" />
          {JOURNEY.map((s, i) => (
            <li key={s.t.en} className="relative">
              <Reveal>
                <span className={`absolute -left-16 top-0 flex h-12 w-12 items-center justify-center rounded-full font-display text-lg ring-1 ${dark ? "bg-ink-900 text-brass-300 ring-white/15" : "bg-white text-ink-950 ring-ink-950/10"}`}>{(i + 1).toLocaleString(tr(bi("bn-BD", "en-US")))}</span>
                <h3 className="text-2xl font-medium sm:text-3xl">{tr(s.t)}</h3>
                <p className={`mt-3 max-w-xl text-lg ${dark ? "text-white/70" : "text-ink-950/65"}`}>{tr(s.d)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
