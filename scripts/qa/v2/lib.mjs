// Shared helpers for the V2 QA scripts. Run from /tmp/pw (puppeteer-core + @sparticuz/chromium):
//   cd /tmp/pw && LD_LIBRARY_PATH=/tmp/al2023/lib:/tmp node <repo>/scripts/qa/v2/section.mjs '#student-life' life
import { createRequire } from 'node:module'
const require = createRequire(process.cwd() + '/')
const puppeteer = require('puppeteer-core')
const chromiumMod = require('@sparticuz/chromium'); const chromium = chromiumMod.default ?? chromiumMod
export const BASE = process.env.QA_BASE || 'http://localhost:5173/Official-website-of-Jul-and-V-ronique-Bilingual-School/'
export const SHOTS = process.env.QA_SHOTS || '/tmp/shots'
export const launch = async () => puppeteer.launch({ headless: true, executablePath: await chromium.executablePath(), args: [...chromium.args, '--no-sandbox'] })
export const newPage = async (browser, w, h = 900) => { const page = await browser.newPage(); const errs = []
  page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type()==='error' && !/ERR_CONN/.test(m.text())) errs.push(m.text()) })
  await page.setViewport({ width: w, height: h, isMobile: w<768, hasTouch: w<768 }); return { page, errs } }
export const toEN = async (page) => { await page.evaluate(()=>[...document.querySelectorAll('button')].find(b=>/^EN$/.test(b.textContent.trim()))?.click()); await sleep(300) }
export const sleep = (ms) => new Promise(r=>setTimeout(r,ms))
