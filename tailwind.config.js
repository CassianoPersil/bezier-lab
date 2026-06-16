/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/bezier-ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === Bézier Lab Design Tokens ===
        canvas: {
          DEFAULT: '#0d0d0e',
          deep: '#010102',
        },
        surface: {
          0: '#0f1011',
          1: '#141517',
          2: '#1a1c1f',
          3: '#202328',
          4: '#272b30',
        },
        ink: {
          DEFAULT: '#e8eaed',
          subtle: '#9da3ae',
          muted: '#636b76',
          disabled: '#3d4148',
        },
        border: {
          DEFAULT: '#1e2124',
          strong: '#2a2e33',
        },
        accent: {
          DEFAULT: '#00F0FF',
          muted: '#0099aa',
          subtle: '#005b66',
          glow: 'rgba(0, 240, 255, 0.15)',
        },
        danger: '#ef4444',
        success: '#22c55e',
        warning: '#eab308',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        elevated: '0 4px 6px -1px rgba(0,0,0,0.6), 0 2px 4px -2px rgba(0,0,0,0.6)',
        'glow-cyan': '0 0 20px rgba(0,240,255,0.25)',
        'glow-cyan-lg': '0 0 40px rgba(0,240,255,0.2), 0 0 80px rgba(0,240,255,0.1)',
        modal: '0 25px 50px -12px rgba(0,0,0,0.9)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,240,255,0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(0,240,255,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #0d0d0e 0%, #141517 50%, #0d0d0e 100%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,240,255,0.08) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
