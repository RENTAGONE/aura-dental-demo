"use client";

import { BadgeCheck, Gem, Microscope, ScanLine, ShieldCheck, Star } from "lucide-react";
import { bi } from "@/lib/i18n";
import { STATS } from "@/lib/data";
import { useLang } from "./Providers";
import { Counter, Marquee, Reveal } from "./Reveal";

const TRUST = [
  { icon: Star, label: bi("Google-এ ৪.৯ রেটিং", "4.9 on Google") },
  { icon: BadgeCheck, label: bi("০% ইএমআই", "0% EMI") },
  { icon: Gem, label: bi("সুইস ও জার্মান ম্যাটেরিয়াল", "Swiss and German materials") },
  { icon: Microscope, label: bi("মাইক্রোস্কোপ-গাইডেড চিকিৎসা", "Microscope-guided care") },
  { icon: ScanLine, label: bi("থ্রিডি ডিজিটাল পরিকল্পনা", "3D digital planning") },
  { icon: ShieldCheck, label: bi("ক্লাস-বি জীবাণুমুক্তকরণ", "Class-B sterilisation") },
];

export function TrustMarquee() {
  const { tr } = useLang();
  return (
    <div className="border-y border-white/10 bg-ink-900 py-5">
      <Marquee>
        {TRUST.map(({ icon: Icon, label }) => (
          <span key={label.en} className="flex shrink-0 items-center gap-3 px-6 text-white/80">
            <Icon className="h-5 w-5 text-brass-300" />{tr(label)}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function Stats() {
  const { tr } = useLang();
  return (
    <section className="bg-porcelain py-20 text-ink-950 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-5 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-ink-950/10">
        {STATS.map((s, i) => (
          <Reveal key={s.label.en} delay={i * 0.08} className="lg:px-10 lg:first:pl-0">
            <p className="font-display text-[clamp(2.6rem,5vw,4.4rem)] font-medium leading-none"><Counter to={s.to} decimals={s.decimals} suffix={s.suffix} /></p>
            <p className="mt-3 text-ink-950/65">{tr(s.label)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
