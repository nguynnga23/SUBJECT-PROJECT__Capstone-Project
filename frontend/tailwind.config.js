/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "3xl": "1000px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0064E0",
          dark: "#d67c10",
          light: "#f5b866",
        },
        sub: {
          DEFAULT: "#BCD6FF",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(-50px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        slideUp: "slideUp 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
