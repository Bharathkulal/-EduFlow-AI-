/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        white: '#02462E', // bg-white becomes Forest green background
        forest: {
          DEFAULT: '#02462E',
          light: '#035d3d',
          dark: '#013221',
        },
        golden: {
          DEFAULT: '#FEC700',
          hover: '#e5b300',
        },
        // Re-route default Tailwind colors to match the Forest and Golden palette
        indigo: {
          50: '#035237', // soft forest green instead of light indigo
          100: 'rgba(254, 199, 0, 0.1)', // translucent golden border
          200: 'rgba(254, 199, 0, 0.2)',
          300: 'rgba(254, 199, 0, 0.3)',
          400: '#FEC700',
          500: '#FEC700',
          600: '#FEC700', // Primary buttons and active highlights become Golden
          700: '#e5b300',
          800: '#cc9f00',
          900: '#02462E',
          950: '#FEC700',
        },
        blue: {
          50: '#035237',
          100: 'rgba(254, 199, 0, 0.1)',
          200: 'rgba(254, 199, 0, 0.2)',
          300: 'rgba(254, 199, 0, 0.3)',
          400: '#FEC700',
          500: '#FEC700',
          600: '#FEC700',
          700: '#e5b300',
          800: '#cc9f00',
          900: '#02462E',
        },
        slate: {
          50: '#035237', // lighter forest for secondary card/list backgrounds
          100: '#013221', // darker forest for borders/dividers
          200: 'rgba(254, 199, 0, 0.2)', // borders
          300: 'rgba(254, 199, 0, 0.3)',
          400: '#a3c2b6', // soft muted green-gray for labels
          500: '#c4dad0', // secondary readable text on forest
          600: '#FEC700', // navigation links
          700: '#FEC700', // body text
          800: '#FEC700',
          900: '#FEC700', // headings
          950: '#fffdf0',
        },
        gray: {
          50: '#035237',
          100: '#013221',
          200: 'rgba(254, 199, 0, 0.2)',
          300: 'rgba(254, 199, 0, 0.3)',
          400: '#a3c2b6',
          500: '#c4dad0',
          600: '#FEC700',
          700: '#FEC700',
          800: '#FEC700',
          900: '#FEC700',
          950: '#fffdf0',
        },
        emerald: {
          50: 'rgba(254, 199, 0, 0.1)',
          100: 'rgba(254, 199, 0, 0.2)',
          500: '#FEC700',
          600: '#FEC700',
        }
      }
    },
  },
  plugins: [],
}

