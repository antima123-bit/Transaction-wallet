/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        accent: '#00BFFF',
        background: '#121212',
        success: '#28A745',
        error: '#FF4C4C',
      },
    },
  },
  plugins: [],
}