const tabs = document.querySelectorAll(".tab");
const editor = document.getElementById("editor");

tabs.forEach(tab => {

    tab.addEventListener("click",()=>{

        tabs.forEach(t=>t.classList.remove("active"));

        tab.classList.add("active");

        const name = tab.dataset.tab;

        if(name==="top"){
            editor.textContent="Top編集";
        }

        if(name==="side"){
            editor.textContent="Side編集";
        }

        if(name==="base"){
            editor.textContent="Base編集";
        }

    });

});