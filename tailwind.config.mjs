/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            DEFAULT: '#0ea5e9', // Sky blue
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          accent: {
            DEFAULT: '#f59e0b', // Amber
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
        },
        neutral: {
          50: '#fafafa',   // Very light gray (backgrounds)
          100: '#f4f4f5',  // Subtle backgrounds
          200: '#e4e4e7',  // Borders
          300: '#d4d4d8',  // Disabled text
          400: '#a1a1aa',  // Placeholder text
          500: '#71717a',  // Secondary text
          600: '#52525b',  // Body text
          700: '#3f3f46',  // Headings
          800: '#27272a',  // Strong headings
          900: '#18181b',  // Primary text
        },
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
      fontSize: {
        // Custom typography scale for clean hierarchy
        'display': ['4.5rem', { lineHeight: '1', fontWeight: '700' }],      // 72px
        'h1': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],        // 60px
        'h2': ['3rem', { lineHeight: '1.1', fontWeight: '600' }],           // 48px
        'h3': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],        // 36px
        'h4': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],       // 30px
        'h5': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],         // 24px
        'lead': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],      // 20px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],         // 16px
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],    // 14px
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
      },
      maxWidth: {
        '8xl': '88rem',   // 1408px
        '9xl': '96rem',   // 1536px
      },
    },
  },
  plugins: [],
}
