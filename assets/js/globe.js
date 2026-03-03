const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({
alpha:true
})

renderer.setSize(
window.innerWidth,
window.innerHeight
)

document.getElementById("globe")
.appendChild(renderer.domElement)

camera.position.z = 10


/* GLOBE */

const geometry = new THREE.SphereGeometry(5,64,64)

const material = new THREE.MeshBasicMaterial({

color:0xc6a76a,
wireframe:true,
transparent:true,
opacity:0.25

})

const globe = new THREE.Mesh(
geometry,
material
)

scene.add(globe)


/* NETWORK POINTS */

const pointsGeometry = new THREE.BufferGeometry()

const pointsCount = 400

const positions = new Float32Array(pointsCount*3)

for(let i=0;i<pointsCount;i++){

positions[i*3] = (Math.random()-0.5)*12
positions[i*3+1] = (Math.random()-0.5)*12
positions[i*3+2] = (Math.random()-0.5)*12

}

pointsGeometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
)

const pointsMaterial = new THREE.PointsMaterial({

color:0xc6a76a,
size:0.03

})

const points = new THREE.Points(
pointsGeometry,
pointsMaterial
)

scene.add(points)


function animate(){

requestAnimationFrame(animate)

globe.rotation.y += 0.0015

points.rotation.y += 0.0008

renderer.render(scene,camera)

}

animate()
