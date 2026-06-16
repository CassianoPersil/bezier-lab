'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Button, Badge, Card, useLanguage } from '@bezier-lab/ui'
import { Shield, Target, Cpu, Flame, Users, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const { language } = useLanguage()
  const isPt = language === 'pt'

  const content = {
    title: isPt ? 'Precisão Desenhada em Curvas' : 'Precision Drawn in Curves',
    subtitle: isPt
      ? 'A Bézier Lab nasceu para unir a modelagem matemática de alta complexidade à manufatura aditiva de nível industrial.'
      : 'Bézier Lab was founded to bridge high-complexity mathematical modeling with industrial-grade additive manufacturing.',
    missionTitle: isPt ? 'Nossa Missão' : 'Our Mission',
    missionText: isPt
      ? 'Transformar a maneira como indústrias e designers produzem componentes físicos. Desenvolvemos peças funcionais eliminando margens de erro, utilizando modelagem paramétrica e controle de qualidade rigoroso, do CAD à entrega.'
      : 'To transform the way industries and designers produce physical components. We develop functional parts eliminating error margins, utilizing parametric modeling and strict quality control from CAD to delivery.',
  }

  const values = [
    {
      title: isPt ? 'Precisão Matemática' : 'Mathematical Precision',
      desc: isPt
        ? 'Baseamos nossos designs em curvas de Bézier e modelagem paramétrica para garantir exatidão absoluta nas tolerâncias e encaixes.'
        : 'We base our designs on Bézier curves and parametric modeling to ensure absolute accuracy in tolerances and fits.',
      icon: Cpu,
      color: '#00F0FF'
    },
    {
      title: isPt ? 'Garantia de Qualidade' : 'Quality Assurance',
      desc: isPt
        ? 'Cada lote passa por metrologia óptica e ensaios físicos de estresse para assegurar que as especificações do projeto sejam atendidas.'
        : 'Each batch goes through optical metrology and physical stress testing to ensure project specifications are met.',
      icon: Shield,
      color: '#4ade80'
    },
    {
      title: isPt ? 'Foco no Cliente' : 'Client Focus',
      desc: isPt
        ? 'Nossos engenheiros trabalham de forma colaborativa com seu time para otimizar arquivos 3D para manufatura (DFM).'
        : 'Our engineers work collaboratively with your team to optimize 3D files for manufacturing (DFM).',
      icon: Users,
      color: '#c084fc'
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
              {isPt ? 'Sobre Nós' : 'About Us'}
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-gradient-cyan">{content.title}</span>
            </h1>
            <p className="text-lg text-ink-subtle leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="surface-card p-10 relative overflow-hidden"
            >
              <div className="absolute -right-20 -bottom-20 h-48 w-48 bg-accent/5 rounded-full blur-2xl" />
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-ink mb-4">{content.missionTitle}</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                {content.missionText}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="surface-card p-10 relative overflow-hidden"
            >
              <div className="absolute -right-20 -bottom-20 h-48 w-48 bg-success/5 rounded-full blur-2xl" />
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center mb-6">
                <Flame className="h-5 w-5 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-ink mb-4">
                {isPt ? 'Nossa Visão' : 'Our Vision'}
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                {isPt
                  ? 'Tornarmo-nos a principal referência em manufatura aditiva sob demanda da América Latina, unindo sustentabilidade no uso de biopolímeros, excelência em prazos e inteligência paramétrica aplicada.'
                  : 'To become the leading reference for on-demand additive manufacturing in Latin America, combining sustainability in biopolymer usage, outstanding turnaround times, and applied parametric intelligence.'}
              </p>
            </motion.div>
          </div>

          {/* Core Values Section */}
          <div className="mb-20">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted text-center mb-12">
              {isPt ? 'Nossos Valores Fundamentais' : 'Our Core Values'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, idx) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="surface-card p-8 hover:border-accent/20 transition-all duration-200"
                >
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${val.color}15`,
                      border: `1px solid ${val.color}25`,
                    }}
                  >
                    <val.icon className="h-5 w-5" style={{ color: val.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-3">{val.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Call to action */}
          <div className="surface-card p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-accent-glow)_0%,transparent_70%)]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-ink mb-4">
                {isPt ? 'Pronto para colaborar?' : 'Ready to collaborate?'}
              </h2>
              <p className="text-base text-ink-subtle max-w-xl mx-auto mb-8">
                {isPt
                  ? 'Fale com nossa equipe técnica de engenheiros e designers para otimizar suas peças antes de imprimir.'
                  : 'Talk to our technical team of engineers and designers to optimize your parts before printing.'}
              </p>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
                <Link href="/contact">
                  {isPt ? 'Iniciar Projeto' : 'Start Project'}
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
