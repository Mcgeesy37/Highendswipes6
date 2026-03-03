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
NETWORK NODES
====================== */

const nodes = []

const nodeGeometry = new THREE.SphereGeometry(0.06,12,12)

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
opacity:0.45
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
DATA FLOW PARTICLES
====================== */

const flowGeometry = new THREE.BufferGeometry()

const flowMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:0.015
})

const flowPositions = new Float32Array(300*3)

for(let i=0;i<300;i++){

flowPositions[i*3]=(Math.random()-0.5)*8
flowPositions[i*3+1]=(Math.random()-0.5)*8
flowPositions[i*3+2]=(Math.random()-0.5)*8

}

flowGeometry.setAttribute(
"position",
new THREE.BufferAttribute(flowPositions,3)
)

const flows = new THREE.Points(
flowGeometry,
flowMaterial
)

scene.add(flows)



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

globe.rotation.y += 0.002
globe.rotation.x += 0.0002

glow.rotation.y += 0.001

flows.rotation.y += 0.0005

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
