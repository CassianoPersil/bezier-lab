const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

async function seed() {
  const prisma = new PrismaClient()
  
  try {
    // Create admin
    const adminHash = await bcrypt.hash('BezierAdmin2025!', 12)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@bezierlab.com' },
      update: {},
      create: {
        email: 'admin@bezierlab.com',
        name: 'Bezier Admin',
        passwordHash: adminHash,
        role: 'ADMIN',
      },
    })
    console.log('Admin created:', admin.email)

    // Create demo client
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
    console.log('Client created:', client.email)

    // Create sample products
    const p1 = await prisma.product.upsert({
      where: { sku: 'TB-002' },
      update: {},
      create: {
        name: 'Titanium Bracket v2',
        description: 'High-strength titanium composite bracket for aerospace applications.',
        price: 149.99,
        sku: 'TB-002',
        stock: 12,
        status: 'PUBLISHED',
        category: 'Industrial',
      },
    })

    const p2 = await prisma.product.upsert({
      where: { sku: 'PN-007' },
      update: {},
      create: {
        name: 'Precision Nozzle Set',
        description: 'Set of 3 precision-engineered nozzles for FDM printing.',
        price: 89.50,
        sku: 'PN-007',
        stock: 34,
        status: 'PUBLISHED',
        category: 'Parts',
      },
    })

    const p3 = await prisma.product.upsert({
      where: { sku: 'TO-009' },
      update: {},
      create: {
        name: 'Tool Organizer Grid',
        description: 'Modular grid system for workshop tool organization.',
        price: 45.00,
        sku: 'TO-009',
        stock: 20,
        status: 'PUBLISHED',
        category: 'Accessories',
      },
    })

    console.log('Products created:', p1.name, p2.name, p3.name)

    // Create demo order
    const existingOrder = await prisma.order.findFirst({
      where: { orderNumber: 'BL-2025-0001' }
    })

    if (!existingOrder) {
      const order = await prisma.order.create({
        data: {
          orderNumber: 'BL-2025-0001',
          userId: client.id,
          status: 'IN_PRODUCTION',
          totalAmount: 239.49,
          notes: 'Rush order',
          items: {
            create: [
              { productId: p1.id, quantity: 1, unitPrice: 149.99 },
              { productId: p3.id, quantity: 2, unitPrice: 45.00 },
            ],
          },
        },
      })
      console.log('Order created:', order.orderNumber)
    }

    console.log('\nSeed complete!')
    console.log('Admin: admin@bezierlab.com / BezierAdmin2025!')
    console.log('Client: client@example.com / client123')
  } finally {
    await prisma['$disconnect']()
  }
}

seed().catch(console.error)
