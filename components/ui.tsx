"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Bi } from "@/lib/i18n";
import { useLang } from "./Providers";
import { Reveal } from "./Reveal";

export function SectionHead({ title, sub, dark = false, className }: { title: Bi; sub?: Bi; dark?: boolean; className?: string }) {
  const { tr } = useLang();
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <h2 className={cn("text-[clamp(2rem,4.2vw,3.5rem)] font-medium", dark ? "text-white" : "text-ink-950")}>{tr(title)}</h2>
      {sub && <p className={cn("mt-4 text-lg", dark ? "text-white/70" : "text-ink-950/65")}>{tr(sub)}</p>}
    </Reveal>
  );
}

export function Section({ children, tone = "dark", className, id }: { children: ReactNode; tone?: "dark" | "mid" | "light"; className?: string; id?: string }) {
  const bg = tone === "dark" ? "bg-ink-950 text-white" : tone === "mid" ? "bg-ink-900 text-white" : "bg-porcelain text-ink-950";
  return (
    <section id={id} className={cn("relative overflow-hidden py-24 sm:py-32", bg, className)}>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function PageHero({ title, sub, crumb }: { title: Bi; sub: Bi; crumb: Bi }) {
  const { tr } = useLang();
  return (
    <section className="grain relative overflow-hidden bg-ink-950 pb-20 pt-36 text-white sm:pb-28 sm:pt-44">
      <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 animate-aurora rounded-full bg-lagoon-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 animate-aurora rounded-full bg-brass-400/15 blur-3xl [animation-delay:-6s]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><p className="text-sm text-brass-300"><Link href="/" className="hover:underline">Aura</Link> / {tr(crumb)}</p></Reveal>
        <Reveal delay={0.08}><h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.6vw,4.8rem)] font-medium">{tr(title)}</h1></Reveal>
        <Reveal delay={0.16}><p className="mt-6 max-w-2xl text-lg text-white/70">{tr(sub)}</p></Reveal>
      </div>
    </section>
  );
}
