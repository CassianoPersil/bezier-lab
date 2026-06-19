'use client'

// =============================================================================
// INVENTORY PAGE — Admin Hub
// CRUD interface for 3D printing products
// =============================================================================

import React, { useState, useEffect } from 'react'
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
  product: any
  onEdit: (p: any) => void
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
            <p className="text-xs text-ink-muted font-mono">{product.sku || 'N/A'}</p>
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
        <Badge variant={statusVariant[product.status] || 'default'}>{product.status}</Badge>
      </TableTd>
      <TableTd>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={() => onEdit(product)} aria-label="Edit product">
            <Edit2 className="h-3.5 w-3.5" />
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
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  // Dialog/Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    sku: '',
    price: 0,
    stock: 0,
    status: 'DRAFT',
    category: 'Industrial',
    description: '',
  })

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { t } = useLanguage()

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const isEdit = !!formData.id
      const url = isEdit ? `/api/products/${formData.id}` : '/api/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsFormOpen(false)
        fetchProducts()
      } else {
        const errData = await res.json()
        alert(errData.error || 'Failed to save product')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setDeleteId(null)
        fetchProducts()
      } else {
        alert('Failed to delete product')
      }
    } catch (err) {
      console.error(err)
    }
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
        <Button
          id="add-product-btn"
          variant="primary"
          size="md"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => {
            setFormData({
              id: '',
              name: '',
              sku: '',
              price: 0,
              stock: 0,
              status: 'DRAFT',
              category: 'Industrial',
              description: '',
            })
            setIsFormOpen(true)
          }}
        >
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
            {loading ? (
              <TableRow>
                <TableTd colSpan={6} className="text-center py-10 text-ink-muted">
                  Loading products...
                </TableTd>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableEmpty message={t('admin.inventory.empty')} />
            ) : (
              filtered.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={(p) => {
                    setFormData({
                      id: p.id,
                      name: p.name,
                      sku: p.sku || '',
                      price: p.price,
                      stock: p.stock,
                      status: p.status,
                      category: p.category || 'Industrial',
                      description: p.description || '',
                    })
                    setIsFormOpen(true)
                  }}
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

      {/* Add/Edit Product dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent size="md">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>
                {formData.id ? 'Edit Product' : 'Add Product'}
              </DialogTitle>
            </DialogHeader>
            <DialogBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-ink-muted block mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-surface-2 border border-border p-2 rounded text-sm text-ink focus:outline-none focus:border-accent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-muted block mb-1">SKU</label>
                  <input
                    type="text"
                    className="w-full bg-surface-2 border border-border p-2 rounded text-sm text-ink focus:outline-none focus:border-accent"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-ink-muted block mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full bg-surface-2 border border-border p-2 rounded text-sm text-ink focus:outline-none focus:border-accent"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-muted block mb-1">Stock *</label>
                  <input
                    type="number"
                    required
                    className="w-full bg-surface-2 border border-border p-2 rounded text-sm text-ink focus:outline-none focus:border-accent"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-ink-muted block mb-1">Category</label>
                  <select
                    className="w-full bg-surface-2 border border-border p-2 rounded text-sm text-ink focus:outline-none focus:border-accent"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Industrial">Industrial</option>
                    <option value="Parts">Parts</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Enclosures">Enclosures</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-ink-muted block mb-1">Status</label>
                  <select
                    className="w-full bg-surface-2 border border-border p-2 rounded text-sm text-ink focus:outline-none focus:border-accent"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="DRAFT">DRAFT (Draft)</option>
                    <option value="PUBLISHED">PUBLISHED (Active)</option>
                    <option value="ARCHIVED">ARCHIVED (Archived)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-ink-muted block mb-1">Description *</label>
                <textarea
                  required
                  className="w-full bg-surface-2 border border-border p-2 rounded text-sm text-ink focus:outline-none focus:border-accent h-20 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
