import type { Config } from 'tailwindcss'

export default {
  content: ['./*/*.{liquid,json,js}'],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1.6rem',
      xl: '2.1rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '5rem',
      '5xl': '6rem',
      '6xl': '7.7rem',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1300px',
      '2xl': '1300px'
    },
    container: {
      screens: {
        '2xl': '1300px'
      }
    },
    extend: {
      fontFamily: {
        'cenzo': ['CenzoFlare', 'system-ui'],
        'handmade-loves': ['HandmadeLoves', 'system-ui'],
        'plusJakarta': ['PlusJakartaSans', 'system-ui']
      }
    },
    colors: {
      'brand': {
        DEFAULT: '#1D49CA',
        content: '#1D49CA',
        bg: '#1D49CA'
      },
      'light-blue': {
        DEFAULT: '#ECF8FF',
        bg: '#ECF8FF',
        bd: '#ECF8FF'
      },
      'turquoise': {
        DEFAULT: '#b2e3ff',
        bg: '#b2e3ff',
        content: '#b2e3ff'
      },
      'white': {
        DEFAULT: '#ffffff',
        bg: '#ffffff',
        content: '#ffffff'
      },
      'black': {
        DEFAULT: '#000000',
        bg: '#000000',
        content: '#000000'
      }
    }
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        ':root': {
        '--color_1': theme('colors.brand.DEFAULT'),
        '--color_1': theme('colors.brand.bg'),
        '--color_1-hover': theme('colors.black.bg'),
        '--color_1-light': theme('colors.brand.light'),
        '--color-white': theme('colors.white.DEFAULT'),
        '--color-white': theme('colors.white.content'),
        '--color_1-dark': theme('colors.black.DEFAULT'),
        '--mobile-resolution': theme('screens.md'),
        }
      });
    },
  ],
} satisfies Config
