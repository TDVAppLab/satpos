import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const SimpleEarthPlot = () => {
  const gltf = useLoader(GLTFLoader, './EarthHologram.gltf')
  return <primitive object={gltf.scene} />
}

export default SimpleEarthPlot;