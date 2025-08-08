/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        custom: ["MyCustomFont", "cursive"],
      },
    //   fontSize: {
    //     xxs: "0.625rem", // 10px
    //     tiny: "0.7rem", // between xs and sm
    //     huge: "3rem", // 48px
    //     jumbo: "5rem", // 80px
    //   },
    },
  },
  plugins: [],
};
