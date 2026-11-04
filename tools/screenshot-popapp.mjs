// Screenshots of popappbooks.me for the portfolio's PopApp page.
// Run from the repo root:
//   npm install --no-save playwright@1.48.2 && npx playwright install chromium   (once)
//   node tools/screenshot-popapp.mjs
import { chromium } from "playwright";
import { mkdirSync } from "fs";

mkdirSync("images/popapp", { recursive: true });
const browser = await chromium.launch();

async function shot(url, file, viewport, height, scale = 1) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: scale });
  await page.goto(url, { waitUntil: "networkidle" });
  // Dismiss the cookie banner
  const no = page.getByRole("button", { name: "לא תודה" });
  if (await no.count()) await no.first().click().catch(() => {});
  // Scroll once so lazy images load, then back to the top
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `images/popapp/${file}`, type: "jpeg", quality: 82,
    clip: { x: 0, y: 0, width: viewport.width, height } , fullPage: true });
  console.log("saved", file);
  await page.close();
}

await shot("https://popappbooks.me", "home-desktop.jpg", { width: 1440, height: 900 }, 1800);
await shot("https://popappbooks.me", "home-mobile.jpg", { width: 390, height: 844 }, 1700, 2);
await shot("https://popappbooks.me/anivehata", "purchase.jpg", { width: 1440, height: 900 }, 1400);
await browser.close();
