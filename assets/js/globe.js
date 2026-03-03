const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setSize(
window.innerWidth,
window.innerHeight
)

document.getElementById("globe")
.appendChild(renderer.domElement)

camera.position.z = 14



/* ======================
GLOBE
====================== */

const globeGeometry = new THREE.SphereGeometry(4,64,64)

const globeMaterial = new THREE.MeshBasicMaterial({

color:0xc6a76a,
wireframe:true,
transparent:true,
opacity:0.15

})

const globe = new THREE.Mesh(
globeGeometry,
globeMaterial
)

scene.add(globe)



/* ======================
NETWORK POINTS
====================== */

const nodes = []

const nodeGeometry = new THREE.SphereGeometry(0.03,8,8)

const nodeMaterial = new THREE.MeshBasicMaterial({
color:0xc6a76a
})

for(let i=0;i<80;i++){

const node = new THREE.Mesh(nodeGeometry,nodeMaterial)

const phi = Math.acos((Math.random()*2)-1)
const theta = Math.random()*Math.PI*2

const r = 4

node.position.x = r*Math.sin(phi)*Math.cos(theta)
node.position.y = r*Math.sin(phi)*Math.sin(theta)
node.position.z = r*Math.cos(phi)

nodes.push(node)

scene.add(node)

}



/* ======================
NETWORK CONNECTIONS
====================== */

const lineMaterial = new THREE.LineBasicMaterial({
color:0xc6a76a,
transparent:true,
opacity:0.25
})

for(let i=0;i<nodes.length;i++){

for(let j=i+1;j<nodes.length;j++){

const dist = nodes[i].position.distanceTo(nodes[j].position)

if(dist < 2){

const points = []

points.push(nodes[i].position)
points.push(nodes[j].position)

const geometry = new THREE.BufferGeometry().setFromPoints(points)

const line = new THREE.Line(geometry,lineMaterial)

scene.add(line)

}

}

}



/* ======================
AMBIENT GLOW
====================== */

const glowGeometry = new THREE.SphereGeometry(4.6,32,32)

const glowMaterial = new THREE.MeshBasicMaterial({

color:0xc6a76a,
transparent:true,
opacity:0.05

})

const glow = new THREE.Mesh(glowGeometry,glowMaterial)

scene.add(glow)



/* ======================
MOUSE PARALLAX
====================== */

let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove",(e)=>{

mouseX = (e.clientX/window.innerWidth)-0.5
mouseY = (e.clientY/window.innerHeight)-0.5

})



/* ======================
ANIMATION
====================== */

function animate(){

requestAnimationFrame(animate)

globe.rotation.y += 0.0015
glow.rotation.y += 0.001

nodes.forEach(node=>{
node.rotation.y += 0.002
})

scene.rotation.y = mouseX * 0.4
scene.rotation.x = mouseY * 0.2

renderer.render(scene,camera)

}

animate()



/* ======================
RESIZE
====================== */

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(
window.innerWidth,
window.innerHeight
)

})
