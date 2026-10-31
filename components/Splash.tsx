"use client";

import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Splash({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash" role="status" aria-label="Loading"
          className="grain fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 overflow-hidden bg-ink-950"
          exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-lagoon-500/20 blur-3xl" />
          <svg viewBox="0 0 64 64" className="relative h-24 w-24" fill="none" strokeWidth="1.2" strokeLinejoin="round">
            <defs>
              <linearGradient id="sg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#8ADAD2" /><stop offset="1" stopColor="#E4C98A" />
              </linearGradient>
            </defs>
            <motion.path
              d="M26 8h12v18h18v12H38v18H26V38H8V26h18z" stroke="url(#sg)" fill="#8ADAD2"
              initial={{ pathLength: 0, fillOpacity: 0 }} animate={{ pathLength: 1, fillOpacity: 0.14 }}
              transition={{ duration: 1.1, ease: SOFT }}
            />
          </svg>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }} animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.1, delay: 0.35, ease: SOFT }}
            className="relative px-6 text-center font-display text-lg text-brass-200 sm:text-2xl"
          >
            Aura Medical Infrastructure
          </motion.p>
          <div className="relative h-px w-44 overflow-hidden bg-white/10">
            <motion.div className="h-full origin-left bg-brass-300" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, ease: "linear" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
