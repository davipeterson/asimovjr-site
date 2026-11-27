# asimovjr-site

Site da **Asimov Jr.**, a maior empresa júnior de TI de Minas Gerais.

[![CI](https://github.com/davipeterson/asimovjr-site/actions/workflows/ci.yml/badge.svg)](https://github.com/davipeterson/asimovjr-site/actions/workflows/ci.yml)
[![Deploy](https://github.com/davipeterson/asimovjr-site/actions/workflows/deploy.yml/badge.svg)](https://github.com/davipeterson/asimovjr-site/actions/workflows/deploy.yml)

- **Prévia (GitHub Pages):** https://davipeterson.github.io/asimovjr-site/
- **Produção (depois da aprovação):** https://asimovjr.com.br

---

## Sumário

1. [Stack](#stack)
2. [Rodando no seu computador](#rodando-no-seu-computador)
3. [Estrutura de pastas](#estrutura-de-pastas)
4. [Como atualizar o conteúdo](#como-atualizar-o-conteúdo)
5. [Fluxo de trabalho no GitHub](#fluxo-de-trabalho-no-github)
6. [Releases e versões](#releases-e-versões)
7. [Deploy](#deploy)
8. [Migração para a Hostinger](#migração-para-a-hostinger)

---

## Stack

| O quê      | Ferramenta                                                       |
| ---------- | ---------------------------------------------------------------- |
| Framework  | [Astro](https://astro.build), gera HTML estático                 |
| Linguagem  | TypeScript no modo estrito                                       |
| Interações | Scripts TypeScript nos próprios componentes, sem framework de UI |
| Qualidade  | ESLint, Prettier, `astro check`, Lighthouse CI                   |
| Hospedagem | GitHub Pages (prévia) → Hostinger (produção)                     |
| Automação  | GitHub Actions: CI, deploy e releases com release-please         |

Por que Astro: o site é quase todo de apresentação. O Astro entrega HTML pronto e só manda
JavaScript para as partes interativas, então o site carrega rápido no celular e é bem lido pelo
Google.

## Rodando no seu computador

Precisa do **Node 22** (o arquivo `.nvmrc` já diz a versão; com nvm, rode `nvm use`).

```bash
git clone https://github.com/davipeterson/asimovjr-site.git
cd asimovjr-site
npm install
npm run dev
```

O site abre em `http://localhost:4321/asimovjr-site/`.

| Comando           | O que faz                                          |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento com recarga automática |
| `npm run build`   | Gera o site final na pasta `dist/`                 |
| `npm run preview` | Serve a pasta `dist/` para conferir o build        |
| `npm run check`   | Checagem de tipos do TypeScript e dos componentes  |
| `npm run lint`    | ESLint                                             |
| `npm run format`  | Formata tudo com Prettier                          |
| `npm run verify`  | Roda tudo que o CI roda. Use antes de abrir um PR  |

## Estrutura de pastas

```
├─ .github/
│  ├─ workflows/ci.yml        → em todo PR: formatação, lint, tipos, build e Lighthouse
│  ├─ workflows/deploy.yml    → merge na main = publica no GitHub Pages
│  ├─ workflows/release.yml   → prepara releases e tags automaticamente
│  └─ ISSUE_TEMPLATE/         → modelos de issue (bug e conteúdo)
├─ docs/hostinger/            → modelos prontos para a migração (workflow e .htaccess)
├─ public/                    → arquivos copiados como estão (favicon, robots.txt)
├─ src/
│  ├─ assets/                 → imagens otimizadas pelo Astro (logos, fotos)
│  ├─ components/
│  │  ├─ layout/              → Header, Footer
│  │  ├─ home/                → uma pasta/arquivo por seção da home
│  │  └─ ui/                  → peças reutilizáveis (botão, chip, marquee)
│  ├─ content/blog/           → posts do blog em Markdown
│  ├─ data/                   → dados do site, clientes e projetos
│  ├─ layouts/                → BaseLayout (SEO), PostLayout
│  ├─ pages/                  → cada arquivo vira uma rota
│  ├─ scripts/                → TypeScript das interações
│  └─ styles/                 → tokens do manual de marca e estilos globais
└─ astro.config.mjs           → endereço do site e caminho base
```

Algumas pastas aparecem conforme as fases do projeto avançam (veja os
[milestones](https://github.com/davipeterson/asimovjr-site/milestones)).

## Guia de estilo

A página `/estilo` mostra as cores, fontes e componentes base do jeito que estão no código
(prévia: https://davipeterson.github.io/asimovjr-site/estilo). Ela não aparece no Google nem no
sitemap. Os tokens do manual de marca ficam em `src/styles/tokens.css`: use sempre as variáveis
(`var(--cor-azul)`, `var(--fonte-titulo)`…) em vez de valores soltos.

## Como atualizar o conteúdo

Telefone, e-mail, endereço e redes ficam em `src/data/site.ts`. Clientes do carrossel, projetos
em destaque e posts do blog vão ganhar o passo a passo aqui assim que as seções forem
implementadas.

## Fluxo de trabalho no GitHub

1. **Tudo começa numa issue.** Use os modelos "Algo quebrado" ou "Conteúdo novo". Cada issue fica
   num milestone (uma fase do projeto).
2. **Crie uma branch a partir da `main`** com o tipo na frente:
   `feat/hero-particulas`, `fix/contato-celular`, `content/cliente-uairrior`.
3. **Abra um PR** e preencha o modelo. Escreva "Closes #N" (em inglês, é a palavra que o GitHub reconhece) para a issue fechar sozinha no merge.
4. **O CI precisa passar** (formatação, lint, tipos, build e Lighthouse no celular com nota
   mínima de 90 em desempenho e acessibilidade).
5. **Merge com "Squash and merge".** O título do PR vira o commit na `main`, por isso ele segue o
   padrão de [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

Detalhes em [CONTRIBUTING.md](CONTRIBUTING.md).

## Releases e versões

O projeto usa [versionamento semântico](https://semver.org/lang/pt-BR/) e o
[release-please](https://github.com/googleapis/release-please):

- A cada merge na `main`, o release-please atualiza um PR chamado
  **"chore(main): release x.y.z"** com o `CHANGELOG.md` montado a partir dos títulos dos PRs.
- Quando esse PR é mergeado, ele cria a **tag `vX.Y.Z`** e a **release** no GitHub.
- Enquanto a versão for `0.x`, um `feat:` sobe a versão do meio (0.1.0 → 0.2.0) e um `fix:`
  sobe a última (0.2.0 → 0.2.1). Cada milestone corresponde a uma versão: v0.1.0 é o esqueleto
  e v1.0.0 é o lançamento no domínio.

| Prefixo do título                           | Entra no CHANGELOG como | Muda a versão? |
| ------------------------------------------- | ----------------------- | -------------- |
| `feat:`                                     | Novidades               | Sim            |
| `fix:`                                      | Correções               | Sim            |
| `perf:`                                     | Desempenho              | Sim            |
| `content:`                                  | Conteúdo                | Não            |
| `docs:`                                     | Documentação            | Não            |
| `ci:` / `build:`                            | Infraestrutura          | Não            |
| `refactor:` / `style:` / `chore:` / `test:` | (não aparece)           | Não            |

## Deploy

**Hoje:** todo merge na `main` dispara `.github/workflows/deploy.yml`, que faz o build e publica
no GitHub Pages. O workflow descobre sozinho o endereço e o caminho base
(`/asimovjr-site/`).

O endereço e o caminho base vêm de duas variáveis lidas em `astro.config.mjs`:

| Variável    | GitHub Pages                     | Hostinger                 |
| ----------- | -------------------------------- | ------------------------- |
| `SITE_URL`  | `https://davipeterson.github.io` | `https://asimovjr.com.br` |
| `BASE_PATH` | `/asimovjr-site`                 | `/`                       |

---

## Migração para a Hostinger

Quando a prévia for aprovada, o site sai do GitHub Pages e vai para a hospedagem da Hostinger,
no domínio `asimovjr.com.br`. O código não muda: o Astro gera arquivos estáticos (HTML, CSS, JS
e imagens) e a Hostinger só precisa servir esses arquivos. O que muda é **para onde** o GitHub
Actions envia o build.

> **Resumo:** fazer backup do WordPress → liberar SSH na Hostinger → cadastrar 5 secrets no
> GitHub → copiar 2 arquivos de `docs/hostinger/` → rodar o deploy → conferir → desligar o deploy
> do GitHub Pages.

### Antes de começar

- Acesso ao **hPanel** da Hostinger com o domínio `asimovjr.com.br`.
- Um plano com **acesso SSH** (Premium ou superior). Se o plano não tiver SSH, veja
  [Alternativa sem SSH (FTP)](#alternativa-sem-ssh-ftp).
- Permissão de administrador neste repositório (para cadastrar secrets).
- Escolha um horário de pouco acesso: entre os passos 6 e 7 o site antigo é substituído.

### Passo 1 · Backup do site atual (WordPress)

O deploy **substitui** o conteúdo de `public_html`. Antes de qualquer coisa:

1. hPanel → **Arquivos → Backups** → gere um backup completo (arquivos e banco de dados) e
   baixe para o seu computador.
2. Confira se o download abre. Esse backup é o caminho de volta se algo der errado.

### Passo 2 · Liberar o acesso SSH

1. hPanel → **Avançado → Acesso SSH** → ative o SSH.
2. Anote o **IP/host**, a **porta** (na Hostinger costuma ser `65002`) e o **usuário**
   (algo como `u123456789`).
3. No seu computador, crie uma chave só para o deploy (sem senha, porque o GitHub Actions não
   consegue digitar senha):

   ```bash
   ssh-keygen -t ed25519 -C "deploy asimovjr-site" -f ~/.ssh/asimovjr_deploy -N ""
   ```

4. Ainda em **Acesso SSH**, em **Chaves SSH**, cole o conteúdo de `~/.ssh/asimovjr_deploy.pub`
   (a chave **pública**).
5. Teste a conexão e descubra o caminho da pasta do site:

   ```bash
   ssh -i ~/.ssh/asimovjr_deploy -p 65002 u123456789@SEU_HOST
   cd domains/asimovjr.com.br/public_html && pwd
   ```

   Guarde o caminho que o `pwd` mostrar (algo como
   `/home/u123456789/domains/asimovjr.com.br/public_html`).

### Passo 3 · Cadastrar os secrets no GitHub

No repositório: **Settings → Secrets and variables → Actions → New repository secret**.
Os valores nunca aparecem no código nem nos logs.

| Secret              | Valor                                                              |
| ------------------- | ------------------------------------------------------------------ |
| `HOSTINGER_HOST`    | IP/host do passo 2                                                 |
| `HOSTINGER_PORT`    | Porta do passo 2 (ex.: `65002`)                                    |
| `HOSTINGER_USER`    | Usuário do passo 2 (ex.: `u123456789`)                             |
| `HOSTINGER_PATH`    | Caminho do `pwd` do passo 2, **sem** barra no final                |
| `HOSTINGER_SSH_KEY` | Conteúdo inteiro de `~/.ssh/asimovjr_deploy` (a chave **privada**) |

Depois de cadastrar, apague a chave privada do seu computador se não for mais usar.

### Passo 4 · Ativar o workflow da Hostinger

Numa branch nova (`ci/deploy-hostinger`):

1. Copie o modelo do workflow:

   ```bash
   cp docs/hostinger/deploy-hostinger.yml .github/workflows/deploy-hostinger.yml
   ```

   Ele faz o build já com `SITE_URL=https://asimovjr.com.br` e `BASE_PATH=/` e envia a pasta
   `dist/` por SSH com `rsync`.

2. Copie o `.htaccess` para a pasta `public/`, para ele ir junto em todo build:

   ```bash
   cp docs/hostinger/.htaccess public/.htaccess
   ```

   Ele força HTTPS sem `www`, usa a página 404 do site, redireciona endereços antigos do
   WordPress (por exemplo, o post do blog) e configura o cache dos arquivos.

3. Em `astro.config.mjs`, troque os valores padrão para o domínio, para o `npm run dev` e o
   `npm run build` locais já saírem certos:

   ```js
   const site = process.env.SITE_URL ?? 'https://asimovjr.com.br';
   const base = process.env.BASE_PATH ?? '/';
   ```

4. Abra o PR com o título `ci: deploy na Hostinger`. **Ainda não faça o merge.**

### Passo 5 · Certificado SSL

hPanel → **Segurança → SSL** → confirme que `asimovjr.com.br` tem SSL ativo (a Hostinger
emite um gratuito). Sem isso, o redirecionamento para HTTPS do `.htaccess` deixa o site fora do
ar.

### Passo 6 · Publicar

1. Faça o merge do PR do passo 4.
2. Em **Actions → Deploy (Hostinger)**, acompanhe a execução. Na primeira vez, se quiser, rode
   manualmente pelo botão **Run workflow**.
3. O `rsync --delete` deixa `public_html` igual à pasta `dist/` e apaga os arquivos do
   WordPress que estavam lá. A pasta `.well-known/` (do SSL) é preservada.

### Passo 7 · Conferir

- [ ] `https://asimovjr.com.br` abre a home nova
- [ ] `http://asimovjr.com.br` e `https://www.asimovjr.com.br` redirecionam para `https://asimovjr.com.br`
- [ ] `/blog` e o post abrem
- [ ] O endereço antigo do post redireciona para o novo
- [ ] Um endereço inexistente mostra a página 404 do site
- [ ] O botão do WhatsApp abre a conversa com a mensagem pronta
- [ ] Teste no celular

### Passo 8 · Desligar o GitHub Pages

1. Apague `.github/workflows/deploy.yml` num PR `ci: remove deploy do GitHub Pages`.
2. Em **Settings → Pages**, desative o site.
3. Atualize os links de "Prévia" e os badges no topo deste README.

### Domínio e DNS

Se o domínio e a hospedagem estão na mesma conta da Hostinger, o DNS **já aponta** para o
servidor certo e não precisa mexer. Só se o domínio estiver apontando para outro lugar:
hPanel → **Domínios → asimovjr.com.br → DNS** → registro `A` de `@` com o IP da hospedagem e
`CNAME` de `www` para `asimovjr.com.br`. A propagação leva de minutos a algumas horas.

### Se der errado (voltar ao site antigo)

1. Desative o workflow em **Actions → Deploy (Hostinger) → ⋯ → Disable workflow**, para um
   próximo merge não sobrescrever de novo.
2. hPanel → **Arquivos → Backups** → restaure o backup do passo 1.

### Alternativa sem SSH (FTP)

Se o plano não tiver SSH, troque o passo "Enviar arquivos" do workflow pela action
[`SamKirkland/FTP-Deploy-Action`](https://github.com/SamKirkland/FTP-Deploy-Action), usando a
conta FTP do hPanel (**Arquivos → Contas FTP**) e os secrets `HOSTINGER_FTP_SERVER`,
`HOSTINGER_FTP_USER` e `HOSTINGER_FTP_PASSWORD`, com `local-dir: ./dist/` e
`server-dir: public_html/`. O resto dos passos é igual.
