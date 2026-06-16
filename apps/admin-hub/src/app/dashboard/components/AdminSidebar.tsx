'use client'

// =============================================================================
// ADMIN SIDEBAR NAV
// =============================================================================

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  Avatar,
  LogoImagotipo,
  useSidebar,
  LanguageSelector,
  ThemeToggle,
  useLanguage,
} from '@bezier-lab/ui'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Box,
  Globe,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'

function getExternalUrl(app: 'storefront' | 'catalog' | 'design-system') {
  if (typeof window === 'undefined') return ''
  const hostname = window.location.hostname
  const protocol = window.location.protocol

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    if (app === 'storefront') return `${protocol}//localhost:3000`
    if (app === 'catalog') return `${protocol}//localhost:3000/portal/products`
    if (app === 'design-system') return `${protocol}//localhost:3002`
  }

  // Production - assume subdomains based on the domain (e.g. if admin is admin.bezierlab.com, storefront is bezierlab.com, design-system is design.bezierlab.com)
  const baseDomain = hostname.replace(/^admin\./, '')
  if (app === 'storefront') return `${protocol}//${baseDomain}`
  if (app === 'catalog') return `${protocol}//${baseDomain}/portal/products`
  if (app === 'design-system') return `${protocol}//design.${baseDomain}`
  return ''
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Inventory', href: '/dashboard/inventory', icon: Package },
  { label: 'Products', href: '/dashboard/products', icon: Box },
  { label: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { label: 'Clients', href: '/dashboard/clients', icon: Users },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const labelKeys: Record<string, string> = {
  'Dashboard': 'admin.nav.dashboard',
  'Inventory': 'admin.nav.inventory',
  'Products': 'admin.nav.products',
  'Orders': 'admin.nav.orders',
  'Clients': 'admin.nav.clients',
  'Settings': 'admin.nav.settings',
}

export function AdminSidebar({
  user,
}: {
  user?: { name?: string | null; email?: string | null; role?: string }
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()
  const { collapsed } = useSidebar()

  return (
    <Sidebar defaultCollapsed={false}>
      <SidebarHeader>
        <LogoImagotipo height={26} />
      </SidebarHeader>

      <SidebarSection title={t('admin.section.main')}>
        {navItems.slice(0, 1).map((item) => (
          <SidebarItem
            key={item.href}
            icon={<item.icon className="h-4 w-4" />}
            label={t(labelKeys[item.label] || item.label)}
            active={pathname === item.href}
            onClick={() => router.push(item.href)}
          />
        ))}
      </SidebarSection>

      <SidebarSection title={t('admin.section.manage')}>
        {navItems.slice(1, 5).map((item) => (
          <SidebarItem
            key={item.href}
            icon={<item.icon className="h-4 w-4" />}
            label={t(labelKeys[item.label] || item.label)}
            active={pathname.startsWith(item.href)}
            onClick={() => router.push(item.href)}
          />
        ))}
      </SidebarSection>

      <SidebarSection title={t('admin.section.system')}>
        {navItems.slice(5).map((item) => (
          <SidebarItem
            key={item.href}
            icon={<item.icon className="h-4 w-4" />}
            label={t(labelKeys[item.label] || item.label)}
            active={pathname.startsWith(item.href)}
            onClick={() => router.push(item.href)}
          />
        ))}
      </SidebarSection>

      <SidebarSection title={t('admin.section.shortcuts')}>
        <SidebarItem
          icon={<Globe className="h-4 w-4" />}
          label={t('admin.nav.storefront')}
          onClick={() => window.open(getExternalUrl('storefront'), '_blank')}
        />
        <SidebarItem
          icon={<ShoppingBag className="h-4 w-4" />}
          label={t('admin.nav.catalog')}
          onClick={() => window.open(getExternalUrl('catalog'), '_blank')}
        />
        <SidebarItem
          icon={<Sparkles className="h-4 w-4" />}
          label={t('admin.nav.ds')}
          onClick={() => window.open(getExternalUrl('design-system'), '_blank')}
        />
      </SidebarSection>

      <SidebarFooter>
        {/* Settings selectors */}
        {collapsed ? (
          <div className="flex justify-center py-2 mb-2 border-b border-border">
            <ThemeToggle />
          </div>
        ) : (
          <div className="flex items-center justify-between px-2.5 py-2 mb-2 border-b border-border gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        )}

        {/* User info */}
        <div className="flex items-center gap-2.5 px-2 py-2 mb-2">
          <Avatar size="sm" fallback={user?.name ?? 'Admin'} status="online" />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">{user?.name ?? 'Admin'}</p>
              <p className="text-xs text-ink-muted truncate">{user?.role ?? 'ADMIN'}</p>
            </div>
          )}
        </div>
        {/* Sign out */}
        <SidebarItem
          icon={<LogOut className="h-4 w-4" />}
          label={t('admin.nav.signout')}
          onClick={() => signOut({ callbackUrl: '/login' })}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
