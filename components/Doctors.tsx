"use client";

import { motion } from "framer-motion";
import { bi } from "@/lib/i18n";
import { DOCTORS } from "@/lib/data";
import { useLang } from "./Providers";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./ui";

export function Doctors({ withHead = true, tone = "mid" }: { withHead?: boolean; tone?: "dark" | "mid" | "light" }) {
  const { tr, lang } = useLang();
  const dark = tone !== "light";
  return (
    <Section tone={tone}>
      {withHead && <SectionHead dark={dark} title={bi("স্পেশালিস্ট ডাক্তারদের টিম", "A team of specialist doctors")} sub={bi("প্রতিটি ট্রিটমেন্টের জন্য আলাদা বিশেষজ্ঞ — একজন সবকিছুর দায়িত্বে নন।", "A dedicated specialist for every treatment, never one generalist for everything.")} />}
      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {DOCTORS.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.08}>
            <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <Photo src={d.image} alt={tr(d.name)} art="team" className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-[1.5rem] ring-1 ring-white/10" />
              <h3 className="mt-5 text-xl font-medium">{tr(d.name)}</h3>
              <p className={dark ? "text-white/70" : "text-ink-950/65"}>{tr(d.role)}</p>
              <p className="mt-1 text-sm text-brass-500">{d.years.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")} {tr(bi("বছরের অভিজ্ঞতা", "years of experience"))}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
