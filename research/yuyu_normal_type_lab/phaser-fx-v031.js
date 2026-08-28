/* YUYU v0.3.1 — WebKit-safe Phaser FX patch.
   Avoids TweenManager.killTweensOf dependency and keeps all effects pooled/tweened. */
(() => {
  state.version='0.3.1';
  YuyuScene.prototype.stopFx=function(i){
    const x=this.reels[i].x;
    state.fx.stopBursts++;
    state.fx.cameraImpulses++;
    this.cameras.main.shake(55,.0018);
    for(let n=0;n<6;n++){
      const p=this.fxPool[this.fxCursor++%this.fxPool.length];
      const a=(Math.PI*2*n/6)+(i*.35);
      p.setPosition(x,88).setAlpha(.42).setScale(.7);
      this.tweens.add({targets:p,x:x+Math.cos(a)*(18+n*2),y:88+Math.sin(a)*(18+n*2),alpha:0,scale:1.5,duration:170+n*12,ease:'Quad.Out'});
    }
    const ring=this.add.circle(x,88,13,0xffffff,0).setStrokeStyle(2,0xff8dcc,.55).setDepth(49).setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({targets:ring,scale:2.8,alpha:0,duration:190,ease:'Quad.Out',onComplete:()=>ring.destroy()});
    log('PHASER_FX',`STOP_BURST_R${i+1}`);
  };

  YuyuScene.prototype.bonusFx=function(){
    state.fx.bonusBursts++;
    state.fx.cameraImpulses++;
    this.cameras.main.shake(90,.0024);
    this.tweens.add({targets:[this.edgeL,this.edgeR],alpha:.16,duration:110,yoyo:true,repeat:1});
    for(let n=0;n<18;n++){
      const p=this.fxPool[this.fxCursor++%this.fxPool.length];
      const x=25+(n%9)*36,y=48+(n%3)*38;
      p.setPosition(x,y).setAlpha(.55).setScale(.8);
      this.tweens.add({targets:p,y:y-18-(n%4)*5,alpha:0,scale:1.8,duration:260+(n%5)*40,delay:(n%6)*18,ease:'Cubic.Out'});
    }
    log('PHASER_FX','BONUS_BURST');
  };

  const sub=document.querySelector('header small');
  if(sub) sub.textContent='YUYU v0.3.1 · PHASER FX LAB';
  const note=document.querySelector('.note');
  if(note) note.textContent='遊遊 v0.3.1 — Phaser 4.2.1 Tween / Camera / ADD Blend / pooled FX / glass optics。WebKit互換のFX経路で検証中。';
  log('PATCH','PHASER_FX_V0_3_1');
})();