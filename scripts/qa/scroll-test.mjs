import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

const URL = 'http://localhost:5173/ecole-jules-veronique/'
const browser = await puppeteer.launch({ headless: true, executablePath: await chromium.executablePath(), args: [...chromium.args, '--no-sandbox'] })

async function diag(page, label) {
  const r = await page.evaluate(() => {
    const cs = (el) => getComputedStyle(el)
    const html = document.documentElement, body = document.body
    const top = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
    const path = []
    let n = top
    while (n && n !== document.body) { path.push(n.tagName.toLowerCase() + (n.className && typeof n.className === 'string' ? '.' + n.className.split(' ').slice(0, 3).join('.') : '')); n = n.parentElement }
    // any fixed/absolute full-screen overlays?
    const overlays = [...document.querySelectorAll('*')].filter(el => {
      const s = cs(el); if (s.position !== 'fixed') return false
      const r = el.getBoundingClientRect(); return r.width >= innerWidth * 0.9 && r.height >= innerHeight * 0.9 && s.pointerEvents !== 'none'
    }).map(el => el.tagName + '.' + (el.className || '').toString().slice(0, 60))
    return {
      scrollY: window.scrollY, scrollHeight: html.scrollHeight, innerHeight: innerHeight,
      html: { overflowX: cs(html).overflowX, overflowY: cs(html).overflowY, height: cs(html).height, position: cs(html).position },
      body: { overflowX: cs(body).overflowX, overflowY: cs(body).overflowY, height: cs(body).height, position: cs(body).position, top: cs(body).top, classes: body.className, inlineStyle: body.getAttribute('style') },
      topElementPath: path.slice(0, 4), overlays,
      scrollWidth: html.scrollWidth, clientWidth: html.clientWidth,
    }
  })
  console.log(`\n== ${label} ==`); console.log(JSON.stringify(r, null, 1))
  return r
}

for (const vp of [{ w: 1440, h: 900, mobile: false }, { w: 390, h: 844, mobile: true }]) {
  const page = await browser.newPage()
  await page.setViewport({ width: vp.w, height: vp.h, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 1 })
  page.on('pageerror', e => console.log('PAGEERROR', e.message))
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) console.log('CONSOLE', m.type(), m.text().slice(0, 200)) })
  await page.goto(URL, { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 1200))
  await diag(page, `${vp.w}px initial`)

  // 1. wheel
  await page.mouse.move(vp.w / 2, vp.h / 2)
  await page.mouse.wheel({ deltaY: 800 })
  await new Promise(r => setTimeout(r, 500))
  const afterWheel = await page.evaluate(() => window.scrollY)
  console.log('after wheel 800:', afterWheel)

  // 2. keyboard
  await page.keyboard.press('PageDown'); await new Promise(r => setTimeout(r, 500))
  const afterPgDn = await page.evaluate(() => window.scrollY)
  console.log('after PageDown:', afterPgDn)
  await page.keyboard.press('Space'); await new Promise(r => setTimeout(r, 500))
  console.log('after Space:', await page.evaluate(() => window.scrollY))
  await page.keyboard.press('ArrowDown'); await new Promise(r => setTimeout(r, 300))
  console.log('after ArrowDown:', await page.evaluate(() => window.scrollY))

  // 3. touch (mobile)
  if (vp.mobile) {
    const y0 = await page.evaluate(() => window.scrollY)
    await page.touchscreen.touchStart(200, 600)
    for (let i = 1; i <= 10; i++) await page.touchscreen.touchMove(200, 600 - i * 40)
    await page.touchscreen.touchEnd()
    await new Promise(r => setTimeout(r, 600))
    console.log('touch swipe delta:', (await page.evaluate(() => window.scrollY)) - y0)
  }

  // 4. programmatic to bottom
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
  await new Promise(r => setTimeout(r, 400))
  const bottom = await page.evaluate(() => ({ y: window.scrollY, max: document.documentElement.scrollHeight - innerHeight }))
  console.log('bottom:', bottom)

  // 5. open mobile menu then close and check scroll restored
  if (vp.mobile) {
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }))
    await new Promise(r => setTimeout(r, 300))
    await page.click('header button[aria-haspopup]')
    await new Promise(r => setTimeout(r, 700))
    await diag(page, 'mobile menu OPEN')
    await page.click('[role=dialog] button')
    await new Promise(r => setTimeout(r, 700))
    const d = await diag(page, 'mobile menu CLOSED')
    await page.mouse.wheel({ deltaY: 400 }); await new Promise(r => setTimeout(r, 400))
    console.log('wheel after menu close:', await page.evaluate(() => window.scrollY))
  }

  // 6. navigate to /registration and back
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.click('a[href$="/registration"]').catch(() => console.log('no reg link clickable'))
  await new Promise(r => setTimeout(r, 900))
  console.log('url:', page.url())
  await diag(page, 'registration page')
  await page.mouse.wheel({ deltaY: 600 }); await new Promise(r => setTimeout(r, 400))
  console.log('reg page wheel:', await page.evaluate(() => window.scrollY))
  await page.goBack(); await new Promise(r => setTimeout(r, 900))
  await diag(page, 'back home')
  await page.mouse.wheel({ deltaY: 600 }); await new Promise(r => setTimeout(r, 400))
  console.log('home wheel after back:', await page.evaluate(() => window.scrollY))

  await page.close()
}
await browser.close()
