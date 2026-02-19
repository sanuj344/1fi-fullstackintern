/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        slate: {
          950: "#0b1120"
        }
      }
    }
  },
  plugins: []
};
