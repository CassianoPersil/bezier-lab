'use client'

// =============================================================================
// CLIENT PORTAL — Products catalog page
// Clients can browse products posted by admin
// =============================================================================

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import {
  Badge,
  Button,
  Input,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  useLanguage,
} from '@bezier-lab/ui'
import {
  Search,
  Filter,
  Package,
  ShoppingCart,
  ArrowRight,
  Eye,
  Plus,
  Minus,
  Trash2,
  Check,
} from 'lucide-react'

// Fallback mock products (if backend API is unreachable)
const fallbackProducts = [
  {
    id: '1',
    name: 'Logo Coaster (B2B)',
    description: 'Custom B2B coaster with rubber feet and engraved company branding logo.',
    price: 4.99,
    stock: 500,
    category: 'Accessories',
    tags: 'Resin,24h',
  },
  {
    id: '2',
    name: 'Geometric Hex Planter (B2C)',
    description: 'Aesthetic self-watering planter drops for modern home and office desks.',
    price: 18.50,
    stock: 45,
    category: 'Enclosures',
    tags: 'PLA Silk,48h',
  },
  {
    id: '3',
    name: 'Carbon Fiber Organizer Tray',
    description: 'Ultra-lightweight desk tray printed with aerospace carbon-fiber composites.',
    price: 45.00,
    stock: 15,
    category: 'Accessories',
    tags: 'Carbon CF,24h',
  },
  {
    id: '4',
    name: 'Ergonomic Phone Stand',
    description: 'Fully adjustable desktop mount compatible with all iPhone and Android models.',
    price: 12.00,
    stock: 80,
    category: 'Parts',
    tags: 'PETG,24h',
  },
]

const categories = ['All', 'Industrial', 'Parts', 'Accessories', 'Enclosures']

interface CartItem {
  product: any
  quantity: number
}

