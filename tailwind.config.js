/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fit-400': 'repeat(auto-fit,minmax(400px, 1fr))',
        'fit-250': 'repeat(auto-fit,minmax(250px, 1fr))',
      },
    },
  },
  plugins: [],
};
