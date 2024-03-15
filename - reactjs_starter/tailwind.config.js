module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: "#0078FF",
        secondary: "#00FFD1",
        gray: {
          100: "#3C626A",
          200: "#3C4B6A",
        }
      },
      fontFamily: {
        'sans': ['Raleway', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
        'colistoga': ['Calistoga', 'serif']
      }
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    boxShadow: {
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    }
  },
  plugins: [],
}