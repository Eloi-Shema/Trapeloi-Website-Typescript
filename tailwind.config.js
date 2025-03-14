/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat",
        kanit: "Kanit",
        trap: "Trap",
      },
      colors: {
        bgBlack: "rgb(9, 16, 15)",
        blueGreen: "rgb(0, 255, 241)",
        myGreen: "rgb(0, 255, 191)",
        dimGreen: "rgb(18, 255, 196)",
        niceGreen: "rgb(0, 171, 102)",
        goldYellow: "rgb(216, 184, 0)",
        dimGold: "rgba(255, 200, 10, 0.833)",
        bgGreen: "rgba(8, 255, 193, 0.15)",
        perfectBlue: "rgb(65, 105, 225)",
        platinum: "rgb(229, 228, 226)",
      },
      screens: {
        xs: "320px",
        sm: "400px",
        md: "769px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      height: {
        "screen-h": "100svh",
      },
    },
  },
  plugins: [],
};
