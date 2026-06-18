'use client'

// =============================================================================
// HOW IT WORKS SCROLL — Storefront Component
// Step-by-step interactive scroll walkthrough
// =============================================================================

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@bezier-lab/ui'
import { UploadCloud, BarChart3, Settings, Truck, CircleDot, FileCode } from 'lucide-react'

// ---------------------------------------------------------------------------
// Step Graphic Mockups
// ---------------------------------------------------------------------------

function StepGraphic({ stepIndex, scrollYProgress }: { stepIndex: number; scrollYProgress: MotionValue<number> }) {
  // Step 1: CAD Upload drop zone
  if (stepIndex === 0) {
    return (
      <div className="relative w-full h-[400px] rounded-xl border border-dashed border-accent/30 bg-surface-0 shadow-md dark:bg-surface-1/40 dark:backdrop-blur-md dark:shadow-none flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="h-16 w-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 text-accent"
        >
          <UploadCloud className="h-8 w-8" />
        </motion.div>
        
        <h4 className="text-base font-semibold text-ink mb-1">Upload CAD Design</h4>
        <p className="text-xs text-ink-muted max-w-xs mb-4">Drag and drop STEP, IGES, or STL files (Max 50MB)</p>
        
        {/* Mock Uploaded File Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-surface-2 border border-border max-w-xs w-full text-left"
        >
          <div className="h-8 w-8 rounded bg-accent/20 flex items-center justify-center text-accent">
            <FileCode className="h-4.5 w-4.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-ink truncate">precision_rotor_v2.step</p>
            <p className="text-[10px] text-ink-muted">14.8 MB · Ready</p>
          </div>
          <span className="text-[10px] text-success font-medium">100%</span>
        </motion.div>

        {/* Diagonal scanned lines */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(45deg,rgba(0,240,255,0.15)_25%,transparent_25%,transparent_50%,rgba(0,240,255,0.15)_50%,rgba(0,240,255,0.15)_75%,transparent_75%,transparent)] bg-[length:40px_40px]" />
      </div>
    )
  }

  // Step 2: Slice Analysis dashboard
  if (stepIndex === 1) {
    return (
      <div className="relative w-full h-[400px] rounded-xl border border-border bg-surface-0 overflow-hidden p-1 shadow-lg dark:bg-surface-1/40 dark:backdrop-blur-md dark:shadow-none">
        {/* Mock CAD Dashboard screenshot */}
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <Image
            src="/images/bezier_cad_dashboard.png"
            alt="Bézier CAD Dashboard Slicer Analysis"
            fill
            className="object-cover opacity-90"
            sizes="(max-w-768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-0 via-transparent to-transparent opacity-60" />
          
          {/* Overlay Diagnostics badge */}
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg border border-accent/20 bg-surface-0/90 dark:bg-surface-1/70 dark:backdrop-blur-sm flex justify-between items-center text-[10px] font-mono text-ink shadow">
            <span className="text-accent flex items-center gap-1.5"><CircleDot className="h-3 w-3 animate-pulse" />SLICING OPTIMIZED</span>
            <span>Est. Mass: 84.2g</span>
            <span>Layers: 620</span>
          </div>
        </div>
      </div>
    )
  }

  // Step 3: Printing Progress telemetry
  if (stepIndex === 2) {
    return (
      <div className="w-full h-[400px] rounded-xl border border-border bg-surface-0 p-6 flex flex-col justify-between shadow-lg dark:bg-surface-1/40 dark:backdrop-blur-md dark:shadow-none relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-accent animate-spin" />
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">FAB_QUEUE: PRINTING</h4>
            </div>
            <span className="text-[10px] font-mono text-ink-muted">EST. REMAINING: 02h 45m</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-ink-muted">Build Array:</span>
              <span className="text-ink font-semibold">UNIT_FDM_09 (ASA-Pro Black)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Chamber Temp:</span>
              <span className="text-ink font-semibold">82.4°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Flow Velocity:</span>
              <span className="text-ink font-semibold">14.2 mm³/s</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2 text-xs font-mono">
            <span className="text-accent font-bold">Print Progress</span>
            <span className="text-ink font-semibold">68.4%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-surface-3 overflow-hidden border border-border">
            <motion.div 
              animate={{ width: ['0%', '68.4%'] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-accent" 
            />
          </div>
        </div>

        {/* Cyberpunk grid overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(var(--color-accent)_1px,transparent_1px)] bg-[size:16px_16px]" />
      </div>
    )
  }

  // Step 4: Shipping tracker
  if (stepIndex === 3) {
    return (
      <div className="w-full h-[400px] rounded-xl border border-border bg-surface-0 p-6 flex flex-col justify-between shadow-lg dark:bg-surface-1/40 dark:backdrop-blur-md dark:shadow-none relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent" />
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">LOG_TRACK: EN ROUTE</h4>
            </div>
            <span className="text-[10px] font-mono text-success font-semibold">ON TIME</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-ink-muted">Carrier:</span>
              <span className="text-ink font-semibold">Bézier Express (Aéreo)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Order ID:</span>
              <span className="text-ink font-semibold">#BZ-88029</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Destination:</span>
              <span className="text-ink font-semibold">Belo Horizonte (MG)</span>
            </div>
          </div>
        </div>

        {/* Shipping steps tracker */}
        <div className="relative border-l border-accent/20 pl-4 py-1 space-y-4 ml-2">
          <div className="relative">
            <span className="absolute left-[-21px] top-1 h-2.5 w-2.5 rounded-full bg-success" />
            <p className="text-[11px] font-bold text-ink">Departed Hub (São Paulo)</p>
            <p className="text-[9px] text-ink-muted font-mono">10:45 AM - Transit</p>
          </div>
          <div className="relative">
            <span className="absolute left-[-21px] top-1 h-2.5 w-2.5 rounded-full bg-accent animate-ping" />
            <span className="absolute left-[-21px] top-1 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="text-[11px] font-bold text-ink">In Air Transit</p>
            <p className="text-[9px] text-ink-muted font-mono">12:30 PM - Active</p>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// ---------------------------------------------------------------------------
// HowItWorksScroll Main Component
// ---------------------------------------------------------------------------

export function HowItWorksScroll() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Capture step changes
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Map 0.0 -> 1.0 to 4 steps
    const step = Math.min(Math.floor(latest * 4), 3)
    if (step !== activeStep) {
      setActiveStep(step)
    }
  })

  const steps = [
    { num: t('how.step1.num'), title: t('how.step1.title'), desc: t('how.step1.desc') },
    { num: t('how.step2.num'), title: t('how.step2.title'), desc: t('how.step2.desc') },
    { num: t('how.step3.num'), title: t('how.step3.title'), desc: t('how.step3.desc') },
    { num: t('how.step4.num'), title: t('how.step4.title'), desc: t('how.step4.desc') },
  ]

  return (
    <div ref={containerRef} className="relative h-[260vh] w-full" id="how-it-works">
      {/* Sticky layout container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-canvas flex flex-col justify-center select-none">
        <div className="max-w-screen-xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Text list of steps */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
                {t('how.title')}
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
                {t('how.desc')}
              </h2>
            </div>

            <div className="space-y-6">
              {steps.map((step, idx) => {
                const isActive = idx === activeStep
                return (
                  <motion.div
                    key={idx}
                    animate={{ 
                      opacity: isActive ? 1.0 : 0.25,
                      scale: isActive ? 1.02 : 1.0,
                      x: isActive ? 8 : 0
                    }}
                    transition={{ duration: 0.28 }}
                    className="flex gap-4 cursor-pointer text-left"
                    onClick={() => {
                      // Scroll to specific part of timeline
                      if (containerRef.current) {
                        const top = containerRef.current.offsetTop
                        const height = containerRef.current.offsetHeight
                        const scrollPos = top + (idx / 4) * (height - window.innerHeight)
                        window.scrollTo({ top: scrollPos + 10, behavior: 'smooth' })
                      }
                    }}
                  >
                    <div className={`text-sm font-mono font-bold leading-none pt-1 ${isActive ? 'text-accent' : 'text-ink-muted'}`}>
                      {step.num}
                    </div>
                    <div>
                      <h3 className={`text-base font-bold mb-1 transition-colors ${isActive ? 'text-ink' : 'text-ink-muted'}`}>
                        {step.title}
                      </h3>
                      {isActive && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-ink-muted leading-relaxed max-w-sm mt-1"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* RIGHT: Dynamic Mockup Container */}
          <div className="hidden md:block relative w-full h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <StepGraphic stepIndex={activeStep} scrollYProgress={scrollYProgress} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}
