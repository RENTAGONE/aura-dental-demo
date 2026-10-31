"use client";

import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { bi, type Bi } from "@/lib/i18n";
import type { Art } from "@/lib/data";
import { useLang } from "./Providers";
import { Photo } from "./Photo";

export function BeforeAfter({ before, after, art = "smile", label }: { before: string; after: string; art?: Art; label: Bi }) {
  const { tr } = useLang();
  const [pos, setPos] = useState(50);
  return (
    <div className="group relative aspect-[4/3] select-none overflow-hidden rounded-[2rem] ring-1 ring-white/15">
      <Photo src={after} alt={`${tr(label)}: ${tr(bi("পরে", "after"))}`} art={art} className="absolute inset-0" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo src={before} alt={`${tr(label)}: ${tr(bi("আগে", "before"))}`} art={art} dim className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/80" />
        <div className="glass absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white"><MoveHorizontal className="h-5 w-5" /></div>
      </div>
      <span className="glass pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1 text-xs text-white">{tr(bi("আগে", "Before"))}</span>
      <span className="glass pointer-events-none absolute right-4 top-4 rounded-full px-3 py-1 text-xs text-white">{tr(bi("পরে", "After"))}</span>
      <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-5 pt-12 text-white">{tr(label)}</p>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label={tr(bi("আগে ও পরের তুলনা স্লাইডার", "Before and after comparison slider"))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}
