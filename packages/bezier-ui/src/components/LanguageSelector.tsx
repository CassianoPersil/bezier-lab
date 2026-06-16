'use client'

import React from 'react'
import { useLanguage, Language } from './LanguageContext'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './Select'
import { Languages } from 'lucide-react'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-ink-subtle" aria-hidden="true" />
      <Select
        value={language}
        onValueChange={(val) => setLanguage(val as Language)}
      >
        <SelectTrigger 
          className="h-8 w-28 border border-border bg-surface-1 text-xs text-ink font-medium rounded-lg px-2 hover:bg-surface-2 focus-visible:outline-accent"
          aria-label="Selecionar idioma / Select language"
        >
          <SelectValue placeholder="Idioma" />
        </SelectTrigger>
        <SelectContent className="border border-border-strong bg-surface-1 rounded-lg shadow-lg">
          <SelectItem value="pt" className="text-xs text-ink-subtle hover:bg-surface-2 px-3 py-1.5 cursor-pointer">
            Português
          </SelectItem>
          <SelectItem value="en" className="text-xs text-ink-subtle hover:bg-surface-2 px-3 py-1.5 cursor-pointer">
            English
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
