/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'game-gradient': 'linear-gradient(to bottom, #a7cfdf 0%, #23538a 100%)',
        'card-gradient': 'linear-gradient(to bottom, #cedbe9 0%, #aac5de 17%, #6199c7 50%, #3a84c3 51%, #419ad6 59%, #4bb8f0 71%, #3a8bc2 84%, #26558b 100%)',
        'button-gradient': 'linear-gradient(to bottom, #7db9e8 0%, #207cca 49%, #2989d8 50%, #1e5799 100%)',
      },
      colors: {
        'game-border': '#003c7b',
        'question-bg': '#deeeff',
      },
    },
  },
  plugins: [],
}
