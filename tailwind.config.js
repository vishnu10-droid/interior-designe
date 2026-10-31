/** @type {import('tailwindcss').Config} */
export default {
  /** @type {import('tailwindcss').Config} */
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        beige: "#F1EAE0",
        sand: "#E8DCCF",
        charcoal: "#1C1917",
        espresso: "#3E2F25",
        coffee: "#6B5B4C",
        gold: "#C6A87C",
        golddark: "#A98548",
        stonewarm: "#8A7E71",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Jost"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(62,47,37,0.25)",
        card: "0 10px 40px -12px rgba(28,25,23,0.18)",
        lift: "0 24px 70px -18px rgba(28,25,23,0.35)",
      },
    },
  },
  plugins: [],
};
