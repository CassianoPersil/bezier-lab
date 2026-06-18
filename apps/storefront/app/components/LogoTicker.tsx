'use client'

import React from 'react'
import { useLanguage } from '@bezier-lab/ui'

export function LogoTicker() {
  const { t } = useLanguage()

  // Standard high-end hardware/engineering company names for trust building
  const companies = [
    { name: 'EMBRAER', sub: 'Aerospace' },
    { name: 'BOSCH', sub: 'Engineering' },
    { name: 'WEG', sub: 'Automation' },
    { name: 'PETROBRAS', sub: 'Energy' },
    { name: 'IDEO', sub: 'Product Design' },
    { name: 'BOSTON DYNAMICS', sub: 'Robotics' },
    { name: 'STRYKER', sub: 'Medical Tech' },
    { name: 'AUDI', sub: 'Automotive' },
  ]

  // Duplicate the array to create a seamless infinite loop
  const duplicatedCompanies = [...companies, ...companies, ...companies]

  return (
    <section className="py-14 bg-canvas border-y border-border-strong/10 relative overflow-hidden select-none">
      <div className="max-w-screen-xl mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] uppercase font-mono tracking-[0.2em] text-ink-muted/80">
          {t('ticker.title')}
        </p>
      </div>

      {/* Infinite scrolling marquee using CSS animations */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right fade masks to blend logo entry/exit beautifully */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-canvas to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-canvas to-transparent z-10 pointer-events-none" />

        <div className="flex gap-20 py-4 shrink-0 items-center animate-marquee min-w-full">
          {duplicatedCompanies.map((company, idx) => (
            <div 
              key={`${company.name}-${idx}`} 
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              {/* Sleek Typographic Logo representation similar to premium hardware look */}
              <span className="text-lg font-black tracking-[0.25em] text-ink-muted/40 dark:text-ink-muted/20 group-hover:text-accent transition-colors duration-300 font-sans">
                {company.name}
              </span>
              <span className="text-[7px] uppercase font-mono tracking-widest text-ink-muted/20 dark:text-ink-muted/10 group-hover:text-accent/40 transition-colors duration-300">
                {company.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
