const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const evidenceDir = path.join(__dirname, 'evidence');
const targetPath = '/research/nextgen_pachislot_expression_lab/index.html';
async function shot(page,name){ await page.screenshot({path:path.join(evidenceDir,`${name}.png`),fullPage:true}); }
async function audioState(page,label){return {label,state:await page.evaluate(()=>window.__NEXTGEN_AUDIO_STATE__?.()||null)};}
async function waitEvent(page,text){
 await expect.poll(async()=>page.locator('#eventLog').textContent(),{timeout:5000}).toContain(text);
}

test('PHASER BASELINE v0.4 full 1G iPhone interaction', async ({page})=>{
 fs.mkdirSync(evidenceDir,{recursive:true});
 const base=process.env.PLAYTEST_BASE_URL||'http://127.0.0.1:4173'; const url=new URL(targetPath,base).toString();
 const consoleMessages=[],pageErrors=[],audioStates=[];
 page.on('console',m=>consoleMessages.push(`[${m.type()}] ${m.text()}`)); page.on('pageerror',e=>pageErrors.push(String(e)));
 await page.goto(url,{waitUntil:'networkidle'});
 await expect(page.locator('#machine')).toBeVisible();
 await expect(page.locator('.lab-head small')).toContainText('PHASER BASELINE v0.4.0');
 await expect(page.locator('#phaserResearchModes')).toBeHidden();
 await expect.poll(async()=>page.evaluate(()=>typeof window.__PHASER_BASELINE_STATE__)).toBe('function');
 await expect.poll(async()=>page.evaluate(()=>window.__PHASER_BASELINE_STATE__?.().renderer??null),{timeout:5000}).toBe(2);
 await waitEvent(page,'SCENE  READY');
 await page.waitForTimeout(300);
 await shot(page,'00-idle-rendered');
 await page.locator('#bet').tap(); await expect(page.locator('#status')).toContainText('START'); audioStates.push(await audioState(page,'BET')); await shot(page,'01-bet');
 await page.locator('#start').tap(); await expect(page.locator('#status')).toContainText(/REELS/); await page.waitForTimeout(260); audioStates.push(await audioState(page,'START')); await shot(page,'02-cruise');
 for(let i=0;i<3;i++){
   const stop=page.locator('.stop').nth(i);
   await expect(stop).toBeEnabled(); await stop.tap();
   await waitEvent(page,`LOCK_${i+1}`);
   audioStates.push(await audioState(page,`STOP${i+1}_LOCKED`));
   await shot(page,`0${i+3}-stop${i+1}-locked`);
 }
 await expect(page.locator('#machine')).toHaveAttribute('data-phase',/judge|bonus|idle/,{timeout:5000}); await page.waitForTimeout(750); audioStates.push(await audioState(page,'BONUS_WINDOW')); await shot(page,'06-judgement-bonus');
 const report=await page.evaluate(()=>({version:document.querySelector('.lab-head small')?.textContent||'',status:document.querySelector('#status')?.textContent||'',phase:document.querySelector('#machine')?.dataset.phase||'',fps:document.querySelector('#fps')?.textContent||'',eventLog:document.querySelector('#eventLog')?.textContent||'',baseline:window.__PHASER_BASELINE_STATE__?.()||null,research:window.__PHASER_RESEARCH_STATE__?.()||null}));
 fs.writeFileSync(path.join(evidenceDir,'nextgen-slot-report.json'),JSON.stringify({target:url,report,audioStates,consoleMessages,pageErrors},null,2));
 expect(report.version).toContain('PHASER BASELINE v0.4.0'); expect(String(report.baseline?.phaser||'')).toContain('4.2.1'); expect(report.baseline?.stopBursts).toBeGreaterThanOrEqual(3); expect(report.baseline?.hitBursts).toBeGreaterThanOrEqual(1); expect(report.baseline?.transitions).toBeGreaterThanOrEqual(1);
 for(const c of audioStates){expect(c.state?.enabled).toBe(true);expect(c.state?.hasContext).toBe(true);expect(c.state?.hasMaster).toBe(true);expect(c.state?.contextState).toBe('running');}
 expect(report.eventLog).toContain('STOP3_LOCK'); expect(report.eventLog).toContain('BONUS'); expect(consoleMessages.filter(x=>x.includes('setMask')&&x.includes('not supported in WebGL'))).toEqual([]); expect(pageErrors).toEqual([]);
});
