import { bi, type Bi } from "./i18n";

export type Art = "tooth" | "smile" | "scan" | "skin" | "team" | "clinic";

export interface Treatment {
  slug: string; name: Bi; short: Bi; from: number; to: number; perUnit: boolean;
  unit: Bi; duration: Bi; benefits: Bi[]; art: Art; image: string;
}
export interface Tier { id: string; name: Bi; mult: number }
export interface Doctor { slug: string; name: Bi; role: Bi; years: number; image: string }

export const TREATMENTS: Treatment[] = [
  {
    slug: "implants", art: "tooth", image: "/images/treatments/implants.jpg",
    name: bi("ডেন্টাল ইমপ্ল্যান্ট", "Dental Implants"),
    short: bi("হারানো দাঁতের স্থায়ী সমাধান — কামড়, কথা ও হাসি ফিরে আসে প্রাকৃতিক দাঁতের মতোই।", "A lasting answer to missing teeth, with bite, speech and smile restored like natural teeth."),
    from: 45000, to: 120000, perUnit: true, unit: bi("প্রতি দাঁত", "per tooth"), duration: bi("৩–৬ মাস", "3–6 months"),
    benefits: [
      bi("থ্রিডি গাইডেড সার্জারিতে কম ব্যথা, কম ফোলা", "3D-guided surgery for less pain and swelling"),
      bi("সুইস ও জার্মান টাইটানিয়াম ফিক্সচার", "Swiss and German titanium fixtures"),
      bi("ইমপ্ল্যান্ট ওয়ারেন্টি কার্ডসহ", "Implant warranty card included"),
    ],
  },
  {
    slug: "aligners", art: "smile", image: "/images/treatments/aligners.jpg",
    name: bi("ক্লিয়ার অ্যালাইনার", "Clear Aligners"),
    short: bi("তার ছাড়া, প্রায় অদৃশ্য — ডিজিটাল পরিকল্পনায় সোজা ও সুন্দর দাঁত।", "No wires and nearly invisible, with straighter teeth from a digital plan."),
    from: 90000, to: 220000, perUnit: false, unit: bi("পূর্ণ কেস", "full case"), duration: bi("৬–১৪ মাস", "6–14 months"),
    benefits: [
      bi("শুরুর আগেই থ্রিডি প্রিভিউতে ফলাফল দেখুন", "Preview your final smile in 3D before you start"),
      bi("খাওয়া ও ব্রাশের সময় খুলে রাখা যায়", "Removable for eating and brushing"),
      bi("প্রতি ৬ সপ্তাহে স্পেশালিস্ট রিভিউ", "Specialist review every 6 weeks"),
    ],
  },
  {
    slug: "veneers", art: "smile", image: "/images/treatments/veneers.jpg",
    name: bi("জিরকোনিয়া ও পোর্সেলিন ভেনিয়ার", "Zirconia & Porcelain Veneers"),
    short: bi("দাঁতের আকার, রং ও সারি নতুন করে সাজান — কম কাটাছেঁড়ায়।", "Reshape colour, size and alignment with minimal preparation."),
    from: 12000, to: 35000, perUnit: true, unit: bi("প্রতি দাঁত", "per tooth"), duration: bi("২–৩ ভিজিট", "2–3 visits"),
    benefits: [
      bi("ডিজিটাল স্মাইল ডিজাইনে আগে ট্রায়াল স্মাইল", "Try your smile first with digital smile design"),
      bi("দাগ-প্রতিরোধী প্রিমিয়াম সিরামিক", "Stain-resistant premium ceramics"),
      bi("প্রাকৃতিক আলোয় রং মিলিয়ে তৈরি", "Shade-matched under natural light"),
    ],
  },
  {
    slug: "endo", art: "scan", image: "/images/treatments/endo.jpg",
    name: bi("মাইক্রোস্কোপিক রুট ক্যানাল", "Microscopic Root Canal"),
    short: bi("মাইক্রোস্কোপের নিখুঁত নজরে দাঁত বাঁচান — প্রায় ব্যথাহীন, প্রায়ই এক ভিজিটে।", "Save the tooth under a surgical microscope, nearly painless and often in one visit."),
    from: 8000, to: 18000, perUnit: true, unit: bi("প্রতি দাঁত", "per tooth"), duration: bi("১–২ ভিজিট", "1–2 visits"),
    benefits: [
      bi("২০ গুণ পর্যন্ত বর্ধিত দৃষ্টিতে চিকিৎসা", "Treatment under up to 20× magnification"),
      bi("অ্যাপেক্স লোকেটরে নিখুঁত মাপ", "Precise measurement with apex locators"),
      bi("দাঁত তোলার বদলে দাঁত রক্ষা", "Keep your natural tooth instead of extracting"),
    ],
  },
  {
    slug: "whitening", art: "smile", image: "/images/treatments/whitening.jpg",
    name: bi("লেজার টিথ হোয়াইটেনিং", "Laser Teeth Whitening"),
    short: bi("এক সিটিংয়েই কয়েক শেড উজ্জ্বল হাসি, সংবেদনশীলতা কমিয়ে।", "Several shades brighter in one sitting, with sensitivity kept low."),
    from: 12000, to: 25000, perUnit: false, unit: bi("পূর্ণ সেশন", "full session"), duration: bi("৬০–৯০ মিনিট", "60–90 minutes"),
    benefits: [
      bi("এনামেল-বান্ধব জেল", "Enamel-friendly gel"),
      bi("আগে ও পরে শেড রিপোর্ট", "Before and after shade report"),
      bi("বাসায় রক্ষণাবেক্ষণ কিট", "Take-home maintenance kit"),
    ],
  },
  {
    slug: "skin", art: "skin", image: "/images/treatments/skin.jpg",
    name: bi("স্কিন ও ফেসিয়াল অ্যাস্থেটিকস", "Skin & Facial Aesthetics"),
    short: bi("ত্বকের উজ্জ্বলতা ও ফেসিয়াল ব্যালান্স — ডাক্তার-নিয়ন্ত্রিত, প্রাকৃতিক ফল।", "Radiant skin and facial balance, physician-led with natural-looking results."),
    from: 8000, to: 65000, perUnit: false, unit: bi("প্রতি সেশন", "per session"), duration: bi("৪৫–৯০ মিনিট", "45–90 minutes"),
    benefits: [
      bi("স্কিন অ্যানালাইসিসের ভিত্তিতে প্ল্যান", "Plans built from a skin analysis"),
      bi("মেডিকেল-গ্রেড পণ্য ও ডিভাইস", "Medical-grade products and devices"),
      bi("ফলো-আপ রিভিউ অন্তর্ভুক্ত", "Follow-up review included"),
    ],
  },
];

