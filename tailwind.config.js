/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-black': '#141414',
        'netflix-dark': '#181818',
        'netflix-gray': '#2f2f2f',
        'netflix-red': '#e50914',
        'netflix-white': '#e5e5e5',
      },
    },
  },
  plugins: [],
}
