/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #ebf8ff 0%, #bee3f8 100%)',
      },
      borderRadius: {
        'custom': '0 0 100px 100px',
      },
    },
  },
  plugins: [],
}

