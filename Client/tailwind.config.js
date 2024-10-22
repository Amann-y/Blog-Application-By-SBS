/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        secondaryFont :["Lilita One", "sans-serif"],
        paraFont : ["Baskervville", "serif"]
      }
    },
  },
  plugins: [],
}

