
const d = document

d.addEventListener('click', (e) =>{
    if(e.target.matches(".panel-btn") || e.target.matches(`${".panel-btn"} *`)){
        d.querySelector(".panel-btn").classList.toggle("is-active");
        d.querySelector(".nav-bar").classList.toggle("max-xl:hidden");
        //d.querySelector(".nav-bar").classList.toggle("max-xl:block");
    }
    // if(e.target.matches(menuLink)){
    //     d.querySelector(panel).classList.remove("is-active");
    //     d.querySelector(panelBtn).classList.remove("is-active");
    // }
    
})