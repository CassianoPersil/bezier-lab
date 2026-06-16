// =============================================================================
// BÉZIER LAB — DESIGN TOKENS
// Semantic token system inspired by Linear.app's "Dark Mode Tech" aesthetic.
// =============================================================================

// ---------------------------------------------------------------------------
// COLOR PALETTE — Raw scale values (primitives)
// ---------------------------------------------------------------------------
export const colorPrimitive = {
  // Canvas / Background
  black: '#000000',
  canvas: '#0d0d0e',
  canvasDeep: '#010102',

  // Surfaces (elevation layers)
  surface0: '#0f1011',
  surface1: '#141517',
  surface2: '#1a1c1f',
  surface3: '#202328',
  surface4: '#272b30',

  // Borders / Hairlines
  hairline: '#1e2124',
  hairlineStrong: '#2a2e33',

  // Ink (text)
  inkBase: '#e8eaed',
  inkSubtle: '#9da3ae',
  inkMuted: '#636b76',
  inkDisabled: '#3d4148',

  // Accent — Electric Cyan
  cyan50: '#e0fdff',
  cyan100: '#b3f9ff',
  cyan200: '#6ef4ff',
  cyan300: '#29eeff',
  cyan400: '#00e5f7',
  cyan500: '#00c8d9',  // base
  cyanAccent: '#00F0FF', // brand accent
  cyan600: '#0099aa',
  cyan700: '#007a88',
  cyan800: '#005b66',
  cyan900: '#003c44',

  // Semantic colors
  red400: '#f87171',
  red500: '#ef4444',
  red900: '#7f1d1d',
  green400: '#4ade80',
  green500: '#22c55e',
  green900: '#14532d',
  yellow400: '#facc15',
  yellow500: '#eab308',
  yellow900: '#713f12',
  purple400: '#c084fc',
  purple500: '#a855f7',
} as const

// ---------------------------------------------------------------------------
// COLOR TOKENS — Semantic aliases
// ---------------------------------------------------------------------------
export const colors = {
  // Backgrounds
  'bg-canvas': colorPrimitive.canvas,
  'bg-canvas-deep': colorPrimitive.canvasDeep,
  'bg-surface-0': colorPrimitive.surface0,
  'bg-surface-1': colorPrimitive.surface1,
  'bg-surface-2': colorPrimitive.surface2,
  'bg-surface-3': colorPrimitive.surface3,
  'bg-surface-4': colorPrimitive.surface4,

  // Borders
  'border-default': colorPrimitive.hairline,
  'border-strong': colorPrimitive.hairlineStrong,

  // Text
  'text-primary': colorPrimitive.inkBase,
  'text-secondary': colorPrimitive.inkSubtle,
  'text-muted': colorPrimitive.inkMuted,
  'text-disabled': colorPrimitive.inkDisabled,

  // Accent
  'accent-default': colorPrimitive.cyanAccent,
  'accent-muted': colorPrimitive.cyan600,
  'accent-subtle': colorPrimitive.cyan800,
  'accent-glow': 'rgba(0, 240, 255, 0.15)',

  // Status
  'status-danger': colorPrimitive.red500,
  'status-danger-bg': colorPrimitive.red900,
  'status-success': colorPrimitive.green500,
  'status-success-bg': colorPrimitive.green900,
  'status-warning': colorPrimitive.yellow500,
  'status-warning-bg': colorPrimitive.yellow900,
  'status-info': colorPrimitive.cyan500,
} as const

// ---------------------------------------------------------------------------
// TYPOGRAPHY
// ---------------------------------------------------------------------------
export const fontFamily = {
  sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
} as const

export const fontSize = {
  'display-2xl': '4.5rem',   // 72px
  'display-xl': '3.75rem',   // 60px
  'display-lg': '3rem',      // 48px
  'display-md': '2.25rem',   // 36px
  'display-sm': '1.875rem',  // 30px
  'headline': '1.5rem',      // 24px
  'title-lg': '1.25rem',     // 20px
  'title-md': '1.125rem',    // 18px
  'body-lg': '1rem',         // 16px
  'body-md': '0.9375rem',    // 15px
  'body-sm': '0.875rem',     // 14px
  'label-lg': '0.875rem',    // 14px
  'label-md': '0.8125rem',   // 13px
  'label-sm': '0.75rem',     // 12px
  'mono': '0.875rem',        // 14px
} as const

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const

export const lineHeight = {
  tight: '1.2',
  snug: '1.35',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const

export const letterSpacing = {
  tighter: '-0.04em',
  tight: '-0.025em',
  snug: '-0.015em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

// ---------------------------------------------------------------------------
// SPACING — 4pt grid
// ---------------------------------------------------------------------------
export const spacing = {
  '0': '0px',
  '0.5': '2px',
  '1': '4px',
  '1.5': '6px',
  '2': '8px',
  '2.5': '10px',
  '3': '12px',
  '3.5': '14px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
  '11': '44px',
  '12': '48px',
  '14': '56px',
  '16': '64px',
  '18': '72px',
  '20': '80px',
  '24': '96px',
  '28': '112px',
  '32': '128px',
  '36': '144px',
  '40': '160px',
  '48': '192px',
  '56': '224px',
  '64': '256px',
  '72': '288px',
  '80': '320px',
  '96': '384px',
} as const

// ---------------------------------------------------------------------------
// BORDER RADIUS
// ---------------------------------------------------------------------------
export const borderRadius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
} as const

// ---------------------------------------------------------------------------
// ELEVATION / SHADOWS
// ---------------------------------------------------------------------------
export const shadow = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px -1px rgba(0, 0, 0, 0.6)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.6)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.7)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 8px 10px -6px rgba(0, 0, 0, 0.8)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)',
  'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.25)',
  'glow-cyan-lg': '0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(0, 240, 255, 0.1)',
  'card': '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
} as const

// ---------------------------------------------------------------------------
// ANIMATION / MOTION
// ---------------------------------------------------------------------------
export const duration = {
  instant: '0ms',
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '700ms',
} as const

export const easing = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const

// ---------------------------------------------------------------------------
// Z-INDEX
// ---------------------------------------------------------------------------
export const zIndex = {
  below: '-1',
  base: '0',
  raised: '10',
  dropdown: '100',
  sticky: '200',
  overlay: '300',
  modal: '400',
  popover: '500',
  toast: '600',
  tooltip: '700',
} as const

// ---------------------------------------------------------------------------
// BREAKPOINTS
// ---------------------------------------------------------------------------
export const breakpoint = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// ---------------------------------------------------------------------------
// MASTER TOKEN EXPORT
// ---------------------------------------------------------------------------
export const tokens = {
  colors,
  colorPrimitive,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  spacing,
  borderRadius,
  shadow,
  duration,
  easing,
  zIndex,
  breakpoint,
} as const

export type Tokens = typeof tokens
export type ColorToken = keyof typeof colors
export type SpacingToken = keyof typeof spacing
export type FontSizeToken = keyof typeof fontSize
