import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Cubes
const material =  new THREE.MeshNormalMaterial()
const geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25)
let cubes = []

const gridSize = 4  
let initialSpacing = 0.3

for(let x = 0; x < gridSize; x++) {
  for(let y = 0; y < gridSize; y++) {
    for(let z = 0; z < gridSize; z++) {
      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(
        (x - gridSize / 2) * initialSpacing,
        (y - gridSize / 2) * initialSpacing,
        (z - gridSize / 2) * initialSpacing
      )
      scene.add(cube)
      cubes.push(cube)
    }
  }
}


// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Resize
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

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

// Renderer
const renderer = new THREE.WebGLRenderer(
  { canvas: canvas }
)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animation
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  let spacing = initialSpacing + Math.sin(elapsedTime) * 0.3

  let index = 0
  for(let x = 0; x < gridSize; x++) {
    for(let y = 0; y < gridSize; y++) {
      for(let z = 0; z < gridSize; z++) {
        const cube = cubes[index++]
        cube.position.set(
          (x - gridSize / 2) * spacing,
          (y - gridSize / 2) * spacing,
          (z - gridSize / 2) * spacing
        )
      }
    }
  }

  cubes.forEach((cube, index) => {
    cube.rotation.x = elapsedTime
    cube.rotation.y = elapsedTime
    cube.rotation.z = elapsedTime
  })

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()