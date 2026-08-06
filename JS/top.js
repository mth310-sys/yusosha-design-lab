/* =========================================================
   top.js
   Top編集
========================================================= */

function showTopEditor() {

    UI.editor.innerHTML = `
        <h3>Top編集</h3>

        <label>

            高さ

            <input
                type="range"
                id="topHeight"
                min="${CONFIG.topMinHeight}"
                max="${CONFIG.topMaxHeight}"
                value="${STATE.top.height}"
            >

        </label>

        <span id="topValue">${STATE.top.height}px</span>

    `;

    const topHeight = document.getElementById("topHeight");
    const topValue = document.getElementById("topValue");

    topHeight.addEventListener("input", () => {

        STATE.top.height = Number(topHeight.value);

        UI.topFrame.style.height =
            STATE.top.height + "px";

        topValue.textContent =
            STATE.top.height + "px";

    });

}