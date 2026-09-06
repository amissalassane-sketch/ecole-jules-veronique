// Navbar + Hero non-regression at 5 widths.
import { BASE, launch, newPage, sleep } from './lib.mjs'
const browser = await launch()
for (const w of [320, 390, 768, 1024, 1440]) {
  const { page, errs } = await newPage(browser, w)
  await page.goto(BASE, { waitUntil: 'networkidle0' }); await sleep(600)
  const r = await page.evaluate(() => { const h1=document.querySelector('h1'); const header=document.querySelector('header')
    return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, header: Math.round(header.getBoundingClientRect().height), h1: h1.textContent.slice(0,30), links: header.querySelectorAll('nav a').length, cta: header.querySelector('a[href$=registration]')?.textContent, switcher: !!header.querySelector('button[aria-pressed]'), heroBg: getComputedStyle(h1.closest('section')).backgroundColor } })
  console.log(w, r.sw>r.cw?'OVERFLOW':'ok', JSON.stringify(r), 'errors', errs.length)
  await page.close()
}
await browser.close()
