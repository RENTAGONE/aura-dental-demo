"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { bi, taka } from "@/lib/i18n";
import { SITE, wa } from "@/lib/site";
import { useLang } from "./Providers";
import { Magnetic, Reveal } from "./Reveal";

export function CTABand() {
  const { tr } = useLang();
  return (
    <section className="bg-ink-950 px-5 py-24 sm:px-8">
      <Reveal>
        <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950 px-6 py-20 text-center text-white ring-1 ring-white/10 sm:px-16 sm:py-28">
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 animate-aurora rounded-full bg-lagoon-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 animate-aurora rounded-full bg-brass-400/25 blur-3xl [animation-delay:-7s]" />
          <h2 className="relative mx-auto max-w-3xl text-[clamp(2rem,4.6vw,4rem)] font-medium">{tr(bi(`আপনার প্রথম কনসালটেশন মাত্র ${taka(SITE.consultFee, "bn")}`, `Your first consultation is just ${taka(SITE.consultFee, "en")}`))}</h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/70">{tr(bi("থ্রিডি স্ক্যান, স্পেশালিস্টের পরামর্শ ও বিস্তারিত খরচের হিসাব — একই দিনে।", "3D scan, specialist advice and a full cost estimate, all on the same day."))}</p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic><Link href="/contact#book" className="btn-brass">{tr(bi("ভিআইপি বুকিং", "VIP Booking"))}<ArrowRight className="h-4 w-4" /></Link></Magnetic>
            <a href={wa("Hello, I would like to book a consultation.")} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
