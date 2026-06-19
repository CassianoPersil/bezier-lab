import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where = status ? { status } : {}
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(products, { headers: corsHeaders })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500, headers: corsHeaders }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, price, stock, status, category, material, leadTime } = body

    if (!name || !description || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, stock' },
        { status: 400, headers: corsHeaders }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        status: status || 'DRAFT',
        category: category || 'Accessories',
        // Storing tags or extra material specs in database fields if available
        tags: material ? `${material},${leadTime || '24h'}` : undefined,
      },
    })

    return NextResponse.json(product, { status: 201, headers: corsHeaders })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500, headers: corsHeaders }
    )
  }
}
