import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Canvas 
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Geometries
const torus = new THREE.Mesh(
  new THREE.TorusKnotGeometry(),
  new THREE.MeshNormalMaterial()
)
torus.scale.set(0.2, 0.2, 0.2)
torus.position.x = -2
scene.add(torus)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshNormalMaterial()
)
sphere.scale.set(0.2, 0.2, 0.2)
sphere.position.x = 2
sphere.position.y = 1.5
scene.add(sphere)

const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshNormalMaterial()
)
sphere1.scale.set(0.2, 0.2, 0.2)
sphere1.position.x = -2
sphere1.position.y = - 1.5
scene.add(sphere1)

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
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight( 0x00ffff, 10 );
scene.add( directionalLight );

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animation
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  torus.position.x = Math.sin(elapsedTime) * 2
  sphere.position.y = Math.sin(elapsedTime)
  sphere1.position.y = - Math.sin(elapsedTime)

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()



