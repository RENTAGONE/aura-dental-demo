import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "rgb(var(--ink-950) / <alpha-value>)", 900: "rgb(var(--ink-900) / <alpha-value>)", 800: "rgb(var(--ink-800) / <alpha-value>)", 700: "rgb(var(--ink-700) / <alpha-value>)" },
        lagoon: { 300: "rgb(var(--lagoon-300) / <alpha-value>)", 400: "rgb(var(--lagoon-400) / <alpha-value>)", 500: "rgb(var(--lagoon-500) / <alpha-value>)", 600: "rgb(var(--lagoon-600) / <alpha-value>)" },
        brass: { 200: "rgb(var(--brass-200) / <alpha-value>)", 300: "rgb(var(--brass-300) / <alpha-value>)", 400: "rgb(var(--brass-400) / <alpha-value>)", 500: "rgb(var(--brass-500) / <alpha-value>)" },
        porcelain: "rgb(var(--porcelain) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-bn)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-bn-serif)", "Georgia", "serif"],
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-100%)" } },
        aurora: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(6%,-8%,0) scale(1.15)" },
        },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(520%)" } },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        aurora: "aurora 16s ease-in-out infinite",
        scan: "scan 3.2s ease-in-out infinite alternate",
        "spin-slow": "spin 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
