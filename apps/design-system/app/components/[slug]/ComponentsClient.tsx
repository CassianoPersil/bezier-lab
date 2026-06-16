'use client'

// =============================================================================
// DESIGN SYSTEM — Components Client Side Sandbox
// =============================================================================

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBody,
  DialogClose,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableTh,
  TableTd,
  Avatar,
  AvatarGroup,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsUnderlineList,
  TabsUnderlineTrigger,
  ToastProvider,
  useToast,
  Spinner,
  Skeleton,
} from '@bezier-lab/ui'
import {
  Mail,
  Plus,
  User,
  Settings,
  Copy,
  Check,
  Code,
  LayoutGrid,
  Info,
} from 'lucide-react'

// List of components for side navigation
const componentList = [
  { name: 'Button', slug: 'button', desc: 'Botões interativos para ações fundamentais.' },
  { name: 'Badge', slug: 'badge', desc: 'Pequenos rótulos informativos de status ou categorias.' },
  { name: 'Card', slug: 'card', desc: 'Contêineres estruturados para agrupar conteúdo.' },
  { name: 'Input', slug: 'input', desc: 'Campos de entrada de texto e formulários.' },
  { name: 'Select', slug: 'select', desc: 'Menus suspensos para seleção de opções únicas.' },
  { name: 'Dialog', slug: 'dialog', desc: 'Janelas modais para fluxos de foco do usuário.' },
  { name: 'Table', slug: 'table', desc: 'Exibição tabular de dados com suporte a estados.' },
  { name: 'Avatar', slug: 'avatar', desc: 'Identificadores visuais circulares para usuários.' },
  { name: 'Toast', slug: 'toast', desc: 'Mensagens temporárias de notificação no canto da tela.' },
  { name: 'Sidebar', slug: 'sidebar', desc: 'Menu lateral para navegação do aplicativo.' },
  { name: 'Tabs', slug: 'tabs', desc: 'Alternadores de conteúdo agrupado por abas.' },
  { name: 'Spinner', slug: 'spinner', desc: 'Indicadores visuais de carregamento e progresso.' },
]

export function ComponentsClient({ slug }: { slug: string }) {
  return (
    <ToastProvider>
      <ComponentsSandboxContent slug={slug} />
    </ToastProvider>
  )
}

