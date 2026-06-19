'use client'

// =============================================================================
// HOW IT WORKS SCROLL — Storefront Component
// Step-by-step interactive scroll walkthrough
// =============================================================================

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@bezier-lab/ui'
import { UploadCloud, BarChart3, Settings, Truck, CircleDot, FileCode, Check, Palette, Box, Layers, User, MapPin } from 'lucide-react'

// ---------------------------------------------------------------------------
// Step Graphic Mockups
// ---------------------------------------------------------------------------

function StepGraphic({ stepIndex, scrollYProgress }: { stepIndex: number; scrollYProgress: MotionValue<number> }) {
  const { language } = useLanguage()
  
  // Local state for Step 1
  const [selectedProduct, setSelectedProduct] = React.useState<'planter' | 'coaster'>('planter')
  
  // Local state for Step 2
  const [selectedColor, setSelectedColor] = React.useState<string>('accent')

  // Step 1: Browse / Product Selection Card
  if (stepIndex === 0) {
    return (
      <div className="relative w-full h-[400px] rounded-xl border border-border bg-surface-0 shadow-md dark:bg-surface-1/40 dark:backdrop-blur-md dark:shadow-none flex flex-col p-6 overflow-hidden justify-between">
        <div>
          <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-1">
            {language === 'pt' ? '1. Catálogo Interativo B2B/B2C' : '1. Interactive B2B/B2C Catalog'}
          </h4>
          <p className="text-xs text-ink-muted">
            {language === 'pt' ? 'Selecione um produto premium para iniciar a personalização' : 'Select a premium product to start customization'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 my-auto">
          {/* Hex Planter Option */}
          <div 
            onClick={() => setSelectedProduct('planter')}
            className={`cursor-pointer group relative p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-[200px] ${
              selectedProduct === 'planter' 
                ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                : 'border-border bg-surface-1 hover:border-accent/40'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className={`p-1.5 rounded-lg ${selectedProduct === 'planter' ? 'bg-accent/20 text-accent' : 'bg-surface-2 text-ink-muted'}`}>
                <Box className="h-5 w-5" />
              </span>
              {selectedProduct === 'planter' && (
                <span className="h-4 w-4 rounded-full bg-accent text-white flex items-center justify-center">
                  <Check className="h-2.5 w-2.5" />
                </span>
              )}
            </div>
            <div>
              <p className="text-[10px] text-accent font-mono uppercase tracking-wider font-semibold">B2C Desk Drop</p>
              <h5 className="text-xs font-bold text-ink group-hover:text-accent transition-colors">
                {language === 'pt' ? 'Vaso Hexagonal 3D' : '3D Hex Planter'}
              </h5>
              <p className="text-[10px] text-ink-muted leading-tight mt-1">
                {language === 'pt' ? 'Design geométrico com auto-irrigação' : 'Geometric design with self-watering'}
              </p>
            </div>
          </div>

          {/* Logo Coaster Option */}
          <div 
            onClick={() => setSelectedProduct('coaster')}
            className={`cursor-pointer group relative p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-[200px] ${
              selectedProduct === 'coaster' 
                ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                : 'border-border bg-surface-1 hover:border-accent/40'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className={`p-1.5 rounded-lg ${selectedProduct === 'coaster' ? 'bg-accent/20 text-accent' : 'bg-surface-2 text-ink-muted'}`}>
                <Palette className="h-5 w-5" />
              </span>
              {selectedProduct === 'coaster' && (
                <span className="h-4 w-4 rounded-full bg-accent text-white flex items-center justify-center">
                  <Check className="h-2.5 w-2.5" />
                </span>
              )}
            </div>
            <div>
              <p className="text-[10px] text-accent font-mono uppercase tracking-wider font-semibold">B2B Corporate Gift</p>
              <h5 className="text-xs font-bold text-ink group-hover:text-accent transition-colors">
                {language === 'pt' ? 'Porta-Copos com Logo' : 'Logo Coaster'}
              </h5>
              <p className="text-[10px] text-ink-muted leading-tight mt-1">
                {language === 'pt' ? 'Base de cortiça com relevo paramétrico' : 'Cork base with parametric relief'}
              </p>
            </div>
          </div>
        </div>

        <div className="text-[10px] font-mono text-ink-muted border-t border-border/30 pt-3 flex justify-between">
          <span>CATALOG_STATUS: ACTIVE</span>
          <span>{language === 'pt' ? '2 itens carregados' : '2 items loaded'}</span>
        </div>
      </div>
    )
  }

  // Step 2: Personalize Customization Panel
  if (stepIndex === 1) {
    const colors = [
      { id: 'accent', name: 'Cyber Teal', class: 'bg-[#00f0ff]' },
      { id: 'orange', name: 'Neon Orange', class: 'bg-orange-500' },
      { id: 'purple', name: 'Matte Purple', class: 'bg-purple-500' },
      { id: 'grey', name: 'Carbon Grey', class: 'bg-neutral-600' }
    ]
    return (
      <div className="relative w-full h-[400px] rounded-xl border border-border bg-surface-0 shadow-lg dark:bg-surface-1/40 dark:backdrop-blur-md dark:shadow-none p-6 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-1">
            {language === 'pt' ? '2. Painel de Customização 3D' : '2. 3D Customization Panel'}
          </h4>
          <p className="text-xs text-ink-muted">
            {language === 'pt' ? 'Adicione sua identidade e selecione acabamentos de ponta' : 'Inject your brand identity and select high-end finishes'}
          </p>
        </div>

        <div className="space-y-4 my-auto">
          {/* Logo Upload Section */}
          <div className="p-3 rounded-lg bg-surface-1 border border-border">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-muted block mb-2">
              {language === 'pt' ? 'Upload da Logomarca (SVG/PNG)' : 'Brand Logo Upload (SVG/PNG)'}
            </label>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded border border-accent/20 bg-accent/5 flex items-center justify-center text-accent">
                <FileCode className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink truncate">google_corporate_logo.svg</p>
                <p className="text-[9px] text-ink-muted">Vector format · 128KB · Applied</p>
              </div>
              <span className="text-[10px] text-success font-semibold flex items-center gap-1">
                <Check className="h-3 w-3" /> OK
              </span>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-muted block mb-2">
              {language === 'pt' ? 'Selecione a Cor do Filamento' : 'Select Filament Color'}
            </label>
            <div className="flex items-center gap-3">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor === c.id ? 'border-ink scale-110 ring-2 ring-accent/30' : 'border-border hover:scale-105'
                  }`}
                  title={c.name}
                >
                  <span className={`h-5 w-5 rounded-full ${c.class}`} />
                </button>
              ))}
              <span className="text-[10px] font-mono text-ink-muted ml-auto">
                {colors.find(c => c.id === selectedColor)?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="text-[10px] font-mono text-ink-muted border-t border-border/30 pt-3 flex justify-between">
          <span>ENGINEERING_INTEGRITY: PASSED</span>
          <span>{language === 'pt' ? 'Materiais Premium' : 'Premium Materials'}</span>
        </div>
      </div>
    )
  }

  // Step 3: Printing Progress Telemetry (B2B Order)
  if (stepIndex === 2) {
    return (
      <div className="w-full h-[400px] rounded-xl border border-border bg-surface-0 p-6 flex flex-col justify-between shadow-lg dark:bg-surface-1/40 dark:backdrop-blur-md dark:shadow-none relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-accent animate-spin" />
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                {language === 'pt' ? 'FILA_FAB: IMPRIMINDO' : 'FAB_QUEUE: PRINTING'}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-ink-muted">
              {language === 'pt' ? 'RESTANTE ESTIMADO: 18h 12m' : 'EST. REMAINING: 18h 12m'}
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-ink-muted">{language === 'pt' ? 'Lote de Produção:' : 'Production Batch:'}</span>
              <span className="text-ink font-semibold">PRINT RUN: 50x Branded Planters</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">{language === 'pt' ? 'Material Utilizado:' : 'Material Used:'}</span>
              <span className="text-ink font-semibold">Carbon Fiber (PETG-CF)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">{language === 'pt' ? 'Fazenda Ativa:' : 'Active Farm Grid:'}</span>
              <span className="text-ink font-semibold">12x CoreXY Array (High-Temp)</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2 text-xs font-mono">
            <span className="text-accent font-bold">{language === 'pt' ? 'Progresso do Lote' : 'Batch Progress'}</span>
            <span className="text-ink font-semibold">42.8%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-surface-3 overflow-hidden border border-border">
            <motion.div 
              animate={{ width: ['0%', '42.8%'] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-accent" 
            />
          </div>
        </div>

        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(var(--color-accent)_1px,transparent_1px)] bg-[size:16px_16px]" />
      </div>
    )
  }

  // Step 4: Desk Drop Delivery Routing
  if (stepIndex === 3) {
    return (
      <div className="w-full h-[400px] rounded-xl border border-border bg-surface-0 p-6 flex flex-col justify-between shadow-lg dark:bg-surface-1/40 dark:backdrop-blur-md dark:shadow-none relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-success" />
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                {language === 'pt' ? 'ENTREGA: DESK DROP ATIVO' : 'DELIVERY: DESK DROP ACTIVE'}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-success font-semibold">
              {language === 'pt' ? 'ROTA OTIMIZADA' : 'ROUTING OPTIMIZED'}
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-ink-muted">{language === 'pt' ? 'Destinatário Corporativo:' : 'Corporate Recipient:'}</span>
              <span className="text-ink font-semibold">Google SP HQ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">{language === 'pt' ? 'Status de Distribuição:' : 'Distribution Status:'}</span>
              <span className="text-success font-bold">38 / 50 Desks Delivered</span>
            </div>
          </div>
        </div>

        {/* Shipping steps tracker */}
        <div className="relative border-l border-accent/25 pl-4 py-1 space-y-4 ml-2">
          <div className="relative">
            <span className="absolute left-[-21px] top-1 h-2.5 w-2.5 rounded-full bg-success" />
            <p className="text-[11px] font-bold text-ink">
              {language === 'pt' ? 'Entrega de Lote - Portaria' : 'Bulk Delivery - HQ Loading Dock'}
            </p>
            <p className="text-[9px] text-ink-muted font-mono">10:45 AM · Complete</p>
          </div>
          <div className="relative">
            <span className="absolute left-[-21px] top-1 h-2.5 w-2.5 rounded-full bg-success" />
            <p className="text-[11px] font-bold text-ink">
              {language === 'pt' ? 'Distribuição 4º Andar (MKT)' : 'Floor 4 Distribution (MKT)'}
            </p>
            <p className="text-[9px] text-ink-muted font-mono">11:30 AM · Complete</p>
          </div>
          <div className="relative">
            <span className="absolute left-[-21px] top-1 h-2.5 w-2.5 rounded-full bg-accent animate-ping" />
            <span className="absolute left-[-21px] top-1 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="text-[11px] font-bold text-ink">
              {language === 'pt' ? 'Distribuição 5º Andar (ENG)' : 'Floor 5 Distribution (ENG)'}
            </p>
            <p className="text-[9px] text-accent font-mono font-semibold">
              {language === 'pt' ? 'Em Progresso...' : 'In Progress...'}
            </p>
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
