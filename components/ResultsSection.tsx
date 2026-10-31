"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bi, type Bi } from "@/lib/i18n";
import type { Art } from "@/lib/data";
import { useLang } from "./Providers";
import { BeforeAfter } from "./BeforeAfter";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./ui";

const CASES: { n: number; art: Art; label: Bi }[] = [
  { n: 1, art: "tooth", label: bi("ডেন্টাল ইমপ্ল্যান্ট ও ক্রাউন", "Implant and crown") },
  { n: 2, art: "smile", label: bi("জিরকোনিয়া ভেনিয়ার স্মাইল মেকওভার", "Zirconia veneer smile makeover") },
  { n: 3, art: "smile", label: bi("ক্লিয়ার অ্যালাইনার, ১০ মাস", "Clear aligners, 10 months") },
];

export function ResultsSection({ count = 2, full = false }: { count?: number; full?: boolean }) {
  const { tr } = useLang();
  return (
    <Section tone="dark">
      <div className="grain absolute inset-0" />
      {!full && <SectionHead dark title={bi("ফলাফল নিজের চোখে দেখুন", "See the results for yourself")} sub={bi("স্লাইডার টেনে আগে ও পরের পার্থক্য দেখুন।", "Drag the slider to compare before and after.")} />}
      <div className={`relative grid gap-6 ${full ? "" : "mt-14"} md:grid-cols-2 ${count === 3 ? "lg:grid-cols-3" : ""}`}>
        {CASES.slice(0, count).map((c, i) => (
          <Reveal key={c.n} delay={i * 0.1}>
            <BeforeAfter before={`/images/results/before-${c.n}.jpg`} after={`/images/results/after-${c.n}.jpg`} art={c.art} label={c.label} />
          </Reveal>
        ))}
      </div>
      <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-white/55">
        <p>{tr(bi("ফলাফল ব্যক্তিভেদে ভিন্ন হতে পারে।", "Individual results vary."))}</p>
        {!full && <Link href="/results" className="btn-ghost">{tr(bi("সব ফলাফল", "All results"))}<ArrowRight className="h-4 w-4" /></Link>}
      </div>
    </Section>
  );
}
