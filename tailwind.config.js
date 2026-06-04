/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F07800',
          hover: '#d96a00',
          light: '#fff3e0',
          border: '#ffe0b2',
        },
        navy: '#1a1a2e',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

