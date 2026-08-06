/* =========================================================
   top.js
   Top編集
========================================================= */

/* =========================================================
   01 Top描画
========================================================= */

function updateTopPreview() {
    UI.topFrame.style.height = `${STATE.top.height}px`;
}

/* =========================================================
   02 Top編集画面
========================================================= */

function showTopEditor() {
    UI.editor.innerHTML = `
        <h3>Top編集</h3>

        <label for="topHeight">
            高さ
        </label>

        <input
            type="range"
            id="topHeight"
            min="${CONFIG.topMinHeight}"
            max="${CONFIG.topMaxHeight}"
            value="${STATE.top.height}"
        >

        <span id="topValue">
            ${STATE.top.height}px
        </span>

        <label for="topSplit">
            分割数
        </label>

        <select id="topSplit">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        </select>
    `;

    const topHeight = document.getElementById("topHeight");
    const topValue = document.getElementById("topValue");
    const topSplit = document.getElementById("topSplit");

    topSplit.value = STATE.top.split;

    /* =====================================================
       03 高さ変更
    ===================================================== */

    topHeight.addEventListener("input", function () {
        STATE.top.height = Number(this.value);

        topValue.textContent = `${STATE.top.height}px`;

        updateTopPreview();
    });

    /* iPhone Safari用の補助 */
    topHeight.addEventListener("change", function () {
        STATE.top.height = Number(this.value);

        topValue.textContent = `${STATE.top.height}px`;

        updateTopPreview();
    });

    /* =====================================================
       04 分割数変更
    ===================================================== */

    topSplit.addEventListener("change", function () {
        STATE.top.split = Number(this.value);
    });
}