'use client'

import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Check initial class on documentElement
    const isDark = document.documentElement.classList.contains('dark')
    setThemeState(isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setThemeState(nextTheme)
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('bezier-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('bezier-theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="h-8 w-8 flex items-center justify-center rounded-lg border border-border bg-surface-1 text-ink-subtle hover:text-ink hover:border-border-strong hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-all duration-150"
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      aria-pressed={theme === 'dark'}
      title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
