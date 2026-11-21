import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import fs from 'fs'

const URL = 'http://localhost:5173/ecole-jules-veronique/'
const browser = await puppeteer.launch({ headless: true, executablePath: await chromium.executablePath(), args: [...chromium.args, '--no-sandbox'] })
fs.mkdirSync('/tmp/shots', { recursive: true })

for (const w of [320, 375, 390, 414, 480, 768, 1024, 1280, 1440, 1600]) {
  const page = await browser.newPage()
  const mobile = w < 768
  await page.setViewport({ width: w, height: mobile ? 800 : 900, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 })
  await page.goto(URL, { waitUntil: 'networkidle0' })
  // force all reveals visible
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight
    for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)) }
    window.scrollTo(0, 0)
  })
  await new Promise(r => setTimeout(r, 800))
  const res = await page.evaluate((vw) => {
    const offenders = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0) continue
      const cs = getComputedStyle(el)
      if (cs.position === 'fixed') continue
      if (r.right > vw + 1 || r.left < -1) {
        // skip if an ancestor clips it
        let p = el.parentElement, clipped = false
        while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') { clipped = true; break } p = p.parentElement }
        if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ').slice(0, 3).join('.')} [${Math.round(r.left)}→${Math.round(r.right)}]`)
      }
    }
    // smallest text sizes
    const sizes = {}
    for (const el of document.querySelectorAll('p,span,a,li,td,th,label,button')) {
      if (!el.textContent.trim()) continue
      const fs = parseFloat(getComputedStyle(el).fontSize); sizes[fs] = (sizes[fs] || 0) + 1
    }
    // touch targets < 44
    const small = []
    for (const el of document.querySelectorAll('a,button')) {
      const r = el.getBoundingClientRect(); if (r.width === 0 || r.height === 0) continue
      if (r.height < 40 || r.width < 40) small.push(`${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 22) || el.getAttribute('aria-label')}" ${Math.round(r.width)}x${Math.round(r.height)}`)
    }
    return { offenders: [...new Set(offenders)].slice(0, 12), sizes, smallTargets: [...new Set(small)].slice(0, 25), height: document.documentElement.scrollHeight }
  }, w)
  console.log(`\n===== ${w}px  (page height ${res.height}px) =====`)
  console.log('overflow offenders:', res.offenders.length ? res.offenders : 'none')
  console.log('font sizes in use:', Object.entries(res.sizes).sort((a, b) => a[0] - b[0]).map(([k, v]) => `${k}px×${v}`).join('  '))
  console.log('targets <40px:', res.smallTargets.length, res.smallTargets.slice(0, 12))
  if ([375, 768, 1440].includes(w)) {
    await page.screenshot({ path: `/tmp/shots/home-${w}.png`, fullPage: true })
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path: `/tmp/shots/hero-${w}.png` })
  }
  await page.close()
}
await browser.close()
