import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/bezier-ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: 'var(--color-bg-canvas)',
          deep: 'var(--color-bg-canvas-deep)',
        },
        surface: {
          0: 'var(--color-bg-surface-0)',
          1: 'var(--color-bg-surface-1)',
          2: 'var(--color-bg-surface-2)',
          3: 'var(--color-bg-surface-3)',
          4: 'var(--color-bg-surface-4)',
        },
        ink: {
          DEFAULT: 'var(--color-text-primary)',
          subtle: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          disabled: 'var(--color-text-disabled)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          muted: 'var(--color-accent-muted)',
          subtle: 'var(--color-accent-subtle)',
        },
        danger: 'var(--color-danger)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,240,255,0.15)' },
          '50%': { boxShadow: '0 0 35px rgba(0,240,255,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
