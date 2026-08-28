const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const evidenceDir = path.join(__dirname, 'evidence');
const targetPath = '/research/nextgen_pachislot_expression_lab/index.html';

async function shot(page, name) {
  await page.screenshot({ path: path.join(evidenceDir, `${name}.png`), fullPage: true });
}

async function audioState(page, label) {
  const state = await page.evaluate(() => window.__NEXTGEN_AUDIO_STATE__?.() || null);
  return { label, state };
}

test('NEXT-GEN SLOT LAB full 1G iPhone interaction', async ({ page }) => {
  fs.mkdirSync(evidenceDir, { recursive: true });
  const base = process.env.PLAYTEST_BASE_URL || 'http://127.0.0.1:4173';
  const url = new URL(targetPath, base).toString();
  const consoleMessages = [];
  const pageErrors = [];
  const audioStates = [];

  page.on('console', msg => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => pageErrors.push(String(err)));

  await page.goto(url, { waitUntil: 'networkidle' });
  await expect(page.locator('#machine')).toBeVisible();
  await expect(page.locator('.lab-head small')).toContainText('PHASER LAB v0.3.0');
  await expect(page.locator('#phaserResearchModes')).toBeVisible();
  await expect.poll(async () => page.evaluate(() => typeof window.__NEXTGEN_AUDIO_STATE__)).toBe('function');
  await expect.poll(async () => page.evaluate(() => typeof window.__PHASER_RESEARCH_STATE__)).toBe('function');
  await shot(page, '00-idle');

  await page.locator('#bet').tap();
  await expect(page.locator('#status')).toContainText('START');
  audioStates.push(await audioState(page, 'BET'));
  await shot(page, '01-bet');

  await page.locator('#start').tap();
  await expect(page.locator('#status')).toContainText(/REELS/);
  await page.waitForTimeout(260);
  audioStates.push(await audioState(page, 'START'));
  await shot(page, '02-cruise');

  for (let i = 0; i < 3; i += 1) {
    const stop = page.locator('.stop').nth(i);
    await expect(stop).toBeEnabled();
    await stop.tap();
    await page.waitForTimeout(330);
    audioStates.push(await audioState(page, `STOP${i + 1}`));
    await shot(page, `0${i + 3}-stop${i + 1}`);
  }

  await expect(page.locator('#machine')).toHaveAttribute('data-phase', /judge|bonus|idle/, { timeout: 5000 });
  await page.waitForTimeout(750);
  audioStates.push(await audioState(page, 'BONUS_WINDOW'));
  await shot(page, '06-judgement-bonus');

  const report = await page.evaluate(() => ({
    version: document.querySelector('.lab-head small')?.textContent || '',
    status: document.querySelector('#status')?.textContent || '',
    phase: document.querySelector('#machine')?.dataset.phase || '',
    fps: document.querySelector('#fps')?.textContent || '',
    credit: document.querySelector('#credit')?.textContent || '',
    eventLog: document.querySelector('#eventLog')?.textContent || '',
    phaserResearch: window.__PHASER_RESEARCH_STATE__?.() || null
  }));

  fs.writeFileSync(path.join(evidenceDir, 'nextgen-slot-report.json'), JSON.stringify({
    target: url,
    report,
    audioStates,
    consoleMessages,
    pageErrors
  }, null, 2));

  expect(report.version).toContain('PHASER LAB v0.3.0');
  expect(report.phaserResearch?.mode).toBe('COMBO');
  expect(report.phaserResearch?.triggerCount).toBeGreaterThanOrEqual(1);
  expect(report.phaserResearch?.cameraEvents).toBeGreaterThanOrEqual(1);
  expect(report.phaserResearch?.tweenEvents).toBeGreaterThanOrEqual(1);
  expect(report.phaserResearch?.blendEvents).toBeGreaterThanOrEqual(1);
  expect(String(report.phaserResearch?.version || '')).toContain('4.2.1');

  for (const checkpoint of audioStates) {
    expect(checkpoint.state?.enabled, `${checkpoint.label}: audio enabled`).toBe(true);
    expect(checkpoint.state?.hasContext, `${checkpoint.label}: AudioContext exists`).toBe(true);
    expect(checkpoint.state?.hasMaster, `${checkpoint.label}: master gain exists`).toBe(true);
    expect(checkpoint.state?.contextState, `${checkpoint.label}: AudioContext running`).toBe('running');
  }

  expect(report.eventLog).toContain('STOP3_LOCK');
  expect(report.eventLog).toContain('BONUS');
  expect(report.eventLog).toContain('PHASER_FX');
  expect(consoleMessages.filter(line => line.includes('setMask') && line.includes('not supported in WebGL'))).toEqual([]);
  expect(pageErrors, `page errors: ${pageErrors.join('\n')}`).toEqual([]);
});
