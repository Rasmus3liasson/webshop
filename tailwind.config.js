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
        white: "#fdfbfb",
        grey: "#595959",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(100%)",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },

          "100%": {
            transform: "translateX(0)",
            easing: "cubic-bezier(0.8, 0, 0.6, 1)",
          },
        },
      },
      animation: {
        slideInNav: "slideIn 0.4s forwards",
      },
    },
  },
  plugins: [],
};
