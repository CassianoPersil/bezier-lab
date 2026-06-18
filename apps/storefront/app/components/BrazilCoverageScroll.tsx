'use client'

// =============================================================================
// BRAZIL COVERAGE SCROLL — Storefront Component
// Logistics & shipping map scroll-transform section
// =============================================================================

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useLanguage } from '@bezier-lab/ui'
import { MapPin, Plane, ShieldAlert, Award, Compass } from 'lucide-react'

// ---------------------------------------------------------------------------
// Constants for City Coordinates on the map grid
// ---------------------------------------------------------------------------
const MAP_WIDTH = 450
const MAP_HEIGHT = 450

// Hub: São Paulo
const HUB = { x: 260, y: 310, label: 'São Paulo (Hub)' }

const CITIES = [
  { x: 305, y: 295, label: 'Rio de Janeiro' },
  { x: 280, y: 255, label: 'Belo Horizonte' },
  { x: 215, y: 215, label: 'Brasília' },
  { x: 200, y: 390, label: 'Porto Alegre' },
  { x: 140, y: 325, label: 'Curitiba' },
  { x: 345, y: 155, label: 'Salvador' },
  { x: 390, y: 110, label: 'Recife' },
  { x: 375, y: 80, label: 'Fortaleza' },
  { x: 90, y: 120, label: 'Manaus' },
]

// Helper to calculate quadratic curve between hub and capital
const getCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
  // Midpoint
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  // Perpendicular offset to make it a beautiful arch
  const dx = x2 - x1
  const dy = y2 - y1
  const dist = Math.sqrt(dx * dx + dy * dy)
  
  const ox = -dy * (30 / dist)
  const oy = dx * (30 / dist)

  const cx = mx + ox
  const cy = my + oy

  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

// ---------------------------------------------------------------------------
// Brazil Map Graphic - Tilts and animates splines based on scroll
// ---------------------------------------------------------------------------
function InteractiveBrazilMap({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Transform values for 3D tilt
  const tiltX = useTransform(scrollYProgress, [0.0, 0.45], [0, 50])
  const rotateZ = useTransform(scrollYProgress, [0.0, 0.45], [0, -12])
  const mapScale = useTransform(scrollYProgress, [0.0, 0.45, 0.85, 1.0], [0.9, 1.15, 1.15, 0.95])
  
  // Transform for path animation (dashoffset)
  const pathDashOffset = useTransform(scrollYProgress, [0.35, 0.72], [150, 0])
  
  // Opacity transforms for cities and grid lines
  const elementsOpacity = useTransform(scrollYProgress, [0.3, 0.48], [0, 1])

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center" style={{ perspective: 1000 }}>
      <motion.div
        style={{
          rotateX: tiltX,
          rotateZ: rotateZ,
          scale: mapScale,
          transformStyle: 'preserve-3d',
        }}
        className="w-[450px] h-[450px] relative transition-shadow duration-500 rounded-2xl bg-surface-0 border border-border-strong/20 dark:bg-surface-1/10 dark:border-border/10 shadow-2xl dark:shadow-none backdrop-blur-xs flex items-center justify-center"
      >
        <svg 
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} 
          className="w-full h-full text-border/40 select-none pointer-events-none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Brazil High-tech Grid Mesh Simulation */}
          <motion.path
            style={{ opacity: elementsOpacity }}
            d="M170 50 L250 40 L340 70 L390 100 L410 140 L370 200 L320 280 L290 350 L270 410 L230 430 L180 410 L150 350 L110 320 L75 250 L40 180 L50 120 L90 80 Z"
            stroke="currentColor"
            className="text-border-strong dark:text-border-default/50"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="rgba(0, 240, 255, 0.01)"
          />

          <motion.path
            style={{ opacity: elementsOpacity }}
            d="M90 80 L180 150 L280 255 M110 320 L215 215 L340 70 M50 120 L215 215 L390 100 M170 50 L180 150 L260 310"
            stroke="currentColor"
            className="text-border-strong/50 dark:text-border-strong/15 opacity-20"
            strokeWidth="0.8"
            strokeDasharray="6 6"
          />

          {/* Shipping lane spline routes */}
          {CITIES.map((city, idx) => {
            const curvePath = getCurvePath(HUB.x, HUB.y, city.x, city.y)
            return (
              <g key={idx}>
                {/* Glowing underglow line */}
                <motion.path
                  d={curvePath}
                  stroke="var(--color-accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 150,
                    strokeDashoffset: pathDashOffset,
                    opacity: 0.2,
                  }}
                />
                {/* Active path line */}
                <motion.path
                  d={curvePath}
                  stroke="var(--color-accent)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 150,
                    strokeDashoffset: pathDashOffset,
                  }}
                />
              </g>
            )
          })}

          {/* Hub node (São Paulo) */}
          <g>
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r="7"
              fill="var(--color-accent)"
              style={{ opacity: elementsOpacity }}
            />
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r="14"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              className="animate-pulse"
              style={{ opacity: elementsOpacity }}
            />
          </g>

          {/* Capital cities destination nodes */}
          {CITIES.map((city, idx) => (
            <g key={idx}>
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="4.5"
                fill="currentColor"
                className="text-ink"
                style={{ opacity: elementsOpacity }}
              />
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="8.5"
                stroke="var(--color-accent)"
                strokeWidth="1"
                className="opacity-40"
                style={{ opacity: elementsOpacity }}
              />
            </g>
          ))}
        </svg>

        {/* Floating labels for key logistics hubs */}
        <motion.div 
          style={{ opacity: elementsOpacity }}
          className="absolute left-8 bottom-32 bg-surface-2/80 border border-border px-2 py-1 rounded text-[9px] font-mono text-ink shadow"
        >
          MAO // Manaus
        </motion.div>
        
        <motion.div 
          style={{ opacity: elementsOpacity }}
          className="absolute right-4 top-24 bg-surface-2/80 border border-border px-2 py-1 rounded text-[9px] font-mono text-ink shadow"
        >
          REC // Recife
        </motion.div>
        
        <motion.div 
          style={{ opacity: elementsOpacity }}
          className="absolute right-12 bottom-36 bg-surface-2/80 border border-border px-2 py-1 rounded text-[9px] font-mono text-accent font-bold shadow-lg border-accent/30"
        >
          GRU // SP CENTRAL HUB
        </motion.div>
      </motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// BrazilCoverageScroll Main Component
