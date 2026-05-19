/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        bgPrimary: "#111110",

        bgSecondary: "#1a1a18",

        accent: "#EF9F27",

        danger: "#E24B4A",

        safe: "#639922",

        watch: "#D68B1F",

        borderColor: "#2A2A28",

        textPrimary: "#F5F5F4",

        textMuted: "#A1A1AA",

      },

    },
  },

  plugins: [],
}