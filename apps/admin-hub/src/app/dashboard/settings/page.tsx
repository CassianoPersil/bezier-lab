'use client'

// =============================================================================
// SETTINGS PAGE — Admin Hub
// =============================================================================

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  useLanguage,
} from '@bezier-lab/ui'
import { Settings, Save, Shield, Database, KeyRound, Globe2 } from 'lucide-react'

export default function SettingsPage() {
  const { t, setLanguage, language } = useLanguage()
  const [profileName, setProfileName] = useState('Bézier Admin')
  const [profileEmail, setProfileEmail] = useState('admin@bezierlab.com')
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Configurações salvas com sucesso!')
    }, 1000)
  }

  return (
    <div className="p-8 max-w-screen-md mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-xs text-ink-muted uppercase tracking-widest mb-1">Sistema</p>
        <h1 className="text-3xl font-bold text-ink tracking-tight">Configurações</h1>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-accent" />
                <CardTitle className="text-base font-bold">Perfil do Administrador</CardTitle>
              </div>
              <CardDescription>Gerencie suas informações pessoais e credenciais de login no Backoffice.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="profile-name"
                  label="Nome Completo"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
                <Input
                  id="profile-email"
                  label="E-mail Administrativo"
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-4 border-t border-border mt-4">
              <Button variant="primary" size="sm" onClick={handleSave} loading={loading} leftIcon={<Save className="h-3.5 w-3.5" />}>
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* System & Language Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Globe2 className="h-4 w-4 text-accent" />
                <CardTitle className="text-base font-bold">Idioma e Preferências</CardTitle>
              </div>
              <CardDescription>Ajuste o idioma global de exibição da interface do painel.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Button
                  variant={language === 'pt' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('pt')}
                >
                  Português (Brasil)
                </Button>
                <Button
                  variant={language === 'en' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                >
                  English (US)
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Database & System Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Database className="h-4 w-4 text-ink-muted" />
                <CardTitle className="text-base font-bold text-ink-subtle">Informações do Banco de Dados</CardTitle>
              </div>
              <CardDescription>Status atual e conexão do motor de persistência SQLite local.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs font-mono text-ink-muted bg-surface-2 border border-border p-4 rounded-lg">
              <p>Motor de Banco: SQLite v3</p>
              <p>Instância: prisma/dev.db</p>
              <p>Status: Conectado e ativo</p>
              <p>Tabelas Carregadas: User, Session, Product, Order, OrderItem</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
