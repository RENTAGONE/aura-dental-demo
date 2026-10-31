"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Cross, MessageCircle, X } from "lucide-react";
import { bi, type Bi } from "@/lib/i18n";
import { wa } from "@/lib/site";
import { useLang } from "./Providers";

/* Deterministic state machine. Buttons only, no free text. */
type Step = "welcome" | "highTicket" | "general" | "vip";
type Choice = "high" | "general" | "emergency" | "price";
type Key = "botWelcome" | "optHigh" | "optGeneral" | "botQ2" | "optEmergency" | "optPrice" | "botVip" | "ctaVip" | "botFee" | "ctaBooking";
interface Cta { labelKey: Key; href: string; external: boolean }
interface Msg { id: number; from: "bot" | "user"; key: Key; cta?: Cta }

const TEXT: Record<Key, Bi> = {
  botWelcome: bi("স্বাগতম! আমরা কীভাবে সহায়তা করতে পারি?", "Welcome! How can we help?"),
  optHigh: bi("ডেন্টাল ইমপ্ল্যান্ট / কসমেটিক", "Dental Implants / Cosmetic"),
  optGeneral: bi("সাধারণ চেকআপ", "General Checkup"),
  botQ2: bi("চমৎকার। আপনি কি দ্রুত ট্রিটমেন্ট শুরু করতে চাচ্ছেন?", "Excellent. Are you looking to start soon?"),
  optEmergency: bi("হ্যাঁ, ইমার্জেন্সি", "Yes, it's urgent"),
  optPrice: bi("শুধু দাম জানতে চাই", "Just want the price"),
  botVip: bi("আমাদের ভিআইপি বিশেষজ্ঞ এখনই আপনার সাথে কথা বলবেন।", "Our VIP specialist will speak with you right away."),
  ctaVip: bi("ভিআইপি বিশেষজ্ঞকে WhatsApp করুন", "WhatsApp the VIP specialist"),
  botFee: bi("আমাদের সাধারণ কনসালটেশন ফি ১০০০ টাকা। সিরিয়াল নিতে নিচে ক্লিক করুন।", "Our general consultation fee is BDT 1,000. Tap below to book."),
  ctaBooking: bi("বুকিং লিংক", "Booking link"),
};
const CHOICE_KEY: Record<Choice, Key> = { high: "optHigh", general: "optGeneral", emergency: "optEmergency", price: "optPrice" };
const STEP_CHOICES: Record<Step, Choice[]> = { welcome: ["high", "general"], highTicket: ["emergency", "price"], general: [], vip: [] };
const FIRST: Msg = { id: 0, from: "bot", key: "botWelcome" };

/** Fire-and-forget intent signal to the lead filter. Never blocks or changes the conversation. */
function signal(intent: Choice) {
  try {
    navigator.sendBeacon("/api/lead", new Blob([JSON.stringify({ type: "triage", intent })], { type: "application/json" }));
  } catch { /* analytics only */ }
}

export function TriageWidget() {
  const { tr } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [msgs, setMsgs] = useState<Msg[]>([FIRST]);
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  const add = (m: Omit<Msg, "id">) => setMsgs((p) => [...p, { ...m, id: nextId.current++ }]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing, open]);

  const toCalculator = () => {
    const el = document.getElementById("calculator");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else router.push("/pricing#calculator");
  };

  const choose = (c: Choice) => {
    add({ from: "user", key: CHOICE_KEY[c] });
    signal(c);
    if (c === "price") { later(() => { toCalculator(); setOpen(false); }, 350); return; }
    setTyping(true);
    later(() => {
      setTyping(false);
      if (c === "high") { add({ from: "bot", key: "botQ2" }); setStep("highTicket"); }
      if (c === "general") { add({ from: "bot", key: "botFee", cta: { labelKey: "ctaBooking", href: "/contact#book", external: false } }); setStep("general"); }
      if (c === "emergency") { add({ from: "bot", key: "botVip", cta: { labelKey: "ctaVip", href: wa("Hello Doctor, I need urgent care. (via website triage)"), external: true } }); setStep("vip"); }
    }, 650);
  };
  const restart = () => { setMsgs([FIRST]); setStep("welcome"); setTyping(false); };

  return (
    <div className="fixed bottom-24 right-4 z-30 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel" aria-label={tr(bi("Aura সহকারী", "Aura Assistant"))}
            initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="glass w-[calc(100vw-2rem)] max-w-sm origin-bottom-right overflow-hidden rounded-3xl bg-ink-950/90 text-white shadow-2xl shadow-black/60"
          >
            <header className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-lagoon-500/15 via-transparent to-brass-400/15 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"><Cross className="h-5 w-5 text-brass-300" /></span>
              <div className="flex-1"><p className="font-semibold leading-tight">{tr(bi("Aura সহকারী", "Aura Assistant"))}</p><p className="flex items-center gap-1.5 text-xs text-white/60"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{tr(bi("অনলাইন", "Online"))}</p></div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 hover:bg-white/10"><X className="h-4 w-4" /></button>
            </header>

            <div ref={scroller} className="flex h-80 flex-col gap-3 overflow-y-auto px-4 py-5" aria-live="polite">
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <motion.div key={m.id} layout initial={{ opacity: 0, scale: 0.85, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    className={`flex max-w-[85%] flex-col gap-2 ${m.from === "user" ? "origin-bottom-right self-end" : "origin-bottom-left self-start"}`}>
                    <div className={`rounded-2xl px-4 py-3 text-sm ${m.from === "user" ? "rounded-br-md bg-gradient-to-br from-brass-200 to-brass-500 font-medium text-ink-950" : "rounded-bl-md border border-white/10 bg-white/5 text-white/90"}`}>{tr(TEXT[m.key])}</div>
                    {m.cta && (
                      <a href={m.cta.href} {...(m.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white ${m.cta.external ? "bg-emerald-600 hover:bg-emerald-500" : "bg-lagoon-600 hover:bg-lagoon-500"}`}>
                        {m.cta.external && <MessageCircle className="h-4 w-4 shrink-0" />}{tr(TEXT[m.cta.labelKey])}
                      </a>
                    )}
                  </motion.div>
                ))}
                {typing && (
                  <motion.div key="typing" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} className="flex gap-1 self-start rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3">
                    {[0, 1, 2].map((d) => <motion.span key={d} className="h-2 w-2 rounded-full bg-lagoon-300" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-4">
              {STEP_CHOICES[step].map((c) => (
                <button key={c} disabled={typing} onClick={() => choose(c)} className="min-h-12 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-medium transition hover:border-brass-300/60 hover:bg-brass-400/10 disabled:opacity-50">
                  {tr(TEXT[CHOICE_KEY[c]])}
                </button>
              ))}
              {(step === "general" || step === "vip") && !typing && (
                <button onClick={restart} className="min-h-12 rounded-xl px-4 py-3 text-sm text-white/55 transition hover:text-white">{tr(bi("নতুন করে শুরু করুন", "Start over"))}</button>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button whileTap={{ scale: 0.94 }} onClick={() => setOpen((o) => !o)} aria-label={tr(bi("Aura সহকারী", "Aura Assistant"))} aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brass-200 via-brass-400 to-brass-500 text-ink-950 shadow-xl shadow-brass-500/30">
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-brass-400/40 [animation-duration:2.8s]" />}
        <span className="relative">{open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}</span>
      </motion.button>
    </div>
  );
}
