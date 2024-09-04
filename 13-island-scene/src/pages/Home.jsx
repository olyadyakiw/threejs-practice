import { Suspense } from "react"
import { Canvas } from '@react-three/fiber'
import Loader from "../components/Loader"

const Home = () => {
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

            </Suspense>
        </Canvas>
    </section>
  )
}

export default Home