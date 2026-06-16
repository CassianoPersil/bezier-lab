// =============================================================================
// DASHBOARD HOME — Admin Hub
// =============================================================================

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { DashboardContent } from './components/DashboardContent'

async function getDashboardStats() {
  try {
    const [totalProducts, totalOrders, totalClients, pendingOrders] = await Promise.all([
      prisma.product.count({ where: { status: 'PUBLISHED' } }),
      prisma.order.count(),
      prisma.user.count({ where: { role: 'CLIENT' } }),
      prisma.order.count({ where: { status: 'PENDING' } }),
    ])

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    })

    return { totalProducts, totalOrders, totalClients, pendingOrders, recentOrders }
  } catch {
    // Return zeros if DB not yet initialized
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalClients: 0,
      pendingOrders: 0,
      recentOrders: [],
    }
  }
}

export default async function DashboardPage() {
  const session = await auth()
  const stats = await getDashboardStats()

  return <DashboardContent session={session} stats={stats} />
}