// ---------------------------------------------------------------------------

export function BrazilCoverageScroll() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Fade-in positions for left stats cards
  const stats1Opacity = useTransform(scrollYProgress, [0.32, 0.45, 0.88, 0.95], [0, 1, 1, 0])
  const stats1Y = useTransform(scrollYProgress, [0.32, 0.45], [20, 0])
  
  const stats2Opacity = useTransform(scrollYProgress, [0.5, 0.65, 0.88, 0.95], [0, 1, 1, 0])
  const stats2Y = useTransform(scrollYProgress, [0.5, 0.65], [20, 0])
  
  const stats3Opacity = useTransform(scrollYProgress, [0.68, 0.8, 0.88, 0.95], [0, 1, 1, 0])
  const stats3Y = useTransform(scrollYProgress, [0.68, 0.8], [20, 0])

  return (
    <div ref={containerRef} className="relative h-[260vh] w-full" id="coverage">
      {/* Sticky viewport content wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-canvas flex flex-col justify-center select-none">
        <div className="max-w-screen-xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Logistics descriptions */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-accent animate-pulse" />
                {t('coverage.title')}
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
                {t('coverage.desc')}
              </h2>
            </div>

            {/* Logistics stats blocks */}
            <div className="space-y-4">
              {/* Stat 1 */}
              <motion.div 
                style={{ opacity: stats1Opacity, y: stats1Y }}
                className="p-4 rounded-xl border border-border-strong/20 bg-surface-0 shadow-md dark:border-border dark:bg-surface-1/40 dark:backdrop-blur-sm dark:shadow-none flex items-start gap-4"
              >
                <div className="h-8 w-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">{t('coverage.stat.1')}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{t('coverage.stat.1.desc')}</p>
                </div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div 
                style={{ opacity: stats2Opacity, y: stats2Y }}
                className="p-4 rounded-xl border border-border-strong/20 bg-surface-0 shadow-md dark:border-border dark:bg-surface-1/40 dark:backdrop-blur-sm dark:shadow-none flex items-start gap-4"
              >
                <div className="h-8 w-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Plane className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">{t('coverage.stat.2')}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{t('coverage.stat.2.desc')}</p>
                </div>
              </motion.div>

              {/* Stat 3 */}
              <motion.div 
                style={{ opacity: stats3Opacity, y: stats3Y }}
                className="p-4 rounded-xl border border-border-strong/20 bg-surface-0 shadow-md dark:border-border dark:bg-surface-1/40 dark:backdrop-blur-sm dark:shadow-none flex items-start gap-4"
              >
                <div className="h-8 w-8 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center text-success shrink-0">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">{t('coverage.stat.3')}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{t('coverage.stat.3.desc')}</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Tilting Map */}
          <div className="hidden md:block w-full">
            <InteractiveBrazilMap scrollYProgress={scrollYProgress} />
          </div>

        </div>
      </div>
    </div>
  )
}
