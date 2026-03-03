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

camera.position.z = 10


function animate(){

requestAnimationFrame(animate)

globe.rotation.y += 0.002
globe.rotation.x += 0.0005

renderer.render(scene,camera)

}

animate()
