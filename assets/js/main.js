const year = document.getElementById("year")

if(year){
year.textContent = new Date().getFullYear()
}


/* ===============================
CURSOR GLOW
=============================== */

const cursor = document.createElement("div")
cursor.classList.add("cursor")

document.body.appendChild(cursor)

document.addEventListener("mousemove",(e)=>{

cursor.style.left = e.clientX + "px"
cursor.style.top = e.clientY + "px"

})


/* ===============================
CARD LIGHT FOLLOW
=============================== */

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

card.style.setProperty("--x",x+"px")
card.style.setProperty("--y",y+"px")

})

})


/* ===============================
PARALLAX SCROLL
=============================== */

window.addEventListener("scroll",()=>{

const y = window.scrollY

document.querySelector(".marble").style.transform =
`translateY(${y*0.05}px)`

document.querySelector(".particles").style.transform =
`translateY(${y*0.15}px)`

const hero = document.querySelector(".hero")

if(hero){

hero.style.transform =
`translateY(${y*0.1}px)`

}

})


/* ===============================
3D MOUSE PARALLAX
=============================== */

document.addEventListener("mousemove",(e)=>{

const x = (e.clientX/window.innerWidth)-0.5
const y = (e.clientY/window.innerHeight)-0.5

document.querySelector(".hero").style.transform =
`rotateY(${x*6}deg) rotateX(${y*-6}deg)`

})
