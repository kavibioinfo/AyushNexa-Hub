/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0F172A",
        primary: "#0F172A",
        accent: "#2563EB",
        muted: "#F8FAFC",
        border: "#E2E8F0",
      },
    },
  },
  plugins: [],
}