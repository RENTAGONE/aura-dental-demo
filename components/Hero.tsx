"use client";

import { useRef, type PointerEvent as RPointerEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowRight, BadgeCheck, ChevronDown, Cross, Microscope, ShieldCheck, Star } from "lucide-react";
import { bi } from "@/lib/i18n";
import { useLang } from "./Providers";
import { Photo } from "./Photo";
import { Magnetic, SOFT } from "./Reveal";

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } };
const rise: Variants = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: SOFT } } };

const CHIPS = [
  { icon: ShieldCheck, label: bi("আন্তর্জাতিক মানের প্রযুক্তি", "International-standard technology") },
  { icon: BadgeCheck, label: bi("0% EMI", "0% EMI") },
  { icon: Microscope, label: bi("মাইক্রোস্কোপ-গাইডেড", "Microscope-guided") },
];

export function Hero() {
  const { tr, ready } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const archY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 16 });
  const sy = useSpring(py, { stiffness: 70, damping: 16 });
  const onMove = (e: RPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 26);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 26);
  };
  const show = ready ? "show" : "hidden";

  return (
    <section ref={ref} onPointerMove={onMove} className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pb-20 pt-28 text-white">
      <div className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] animate-aurora rounded-full bg-lagoon-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] animate-aurora rounded-full bg-brass-400/20 blur-3xl [animation-delay:-8s]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div style={{ y: copyY, opacity: fade }}>
          <motion.div variants={stagger} initial="hidden" animate={show} className="flex flex-col items-start">
            <motion.p variants={rise} className="glass flex items-center gap-3 rounded-full px-4 py-2 text-sm text-white/85">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              {tr(bi("আজ খোলা, রাত ১০টা পর্যন্ত", "Open today until 10 PM"))}
            </motion.p>
            <motion.h1 variants={rise} className="mt-7 text-[clamp(2.7rem,6.4vw,5.8rem)] font-medium leading-[1.25] text-white">
              {tr(bi("ভবিষ্যতের স্বাস্থ্যসেবা, আজই", "The Future of Healthcare, Today"))}
            </motion.h1>
            <motion.p variants={rise} className="mt-6 max-w-xl text-lg text-white/70">
              {tr(bi("সার্জিক্যাল নিখুঁত চিকিৎসা, মাইক্রোস্কোপিক প্রিসিশন ও ব্যথাহীন স্মাইল মেকওভার — গুলশানের এক ছাদের নিচে।", "Surgical precision, microscopic accuracy and painless smile makeovers, together under one roof in Gulshan."))}
            </motion.p>
            <motion.ul variants={stagger} className="mt-8 flex flex-wrap gap-3">
              {CHIPS.map(({ icon: Icon, label }) => (
                <motion.li key={label.en} variants={rise} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                  <Icon className="h-4 w-4 text-lagoon-300" />{tr(label)}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic><Link href="/contact#book" className="btn-brass">{tr(bi("ভিআইপি বুকিং", "VIP Booking"))}<ArrowRight className="h-4 w-4" /></Link></Magnetic>
              <Link href="/pricing#calculator" className="btn-ghost">{tr(bi("খরচ হিসাব করুন", "Estimate your cost"))}</Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.1, delay: 0.25, ease: SOFT }} className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div style={{ y: archY }} className="relative mx-auto aspect-[4/5] w-full max-w-[26rem]">
            <motion.div style={{ x: sx, y: sy }} className="relative h-full w-full">
              <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2.5rem] border border-brass-300/40" />
              <Photo src="/images/hero.jpg" alt="Aura patient smile" art="smile" priority className="h-full w-full rounded-t-[999px] rounded-b-[2.5rem] ring-1 ring-white/15" />
              <div className="absolute inset-0 rounded-t-[999px] rounded-b-[2.5rem] bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: cardsY }} className="pointer-events-none absolute inset-0 mx-auto max-w-[26rem] lg:max-w-none">
            <div className="pointer-events-auto absolute -right-2 -top-6 flex h-28 w-28 items-center justify-center sm:-right-10">
              <svg viewBox="0 0 120 120" className="h-28 w-28 animate-spin-slow text-brass-300" aria-hidden>
                <defs><path id="ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
                <text fontSize="8.5" fill="currentColor" textLength="270" lengthAdjust="spacing"><textPath href="#ring">Microscope guided • Smile design • 0% EMI • </textPath></text>
              </svg>
              <Cross className="absolute h-6 w-6 text-brass-300" />
            </div>

            <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="glass absolute -left-3 bottom-12 flex items-center gap-4 rounded-2xl p-4 sm:-left-12">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brass-300/30 to-lagoon-400/30"><Star className="h-6 w-6 fill-brass-300 text-brass-300" /></span>
              <span><span className="block font-semibold">{tr(bi("৪.৯★ রোগীর রেটিং", "4.9★ patient rating"))}</span><span className="block text-sm text-white/70">{tr(bi("জীবাণুমুক্ত সার্টিফায়েড ক্লিনিক", "Sterile, certified clinic"))}</span></span>
            </motion.div>

            <div className="glass absolute -right-2 bottom-40 hidden rounded-2xl p-4 sm:-right-8 sm:block">
              <p className="text-xs text-white/60">{tr(bi("পরবর্তী ফ্রি স্লট", "Next free slot"))}</p>
              <p className="mt-1 flex items-center gap-2 font-semibold"><span className="h-2 w-2 rounded-full bg-emerald-400" />{tr(bi("আজ, বিকাল ৪:৩০", "Today, 4:30 PM"))}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/50 lg:block" aria-hidden>
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
