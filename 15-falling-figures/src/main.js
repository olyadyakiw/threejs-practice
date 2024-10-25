import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import * as CANNON from 'cannon-es'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Ground
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshBasicMaterial({
        color: 0xfffff,
        side: THREE.DoubleSide,
        wireframe: true,
    })
)
scene.add(ground)

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    new THREE.MeshNormalMaterial()
)
scene.add(cube)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 16),
    new THREE.MeshNormalMaterial()
)
scene.add(sphere)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
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
const camera = new THREE.PerspectiveCamera(
    55,
    sizes.width / sizes.height,
    0.1,
    100
)
camera.position.z = 30
camera.position.y = 15
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.enableDamping = true

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Psycics
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0),
})

// Ground
const groundPsysic = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
    type: CANNON.Body.STATIC,
})
world.addBody(groundPsysic)
groundPsysic.quaternion.setFromEuler(-Math.PI / 2, 0, 0)

// Cube
const cubePhysic = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2)),
    mass: 0.01,
    position: new CANNON.Vec3(1, 20, 0),
})
world.addBody(cubePhysic)
cubePhysic.angularDamping = 0.1
cubePhysic.angularVelocity.set(0, 1, 0)

// Sphere
const spherePhysics = new CANNON.Body({
    shape: new CANNON.Sphere(3),
    mass: 0.01,
    position: new CANNON.Vec3(0, 10, 0),
})
world.addBody(spherePhysics)

spherePhysics.linearDamping = 0.33

// Animation
const clock = new THREE.Clock()

const animation = () => {
    const elapsedTime = clock.getElapsedTime()

    // World
    world.step(elapsedTime * 0.02)

    ground.position.copy(groundPsysic.position)
    ground.quaternion.copy(groundPsysic.quaternion)

    cube.position.copy(cubePhysic.position)
    cube.quaternion.copy(cubePhysic.quaternion)

    sphere.position.copy(spherePhysics.position)
    sphere.quaternion.copy(spherePhysics.quaternion)

    // Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()
