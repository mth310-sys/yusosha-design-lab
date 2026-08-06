/* =========================================================
   ui.js
========================================================= */

const UI = {

    topFrame :
        document.getElementById("top-frame"),

    editor :
        document.getElementById("editor"),

    tabs :
        document.querySelectorAll(".tab")

};

UI.tabs.forEach(tab=>{

    tab.addEventListener("click",()=>{

        UI.tabs.forEach(button=>
            button.classList.remove("active")
        );

        tab.classList.add("active");

        switch(tab.dataset.tab){

            case "top":
                showTopEditor();
                break;

            case "side":
                UI.editor.innerHTML="<h3>Side編集</h3>";
                break;

            case "base":
                UI.editor.innerHTML="<h3>Base編集</h3>";
                break;

        }

    });

});