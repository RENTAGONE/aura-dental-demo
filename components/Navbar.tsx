"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Cross, Languages, Menu, X } from "lucide-react";
import { bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useLang } from "./Providers";
import { SOFT } from "./Reveal";

const LINKS = [
  { href: "/treatments", label: bi("ট্রিটমেন্ট", "Treatments") },
  { href: "/doctors", label: bi("ডাক্তারগণ", "Doctors") },
  { href: "/results", label: bi("ফলাফল", "Results") },
  { href: "/pricing", label: bi("খরচ ও ইএমআই", "Pricing & EMI") },
  { href: "/contact", label: bi("যোগাযোগ", "Contact") },
];

export function Navbar() {
  const { lang, setLang, tr, ready } = useLang();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }} transition={{ duration: 0.8, ease: SOFT }}
      className={cn("fixed inset-x-0 top-0 z-40 transition-colors duration-500", scrolled || open ? "border-b border-white/10 bg-ink-950/75 backdrop-blur-xl" : "bg-transparent")}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-white" aria-label="Aura home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5"><Cross className="h-5 w-5 text-brass-300" /></span>
          <span className="font-display text-xl font-medium leading-none">Aura<span className="mt-1 hidden text-[0.7rem] font-normal text-white/60 sm:block">Advanced Medical & Aesthetics</span></span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={cn("rounded-full px-4 py-2 text-sm transition-colors", path.startsWith(l.href) ? "bg-white/10 text-white" : "text-white/70 hover:text-white")}>
              {tr(l.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "bn" ? "en" : "bn")} className="flex min-h-12 items-center gap-2 rounded-full px-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white" aria-label="Switch language">
            <Languages className="h-4 w-4" />{lang === "bn" ? "English" : "বাংলা"}
          </button>
          <Link href="/contact#book" className="btn-brass hidden !min-h-11 !px-5 !py-2 text-sm md:inline-flex">{tr(bi("ভিআইপি বুকিং", "VIP Booking"))}</Link>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open} className="flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-ink-950/95 px-5 pb-10 pt-8 backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i, duration: 0.5, ease: SOFT }}>
                  <Link href={l.href} className="block border-b border-white/10 py-4 font-display text-3xl text-white">{tr(l.label)}</Link>
                </motion.div>
              ))}
            </nav>
            <Link href="/contact#book" className="btn-brass mt-8 w-full">{tr(bi("ভিআইপি বুকিং", "VIP Booking"))}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
