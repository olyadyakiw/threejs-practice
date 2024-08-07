import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const textureLoader = new THREE.TextureLoader()

const floorNormalTexture = textureLoader.load('./textures/tiles/Portuguese_Tiles_006_normal.png')
const floorColorTexture = textureLoader.load('./textures/tiles/Portuguese_Tiles_006_basecolor.png')
const floorHeightTexture = textureLoader.load('./textures/tiles/Portuguese_Tiles_006_height.png')
const floorAOTexture = textureLoader.load('./textures/tiles/Portuguese_Tiles_006_ambientOcclusion.png')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

// Torus texture
const stoneAOTexture = textureLoader.load("./textures/stone/Poliigon_StoneQuartzite_8060_AmbientOcclusion.jpg")
const stoneColorTexture = textureLoader.load("./textures/stone/Poliigon_StoneQuartzite_8060_BaseColor.jpg")
const stoneMetalicTexture = textureLoader.load("./textures/stone/Poliigon_StoneQuartzite_8060_Metallic.jpg")
const stoneNormalTexture = textureLoader.load("./textures/stone/Poliigon_StoneQuartzite_8060_Normal.jpg")
const stoneRoughnessTexture = textureLoader.load("./textures/stone/Poliigon_StoneQuartzite_8060_Roughness.jpg")

stoneColorTexture.colorSpace = THREE.SRGBColorSpace

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

const torus = new THREE.Mesh(
  new THREE.TorusKnotGeometry(),
  new THREE.MeshStandardMaterial({
    map: stoneColorTexture,
    aoMap: stoneAOTexture,
    metalnessMap: stoneMetalicTexture,
    normalMap: stoneNormalTexture,
    roughnessMap: stoneRoughnessTexture
  })
)
torus.scale.set( 0.2, 0.2, 0.2 )
torus.castShadow = true
scene.add(torus)

const floor = new THREE.Mesh(
  new THREE.BoxGeometry( 1.5, 0.05, 1.5 ),
  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    aoMap: floorAOTexture,
    height: floorHeightTexture,
    normalMap: floorNormalTexture
  })
)
floor.position.y = - 0.5
floor.receiveShadow = true
scene.add(floor)

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

// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 2
scene.add(camera)

// Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.y = 2
directionalLight.position.x = Math.PI * 0.5
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  torus.rotation.y = elapsedTime


  // Controls update
  controls.update()  
  
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()

