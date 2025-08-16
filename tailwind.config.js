'use strict';

export default {
    content: [
        './**/*.{liquid,html,js,json}',
        '!./node_modules/**/*',
      ],
  theme: {
    fontSize: {
      xs: ['1.2rem', '1.6rem'],
      sm: ['1.4rem', '2rem'],
      base: ['1.6rem', '2.4rem'],
      baseLg: ['2rem', '2.4rem'],
      lg: ['2.6rem', '2.8rem'],
      xl: ['2.8rem', '3.2rem'],
      '2xl': ['3rem', '3.6rem'],
      '3xl': ['3.6rem', '4rem'],
      '4xl': ['4.4rem', '5.2rem'],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1300px',
    },
    container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '100%',
        },
    },
    extend: {
      fontFamily: {
        ValuesSans: ['Values Sans', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
        Atkinson: ['Atkinson', 'sans-serif'],
      },
      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
        },
      },
      spacing: {
        30: '7rem',
        32: '8rem',
        34: '9rem',
      },
    },
    colors: {
      white: {
        DEFAULT: '#ffffff',
        bg: '#ffffff',
        content: '#ffffff',
        bd: '#ffffff',
      },
      black: {
        DEFAULT: '#000000',
        bg: '#000000',
        content: '#000000',
        inactive: 'rgba(0, 0, 0, 0.5)',
      },
      lightGrey: {
        DEFAULT: '#FAFAFA',
      },
      aliceBlue: {
        DEFAULT: '#F1FAFF',
      },
      water: {
        DEFAULT: '#DDEEFF',
      },
      lightAzure: {
        DEFAULT: '#75BDFF',
      },
      brilliantAzure: {
        DEFAULT: '#42A4FF',
      },
      coolBlack: {
        DEFAULT: '#0D3063',
      },
      palePink: {
        DEFAULT: '#FADCDC',
      },
      sunsetOrange: {
        DEFAULT: '#FF5C5C',
      },
      ueRed: {
        DEFAULT: '#B40202',
      },
      nyanza: {
        DEFAULT: '#E4FEE5',
      },
      greenCrayola: {
        DEFAULT: '#1DA372',
      },
      slimyGreen: {
        DEFAULT: '#21A600',
      },
      laSalleGreen: {
        DEFAULT: '#037C2B',
      },
      scheme: {
        bg: 'var(--theme-color-bg)',
        primary: 'var(--theme-color-primary)',
        secondary: 'var(--theme-color-secondary)',
        tertiary: 'var(--theme-color-tertiary)',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-white': theme('colors.white.DEFAULT'),
          '--color-black': theme('colors.black.DEFAULT'),
          '--color-lightGrey': theme('colors.lightGrey.DEFAULT'),
          '--color-aliceBlue': theme('colors.aliceBlue.DEFAULT'),
          '--color-water': theme('colors.water.DEFAULT'),
          '--color-lightAzure': theme('colors.lightAzure.DEFAULT'),
          '--color-brilliantAzure': theme('colors.brilliantAzure.DEFAULT'),
          '--color-coolBlack': theme('colors.coolBlack.DEFAULT'),
          '--color-palePink': theme('colors.palePink.DEFAULT'),
          '--color-sunsetOrange': theme('colors.sunsetOrange.DEFAULT'),
          '--color-ueRed': theme('colors.ueRed.DEFAULT'),
          '--color-nyanza': theme('colors.nyanza.DEFAULT'),
          '--color-greenCrayola': theme('colors.greenCrayola.DEFAULT'),
          '--color-slimyGreen': theme('colors.slimyGreen.DEFAULT'),
          '--color-laSalleGreen': theme('colors.laSalleGreen.DEFAULT'),
          '--font-size-xs': theme('fontSize.xs'),
          '--font-size-sm': theme('fontSize.sm'),
          '--font-size-base': theme('fontSize.base'),
          '--font-size-baseLg': theme('fontSize.baseLg'),
          '--font-size-lg': theme('fontSize.lg'),
          '--font-size-xl': theme('fontSize.xl'),
          '--font-size-2xl': theme('fontSize.2xl'),
          '--font-size-3xl': theme('fontSize.3xl'),
          '--font-size-4xl': theme('fontSize.4xl'),
          '--font-weight-normal': String(theme('fontWeight.normal')),
          '--font-weight-medium': String(theme('fontWeight.medium')),
          '--font-weight-bold': String(theme('fontWeight.bold')),
          '--font-weight-black': String(theme('fontWeight.black')),
          '--font-family-poppins': String(theme('fontFamily.Poppins')),
          '--font-family-values-sans': String(theme('fontFamily.ValuesSans')),
          '--font-family-atkinson': String(theme('fontFamily.Atkinson')),
        },
      });
    },
  ],
};
