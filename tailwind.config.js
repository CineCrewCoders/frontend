/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: '#9cdbff',
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      }
    }
  },
  plugins: [],
}