export const TIERS: Tier[] = [
  { id: "standard", name: bi("স্ট্যান্ডার্ড মেডিকেল গ্রেড", "Standard medical grade"), mult: 1 },
  { id: "premium", name: bi("প্রিমিয়াম সুইস / জার্মান", "Premium Swiss / German"), mult: 1.45 },
  { id: "signature", name: bi("সিগনেচার ডিজিটাল গাইডেড", "Signature digitally guided"), mult: 1.8 },
];

export const DOCTORS: Doctor[] = [
  { slug: "nusrat", image: "/images/doctors/nusrat.jpg", name: bi("ডা. নুসরাত জাহান", "Dr. Nusrat Jahan"), role: bi("ইমপ্ল্যান্টোলজিস্ট ও ওরাল সার্জন", "Implantologist & Oral Surgeon"), years: 12 },
  { slug: "rafiul", image: "/images/doctors/rafiul.jpg", name: bi("ডা. রাফিউল হাসান", "Dr. Rafiul Hasan"), role: bi("অর্থোডন্টিস্ট, ক্লিয়ার অ্যালাইনার", "Orthodontist, Clear Aligners"), years: 10 },
  { slug: "samira", image: "/images/doctors/samira.jpg", name: bi("ডা. সামিরা চৌধুরী", "Dr. Samira Chowdhury"), role: bi("কসমেটিক ডেন্টিস্ট ও স্মাইল ডিজাইনার", "Cosmetic Dentist & Smile Designer"), years: 9 },
  { slug: "tanvir", image: "/images/doctors/tanvir.jpg", name: bi("ডা. তানভীর আহমেদ", "Dr. Tanvir Ahmed"), role: bi("মাইক্রোস্কোপিক এন্ডোডন্টিস্ট", "Microscopic Endodontist"), years: 14 },
];

export const REVIEWS = [
  { name: "Ayesha R.", tag: bi("ডেন্টাল ইমপ্ল্যান্ট", "Dental implant"), text: bi("ইমপ্ল্যান্টের সময় একটুও ব্যথা পাইনি। প্রতিটি ধাপ আগে থেকে বুঝিয়ে বলেছেন।", "I felt no pain during my implant. Every step was explained beforehand.") },
  { name: "Imran H.", tag: bi("ক্লিয়ার অ্যালাইনার", "Clear aligners"), text: bi("০% ইএমআই-তে অ্যালাইনার নিতে পেরেছি, কোনো লুকানো খরচ নেই।", "The 0% EMI made aligners possible, and there were no hidden costs.") },
  { name: "Sadia K.", tag: bi("ভেনিয়ার", "Veneers"), text: bi("ট্রায়াল স্মাইল দেখে নিয়ে তারপর ভেনিয়ার — ফল ঠিক যেমনটা চেয়েছিলাম।", "I tried the smile first and the veneers match it exactly.") },
  { name: "Mahmud A.", tag: bi("রুট ক্যানাল", "Root canal"), text: bi("অন্য জায়গায় দাঁত তুলতে বলেছিল। এখানে মাইক্রোস্কোপে রুট ক্যানাল করে দাঁত বেঁচে গেছে।", "Elsewhere I was told to extract. Here a microscopic root canal saved my tooth.") },
  { name: "Tasnim F.", tag: bi("হোয়াইটেনিং", "Whitening"), text: bi("ক্লিনিকের পরিবেশ হাসপাতালের মতো পরিচ্ছন্ন, অথচ একদম শান্ত।", "As clean as a hospital, yet completely calm.") },
  { name: "Rashed M.", tag: bi("সাধারণ চেকআপ", "General checkup"), text: bi("WhatsApp-এ কয়েক মিনিটেই সিরিয়াল পেয়ে গেছি।", "I got my appointment on WhatsApp within minutes.") },
];

