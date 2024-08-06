import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'

import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Cube
// Material 
const matetial = new THREE.MeshNormalMaterial()
const geometry = new THREE.BoxGeometry(1, 1, 1)
let cube;

let count = 12
let cubes = []

for(let i = 0; i < count; i++) {
  cube = new THREE.Mesh(geometry, matetial)
  
  const angle = (i / count) * Math.PI * 2
  cube.position.x = Math.cos(angle) * 5
  cube.position.y = Math.sin(angle) * 5
  cube.position.z = 0

  scene.add(cube)
  cubes.push(cube)

}


// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 5
scene.add(camera)

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  let radius = 1.5

  let angle;

  cubes.forEach((cube, index) => {
    angle = (index / count) * Math.PI * 2 + (elapsedTime * 0.5)
    cube.position.x = (Math.cos(angle) * radius)
    cube.position.y = (Math.sin(angle) * radius)
    cube.rotation.z = elapsedTime * 0.5
  })

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()