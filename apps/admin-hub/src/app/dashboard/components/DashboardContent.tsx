'use client'

// =============================================================================
// DASHBOARD CONTENT — Client Component
// =============================================================================

import React from 'react'
import { motion } from 'framer-motion'
import { Badge, Card, CardContent, Table, TableHead, TableBody, TableRow, TableTh, TableTd, TableEmpty, useLanguage } from '@bezier-lab/ui'
import {
  Package,
  ShoppingCart,
  Users,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Order status badge colors
// ---------------------------------------------------------------------------
const statusBadgeVariant: Record<string, 'default' | 'warning' | 'accent' | 'success' | 'danger'> = {
  PENDING: 'warning',
  IN_PRODUCTION: 'accent',
  QUALITY_CHECK: 'info' as any,
  READY: 'success',
  DELIVERED: 'default',
  CANCELLED: 'danger',
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------
function StatCard({
  label,
  value,
  icon: Icon,
  change,
  color = '#9da3ae',
  delay = 0,
}: {
  label: string
  value: number | string
  icon: React.ElementType
  change?: string
  color?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card variant="default" padding="md" hoverable className="h-full">
        <CardContent>
          <div className="flex items-start justify-between mb-4">
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}18`, border: `1px solid ${color}25` }}
            >
              <Icon className="h-4.5 w-4.5" style={{ color }} />
            </div>
            {change && (
              <div className="flex items-center gap-0.5 text-xs text-[#4ade80]">
                <ArrowUpRight className="h-3 w-3" />
                {change}
              </div>
            )}
          </div>
          <div className="text-3xl font-bold text-[#e8eaed] tracking-tight mb-1">{value}</div>
          <div className="text-sm text-[#636b76]">{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function DashboardContent({
  session,
  stats,
}: {
  session: any
  stats: {
    totalProducts: number
    totalOrders: number
    totalClients: number
    pendingOrders: number
    recentOrders: any[]
  }
}) {
  const { t } = useLanguage()

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return t('admin.dashboard.greeting.morning')
    if (h < 18) return t('admin.dashboard.greeting.afternoon')
    return t('admin.dashboard.greeting.evening')
  }

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-10"
      >
        <p className="text-sm text-ink-muted mb-1">
          {greeting()}, <span className="text-ink-subtle">{session?.user?.name ?? 'Admin'}</span>
        </p>
        <h1 className="text-3xl font-bold text-ink tracking-tight">Dashboard</h1>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label={t('admin.dashboard.totalProducts')} value={stats.totalProducts} icon={Package} color="var(--color-accent)" delay={0} />
        <StatCard label={t('admin.dashboard.totalOrders')} value={stats.totalOrders} icon={ShoppingCart} color="#c084fc" delay={0.05} />
        <StatCard label={t('admin.dashboard.totalClients')} value={stats.totalClients} icon={Users} color="#4ade80" delay={0.1} />
        <StatCard label={t('admin.dashboard.pendingOrders')} value={stats.pendingOrders} icon={Clock} color="#facc15" delay={0.15} />
      </div>

      {/* Recent orders */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-ink">{t('admin.dashboard.recentOrders')}</h2>
          <a href="/dashboard/orders" className="text-xs text-ink-subtle hover:text-accent transition-colors flex items-center gap-1">
            {t('admin.dashboard.viewAll')} <TrendingUp className="h-3 w-3" />
          </a>
        </div>

        <Table>
          <TableHead>
            <tr>
              <TableTh>{t('admin.dashboard.orderNumber')}</TableTh>
              <TableTh>{t('admin.dashboard.client')}</TableTh>
              <TableTh>{t('admin.dashboard.status')}</TableTh>
              <TableTh>{t('admin.dashboard.amount')}</TableTh>
              <TableTh>{t('admin.dashboard.date')}</TableTh>
            </tr>
          </TableHead>
          <TableBody>
            {stats.recentOrders.length === 0 ? (
              <TableEmpty message={t('admin.dashboard.emptyOrders')} />
            ) : (
              stats.recentOrders.map((order) => (
                <TableRow key={order.id} clickable>
                  <TableTd className="font-mono text-ink text-xs">{order.orderNumber}</TableTd>
                  <TableTd>
                    <div>
                      <p className="text-ink text-sm">{order.user?.name ?? 'Unknown'}</p>
                      <p className="text-xs text-ink-muted">{order.user?.email}</p>
                    </div>
                  </TableTd>
                  <TableTd>
                    <Badge variant={statusBadgeVariant[order.status] ?? 'default'} dot>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </TableTd>
                  <TableTd className="text-ink font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </TableTd>
                  <TableTd className="text-xs text-ink-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableTd>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}
