"use client";

import { Quote, Star } from "lucide-react";
import { bi } from "@/lib/i18n";
import { REVIEWS } from "@/lib/data";
import { useLang } from "./Providers";
import { Marquee } from "./Reveal";
import { SectionHead } from "./ui";

function Card({ r }: { r: (typeof REVIEWS)[number] }) {
  const { tr } = useLang();
  return (
    <figure className="glass w-[20rem] shrink-0 rounded-3xl p-6 sm:w-[24rem]">
      <Quote className="h-6 w-6 text-brass-300" />
      <blockquote className="mt-4 text-white/90">{tr(r.text)}</blockquote>
      <figcaption className="mt-5 flex items-center justify-between text-sm">
        <span><span className="font-semibold text-white">{r.name}</span><span className="block text-white/55">{tr(r.tag)}</span></span>
        <span className="flex gap-0.5" aria-label="5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 fill-brass-300 text-brass-300" />)}</span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const first = REVIEWS.slice(0, 3);
  const second = REVIEWS.slice(3);
  return (
    <section className="grain relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 animate-aurora rounded-full bg-lagoon-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead dark title={bi("রোগীরা যা বলছেন", "What patients say")} sub={bi("৪.৯ গড় রেটিং — প্রতিটি রিভিউ যাচাইকৃত রোগীর।", "A 4.9 average, from verified patients.")} />
      </div>
      <div className="relative mt-14 space-y-6">
        <Marquee>{[...first, ...second].map((r) => <Card key={r.name} r={r} />)}</Marquee>
        <Marquee reverse>{[...second, ...first].map((r) => <Card key={r.name} r={r} />)}</Marquee>
      </div>
    </section>
  );
}