export const FAQS = [
  { q: bi("ট্রিটমেন্ট কি ব্যথাহীন?", "Is treatment painless?"), a: bi("আমরা কম্পিউটার-নিয়ন্ত্রিত অ্যানেস্থেশিয়া ও ন্যূনতম আক্রমণাত্মক পদ্ধতি ব্যবহার করি, তাই বেশিরভাগ রোগী খুব সামান্য অস্বস্তি অনুভব করেন।", "We use computer-controlled anaesthesia and minimally invasive methods, so most patients feel very little discomfort.") },
  { q: bi("০% ইএমআই কীভাবে কাজ করে?", "How does 0% EMI work?"), a: bi("ট্রিটমেন্টের মোট খরচ ৩, ৬ বা ১২ মাসে সমান কিস্তিতে ভাগ হয়। কোনো সুদ বা প্রসেসিং ফি নেই।", "The total is split into equal instalments over 3, 6 or 12 months with no interest or processing fee.") },
  { q: bi("কনসালটেশন ফি কত?", "What is the consultation fee?"), a: bi("সাধারণ কনসালটেশন ফি ১০০০ টাকা। ওই ভিজিটেই আপনি বিস্তারিত পরিকল্পনা ও খরচের হিসাব পাবেন।", "The general consultation fee is BDT 1,000. You leave that visit with a detailed plan and cost estimate.") },
  { q: bi("ইমপ্ল্যান্টে কত সময় লাগে?", "How long do implants take?"), a: bi("সার্জারি সাধারণত ৩০–৬০ মিনিট। হাড়ের সাথে জুড়তে ৩–৬ মাস লাগে, তারপর ক্রাউন বসানো হয়।", "Surgery usually takes 30–60 minutes. The implant fuses with bone over 3–6 months, then the crown is fitted.") },
  { q: bi("জীবাণুমুক্তকরণ কীভাবে নিশ্চিত হয়?", "How is sterilisation guaranteed?"), a: bi("প্রতিটি রোগীর জন্য আলাদা স্টেরিলাইজড কিট এবং ক্লাস-বি অটোক্লেভে হাসপাতাল-মানের জীবাণুমুক্তকরণ।", "Every patient gets a separately sterilised kit, processed in a Class-B autoclave to hospital standard.") },
  { q: bi("কীভাবে সিরিয়াল নেব?", "How do I book?"), a: bi("ওয়েবসাইটের ফর্ম, ফোন বা WhatsApp — যেকোনোটিতে। জরুরি হলে ট্রায়াজ বটে ‘ইমার্জেন্সি’ বেছে নিন।", "Use the form, phone or WhatsApp. If it is urgent, choose Emergency in the triage assistant.") },
];

export const STATS = [
  { to: 12000, suffix: "+", decimals: 0, label: bi("সন্তুষ্ট হাসি", "smiles delivered") },
  { to: 4.9, suffix: "★", decimals: 1, label: bi("Google রেটিং", "Google rating") },
  { to: 15, suffix: "+", decimals: 0, label: bi("বছরের অভিজ্ঞতা", "years of experience") },
  { to: 0, suffix: "%", decimals: 0, label: bi("ইএমআই-তে সুদ", "interest on EMI") },
];

export const JOURNEY = [
  { t: bi("কনসালটেশন ও থ্রিডি স্ক্যান", "Consultation & 3D scan"), d: bi("আপনার লক্ষ্য শুনি, থ্রিডি স্ক্যানে মুখের পূর্ণ চিত্র নিই এবং ওই দিনই খরচের হিসাব দিই।", "We listen, capture a full 3D scan and give you a cost estimate the same day.") },
  { t: bi("ডিজিটাল স্মাইল ডিজাইন", "Digital smile design"), d: bi("ট্রিটমেন্টের আগেই আপনার নতুন হাসির প্রিভিউ — আপনি অনুমোদন দিলে তবেই শুরু।", "A preview of your new smile before anything begins. We start only when you approve.") },
  { t: bi("ব্যথাহীন ট্রিটমেন্ট", "Painless treatment"), d: bi("স্পেশালিস্ট ডাক্তার, মাইক্রোস্কোপ ও গাইডেড প্রযুক্তিতে নিখুঁত চিকিৎসা।", "Specialist doctors with microscope and guided technology for precise care.") },
  { t: bi("আফটারকেয়ার ও ওয়ারেন্টি", "Aftercare & warranty"), d: bi("নিয়মিত ফলো-আপ, WhatsApp সাপোর্ট এবং প্রযোজ্য ট্রিটমেন্টে ওয়ারেন্টি কার্ড।", "Scheduled follow-ups, WhatsApp support and a warranty card where applicable.") },
];
