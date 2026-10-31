"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { bi, type Bi } from "@/lib/i18n";
import { TREATMENTS } from "@/lib/data";
import { wa } from "@/lib/site";
import { useLang } from "./Providers";
import { SOFT } from "./Reveal";

const ERR: Record<string, Bi> = {
  name: bi("আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।", "Enter your name (at least 2 letters)."),
  phone: bi("সঠিক বাংলাদেশি মোবাইল নম্বর দিন, যেমন 01712345678।", "Enter a valid Bangladeshi mobile number, e.g. 01712345678."),
  treatment: bi("একটি ট্রিটমেন্ট বেছে নিন।", "Choose a treatment."),
  urgency: bi("সময়সীমা বেছে নিন।", "Choose a timeframe."),
  message: bi("বার্তায় লিংক বা অনুপযুক্ত শব্দ থাকা যাবে না।", "Please remove links or unsuitable wording from your message."),
  rate: bi("অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন বা WhatsApp করুন।", "Too many attempts. Please try again shortly or use WhatsApp."),
  form: bi("কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।", "Something went wrong. Please try again."),
};
interface Reply { ok: boolean; tier?: string; errors?: Record<string, string> }

const input = "min-h-12 w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-ink-950 outline-none transition focus:border-lagoon-500 focus:ring-2 focus:ring-lagoon-500/30";

function Field({ id, label, error, children }: { id: string; label: Bi; error?: string; children: ReactNode }) {
  const { tr } = useLang();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-950/80">{tr(label)}</label>
      {children}
      {error && <p role="alert" className="mt-1.5 text-sm text-red-600">{tr(ERR[error] ?? ERR.form)}</p>}
    </div>
  );
}

export function ContactForm() {
  const { tr } = useLang();
  const started = useRef(Date.now());
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errs, setErrs] = useState<Record<string, string>>({});

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    setState("sending");
    setErrs({});
    try {
      const res = await fetch("/api/lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "form", name: get("name"), phone: get("phone"), treatment: get("treatment"), urgency: get("urgency"), message: get("message"), website: get("website"), elapsed: Date.now() - started.current }),
      });
      const data = (await res.json()) as Reply;
      if (data.ok) setState("done");
      else { setErrs(data.errors ?? { form: "form" }); setState("idle"); }
    } catch {
      setErrs({ form: "form" });
      setState("idle");
    }
  };

  return (
    <div id="book" className="glass-light scroll-mt-28 rounded-[2rem] p-6 text-ink-950 sm:p-10">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: SOFT }} className="py-10 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
            <h3 className="mt-5 text-3xl font-medium">{tr(bi("ধন্যবাদ! অনুরোধ পেয়েছি।", "Thank you. Request received."))}</h3>
            <p className="mx-auto mt-3 max-w-md text-ink-950/70">{tr(bi("আমাদের কোঅর্ডিনেটর শীঘ্রই আপনাকে কল করবেন। দ্রুত উত্তর চাইলে WhatsApp করুন।", "Our coordinator will call you shortly. For the fastest reply, message us on WhatsApp."))}</p>
            <a href={wa("Hello, I just sent a booking request on your website.")} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-600 px-7 font-semibold text-white hover:bg-emerald-500"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="space-y-5">
            <h2 className="text-3xl font-medium">{tr(bi("ভিআইপি অ্যাপয়েন্টমেন্ট নিন", "Request a VIP appointment"))}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label={bi("আপনার নাম", "Your name")} error={errs.name}><input id="name" name="name" autoComplete="name" required className={input} /></Field>
              <Field id="phone" label={bi("মোবাইল নম্বর", "Mobile number")} error={errs.phone}><input id="phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" required className={input} /></Field>
              <Field id="treatment" label={bi("কোন ট্রিটমেন্ট?", "Which treatment?")} error={errs.treatment}>
                <select id="treatment" name="treatment" defaultValue="implants" className={input}>
                  {TREATMENTS.map((t) => <option key={t.slug} value={t.slug}>{tr(t.name)}</option>)}
                  <option value="general">{tr(bi("সাধারণ চেকআপ", "General checkup"))}</option>
                </select>
              </Field>
              <Field id="urgency" label={bi("কখন শুরু করতে চান?", "When would you like to start?")} error={errs.urgency}>
                <select id="urgency" name="urgency" defaultValue="week" className={input}>
                  <option value="week">{tr(bi("এই সপ্তাহে", "This week"))}</option>
                  <option value="month">{tr(bi("এই মাসে", "This month"))}</option>
                  <option value="exploring">{tr(bi("তথ্য জেনে রাখছি", "Just exploring"))}</option>
                </select>
              </Field>
            </div>
            <Field id="message" label={bi("আপনার সমস্যা বা প্রশ্ন (ঐচ্ছিক)", "Your concern or question (optional)")} error={errs.message}>
              <textarea id="message" name="message" rows={4} maxLength={600} className={`${input} resize-none`} />
            </Field>
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            {(errs.rate || errs.form) && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{tr(ERR[errs.rate ? "rate" : "form"])}</p>}
            <button type="submit" disabled={state === "sending"} className="btn-ink w-full disabled:opacity-60">
              {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {tr(bi("অনুরোধ পাঠান", "Send request"))}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );

}
