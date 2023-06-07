/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#080707",
        white: "#FDFDFD",
        grey: "#595959",
        greyLight: "#CFCFCF",
        background: "#FAFCFF",
      },
      scale: {
        102: "1.02",
        98: "0.98",
      },
      keyframes: {
        slideIn: {
          from: {
            transform: "translateX(100%)",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },

          to: {
            transform: "translateX(0)",
            easing: "cubic-bezier(0.8, 0, 0.6, 1)",
          },
        },
        searchField: {
          "0%": {
            marginLeft: "-30%",
            opacity: "0",
          },
          "90%": {
            opacity: "0.9",
          },
          "100%": {
            marginLeft: "0%",
            opacity: "1",
          },
        },
        navLinks: {
          from: {
            transform: "translateY(-100%)",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          to: {
            transform: "translateY(0)",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        slideInNav: "slideIn 0.4s forwards",
        searchInput: "searchField 0.4s forwards",
        navLinks: "navLinks 0.7s forwards",
      },
      transitionDuration: {
        50: "50ms",
      },
    },
  },
  plugins: [],
};
