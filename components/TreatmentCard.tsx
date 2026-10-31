"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bi, taka } from "@/lib/i18n";
import type { Treatment } from "@/lib/data";
import { useLang } from "./Providers";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

export function TreatmentCard({ t, delay = 0 }: { t: Treatment; delay?: number }) {
  const { tr, lang } = useLang();
  return (
    <Reveal delay={delay}>
      <Link href={`/treatments/${t.slug}`} className="group block overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink-950/10 transition-shadow hover:shadow-2xl hover:shadow-ink-950/15">
        <div className="overflow-hidden"><div className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105"><Photo src={t.image} alt={tr(t.name)} art={t.art} className="h-full w-full" /></div></div>
        <div className="p-7">
          <h3 className="text-2xl font-medium text-ink-950">{tr(t.name)}</h3>
          <p className="mt-2 text-ink-950/65">{tr(t.short)}</p>
          <div className="mt-5 flex items-center justify-between">
            <p className="font-semibold text-brass-500">{tr(bi("শুরু", "From"))} {taka(t.from, lang)} <span className="font-normal text-ink-950/55">{tr(t.unit)}</span></p>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-950 text-white transition group-hover:bg-brass-400 group-hover:text-ink-950"><ArrowUpRight className="h-5 w-5" /></span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
