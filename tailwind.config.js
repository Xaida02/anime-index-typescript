/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "#DEF9C4",
        primaryMedium: "#9CDBA6",
        primaryDark: "#50B498",
        primary: "#529b73",
      },
      keyframes: {
        shadeIn: {
          "0%": { opacity: "0", top: "-50px" },
          "50%": { opacity: "0.2", top: "-10px" },
          "100%": { opacity: "1", top: "0px" },
        },
        appear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        shadeIn: "shadeIn 300ms ease-in-out",
        appear: "appear 500ms ease-in-out",
      },
    },
  },
  plugins: [],
};
