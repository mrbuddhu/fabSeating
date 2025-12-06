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
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#e8e4dd',
          300: '#d4cdc2',
          400: '#b8afa0',
          500: '#9d917e',
          600: '#8a7d6a',
          700: '#726757',
          800: '#5f5649',
          900: '#4f483e',
          950: '#2a2520',
        },
        accent: {
          50: '#fef7ed',
          100: '#fdecd4',
          200: '#fbd5a8',
          300: '#f8b771',
          400: '#f49038',
          500: '#f17311',
          600: '#e25707',
          700: '#bb4208',
          800: '#95350e',
          900: '#782e0f',
          950: '#401506',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
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

