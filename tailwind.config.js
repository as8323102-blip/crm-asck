/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        notion: {
          bg: {
            light: '#FBFBFA',
            dark: '#191919',
          },
          card: {
            light: '#FFFFFF',
            dark: '#202020',
          },
          border: {
            light: '#EBEBE9',
            dark: '#2E2E2E',
          },
          text: {
            light: '#37352F',
            dark: '#E3E3E2',
            muted: {
              light: '#787774',
              dark: '#9B9B9A',
            }
          }
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
