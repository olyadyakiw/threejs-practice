import { Suspense } from "react"
import { Canvas } from '@react-three/fiber'
import Loader from "../components/Loader"
import Island from "../models/Island"

const Home = () => {
  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition
    screenPosition = [0, -6.5, -43]
    let rotation = [0.1, 4.7, 0]
    if(window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9]
    } else {
      screenScale = [1, 1, 1]
    }
    return [screenScale, screenPosition, rotation]
  }
  const [islandScale, islandPosition, rotation] = adjustIslandForScreenSize()
  return (
    <section className="w-full h-screen relative">
        {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-start justify-center">
            Popup
        </div> */}
        <Canvas 
            className="w-full h-screen bg-transparent"
            camera={ { near: 0.1, far: 100,  } }
        >
            <Suspense fallback={ <Loader /> }>
              <directionalLight />
              <ambientLight />
              <pointLight />
              <spotLight />
              <hemisphereLight />

              <Island 
                position={ islandPosition }
                scale={ islandScale }
                rotation={ rotation }
              />
            </Suspense>
        </Canvas>
    </section>
  )
}

export default Home