function ComponentsSandboxContent({ slug }: { slug: string }) {
  const { toast } = useToast()

  // Clipboard copy helper
  const [copied, setCopied] = useState(false)
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: 'Código Copiado',
      description: 'Código de exemplo copiado para a área de transferência.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // --- States for Sandbox Controls ---
  // Button
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost'>('primary')
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [btnLoading, setBtnLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [btnWithIcon, setBtnWithIcon] = useState(false)

  // Badge
  const [badgeVariant, setBadgeVariant] = useState<'default' | 'accent' | 'success' | 'warning' | 'danger' | 'outline' | 'purple' | 'info'>('accent')
  const [badgeText, setBadgeText] = useState('Novo')

  // Card
  const [cardTitle, setCardTitle] = useState('Produto Personalizado')
  const [cardDesc, setCardDesc] = useState('Detalhes e especificações do modelo 3D')
  const [cardWithFooter, setCardWithFooter] = useState(true)

  // Input
  const [inputLabel, setInputLabel] = useState('Nome do Projeto')
  const [inputPlaceholder, setInputPlaceholder] = useState('Ex: Encaixe Mecânico V2')
  const [inputDisabled, setInputDisabled] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [inputWithIcon, setInputWithIcon] = useState(true)

  // Select
  const [selectDisabled, setSelectDisabled] = useState(false)

  // Table
  const [tableLoading, setTableLoading] = useState(false)

  // Avatar
  const [avatarSize, setAvatarSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [avatarInitials, setAvatarInitials] = useState('BL')

  // Tabs
  const [tabsVariant, setTabsVariant] = useState<'default' | 'underline'>('default')

  // Spinner
  const [spinnerSize, setSpinnerSize] = useState<'sm' | 'md' | 'lg'>('md')

  const activeComponent = componentList.find((c) => c.slug === slug) || componentList[0]

  // Render the selected component inside sandbox preview
  const renderPreview = () => {
    switch (slug) {
      case 'button':
        return (
          <div className="flex items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px]">
            <Button
              variant={btnVariant}
              size={btnSize}
              loading={btnLoading}
              disabled={btnDisabled}
            >
              {btnWithIcon && <Plus className="mr-2 h-4 w-4" />}
              Enviar Arquivo CAD
            </Button>
          </div>
        )
      case 'badge':
        return (
          <div className="flex items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px]">
            <Badge variant={badgeVariant}>{badgeText}</Badge>
          </div>
        )
      case 'card':
        return (
          <div className="flex items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px]">
            <Card className="max-w-sm w-full">
              <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDesc}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-ink-subtle">
                Este contêiner organiza informações sobre o arquivo, material e prazo do projeto de manufatura.
              </CardContent>
              {cardWithFooter && (
                <CardFooter className="flex justify-between border-t border-border pt-4">
                  <Button variant="ghost" size="sm">Cancelar</Button>
                  <Button variant="primary" size="sm">Aprovar Orçamento</Button>
                </CardFooter>
              )}
            </Card>
          </div>
        )
      case 'input':
        return (
          <div className="flex items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px] w-full">
            <div className="max-w-xs w-full">
              <Input
                label={inputLabel}
                placeholder={inputPlaceholder}
                disabled={inputDisabled}
                error={inputError}
                errorMessage={inputError ? 'Este campo é obrigatório.' : undefined}
                leftIcon={inputWithIcon ? <Mail className="h-4 w-4" /> : undefined}
              />
            </div>
          </div>
        )
      case 'select':
        return (
          <div className="flex items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px]">
            <div className="max-w-xs w-full">
              <Select disabled={selectDisabled}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pla">PLA - Polilático Biodegradável</SelectItem>
                  <SelectItem value="abs">ABS - Alta Resistência</SelectItem>
                  <SelectItem value="petg">PETG - Equilíbrio Térmico</SelectItem>
                  <SelectItem value="resin">Resina Standard SLA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 'dialog':
        return (
          <div className="flex items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px]">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Abrir Modal de Contrato</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-surface-1 border border-border p-6 rounded-xl shadow-modal">
                <DialogHeader>
                  <DialogTitle>Termos de Serviço</DialogTitle>
                  <DialogDescription>Leia com atenção as regras de fabricação aditiva.</DialogDescription>
                </DialogHeader>
                <DialogBody className="text-sm text-ink-subtle my-4">
                  Garantimos tolerâncias de até ±0.1mm. Peças com falhas de fabricação serão reimpressas sem custos adicionais.
                </DialogBody>
                <DialogFooter className="flex justify-end gap-2 border-t border-border pt-4">
                  <DialogClose asChild>
                    <Button variant="ghost">Rejeitar</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="primary">Aceitar & Fechar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )
      case 'table':
        return (
          <div className="flex flex-col gap-4 p-8 bg-canvas rounded-xl border border-border min-h-[200px] w-full overflow-x-auto">
            {tableLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableTh>ID Pedido</TableTh>
                    <TableTh>Material</TableTh>
                    <TableTh>Preço Estimado</TableTh>
                    <TableTh>Status</TableTh>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableTd className="font-mono">#3029</TableTd>
                    <TableTd>PETG Carbono</TableTd>
                    <TableTd>R$ 180,00</TableTd>
                    <TableTd><Badge variant="success">Faturado</Badge></TableTd>
                  </TableRow>
                  <TableRow>
                    <TableTd className="font-mono">#3030</TableTd>
                    <TableTd>Resina Flexível</TableTd>
                    <TableTd>R$ 310,00</TableTd>
                    <TableTd><Badge variant="accent">Em Produção</Badge></TableTd>
                  </TableRow>
                  <TableRow>
                    <TableTd className="font-mono">#3031</TableTd>
                    <TableTd>PLA Silk Gold</TableTd>
                    <TableTd>R$ 95,00</TableTd>
                    <TableTd><Badge variant="default">Aguardando CAD</Badge></TableTd>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </div>
        )
      case 'avatar':
        return (
          <div className="flex flex-col items-center justify-center gap-6 p-8 bg-canvas rounded-xl border border-border min-h-[200px]">
            <div className="flex items-center gap-4">
              <Avatar
                size={avatarSize}
                fallback={avatarInitials}
                alt="Engenheiro Bézier"
              />
              <div>
                <p className="text-sm font-semibold text-ink">Engenheiro Bézier</p>
                <p className="text-xs text-ink-muted">admin@bezierlab.com</p>
              </div>
            </div>
            <div className="border-t border-border pt-4 w-full flex flex-col items-center gap-2">
              <p className="text-xs text-ink-disabled font-medium">GRUPO DE AVATARES</p>
              <AvatarGroup
                users={[
                  { name: 'Alpha' },
                  { name: 'Beta' },
                  { name: 'Gamma' },
                  { name: 'Delta' },
                ]}
                max={3}
                size="sm"
              />
            </div>
          </div>
        )
      case 'toast':
        return (
          <div className="flex flex-wrap gap-3 items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px]">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast({
                  title: 'Informação',
                  description: 'Sua cotação está sendo processada por nossos engenheiros.',
                })
              }
            >
              Info Toast
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                toast({
                  title: 'Projeto Enviado',
                  description: 'O arquivo CAD foi enviado com sucesso.',
                  variant: 'success',
                })
              }
            >
              Success Toast
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-danger/40 hover:bg-danger/10 hover:text-danger"
              onClick={() =>
                toast({
                  title: 'Erro na Malha STL',
                  description: 'O arquivo enviado contém malhas abertas e furos.',
                  variant: 'error',
                })
              }
            >
              Danger Toast
            </Button>
          </div>
        )
      case 'sidebar':
        return (
          <div className="flex items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px] w-full">
            <div className="w-full max-w-xs border border-border rounded-xl bg-surface-0 overflow-hidden shadow-sm h-64 flex flex-col">
              <div className="p-4 border-b border-border flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-accent/10 flex items-center justify-center">
                  <Settings className="h-3.5 w-3.5 text-accent" />
                </div>
                <span className="text-xs font-bold text-ink">Bézier Backoffice</span>
              </div>
              <div className="flex-1 p-3 space-y-1">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-surface-1 text-xs font-semibold text-ink cursor-pointer">
                  <User className="h-3.5 w-3.5" />
                  <span>Perfil</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-2 cursor-pointer">
                  <Settings className="h-3.5 w-3.5" />
                  <span>Configurações</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-2 cursor-pointer">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Mensagens</span>
                </div>
              </div>
              <div className="p-3 border-t border-border text-[10px] text-ink-disabled text-center">
                Licença Comercial Ativa
              </div>
            </div>
          </div>
        )
      case 'tabs':
        return (
          <div className="flex items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px] w-full">
            <div className="w-full max-w-sm">
              <Tabs defaultValue="pla">
                {tabsVariant === 'underline' ? (
                  <TabsUnderlineList className="w-full flex">
                    <TabsUnderlineTrigger value="pla">PLA</TabsUnderlineTrigger>
                    <TabsUnderlineTrigger value="abs">ABS</TabsUnderlineTrigger>
                    <TabsUnderlineTrigger value="resin">Resina</TabsUnderlineTrigger>
                  </TabsUnderlineList>
                ) : (
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="pla">PLA</TabsTrigger>
                    <TabsTrigger value="abs">ABS</TabsTrigger>
                    <TabsTrigger value="resin">Resina</TabsTrigger>
                  </TabsList>
                )}
                <div className="mt-4 p-3 rounded-lg bg-surface-0 border border-border text-xs text-ink-subtle">
                  <TabsContent value="pla" className="mt-0">
                    O PLA é fácil de imprimir e ideal para protótipos visuais e maquetes conceituais com alta definição.
                  </TabsContent>
                  <TabsContent value="abs" className="mt-0">
                    O ABS suporta temperaturas elevadas e impactos mecânicos, ideal para peças funcionais e automotivas.
                  </TabsContent>
                  <TabsContent value="resin" className="mt-0">
                    A Resina SLA entrega precisão microscópica e acabamento superficial liso, excelente para joias e miniaturas.
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        )
      case 'spinner':
        return (
          <div className="flex flex-col gap-4 items-center justify-center p-8 bg-canvas rounded-xl border border-border min-h-[200px]">
            <Spinner size={spinnerSize} />
            <span className="text-xs text-ink-muted">Processando malha geométrica 3D...</span>
          </div>
        )
      default:
        return null
    }
  }

  // Generate the clean JSX code snippet for the user to copy
  const getCodeSnippet = () => {
    switch (slug) {
      case 'button':
        return `import { Button } from '@bezier-lab/ui'
import { Plus } from 'lucide-react'

export default function Demo() {
  return (
    <Button
      variant="${btnVariant}"
      size="${btnSize}"${btnLoading ? '\n      loading={true}' : ''}${btnDisabled ? '\n      disabled={true}' : ''}
    >
      ${btnWithIcon ? '<Plus className="mr-2 h-4 w-4" />\n      ' : ''}Enviar Arquivo CAD
    </Button>
  )
}`
      case 'badge':
        return `import { Badge } from '@bezier-lab/ui'

export default function Demo() {
  return (
    <Badge variant="${badgeVariant}">
      ${badgeText}
    </Badge>
  )
}`
      case 'card':
        return `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@bezier-lab/ui'

export default function Demo() {
  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>${cardTitle}</CardTitle>
        <CardDescription>${cardDesc}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-ink-subtle">
        Este contêiner organiza informações sobre o arquivo, material e prazo.
      </CardContent>${cardWithFooter ? `\n      <CardFooter className="flex justify-between border-t border-border pt-4">
        <Button variant="ghost" size="sm">Cancelar</Button>
        <Button variant="primary" size="sm">Aprovar</Button>
      </CardFooter>` : ''}
    </Card>
  )
}`
      case 'input':
        return `import { Input } from '@bezier-lab/ui'
import { Mail } from 'lucide-react'

export default function Demo() {
  return (
    <Input
      label="${inputLabel}"
      placeholder="${inputPlaceholder}"${inputDisabled ? '\n      disabled={true}' : ''}${inputError ? '\n      error={true}\n      errorMessage="Este campo é obrigatório."' : ''}${inputWithIcon ? '\n      leftIcon={<Mail className="h-4 w-4" />' : ''}
    />
  )
}`
      case 'select':
        return `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@bezier-lab/ui'

export default function Demo() {
  return (
    <Select${selectDisabled ? ' disabled' : ''}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um Material" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pla">PLA - Polilático Biodegradável</SelectItem>
        <SelectItem value="abs">ABS - Alta Resistência</SelectItem>
        <SelectItem value="petg">PETG - Equilíbrio Térmico</SelectItem>
        <SelectItem value="resin">Resina Standard SLA</SelectItem>
      </SelectContent>
    </Select>
  )
}`
      case 'dialog':
        return `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose, Button } from '@bezier-lab/ui'

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Abrir Modal</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Termos de Serviço</DialogTitle>
          <DialogDescription>Leia com atenção.</DialogDescription>
        </DialogHeader>
        <DialogBody className="text-sm text-ink-subtle">
          Garantimos tolerâncias de até ±0.1mm.
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Rejeitar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary">Aceitar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`
      case 'table':
        return `import { Table, TableHead, TableBody, TableRow, TableTh, TableTd, Badge } from '@bezier-lab/ui'

export default function Demo() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableTh>ID Pedido</TableTh>
          <TableTh>Material</TableTh>
          <TableTh>Preço Estimado</TableTh>
          <TableTh>Status</TableTh>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableTd className="font-mono">#3029</TableTd>
          <TableTd>PETG Carbono</TableTd>
          <TableTd>R$ 180,00</TableTd>
          <TableTd><Badge variant="success">Faturado</Badge></TableTd>
        </TableRow>
      </TableBody>
    </Table>
  )
}`
      case 'avatar':
        return `import { Avatar, AvatarGroup } from '@bezier-lab/ui'

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <Avatar
        size="${avatarSize}"
        fallback="${avatarInitials}"
        alt="Engenheiro Bézier"
      />
      
      <AvatarGroup
        users={[
          { name: 'Alpha' },
          { name: 'Beta' },
          { name: 'Gamma' },
        ]}
        max={3}
        size="sm"
      />
    </div>
  )
}`
      case 'toast':
        return `import { Button, useToast, ToastProvider } from '@bezier-lab/ui'

export default function Demo() {
  const { toast } = useToast()
  
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Projeto Enviado',
          description: 'Seu arquivo CAD foi enviado com sucesso.',
          variant: 'success',
        })
      }
    >
      Disparar Toast
    </Button>
  )
}`
      case 'sidebar':
        return `import { Sidebar, SidebarHeader, SidebarSection, SidebarItem } from '@bezier-lab/ui'

export default function Demo() {
  return (
    <div className="w-64 bg-surface-0 border border-border h-64 flex flex-col">
      <div className="p-4 border-b border-border">Bézier Backoffice</div>
      <div className="flex-1 p-3">
        <div className="bg-surface-1 text-ink px-3 py-1.5 rounded-lg">Perfil</div>
        <div className="text-ink-muted px-3 py-1.5 rounded-lg">Configurações</div>
      </div>
    </div>
  )
}`
      case 'tabs':
        if (tabsVariant === 'underline') {
          return `import { Tabs, TabsUnderlineList, TabsUnderlineTrigger, TabsContent } from '@bezier-lab/ui'

export default function Demo() {
  return (
    <Tabs defaultValue="pla">
      <TabsUnderlineList>
        <TabsUnderlineTrigger value="pla">PLA</TabsUnderlineTrigger>
        <TabsUnderlineTrigger value="abs">ABS</TabsUnderlineTrigger>
      </TabsUnderlineList>
      <TabsContent value="pla">Conteúdo PLA</TabsContent>
      <TabsContent value="abs">Conteúdo ABS</TabsContent>
    </Tabs>
  )
}`
        }
        return `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@bezier-lab/ui'

export default function Demo() {
  return (
    <Tabs defaultValue="pla">
      <TabsList>
        <TabsTrigger value="pla">PLA</TabsTrigger>
        <TabsTrigger value="abs">ABS</TabsTrigger>
      </TabsList>
      <TabsContent value="pla">Conteúdo PLA</TabsContent>
      <TabsContent value="abs">Conteúdo ABS</TabsContent>
    </Tabs>
  )
}`
      case 'spinner':
        return `import { Spinner } from '@bezier-lab/ui'

export default function Demo() {
  return <Spinner size="${spinnerSize}" />
}`
      default:
        return ''
    }
  }

  // Tabela de propriedades documentadas
  const getPropsInfo = () => {
    switch (slug) {
      case 'button':
        return [
          { prop: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link'", default: "'primary'", desc: 'Aparência visual do botão.' },
          { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Dimensões internas do botão.' },
          { prop: 'loading', type: 'boolean', default: 'false', desc: 'Indica estado de carregamento assíncrono.' },
          { prop: 'disabled', type: 'boolean', default: 'false', desc: 'Desativa interações de clique.' },
        ]
      case 'badge':
        return [
          { prop: 'variant', type: "'default' | 'accent' | 'success' | 'warning' | 'danger' | 'outline' | 'purple' | 'info'", default: "'default'", desc: 'Definição cromática do badge.' },
        ]
      case 'card':
        return [
          { prop: 'className', type: 'string', default: 'undefined', desc: 'Classes adicionais do contêiner.' },
        ]
      case 'input':
        return [
          { prop: 'label', type: 'string', default: 'undefined', desc: 'Rótulo exibido acima do campo.' },
          { prop: 'error', type: 'boolean', default: 'false', desc: 'Ativa contorno avermelhado de erro.' },
          { prop: 'errorMessage', type: 'string', default: 'undefined', desc: 'Mensagem de erro exibida abaixo.' },
          { prop: 'leftIcon', type: 'ReactNode', default: 'undefined', desc: 'Ícone posicionado à esquerda.' },
        ]
      default:
        return [
          { prop: 'children', type: 'ReactNode', default: 'undefined', desc: 'Elementos internos do componente.' },
          { prop: 'className', type: 'string', default: 'undefined', desc: 'Classes customizadas para estilização externa.' },
        ]
    }
  }

  // Rendering Controls on the Right side of Sandbox
  const renderControls = () => {
    switch (slug) {
      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Variante</label>
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                {(['primary', 'secondary', 'outline', 'ghost'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setBtnVariant(v)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                      btnVariant === v
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'bg-surface-1 border-border text-ink-subtle hover:text-ink'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Tamanho</label>
              <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                {(['sm', 'md', 'lg'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setBtnSize(s)}
                    className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                      btnSize === s
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'bg-surface-1 border-border text-ink-subtle hover:text-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-border">
              <label className="flex items-center gap-2 text-xs font-medium text-ink-subtle cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={btnLoading}
                  onChange={(e) => setBtnLoading(e.target.checked)}
                  className="rounded border-border bg-surface-1 text-accent focus:ring-accent"
                />
                Carregando (Loading)
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-ink-subtle cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={btnDisabled}
                  onChange={(e) => setBtnDisabled(e.target.checked)}
                  className="rounded border-border bg-surface-1 text-accent focus:ring-accent"
                />
                Desabilitado (Disabled)
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-ink-subtle cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={btnWithIcon}
                  onChange={(e) => setBtnWithIcon(e.target.checked)}
                  className="rounded border-border bg-surface-1 text-accent focus:ring-accent"
                />
                Com Ícone
              </label>
            </div>
          </div>
        )
      case 'badge':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Variante</label>
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                {(['default', 'accent', 'success', 'warning', 'danger', 'outline', 'purple', 'info'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setBadgeVariant(v)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                      badgeVariant === v
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'bg-surface-1 border-border text-ink-subtle hover:text-ink'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Texto</label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full mt-1.5 px-3 py-1.5 text-xs rounded-lg bg-surface-1 border border-border text-ink focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        )
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Título do Card</label>
              <input
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                className="w-full mt-1.5 px-3 py-1.5 text-xs rounded-lg bg-surface-1 border border-border text-ink focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Subdescrição</label>
              <input
                type="text"
                value={cardDesc}
                onChange={(e) => setCardDesc(e.target.value)}
                className="w-full mt-1.5 px-3 py-1.5 text-xs rounded-lg bg-surface-1 border border-border text-ink focus:border-accent focus:outline-none"
              />
            </div>
            <div className="pt-2 border-t border-border">
              <label className="flex items-center gap-2 text-xs font-medium text-ink-subtle cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={cardWithFooter}
                  onChange={(e) => setCardWithFooter(e.target.checked)}
                  className="rounded border-border bg-surface-1 text-accent focus:ring-accent"
                />
                Exibir Rodapé
              </label>
            </div>
          </div>
        )
      case 'input':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Rótulo (Label)</label>
              <input
                type="text"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
                className="w-full mt-1.5 px-3 py-1.5 text-xs rounded-lg bg-surface-1 border border-border text-ink focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Placeholder</label>
              <input
                type="text"
                value={inputPlaceholder}
                onChange={(e) => setInputPlaceholder(e.target.value)}
                className="w-full mt-1.5 px-3 py-1.5 text-xs rounded-lg bg-surface-1 border border-border text-ink focus:border-accent focus:outline-none"
              />
            </div>
            <div className="space-y-2 pt-2 border-t border-border">
              <label className="flex items-center gap-2 text-xs font-medium text-ink-subtle cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inputDisabled}
                  onChange={(e) => setInputDisabled(e.target.checked)}
                  className="rounded border-border bg-surface-1 text-accent focus:ring-accent"
                />
                Desabilitado
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-ink-subtle cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inputError}
                  onChange={(e) => setInputError(e.target.checked)}
                  className="rounded border-border bg-surface-1 text-accent focus:ring-accent"
                />
                Estado de Erro
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-ink-subtle cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inputWithIcon}
                  onChange={(e) => setInputWithIcon(e.target.checked)}
                  className="rounded border-border bg-surface-1 text-accent focus:ring-accent"
                />
                Ícone à Esquerda
              </label>
            </div>
          </div>
        )
      case 'select':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-ink-subtle cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectDisabled}
                  onChange={(e) => setSelectDisabled(e.target.checked)}
                  className="rounded border-border bg-surface-1 text-accent focus:ring-accent"
                />
                Desabilitar Select
              </label>
            </div>
          </div>
        )
      case 'table':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-ink-subtle cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={tableLoading}
                  onChange={(e) => setTableLoading(e.target.checked)}
                  className="rounded border-border bg-surface-1 text-accent focus:ring-accent"
                />
                Estado Carregando (Loading)
              </label>
            </div>
          </div>
        )
      case 'avatar':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Tamanho do Avatar</label>
              <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                {(['sm', 'md', 'lg'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setAvatarSize(s)}
                    className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                      avatarSize === s
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'bg-surface-1 border-border text-ink-subtle hover:text-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Iniciais (Fallback)</label>
              <input
                type="text"
                maxLength={2}
                value={avatarInitials}
                onChange={(e) => setAvatarInitials(e.target.value)}
                className="w-full mt-1.5 px-3 py-1.5 text-xs rounded-lg bg-surface-1 border border-border text-ink focus:border-accent focus:outline-none uppercase"
              />
            </div>
          </div>
        )
      case 'tabs':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Variante Visual</label>
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                {(['default', 'underline'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setTabsVariant(v)}
                    className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                      tabsVariant === v
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'bg-surface-1 border-border text-ink-subtle hover:text-ink'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      case 'spinner':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase">Tamanho do Spinner</label>
              <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                {(['sm', 'md', 'lg'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpinnerSize(s)}
                    className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                      spinnerSize === s
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'bg-surface-1 border-border text-ink-subtle hover:text-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return <p className="text-xs text-ink-muted">Nenhum controle customizável para este componente.</p>
    }
  }

  return (
    <div className="flex-1 max-w-screen-xl w-full mx-auto px-6 py-8 flex gap-8">
      {/* Left Side Navigation — Component List */}
      <aside className="w-64 shrink-0 hidden md:block border-r border-border pr-6">
        <h2 className="text-xs font-bold text-ink-disabled uppercase tracking-widest mb-4">Componentes</h2>
        <nav className="space-y-1">
          {componentList.map((comp) => {
            const isSelected = comp.slug === slug
            return (
              <Link
                key={comp.slug}
                href={`/components/${comp.slug}`}
                className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-accent/8 text-accent'
                    : 'text-ink-subtle hover:text-ink hover:bg-surface-1'
                }`}
              >
                <span>{comp.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`h-3 w-3 transition-transform ${isSelected ? 'text-accent rotate-90' : 'text-ink-disabled'}`}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Right Main Content — Sandbox & Docs */}
      <main className="flex-1 space-y-12 overflow-hidden">
        {/* Header */}
        <div>
          <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-1.5">Componentes</p>
          <h1 className="text-3xl font-bold tracking-tight text-ink mb-2">{activeComponent.name}</h1>
          <p className="text-sm text-ink-subtle max-w-2xl">{activeComponent.desc}</p>
        </div>

        {/* Sandbox Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Preview Screen */}
          <div className="lg:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
              <LayoutGrid className="h-3.5 w-3.5" /> Preview em Tempo Real
            </label>
            {renderPreview()}
          </div>

          {/* Config Controls */}
          <div className="p-5 rounded-xl border border-border bg-surface-0 space-y-4">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider border-b border-border pb-2">Configurações</h3>
            {renderControls()}
          </div>
        </section>

        {/* Copyable Code Example */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5" /> Código Fonte
            </label>
            <button
              onClick={() => copyToClipboard(getCodeSnippet())}
              className="inline-flex items-center gap-1 text-xs text-accent hover:underline focus:outline-none"
            >
              {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copiado!' : 'Copiar Código'}
            </button>
          </div>
          <div className="relative rounded-xl border border-border bg-surface-0 p-4 font-mono text-xs overflow-x-auto text-ink leading-relaxed">
            <pre>{getCodeSnippet()}</pre>
          </div>
        </section>

        {/* Props Table API */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" /> Propriedades do Componente (API)
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHead>
                <TableRow>
                  <TableTh>Nome</TableTh>
                  <TableTh>Tipo</TableTh>
                  <TableTh>Padrão</TableTh>
                  <TableTh>Descrição</TableTh>
                </TableRow>
              </TableHead>
              <TableBody>
                {getPropsInfo().map((item) => (
                  <TableRow key={item.prop}>
                    <TableTd className="font-mono text-accent font-semibold">{item.prop}</TableTd>
                    <TableTd className="font-mono text-ink-subtle">{item.type}</TableTd>
                    <TableTd className="font-mono text-ink-disabled">{item.default}</TableTd>
                    <TableTd className="text-ink-subtle">{item.desc}</TableTd>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  )
}
