export type Lang = "bn" | "en";
export interface Bi { bn: string; en: string }
export const bi = (bn: string, en: string): Bi => ({ bn, en });
export const taka = (n: number, lang: Lang): string => `৳${Math.round(n).toLocaleString(lang === "bn" ? "bn-BD" : "en-IN")}`;
export const num = (n: number, lang: Lang): string => n.toLocaleString(lang === "bn" ? "bn-BD" : "en-IN");
