'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Button, Badge, Card, useLanguage } from '@bezier-lab/ui'
import { Cpu, Layers, Shield, Zap, Box, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ServicesPage() {
  const { language, t } = useLanguage()
  const isPt = language === 'pt'

  const content = {
    title: isPt ? 'Nossos Serviços de Impressão 3D' : 'Our 3D Printing Services',
    subtitle: isPt
      ? 'Manufatura aditiva industrial com controle de qualidade rigoroso, materiais de engenharia e precisão de nível mícron.'
      : 'Industrial additive manufacturing with rigorous quality control, engineering-grade materials, and micron-level precision.',
    fdmTitle: isPt ? 'Impressão 3D FDM (Modelagem por Depósito Fundido)' : 'FDM 3D Printing (Fused Deposition Modeling)',
    fdmDesc: isPt
      ? 'A tecnologia ideal para prototipagem rápida funcional, gabaritos de manufatura e peças finais de alta resistência mecânica.'
      : 'The ideal technology for functional rapid prototyping, manufacturing jigs and fixtures, and high-strength end-use parts.',
    slaTitle: isPt ? 'Impressão 3D SLA / Resina (Estereolitografia)' : 'SLA / Resin 3D Printing (Stereolithography)',
    slaDesc: isPt
      ? 'Perfeita para modelos de altíssima resolução, acabamento superficial liso e peças com geometrias extremamente complexas.'
      : 'Perfect for ultra-high resolution models, smooth surface finishes, and parts with extremely complex geometries.',
    slsTitle: isPt ? 'Sinterização Seletiva a Laser (SLS)' : 'Selective Laser Sintering (SLS)',
    slsDesc: isPt
      ? 'Produção de peças industriais em lote sem necessidade de suportes de impressão, proporcionando total liberdade de design e resistência isométrica.'
      : 'Industrial batch production without the need for support structures, delivering absolute design freedom and isotropic strength.',
  }

  const services = [
    {
      title: content.fdmTitle,
      desc: content.fdmDesc,
      icon: Cpu,
      color: '#00F0FF',
      tech: 'FDM (FFF)',
      materials: isPt ? ['PLA Premium', 'PETG', 'ABS', 'Nylon com Fibra de Carbono', 'TPU Flexível'] : ['Premium PLA', 'PETG', 'ABS', 'Carbon Fiber Nylon', 'Flexible TPU'],
      specs: isPt 
        ? ['Tolerância: ±0.15mm', 'Volume útil: 300x300x400mm', 'Camadas: 0.1mm a 0.3mm']
        : ['Tolerance: ±0.15mm', 'Build Volume: 300x300x400mm', 'Layers: 0.1mm to 0.3mm']
    },
    {
      title: content.slaTitle,
      desc: content.slaDesc,
      icon: Layers,
      color: '#c084fc',
      tech: 'SLA / DLP',
      materials: isPt ? ['Resina Padrão', 'Resina ABS-Like (Rígida)', 'Resina Flexível', 'Resina Calcinável para Joias'] : ['Standard Resin', 'ABS-Like Tough Resin', 'Flexible Resin', 'Castable Jewelry Resin'],
      specs: isPt 
        ? ['Tolerância: ±0.05mm', 'Volume útil: 192x120x200mm', 'Camadas: 25 a 100 mícrons']
        : ['Tolerance: ±0.05mm', 'Build Volume: 192x120x200mm', 'Layers: 25 to 100 microns']
    },
    {
      title: content.slsTitle,
      desc: content.slsDesc,
      icon: Box,
      color: '#4ade80',
      tech: 'SLS',
      materials: isPt ? ['Nylon PA12', 'Nylon PA11', 'TPU de Engenharia'] : ['Nylon PA12', 'Nylon PA11', 'Engineering TPU'],
      specs: isPt 
        ? ['Tolerância: ±0.10mm', 'Volume útil: 165x165x300mm', 'Sem necessidade de suportes']
        : ['Tolerance: ±0.10mm', 'Build Volume: 165x165x300mm', 'No support structures needed']
    }
  ]

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-24 overflow-hidden bg-canvas">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,var(--color-accent-glow)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-16">
          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="accent" className="mb-4">
              {isPt ? 'Tecnologia' : 'Technology'}
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-gradient-cyan">{content.title}</span>
            </h1>
            <p className="text-lg text-ink-subtle leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="surface-card p-8 flex flex-col justify-between hover:border-accent/30 transition-all duration-200"
              >
                <div>
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${service.color}15`,
                      border: `1px solid ${service.color}25`,
                    }}
                  >
                    <service.icon className="h-6 w-6" style={{ color: service.color }} />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-ink">{service.title}</h3>
                  </div>

                  <Badge variant="outline" className="mb-4">{service.tech}</Badge>

                  <p className="text-sm text-ink-muted leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Materials list */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-subtle mb-3">
                      {isPt ? 'Materiais Suportados' : 'Supported Materials'}
                    </h4>
                    <ul className="space-y-2">
                      {service.materials.map((m) => (
                        <li key={m} className="flex items-center gap-2 text-sm text-ink-muted">
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Specs list */}
                <div className="pt-6 border-t border-border mt-auto">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-subtle mb-3">
                    {isPt ? 'Especificações Técnicas' : 'Technical Specs'}
                  </h4>
                  <ul className="space-y-1">
                    {service.specs.map((s) => (
                      <li key={s} className="text-xs text-ink-disabled font-mono">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="surface-card p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-accent-glow)_0%,transparent_70%)]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-ink mb-4">
                {isPt ? 'Precisa de peças sob medida?' : 'Need custom parts?'}
              </h2>
              <p className="text-base text-ink-subtle max-w-xl mx-auto mb-8">
                {isPt
                  ? 'Envie seus arquivos CAD (STL, STEP, IGES) e faremos uma análise de manufaturabilidade com orçamento em até 24 horas.'
                  : 'Submit your CAD files (STL, STEP, IGES) and we will provide a manufacturing analysis and quote within 24 hours.'}
              </p>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
                <Link href="/">
                  {isPt ? 'Solicitar Orçamento' : 'Request a Quote'}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
