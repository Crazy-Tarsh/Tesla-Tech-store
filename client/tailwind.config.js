/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        tesla: {
          lime: "#A3FF12",
          black: "#000000",
          graphite: "#111111",
          zinc: "#1A1A1A"
        }
      },
      boxShadow: {
        glow: "0 0 30px rgba(163, 255, 18, 0.35)"
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
