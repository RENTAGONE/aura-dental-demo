"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { bi } from "@/lib/i18n";
import { FAQS } from "@/lib/data";
import { useLang } from "./Providers";
import { Reveal, SOFT } from "./Reveal";
import { Section, SectionHead } from "./ui";

export function FAQ() {
  const { tr } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section tone="light">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead title={bi("সচরাচর জিজ্ঞাসা", "Questions, answered")} sub={bi("আরও জানতে চাইলে WhatsApp-এ সরাসরি লিখুন।", "Still unsure? Message us directly on WhatsApp.")} />
        <Reveal>
          <ul className="divide-y divide-ink-950/10 border-y border-ink-950/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q.en}>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left">
                    <span className="font-display text-xl font-medium">{tr(f.q)}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-950 text-white"><Plus className="h-4 w-4" /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: SOFT }} className="overflow-hidden">
                        <p className="max-w-2xl pb-6 text-lg text-ink-950/70">{tr(f.a)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
