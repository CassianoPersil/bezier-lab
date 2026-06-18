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
        <StickyHero />
        <LogoTicker />
        <HowItWorksScroll />
        <BrazilCoverageScroll />
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
