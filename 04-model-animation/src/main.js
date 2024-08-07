import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'

const fbxLoader = new FBXLoader()

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

let modelMixer = null

// Model
let modelScale = 0.01
fbxLoader.load('./models/model-jumping-down.fbx', (model) => {
    model.position.y = -1
    model.scale.setScalar(modelScale)

    if (model.animations.length > 0) {
        modelMixer = new THREE.AnimationMixer(model)
        const animation1 = modelMixer.clipAction(model.animations[0])
        animation1.play()
    }
    
    scene.add(model)
})

// Cube
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.3, 2),
    new THREE.MeshStandardMaterial({ color: 'red' })
)
cube.position.y = - 0.55
cube.position.z = - 0.8
scene.add(cube)

// Cube 2

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.3, 2),
    new THREE.MeshStandardMaterial({ color: 'yellow' })
)
cube2.position.y = - 1.2
cube2.position.z = 2
scene.add(cube2)

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
camera.position.z = 4
scene.add(camera)

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.enableDamping = true

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.render(scene, camera)

// Animation
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

     // Update mixer
    if(modelMixer !== null) {
        modelMixer.update(deltaTime)
    }

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()


