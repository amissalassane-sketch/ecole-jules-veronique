// Anchors (navbar click on desktop, hash otherwise), /registration route, FR→EN switch.
import { BASE, launch, newPage, toEN, sleep } from './lib.mjs'
const IDS = ['school','commitments','programs','bilingual','student-life','facilities','registration-process','contact','faq','pricing']
const browser = await launch()
for (const w of [390, 1440]) {
  const { page, errs } = await newPage(browser, w); const out = {}
  for (const id of IDS) {
    await page.goto(BASE, { waitUntil: 'networkidle0' })
    if (w >= 1024 && ['school','programs','student-life','registration-process','contact'].includes(id)) await page.click(`header nav a[href="#${id}"]`); else await page.evaluate((id)=>{ location.hash='#'+id }, id)
    await sleep(1600); out[id] = await page.evaluate((id)=>{ const el=document.getElementById(id); return el ? Math.round(el.getBoundingClientRect().top) : 'MISSING' }, id)
  }
  await page.goto(BASE + 'registration', { waitUntil: 'networkidle0' }); out.registration = await page.evaluate(()=>document.querySelector('h1')?.textContent.slice(0,40))
  await page.goto(BASE, { waitUntil: 'networkidle0' }); await toEN(page); out.lang = await page.evaluate(()=>document.documentElement.lang)
  console.log(w, JSON.stringify(out), 'errors', errs.length)
  await page.close()
}
await browser.close()
