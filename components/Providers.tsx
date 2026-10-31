"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { Bi, Lang } from "@/lib/i18n";
import { Splash } from "./Splash";

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; tr: (b: Bi) => string; ready: boolean }
const Ctx = createContext<LangCtx | null>(null);

export function useLang(): LangCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used inside <Providers>");
  return c;
}

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("bn");
  const [splash, setSplash] = useState(true);
  const [askOpen, setAskOpen] = useState(false);
  const [askDone, setAskDone] = useState(false);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("aura-lang", l); } catch { /* storage unavailable */ }
  }, []);

  // Splash: fade in, hold 1.5s, slide up. Skipped for repeat visits within the same session.
  useEffect(() => {
    try {
      if (localStorage.getItem("aura-lang") === "en") { setLangState("en"); setAskDone(true); }
      if (sessionStorage.getItem("aura-ask") === "1") setAskDone(true);
    } catch { /* storage unavailable */ }
    let seen = false;
    try { seen = sessionStorage.getItem("aura-splash") === "1"; } catch { /* storage unavailable */ }
    if (seen) { setSplash(false); return; }
    const id = window.setTimeout(() => {
      setSplash(false);
      try { sessionStorage.setItem("aura-splash", "1"); } catch { /* storage unavailable */ }
    }, 2400);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => { document.body.style.overflow = splash ? "hidden" : ""; }, [splash]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  // Language prompt: 3 seconds after the splash clears.
  useEffect(() => {
    if (splash || askDone || lang === "en") return;
    const id = window.setTimeout(() => setAskOpen(true), 3000);
    return () => window.clearTimeout(id);
  }, [splash, askDone, lang]);

  const closeAsk = (toEnglish: boolean) => {
    if (toEnglish) setLang("en");
    setAskOpen(false);
    setAskDone(true);
    try { sessionStorage.setItem("aura-ask", "1"); } catch { /* storage unavailable */ }
  };

  const value = useMemo<LangCtx>(() => ({ lang, setLang, tr: (b: Bi) => b[lang], ready: !splash }), [lang, setLang, splash]);

  return (
    <Ctx.Provider value={value}>
      <MotionConfig reducedMotion="user">
        <Splash show={splash} />
        {children}
        <div className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 md:bottom-6">
          <AnimatePresence>
            {askOpen && (
              <motion.div
                key="ask" role="dialog" aria-label="Language"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="glass pointer-events-auto mr-16 flex w-full max-w-md flex-col gap-3 rounded-2xl bg-ink-900/90 p-4 text-white sm:mr-0 sm:flex-row sm:items-center sm:rounded-full sm:py-3 sm:pl-6 sm:pr-3"
              >
                <p className="flex-1 text-sm">Viewing in Bangla. Translate to English?</p>
                <div className="flex gap-2">
                  <button onClick={() => closeAsk(true)} className="min-h-12 flex-1 rounded-full bg-gradient-to-br from-brass-200 to-brass-500 px-5 text-sm font-semibold text-ink-950">English</button>
                  <button onClick={() => closeAsk(false)} className="min-h-12 flex-1 rounded-full border border-white/25 px-5 text-sm text-white hover:bg-white/10">Cancel</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </Ctx.Provider>
  );
}
