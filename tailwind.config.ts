import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C41E3A',
          dark: '#9B1B30',
          light: '#E8354A',
          mist: '#FEF2F4',
        },
        silver: {
          DEFAULT: '#8A817C',
          light: '#B0B0B0',
          dark: '#5C5C5C',
        },
        charcoal: '#292524',
        'grey-dark': '#44403C',
        'grey-med': '#78716C',
        'grey-light': '#D6D3D1',
        'warm-grey': '#A8A29E',
        offwhite: '#F5F5F4',
        cream: '#FAFAF9',
        sand: '#E7E5E4',
        brand: {
          black: '#1C1917',
          charcoal: '#292524',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-mobile': ['2.5rem', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '800' }],
        display: ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1-mobile': ['2rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        h1: ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2-mobile': ['1.75rem', { lineHeight: '1.2' }],
        h2: ['2.25rem', { lineHeight: '1.2' }],
        'h3-mobile': ['1.375rem', { lineHeight: '1.2' }],
        h3: ['1.75rem', { lineHeight: '1.2' }],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0,0,0,0.12)',
        md: '0 8px 24px rgba(0,0,0,0.2)',
        lg: '0 16px 48px rgba(0,0,0,0.3)',
        glow: '0 0 24px rgba(196,30,58,0.3)',
        'glow-lg': '0 0 48px rgba(196,30,58,0.25)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #9B1B30, #C41E3A, #E8354A)',
        'dark-gradient': 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
        'ember-glow': 'linear-gradient(135deg, #0A0A0A 0%, #9B1B30 100%)',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1.0) translateX(0%) translateY(0%)' },
          '33%': { transform: 'scale(1.08) translateX(-1%) translateY(-0.5%)' },
          '66%': { transform: 'scale(1.05) translateX(1%) translateY(0.5%)' },
          '100%': { transform: 'scale(1.0) translateX(0%) translateY(0%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'curtain-reveal': {
          '0%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 20s ease-in-out infinite',
        'fade-up': 'fade-up 500ms ease-out forwards',
        'fade-in': 'fade-in 400ms ease-out forwards',
        'curtain-reveal': 'curtain-reveal 800ms cubic-bezier(0.76,0,0.24,1) forwards',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      screens: {
        xs: '375px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
