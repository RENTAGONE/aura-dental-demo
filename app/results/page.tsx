import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ResultsSection } from "@/components/ResultsSection";
import { Journey } from "@/components/Journey";
import { CTABand } from "@/components/CTABand";
import { bi } from "@/lib/i18n";

export const metadata: Metadata = { title: "Results" };

export default function ResultsPage() {
  return (
    <>
      <PageHero crumb={bi("ফলাফল", "Results")} title={bi("আগে ও পরে: বাস্তব রূপান্তর", "Before and after: real transformations")} sub={bi("স্লাইডার টেনে দেখুন প্রতিটি ট্রিটমেন্টের আগে ও পরের পার্থক্য।", "Drag each slider to see the difference treatment makes.")} />
      <ResultsSection count={3} full />
      <Journey />
      <CTABand />
    </>
  );
}
