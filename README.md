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
Cada aplicação subirá em uma porta específica:
- 💻 **Storefront**: `http://localhost:3000`
- ⚙️ **Admin Hub**: `http://localhost:3001`
- 🎨 **Design System**: `http://localhost:3002`

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

- **design(ui):** Reposicionamento do botão toggle de recolhimento da sidebar para o topo (alinhado verticalmente com o logo/cabeçalho) no pacote `bezier-ui`.
- **feat(admin-hub):** Criação das rotas e telas de Produtos, Clientes e Configurações para evitar erros 404 ao navegar.
- **refactor(admin-hub):** Ativação de navegação dinâmica via `useRouter` nos itens de menu da sidebar administrativa.
- **refactor(ui):** Refino de tema com suporte semântico e dinâmico (Light/Dark mode) para os componentes `Card` e `Tabs`.
- **docs:** Atualização do `README.md` com guia de credenciais padrão de testes do banco e documentação de pacotes.
