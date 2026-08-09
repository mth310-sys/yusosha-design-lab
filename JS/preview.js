/* =========================================================
   preview.js
   フレーム・寸法表描画
========================================================= */

function toPercent(value,total){
    return `${(value / total) * 100}%`;
}

function createSlotElement(slot){
    const element = document.createElement("div");

    element.className = "frame-slot";
    element.dataset.slot = slot.id;
    element.setAttribute("aria-label",slot.label);

    element.style.left = toPercent(slot.x,CONFIG.previewWidth);
    element.style.top = toPercent(slot.y,CONFIG.previewHeight);
    element.style.width = toPercent(slot.width,CONFIG.previewWidth);
    element.style.height = toPercent(slot.height,CONFIG.previewHeight);

    return element;
}

function createDimensionRows(frame){
    return frame.slots.map(function(slot){
        const opening = frame.getOpening(slot);

        return `
            <tr>
                <td title="${slot.label}">${slot.shortLabel}</td>
                <td>${slot.x}, ${slot.y}</td>
                <td>${slot.width} × ${slot.height}</td>
                <td>${opening.width} × ${opening.height}</td>
            </tr>
        `;
    }).join("");
}

function renderDimensionEditor(frame){
    UI.editor.innerHTML = `
        <h2>${frame.code} ${frame.name}</h2>
        <p class="frame-description">${frame.description}</p>

        <dl class="dimension-summary">
            <div>
                <dt>基準キャンバス</dt>
                <dd>${CONFIG.previewWidth} × ${CONFIG.previewHeight}</dd>
            </div>
            <div>
                <dt>フレーム重なり</dt>
                <dd>各辺 5px</dd>
            </div>
        </dl>

        <div class="dimension-table-wrap">
            <table class="dimension-table">
                <thead>
                    <tr>
                        <th>領域</th>
                        <th>X, Y</th>
                        <th>予約サイズ</th>
                        <th>実効開口</th>
                    </tr>
                </thead>
                <tbody>
                    ${createDimensionRows(frame)}
                </tbody>
            </table>
        </div>

        <p class="dimension-note">
            実効幅＝予約幅−左重なり−右重なり。<br>
            実効高さ＝予約高さ−上重なり−下重なり。
        </p>
    `;
}

function renderFramePreview(){
    const frame = FRAME_REGISTRY[STATE.frame.selected];

    if(!frame){
        UI.editor.textContent = "フレームを読み込めませんでした。";
        return;
    }

    const slotLayer = document.createElement("div");
    const shellLayer = document.createElement("div");

    slotLayer.className = "frame-slot-layer";
    shellLayer.className = "frame-shell-layer";

    frame.slots.forEach(function(slot){
        slotLayer.appendChild(createSlotElement(slot));
    });

    shellLayer.innerHTML = frame.buildSvg();

    UI.framePreview.className = `canvas-guide ${frame.id}-frame`;
    UI.framePreview.replaceChildren(slotLayer,shellLayer);
    UI.framePreview.setAttribute("aria-label",`${frame.code} ${frame.name}`);

    UI.frameCode.textContent = frame.code;
    UI.frameName.textContent = frame.name;

    renderDimensionEditor(frame);
}
