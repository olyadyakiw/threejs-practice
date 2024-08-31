import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import spline from './spline.js'

// Canvas 
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x000000, 0.3)

// Points geometry
const points = spline.getPoints(100)
const geometry = new THREE.BufferGeometry().setFromPoints(points)
const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
const line = new THREE.Mesh(geometry, material)
// scene.add(line)

// Tube geometry
const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true)
const tubeMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  // side: THREE.DoubleSide,
  wireframe: true
})
const tube = new THREE.Mesh(tubeGeo, tubeMat)
// scene.add(tube)

const edges = new THREE.EdgesGeometry(tubeGeo, 0.2)
const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff })
const tubeLines = new THREE.LineSegments(edges, lineMat)
scene.add(tubeLines)


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

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

function updateCamera(t) {
  const time = t * 0.1;
  const looptime = 10 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

function animate(t = 0) {
  requestAnimationFrame(animate);
  updateCamera(t);
  renderer.render(scene, camera);
  controls.update();
}
animate();



