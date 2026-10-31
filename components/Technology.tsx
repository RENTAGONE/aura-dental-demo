"use client";

import { Microscope, ScanLine, ShieldCheck, Smile } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { bi, type Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useLang } from "./Providers";
import { Reveal, SOFT } from "./Reveal";
import { Section, SectionHead } from "./ui";

function Tile({ title, text, icon: Icon, className, children, delay = 0 }: { title: Bi; text: Bi; icon: typeof Smile; className?: string; children?: ReactNode; delay?: number }) {
  const { tr } = useLang();
  return (
    <Reveal delay={delay} className={cn("group relative flex flex-col overflow-hidden rounded-[2rem] bg-ink-950 p-7 text-white ring-1 ring-ink-950/10 sm:p-9", className)}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lagoon-500/20 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5"><Icon className="h-6 w-6 text-brass-300" /></span>
      <h3 className="relative mt-6 text-2xl font-medium">{tr(title)}</h3>
      <p className="relative mt-2 max-w-md text-white/70">{tr(text)}</p>
      <div className="relative mt-6 flex-1">{children}</div>
    </Reveal>
  );
}

export function Technology() {
  return (
    <Section tone="light">
      <SectionHead title={bi("ডাক্তারের হাতে সবচেয়ে নিখুঁত প্রযুক্তি", "The most precise technology in expert hands")} sub={bi("প্রতিটি সিদ্ধান্ত হয় ডেটা দেখে, অনুমানে নয়।", "Every decision is made from data, never guesswork.")} />
      <div className="mt-14 grid gap-5 md:grid-cols-6">
        <Tile className="md:col-span-4 md:row-span-2" icon={ScanLine} title={bi("থ্রিডি CBCT ইমেজিং", "3D CBCT imaging")} text={bi("হাড়ের ঘনত্ব, স্নায়ু ও সাইনাস আগেই মাপা হয়, তাই সার্জারি হয় নিখুঁত।", "Bone density, nerves and sinus are mapped in advance, so surgery is precise.")}>
          <div className="relative h-64 overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/10 md:h-full md:min-h-[16rem]">
            <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full" aria-hidden>
              <path d="M20 100C20 28 60 8 100 8s80 20 80 92" fill="none" stroke="#4FC3BC" strokeOpacity=".5" strokeWidth="1.2" />
              <path d="M36 100C36 44 66 26 100 26s64 18 64 74" fill="none" stroke="#D4AE63" strokeOpacity=".35" strokeWidth="1" />
              {Array.from({ length: 11 }, (_, i) => {
                const a = (i / 10) * Math.PI;
                return <circle key={i} cx={100 - 80 * Math.cos(a)} cy={100 - 88 * Math.sin(a)} r={4.4} fill="#E4C98A" fillOpacity=".85" />;
              })}
            </svg>
            <div className="absolute inset-x-0 top-0 h-10 animate-scan bg-gradient-to-b from-transparent via-lagoon-400/35 to-transparent" />
          </div>
        </Tile>

        <Tile className="md:col-span-2" delay={0.08} icon={Microscope} title={bi("সার্জিক্যাল মাইক্রোস্কোপ", "Surgical microscope")} text={bi("২০ গুণ বর্ধিত দৃষ্টিতে রুট ক্যানাল।", "Root canals under 20× magnification.")}>
          <svg viewBox="0 0 100 100" className="mx-auto h-28 w-28" aria-hidden>
            <circle cx="50" cy="50" r="42" fill="none" stroke="#4FC3BC" strokeOpacity=".5" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#E4C98A" strokeOpacity=".5" />
            <g className="origin-center animate-spin-slow [transform-box:fill-box]"><path d="M50 4v16M50 80v16M4 50h16M80 50h16" stroke="#E4C98A" strokeWidth="1.4" /></g>
            <circle cx="50" cy="50" r="3" fill="#8ADAD2" />
          </svg>
        </Tile>

        <Tile className="md:col-span-2" delay={0.16} icon={Smile} title={bi("ডিজিটাল স্মাইল ডিজাইন", "Digital smile design")} text={bi("ট্রিটমেন্টের আগেই আপনার নতুন হাসি দেখুন।", "See your new smile before treatment begins.")}>
          <svg viewBox="0 0 120 60" className="mx-auto h-24 w-full" fill="none" aria-hidden>
            <motion.path d="M6 20c14 34 94 34 108 0" stroke="#E4C98A" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: SOFT }} />
            <motion.path d="M20 30v14M40 36v16M60 38v17M80 36v16M100 30v14" stroke="#4FC3BC" strokeOpacity=".7" strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3, ease: SOFT }} />
          </svg>
        </Tile>

        <Tile className="md:col-span-6" delay={0.1} icon={ShieldCheck} title={bi("হাসপাতাল-মানের জীবাণুমুক্তকরণ", "Hospital-grade sterilisation")} text={bi("ক্লাস-বি অটোক্লেভ, প্রতি রোগীর জন্য আলাদা স্টেরিলাইজড কিট।", "Class-B autoclave and a separately sterilised kit for every patient.")} />
      </div>
    </Section>
  );
}
