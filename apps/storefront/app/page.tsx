'use client'

// =============================================================================
// STOREFRONT — Landing Page
// High-conversion marketing page for Bézier Lab
// =============================================================================

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from './components/Header'
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
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="hero">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--color-accent-glow)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_50%,rgba(0,240,255,0.02)_0%,transparent_70%)]" />
 
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top glow line */}
      <div className="absolute top-16 inset-x-0 glow-line opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left — Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-xs font-medium text-accent mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {t('hero.badge')}
            </div>

            <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              <span className="text-gradient-brand">{t('hero.title.1')}</span>
              <br />
              <span className="text-ink">{t('hero.title.2')}</span>
              <br />
              <span className="text-gradient-cyan">{t('hero.title.3')}</span>
            </h1>

            <p className="text-lg text-ink-subtle leading-relaxed mb-10 max-w-lg">
              {t('hero.desc')}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  id="hero-cta-primary"
                  variant="primary"
                  size="xl"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  asChild
                >
                  <Link href="/quote">{t('hero.cta.primary')}</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  id="hero-cta-secondary"
                  variant="outline"
                  size="xl"
                  asChild
                >
                  <Link href="/portfolio">{t('hero.cta.secondary')}</Link>
                </Button>
              </motion.div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-10">
              {[
                t('hero.trust.1'),
                t('hero.trust.2'),
                t('hero.trust.3'),
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-ink-muted">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — 3D Scene placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative hidden lg:block"
        >
          <div className="relative h-[520px] rounded-2xl overflow-hidden border border-border bg-surface-0 shadow-lg">
            {/* Placeholder gradient for SSR */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-accent-glow)_0%,transparent_70%)] flex items-center justify-center">
              <div className="text-center">
                <div className="h-32 w-32 mx-auto mb-6 relative animate-float">
                  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="120" rx="24" fill="var(--color-bg-canvas-deep)" />
                    <rect x="0.5" y="0.5" width="119" height="119" rx="23.5" stroke="var(--color-border-default)" />
                    {/* Animated Bézier curve */}
                    <path d="M20 20 C20 20, 60 20, 80 60 C100 100, 100 100, 60 100 C20 100, 20 100, 20 100" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M20 60 C20 60, 80 50, 90 60 C100 70, 80 70, 20 60" stroke="var(--color-border-strong)" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <circle cx="20" cy="20" r="5" fill="var(--color-accent)" />
                    <circle cx="90" cy="60" r="5" fill="var(--color-accent)" />
                    <circle cx="20" cy="100" r="5" fill="var(--color-accent)" />
                  </svg>
                </div>
                <p className="text-sm text-ink-muted">{t('hero.scene')}</p>
                <p className="text-xs text-ink-disabled">Powered by Three.js</p>
              </div>
            </div>

            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-[scan-line_4s_linear_infinite]" />
            </div>

            {/* Corner glow */}
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>

          {/* Floating stat badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-6 top-1/4 bg-surface-1 border border-border-strong rounded-xl p-4 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <Package className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-lg font-bold text-ink">10,000+</p>
                <p className="text-xs text-ink-muted">{t('hero.badge.parts')}</p>
              </div>
            </div>
          </motion.div>

          {/* Floating time badge */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -right-6 bottom-1/4 bg-surface-1 border border-border-strong rounded-xl p-4 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-success/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-lg font-bold text-ink">48h avg</p>
                <p className="text-xs text-ink-muted">{t('hero.badge.time')}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

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
function PortfolioSection() {
  const { t } = useLanguage()

  const portfolio = [
    { name: 'Aerospace Bracket', category: t('cat.aerospace'), material: 'Titanium CF', time: '48h' },
    { name: 'Medical Enclosure', category: t('cat.medical'), material: 'ASA', time: '24h' },
    { name: 'Architectural Model', category: t('cat.design'), material: 'Resin', time: '36h' },
    { name: 'Drone Frame', category: t('cat.aerospace'), material: 'Carbon Fiber', time: '72h' },
    { name: 'Custom Prosthetic', category: t('cat.medical'), material: 'Flexible TPU', time: '48h' },
    { name: 'Gear Housing', category: t('cat.industrial'), material: 'PETG', time: '24h' },
  ]

  return (
    <section className="py-32 bg-canvas border-y border-border" id="portfolio">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <Badge variant="accent" className="mb-4">{t('portfolio.badge')}</Badge>
            <h2 className="text-4xl font-bold tracking-tight text-ink">
              {t('portfolio.title')}
            </h2>
          </div>
          <Button variant="outline" size="md" rightIcon={<ChevronRight className="h-4 w-4" />} asChild>
            <Link href="/portfolio">{t('portfolio.viewAll')}</Link>
          </Button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="group cursor-pointer surface-card overflow-hidden hover:border-accent/20 transition-all duration-200"
            >
              {/* Project thumbnail */}
              <div className="h-48 bg-canvas-deep relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-accent-glow)_0%,transparent_70%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Settings
                    className="h-16 w-16 text-border group-hover:text-accent/20 transition-colors duration-300"
                    strokeWidth={1}
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <Badge variant="accent" size="sm">{project.time}</Badge>
                </div>
                <div className="flex gap-2">
                  <Badge variant="default" size="sm">{project.category}</Badge>
                  <Badge variant="default" size="sm">{project.material}</Badge>
                </div>
              </div>
            </motion.div>
          ))}
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
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
