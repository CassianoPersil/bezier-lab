'use client'

// =============================================================================
// STOREFRONT — Landing Page
// High-conversion marketing page for Bézier Lab
// =============================================================================

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from './components/Header'
import { StickyHero } from './components/StickyHero'
import { LogoTicker } from './components/LogoTicker'
import { HowItWorksScroll } from './components/HowItWorksScroll'
import { BrazilCoverageScroll } from './components/BrazilCoverageScroll'
import { Footer } from './components/Footer'
import { Button, Badge, Card, CardContent, useLanguage } from '@bezier-lab/ui'
import {
  ArrowRight,
  Zap,
  Shield,
  Layers,
  Cpu,
  CheckCircle2,
  Package,
  Clock,
  Star,
  ChevronRight,
  Box,
  Settings,
  Globe,
  Gift,
  Sparkles,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Stats Section
// ---------------------------------------------------------------------------
function StatsSection() {
  const { t } = useLanguage()

  const stats = [
    { value: '10,000+', label: t('stats.parts') },
    { value: '98.7%', label: t('stats.quality') },
    { value: '48h', label: t('stats.turnaround') },
    { value: '150+', label: t('stats.clients') },
  ]

  return (
    <section className="py-20 border-y border-border bg-canvas-deep" id="stats">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl font-extrabold tracking-tight text-gradient-cyan mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-ink-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Features Section
// ---------------------------------------------------------------------------
function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Cpu,
      title: t('features.f1.title'),
      description: t('features.f1.desc'),
      color: '#00F0FF',
    },
    {
      icon: Layers,
      title: t('features.f2.title'),
      description: t('features.f2.desc'),
      color: '#c084fc',
    },
    {
      icon: Shield,
      title: t('features.f3.title'),
      description: t('features.f3.desc'),
      color: '#4ade80',
    },
    {
      icon: Zap,
      title: t('features.f4.title'),
      description: t('features.f4.desc'),
      color: '#facc15',
    },
    {
      icon: Box,
      title: t('features.f5.title'),
      description: t('features.f5.desc'),
      color: '#f87171',
    },
    {
      icon: Globe,
      title: t('features.f6.title'),
      description: t('features.f6.desc'),
      color: '#6ef4ff',
    },
  ]

  return (
    <section className="py-32" id="services">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <Badge variant="accent" className="mb-4">{t('features.badge')}</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-ink-subtle max-w-2xl mx-auto">
            {t('features.desc')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group surface-card p-6 hover:border-accent/30 transition-all duration-200"
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-5"
                style={{
                  backgroundColor: `${feature.color}15`,
                  border: `1px solid ${feature.color}25`,
                  boxShadow: `0 0 20px ${feature.color}10`,
                }}
              >
                <feature.icon className="h-5 w-5" style={{ color: feature.color }} />
              </div>
              <h3 className="text-base font-semibold text-ink mb-2 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Portfolio Section
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Product Categories Section (Bento Grid)
// ---------------------------------------------------------------------------
function ProductCategoriesSection() {
  const { language } = useLanguage()
  const [selectedMaterial, setSelectedMaterial] = React.useState<'cf' | 'tpu' | 'resin'>('cf')

  const materials = {
    cf: {
      name: language === 'pt' ? 'Fibra de Carbono (PETG-CF)' : 'Carbon Fiber (PETG-CF)',
      tag: language === 'pt' ? 'Rigidez Estrutural' : 'Structural Rigidity',
      strength: '65 MPa',
      temp: '80°C',
      tactile: language === 'pt' ? 'Fosco, microtexturizado' : 'Matte, micro-textured',
      desc: language === 'pt' ? 'Polímero reforçado com 15% de fibras curtas de carbono para componentes de alta carga.' : 'Polymer reinforced with 15% carbon fibers for structural load-bearing components.'
    },
    tpu: {
      name: language === 'pt' ? 'TPU Flexível (95A)' : 'Flexible TPU (95A)',
      tag: language === 'pt' ? 'Absorção de Impacto' : 'Impact Absorption',
      strength: '450% Elongation',
      temp: '60°C',
      tactile: language === 'pt' ? 'Emborrachado, flexível' : 'Rubberized, flexible',
      desc: language === 'pt' ? 'Elastômero com excelente resistência à abrasão e alta flexibilidade para amortecedores e grips.' : 'Elastomer with excellent abrasion resistance and flexibility for dampeners and custom grips.'
    },
    resin: {
      name: language === 'pt' ? 'Resina SLA de Alta Definição' : 'High-Detail SLA Resin',
      tag: language === 'pt' ? 'Resolução Microscópica' : 'Microscopic Resolution',
      strength: '45 MPa',
      temp: '50°C',
      tactile: language === 'pt' ? 'Liso como vidro, ultra detalhado' : 'Glass-smooth, ultra-detailed',
      desc: language === 'pt' ? 'Polimerização por luz para acabamentos estéticos perfeitos e detalhes de até 25 micrômetros.' : 'Light-cured polymer for pristine aesthetics and fine details down to 25 microns.'
    }
  }

  return (
    <section className="py-32 bg-canvas border-y border-border" id="categories">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge variant="accent" className="mb-4">
            {language === 'pt' ? 'Categorias de Produtos' : 'Product Categories'}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4">
            {language === 'pt' ? 'Explore o Nosso Ecossistema 3D' : 'Explore Our 3D Ecosystem'}
          </h2>
          <p className="text-lg text-ink-subtle max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Conectando designs curados e personalização avançada com materiais de engenharia de elite.' 
              : 'Connecting curated designs and advanced customization with elite engineering-grade materials.'}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: B2B Corporate Gifts (Span 2 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-border bg-surface-0 p-8 flex flex-col justify-between min-h-[360px] shadow-lg transition-all duration-300 hover:border-accent/30"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-all duration-500" />
            
            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <Badge variant="accent" className="mb-6">
                    {language === 'pt' ? 'Corporativo (B2B)' : 'Corporate (B2B)'}
                  </Badge>
                  <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
                    <Gift className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-ink mb-3 group-hover:text-accent transition-colors">
                  {language === 'pt' ? 'Brindes Corporativos' : 'Corporate Gifts'}
                </h3>
                <p className="text-sm text-ink-subtle leading-relaxed max-w-md">
                  {language === 'pt'
                    ? 'Organizadores de mesa personalizados com a logomarca da sua empresa, placas comemorativas elegantes e acessórios de escritório exclusivos de alta fidelidade.'
                    : 'Desktop organizers custom-branded with your company logo, elegant commemorative plaques, and high-fidelity premium office accessories.'}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border/30 pt-6">
                {[
                  { label: language === 'pt' ? 'Organizadores' : 'Organizers', val: 'FDM/Resin' },
                  { label: language === 'pt' ? 'Branding' : 'Branding', val: language === 'pt' ? 'Relevo 3D' : '3D Relief' },
                  { label: language === 'pt' ? 'Volume' : 'Volume', val: '50-1000+ pcs' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <p className="text-[10px] uppercase font-mono text-ink-muted">{item.label}</p>
                    <p className="text-xs font-semibold text-ink mt-0.5">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: B2C Desk Drops (Span 1 column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-surface-0 p-8 flex flex-col justify-between min-h-[360px] shadow-lg transition-all duration-300 hover:border-accent/30"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-purple-500/5 rounded-full blur-[60px] group-hover:bg-purple-500/10 transition-all duration-500" />
            
            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <Badge variant="accent" className="mb-6 bg-purple-500/15 border-purple-500/25 text-purple-400">
                    {language === 'pt' ? 'Estilo de Vida (B2C)' : 'Lifestyle (B2C)'}
                  </Badge>
                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-ink mb-3 group-hover:text-purple-400 transition-colors">
                  {language === 'pt' ? 'Drops de Mesa' : 'Desk Drops'}
                </h3>
                <p className="text-sm text-ink-subtle leading-relaxed">
                  {language === 'pt'
                    ? 'Vasos geométricos auto-irrigáveis, suportes ergonômicos para smartphones e fidgets mecânicos com movimento suave.'
                    : 'Self-watering geometric planters, ergonomic phone stands, and tactile mechanical fidget toys with ultra-smooth motion.'}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/30 pt-6">
                {[
                  { label: language === 'pt' ? 'Acabamento' : 'Finish', val: language === 'pt' ? 'Fosco Sedoso' : 'Silk Matte' },
                  { label: language === 'pt' ? 'Unidades' : 'Units', val: language === 'pt' ? 'Sem Mínimo' : 'No Minimum' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <p className="text-[10px] uppercase font-mono text-ink-muted">{item.label}</p>
                    <p className="text-xs font-semibold text-ink mt-0.5">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Premium Materials Catalog (Span 3 columns - Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 group relative overflow-hidden rounded-3xl border border-border bg-surface-0 p-8 shadow-lg transition-all duration-300 hover:border-accent/20"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[250px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
              {/* Header and Selectors */}
              <div className="lg:w-2/5 flex flex-col justify-between h-full w-full">
                <div>
                  <Badge variant="accent" className="mb-6">
                    {language === 'pt' ? 'Catálogo de Materiais' : 'Materials Catalog'}
                  </Badge>
                  <h3 className="text-2xl font-bold text-ink mb-3">
                    {language === 'pt' ? 'Materiais de Alta Performance' : 'High-Performance Materials'}
                  </h3>
                  <p className="text-sm text-ink-subtle leading-relaxed mb-6">
                    {language === 'pt'
                      ? 'Nossos produtos são impressos com polímeros avançados. Selecione um material ao lado para inspecionar as propriedades mecânicas estruturais.'
                      : 'Our products are printed with engineered polymers. Select a material to inspect its mechanical and structural properties.'}
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  {(['cf', 'tpu', 'resin'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMaterial(m)}
                      className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                        selectedMaterial === m
                          ? 'border-accent bg-accent/5 ring-1 ring-accent'
                          : 'border-border bg-surface-1 hover:border-accent/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${
                          m === 'cf' ? 'bg-neutral-500' : m === 'tpu' ? 'bg-purple-500' : 'bg-cyan-400'
                        }`} />
                        <span className="text-xs font-bold text-ink">
                          {m === 'cf' ? 'Carbon Fiber (PETG-CF)' : m === 'tpu' ? 'Flexible TPU (95A)' : 'SLA Resin'}
                        </span>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform ${selectedMaterial === m ? 'text-accent translate-x-1' : 'text-ink-muted'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Detail Pane */}
              <div className="lg:w-3/5 w-full bg-surface-1 border border-border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className="flex items-start justify-between border-b border-border/30 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                      {materials[selectedMaterial].tag}
                    </span>
                    <h4 className="text-lg font-bold text-ink mt-0.5">
                      {materials[selectedMaterial].name}
                    </h4>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px] uppercase text-accent border-accent/20 bg-accent/5">
                    {selectedMaterial === 'cf' ? 'FDM' : selectedMaterial === 'tpu' ? 'FDM Flex' : 'SLA'}
                  </Badge>
                </div>

                <p className="text-xs text-ink-subtle leading-relaxed mb-6">
                  {materials[selectedMaterial].desc}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs border-t border-border/30 pt-4">
                  <div>
                    <span className="text-ink-muted block text-[10px] uppercase tracking-wider">
                      {language === 'pt' ? 'Resistência:' : 'Strength:'}
                    </span>
                    <span className="text-ink font-bold mt-1 block">
                      {materials[selectedMaterial].strength}
                    </span>
                  </div>
                  <div>
                    <span className="text-ink-muted block text-[10px] uppercase tracking-wider">
                      {language === 'pt' ? 'Deflexão Térmica:' : 'Heat Deflection:'}
                    </span>
                    <span className="text-ink font-bold mt-1 block">
                      {materials[selectedMaterial].temp}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-ink-muted block text-[10px] uppercase tracking-wider">
                      {language === 'pt' ? 'Tato/Textura:' : 'Tactile Feel:'}
                    </span>
                    <span className="text-ink font-bold mt-1 block">
                      {materials[selectedMaterial].tactile}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Testimonials Section
// ---------------------------------------------------------------------------
function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      quote: t('test.q1'),
      author: 'Marcus T.',
      company: 'Atlas Aerospace',
      rating: 5,
    },
    {
      quote: t('test.q2'),
      author: 'Sofia R.',
      company: 'Nova Systems',
      rating: 5,
    },
    {
      quote: t('test.q3'),
      author: 'James L.',
      company: 'Vertex Design Co.',
      rating: 5,
    },
  ]

  return (
    <section className="py-32" id="testimonials">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="success" className="mb-4">{t('testimonials.badge')}</Badge>
          <h2 className="text-4xl font-bold tracking-tight text-ink">{t('testimonials.title')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="surface-card p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 text-[#facc15] fill-[#facc15]" />
                ))}
              </div>
              <blockquote className="text-sm text-ink-subtle leading-relaxed mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-semibold text-ink">{t.author}</p>
                <p className="text-xs text-ink-muted">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// CTA Section
// ---------------------------------------------------------------------------
function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-32" id="cta">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden p-1"
          style={{
            background: 'linear-gradient(135deg, rgba(2,132,199,0.2) 0%, rgba(2,132,199,0.05) 50%, rgba(2,132,199,0.1) 100%)',
          }}
        >
          <div className="bg-surface-0 rounded-[20px] p-16 text-center relative overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-accent-glow)_0%,transparent_70%)]" />

            <div className="relative z-10">
              <Badge variant="accent" dot className="mb-6">{t('cta.badge')}</Badge>
              <h2 className="text-5xl font-extrabold tracking-tight text-ink mb-6 leading-tight">
                {t('cta.title.1')}
                <br />
                <span className="text-gradient-cyan">{t('cta.title.2')}</span>
              </h2>
              <p className="text-lg text-ink-subtle max-w-xl mx-auto mb-10 leading-relaxed">
                {t('cta.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    id="cta-quote-btn"
                    variant="primary"
                    size="xl"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                    asChild
                  >
                    <Link href="/quote">{t('cta.button.primary')}</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button id="cta-portal-btn" variant="outline" size="xl" asChild>
                    <Link href="/portal">{t('cta.button.secondary')}</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <StickyHero />
        <LogoTicker />
        <HowItWorksScroll />
        <BrazilCoverageScroll />
        <StatsSection />
        <FeaturesSection />
        <ProductCategoriesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
