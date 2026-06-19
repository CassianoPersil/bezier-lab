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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { name, description, price, stock, status, category, material, leadTime } = body

    const data: any = {}
    if (name !== undefined) data.name = name
    if (description !== undefined) data.description = description
    if (price !== undefined) data.price = parseFloat(price)
    if (stock !== undefined) data.stock = parseInt(stock)
    if (status !== undefined) data.status = status
    if (category !== undefined) data.category = category
    
    if (material !== undefined) {
      data.tags = `${material},${leadTime || '24h'}`
    }

    const product = await prisma.product.update({
      where: { id },
      data,
    })

    return NextResponse.json(product, { headers: corsHeaders })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500, headers: corsHeaders }
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const product = await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json(product, { headers: corsHeaders })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500, headers: corsHeaders }
    )
  }
}
