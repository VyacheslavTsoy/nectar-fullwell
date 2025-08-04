'use strict';

export default {
  content: ['./*/*.{liquid,json,js}'],
  theme: {
    fontSize: {
      xs: ['1.2rem', '1.6rem'],
      sm: ['1.4rem', '2rem'],
      base: ['1.6rem', '2.4rem'],
      baseBig: ['1.8rem', '2.8rem'],
      baseLarge: ['2rem', '2.8rem'],
      xl: ['2.4rem', '3.2rem'],
      '2xl': ['3rem', '3.6rem'],
      '3xl': ['3.6rem', '4rem'],
      '4xl': ['4.8rem', '4.8rem'],
      '5xl': ['6rem', '6rem'],
      '6xl': ['7.2rem', '7.2rem'],
      '7xl': ['9.6rem', '9.6rem'],
      '6xl': ['12.8rem', '12.8rem'],
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1300px',
    },
    extend: {
      fontFamily: {
        Aksen: ['Aksen', 'system-ui'],
        Gazpacho: ['Gazpacho', 'system-ui'],
      },
      container: {
        center: true,
      },
      spacing: {
        30: '7rem',
        32: '8rem',
        34: '9rem',
      },
      boxShadow: {
        'regular': '0 4px 4px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'regular': '8px',
      },
    },
    colors: {
      color_1: {
        DEFAULT: '#1b4c62',
        secondary: '#61A2C7',
        tertiary: '#C1E0EB',
      },
      color_2: {
        DEFAULT: '#5F1F5B',
        secondary: '#A85C9D',
        tertiary: '#E8C7E8',
      },
      color_3: {
        DEFAULT: '#D45E59',
        secondary: '#020617',
        tertiary: '#FFFFFF',
      },
      color_4: {
        DEFAULT: '#CC4E32',
        secondary: '#F4BC96',
        tertiary: '#FFFFFF',
      },
      color_5: {
        DEFAULT: '#5D3091',
        secondary: '#C6B9D9',
        tertiary: '#FFFFFF',
      },
      color_6: {
        DEFAULT: '#2B657C',
        secondary: '#A8D9E6',
        tertiary: '#FFFFFF',
      },
      'light-blue': {
        DEFAULT: '#ECF8FF',
        bg: '#ECF8FF',
        bd: '#ECF8FF',
      },
      white: {
        DEFAULT: '#ffffff',
        bg: '#ffffff',
        content: '#ffffff',
        bd: '#ffffff',
      },
      black: {
        DEFAULT: '#020617',
        bg: '#000000',
        content: '#000000',
        inactive: 'rgba(0, 0, 0, 0.5)',
      },
      lightBlue: {
        DEFAULT: '#c3e6fa',
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
          // Body colors
          '--color-body-content': theme('colors.color_1.content'),
          '--color-body-bg': theme('colors.white.bg'),

          // Brand colors 1 (primary)
          '--color_1': theme('colors.color_1.DEFAULT'),
          '--color_1_secondary': theme('colors.color_1.secondary'),
          '--color_1_tertiary': theme('colors.color_1.tertiary'),

          // Brand colors 2 (secondary)
          '--color_2': theme('colors.color_2.DEFAULT'),
          '--color_2_secondary': theme('colors.color_2.secondary'),
          '--color_2_tertiary': theme('colors.color_2.tertiary'),

           // Brand colors 3 (tertiary)
          '--color_3': theme('colors.color_3.DEFAULT'),
          '--color_3_secondary': theme('colors.color_3.secondary'),
          '--color_3_tertiary': theme('colors.color_3.tertiary'),

           // Brand colors 4 (quaternary)
          '--color_4': theme('colors.color_4.DEFAULT'),
          '--color_4_secondary': theme('colors.color_4.secondary'),
          '--color_4_tertiary': theme('colors.color_4.tertiary'),

          // Brand colors 5 (quinary)
          '--color_5': theme('colors.color_5.DEFAULT'),
          '--color_5_secondary': theme('colors.color_5.secondary'),
          '--color_5_tertiary': theme('colors.color_5.tertiary'),

          // Brand colors 6 (senary)
          '--color_6': theme('colors.color_6.DEFAULT'),
          '--color_6_secondary': theme('colors.color_6.secondary'),
          '--color_6_tertiary': theme('colors.color_6.tertiary'),

          // Light colors
          '--color-white': theme('colors.white.DEFAULT'),

          // Black colors
          '--color-black': theme('colors.black.DEFAULT'),

          // Resolution
          '--small-resolution': theme('screens.sm'),
          '--mobile-resolution': theme('screens.md'),
          '--tablet-resolution': theme('screens.lg'),
          '--desktop-resolution': theme('screens.xl'),

          // Theme Scheme colors
          '--theme-bg': theme('colors.white.DEFAULT'),
          '--theme-text': theme('colors.black.DEFAULT'),
          '--theme-button': theme('colors.color_1.DEFAULT'),
          '--theme-button-label': theme('colors.white.DEFAULT'),
          '--theme-secondary-button-label': theme('colors.black.DEFAULT'),
          '--theme-shadow': theme('colors.black.DEFAULT'),
        },
      });
    },
  ],
};
