const year = document.getElementById("year")

if(year){
year.textContent = new Date().getFullYear()
}


/* =====================
PARALLAX SCROLL
===================== */

window.addEventListener("scroll",()=>{

const y = window.scrollY

document.querySelector(".marble").style.transform =
`translateY(${y*0.05}px)`

document.querySelector(".particles").style.transform =
`translateY(${y*0.2}px)`

})
