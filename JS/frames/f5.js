/* F5 ダーク・アルカナ アーマーフレーム */
(function registerF5Frame(){
 const overlap={top:5,right:5,bottom:5,left:5};
 const slots=[
  {id:"main-display",shortLabel:"メイン",label:"大型魔導液晶",x:48,y:72,width:294,height:178,overlap:{...overlap}},
  {id:"message",shortLabel:"メッセージ",label:"魔導情報帯",x:57,y:260,width:276,height:34,overlap:{...overlap}},
  {id:"reels",shortLabel:"リール",label:"リール左・中・右",x:78,y:304,width:234,height:92,overlap:{...overlap}},
  {id:"bet-info",shortLabel:"BET列",label:"START・MAX BET・情報表示",x:55,y:407,width:280,height:30,overlap:{...overlap}},
  {id:"start-stop",shortLabel:"START列",label:"STOP左・中・右・操作部",x:70,y:447,width:250,height:42,overlap:{...overlap}},
  {id:"lower-panel",shortLabel:"下パネル",label:"七紋章ビジュアルパネル",x:48,y:503,width:294,height:82,overlap:{...overlap}}
 ];
 function getOpening(s){return{x:s.x+5,y:s.y+5,width:s.width-10,height:s.height-10};}
 function rect(r){return`M ${r.x} ${r.y} H ${r.x+r.width} V ${r.y+r.height} H ${r.x} Z`;}
 function ring(s,i){const o=getOpening(s),r={x:s.x+i,y:s.y+i,width:s.width-i*2,height:s.height-i*2};return`${rect(r)} ${rect(o)}`;}
 function buildSvg(){
  const cuts=slots.map(s=>{const o=getOpening(s);return`<rect x="${o.x}" y="${o.y}" width="${o.width}" height="${o.height}" rx="${s.id==='main-display'?5:2}" fill="#000"/>`;}).join('');
  const bezels=slots.map(s=>`<path d="${ring(s,0)}" fill="url(#f5BlackChrome)" fill-rule="evenodd"/><path d="${ring(s,2)}" fill="#4c176b" fill-rule="evenodd" opacity=".7"/>`).join('');
  return`<svg class="frame-shell f5-shell" viewBox="0 0 390 600" preserveAspectRatio="none" aria-hidden="true">
  <defs>
   <linearGradient id="f5Armor" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020104"/><stop offset=".18" stop-color="#32203d"/><stop offset=".35" stop-color="#07050a"/><stop offset=".55" stop-color="#211229"/><stop offset=".75" stop-color="#050306"/><stop offset="1" stop-color="#42234d"/></linearGradient>
   <linearGradient id="f5BlackChrome" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#08070a"/><stop offset=".16" stop-color="#716378"/><stop offset=".28" stop-color="#171219"/><stop offset=".48" stop-color="#a38aa8"/><stop offset=".6" stop-color="#0a080c"/><stop offset=".82" stop-color="#5a3b62"/><stop offset="1" stop-color="#050406"/></linearGradient>
   <radialGradient id="f5Purple"><stop stop-color="#f3dcff"/><stop offset=".2" stop-color="#d06cff"/><stop offset=".55" stop-color="#7d20c5"/><stop offset="1" stop-color="#26013e"/></radialGradient>
   <filter id="f5Glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <mask id="f5Cuts"><rect width="390" height="600" fill="#fff"/>${cuts}</mask>
  </defs>
  <!-- 艶黒の一体装甲 -->
  <path d="M 20 7 H 370 L 389 31 V 574 L 370 598 H 20 L 1 574 V 31 Z" fill="url(#f5Armor)" mask="url(#f5Cuts)"/>
  <!-- 上部ゴシック冠と左右円形ユニット -->
  <path d="M 54 8 Q 100 2 137 27 L 164 12 L 195 32 L 226 12 L 253 27 Q 290 2 336 8 L 354 52 L 322 70 H 68 L 36 52 Z" fill="url(#f5BlackChrome)" stroke="#4f1a68" stroke-width="2"/>
  <circle cx="48" cy="48" r="34" fill="#08070a" stroke="#6c2b91" stroke-width="5"/><circle cx="48" cy="48" r="22" fill="#161019" stroke="#9e51c9" stroke-width="2"/>
  <circle cx="342" cy="48" r="34" fill="#08070a" stroke="#6c2b91" stroke-width="5"/><circle cx="342" cy="48" r="22" fill="#161019" stroke="#9e51c9" stroke-width="2"/>
  <polygon points="195,4 209,22 195,39 181,22" fill="url(#f5Purple)" class="f5-crystal" filter="url(#f5Glow)"/>
  <!-- 段差連結型サイドアーマー -->
  <path d="M 11 77 L 46 60 L 57 91 L 48 158 L 60 217 L 47 278 L 61 339 L 48 401 L 62 459 L 48 516 L 62 580 L 25 596 L 7 567 L 18 505 L 6 445 L 18 385 L 5 324 L 18 264 L 6 202 L 18 143 Z" fill="url(#f5BlackChrome)" stroke="#5e2677" stroke-width="2"/>
  <path d="M 379 77 L 344 60 L 333 91 L 342 158 L 330 217 L 343 278 L 329 339 L 342 401 L 328 459 L 342 516 L 328 580 L 365 596 L 383 567 L 372 505 L 384 445 L 372 385 L 385 324 L 372 264 L 384 202 L 372 143 Z" fill="url(#f5BlackChrome)" stroke="#5e2677" stroke-width="2"/>
  <!-- 縦クリスタル魔力レール -->
  <path d="M 31 88 L 42 104 L 34 151 L 44 207 L 34 263 L 45 320 L 34 379 L 46 437 L 35 495 L 43 554" fill="none" stroke="#a747e8" stroke-width="7" class="f5-mana" filter="url(#f5Glow)"/>
  <path d="M 359 88 L 348 104 L 356 151 L 346 207 L 356 263 L 345 320 L 356 379 L 344 437 L 355 495 L 347 554" fill="none" stroke="#a747e8" stroke-width="7" class="f5-mana" filter="url(#f5Glow)"/>
  <!-- 羽根・葉状の彫刻 -->
  <g fill="none" stroke="#8d7194" stroke-width="2" opacity=".8"><path d="M 18 102 Q 55 119 20 151 Q 57 169 20 202 Q 58 220 20 253 M 19 340 Q 57 358 20 390 Q 58 409 21 441 Q 58 459 22 491"/><path d="M 372 102 Q 335 119 370 151 Q 333 169 370 202 Q 332 220 370 253 M 371 340 Q 333 358 370 390 Q 332 409 369 441 Q 332 459 368 491"/></g>
  <!-- 操作部を前方へ張り出す腰装甲 -->
  <path d="M 43 397 L 347 397 L 365 430 L 346 495 L 316 503 H 74 L 44 495 L 25 430 Z" fill="url(#f5Armor)" stroke="#6b347e" stroke-width="2" opacity=".95"/>
  <circle cx="47" cy="454" r="17" fill="#08060a" stroke="#86509a" stroke-width="3"/><circle cx="343" cy="454" r="17" fill="#08060a" stroke="#86509a" stroke-width="3"/>
  <!-- 下部祭壇装甲 -->
  <path d="M 18 500 L 48 487 L 62 581 L 151 577 L 195 598 L 239 577 L 328 581 L 342 487 L 372 500 L 383 575 L 368 598 H 22 L 7 575 Z" fill="url(#f5BlackChrome)" opacity=".9"/>
  <polygon points="195,565 210,581 195,597 180,581" fill="url(#f5Purple)" class="f5-crystal" filter="url(#f5Glow)"/>
  ${bezels}
  <!-- 細い紫エッジ -->
  <path d="M 22 8 H 368 L 386 32 V 572 L 367 596 H 23 L 4 572 V 32 Z" fill="none" stroke="#8d3db5" stroke-width="2" opacity=".75"/>
  </svg>`;
 }
 FRAME_REGISTRY.f5={id:"f5",code:"F5",name:"ダーク・アルカナ アーマーフレーム",description:"艶黒の魔導装甲へ紫の魔晶石と発光レールを埋め込み、ゴシック彫刻・円形上部ユニット・張り出した操作コンソール・祭壇状ベースを段差連結したダークファンタジーフレーム。",slots,getOpening,buildSvg};
})();
