import { Hero } from "@/components/Hero";
import { Stats, TrustMarquee } from "@/components/TrustStats";
import { TreatmentsShowcase } from "@/components/TreatmentsShowcase";
import { Technology } from "@/components/Technology";
import { ResultsSection } from "@/components/ResultsSection";
import { Journey } from "@/components/Journey";
import { Doctors } from "@/components/Doctors";
import { CalculatorSection } from "@/components/Calculator";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { CTABand } from "@/components/CTABand";
import { Section, SectionHead } from "@/components/ui";
import { bi } from "@/lib/i18n";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <Stats />
      <TreatmentsShowcase />
      <Technology />
      <ResultsSection count={2} />
      <Journey />
      <Doctors />
      <Section tone="light">
        <SectionHead title={bi("আপনার বাজেট, আগেই জানুন", "Know your budget before you walk in")} sub={bi("কোনো লুকানো খরচ নেই — ৩, ৬ বা ১২ মাসের ০% ইএমআই।", "No hidden costs, with 0% EMI over 3, 6 or 12 months.")} />
        <div className="mt-12"><CalculatorSection /></div>
      </Section>
      <Reviews />
      <FAQ />
      <CTABand />
    </>
  );
}
