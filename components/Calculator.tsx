"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator as CalcIcon, Check, ChevronDown, MessageCircle, Minus, Plus } from "lucide-react";
import { bi, num, taka, type Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { TIERS, TREATMENTS } from "@/lib/data";
import { wa } from "@/lib/site";
import { useLang } from "./Providers";
import { Reveal, SOFT } from "./Reveal";

interface Result { low: number; high: number; months: number; treatment: string; tier: string; qty: number }
const TENORS = [3, 6, 12];

function Field({ id, label, value, items, onChange }: { id: string; label: Bi; value: string; items: { id: string; name: Bi }[]; onChange: (v: string) => void }) {
  const { tr } = useLang();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/80">{tr(label)}</label>
      <div className="relative">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="min-h-12 w-full appearance-none rounded-xl border border-white/15 bg-ink-900 px-4 py-3 pr-11 text-white outline-none transition focus:border-lagoon-400 focus:ring-2 focus:ring-lagoon-400/30">
          {items.map((o) => <option key={o.id} value={o.id} className="bg-ink-900">{tr(o.name)}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
      </div>
    </div>
  );
}

export function Calculator() {
  const { tr, lang } = useLang();
  const [treat, setTreat] = useState(TREATMENTS[0].slug);
  const [tier, setTier] = useState(TIERS[0].id);
  const [qty, setQty] = useState(1);
  const [months, setMonths] = useState(6);
  const [result, setResult] = useState<Result | null>(null);

  const current = TREATMENTS.find((t) => t.slug === treat) ?? TREATMENTS[0];
  const reset = () => setResult(null);

  const calculate = () => {
    const ti = TIERS.find((x) => x.id === tier) ?? TIERS[0];
    const q = current.perUnit ? qty : 1;
    const r = (n: number) => Math.round((n * ti.mult * q) / 1000) * 1000;
    setResult({ low: r(current.from), high: r(current.to), months, treatment: current.name.en, tier: ti.name.en, qty: q });
  };

  return (
    <div id="calculator" className="grain relative scroll-mt-24 overflow-hidden rounded-[2.5rem] bg-ink-950 p-6 text-white ring-1 ring-ink-950/10 sm:p-10 lg:p-12">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 animate-aurora rounded-full bg-lagoon-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 animate-aurora rounded-full bg-brass-400/20 blur-3xl [animation-delay:-8s]" />
      <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="text-3xl font-medium sm:text-4xl">{tr(bi("ট্রিটমেন্ট খরচ ও ইএমআই ক্যালকুলেটর", "Treatment cost & EMI calculator"))}</h3>
          <p className="mt-3 text-white/70">{tr(bi("আপনার ট্রিটমেন্ট বেছে নিন — সম্ভাব্য খরচ ও ০% সুদের কিস্তি এখনই দেখুন।", "Choose a treatment to see the estimated cost and 0% interest instalments."))}</p>
          <div className="glass mt-8 space-y-5 rounded-3xl p-5 sm:p-6">
            <Field id="treat" label={bi("ট্রিটমেন্ট ক্যাটাগরি", "Treatment category")} value={treat} items={TREATMENTS.map((t) => ({ id: t.slug, name: t.name }))} onChange={(v) => { setTreat(v); reset(); }} />
            <Field id="tier" label={bi("ম্যাটেরিয়াল / টেক টিয়ার", "Material / technology tier")} value={tier} items={TIERS} onChange={(v) => { setTier(v); reset(); }} />
            {current.perUnit && (
              <div>
                <p className="mb-2 text-sm font-medium text-white/80">{tr(bi("দাঁতের সংখ্যা", "Number of teeth"))}</p>
                <div className="flex w-fit items-center gap-4 rounded-full border border-white/15 p-1">
                  <button onClick={() => { setQty((q) => Math.max(1, q - 1)); reset(); }} aria-label="Decrease" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"><Minus className="h-4 w-4" /></button>
                  <span className="w-8 text-center font-display text-xl" aria-live="polite">{num(qty, lang)}</span>
                  <button onClick={() => { setQty((q) => Math.min(8, q + 1)); reset(); }} aria-label="Increase" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
            )}
            <div>
              <p className="mb-2 text-sm font-medium text-white/80">{tr(bi("ইএমআই মেয়াদ", "EMI duration"))}</p>
              <div className="flex gap-2">
                {TENORS.map((m) => (
                  <button key={m} onClick={() => { setMonths(m); reset(); }} aria-pressed={months === m} className={cn("min-h-12 flex-1 rounded-xl border px-3 text-sm font-medium transition", months === m ? "border-brass-300 bg-brass-400/15 text-brass-200" : "border-white/15 text-white/75 hover:bg-white/5")}>
                    {num(m, lang)} {tr(bi("মাস", "months"))}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={calculate} className="btn-brass w-full"><CalcIcon className="h-4 w-4" />{tr(bi("খরচ হিসাব করুন", "Calculate Cost"))}</button>
          </div>
        </div>

        <div className="flex min-h-[26rem] items-center">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key={`${result.treatment}${result.tier}${result.qty}${result.months}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.55, ease: SOFT }} className="glass w-full rounded-3xl p-6 sm:p-8">
                <p className="text-sm text-white/60">{tr(bi("সম্ভাব্য খরচ", "Estimated cost"))}</p>
                <p className="mt-1 font-display text-3xl font-medium sm:text-5xl">{taka(result.low, lang)} – {taka(result.high, lang)}</p>

                <p className="mt-7 flex items-center gap-2 font-semibold text-emerald-300"><Check className="h-4 w-4" />{num(result.months, lang)} {tr(bi("মাসের ০% ইএমআই", "month 0% EMI"))}</p>
                <div className="mt-4 flex h-36 items-end gap-1.5 sm:gap-2" role="img" aria-label="EMI chart">
                  {Array.from({ length: result.months }, (_, i) => (
                    <div key={i} className="flex h-full min-w-0 flex-1 flex-col justify-end text-center">
                      <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: (i + 1) / result.months }} transition={{ duration: 0.7, delay: 0.1 + i * 0.05, ease: SOFT }} style={{ height: "100%" }} className="w-full origin-bottom rounded-t-lg bg-gradient-to-t from-lagoon-600 to-brass-300 will-change-transform" />
                      <span className="mt-2 text-[0.7rem] text-white/55">{num(i + 1, lang)}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-white/80">{tr(bi("প্রতি মাসে", "Per month"))}: <strong className="text-white">{taka(result.low / result.months, lang)} – {taka(result.high / result.months, lang)}</strong></p>
                <p className="mt-1 text-sm text-white/55">{tr(bi("সুদ ৳০ · প্রসেসিং ফি ৳০ · চূড়ান্ত মূল্য কনসালটেশনে নিশ্চিত হয়।", "Interest 0, processing fee 0. The final price is confirmed at consultation."))}</p>
                <a
                  href={wa(`Hello Doctor, I would like to lock this estimate: ${result.treatment}${result.qty > 1 ? ` x${result.qty}` : ""} (${result.tier}), BDT ${result.low.toLocaleString("en-IN")} to ${result.high.toLocaleString("en-IN")}, ${result.months}-month 0% EMI.`)}
                  target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />{tr(bi("এই বাজেটের অফার WhatsApp-এ লক করুন", "Lock this budget offer on WhatsApp"))}
                </a>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full rounded-3xl border border-dashed border-white/20 p-10 text-center text-white/60">
                <CalcIcon className="mx-auto h-8 w-8 text-brass-300" />
                <p className="mt-4">{tr(bi("বাম পাশে ট্রিটমেন্ট বেছে ‘খরচ হিসাব করুন’ চাপুন।", "Pick a treatment and press Calculate Cost."))}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function CalculatorSection() {
  return <Reveal><Calculator /></Reveal>;
}
