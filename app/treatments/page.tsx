import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { TreatmentCard } from "@/components/TreatmentCard";
import { Technology } from "@/components/Technology";
import { CTABand } from "@/components/CTABand";
import { TREATMENTS } from "@/lib/data";
import { bi } from "@/lib/i18n";

export const metadata: Metadata = { title: "Treatments" };

export default function TreatmentsPage() {
  return (
    <>
      <PageHero crumb={bi("ট্রিটমেন্ট", "Treatments")} title={bi("প্রতিটি হাসির জন্য নিখুঁত ট্রিটমেন্ট", "Precision treatments for every smile")} sub={bi("ইমপ্ল্যান্ট থেকে স্মাইল মেকওভার — স্পেশালিস্ট ডাক্তার, আন্তর্জাতিক মানের ম্যাটেরিয়াল ও ০% ইএমআই।", "From implants to full smile makeovers, with specialist doctors, international-grade materials and 0% EMI.")} />
      <Section tone="light">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TREATMENTS.map((t, i) => <TreatmentCard key={t.slug} t={t} delay={(i % 3) * 0.08} />)}
        </div>
      </Section>
      <Technology />
      <CTABand />
    </>
  );
}
