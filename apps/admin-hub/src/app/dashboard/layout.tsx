import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from './components/AdminSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      <AdminSidebar user={session.user as any} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
