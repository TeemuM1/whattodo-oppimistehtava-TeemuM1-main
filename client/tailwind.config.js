/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pastelBlue: "#A2D2FF",
        pastelPink: "#FFC8DD",
        pastelYellow: "#FFD6A5",
        pastelGreen: "#BDE0FE",
      },
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        pastelTheme: {
          primary: "#A2D2FF",
          secondary: "#FFC8DD",
          accent: "#FFD6A5",
          neutral: "#BDE0FE",
          "base-100": "#ffffff",
        },
      },
    ],
  },
}

