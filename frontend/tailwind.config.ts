import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Bu satır src altındaki her şeyi kapsar, en garantisidir.
  ],
  theme: {
    extend: {
      // 1. Kayan Yazı Hareket Detayları
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      // 2. Animasyonun Hızı ve Tipi
      animation: {
        marquee: "marquee 35s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // Build hatasını önlemek için geçici olarak yorum satırına alındı. 
    // Terminalde 'npm install -D @tailwindcss/typography' yaptıktan sonra başındaki // işaretlerini kaldırabilirsin.
    // require('@tailwindcss/typography'), 
  ],
};

export default config;