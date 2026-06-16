'use client'

// =============================================================================
// DESIGN SYSTEM — Guidelines Client Side View
// =============================================================================

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogoImagotipo, LogoIsotipo, Button, Badge } from '@bezier-lab/ui'
import { Activity, Eye, Sparkles } from 'lucide-react'

const guidelinesList = [
  { slug: 'brand', name: 'Brand', desc: 'Identidade, logotipos e paletas institucionais.' },
  { slug: 'motion', name: 'Motion', desc: 'Linguagem de animação e curvas de transição semânticas.' },
  { slug: 'accessibility', name: 'Accessibility', desc: 'Acessibilidade de contraste, navegação por teclado e a11y.' },
]

// Rel luminance & contrast math helpers
function getLuminance(hex: string): number {
  try {
    const cleanHex = hex.replace('#', '').trim()
    if (cleanHex.length !== 6) return 0
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255

    const a = [r, g, b].map((v) => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  } catch (e) {
    return 0
  }
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const brightest = Math.max(l1, l2)
  const darkest = Math.min(l1, l2)
  return (brightest + 0.05) / (darkest + 0.05)
}

interface GuidelinesClientProps {
  slug: string
}

export function GuidelinesClient({ slug }: GuidelinesClientProps) {
  // --- Accessibility Calculator State ---
  const [fgColor, setFgColor] = useState('#00F0FF')
  const [bgColor, setBgColor] = useState('#141517')
  const ratio = getContrastRatio(fgColor, bgColor)

  const passesAA_Normal = ratio >= 4.5
  const passesAA_Large = ratio >= 3.0
  const passesAAA_Normal = ratio >= 7.0
  const passesAAA_Large = ratio >= 4.5

  // --- Motion Sandbox State ---
  const [motionTrigger, setMotionTrigger] = useState(0)

  // Render content based on active guideline
  const renderContent = () => {
    switch (slug) {
      case 'brand':
        return (
          <div className="space-y-12">
            {/* Visual Logos card */}
            <div className="surface-card p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-ink">Assinaturas Visuais</h2>
              <p className="text-sm text-ink-subtle">
                A marca da Bézier Lab é representada por duas assinaturas: o Imagotipo horizontal principal (texto + ícone) e o Isotipo (ícone quadrado).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Horizontal Logo */}
                <div className="p-6 rounded-xl border border-border bg-surface-0 flex flex-col items-center justify-center gap-4 min-h-[160px]">
                  <LogoImagotipo height={36} />
                  <span className="text-[10px] font-semibold text-ink-disabled uppercase">Imagotipo (Principal)</span>
                </div>
                {/* Symbol Logo */}
                <div className="p-6 rounded-xl border border-border bg-surface-0 flex flex-col items-center justify-center gap-4 min-h-[160px]">
                  <LogoIsotipo size={54} />
                  <span className="text-[10px] font-semibold text-ink-disabled uppercase">Isotipo (Símbolo)</span>
                </div>
              </div>
            </div>

            {/* Typography & Brand Identity rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="surface-card p-6 space-y-4">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" /> Tom e Voz
                </h3>
                <ul className="text-xs text-ink-subtle space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li><strong>Preciso:</strong> Nos comunicamos com precisão de engenharia. Curvas são exatas, prazos são compromissos.</li>
                  <li><strong>Premium:</strong> Sem clichês corporativos simples. Design sofisticado com tons profundos e toques elétricos de ciano.</li>
                  <li><strong>Direto ao ponto:</strong> Menos parágrafos densos, mais dados rápidos e controles visuais.</li>
                </ul>
              </div>

              <div className="surface-card p-6 space-y-4">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <Eye className="h-4 w-4 text-accent" /> Uso das Cores do Logotipo
                </h3>
                <p className="text-xs text-ink-subtle leading-relaxed">
                  O símbolo da curva &apos;B&apos; é sempre renderizado em <strong>Eletric Cyan (#00F0FF)</strong>. 
                  A tipografia adjacente deve se adaptar dinamicamente ao fundo: preta no Light Mode e branca no Dark Mode. 
                  Nunca adicione sombras coloridas adicionais ou gradientes à marca que descaracterizem a curvatura geométrica original.
                </p>
              </div>
            </div>
          </div>
        )
      case 'motion':
        return (
          <div className="space-y-8">
            <div className="surface-card p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" /> Curvas de Transição Semânticas
              </h2>
              <p className="text-sm text-ink-subtle">
                A animação traz clareza de contexto ao usuário. Usamos o padrão de transição do Linear.app, priorizando velocidade e fluidez.
                Clique no botão de teste para visualizar o comportamento físico de cada curva em tempo real.
              </p>
              <div className="pt-2">
                <Button variant="primary" size="sm" onClick={() => setMotionTrigger((prev) => prev + 1)}>
                  Animar Amostras
                </Button>
              </div>
            </div>

            {/* Transition boxes */}
            <div className="space-y-3">
              {[
                { name: 'Linear', cssVar: 'var(--ease-linear)', desc: 'Movimentos constantes de gradientes de cor e luz.' },
                { name: 'Ease-In', cssVar: 'var(--ease-in)', desc: 'Entrada acelerada. Usado para fechamento de modais ou saídas.' },
                { name: 'Ease-Out', cssVar: 'var(--ease-out)', desc: 'Desaceleração suave. Usado para componentes que entram em cena.' },
                { name: 'Ease-In-Out', cssVar: 'var(--ease-in-out)', desc: 'Aceleração intermediária. Ideal para transições de slides e painéis.' },
                { name: 'Spring', cssVar: 'var(--ease-spring)', desc: 'Curva elástica simulando física. Usado em botões e microinterações.' },
                { name: 'Smooth (Linear-style)', cssVar: 'var(--ease-smooth)', desc: 'Nossa curva de desaceleração premium para abertura de diálogos.' },
              ].map((curve) => (
                <div key={curve.name} className="surface-card p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h3 className="text-xs font-bold text-ink">{curve.name}</h3>
                    <code className="text-[10px] text-accent font-mono">{curve.cssVar}</code>
                  </div>
                  <div className="md:col-span-2 text-xs text-ink-subtle">
                    {curve.desc}
                  </div>
                  <div className="bg-canvas border border-border rounded-lg p-2.5 overflow-hidden relative h-10 flex items-center">
                    <motion.div
                      key={motionTrigger}
                      initial={{ left: 8 }}
                      animate={{ left: 'calc(100% - 24px)' }}
                      transition={{
                        duration: 0.6,
                        ease: curve.name.toLowerCase().includes('spring') 
                          ? [0.34, 1.56, 0.64, 1] 
                          : curve.name.toLowerCase().includes('smooth') 
                          ? [0.25, 0.46, 0.45, 0.94]
                          : curve.name.toLowerCase().includes('in-out')
                          ? [0.4, 0, 0.2, 1]
                          : curve.name.toLowerCase().includes('out')
                          ? [0, 0, 0.2, 1]
                          : curve.name.toLowerCase().includes('in')
                          ? [0.4, 0, 1, 1]
                          : [0, 0, 1, 1] // linear
                      }}
                      className="h-4.5 w-4.5 rounded bg-accent absolute"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'accessibility':
        return (
          <div className="space-y-8">
            <div className="surface-card p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-ink">Normas Gerais de Acessibilidade (a11y)</h2>
              <p className="text-sm text-ink-subtle">
                Garantimos conformidade com as diretrizes <strong>WCAG 2.1 AA</strong>. Todos os botões, links de entrada e modais devem ser navegáveis por teclado (`Tab`, `Enter`, `Escape`, setas de navegação) com indicadores de foco claros e textos alternativos explícitos.
              </p>
            </div>

            {/* Contrast Ratio Live Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tool Inputs & Ratios */}
              <div className="lg:col-span-2 surface-card p-6 space-y-6">
                <h3 className="text-base font-bold text-ink">Calculadora de Contraste WCAG</h3>
                <p className="text-xs text-ink-subtle">Insira códigos hexadecimais para verificar a conformidade cromática instantaneamente.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-ink-muted uppercase">Cor do Texto (Foreground)</label>
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-full mt-1.5 px-3 py-2 text-xs rounded-lg bg-surface-0 border border-border text-ink focus:border-accent focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-ink-muted uppercase">Cor do Fundo (Background)</label>
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full mt-1.5 px-3 py-2 text-xs rounded-lg bg-surface-0 border border-border text-ink focus:border-accent focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-ink-disabled font-medium uppercase">Razão de Contraste</p>
                    <p className="text-4xl font-extrabold text-accent tracking-tight">{ratio.toFixed(2)}:1</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={ratio >= 4.5 ? 'success' : 'danger'}>
                      {ratio >= 4.5 ? 'WCAG AA Pass' : 'WCAG AA Fail'}
                    </Badge>
                    <Badge variant={ratio >= 7.0 ? 'success' : 'outline'}>
                      {ratio >= 7.0 ? 'WCAG AAA Pass' : 'WCAG AAA Fail'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Dynamic Sample Preview */}
              <div className="p-6 rounded-xl border border-border flex flex-col justify-between" style={{ backgroundColor: bgColor }}>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: fgColor }}>
                    Amostra Visual
                  </span>
                  <p className="text-xl font-bold mt-4 leading-snug" style={{ color: fgColor }}>
                    Este é um exemplo de texto em tamanho grande.
                  </p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: fgColor }}>
                    Este é um texto em tamanho regular de corpo de página, exigindo contraste superior (min. 4.5:1).
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-border/10">
                  <p className="text-[10px] opacity-40 font-mono" style={{ color: fgColor }}>
                    FG: {fgColor} | BG: {bgColor}
                  </p>
                </div>
              </div>
            </div>

            {/* Accessibility results table */}
            <div className="surface-card p-6">
              <h3 className="text-sm font-bold text-ink mb-4">Critérios de Aceitação</h3>
              <div className="space-y-3">
                {[
                  { label: 'Texto Normal (Abaixo de 18pt)', rule: 'Contraste mínimo de 4.5:1', pass: passesAA_Normal, extra: 'Para WCAG AAA é necessário 7.0:1' },
                  { label: 'Texto Grande (Acima de 18pt ou negrito de 14pt)', rule: 'Contraste mínimo de 3.0:1', pass: passesAA_Large, extra: 'Para WCAG AAA é necessário 4.5:1' },
                  { label: 'Elementos Gráficos e de Interface', rule: 'Contraste mínimo de 3.0:1', pass: passesAA_Large, extra: 'Aplica-se a bordas de botões e estados focados' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-xs font-semibold text-ink">{item.label}</p>
                      <p className="text-[10px] text-ink-muted">{item.rule} — {item.extra}</p>
                    </div>
                    <Badge variant={item.pass ? 'success' : 'danger'}>
                      {item.pass ? 'Aprovado' : 'Reprovado'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 max-w-screen-xl w-full mx-auto px-6 py-8 flex gap-8">
      {/* Left Sidebar */}
      <aside className="w-64 shrink-0 hidden md:block border-r border-border pr-6">
        <h2 className="text-xs font-bold text-ink-disabled uppercase tracking-widest mb-4">Diretrizes</h2>
        <nav className="space-y-1">
          {guidelinesList.map((guideline) => {
            const isSelected = guideline.slug === slug
            return (
              <Link
                key={guideline.slug}
                href={`/guidelines/${guideline.slug}`}
                className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-accent/8 text-accent'
                    : 'text-ink-subtle hover:text-ink hover:bg-surface-1'
                }`}
              >
                <span>{guideline.name}</span>
                <ChevronRight className={`h-3 w-3 ${isSelected ? 'text-accent rotate-90' : 'text-ink-disabled'}`} />
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-8 overflow-hidden">
        {/* Header */}
        <div>
          <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-1.5">Diretrizes</p>
          <h1 className="text-3xl font-bold tracking-tight text-ink mb-2">
            {guidelinesList.find((g) => g.slug === slug)?.name || 'Brand Guidelines'}
          </h1>
          <p className="text-sm text-ink-subtle">
            {guidelinesList.find((g) => g.slug === slug)?.desc || 'Identidade e regras da marca Bézier Lab.'}
          </p>
        </div>

        {/* Dynamic Section */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
