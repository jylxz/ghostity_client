const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  // important: "#__next",
  theme: {
    extend: {
      colors: {
        primary: "#DEECFC",
        secondary: "#E1F2FB",
        secondary2: "#F1F9F9",
        youtubeRed: "#FF0000",
        twitchPurple: "#6441a5",
        blurGray: "#ffffff60",
        blurSlate: "#e2e8f080",
        "primary-dark": "#222222",
        "secondary-dark": "#2b2b2b",
        "secondary-dark-2": "#454545",
        "text-primary-dark": "#efefef",
        "text-secondary-dark": "#a1a1a1"
      },
      fontFamily: {
        sans: ['"Quicksand"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
