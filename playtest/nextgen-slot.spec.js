const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const evidenceDir = path.join(__dirname, 'evidence');
const targetPath = '/research/nextgen_pachislot_expression_lab/index.html';

async function shot(page, name) {
  await page.screenshot({ path: path.join(evidenceDir, `${name}.png`), fullPage: true });
}

test('NEXT-GEN SLOT LAB full 1G iPhone interaction', async ({ page }) => {
  fs.mkdirSync(evidenceDir, { recursive: true });
  const base = process.env.PLAYTEST_BASE_URL || 'http://127.0.0.1:4173';
  const url = new URL(targetPath, base).toString();
  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', msg => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => pageErrors.push(String(err)));

  await page.goto(url, { waitUntil: 'networkidle' });
  await expect(page.locator('#machine')).toBeVisible();
  await expect(page.locator('.lab-head small')).toContainText('REEL v0.2.1');
  await shot(page, '00-idle');

  await page.locator('#bet').tap();
  await expect(page.locator('#status')).toContainText('START');
  await shot(page, '01-bet');

  await page.locator('#start').tap();
  await expect(page.locator('#status')).toContainText(/REELS/);
  await page.waitForTimeout(260);
  await shot(page, '02-cruise');

  for (let i = 0; i < 3; i += 1) {
    const stop = page.locator('.stop').nth(i);
    await expect(stop).toBeEnabled();
    await stop.tap();
    await page.waitForTimeout(330);
    await shot(page, `0${i + 3}-stop${i + 1}`);
  }

  await expect(page.locator('#machine')).toHaveAttribute('data-phase', /judge|bonus|idle/, { timeout: 5000 });
  await page.waitForTimeout(750);
  await shot(page, '06-judgement-bonus');

  const report = await page.evaluate(() => ({
    version: document.querySelector('.lab-head small')?.textContent || '',
    status: document.querySelector('#status')?.textContent || '',
    phase: document.querySelector('#machine')?.dataset.phase || '',
    fps: document.querySelector('#fps')?.textContent || '',
    credit: document.querySelector('#credit')?.textContent || '',
    eventLog: document.querySelector('#eventLog')?.textContent || ''
  }));

  fs.writeFileSync(path.join(evidenceDir, 'nextgen-slot-report.json'), JSON.stringify({
    target: url,
    report,
    consoleMessages,
    pageErrors
  }, null, 2));

  expect(pageErrors, `page errors: ${pageErrors.join('\n')}`).toEqual([]);
});
