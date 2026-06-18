'use client'

// =============================================================================
// STICKY HERO — Storefront Component
// High-conversion scroll-transform hero section with full-screen video background,
// grayscale typography contrast weight, side-switching layouts, and watermark scrims.
// =============================================================================

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Button, useLanguage } from '@bezier-lab/ui'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function StickyHero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTimeRef = useRef(0)
  
  // Track scroll progress of the entire sticky container (280vh height)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Smooth seeking animation loop with LERP interpolation (easing)
  useEffect(() => {
    let animationFrameId: number
    const video = videoRef.current

    const updateVideoTime = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const diff = targetTimeRef.current - video.currentTime
        if (Math.abs(diff) > 0.002) {
          video.currentTime += diff * 0.15
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoTime)
    }

    animationFrameId = requestAnimationFrame(updateVideoTime)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Active Stage tracking to toggle pointerEvents on absolute elements
  const [activeStage, setActiveStage] = useState(0)

  // Update target scrub time and active stage on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current
    if (video && video.duration && !isNaN(video.duration)) {
      targetTimeRef.current = latest * video.duration
    }

    // Choreograph active stage based on scroll markers
    if (latest <= 0.22) {
      setActiveStage(0)
    } else if (latest > 0.22 && latest <= 0.50) {
      setActiveStage(1)
    } else if (latest > 0.50 && latest <= 0.76) {
      setActiveStage(2)
    } else {
      setActiveStage(3)
    }
  })

  // Symmetrical scroll transitions for the text stages
  
  // Stage 0: Main Hero Text (Left side)
  const stage0Opacity = useTransform(scrollYProgress, [0.0, 0.20], [1, 0])
  const stage0Y = useTransform(scrollYProgress, [0.0, 0.20], [0, -20])

  // Stage 1: Precision (Left side)
  const stage1Opacity = useTransform(scrollYProgress, [0.20, 0.26, 0.48, 0.52], [0, 1, 1, 0])
  const stage1Y = useTransform(scrollYProgress, [0.20, 0.26, 0.48, 0.52], [20, 0, 0, -20])

  // Stage 2: Materials (Right side)
  const stage2Opacity = useTransform(scrollYProgress, [0.48, 0.52, 0.74, 0.78], [0, 1, 1, 0])
  const stage2Y = useTransform(scrollYProgress, [0.48, 0.52, 0.74, 0.78], [20, 0, 0, -20])

  // Stage 3: Delivery (Right side)
  const stage3Opacity = useTransform(scrollYProgress, [0.74, 0.78, 0.98], [0, 1, 1])
  const stage3Y = useTransform(scrollYProgress, [0.74, 0.78, 0.98], [20, 0, 0])

  // Dynamic Scrim transforms: Left Scrim is active for Stage 0 & 1, fades out at Stage 2. Right Scrim fades in.
  const leftScrimOpacity = useTransform(scrollYProgress, [0.46, 0.52], [1, 0])
  const rightScrimOpacity = useTransform(scrollYProgress, [0.46, 0.52], [0, 1])

  // Video stays always present in hero section
  const videoOpacity = 1

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full" id="hero">
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-canvas select-none">
        
        {/* Full-Screen Video Background */}
        <motion.div 
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        >
          <video
            ref={videoRef}
            src="/videos/hero-scroll.mp4?v=3"
            className="w-full h-full object-cover opacity-90 dark:opacity-75"
            playsInline
            muted
            preload="auto"
            style={{ pointerEvents: 'none' }}
          />
          {/* Overlay to ensure text legibility on mobile */}
          <div 
            className="absolute inset-0 md:hidden pointer-events-none" 
            style={{ backgroundColor: 'rgba(var(--color-bg-canvas-rgb, 249, 250, 251), 0.75)' }}
          />
        </motion.div>

        {/* Desktop Left Backdrop Scrim (fades out at Stage 2 so the printer details show clearly) */}
        <motion.div 
          style={{ 
            opacity: leftScrimOpacity,
            background: `linear-gradient(to right, var(--color-bg-canvas) 0%, rgba(var(--color-bg-canvas-rgb, 249, 250, 251), 0.65) 50%, rgba(var(--color-bg-canvas-rgb, 249, 250, 251), 0) 100%)`
          }}
          className="absolute inset-y-0 left-0 w-[45%] pointer-events-none z-10 hidden md:block" 
        />

        {/* Desktop Right Backdrop Scrim (fades in at Stage 2 to cover printer details when text shifts right) */}
        <motion.div 
          style={{ 
            opacity: rightScrimOpacity,
            background: `linear-gradient(to left, var(--color-bg-canvas) 0%, rgba(var(--color-bg-canvas-rgb, 249, 250, 251), 0.75) 55%, rgba(var(--color-bg-canvas-rgb, 249, 250, 251), 0) 100%)`
          }}
          className="absolute inset-y-0 right-0 w-[50%] pointer-events-none z-10 hidden md:block" 
        />

        {/* Bottom-Right Corner Scrim/Blur (perfectly radial circle to soften background watermarks without square outlines) */}
        <div 
          className="absolute bottom-[-120px] right-[-120px] w-[540px] h-[540px] rounded-full pointer-events-none z-10 hidden md:block overflow-hidden" 
          style={{
            background: `radial-gradient(circle at center, var(--color-bg-canvas) 0%, rgba(var(--color-bg-canvas-rgb, 249, 250, 251), 0.9) 30%, rgba(var(--color-bg-canvas-rgb, 249, 250, 251), 0) 65%)`,
            filter: 'blur(16px)'
          }}
        />

        {/* 1. DESKTOP STICKY ANIMATIONS GRID */}
        <div className="relative z-20 w-full h-full max-w-screen-xl mx-auto px-6 hidden md:flex items-center justify-between">
          
          {/* LEFT COLUMN: Stage 0 and Stage 1 */}
          <div className="w-1/2 max-w-lg pr-8 relative h-[500px] flex items-center">
            
            {/* Stage 0 (Main Hero) */}
            <motion.div
              style={{ opacity: stage0Opacity, y: stage0Y, pointerEvents: activeStage === 0 ? 'auto' : 'none' }}
              className="absolute inset-y-0 left-0 flex flex-col justify-center w-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-surface-2 border border-border text-[10px] font-mono text-ink-subtle mb-6 select-none w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {t('hero.badge')}
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
                <span className="text-ink-subtle font-light">{t('hero.title.1')}</span>
                <br />
                <span className="text-ink font-black">{t('hero.title.2')}</span>
                <br />
                <span className="text-ink font-extrabold">{t('hero.title.3')}</span>
              </h1>

              <p className="text-base text-ink-subtle leading-relaxed mb-8">
                {t('hero.desc')}
              </p>

              <div className="flex items-center gap-4">
                <Button
                  id="sticky-cta-primary"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  asChild
                >
                  <Link href="/quote">{t('hero.cta.primary')}</Link>
                </Button>
                <Button
                  id="sticky-cta-secondary"
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <Link href="/portfolio">{t('hero.cta.secondary')}</Link>
                </Button>
              </div>

              {/* Micro-trust indicators */}
              <div className="flex flex-wrap items-center gap-5 mt-10 border-t border-border/30 pt-6">
                {[t('hero.trust.1'), t('hero.trust.2')].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stage 1 (Precision) */}
            <motion.div
              style={{ opacity: stage1Opacity, y: stage1Y, pointerEvents: activeStage === 1 ? 'auto' : 'none' }}
              className="absolute inset-y-0 left-0 flex flex-col justify-center w-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-surface-2 border border-border text-[10px] font-mono text-ink-subtle mb-6 select-none w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {t('hero.scroll.p1.title')}
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
                <span className="text-ink-subtle font-normal">Tolerâncias</span>
                <br />
                <span className="text-ink font-black">Micrométricas.</span>
              </h2>

              <p className="text-base text-ink-subtle leading-relaxed">
                {t('hero.scroll.p1.desc')}
              </p>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Stage 2 and Stage 3 */}
          <div className="w-[36%] max-w-sm pl-4 relative h-[500px] flex items-center ml-auto mr-4 lg:mr-8">
            
            {/* Stage 2 (Materials) */}
            <motion.div
              style={{ opacity: stage2Opacity, y: stage2Y, pointerEvents: activeStage === 2 ? 'auto' : 'none' }}
              className="absolute inset-y-0 right-0 flex flex-col justify-center w-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-surface-2 border border-border text-[10px] font-mono text-ink-subtle mb-6 select-none w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {t('hero.scroll.p2.title')}
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
                <span className="text-ink-subtle font-normal">Polímeros</span>
                <br />
                <span className="text-ink font-black">e Compósitos.</span>
              </h2>

              <p className="text-base text-ink-subtle leading-relaxed">
                {t('hero.scroll.p2.desc')}
              </p>
            </motion.div>

            {/* Stage 3 (Delivery) */}
            <motion.div
              style={{ opacity: stage3Opacity, y: stage3Y, pointerEvents: activeStage === 3 ? 'auto' : 'none' }}
              className="absolute inset-y-0 right-0 flex flex-col justify-center w-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-surface-2 border border-border text-[10px] font-mono text-ink-subtle mb-6 select-none w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {t('hero.scroll.p3.title')}
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
                <span className="text-ink-subtle font-normal">Manufatura</span>
                <br />
                <span className="text-ink font-black">Automatizada.</span>
              </h2>

              <p className="text-base text-ink-subtle leading-relaxed">
                {t('hero.scroll.p3.desc')}
              </p>
            </motion.div>

          </div>

        </div>

        {/* 2. MOBILE FALLBACK LAYOUT (Static, lightweight, high performance) */}
        <div className="relative z-20 w-full min-h-screen px-6 py-24 flex md:hidden flex-col justify-center select-text">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-surface-2 border border-border text-[10px] font-mono text-ink-subtle mb-5 w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {t('hero.badge')}
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight leading-[1.15] mb-5">
            <span className="text-ink-subtle font-light">{t('hero.title.1')}</span>{' '}
            <span className="text-ink font-black">{t('hero.title.2')}</span>{' '}
            <span className="text-ink font-extrabold">{t('hero.title.3')}</span>
          </h1>

          <p className="text-sm text-ink-subtle leading-relaxed mb-8">
            {t('hero.desc')}
          </p>

          <div className="flex flex-col gap-3">
            <Button
              id="mobile-cta-primary"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              asChild
            >
              <Link href="/quote">{t('hero.cta.primary')}</Link>
            </Button>
            <Button
              id="mobile-cta-secondary"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/portfolio">{t('hero.cta.secondary')}</Link>
            </Button>
          </div>

          {/* Simple trust display */}
          <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-border/30">
            {[t('hero.trust.1'), t('hero.trust.2'), t('hero.trust.3')].map((item) => (
              <div key={item} className="text-[10px] text-ink-muted text-center leading-snug">
                <CheckCircle2 className="h-3.5 w-3.5 text-success mx-auto mb-1" />
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
