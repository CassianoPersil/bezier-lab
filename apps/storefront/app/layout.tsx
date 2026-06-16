import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@bezier-lab/ui'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Bézier Lab — Premium 3D Printing & Design Studio',
  description:
    'Bézier Lab crafts precision-engineered 3D printed components for industrial, design, and creative applications. Explore our portfolio and order custom parts.',
  keywords: ['3D printing', 'custom parts', 'industrial design', 'precision manufacturing', 'Bézier Lab'],
  openGraph: {
    title: 'Bézier Lab — Premium 3D Printing Studio',
    description: 'Precision-engineered 3D printed components for every application.',
    type: 'website',
  },
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
      <body className="bg-canvas text-ink min-h-screen antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