export default function PortalProductsPage() {
  const { t, language } = useLanguage()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // UI state
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false)

  // Fetch products from backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch('http://localhost:3001/api/products?status=PUBLISHED')
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        } else {
          throw new Error('API returned error status')
        }
      } catch (err: any) {
        console.warn('Backend API unreachable. Falling back to mock catalog.', err)
        setProducts(fallbackProducts)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Cart operations
  useEffect(() => {
    const saved = localStorage.getItem('bezier-cart')
    if (saved) {
      try {
        setCart(JSON.parse(saved))
      } catch (e) {
        console.error('Error parsing cart from storage:', e)
      }
    }
  }, [])

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem('bezier-cart', JSON.stringify(newCart))
  }

  const addToCart = (product: any) => {
    const existing = cart.find((item) => item.product.id === product.id)
    if (existing) {
      if (existing.quantity >= product.stock) {
        alert(language === 'pt' ? `Estoque esgotado. Apenas ${product.stock} disponíveis.` : `Stock limit reached. Only ${product.stock} available.`)
        return
      }
      const updated = cart.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      saveCart(updated)
    } else {
      saveCart([...cart, { product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: string, qty: number) => {
    const item = cart.find(i => i.product.id === productId)
    if (!item) return

    if (qty <= 0) {
      saveCart(cart.filter((item) => item.product.id !== productId))
    } else {
      if (qty > item.product.stock) {
        alert(language === 'pt' ? `Apenas ${item.product.stock} em estoque.` : `Only ${item.product.stock} items in stock.`)
        return
      }
      saveCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item)))
    }
  }

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter((item) => item.product.id !== productId))
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutSuccess(true)
    saveCart([])
  }

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-32 bg-canvas">
        <div className="max-w-screen-xl mx-auto px-6 relative">
          
          {/* Floating Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-accent text-canvas px-5 py-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-3 font-extrabold focus:outline-none focus:ring-2 focus:ring-accent border border-accent/20"
            aria-label={language === 'pt' ? 'Abrir carrinho de compras' : 'Open shopping cart'}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs font-mono bg-canvas text-accent px-2 py-0.5 rounded-full font-bold">
              {cartItemCount}
            </span>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-ink-muted mb-8">
            <Link href="/portal" className="hover:text-ink transition-colors">Portal</Link>
            <span>/</span>
            <span className="text-ink-subtle">Products</span>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold tracking-tight text-ink mb-3">
              {language === 'pt' ? 'Catálogo do Marketplace' : 'Marketplace Catalog'}
            </h1>
            <p className="text-base text-ink-subtle">
              {language === 'pt' 
                ? 'Selecione produtos premium e personalize com a marca da sua empresa.' 
                : 'Browse premium products and customize them with your company branding.'}
            </p>
          </motion.div>

          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 max-w-sm">
              <Input
                id="products-search"
                placeholder={language === 'pt' ? 'Buscar produtos...' : 'Search products...'}
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
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 border focus:outline-none focus:ring-1 focus:ring-accent',
                    activeCategory === cat
                      ? 'bg-accent/10 text-accent border-accent/30'
                      : 'bg-surface-1 text-ink-muted border-border hover:border-border-strong hover:text-ink',
                  ].join(' ')}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="text-center py-20 text-ink-muted">
              <p>{language === 'pt' ? 'Carregando catálogo...' : 'Loading catalog...'}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => {
                const tagsList = product.tags ? product.tags.split(',') : []
                const material = tagsList[0] || 'Carbon Fiber'
                const leadTime = tagsList[1] || '48h'
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card variant="default" padding="none" className="overflow-hidden group hover:border-[rgba(0,240,255,0.2)] transition-all duration-200 h-full flex flex-col justify-between">
                      {/* Thumbnail */}
                      <div className="h-48 bg-canvas-deep relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] flex items-center justify-center">
                          <Package className="h-16 w-16 text-ink-disabled/20 group-hover:text-accent/20 transition-colors" strokeWidth={1} />
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge variant="default" size="sm">{product.category}</Badge>
                        </div>
                        {product.stock <= 5 && (
                          <div className="absolute top-3 right-3">
                            <Badge variant="warning" size="sm">{language === 'pt' ? 'Pouco estoque' : 'Low stock'}</Badge>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <CardContent className="flex-1 flex flex-col justify-between p-5">
                        <div>
                          <h3 className="text-base font-semibold text-ink mb-1.5 group-hover:text-accent transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-ink-subtle leading-relaxed mb-4 line-clamp-2">
                            {product.description}
                          </p>

                          {/* Specs */}
                          <div className="flex gap-2 mb-4">
                            <Badge variant="default" size="sm">{material}</Badge>
                            <Badge variant="accent" size="sm">{leadTime}</Badge>
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between mt-auto border-t border-border/30 pt-4">
                          <div>
                            <p className="text-xl font-bold text-ink">${product.price.toFixed(2)}</p>
                            <p className="text-[10px] text-ink-muted">{product.stock} {language === 'pt' ? 'disponíveis' : 'in stock'}</p>
                          </div>
                          <div className="flex gap-1.5">
                            <Button 
                              variant="ghost" 
                              size="icon-sm" 
                              aria-label={language === 'pt' ? 'Ver detalhes do produto' : 'View product details'}
                              onClick={() => setSelectedProduct(product)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="primary" 
                              size="sm" 
                              leftIcon={<ShoppingCart className="h-3.5 w-3.5" />}
                              onClick={() => addToCart(product)}
                            >
                              {language === 'pt' ? 'Comprar' : 'Order'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-20 text-ink-muted">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-30" strokeWidth={1} />
                  <p className="text-sm">{language === 'pt' ? 'Nenhum produto encontrado. Tente outra busca.' : 'No products found. Try a different search.'}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Shopping Cart Drawer Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent size="md" className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-accent" />
              {language === 'pt' ? 'Seu Carrinho' : 'Your Shopping Cart'}
            </DialogTitle>
          </DialogHeader>

          <DialogBody className="space-y-4 py-4">
            {cart.length === 0 ? (
              <div className="text-center py-10 text-ink-muted">
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">{language === 'pt' ? 'Carrinho vazio. Adicione produtos!' : 'Your cart is empty. Add products!'}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between border-b border-border/30 pb-3">
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="text-sm font-semibold text-ink truncate">{item.product.name}</h4>
                      <p className="text-xs text-accent font-semibold mt-0.5">${item.product.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-border rounded-lg bg-surface-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:text-accent transition-colors focus:outline-none"
                          aria-label={language === 'pt' ? 'Diminuir quantidade' : 'Decrease quantity'}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-ink">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:text-accent transition-colors focus:outline-none"
                          aria-label={language === 'pt' ? 'Aumentar quantidade' : 'Increase quantity'}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-danger hover:bg-danger/10 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-danger"
                        aria-label={language === 'pt' ? 'Remover item' : 'Remove item'}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-4 border-t border-border font-bold">
                  <span className="text-sm text-ink">{language === 'pt' ? 'Total:' : 'Subtotal:'}</span>
                  <span className="text-lg text-accent">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            )}
          </DialogBody>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="ghost" size="sm">{language === 'pt' ? 'Continuar Comprando' : 'Continue Shopping'}</Button>
            </DialogClose>
            {cart.length > 0 && (
              <Button variant="primary" size="sm" onClick={handleCheckout}>
                {language === 'pt' ? 'Finalizar Pedido' : 'Checkout Order'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        {selectedProduct && (
          <DialogContent size="md">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
            </DialogHeader>

            <DialogBody className="space-y-4">
              <div className="h-48 bg-canvas-deep border border-border/50 rounded-xl relative overflow-hidden flex items-center justify-center">
                <Package className="h-20 w-20 text-accent/25" strokeWidth={1} />
                <div className="absolute top-4 left-4">
                  <Badge variant="default">{selectedProduct.category}</Badge>
                </div>
              </div>

              <p className="text-sm text-ink-subtle leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-4 border-y border-border/30 py-4 font-mono text-xs">
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider">{language === 'pt' ? 'Material:' : 'Material Spec:'}</span>
                  <span className="text-ink font-bold mt-1 block">
                    {selectedProduct.tags ? selectedProduct.tags.split(',')[0] : 'Carbon Fiber'}
                  </span>
                </div>
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider">{language === 'pt' ? 'Envio Estimado:' : 'Est. Lead Time:'}</span>
                  <span className="text-ink font-bold mt-1 block">
                    {selectedProduct.tags ? selectedProduct.tags.split(',')[1] : '48h'}
                  </span>
                </div>
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider">{language === 'pt' ? 'Estoque:' : 'In Stock:'}</span>
                  <span className="text-ink font-bold mt-1 block">{selectedProduct.stock} {language === 'pt' ? 'unidades' : 'units'}</span>
                </div>
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider">{language === 'pt' ? 'Preço Unitário:' : 'Unit Price:'}</span>
                  <span className="text-accent font-bold mt-1 block">${selectedProduct.price.toFixed(2)}</span>
                </div>
              </div>
            </DialogBody>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" size="sm">{language === 'pt' ? 'Fechar' : 'Close'}</Button>
              </DialogClose>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<ShoppingCart className="h-3.5 w-3.5" />}
                onClick={() => {
                  addToCart(selectedProduct)
                  setSelectedProduct(null)
                }}
              >
                {language === 'pt' ? 'Adicionar ao Carrinho' : 'Add to Cart'}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Checkout Success Confirmation Modal */}
      <Dialog open={isCheckoutSuccess} onOpenChange={setIsCheckoutSuccess}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle className="text-success flex items-center gap-2">
              <Check className="h-5 w-5 bg-success/20 p-0.5 rounded-full" />
              {language === 'pt' ? 'Pedido Confirmado!' : 'Order Placed!'}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm text-ink-subtle leading-relaxed">
              {language === 'pt'
                ? 'Seu pedido personalizado do marketplace foi encaminhado com sucesso para a fazenda de impressão 3D.'
                : 'Your customized marketplace order has been successfully sent to the 3D printing farm.'}
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="primary" size="sm" onClick={() => setIsCheckoutSuccess(false)}>
                {language === 'pt' ? 'Excelente' : 'Great'}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
