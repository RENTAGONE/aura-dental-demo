"use client";

import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { bi } from "@/lib/i18n";
import { SITE, wa } from "@/lib/site";
import { useLang } from "./Providers";

export function MobileBar() {
  const { tr } = useLang();
  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium text-white";
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex border-t border-white/10 bg-ink-950/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <a href={`tel:${SITE.phone}`} className={item}><Phone className="h-5 w-5 text-lagoon-300" />{tr(bi("কল", "Call"))}</a>
      <a href={wa("Hello, I found you on your website.")} target="_blank" rel="noopener noreferrer" className={item}><MessageCircle className="h-5 w-5 text-emerald-400" />WhatsApp</a>
      <Link href="/contact#book" className={item}><CalendarCheck className="h-5 w-5 text-brass-300" />{tr(bi("বুকিং", "Book"))}</Link>
    </div>
  );
}
