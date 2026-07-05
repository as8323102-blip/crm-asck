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
            dark: '#030712', // Slate 950 - Fondo profundo y moderno
          },
          card: {
            light: '#FFFFFF',
            dark: '#0F172A', // Slate 900 - Tarjetas contrastantes
          },
          border: {
            light: '#EBEBE9',
            dark: '#1F2937', // Gray 800 - Bordes sutiles
          },
          text: {
            light: '#37352F',
            dark: '#F9FAFB', // Gray 50 - Texto de alto contraste
            muted: {
              light: '#787774',
              dark: '#9CA3AF', // Gray 400 - Texto secundario legible
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
