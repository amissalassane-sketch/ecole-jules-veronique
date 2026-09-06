// GitHub Pages SPA fallback check (P0 — Phase 2.13 batch 1).
// Serves `dist/` exactly like GitHub Pages: files under the Vite `base` path,
// and `404.html` (HTTP 404) for anything unknown. Then reloads the deep links
// directly and asserts that the app boots on the right route.
//   npm run build && cd /tmp/pw && LD_LIBRARY_PATH=/tmp/al2023/lib:/tmp node <repo>/scripts/qa/v2/pages-fallback.mjs
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join, extname, resolve } from 'node:path'
import { launch, newPage, sleep } from './lib.mjs'

const REPO = resolve(new URL('.', import.meta.url).pathname, '../../..')
const DIST = join(REPO, 'dist')
const BASE = '/Official-website-of-Jul-and-V-ronique-Bilingual-School/'
const PORT = 4173
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' }

const server = createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  if (url.startsWith(BASE)) {
    let file = join(DIST, url.slice(BASE.length) || 'index.html')
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
    if (existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' })
      return res.end(readFileSync(file))
    }
  }
  // GitHub Pages behaviour: unknown path → 404.html with a 404 status
  const fallback = join(DIST, '404.html')
  if (existsSync(fallback)) { res.writeHead(404, { 'content-type': 'text/html' }); return res.end(readFileSync(fallback)) }
  res.writeHead(404); res.end('no 404.html')
})
await new Promise((r) => server.listen(PORT, '127.0.0.1', r))

const origin = `http://127.0.0.1:${PORT}`
const browser = await launch()
let failed = 0
for (const [path, expect] of [
  ['', { h1: /école|school/i, title: /Jules/ }],
  ['registration', { h1: /pr[ée]inscription|pre-registration/i }],
  ['confirmation', { h1: /pr[ée]inscription|pre-registration/i }],
  ['registration?lang=en', { h1: /pr[ée]inscription|pre-registration/i }],
]) {
  const { page, errs } = await newPage(browser, 1280)
  const resp = await page.goto(origin + BASE + path, { waitUntil: 'networkidle0' })
  await sleep(600)
  const r = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent.trim() || '',
    pathname: location.pathname,
    // same-origin assets only (Google Fonts are external and may be blocked offline)
    assets: [...document.querySelectorAll('script[src],link[rel=stylesheet]')].map((e) => e.src || e.href).filter((u) => u.startsWith(location.origin)),
    scrollable: document.documentElement.scrollHeight > innerHeight,
  }))
  const brokenAssets = []
  for (const a of r.assets) { const s = await page.evaluate(async (u) => (await fetch(u)).status, a); if (s !== 200) brokenAssets.push(`${a} → ${s}`) }
  // The document itself is served with HTTP 404 by GitHub Pages (that is how the fallback works);
  // Chromium logs that as a resource error — expected, not an application error.
  const appErrs = errs.filter((e) => !(resp.status() === 404 && /status of 404/.test(e)))
  const ok = expect.h1.test(r.h1) && brokenAssets.length === 0 && appErrs.length === 0
  if (!ok) failed++
  console.log(ok ? 'ok ' : 'FAIL', `${BASE}${path}`.padEnd(70), `http ${resp.status()}`, `h1="${r.h1.slice(0, 40)}"`, `path=${r.pathname}`, brokenAssets.length ? brokenAssets : '', appErrs.length ? appErrs : '')
  await page.close()
}
// Informational: an unknown deep path now boots the app too. The router has no catch-all
// route (pre-existing), so it renders an empty <main>; reported, not failed.
{
  const { page } = await newPage(browser, 1280)
  const resp = await page.goto(origin + BASE + 'does-not-exist', { waitUntil: 'networkidle0' })
  const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent.trim() || '')
  console.log('info', `${BASE}does-not-exist`.padEnd(70), `http ${resp.status()}`, h1 ? `h1="${h1.slice(0, 40)}"` : 'app booted, no matching route (no catch-all)')
  await page.close()
}
await browser.close(); server.close()
console.log(failed ? `\n${failed} check(s) FAILED` : '\nGitHub Pages fallback: all checks passed')
process.exit(failed ? 1 : 0)
