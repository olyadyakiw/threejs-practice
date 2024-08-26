import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Canvas 
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Models
const gltfLoader = new GLTFLoader()

let model

gltfLoader.load(
    './GigantRoad.glb',
    (gltf) => {
        gltf.scene.position.z = 1
        model = gltf.scene
        scene.add(gltf.scene)
    }
)

// Floor 
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(2,0.1,4),
  new THREE.MeshBasicMaterial({ color: 0x000f45 })
)
floor.position.y = -0.61

scene.add(floor)

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

  // model.position = elapsedTime

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()



