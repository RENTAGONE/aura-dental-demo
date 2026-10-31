import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#06171B", 900: "#0A2429", 800: "#0F3138", 700: "#17454D" },
        lagoon: { 300: "#8ADAD2", 400: "#4FC3BC", 500: "#1FA3A3", 600: "#168587" },
        brass: { 200: "#F0DDB0", 300: "#E4C98A", 400: "#D4AE63", 500: "#B98F45" },
        porcelain: "#F3F7F6",
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
