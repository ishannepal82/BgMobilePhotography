import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#e7ecf2',
        background: '#090f18',
        primary: '#8fb1e3',
        secondary: '#164b9a',
        accent: '#287bf4',
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        heading: ['Caveat', 'cursive'],
        body: ['Poppins', 'sans-serif'],
        accent: ['Noto Sans', 'sans-serif']
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
    },
  },
  plugins: [],
}

export default config
