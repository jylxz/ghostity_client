const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  important: "#__next",
  theme: {
    extend: {
      colors: {
        primary: "#AAF0C1",
        secondary: "#ccfbf1",
        youtubeRed: "#FF0000",
        twitchPurple: "#6441a5",
        blurGray: "#ffffff40",
      },
      fontFamily: {
        sans: ['"Quicksand"', ...defaultTheme.fontFamily.sans],
        secondary: [
          '"Raleway"',
          '"Quicksand"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      keyframes: {
        "fade-out": {
          "0%": {
            opacity: "100",
          },
          "50%": {
            opacity: "0",
          },
          "100%": {
            opacity: "100",
          },
        },
        "move-center": {
          "0%": {
            transform: "translateX(0%)",
          },
          "50%": {
            transform: "translateX(50%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        wiggle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "20%, 60%": {
            transform: "rotate(10deg)",
          },
          "40%, 80%": {
            transform: "rotate(-10deg)",
          },
        },
        "background-position-left": {
          "0%": {
            "background-position": "left",
          },
          "100%": {
            "background-position": "right",
          },
        },
        "background-position-center": {
          "0%, 50%": {
            "background-position": "center",
          },
          "25%": {
            "background-position": "right",
          },
          "100%": {
            "background-position": "left",
          },
        },
        "background-position-right": {
          "0%": {
            "background-position": "right",
          },
          "100%": {
            "background-position": "left",
          },
        },
      },
      animation: {
        wiggle: "wiggle 2s linear infinite",
        "fade-out": "fade-out 2s ease-out infinite",
        "move-center": "move-center 2s ease-out infinite",
        "fade-out-2": "fade-out 10s ease-in infinite",
        "background-position-right":
          "background-position-right 10s ease-in infinite alternate",
        "background-position-center":
          "background-position-center 10s ease-in infinite alternate",
        "background-position-left":
          "background-position-left 10s ease-in infinite alternate",
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
