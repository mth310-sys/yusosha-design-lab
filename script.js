const tabs = document.querySelectorAll(".tab");
const editor = document.getElementById("editor");
const topFrame = document.getElementById("top-frame");

let topHeightValue = 80;

function showTopEditor() {
    editor.innerHTML = `
        <h3>Top編集</h3>

        <label>
            高さ

            <input
                type="range"
                id="topHeight"
                min="40"
                max="180"
                value="${topHeightValue}"
            >
        </label>

        <span id="topValue">${topHeightValue}px</span>
    `;

    const topHeight = document.getElementById("topHeight");
    const topValue = document.getElementById("topValue");

    topHeight.addEventListener("input", () => {
        topHeightValue = Number(topHeight.value);
        topFrame.style.height = `${topHeightValue}px`;
        topValue.textContent = `${topHeightValue}px`;
    });
}

function showPlaceholderEditor(name) {
    editor.innerHTML = `<h3>${name}編集</h3>`;
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(button => button.classList.remove("active"));
        tab.classList.add("active");

        const name = tab.dataset.tab;

        if (name === "top") {
            showTopEditor();
        }

        if (name === "side") {
            showPlaceholderEditor("Side");
        }

        if (name === "base") {
            showPlaceholderEditor("Base");
        }
    });
});

topFrame.style.height = `${topHeightValue}px`;
showTopEditor();