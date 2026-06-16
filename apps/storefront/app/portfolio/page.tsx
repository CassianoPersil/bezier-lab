'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Button, Badge, Card, useLanguage } from '@bezier-lab/ui'
import { Settings, Eye, Filter, ArrowRight } from 'lucide-react'

export default function PortfolioPage() {
  const { language } = useLanguage()
  const isPt = language === 'pt'

  const content = {
    title: isPt ? 'Nosso Portfólio de Projetos' : 'Our Project Portfolio',
    subtitle: isPt
      ? 'Casos reais de componentes funcionais, protótipos de alta precisão e peças industriais manufaturadas pela Bézier Lab.'
      : 'Real-world functional components, high-precision prototypes, and industrial parts manufactured by Bézier Lab.',
    filterAll: isPt ? 'Todos' : 'All',
  }

  const categories = [
    { id: 'all', label: content.filterAll },
    { id: 'aerospace', label: isPt ? 'Aeroespacial' : 'Aerospace' },
    { id: 'medical', label: isPt ? 'Médico / Saúde' : 'Medical / Healthcare' },
    { id: 'industrial', label: isPt ? 'Industrial' : 'Industrial' },
    { id: 'design', label: isPt ? 'Design / Arte' : 'Design / Art' }
  ]

  const projects = [
    {
      name: 'Aerospace Bracket',
      category: 'aerospace',
      categoryLabel: isPt ? 'Aeroespacial' : 'Aerospace',
      material: 'Titanium CF',
      time: '48h',
      desc: isPt
        ? 'Suporte de fixação estrutural reforçado com fibra de carbono para testes em túnel de vento.'
        : 'Carbon-fiber reinforced structural bracket for wind tunnel testing applications.',
      specs: isPt ? 'Resistência térmica de até 150°C' : 'Thermal resistance up to 150°C'
    },
    {
      name: 'Medical Enclosure',
      category: 'medical',
      categoryLabel: isPt ? 'Médico' : 'Medical',
      material: 'ASA Biocompatible',
      time: '24h',
      desc: isPt
        ? 'Gabinete selado para dispositivo de monitoramento de batimentos cardíacos, resistente a agentes químicos.'
        : 'Sealed enclosure for a heart rate monitoring device, chemically resistant to sterilizing agents.',
      specs: isPt ? 'Certificação USP Classe VI' : 'USP Class VI certified material'
    },
    {
      name: 'Architectural Model',
      category: 'design',
      categoryLabel: isPt ? 'Design' : 'Design',
      material: 'SLA Resin',
      time: '36h',
      desc: isPt
        ? 'Maquete de condomínio comercial com detalhes de fachadas e paisagismo em escala 1:200.'
        : 'Commercial building complex scale model with facade details and landscaping at 1:200.',
      specs: isPt ? 'Camadas de 50 mícrons' : '50 micron layer height'
    },
    {
      name: 'Drone Frame',
      category: 'aerospace',
      categoryLabel: isPt ? 'Aeroespacial' : 'Aerospace',
      material: 'Carbon Fiber Nylon',
      time: '72h',
      desc: isPt
        ? 'Chassi ultraleve e rígido para quadricóptero de inspeção industrial com furos de montagem rosqueados.'
        : 'Ultralight, rigid chassis for an industrial inspection quadcopter featuring threaded inserts.',
      specs: isPt ? 'Peso: 120g, Altura: 180mm' : 'Weight: 120g, Height: 180mm'
    },
    {
      name: 'Custom Prosthetic',
      category: 'medical',
      categoryLabel: isPt ? 'Médico' : 'Medical',
      material: 'Flexible TPU',
      time: '48h',
      desc: isPt
        ? 'Prótese de mão mecânica sob medida com eixos articulados flexíveis para maior conforto.'
        : 'Custom mechanical hand prosthetic featuring flexible articulating joints for comfort.',
      specs: isPt ? 'Dureza Shore 95A' : 'Shore 95A durometer'
    },
    {
      name: 'Gear Housing',
      category: 'industrial',
      categoryLabel: isPt ? 'Industrial' : 'Industrial',
      material: 'PETG Carbon',
      time: '24h',
      desc: isPt
        ? 'Carcaça de redutor de velocidade resistente ao impacto para esteira transportadora fabril.'
        : 'Impact-resistant speed reducer housing for a manufacturing conveyor belt system.',
      specs: isPt ? 'Resistência ao impacto: 12 kJ/m²' : 'Impact strength: 12 kJ/m²'
    }
  ]

  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-24 overflow-hidden bg-canvas">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,var(--color-accent-glow)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-16">
          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="accent" className="mb-4">
              {isPt ? 'Galeria' : 'Gallery'}
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-gradient-cyan">{content.title}</span>
            </h1>
            <p className="text-lg text-ink-subtle leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <div className="flex items-center gap-2 text-ink-muted mr-2 text-sm">
              <Filter className="h-4 w-4" />
              <span>{isPt ? 'Filtrar por:' : 'Filter by:'}</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={[
                  'px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150',
                  activeFilter === cat.id
                    ? 'bg-accent text-white dark:text-[#0d0d0e] border-accent shadow-sm'
                    : 'bg-surface-1 text-ink-muted border-border hover:border-border-strong hover:text-ink-subtle'
                ].join(' ')}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.name}
                  className="group cursor-pointer surface-card overflow-hidden hover:border-accent/20 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Project thumbnail */}
                    <div className="h-48 bg-canvas-deep relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-accent-glow)_0%,transparent_70%)]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Settings
                          className="h-16 w-16 text-border group-hover:text-accent/25 group-hover:rotate-45 transition-all duration-500"
                          strokeWidth={1}
                        />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="accent" size="sm">{project.time}</Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline" size="sm">{project.categoryLabel}</Badge>
                        <Badge variant="default" size="sm">{project.material}</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-ink-muted leading-relaxed mb-4">
                        {project.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-border mt-auto flex items-center justify-between text-xs text-ink-disabled font-mono">
                    <span>{project.specs}</span>
                    <span className="flex items-center gap-1 text-accent group-hover:underline">
                      {isPt ? 'Detalhes' : 'Details'} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Call to action */}
          <div className="surface-card p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-accent-glow)_0%,transparent_70%)]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-ink mb-4">
                {isPt ? 'Gostou do que viu?' : 'Like what you see?'}
              </h2>
              <p className="text-base text-ink-subtle max-w-xl mx-auto mb-8">
                {isPt
                  ? 'Podemos imprimir seu projeto utilizando os mesmos padrões rígidos de qualidade vistos no portfólio.'
                  : 'We can manufacture your project using the exact same rigid quality standards shown in our portfolio.'}
              </p>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
                <Link href="/">
                  {isPt ? 'Iniciar Meu Projeto' : 'Start My Project'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
