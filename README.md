# itskitto

Personal portfolio and blog. Built with Astro, TypeScript, scoped CSS.

## Stack

- **Astro** — static site generator, content collections
- **TypeScript** — strict mode
- **CSS** — scoped component styles, global design tokens

## Structure

```
src/
  content/
    posts/          ← markdown blog posts
  components/
    Sidebar.astro
    NavGroup.astro
    Breadcrumb.astro
    StatusBar.astro
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    posts/
      index.astro   ← post listing
      [id].astro    ← post detail
  styles/
    tokens.css
    reset.css
    global.css
  content.config.ts
```

## Content

Posts live in `src/content/posts/` as `.md` or `.mdx` files.

Frontmatter schema:

```yaml
title: string
description: string
pubDate: date
category: string
draft: boolean       # default false
ref: string          # optional
readTime: number     # optional — minutes
```

## Dev

```bash
pnpm dev
pnpm build
pnpm preview
```
