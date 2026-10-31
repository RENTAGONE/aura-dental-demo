"use client";

import { BadgeCheck, ReceiptText, ShieldCheck } from "lucide-react";
import { bi } from "@/lib/i18n";
import { useLang } from "./Providers";
import { Reveal } from "./Reveal";

const NOTES = [
  { icon: ReceiptText, t: bi("লুকানো খরচ নেই", "No hidden costs"), d: bi("কনসালটেশনের পর লিখিত খরচের হিসাব পাবেন, তার বাইরে কিছু যোগ হয় না।", "You get a written estimate after consultation, and nothing is added beyond it.") },
  { icon: BadgeCheck, t: bi("০% ইএমআই", "0% EMI"), d: bi("৩, ৬ বা ১২ মাসে সমান কিস্তি, কোনো সুদ বা প্রসেসিং ফি ছাড়া।", "Equal instalments over 3, 6 or 12 months with no interest or processing fee.") },
  { icon: ShieldCheck, t: bi("ওয়ারেন্টি কার্ড", "Warranty card"), d: bi("ইমপ্ল্যান্ট ও ক্রাউনের মতো প্রযোজ্য ট্রিটমেন্টে লিখিত ওয়ারেন্টি।", "Written warranty on applicable treatments such as implants and crowns.") },
];

export function PriceNotes() {
  const { tr } = useLang();
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {NOTES.map(({ icon: Icon, t, d }, i) => (
        <Reveal key={t.en} delay={i * 0.1}>
          <div className="h-full rounded-[2rem] bg-white p-8 ring-1 ring-ink-950/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-brass-300"><Icon className="h-6 w-6" /></span>
            <h3 className="mt-6 text-xl font-medium">{tr(t)}</h3>
            <p className="mt-2 text-ink-950/65">{tr(d)}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
