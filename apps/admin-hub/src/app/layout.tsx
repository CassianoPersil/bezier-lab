import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@bezier-lab/ui'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bézier Lab — Admin Hub',
  description: 'Backoffice management for Bézier Lab 3D printing studio.',
  robots: { index: false, follow: false }, // Private app — no indexing
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('bezier-theme');
                  var lang = localStorage.getItem('bezier-lang');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                  if (lang) {
                    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="bg-canvas text-ink min-h-screen">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
