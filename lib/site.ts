import { bi } from "./i18n";

/** Edit these once and the whole site updates. */
export const SITE = {
  name: "Aura Advanced Medical & Aesthetics",
  whatsapp: "8801700000000",
  phone: "+8801700000000",
  phoneLabel: "+880 1700-000000",
  email: "care@aura-demo.com.bd",
  address: bi("হাউস ১২, রোড ৩৫, গুলশান-২, ঢাকা ১২১২", "House 12, Road 35, Gulshan-2, Dhaka 1212"),
  hours: [
    bi("শনি থেকে বৃহস্পতিবার: সকাল ১০টা থেকে রাত ১০টা", "Saturday to Thursday: 10 AM to 10 PM"),
    bi("শুক্রবার: বিকাল ৩টা থেকে রাত ৯টা", "Friday: 3 PM to 9 PM"),
  ],
  consultFee: 1000,
  mapsUrl: "https://maps.google.com/?q=Gulshan-2+Dhaka",
};

export const wa = (text: string): string => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
