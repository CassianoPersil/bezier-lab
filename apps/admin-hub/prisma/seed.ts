// =============================================================================
// DATABASE SEED — Creates default admin user
// Run: npx prisma db seed
// =============================================================================

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Bézier Lab database...')

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@bezierlab.com'
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'BezierAdmin2025!'
  const passwordHash = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Bézier Admin',
      passwordHash,
      role: 'ADMIN',
    },
  })

  console.log(`✅ Admin user created: ${admin.email}`)

  // Create a demo client user
  const clientHash = await bcrypt.hash('client123', 12)
  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      email: 'client@example.com',
      name: 'Demo Client',
      passwordHash: clientHash,
      role: 'CLIENT',
    },
  })

  console.log(`✅ Demo client created: ${client.email}`)

  // Create sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'TB-002' },
      update: {},
      create: {
        name: 'Titanium Bracket v2',
        description: 'High-strength titanium composite bracket for aerospace and industrial applications. Tolerances ±0.1mm.',
        price: 149.99,
        sku: 'TB-002',
        stock: 12,
        status: 'PUBLISHED',
        category: 'Industrial',
        tags: JSON.stringify(['titanium', 'aerospace', 'bracket']),
      },
    }),
    prisma.product.upsert({
      where: { sku: 'PN-007' },
      update: {},
      create: {
        name: 'Precision Nozzle Set',
        description: 'Set of 3 precision-engineered nozzles for FDM printing applications.',
        price: 89.50,
        sku: 'PN-007',
        stock: 34,
        status: 'PUBLISHED',
        category: 'Parts',
        tags: JSON.stringify(['nozzle', 'FDM', 'parts']),
      },
    }),
    prisma.product.upsert({
      where: { sku: 'TO-009' },
      update: {},
      create: {
        name: 'Tool Organizer Grid',
        description: 'Modular grid system for workshop tool organization. Wall-mountable design.',
        price: 45.00,
        sku: 'TO-009',
        stock: 20,
        status: 'PUBLISHED',
        category: 'Accessories',
        tags: JSON.stringify(['organizer', 'workshop', 'wall-mount']),
      },
    }),
  ])

  console.log(`✅ ${products.length} sample products created`)

  // Create a demo order
  const order = await prisma.order.create({
    data: {
      orderNumber: `BL-${new Date().getFullYear()}-0001`,
      userId: client.id,
      status: 'IN_PRODUCTION',
      totalAmount: 239.49,
      notes: 'Rush order — needed by Friday',
      items: {
        create: [
          { productId: products[0].id, quantity: 1, unitPrice: 149.99 },
          { productId: products[2].id, quantity: 2, unitPrice: 45.00 },
        ],
      },
    },
  })

  console.log(`✅ Demo order created: ${order.orderNumber}`)
  console.log('\n🎉 Seed complete!')
  console.log(`\nAdmin login: ${adminEmail} / ${adminPassword}`)
  console.log('Client login: client@example.com / client123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
