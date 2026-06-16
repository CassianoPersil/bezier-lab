'use client'

// =============================================================================
// DESIGN SYSTEM — Tokens Client Side View
// =============================================================================

import React, { useState } from 'react'
import Link from 'next/link'
import { Table, TableHead, TableBody, TableRow, TableTh, TableTd } from '@bezier-lab/ui'
import { Type, Layout, Layers, Copy, Check } from 'lucide-react'

const tokensList = [
  { slug: 'typography', name: 'Typography', desc: 'Escalas tipográficas de tamanho, pesos e entrelinhamento.' },
  { slug: 'spacing', name: 'Spacing', desc: 'Nossa escala de espaçamento baseada em grade de 4pt.' },
  { slug: 'elevation', name: 'Elevation', desc: 'Sombras e elevações para organizar camadas visuais.' },
]

interface TokensClientProps {
  slug: string
}

export function TokensClient({ slug }: TokensClientProps) {
  // Clipboard helper
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const handleCopy = (variable: string) => {
    navigator.clipboard.writeText(variable)
    setCopiedToken(variable)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  // --- Render Content ---
  const renderContent = () => {
    switch (slug) {
      case 'typography':
        return (
          <div className="space-y-12">
            {/* Font Family definitions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="surface-card p-6 space-y-3">
                <span className="text-[10px] font-bold text-ink-disabled uppercase tracking-widest">Família Padrão (Sans)</span>
                <h3 className="text-xl font-bold text-ink">Inter</h3>
                <p className="text-xs text-ink-subtle leading-relaxed">
                  Utilizada para toda a interface do usuário, formulários, tabelas e cabeçalhos. Garante legibilidade excelente mesmo em tamanhos reduzidos.
                </p>
                <div className="bg-canvas border border-border p-3 rounded-lg font-mono text-xs text-accent">
                  var(--font-sans)
                </div>
              </div>
              <div className="surface-card p-6 space-y-3">
                <span className="text-[10px] font-bold text-ink-disabled uppercase tracking-widest">Família Monoespaçada</span>
                <h3 className="text-xl font-bold text-ink">JetBrains Mono</h3>
                <p className="text-xs text-ink-subtle leading-relaxed">
                  Utilizada para dados técnicos, IDs de pedidos, dimensões de volumes de impressão 3D e trechos de código-fonte.
                </p>
                <div className="bg-canvas border border-border p-3 rounded-lg font-mono text-xs text-accent">
                  var(--font-mono)
                </div>
              </div>
            </div>

            {/* Typography Scale Table */}
            <div className="surface-card p-6 space-y-4">
              <h2 className="text-base font-bold text-ink flex items-center gap-2">
                <Type className="h-4 w-4 text-accent" /> Escala de Tamanhos (Sizes)
              </h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableTh>Token</TableTh>
                      <TableTh>Variável CSS</TableTh>
                      <TableTh>Tamanho</TableTh>
                      <TableTh>Exemplo Visual</TableTh>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { token: 'display-2xl', css: 'var(--font-size-display-2xl)', size: '4.5rem (72px)', class: 'text-5xl font-extrabold tracking-tight', desc: 'Precision Printing' },
                      { token: 'display-lg', css: 'var(--font-size-display-lg)', size: '3.0rem (48px)', class: 'text-4xl font-bold tracking-tight', desc: 'Bézier Lab v4' },
                      { token: 'headline', css: 'var(--font-size-headline)', size: '1.5rem (24px)', class: 'text-2xl font-bold', desc: 'Backoffice Backlog' },
                      { token: 'title-lg', css: 'var(--font-size-title-lg)', size: '1.25rem (20px)', class: 'text-lg font-semibold', desc: 'Selecione o Material' },
                      { token: 'body-md', css: 'var(--font-size-body-md)', size: '0.9375rem (15px)', class: 'text-sm text-ink-subtle', desc: 'A manufatura aditiva 3D permite geometrias complexas.' },
                      { token: 'label-sm', css: 'var(--font-size-label-sm)', size: '0.75rem (12px)', class: 'text-xs text-ink-muted uppercase tracking-wider font-semibold', desc: 'Status do Pedido' },
                    ].map((item) => (
                      <TableRow key={item.token} className="group cursor-pointer" onClick={() => handleCopy(item.css)}>
                        <TableTd className="font-mono text-accent font-semibold text-xs">{item.token}</TableTd>
                        <TableTd className="font-mono text-ink-disabled text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <span>{item.css}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                              {copiedToken === item.css ? (
                                <Check className="h-3.5 w-3.5 text-success" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-ink-muted" />
                              )}
                            </span>
                          </div>
                        </TableTd>
                        <TableTd className="text-xs text-ink-subtle whitespace-nowrap">{item.size}</TableTd>
                        <TableTd className="py-4">
                          <span className={item.class}>{item.desc}</span>
                        </TableTd>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )
      case 'spacing':
        return (
          <div className="space-y-8">
            <div className="surface-card p-6 md:p-8 space-y-4">
              <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                <Layout className="h-4 w-4 text-accent" /> Grade de Layout 4pt
              </h2>
              <p className="text-xs text-ink-subtle leading-relaxed">
                Utilizamos múltiplos de 4 pixels para definir margins, paddings, gaps e tamanhos estruturais.
                Isso garante proporção e consistência geométrica perfeita. Clique na linha de qualquer token para copiar a variável CSS correspondente.
              </p>
            </div>

            {/* Spacing Bars */}
            <div className="surface-card p-6 space-y-4">
              <div className="space-y-4">
                {[
                  { token: 'space-1', css: 'var(--space-1)', val: '4px', width: 4 },
                  { token: 'space-2', css: 'var(--space-2)', val: '8px', width: 8 },
                  { token: 'space-3', css: 'var(--space-3)', val: '12px', width: 12 },
                  { token: 'space-4', css: 'var(--space-4)', val: '16px', width: 16 },
                  { token: 'space-6', css: 'var(--space-6)', val: '24px', width: 24 },
                  { token: 'space-8', css: 'var(--space-8)', val: '32px', width: 32 },
                  { token: 'space-10', css: 'var(--space-10)', val: '40px', width: 40 },
                  { token: 'space-12', css: 'var(--space-12)', val: '48px', width: 48 },
                  { token: 'space-16', css: 'var(--space-16)', val: '64px', width: 64 },
                  { token: 'space-20', css: 'var(--space-20)', val: '80px', width: 80 },
                  { token: 'space-24', css: 'var(--space-24)', val: '96px', width: 96 },
                ].map((item) => (
                  <div
                    key={item.token}
                    onClick={() => handleCopy(item.css)}
                    className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-2 rounded-lg hover:bg-surface-2 transition-colors cursor-pointer"
                  >
                    {/* Info */}
                    <div className="w-40 shrink-0 flex items-center justify-between">
                      <span className="font-mono text-xs text-accent font-semibold">{item.token}</span>
                      <span className="text-xs text-ink-muted">{item.val}</span>
                    </div>
                    {/* Visual Bar Container */}
                    <div className="flex-1 bg-surface-1 rounded-md h-6 border border-border flex items-center px-1 relative overflow-hidden">
                      <div
                        className="bg-accent rounded h-4 min-w-[2px] transition-all"
                        style={{ width: `${item.width * 3}px` }}
                      />
                      <span className="absolute right-3 opacity-0 group-hover:opacity-100 font-mono text-[10px] text-ink-disabled transition-opacity flex items-center gap-1">
                        {copiedToken === item.css ? (
                          <>
                            <Check className="h-3 w-3 text-success" /> Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> {item.css}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'elevation':
        return (
          <div className="space-y-8">
            <div className="surface-card p-6 md:p-8 space-y-4">
              <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent" /> Elevações e Sombras (Shadows)
              </h2>
              <p className="text-xs text-ink-subtle leading-relaxed">
                As sombras dão profundidade ao layout, separando o canvas de base dos cartões suspensos, cabeçalhos, popovers e modais elevados.
              </p>
            </div>

            {/* Shadows grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'xs', css: 'var(--shadow-xs)', class: 'shadow-xs', desc: 'Sombras sutis para pequenos botões.' },
                { name: 'sm', css: 'var(--shadow-sm)', class: 'shadow-sm', desc: 'Menus suspensos e tooltips pequenos.' },
                { name: 'md', css: 'var(--shadow-md)', class: 'shadow-md', desc: 'Padrão para cards e caixas de input.' },
                { name: 'lg', css: 'var(--shadow-lg)', class: 'shadow-lg', desc: 'Diálogos de configurações e popovers médios.' },
                { name: 'xl', css: 'var(--shadow-xl)', class: 'shadow-xl', desc: 'Menus laterais flutuantes e painéis móveis.' },
                { name: '2xl', css: 'var(--shadow-2xl)', class: 'shadow-2xl', desc: 'Grandes modais e popups de confirmação.' },
                { name: 'Glow Cyan', css: 'var(--shadow-glow-cyan)', class: 'shadow-glow-cyan', desc: 'Indicador visual de foco ativo da marca.' },
                { name: 'Card', css: 'var(--shadow-card)', class: 'shadow-card', desc: 'Sombras finas com contornos em hairline de 1px.' },
              ].map((shadow) => (
                <div
                  key={shadow.name}
                  onClick={() => handleCopy(shadow.css)}
                  className={`group bg-surface-1 border border-border p-6 rounded-xl transition-all hover:-translate-y-1 hover:border-accent/30 cursor-pointer flex flex-col justify-between min-h-[160px] ${shadow.class}`}
                >
                  <div>
                    <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-1">
                      shadow-{shadow.name}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {shadow.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border/10 flex items-center justify-between">
                    <code className="text-[9px] text-accent font-mono truncate max-w-[120px]">{shadow.css}</code>
                    <span className="text-[10px] text-ink-disabled group-hover:text-ink-subtle flex items-center gap-1 transition-colors">
                      {copiedToken === shadow.css ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-success" /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copiar
                        </>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 max-w-screen-xl w-full mx-auto px-6 py-8 flex gap-8">
      {/* Left Side Navigation — Tokens */}
      <aside className="w-64 shrink-0 hidden md:block border-r border-border pr-6">
        <h2 className="text-xs font-bold text-ink-disabled uppercase tracking-widest mb-4">Design Tokens</h2>
        <nav className="space-y-1">
          {/* Colors static page link */}
          <Link
            href="/tokens/colors"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-ink-subtle hover:text-ink hover:bg-surface-1 transition-colors"
          >
            <span>Colors</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-ink-disabled"><path d="m9 18 6-6-6-6"/></svg>
          </Link>

          {tokensList.map((token) => {
            const isSelected = token.slug === slug
            return (
              <Link
                key={token.slug}
                href={`/tokens/${token.slug}`}
                className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-accent/8 text-accent'
                    : 'text-ink-subtle hover:text-ink hover:bg-surface-1'
                }`}
              >
                <span>{token.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`h-3 w-3 transition-transform ${isSelected ? 'text-accent rotate-90' : 'text-ink-disabled'}`}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 space-y-8 overflow-hidden">
        {/* Header */}
        <div>
          <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-1.5">Design Tokens</p>
          <h1 className="text-3xl font-bold tracking-tight text-ink mb-2">
            {tokensList.find((t) => t.slug === slug)?.name || 'Design Tokens'}
          </h1>
          <p className="text-sm text-ink-subtle">
            {tokensList.find((t) => t.slug === slug)?.desc || 'Configurações atômicas do design system.'}
          </p>
        </div>

        {/* Dynamic Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
