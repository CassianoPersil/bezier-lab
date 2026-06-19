# 🌌 Bézier Lab — Monorepo

Bézier Lab é um ecossistema modular e moderno para manufatura aditiva 3D e e-commerce de impressão de alta precisão. O projeto é estruturado em um monorepo escalável utilizando **Turborepo** e **pnpm Workspaces**.

---

## 📂 Estrutura do Projeto

O workspace é dividido em aplicações e pacotes compartilhados:

```
bezier-lab/
├── apps/
│   ├── admin-hub/       # Backoffice de gerenciamento de inventário, pedidos e clientes (Next.js, Prisma, SQLite)
│   ├── design-system/   # Plataforma de documentação e playground dos componentes e tokens (Next.js)
│   └── storefront/      # Loja virtual para os clientes finais realizarem pedidos e visualizarem modelos 3D (Next.js)
├── packages/
│   ├── bezier-ui/       # Biblioteca compartilhada de componentes de UI reativos (@bezier-lab/ui)
│   ├── tokens/          # Tokens de design de cores, tipografia, espaçamento e sombras (@bezier-lab/tokens)
│   └── 3d-engine/       # Visualizador de meshs e renderizador de modelos 3D (@bezier-lab/3d-engine)
```

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Estilização**: Tailwind CSS & Vanilla CSS Variables
- **Componentes Base**: Radix UI Primitives & Framer Motion
- **Banco de Dados**: Prisma ORM com banco SQLite local
- **Autenticação**: NextAuth.js (v5 Beta) com suporte a credenciais locais
- **Build System**: Turborepo & pnpm

---

## 🚀 Como Iniciar o Desenvolvimento

### Pré-requisitos
Certifique-se de ter instalado o **Node.js >= 20.0.0** e o **pnpm >= 9.0.0**.

### 1. Instalar as Dependências
Execute na raiz do monorepo:
```bash
pnpm install
```

### 2. Configurar o Banco de Dados (Admin Hub)
Antes de iniciar o painel administrativo, inicialize e popule o banco SQLite local:
```bash
# Navegar até a aplicação
cd apps/admin-hub

# Puxar o esquema do Prisma e criar o banco dev.db
pnpm db:push

# Executar a seed para criar credenciais padrão e amostras de produtos
node prisma/seed.js
```

#### 🔑 Credenciais Padrão (Criadas pela Seed)

- **Administrador (Admin Hub):**
  - **E-mail:** `admin@bezierlab.com`
  - **Senha:** `BezierAdmin2025!`
- **Cliente Padrão (Storefront):**
  - **E-mail:** `client@example.com`
  - **Senha:** `client123`

### 3. Rodar os Servidores de Desenvolvimento
Para iniciar todos os projetos em paralelo:
```bash
pnpm dev
```
Cada aplicação subirá em uma porta específica com as seguintes rotas principais:
- 💻 **Storefront** (`http://localhost:3000`):
  - `/` — Landing Page de alta conversão
  - `/quote` — Formulário interativo para cotações e upload de modelos 3D (CAD)
  - `/portal/products` — Catálogo público de peças/produtos para clientes finais
- ⚙️ **Admin Hub** (`http://localhost:3001`):
  - `/dashboard` — Painel administrativo principal de controle
  - `/dashboard/inventory` — Controle de estoque e inventário
  - `/dashboard/products` — Gerenciamento e publicação de produtos
  - `/dashboard/orders` — Acompanhamento e atualização de pedidos e status
  - `/dashboard/clients` — Banco de dados de clientes cadastrados
  - `/dashboard/settings` — Configurações gerais da aplicação
- 🎨 **Design System** (`http://localhost:3002`):
  - `/` — Documentação e playground dos componentes e tokens da biblioteca Bézier UI

---

## 🌐 Implantação e Mapeamento de Domínio no Vercel

Por ser um monorepo estruturado com Turborepo e pnpm, a melhor prática na **Vercel** é criar **3 projetos separados**, todos vinculados ao mesmo repositório do GitHub, porém apontando para diretórios raiz e domínios distintos:

### 1. Storefront (Loja & Landing Page)
- **Diretório Raiz (Root Directory):** `apps/storefront`
- **Comando de Build:** `next build`
- **Domínio Principal:** `seudominio.com` (ou `www.seudominio.com`)

### 2. Admin Hub (Painel de Administração)
- **Diretório Raiz (Root Directory):** `apps/admin-hub`
- **Comando de Build:** `prisma generate && next build`
- **Variáveis de Ambiente:** Adicione as chaves necessárias (ex: `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`).
- **Domínio Principal:** `admin.seudominio.com`

### 3. Design System (Documentação Bézier UI)
- **Diretório Raiz (Root Directory):** `apps/design-system`
- **Comando de Build:** `next build`
- **Domínio Principal:** `design.seudominio.com`

> [!NOTE]
> Ao configurar cada projeto no Vercel, certifique-se de que o **pnpm** está selecionado como gerenciador de pacotes padrão e que o Vercel automaticamente detecte a raiz do workspace para fazer o cache correto das dependências.

---

Para iniciar uma aplicação específica:
```bash
pnpm dev:ds          # Inicia apenas o Design System
pnpm dev:admin       # Inicia apenas o Admin Hub
pnpm dev:storefront  # Inicia apenas o Storefront
```

---

## 📋 Comandos Disponíveis (Raiz)

- `pnpm dev`: Inicia todos os servidores de desenvolvimento usando Turborepo.
- `pnpm build`: Compila de forma otimizada todas as aplicações do monorepo.
- `pnpm type-check`: Executa a checagem de tipos TypeScript em todos os pacotes.
- `pnpm lint`: Executa a análise estática de código (ESLint) em todo o workspace.
- `pnpm clean`: Limpa caches do Turbo e diretórios gerados.

---

## 📈 Histórico de Melhorias Recentes

- **feat(storefront):** Pivot para marketplace B2B e B2C de produtos impressos em 3D (ex: brindes corporativos e drops de mesa), com tradução e gráficos de etapas interativos (How It Works).
- **feat(storefront):** Substituição do portfólio genérico por uma seção de Bento Grid de Categorias de Produtos e catálogo de materiais de alta performance interativo (Carbon Fiber, TPU, SLA Resin).
- **feat(a11y):** Implementação de melhorias de acessibilidade WCAG 2.2 no cabeçalho (links semânticos, focus trapping e Escape para fechar no menu móvel) e carrinho/detalhe de produtos baseados em Radix Dialog.
- **feat(admin-hub & API):** Integração total com o banco de dados via API REST (`/api/products` e `/api/products/[id]`) com CORS, sincronizando o controle do estoque e a listagem dinâmica de produtos ativos.
- **feat(storefront):** Reestruturação de rotas públicas. A Landing Page agora é servida em `/` e o formulário de orçamento foi movido para `/quote`.
- **fix(storefront):** Correção de cores estáticas e hexadecimais rígidos na página de catálogo de produtos, melhorando drasticamente o suporte e a legibilidade no Light Mode usando tokens dinâmicos.
- **feat(admin-hub):** Adicionado atalhos dinâmicos na barra lateral do painel (`Atalhos` -> `Ir para a Loja`, `Ver Catálogo`, `Design System`) que resolvem para as portas corretas localmente e subdomínios em produção.
- **fix(admin-hub):** Ajuste do script de build do admin-hub no package.json para rodar `prisma generate` de forma automática na Vercel, solucionando erros de inicialização de cliente.
