import type { Metadata, Viewport } from "next";
import { Fraunces, Hind_Siliguri, Noto_Serif_Bengali, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { TriageWidget } from "@/components/TriageWidget";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const bn = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-bn", display: "swap" });
const bnSerif = Noto_Serif_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600"], variable: "--font-bn-serif", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Aura Advanced Medical & Aesthetics | Gulshan, Dhaka", template: "%s | Aura Medical" },
  description: "Microscope-guided dentistry and aesthetics in Gulshan, Dhaka. Dental implants, clear aligners, veneers and 0% EMI.",
};
export const viewport: Viewport = { themeColor: "#06171B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${display.variable} ${sans.variable} ${bn.variable} ${bnSerif.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileBar />
          <TriageWidget />
        </Providers>
      </body>
    </html>
  );
}
