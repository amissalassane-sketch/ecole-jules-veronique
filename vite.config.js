import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages SPA fallback.
 * Pages serves `404.html` for any path it cannot resolve (e.g. a direct reload
 * of /registration or /confirmation). Copying the *built* index.html — with
 * its hashed asset URLs, all absolute under `base` — lets BrowserRouter take
 * over on those deep links. Generated at build time so it can never go stale.
 */
function githubPagesSpaFallback() {
  let outDir = 'dist'
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')
      if (existsSync(index)) copyFileSync(index, resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  base: '/Official-website-of-Jul-and-V-ronique-Bilingual-School/',
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
})