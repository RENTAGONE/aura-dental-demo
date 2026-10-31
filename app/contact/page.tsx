import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";
import { Reveal } from "@/components/Reveal";
import { bi } from "@/lib/i18n";

export const metadata: Metadata = { title: "Book an Appointment" };

export default function ContactPage() {
  return (
    <>
      <PageHero crumb={bi("যোগাযোগ", "Contact")} title={bi("আপনার ভিআইপি অ্যাপয়েন্টমেন্ট নিন", "Book your VIP appointment")} sub={bi("ফর্ম পূরণ করুন, ফোন করুন বা WhatsApp-এ লিখুন — আমরা দ্রুত সাড়া দিই।", "Fill the form, call or message us on WhatsApp. We reply fast.")} />
      <Section tone="light">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal><ContactForm /></Reveal>
          <ContactInfo />
        </div>
      </Section>
    </>
  );
}
