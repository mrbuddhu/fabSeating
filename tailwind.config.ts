import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7f7',
          100: '#d9eeed',
          200: '#b7dddc',
          300: '#85c5c4',
          400: '#4fa2a2',
          500: '#3a8788',
          600: '#326c6d',
          700: '#2d5859',
          800: '#294849',
          900: '#253d3e',
          950: '#1a2c2d', // Dark teal
        },
        accent: {
          50: '#f8f9f7',
          100: '#f1f3f0',
          200: '#e2e6e0',
          300: '#c9d0c8',
          400: '#a8b2a8',
          500: '#8a948a',
          600: '#6a746a',
          700: '#555e55',
          800: '#454c45',
          900: '#3a403a',
          950: '#1d201d',
        },
        cream: {
          50: '#faf9f5',
          100: '#f4f2e9',
          200: '#e9e3d2',
          300: '#d9ceb1',
          400: '#c6b58b',
          500: '#b9a06f',
          600: '#a98a5a',
          700: '#8e7049',
          800: '#765c3f',
          900: '#614c36',
          950: '#33271c',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.875rem',
        'sm': '1rem',
        'base': '1.125rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '1.875rem',
        '3xl': '2.5rem',
        '4xl': '3.5rem',
        '5xl': '4.5rem',
        '6xl': '5.5rem',
        '7xl': '6.5rem',
        '8xl': '7.5rem',
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        'shake': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#2a2520',
            a: {
              color: '#726757',
              '&:hover': {
                color: '#5f5649',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config

