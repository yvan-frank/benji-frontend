/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        abril: ['"Abril Fatface"', 'cursive'],
        geist: ['var(--font-geist-sans)', 'sans-serif'],
      },
      colors: {
        btnbg: '#DB9423',
        btnbg2: '#ED7A00',
        yellow: '#ffaf00',
        oxblood: '#b80802',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
