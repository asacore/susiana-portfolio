import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E0004",
        plum: "#31081F",
        magenta: "#B91372",
        pink: "#FA198B",
      },
      fontFamily: {
        altee: ["var(--font-altee)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;