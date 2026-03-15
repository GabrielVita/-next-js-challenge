# 🎁 Desafio Técnico — GiftWise (Next.js 16 + TypeScript)

Bem-vindo(a) ao **desafio técnico GiftWise** 🚀  

Este desafio foi criado para avaliar conhecimentos práticos em **Next.js 16 (App Router)**, **TypeScript** e no uso do framework como uma **solução full-stack**, incluindo renderização, Server Actions, API Routes, cache/revalidação, organização de código e qualidade de UI/UX.

---

## 🎯 Objetivo do desafio

Construir uma aplicação chamada **GiftWise**, um sistema que permite:

- Cadastrar **pessoas que você deseja presentear**, definindo:
  - gênero
  - faixa etária
  - interesses
- Receber **sugestões de presentes** com base nessas características
- **Escolher um presente** dando um **like** em uma sugestão
- **Cadastrar novos presentes**, quando nenhum dos sugeridos fizer sentido  
  👉 Esses novos presentes passam a fazer parte do banco de dados e podem ser sugeridos a outros usuários com perfis semelhantes

O foco não é apenas o resultado final, mas **como o projeto é estruturado**, **como o Git é utilizado** e **como o Next.js é explorado em profundidade**.

---

## 🧠 O que será avaliado

- Domínio do **Next.js 16 (App Router)**
- Uso correto de:
  - SSG
  - SSR
  - ISR
  - CSR
- Uso de **Server Actions**
- Criação de **API Routes** (`route.ts`)
- Entendimento de **cache, revalidação e data fetching**
- Organização do projeto
- Qualidade do código e tipagem
- UI/UX (aplicação “bonita”, organizada e responsiva)
- Uso correto do **Git com Git Flow e commits semânticos**

---

## 🛠️ Requisitos técnicos obrigatórios

- **Next.js 16**
- **TypeScript**
- **App Router**
- Persistência de dados **real** (ex: PostgreSQL, MySQL, SQLite, Prisma, etc.)
  - ❌ JSON/arquivo local **não é aceito**
- Autenticação simples (NextAuth, credentials, magic link ou usuário único via `.env`)
- UI responsiva e acessível
- ESLint habilitado

---

## 🗂️ Regras de Git (obrigatórias)

### 🚨 Muito importante

Você **NÃO deve fazer fork deste repositório**.

### Fluxo correto

1. **Clone este repositório**
2. Crie um **novo repositório na sua própria conta do GitHub**
3. Suba o código para esse novo repositório
4. Trabalhe normalmente nele até a entrega

> O repositório final deve estar **na sua conta**, com histórico próprio.

---

### 🌿 Git Flow

O Git deve ser usado seguindo o **Git Flow**, no mínimo com:

- `main`
- `develop`
- branches de feature, por exemplo:
  - `feature/create-recipient`
  - `feature/gift-suggestions`
  - `feature/server-actions`
  - `feature/api-gifts`

Fluxo esperado:
- `feature/*` → `develop`
- `develop` → `main` (ao final)

---

### 📝 Commits semânticos (obrigatório)

Utilize **commits semânticos**, por exemplo:

- `feat: create recipient profile`
- `feat: add gift suggestion algorithm`
- `feat: implement like gift server action`
- `fix: handle duplicate gift likes`
- `refactor: improve gift matching logic`
- `chore: configure eslint and prettier`
- `docs: update README with setup instructions`

Commits pequenos, claros e frequentes serão valorizados.

---

## 🧩 Funcionalidades obrigatórias

### 👤 Pessoas a presentear (Recipients)
- CRUD de pessoas
- Campos obrigatórios:
  - nome/apelido
  - gênero
  - faixa etária
  - interesses

### 🎁 Presentes (Gifts)
- Catálogo global de presentes
- Cada presente deve conter:
  - título
  - descrição
  - interesses relacionados
  - faixas etárias compatíveis
  - gênero (opcional)

### 💡 Sugestões
- Sugestões devem ser geradas com base em:
  - interseção de interesses
  - faixa etária
  - (opcional) gênero
- Não é necessário usar IA — lógica simples é suficiente
- Explique a lógica escolhida neste README

### ❤️ Like = presente escolhido
- O usuário pode dar **like** em um presente sugerido
- O like significa: **“este foi o presente escolhido para essa pessoa”**
- Recomenda-se permitir **apenas 1 presente escolhido por pessoa**

### ➕ Cadastro colaborativo
- O usuário pode cadastrar um novo presente
- Esse presente:
  - entra no banco
  - aparece no catálogo
  - passa a ser sugerido para outros usuários com perfis compatíveis

---

## 🧭 Páginas e tipos de renderização (obrigatório)

| Rota | Descrição | Tipo |
|----|----|----|
| `/` | Home institucional | **SSG** |
| `/gifts` | Catálogo de presentes | **ISR** |
| `/recipients/[id]` | Perfil + sugestões | **SSR** |
| `/dashboard` | Área autenticada | SSR ou híbrido |
| `/activity` | Feed de atividade | **CSR** |

---

## ⚙️ Server Actions (mínimo)

- Criar pessoa (recipient)
- Dar like / escolher presente
- Cadastrar presente

Todas devem:
- Rodar no servidor
- Ter validação
- Tratar erros corretamente
- Atualizar UI via `revalidatePath`, `revalidateTag` ou `router.refresh`

---

## 🔌 API Endpoints (obrigatório)

- `GET /api/activity`
  - Ex: presentes mais escolhidos ou recém-cadastrados
- `GET /api/gifts`
  - Paginação e filtros (idade, interesse, gênero)

Pelo menos **1 endpoint deve ser consumido por uma página CSR**.

---

## 🧪 Estados de rota

Implementar obrigatoriamente:
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`

---

## 📄 README (este arquivo)

Além deste conteúdo, você deve **complementar este README** com:

- Como rodar o projeto localmente
- Configuração do banco
- Variáveis de ambiente (`.env.example`)
- Seed de dados
- Explicação clara:
  - onde é SSG, SSR, ISR e CSR
  - como funciona a lógica de sugestão
  - como funciona cache e revalidação

---

## 🚀 Entrega

- Repositório **na sua conta do GitHub**
- Histórico de commits claro e organizado
- Código funcional
- README atualizado
- Deploy é opcional (mas diferencial)

---

## ⭐ Diferenciais (opcional)

- Testes
- Uso de Zod
- Middleware bem aplicado
- Uso consciente de `Suspense`
- UI bem refinada
- Deploy em Vercel

---

Boa sorte 🚀  
Este desafio foi pensado para avaliar **como você pensa, estrutura e entrega software**, não apenas se “funciona”.

Qualquer decisão técnica é válida — desde que **bem justificada**.
