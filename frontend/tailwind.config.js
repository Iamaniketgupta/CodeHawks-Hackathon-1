export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: 'class',
        customColor: {
          DEFAULT: '#0e1012', 
        },
      },
    },
  },
  plugins: [],
}
