/**
 * Capture PDE article GIFs from scripts/pde-anim.html
 * Run from hyper-demo1 (has puppeteer): 
 *   node /path/to/AIs_Wonderland/scripts/capture-pde-gifs.mjs
 */
import puppeteer from 'puppeteer'
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const HTML = join(__dir, 'pde-anim.html')
const OUT =
  process.env.PDE_GIF_OUT ||
  join(__dir, '../public/images/articles/pde')
const FPS = 10
const SCENES = [
  { id: 'scene1', name: 'pde-cycle', duration: 3.6, scroll: false },
  { id: 'scene2', name: 'pde-court-moment', duration: 3, scroll: false },
  { id: 'scene3', name: 'pde-three-failures', duration: 4.5, scroll: false },
]

mkdirSync(OUT, { recursive: true })

const chromePaths = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
]
const executablePath = chromePaths.find((p) => existsSync(p))

const browser = await puppeteer.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
})
const page = await browser.newPage()
await page.goto(`file://${HTML}`, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 800))

for (const scene of SCENES) {
  const el = await page.$(`#${scene.id}`)
  if (!el) {
    console.error(`Missing #${scene.id}`)
    continue
  }
  const box = await el.boundingBox()
  const W = Math.round(box.width)
  const H = Math.round(box.height)
  const dir = `/tmp/gif_${scene.name}`
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })

  const totalFrames = Math.ceil(scene.duration * FPS)
  for (let i = 0; i < totalFrames; i++) {
    const buf = await el.screenshot({ type: 'png' })
    writeFileSync(`${dir}/${String(i).padStart(4, '0')}.png`, buf)
    await new Promise((r) => setTimeout(r, 1000 / FPS))
  }

  const gifPath = join(OUT, `${scene.name}.gif`)
  execSync(
    `ffmpeg -y -framerate ${FPS} -i ${dir}/%04d.png -vf "fps=${FPS},scale=${W}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" "${gifPath}"`,
    { stdio: 'pipe', timeout: 60000 },
  )
  console.log(`✅ ${gifPath}`)
}

await browser.close()
console.log('Done.')
