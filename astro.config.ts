import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    expressiveCode({
      themes: ['one-dark-pro'],
      defaultProps: {
        wrap: false,
      },
    }),
    mdx(),
    react(),
  ],
  markdown: {
    syntaxHighlight: false,
  },
})
