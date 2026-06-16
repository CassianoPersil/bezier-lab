import React from 'react'
import Link from 'next/link'
import { LogoImagotipo, useLanguage } from '@bezier-lab/ui'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@bezierlab.com', label: 'Email' },
]

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    [t('footer.company')]: [
      { label: t('footer.aboutUs'), href: '/about' },
      { label: t('nav.portfolio'), href: '/portfolio' },
      { label: t('nav.services'), href: '/services' },
      { label: t('nav.contact'), href: '/' },
    ],
    [t('footer.services')]: [
      { label: t('footer.fdm'), href: '/services#fdm' },
      { label: t('footer.resin'), href: '/services#resin' },
      { label: t('footer.parts'), href: '/services#industrial' },
      { label: t('footer.customDesign'), href: '/services#design' },
    ],
    [t('footer.client')]: [
      { label: t('nav.portal'), href: '/portal' },
      { label: t('footer.tracking'), href: '/portal/orders' },
      { label: t('footer.catalog'), href: '/portal/products' },
    ],
    [t('footer.legal')]: [
      { label: t('footer.privacy'), href: '/privacy' },
      { label: t('footer.terms'), href: '/terms' },
    ],
  }

  return (
    <footer className="border-t border-border bg-canvas mt-32">
      {/* Glow line at top */}
      <div className="glow-line" />

      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <LogoImagotipo height={30} className="mb-4" />
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs mb-6">
              {t('footer.desc')}
            </p>
            {/* Social links */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-8 w-8 flex items-center justify-center rounded-lg border border-border text-ink-muted hover:text-ink hover:border-accent/30 transition-all"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-subtle hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-xs text-ink-disabled">
            © {new Date().getFullYear()} Bézier Lab. {t('footer.rights')}
          </p>
          <p className="text-xs text-ink-disabled">
            {t('footer.builtWith')} <span className="text-accent">{t('footer.precision')}</span> {t('footer.using')} Next.js & Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
