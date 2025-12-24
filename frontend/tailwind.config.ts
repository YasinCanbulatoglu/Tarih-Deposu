import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      // 1. Keyframes (Hareketin nasıl olacağı)
      keyframes: {
        // Mevcut Kayan Yazı
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // --- YENİ EKLENEN: YUKARI KAYMA EFEKTİ ---
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // -----------------------------------------
      },
      
      // 2. Animation (Hareketin süresi ve tipi)
      animation: {
        // Mevcut Kayan Yazı Animasyonu
        marquee: "marquee 35s linear infinite",
        // --- YENİ EKLENEN: ANİMASYON TANIMI ---
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
        // ---------------------------------------
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'), 
  ],
};

export default config;