import './style.css'

import * as THREE from 'three'
import getStarfield from './getStarfield'
import { getFresnelMat } from './getFresnelMat'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Canvas 
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Loader
const loader = new THREE.TextureLoader()

// Earth
const earthGroup = new THREE.Group()
const geometry = new THREE.IcosahedronGeometry(1, 12)
const material = new THREE.MeshStandardMaterial(
  { 
    map: loader.load('./textures/00_earthmap1k.jpg')
  }
)

const earth = new THREE.Mesh(geometry, material)
earthGroup.rotation.z = -23.4 * Math.PI / 180
earthGroup.add(earth)

scene.add(earthGroup)

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load('./textures/03_earthlights1k.jpg'),
  blending: THREE.AdditiveBlending
})
const lightsMesh = new THREE.Mesh(geometry, lightsMat)
earthGroup.add(lightsMesh)

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load('./textures/04_earthcloudmap.jpg'),
  blending: THREE.AdditiveBlending,
})
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat)
cloudsMesh.scale.setScalar(1.003)
earthGroup.add(cloudsMesh)

const fresnelMat = getFresnelMat()
const glowMesh = new THREE.Mesh(geometry, fresnelMat)
glowMesh.scale.setScalar(1.01)
earthGroup.add(glowMesh)


// Stars 
const stars = getStarfield({ numStars: 5000 })
scene.add(stars)


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

// Light
const sunLight = new THREE.DirectionalLight(0xffffff, 0.5);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingNumber = 0.03

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

  earth.rotation.y = elapsedTime * 0.1
  lightsMesh.rotation.y = elapsedTime * 0.1
  cloudsMesh.rotation.y = elapsedTime * 0.1
  glowMesh.rotation.y = elapsedTime * 0.1

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()



