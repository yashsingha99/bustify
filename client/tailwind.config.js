/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    scrollbar: ['rounded'], // if you want to add variants like rounded scrollbars
  },
  theme: {
    extend: {
      colors: {
        customColor: 'rgb(0, 30, 43)', // Define your custom color here
      },
      keyframes: {
        'shadow-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.2)' },
          '100%': { boxShadow: '0 0 0 35px rgba(255, 255, 255, 0)' },
        },
      },
      animation: {
        'shadow-pulse': 'shadow-pulse 1s infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      };

      addUtilities(newUtilities);
    },
  ],
}