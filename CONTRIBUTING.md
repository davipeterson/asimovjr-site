# Como contribuir

Obrigado por ajudar no site da Asimov Jr. Este guia é curto de propósito.

## Antes de começar

- Node 22 (`nvm use`), depois `npm install`.
- Leia a seção [Fluxo de trabalho no GitHub](README.md#fluxo-de-trabalho-no-github) do README.

## Branches

Sempre a partir da `main` atualizada, com o tipo na frente:

| Tipo        | Exemplo                   |
| ----------- | ------------------------- |
| `feat/`     | `feat/carrossel-clientes` |
| `fix/`      | `fix/menu-celular`        |
| `content/`  | `content/post-dados`      |
| `docs/`     | `docs/readme-hostinger`   |
| `ci/`       | `ci/lighthouse-budget`    |
| `refactor/` | `refactor/tokens-css`     |

## Títulos de PR e commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/pt-br/), em português e no
imperativo:

```
feat: adiciona carrossel de clientes
fix: corrige corte do título no celular
content: adiciona Uai!rrior ao carrossel
docs: explica migração para a Hostinger
```

O merge é sempre **Squash and merge**, então o **título do PR** é o que importa: ele vira o
commit na `main`, entra no CHANGELOG e define a próxima versão (veja
[Releases e versões](README.md#releases-e-versões)). Mudança que quebra algo importante leva `!`
(`feat!: ...`).

## Antes de abrir o PR

```bash
npm run verify
```

Isso roda formatação, lint, checagem de tipos e build, igual ao CI. Confira também no navegador,
no computador e com a tela de celular (DevTools → modo responsivo, 375 px).

## Boas práticas do projeto

- **Conteúdo fora dos componentes.** Texto que muda (clientes, projetos, contatos) mora em
  `src/data/` ou em `src/content/`.
- **Sem dado inventado.** Número, prêmio ou cliente só entra se for confirmado.
- **Imagens em `src/assets/`**, para o Astro otimizar. `public/` só para o que precisa do nome
  exato (favicon, robots.txt).
- **Animação respeita `prefers-reduced-motion`.** Quem desativou animações no sistema vê o
  conteúdo parado e completo.
- **Acessível de verdade:** botão é `<button>`, link é `<a>`, imagem tem `alt`, contraste mínimo
  de 4.5:1 no texto.
- **Leve:** JavaScript só onde há interação. O Lighthouse do CI barra PRs que deixam o site lento.

## Releases

Ninguém cria tag na mão. O release-please mantém um PR "chore(main): release x.y.z"; quando o
time decide fechar uma versão (normalmente ao concluir um milestone), é só fazer o merge dele.
