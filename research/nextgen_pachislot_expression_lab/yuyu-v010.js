/* YUYU v0.1.0 — YuSosha original normal-type benchmark.
   Goal: real-machine-class reel readability and tactile 1G loop.
   This patch intentionally keeps the proven reel mechanics and changes identity,
   cabinet presentation and an original notification lamp only. */
(() => {
  const yuyu={version:'0.1.0', lamp:false, bonusSignals:0};

  const baseCreate=NextGenScene.prototype.create;
  NextGenScene.prototype.create=function(){
    baseCreate.call(this);
    this.yuyuLampBack=this.add.circle(195,86,30,0x06130d,.94).setStrokeStyle(4,0x5d796c,.7).setDepth(82);
    this.yuyuLampGlow=this.add.circle(195,86,24,0x5cff9b,0).setBlendMode(Phaser.BlendModes.ADD).setDepth(83);
    this.yuyuLampCore=this.add.circle(195,86,17,0xd9ffe8,.06).setDepth(84);
    this.yuyuLampText=this.add.text(195,86,'遊',{fontFamily:'system-ui,sans-serif',fontSize:'24px',fontStyle:'900',color:'#eafff1'}).setOrigin(.5).setAlpha(.22).setDepth(85);
    this.add.text(195,119,'YUYU CHANCE',{fontFamily:'system-ui,sans-serif',fontSize:'8px',fontStyle:'800',color:'#b9d8c7',letterSpacing:2}).setOrigin(.5).setAlpha(.62).setDepth(85);
  };

  const baseHit=NextGenScene.prototype.hitRelease;
  NextGenScene.prototype.hitRelease=function(){
    baseHit.call(this);
    yuyu.lamp=true; yuyu.bonusSignals++;
    this.tweens.add({targets:this.yuyuLampGlow,alpha:.82,scale:1.18,duration:120,ease:'Quad.Out'});
    this.tweens.add({targets:this.yuyuLampCore,alpha:.94,duration:90});
    this.tweens.add({targets:this.yuyuLampText,alpha:1,duration:100});
    logEvent('YUYU','CHANCE_LAMP_ON');
  };

  const baseReset=NextGenScene.prototype.resetRound;
  NextGenScene.prototype.resetRound=function(){
    baseReset.call(this); yuyu.lamp=false;
    this.yuyuLampGlow?.setAlpha(0).setScale(1);
    this.yuyuLampCore?.setAlpha(.06);
    this.yuyuLampText?.setAlpha(.22);
  };

  window.__YUYU_STATE__=()=>({
    ...yuyu,
    reel:window.__REEL_LINE_STATE__?.()||null,
    light:window.__REEL_LIGHT_STATE__?.()||null
  });

  const head=document.querySelector('.lab-head b'); if(head) head.textContent='遊創舎 // 遊遊';
  const sub=document.querySelector('.lab-head small'); if(sub) sub.textContent='YUYU v0.1.0 · NORMAL TYPE BENCHMARK';
  const title=document.querySelector('.title-plate span'); if(title) title.textContent='遊遊';
  const titleSub=document.querySelector('.title-plate small'); if(titleSub) titleSub.textContent='YUYU / NORMAL TYPE';
  const note=document.querySelector('.note'); if(note) note.textContent='遊遊 v0.1 — 実機級ノーマルタイプ研究機。3×3リールと停止品質を基準に、告知・照明・操作感を段階的に研究。';
  document.title='遊遊 YUYU — YuSosha Normal Type Benchmark';
  logEvent('PATCH','YUYU_V0_1_0');
})();