// Scroll P0: html/body overflow, wheel, PageDown, Space, ArrowDown, touch swipe, End/Home, mobile menu, /registration, back.
import { BASE, launch, newPage, sleep } from './lib.mjs'
const browser = await launch()
for (const w of [1440, 390]) {
  const { page, errs } = await newPage(browser, w, w<768?844:900)
  await page.goto(BASE, { waitUntil: 'networkidle0' }); await sleep(500)
  const o = await page.evaluate(()=>({ html: getComputedStyle(document.documentElement).overflowY, body: getComputedStyle(document.body).overflowY }))
  const Y = () => page.evaluate(()=>Math.round(window.scrollY))
  await page.mouse.move(w/2, 450); await page.mouse.wheel({ deltaY: 800 }); await sleep(400); const wheel = await Y()
  await page.keyboard.press('PageDown'); await sleep(500); const pgdn = await Y()
  await page.keyboard.press('Space'); await sleep(500); const space = await Y()
  await page.keyboard.press('ArrowDown'); await sleep(300); const arrow = await Y()
  let swipe = null
  if (w < 768) { const y0 = await Y(); await page.touchscreen.touchStart(200, 600); for (let i=1;i<=10;i++) await page.touchscreen.touchMove(200, 600-i*40); await page.touchscreen.touchEnd(); await sleep(600); swipe = (await Y()) - y0 }
  await page.keyboard.press('End'); await sleep(800); const bottom = await page.evaluate(()=>[Math.round(window.scrollY), Math.round(document.documentElement.scrollHeight - innerHeight)])
  await page.keyboard.press('Home'); await sleep(800); const top = await Y()
  let menu = null
  if (w < 768) { await page.click('header button[aria-haspopup], header button[aria-expanded]'); await sleep(500); await page.keyboard.press('Escape'); await sleep(500); await page.mouse.wheel({ deltaY: 800 }); await sleep(400); menu = await Y() }
  await page.goto(BASE + 'registration', { waitUntil: 'networkidle0' }); await page.mouse.move(w/2, 450); await page.mouse.wheel({ deltaY: 600 }); await sleep(400); const reg = await Y()
  await page.goBack({ waitUntil: 'networkidle0' }); await sleep(400); await page.mouse.wheel({ deltaY: 1200 }); await sleep(400); const back = await Y()
  console.log(w, JSON.stringify({ o, wheel, pgdn, space, arrow, swipe, bottom, top, menu, reg, back }), 'errors', errs.length)
  await page.close()
}
await browser.close()
