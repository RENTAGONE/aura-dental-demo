import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { CalculatorSection } from "@/components/Calculator";
import { PriceNotes } from "@/components/PriceNotes";
import { FAQ } from "@/components/FAQ";
import { CTABand } from "@/components/CTABand";
import { bi } from "@/lib/i18n";

export const metadata: Metadata = { title: "Pricing & EMI" };

export default function PricingPage() {
  return (
    <>
      <PageHero crumb={bi("খরচ ও ইএমআই", "Pricing & EMI")} title={bi("স্বচ্ছ খরচ, ০% ইএমআই", "Transparent pricing, 0% EMI")} sub={bi("ক্যালকুলেটরে আপনার ট্রিটমেন্টের সম্ভাব্য খরচ ও মাসিক কিস্তি দেখুন।", "Use the calculator to see your likely cost and monthly instalment.")} />
      <Section tone="light">
        <CalculatorSection />
        <PriceNotes />
      </Section>
      <FAQ />
      <CTABand />
    </>
  );
}
