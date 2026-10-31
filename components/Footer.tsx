"use client";

import Link from "next/link";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { bi, type Bi } from "@/lib/i18n";
import { TREATMENTS } from "@/lib/data";
import { SITE, wa } from "@/lib/site";
import { useLang } from "./Providers";
import { Reveal } from "./Reveal";

const PAGES: { href: string; label: Bi }[] = [
  { href: "/doctors", label: bi("ডাক্তারগণ", "Doctors") },
  { href: "/results", label: bi("ফলাফল", "Results") },
  { href: "/pricing", label: bi("খরচ ও ইএমআই", "Pricing & EMI") },
  { href: "/contact", label: bi("যোগাযোগ", "Contact") },
];

export function Footer() {
  const { tr } = useLang();
  return (
    <footer className="grain relative overflow-hidden bg-ink-950 pb-28 pt-24 text-white md:pb-12">
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 select-none text-center font-display text-[28vw] leading-none text-white/[0.04]" aria-hidden>Aura</div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="font-display text-3xl">Aura</p>
            <p className="mt-3 text-white/65">{tr(bi("মাইক্রোস্কোপ-গাইডেড ডেন্টিস্ট্রি ও অ্যাস্থেটিকস। গুলশানের প্রাণকেন্দ্রে।", "Microscope-guided dentistry and aesthetics in the heart of Gulshan."))}</p>
            <a href={wa("Hello, I would like to book an appointment.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-600 px-6 font-semibold text-white hover:bg-emerald-500">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <div>
            <p className="font-semibold text-brass-300">{tr(bi("ট্রিটমেন্ট", "Treatments"))}</p>
            <ul className="mt-4 space-y-1">
              {TREATMENTS.map((t) => <li key={t.slug}><Link className="inline-block py-1 text-white/70 hover:text-white" href={`/treatments/${t.slug}`}>{tr(t.name)}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-brass-300">{tr(bi("ক্লিনিক", "Clinic"))}</p>
            <ul className="mt-4 space-y-1">
              {PAGES.map((p) => (
                <li key={p.href}><Link className="inline-block py-1 text-white/70 hover:text-white" href={p.href}>{tr(p.label)}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 text-white/70">
            <p className="font-semibold text-brass-300">{tr(bi("আমাদের ঠিকানা", "Visit us"))}</p>
            <p className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-lagoon-300" />{tr(SITE.address)}</p>
            <div className="flex gap-3"><Clock className="mt-1 h-4 w-4 shrink-0 text-lagoon-300" /><div>{SITE.hours.map((h) => <p key={h.en}>{tr(h)}</p>)}</div></div>
            <a href={`tel:${SITE.phone}`} className="flex gap-3 hover:text-white"><Phone className="mt-1 h-4 w-4 shrink-0 text-lagoon-300" />{SITE.phoneLabel}</a>
          </div>
        </Reveal>
        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>{tr(bi("এটি একটি ডেমো কনসেপ্ট সাইট।", "This is a demo concept site."))}</p>
        </div>
      </div>
    </footer>
  );
}
