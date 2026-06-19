'use client'

// =============================================================================
// PRODUCTS CATALOG PAGE — Admin Hub
// =============================================================================

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Button,
  Badge,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  useLanguage,
} from '@bezier-lab/ui'
import { Plus, Search, Box, Edit2, Archive, Globe, Tag } from 'lucide-react'

const initialProducts = [
  { id: '1', name: 'Titanium Bracket v2', sku: 'TB-002', price: 149.99, status: 'PUBLISHED', category: 'Industrial', desc: 'High-strength titanium composite bracket for aerospace and industrial applications. Tolerances ±0.1mm.' },
  { id: '2', name: 'Precision Nozzle Set', sku: 'PN-007', price: 89.50, status: 'PUBLISHED', category: 'Parts', desc: 'Set of 3 precision-engineered nozzles for FDM printing applications.' },
  { id: '3', name: 'Tool Organizer Grid', sku: 'TO-009', price: 45.00, status: 'PUBLISHED', category: 'Accessories', desc: 'Modular grid system for workshop tool organization. Wall-mountable design.' },
]

export default function ProductsPage() {
  const [products] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const { t, language } = useLanguage()

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <p className="text-xs text-ink-muted uppercase tracking-widest mb-1">Catálogo</p>
          <h1 className="text-3xl font-bold text-ink tracking-tight">Produtos</h1>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />}>
          Criar Produto
        </Button>
      </motion.div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 max-w-xs">
          <Input
            id="products-search"
            placeholder="Buscar no catálogo..."
            leftIcon={<Search className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 border border-dashed border-border rounded-2xl text-ink-disabled text-sm">
            Nenhum produto encontrado no catálogo.
          </div>
        ) : (
          filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card variant="default" className="h-full flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
                      <Box className="h-5 w-5 text-accent" />
                    </div>
                    <Badge variant="success">{product.status}</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                  <CardDescription className="text-xs font-mono">{product.sku}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-ink-subtle leading-relaxed mb-4">{product.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-2 border border-border text-ink-muted">
                      <Tag className="h-3 w-3" /> {product.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-2 border border-border text-ink-muted">
                      <Globe className="h-3 w-3" /> E-commerce
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-lg font-bold text-ink">
                    {language === 'pt' 
                      ? `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : `$${product.price.toFixed(2)}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" leftIcon={<Edit2 className="h-3.5 w-3.5" />}>
                      Editar
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-ink-muted hover:text-ink">
                      <Archive className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}
