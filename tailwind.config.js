/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        purpleOne: "#724ce7",
        purpleTwo: "#855fea",
        purpleThree: "#9773ee",
        purpleFour: "#a886f1",
        purpleFive: "#b79af4",
        purpleSix: "#c7adf6",
        purpleOne: "#724ce7",
        surfaceOneDark: "#383549",
        surfaceTwoDark: "#4e4b5d",
        surfaceOneLight: "#57536e",
        surfaceTwoLight: "#87839c",
        darkBG: "#211a24",
        lightBG: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
