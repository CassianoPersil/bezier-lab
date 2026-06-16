'use client'

// =============================================================================
// INVENTORY PAGE — Admin Hub
// CRUD interface for 3D printing products
// =============================================================================

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Button,
  Badge,
  Input,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableTh,
  TableTd,
  TableEmpty,
  TableFooter,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogTrigger,
  useLanguage,
} from '@bezier-lab/ui'
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Package,
  Eye,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Mock data (replace with server fetch)
// ---------------------------------------------------------------------------
const mockProducts = [
  { id: '1', name: 'Titanium Bracket v2', sku: 'TB-002', price: 149.99, stock: 12, status: 'PUBLISHED', category: 'Industrial' },
  { id: '2', name: 'Precision Nozzle Set', sku: 'PN-007', price: 89.50, stock: 34, status: 'PUBLISHED', category: 'Parts' },
  { id: '3', name: 'Custom Enclosure Panel', sku: 'CE-015', price: 220.00, stock: 5, status: 'DRAFT', category: 'Enclosures' },
  { id: '4', name: 'Bearing Housing v3', sku: 'BH-003', price: 67.00, stock: 0, status: 'ARCHIVED', category: 'Industrial' },
  { id: '5', name: 'Tool Organizer Grid', sku: 'TO-009', price: 45.00, stock: 20, status: 'PUBLISHED', category: 'Accessories' },
]

const statusVariant: Record<string, any> = {
  PUBLISHED: 'success',
  DRAFT: 'warning',
  ARCHIVED: 'default',
}

// ---------------------------------------------------------------------------
// Product row
// ---------------------------------------------------------------------------
function ProductRow({
  product,
  onEdit,
  onDelete,
}: {
  product: typeof mockProducts[0]
  onEdit: (p: typeof mockProducts[0]) => void
  onDelete: (id: string) => void
}) {
  const { t } = useLanguage()

  return (
    <TableRow clickable>
      <TableTd>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-surface-2 border border-border flex items-center justify-center shrink-0">
            <Package className="h-3.5 w-3.5 text-ink-muted" />
          </div>
          <div>
            <p className="text-ink text-sm font-medium">{product.name}</p>
            <p className="text-xs text-ink-muted font-mono">{product.sku}</p>
          </div>
        </div>
      </TableTd>
      <TableTd>{product.category}</TableTd>
      <TableTd className="text-ink font-medium">${product.price.toFixed(2)}</TableTd>
      <TableTd>
        <span className={product.stock === 0 ? 'text-danger' : 'text-ink'}>
          {product.stock === 0 ? t('admin.inventory.outOfStock') : product.stock}
        </span>
      </TableTd>
      <TableTd>
        <Badge variant={statusVariant[product.status]}>{product.status}</Badge>
      </TableTd>
      <TableTd>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={() => onEdit(product)} aria-label="Edit product">
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Preview product">
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(product.id)}
            className="text-danger hover:bg-danger/10"
            aria-label="Delete product"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </TableTd>
    </TableRow>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function InventoryPage() {
  const [products, setProducts] = useState(mockProducts)
  const [search, setSearch] = useState('')
  const [editProduct, setEditProduct] = useState<typeof mockProducts[0] | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { t } = useLanguage()

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setDeleteId(null)
  }

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <p className="text-xs text-ink-muted uppercase tracking-widest mb-1">{t('admin.inventory.management')}</p>
          <h1 className="text-3xl font-bold text-ink tracking-tight">{t('admin.inventory.title')}</h1>
        </div>
        <Button id="add-product-btn" variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />}>
          {t('admin.inventory.addProduct')}
        </Button>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 max-w-xs">
          <Input
            id="inventory-search"
            placeholder={t('admin.inventory.search')}
            leftIcon={<Search className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="md" leftIcon={<Filter className="h-4 w-4" />}>
          {t('admin.inventory.filter')}
        </Button>
      </div>

      {/* Stats bar */}
      <div className="flex gap-6 mb-6 text-sm">
        {[
          { label: t('admin.inventory.total'), value: products.length, color: 'var(--color-text-secondary)' },
          { label: t('admin.inventory.published'), value: products.filter((p) => p.status === 'PUBLISHED').length, color: 'var(--color-success)' },
          { label: t('admin.inventory.draft'), value: products.filter((p) => p.status === 'DRAFT').length, color: 'var(--color-warning)' },
          { label: t('admin.inventory.outOfStock'), value: products.filter((p) => p.stock === 0).length, color: 'var(--color-danger)' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="text-ink-muted">{s.label}:</span>
            <span style={{ color: s.color }} className="font-semibold">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Table>
          <TableHead>
            <tr>
              <TableTh>{t('admin.inventory.product')}</TableTh>
              <TableTh>{t('admin.inventory.category')}</TableTh>
              <TableTh sortable>{t('admin.inventory.price')}</TableTh>
              <TableTh sortable>{t('admin.inventory.stock')}</TableTh>
              <TableTh>{t('admin.inventory.status')}</TableTh>
              <TableTh>{t('admin.inventory.actions')}</TableTh>
            </tr>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableEmpty message={t('admin.inventory.empty')} />
            ) : (
              filtered.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={setEditProduct}
                  onDelete={(id) => setDeleteId(id)}
                />
              ))
            )}
          </TableBody>
        </Table>

        <TableFooter>
          <span>
            {t('admin.inventory.count')
              .replace('{0}', String(filtered.length))
              .replace('{1}', String(products.length))}
          </span>
          <span className="text-ink-disabled">
            {t('admin.inventory.page')
              .replace('{0}', '1')
              .replace('{1}', '1')}
          </span>
        </TableFooter>
      </motion.div>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>{t('admin.inventory.deleteTitle')}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm text-ink-subtle">
              {t('admin.inventory.deleteConfirm')}
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setDeleteId(null)}>{t('admin.inventory.cancel')}</Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              {t('admin.inventory.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
