/* =========================================================
   frames/f3.js
   F3 クローム・ゴールド ジュエルフレーム
========================================================= */

(function registerF3Frame(){
    const overlap = {top:5,right:5,bottom:5,left:5};
    const slots = [
        {id:"main-display",shortLabel:"メイン",label:"メインディスプレイ",x:58,y:48,width:274,height:172,overlap:{...overlap}},
        {id:"reels",shortLabel:"リール",label:"リール左・中・右",x:82,y:234,width:226,height:92,overlap:{...overlap}},
        {id:"message",shortLabel:"メッセージ",label:"メッセージ表示枠",x:82,y:336,width:226,height:30,overlap:{...overlap}},
        {id:"bet-info",shortLabel:"BET列",label:"BET・MAX BET・情報表示",x:66,y:378,width:258,height:30,overlap:{...overlap}},
        {id:"start-stop",shortLabel:"START列",label:"START・STOP左・中・右",x:66,y:418,width:258,height:40,overlap:{...overlap}},
        {id:"lower-panel",shortLabel:"下パネル",label:"下パネル",x:58,y:470,width:274,height:105,overlap:{...overlap}}
    ];

    function getOpening(slot){
        return {x:slot.x+5,y:slot.y+5,width:slot.width-10,height:slot.height-10};
    }
    function rectanglePath(r){
        return `M ${r.x} ${r.y} H ${r.x+r.width} V ${r.y+r.height} H ${r.x} Z`;
    }
    function ringPath(slot,inset){
        const opening=getOpening(slot);
        const outer={x:slot.x+inset,y:slot.y+inset,width:slot.width-inset*2,height:slot.height-inset*2};
        return `${rectanglePath(outer)} ${rectanglePath(opening)}`;
    }

    function buildSvg(){
        const cutouts=slots.map(function(slot){
            const o=getOpening(slot);
            return `<rect x="${o.x}" y="${o.y}" width="${o.width}" height="${o.height}" rx="2" fill="#000"/>`;
        }).join("");
        const bezels=slots.map(function(slot){
            const o=getOpening(slot);
            return `<path d="${ringPath(slot,0)}" fill="url(#f3Chrome)" fill-rule="evenodd"/><rect x="${o.x+.5}" y="${o.y+.5}" width="${o.width-1}" height="${o.height-1}" rx="1.5" fill="none" stroke="#111"/>`;
        }).join("");

        const leftJewels=[
            "18,72 39,55 53,70 47,112 25,121 13,103",
            "14,143 39,127 51,144 48,188 25,198 11,177",
            "12,220 37,205 51,225 48,267 24,278 9,257",
            "11,300 35,286 49,306 48,349 23,359 8,338",
            "12,382 37,368 51,389 49,431 25,442 9,420",
            "16,466 40,451 53,472 48,518 25,528 12,505"
        ];
        const jewelPolys=leftJewels.map(function(points,i){
            const mirrored=points.split(" ").map(function(pair){
                const p=pair.split(","); return `${390-Number(p[0])},${p[1]}`;
            }).join(" ");
            return `<polygon points="${points}" fill="url(#f3Gold)" class="f3-jewel${i%2?' f3-jewel-delay':''}" filter="url(#f3Glow)"/><polygon points="${mirrored}" fill="url(#f3Gold)" class="f3-jewel${i%2?'':' f3-jewel-delay'}" filter="url(#f3Glow)"/>`;
        }).join("");

        return `<svg class="frame-shell f3-shell" viewBox="0 0 390 600" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="f3Black" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#050505"/><stop offset=".5" stop-color="#242424"/><stop offset="1" stop-color="#030303"/></linearGradient>
          <linearGradient id="f3Chrome" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#454545"/><stop offset=".16" stop-color="#f8f8f8"/><stop offset=".32" stop-color="#777"/><stop offset=".52" stop-color="#fff"/><stop offset=".7" stop-color="#555"/><stop offset=".88" stop-color="#e8e8e8"/><stop offset="1" stop-color="#3c3c3c"/></linearGradient>
          <linearGradient id="f3Gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff4a8"/><stop offset=".2" stop-color="#ffdf42"/><stop offset=".48" stop-color="#b66b00"/><stop offset=".7" stop-color="#fff06a"/><stop offset="1" stop-color="#d58b00"/></linearGradient>
          <filter id="f3Glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <mask id="f3Cutouts"><rect width="390" height="600" fill="#fff"/>${cutouts}</mask>
        </defs>

        <path d="M 22 4 H 368 L 389 35 V 565 L 365 598 H 25 L 1 565 V 35 Z" fill="url(#f3Black)" mask="url(#f3Cutouts)"/>

        <!-- 極太クローム外装：上下が張り出し中央を軽く絞る -->
        <path d="M 3 35 L 38 10 L 63 31 L 56 120 L 48 205 L 51 300 L 48 390 L 55 474 L 63 564 L 37 590 L 3 565 L 12 475 L 7 390 L 11 300 L 7 210 L 12 120 Z" fill="url(#f3Chrome)"/>
        <path d="M 387 35 L 352 10 L 327 31 L 334 120 L 342 205 L 339 300 L 342 390 L 335 474 L 327 564 L 353 590 L 387 565 L 378 475 L 383 390 L 379 300 L 383 210 L 378 120 Z" fill="url(#f3Chrome)"/>

        <!-- 斜めフィン／筋彫り -->
        <g fill="#171717" stroke="#f1f1f1" stroke-width="1" opacity=".88">
          <path d="M 5 48 L 54 17 L 45 43 L 9 67 Z M 8 126 L 54 91 L 48 119 L 7 148 Z M 7 205 L 49 174 L 47 199 L 8 228 Z M 8 285 L 48 258 L 48 282 L 9 307 Z M 8 366 L 49 339 L 48 364 L 8 389 Z M 8 447 L 52 418 L 50 444 L 9 470 Z M 7 533 L 58 501 L 61 527 L 11 555 Z"/>
          <path d="M 385 48 L 336 17 L 345 43 L 381 67 Z M 382 126 L 336 91 L 342 119 L 383 148 Z M 383 205 L 341 174 L 343 199 L 382 228 Z M 382 285 L 342 258 L 342 282 L 381 307 Z M 382 366 L 341 339 L 342 364 L 382 389 Z M 382 447 L 338 418 L 340 444 L 381 470 Z M 383 533 L 332 501 L 329 527 L 379 555 Z"/>
        </g>

        ${jewelPolys}

        <!-- 上部王冠・放射フィン -->
        <g fill="url(#f3Chrome)" stroke="#4a4a4a" stroke-width="1">
          <path d="M 68 35 L 129 5 L 151 35 Z"/><path d="M 116 35 L 165 1 L 177 35 Z"/><path d="M 154 35 L 195 0 L 236 35 Z"/><path d="M 213 35 L 225 1 L 274 35 Z"/><path d="M 239 35 L 261 5 L 322 35 Z"/>
        </g>
        <polygon points="164,8 195,1 226,8 214,34 176,34" fill="url(#f3Gold)" class="f3-jewel" filter="url(#f3Glow)"/>

        <!-- 下部中央ジュエルと収束フィン -->
        <g fill="url(#f3Chrome)" stroke="#4a4a4a"><path d="M 48 582 L 132 552 L 157 582 Z"/><path d="M 342 582 L 258 552 L 233 582 Z"/></g>
        <polygon points="145,568 171,546 219,546 245,568 224,594 166,594" fill="url(#f3Gold)" class="f3-jewel f3-jewel-delay" filter="url(#f3Glow)"/>

        ${bezels}
        <path d="M 26 4 H 364 L 386 34 V 566 L 362 596 H 28 L 4 566 V 34 Z" fill="none" stroke="url(#f3Chrome)" stroke-width="4"/>
        </svg>`;
    }

    FRAME_REGISTRY.f3={
        id:"f3",code:"F3",name:"クローム・ゴールド ジュエルフレーム",
        description:"彫りの深い鏡面クローム装甲と、独立した黄金クリスタル発光ブロックを全周に連結した左右対称のセグメント型メカニカル・ジュエルフレーム。上下が張り出し、中央はわずかに絞られる独自骨格。",
        slots:slots,getOpening:getOpening,buildSvg:buildSvg
    };
})();
