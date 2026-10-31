# Aura Advanced Medical & Aesthetics: flagship demo

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · lucide-react. Bangla by default, English toggle.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production check before deploying
```

Deploy by pushing to GitHub and importing the repo on Vercel. No config needed.

## Pages

`/` home · `/treatments` · `/treatments/[slug]` (6 detail pages) · `/doctors` · `/results` · `/pricing` (EMI calculator) · `/contact` (lead form)

Also site-wide: cinematic splash, Bangla-to-English prompt after 3 seconds, button-only triage assistant (bottom right), sticky mobile call/WhatsApp/book bar.

## Change the basics (one file)

`lib/site.ts`: WhatsApp number, phone, address, hours, consultation fee. Everything on the site updates.
`lib/data.ts`: treatments, prices, doctors, reviews, FAQs, stats (all bilingual).

## Photos: drop files in, no code changes

Every image slot shows a designed art fallback until a real photo exists at its path, so the site always looks finished.
Use **free-licence** photos (Unsplash, Pexels) or AI-generated or your client's own. Do not use Google Images results: they are copyrighted.

| File in `public/images/` | Shot | Ratio |
|---|---|---|
| `hero.jpg` | Smiling woman or man, bright and clean, natural light | 4:5 portrait |
| `treatments/implants.jpg` | Dentist and patient, or an implant model | 4:3 |
| `treatments/aligners.jpg` | Hand holding a clear aligner | 4:3 |
| `treatments/veneers.jpg` | Close-up of a perfect smile | 4:3 |
| `treatments/endo.jpg` | Dentist under a surgical microscope | 4:3 |
| `treatments/whitening.jpg` | Whitening in progress, or shade guide | 4:3 |
| `treatments/skin.jpg` | Facial treatment, calm skincare scene | 4:3 |
| `doctors/nusrat.jpg`, `rafiul.jpg`, `samira.jpg`, `tanvir.jpg` | Professional portraits in white coats | 4:5 portrait |
| `results/before-1.jpg` and `after-1.jpg` | Matching pair, same angle and crop | 4:3 |
| `results/before-2.jpg` and `after-2.jpg` | Second matching pair | 4:3 |
| `results/before-3.jpg` and `after-3.jpg` | Third matching pair | 4:3 |

Keep each file under about 300 KB (resize and compress first). Real before/after photos must come from the actual clinic with patient consent.

## Lead filter API: `app/api/lead/route.ts`

The contact form posts here and the triage widget sends an anonymous intent signal. It blocks junk before it reaches anyone:

- honeypot field and a minimum fill-time trap (bots are dropped silently)
- Bangladeshi mobile number validation (`01[3-9]xxxxxxxx`, optional `+88`)
- spam keyword, link and repeated-character filter
- per-IP rate limit (5 requests per 10 minutes)
- same-origin check and payload size cap
- lead scoring: **hot / warm / cold** from treatment value, urgency and detail

Set `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` and/or `DISCORD_WEBHOOK_URL` (see `.env.example`) to receive qualified leads instantly. With none set, leads are logged to the server console.
The rate limiter is in-memory; for heavy traffic on serverless, swap `limited()` for Upstash Redis or Vercel KV.

## Notes

- All clinic names, doctors, reviews, ratings and prices are demo content. Replace them before using this for a real client.
- Fonts (Fraunces, Plus Jakarta Sans, Hind Siliguri, Noto Serif Bengali) load through `next/font`, so the first build needs internet.
