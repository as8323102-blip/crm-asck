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
        // Acento de marca ASCK (violeta → cian del lenguaje visual del portafolio).
        // Se usa para identidad (logo, CTA, indicadores); el color semántico de
        // estados (blue/amber/purple/emerald/rose) queda separado a propósito.
        asck: {
          violet: {
            DEFAULT: '#7C6CF5',
            bright: '#948AF8',
            deep: '#5B4BE0',
          },
          cyan: {
            DEFAULT: '#10B1C6',
            bright: '#22C9DE',
          },
        },
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
        heading: [
          'Outfit',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
