"use client";

import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { bi } from "@/lib/i18n";
import { SITE, wa } from "@/lib/site";
import { useLang } from "./Providers";
import { Reveal } from "./Reveal";

export function ContactInfo() {
  const { tr } = useLang();
  return (
    <div className="space-y-5">
      <Reveal>
        <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="group relative block aspect-[16/10] overflow-hidden rounded-[2rem] bg-ink-900 ring-1 ring-ink-950/10" aria-label={tr(bi("গুগল ম্যাপে খুলুন", "Open in Google Maps"))}>
          <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" aria-hidden>
            <rect width="400" height="250" fill="#0A2429" />
            <g stroke="#17454D" strokeWidth="10" strokeLinecap="round" fill="none">
              <path d="M-10 70H410M-10 170H410M90 -10V260M290 -10V260" />
              <path d="M-10 230L410 20" strokeWidth="14" stroke="#1d5a63" />
            </g>
            <g stroke="#0F3138" strokeWidth="3" fill="none"><path d="M-10 120H410M190 -10V260M40 -10V260M340 -10V260" /></g>
            <circle cx="200" cy="122" r="46" fill="#4FC3BC" fillOpacity=".12" className="origin-center animate-ping [animation-duration:3s] [transform-box:fill-box]" />
            <circle cx="200" cy="122" r="9" fill="#D4AE63" />
            <circle cx="200" cy="122" r="3.5" fill="#06171B" />
          </svg>
          <span className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm text-white transition group-hover:bg-white/15">{tr(bi("গুগল ম্যাপে খুলুন", "Open in Google Maps"))}</span>
        </a>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="rounded-[2rem] bg-ink-950 p-7 text-white">
          <ul className="space-y-5">
            <li className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-brass-300" /><span>{tr(SITE.address)}</span></li>
            <li className="flex gap-4"><Clock className="mt-1 h-5 w-5 shrink-0 text-brass-300" /><span>{SITE.hours.map((h) => <span key={h.en} className="block">{tr(h)}</span>)}</span></li>
            <li><a href={`tel:${SITE.phone}`} className="flex gap-4 hover:text-brass-200"><Phone className="mt-1 h-5 w-5 shrink-0 text-brass-300" />{SITE.phoneLabel}</a></li>
          </ul>
          <a href={wa("Hello, I would like to book an appointment.")} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 font-semibold hover:bg-emerald-500"><MessageCircle className="h-4 w-4" />{tr(bi("WhatsApp-এ সিরিয়াল নিন", "Book on WhatsApp"))}</a>
        </div>
      </Reveal>
    </div>
  );
}
