'use client'

// =============================================================================
// CLIENT PORTAL — Products catalog page
// Clients can browse products posted by admin
// =============================================================================

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Badge, Button, Input, Card, CardContent } from '@bezier-lab/ui'
import { Search, Filter, Package, ShoppingCart, ArrowRight, Eye } from 'lucide-react'

// ---------------------------------------------------------------------------
// Mock products (in production: fetched from admin-hub API)
// ---------------------------------------------------------------------------
const mockProducts = [
  {
    id: '1',
    name: 'Titanium Bracket v2',
    description: 'High-strength titanium composite bracket for aerospace and industrial applications.',
    price: 149.99,
    stock: 12,
    category: 'Industrial',
    material: 'Titanium CF',
    leadTime: '48h',
    imageUrl: null,
  },
  {
    id: '2',
    name: 'Precision Nozzle Set',
    description: 'Set of 3 precision-engineered nozzles for FDM printing applications.',
    price: 89.50,
    stock: 34,
    category: 'Parts',
    material: 'Hardened Steel',
    leadTime: '24h',
    imageUrl: null,
  },
  {
    id: '3',
    name: 'Tool Organizer Grid',
    description: 'Modular grid system for workshop tool organization. Wall-mountable.',
    price: 45.00,
    stock: 20,
    category: 'Accessories',
    material: 'PETG',
    leadTime: '24h',
    imageUrl: null,
  },
  {
    id: '4',
    name: 'Gear Housing v3',
    description: 'Precision-molded gear housing for mechanical transmission systems.',
    price: 67.00,
    stock: 8,
    category: 'Industrial',
    material: 'PETG',
    leadTime: '36h',
    imageUrl: null,
  },
]

const categories = ['All', 'Industrial', 'Parts', 'Accessories', 'Enclosures']

// ---------------------------------------------------------------------------
// Product card
// ---------------------------------------------------------------------------
function ProductCard({ product }: { product: typeof mockProducts[0] }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card variant="default" padding="none" className="overflow-hidden group hover:border-[rgba(0,240,255,0.2)] transition-all duration-200 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="h-48 bg-[#0f1011] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] flex items-center justify-center">
            <Package className="h-16 w-16 text-[#1e2124] group-hover:text-[rgba(0,240,255,0.2)] transition-colors" strokeWidth={1} />
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="default" size="sm">{product.category}</Badge>
          </div>
          {product.stock <= 5 && (
            <div className="absolute top-3 right-3">
              <Badge variant="warning" size="sm">Low stock</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-base font-semibold text-[#e8eaed] mb-1.5 group-hover:text-[#00F0FF] transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-[#636b76] leading-relaxed mb-4 flex-1">
              {product.description}
            </p>

            {/* Specs */}
            <div className="flex gap-2 mb-4">
              <Badge variant="default" size="sm">{product.material}</Badge>
              <Badge variant="accent" size="sm">{product.leadTime}</Badge>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#e8eaed]">${product.price.toFixed(2)}</p>
                <p className="text-xs text-[#636b76]">{product.stock} in stock</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon-sm" aria-label="View details">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="primary" size="sm" leftIcon={<ShoppingCart className="h-3.5 w-3.5" />}>
                  Order
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function PortalProductsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = mockProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-32">
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#636b76] mb-8">
            <Link href="/portal" className="hover:text-[#9da3ae] transition-colors">Portal</Link>
            <span>/</span>
            <span className="text-[#9da3ae]">Products</span>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold tracking-tight text-[#e8eaed] mb-3">
              Product Catalog
            </h1>
            <p className="text-base text-[#636b76]">
              Browse our available 3D printed components and place orders.
            </p>
          </motion.div>

          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 max-w-sm">
              <Input
                id="products-search"
                placeholder="Search products..."
                leftIcon={<Search className="h-4 w-4" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
                    activeCategory === cat
                      ? 'bg-[rgba(0,240,255,0.1)] text-[#00F0FF] border border-[rgba(0,240,255,0.3)]'
                      : 'text-[#636b76] border border-[#1e2124] hover:border-[#2a2e33] hover:text-[#9da3ae]',
                  ].join(' ')}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20 text-[#636b76]">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-30" strokeWidth={1} />
                <p className="text-sm">No products found. Try a different search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
