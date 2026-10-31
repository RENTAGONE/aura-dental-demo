import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Lead filter. Two kinds of events arrive here:
 *  - "form": the contact form (full validation, spam filter, scoring)
 *  - "triage": a button choice from the triage widget (no personal data, just intent)
 * Anything that looks like a bot is dropped silently with a 200 so it learns nothing.
 *
 * NOTE: the rate limiter below is in-memory, so on serverless hosting each instance keeps
 * its own counter. For production traffic, swap `limited()` for Upstash Redis or Vercel KV.
 */

const BD_PHONE = /^(?:\+?88)?01[3-9]\d{8}$/;
const TREATMENTS = new Set(["implants", "aligners", "veneers", "endo", "whitening", "skin", "general"]);
const HIGH_TICKET = new Set(["implants", "aligners", "veneers"]);
const URGENCY = new Set(["week", "month", "exploring"]);
const INTENTS = new Set(["high", "general", "emergency", "price"]);
const SPAM = /(casino|crypto|bitcoin|forex|viagra|backlink|seo service|loan offer|click here|earn money|adult|porn|telegram\.me|t\.me\/)/i;
const LINKS = /(https?:\/\/|www\.|\.com\/|\.ru\b)/i;

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const str = (v: unknown, max: number): string => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function notify(text: string): Promise<void> {
  const { TELEGRAM_BOT_TOKEN: tg, TELEGRAM_CHAT_ID: chat, DISCORD_WEBHOOK_URL: dc } = process.env;
  const jobs: Promise<unknown>[] = [];
  if (tg && chat) {
    jobs.push(fetch(`https://api.telegram.org/bot${tg}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chat, text }),
    }));
  }
  if (dc) {
    jobs.push(fetch(dc, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: text }) }));
  }
  if (jobs.length === 0) console.log("[lead]", text);
  await Promise.allSettled(jobs);
}

function score(treatment: string, urgency: string, message: string): { points: number; tier: "hot" | "warm" | "cold" } {
  let points = 20;
  if (HIGH_TICKET.has(treatment)) points += 40;
  else if (treatment === "endo" || treatment === "skin") points += 25;
  if (urgency === "week") points += 25;
  else if (urgency === "month") points += 10;
  if (message.length > 30) points += 10;
  return { points, tier: points >= 70 ? "hot" : points >= 45 ? "warm" : "cold" };
}

const fail = (errors: Record<string, string>, status = 400) => NextResponse.json({ ok: false, errors }, { status });

export async function POST(req: Request) {
  if (Number(req.headers.get("content-length") ?? 0) > 6000) return fail({ form: "too_large" }, 413);

  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    try { if (new URL(origin).host !== host) return fail({ form: "origin" }, 403); } catch { return fail({ form: "origin" }, 403); }
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return fail({ form: "rate" }, 429);

  let body: Record<string, unknown>;
  try { body = (await req.json()) as Record<string, unknown>; } catch { return fail({ form: "bad_json" }); }

  if (body.type === "triage") {
    const intent = str(body.intent, 20);
    if (!INTENTS.has(intent)) return fail({ form: "bad_intent" });
    if (intent === "emergency") await notify("Triage: someone tapped EMERGENCY on the website assistant.");
    return NextResponse.json({ ok: true });
  }

  // Bot traps: honeypot field and impossibly fast submissions are dropped silently.
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : 0;
  if (str(body.website, 100) !== "" || elapsed < 2500) return NextResponse.json({ ok: true, tier: "cold" });

  const name = str(body.name, 60);
  const phone = str(body.phone, 20).replace(/[\s-]/g, "");
  const treatment = str(body.treatment, 20);
  const urgency = str(body.urgency, 20);
  const message = str(body.message, 600);

  const errors: Record<string, string> = {};
  if (name.length < 2 || (name.match(/\d/g) ?? []).length > 2) errors.name = "name";
  if (!BD_PHONE.test(phone)) errors.phone = "phone";
  if (!TREATMENTS.has(treatment)) errors.treatment = "treatment";
  if (!URGENCY.has(urgency)) errors.urgency = "urgency";
  if (SPAM.test(`${name} ${message}`) || LINKS.test(`${name} ${message}`) || /(.)\1{7,}/.test(message)) errors.message = "blocked";
  if (Object.keys(errors).length > 0) return fail(errors);

  const { points, tier } = score(treatment, urgency, message);
  await notify(
    `New ${tier.toUpperCase()} lead (${points}/100)\nName: ${name}\nPhone: ${phone}\nInterest: ${treatment}\nTiming: ${urgency}\nNote: ${message || "-"}`,
  );
  return NextResponse.json({ ok: true, tier });
}
