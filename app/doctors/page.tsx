import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { Doctors } from "@/components/Doctors";
import { Reviews } from "@/components/Reviews";
import { CTABand } from "@/components/CTABand";
import { bi } from "@/lib/i18n";

export const metadata: Metadata = { title: "Our Doctors" };

export default function DoctorsPage() {
  return (
    <>
      <PageHero crumb={bi("ডাক্তারগণ", "Doctors")} title={bi("বিশেষজ্ঞ ডাক্তারদের হাতে আপনার হাসি", "Your smile in specialist hands")} sub={bi("প্রতিটি ডাক্তার নিজ নিজ ক্ষেত্রে বছরের পর বছর কাজ করা বিশেষজ্ঞ।", "Every doctor is a dedicated specialist with years of focused practice.")} />
      <Doctors withHead={false} tone="light" />
      <Reviews />
      <CTABand />
    </>
  );
}
