// Section audit: 10 widths FR + 2 EN — overflow, <13px text, <44px targets, tall headings, console. Screenshots to SHOTS.
import { BASE, SHOTS, launch, newPage, toEN, sleep } from './lib.mjs'
import { mkdirSync } from 'node:fs'
const [sel, shotName] = [process.argv[2], process.argv[3] || 'sec']; mkdirSync(SHOTS, { recursive: true })
const browser = await launch()
for (const [w, lang] of [[320,'fr'],[375,'fr'],[390,'fr'],[414,'fr'],[480,'fr'],[768,'fr'],[1024,'fr'],[1280,'fr'],[1440,'fr'],[1600,'fr'],[390,'en'],[1440,'en']]) {
  const { page, errs } = await newPage(browser, w)
  await page.goto(BASE, { waitUntil: 'networkidle0' })
  if (lang==='en') await toEN(page)
  await page.evaluate((sel)=>document.querySelector(sel).scrollIntoView({ behavior: 'instant', block: 'start' }), sel); await sleep(900)
  const r = await page.evaluate((sel) => {
    const s = document.querySelector(sel)
    const wide = [...s.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1).length
    const small = [...s.querySelectorAll('*')].filter(e => e.children.length===0 && e.textContent.trim() && parseFloat(getComputedStyle(e).fontSize) < 13).length
    const targets = [...s.querySelectorAll('a,button')].map(e => Math.round(e.getBoundingClientRect().height)).filter(h=>h<44)
    const tall = [...s.querySelectorAll('h2,h3,h4')].filter(h => h.getBoundingClientRect().height > 3*parseFloat(getComputedStyle(h).lineHeight)).length
    return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, wide, small, targets, tall, top: Math.round(s.getBoundingClientRect().top), secH: Math.round(s.getBoundingClientRect().height),
      bg: getComputedStyle(s).backgroundColor, h2: s.querySelector('h2')?.textContent, lang: document.documentElement.lang, icons: [...s.querySelectorAll('svg')].map(x=>x.getAttribute('width')).join(',') }
  }, sel)
  console.log(w, lang, r.sw>r.cw?'OVERFLOW':'ok', JSON.stringify(r), errs.length?errs:'')
  await page.screenshot({ path: `${SHOTS}/${shotName}-${lang}-${w}.png` })
  const h = r.secH
  for (let i = 1; i * 820 < h && i < 4; i++) { await page.evaluate(()=>window.scrollBy(0, 820)); await sleep(500); await page.screenshot({ path: `${SHOTS}/${shotName}-${lang}-${w}-${'bcd'[i-1]}.png` }) }
  await page.close()
}
await browser.close()
