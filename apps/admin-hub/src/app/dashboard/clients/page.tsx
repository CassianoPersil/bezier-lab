'use client'

// =============================================================================
// CLIENTS MANAGEMENT PAGE — Admin Hub
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
  useLanguage,
} from '@bezier-lab/ui'
import { Plus, Search, Users, Mail, Phone, Calendar, ArrowUpRight } from 'lucide-react'

const initialClients = [
  { id: '1', name: 'Demo Client', email: 'client@example.com', ordersCount: 1, phone: '(11) 98765-4321', registered: '15/06/2026', role: 'CLIENT' },
  { id: '2', name: 'Atlas Corp', email: 'procurement@atlas.com', ordersCount: 12, phone: '(11) 99999-8888', registered: '10/05/2026', role: 'CORPORATE' },
  { id: '3', name: 'Nova Systems', email: 'dev@novasys.io', ordersCount: 8, phone: '(21) 98888-7777', registered: '01/06/2026', role: 'CORPORATE' },
  { id: '4', name: 'Vertex Labs', email: 'lab@vertex.net', ordersCount: 3, phone: '(31) 97777-6666', registered: '22/04/2026', role: 'CLIENT' },
]

export default function ClientsPage() {
  const [clients] = useState(initialClients)
  const [search, setSearch] = useState('')
  const { t } = useLanguage()

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
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
          <p className="text-xs text-ink-muted uppercase tracking-widest mb-1">Gerenciamento</p>
          <h1 className="text-3xl font-bold text-ink tracking-tight">Clientes</h1>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />}>
          Adicionar Cliente
        </Button>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 max-w-xs">
          <Input
            id="clients-search"
            placeholder="Buscar por nome ou e-mail..."
            leftIcon={<Search className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
              <TableTh>Nome / E-mail</TableTh>
              <TableTh>Tipo de Conta</TableTh>
              <TableTh>Contato</TableTh>
              <TableTh sortable>Pedidos Feitos</TableTh>
              <TableTh>Cadastro</TableTh>
              <TableTh>Ações</TableTh>
            </tr>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableEmpty message="Nenhum cliente cadastrado." />
            ) : (
              filtered.map((client) => (
                <TableRow key={client.id} clickable>
                  <TableTd>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-surface-2 border border-border flex items-center justify-center shrink-0">
                        <Users className="h-3.5 w-3.5 text-ink-muted" />
                      </div>
                      <div>
                        <p className="text-ink text-sm font-medium">{client.name}</p>
                        <p className="text-xs text-ink-muted flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {client.email}
                        </p>
                      </div>
                    </div>
                  </TableTd>
                  <TableTd>
                    <Badge variant={client.role === 'CORPORATE' ? 'accent' : 'default'}>
                      {client.role}
                    </Badge>
                  </TableTd>
                  <TableTd>
                    <span className="text-xs text-ink-subtle flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {client.phone}
                    </span>
                  </TableTd>
                  <TableTd className="font-semibold text-ink">{client.ordersCount}</TableTd>
                  <TableTd>
                    <span className="text-xs text-ink-muted flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {client.registered}
                    </span>
                  </TableTd>
                  <TableTd>
                    <Button variant="ghost" size="xs" rightIcon={<ArrowUpRight className="h-3 w-3" />}>
                      Ver Histórico
                    </Button>
                  </TableTd>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TableFooter>
          <span>Exibindo {filtered.length} de {clients.length} clientes</span>
        </TableFooter>
      </motion.div>
    </div>
  )
}
