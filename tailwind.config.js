const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // To add the fonts, setup in app/configs/fonts.ts
      fontFamily: {
        brand: ["Archivo", ...defaultTheme.fontFamily.sans],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["Chivo Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        brand: {
          50: "#f2f9fd",
          100: "#e5f1f9",
          200: "#c5e2f2",
          300: "#92cae7",
          400: "#57aed9",
          500: "#3399cc",
          600: "#2277a7",
          700: "#1d6087",
          800: "#1b5171",
          900: "#1c445e",
          950: "#0c1c27",
        },
        surface: {
          50: "#f4f8f9",
          100: "#dce7eb",
          200: "#b8ced7",
          300: "#8dacbb",
          400: "#65899c",
          500: "#4b6e81",
          600: "#3a5667",
          700: "#324653",
          800: "#2b3944",
          900: "#0a0d0f",
          950: "#040506",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      minHeight: {
        100: "100",
      },
      minWeight: {
        100: "100",
      },
    },
    debugScreens: {
      position: ["bottom", "left"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("tailwindcss-radix")(),
  ],
};
