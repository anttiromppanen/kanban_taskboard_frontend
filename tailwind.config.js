/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ".src/index.css"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Mono", "monospace"],
        userLogoFont: ["Gloria Hallelujah", "cursive"],
      },
      colors: {
        userGray1: "#1F1D24",
        userGray2: "#2B2931",
        userPurple: "#7F55D6",
        userGreen: "#2CBCAB",
        userYellow: "#F3EF8B",
        userPink: "#FF7B9C",
        userLightBlue: "#DCD6F7",
      },
    },
  },
  plugins: [],
};
