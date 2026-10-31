"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, Wallet } from "lucide-react";
import { bi, taka } from "@/lib/i18n";
import { TREATMENTS, type Treatment } from "@/lib/data";
import { wa } from "@/lib/site";
import { useLang } from "./Providers";
import { Photo } from "./Photo";
import { Magnetic, Reveal, SOFT } from "./Reveal";
import { Section, SectionHead } from "./ui";
import { Journey } from "./Journey";
import { TreatmentCard } from "./TreatmentCard";
import { FAQ } from "./FAQ";
import { CTABand } from "./CTABand";

export function TreatmentDetail({ t }: { t: Treatment }) {
  const { tr, lang } = useLang();
  const others = TREATMENTS.filter((x) => x.slug !== t.slug).slice(0, 3);
  return (
    <>
      <section className="grain relative overflow-hidden bg-ink-950 pb-24 pt-36 text-white sm:pt-44">
        <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 animate-aurora rounded-full bg-lagoon-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 animate-aurora rounded-full bg-brass-400/15 blur-3xl [animation-delay:-6s]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Link href="/treatments" className="inline-flex min-h-11 items-center gap-2 text-sm text-brass-300 hover:underline"><ArrowLeft className="h-4 w-4" />{tr(bi("সব ট্রিটমেন্ট", "All treatments"))}</Link>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: SOFT }} className="mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium">{tr(t.name)}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: SOFT }} className="mt-6 max-w-xl text-lg text-white/70">{tr(t.short)}</motion.p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="glass flex items-center gap-2 rounded-full px-4 py-2"><Clock className="h-4 w-4 text-lagoon-300" />{tr(t.duration)}</span>
              <span className="glass flex items-center gap-2 rounded-full px-4 py-2"><Wallet className="h-4 w-4 text-brass-300" />{tr(bi("শুরু", "From"))} {taka(t.from, lang)} {tr(t.unit)}</span>
              <span className="glass flex items-center gap-2 rounded-full px-4 py-2"><Check className="h-4 w-4 text-emerald-300" />0% EMI</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Magnetic><a href={wa(`Hello Doctor, I am interested in ${t.name.en}.`)} target="_blank" rel="noopener noreferrer" className="btn-brass">{tr(bi("এই ট্রিটমেন্ট নিয়ে কথা বলুন", "Discuss this treatment"))}</a></Magnetic>
              <Link href="/pricing#calculator" className="btn-ghost">{tr(bi("খরচ হিসাব করুন", "Estimate your cost"))}</Link>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: SOFT }} className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2.5rem] border border-brass-300/40" />
            <Photo src={t.image} alt={tr(t.name)} art={t.art} priority className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-[2.5rem] ring-1 ring-white/15" />
          </motion.div>
        </div>
      </section>

      <Section tone="light">
        <SectionHead title={bi("এই ট্রিটমেন্টে যা পাবেন", "What you get with this treatment")} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.benefits.map((b, i) => (
            <Reveal key={b.en} delay={i * 0.1}>
              <div className="h-full rounded-[2rem] bg-white p-8 ring-1 ring-ink-950/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-brass-300"><Check className="h-6 w-6" /></span>
                <p className="mt-6 text-xl font-medium">{tr(b)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Journey tone="dark" />

      <Section tone="light">
        <SectionHead title={bi("অন্যান্য ট্রিটমেন্ট", "Other treatments")} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">{others.map((o, i) => <TreatmentCard key={o.slug} t={o} delay={i * 0.08} />)}</div>
      </Section>

      <FAQ />
      <CTABand />
    </>
  );
}
