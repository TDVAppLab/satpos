import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const Box = (props: JSX.IntrinsicElements["mesh"]) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
  });
  return (
    <mesh ref={ref} {...props}>
      <boxBufferGeometry />
      <meshPhysicalMaterial color="blue" />
    </mesh>
  );
};

export default function TestScreen() {
  return (
    <>
      <div style={{ height: "50vh", width: "50vw" }}>
        <Canvas
          style={{ background: "black" }}
          camera={{ position: [3, 3, 3] }}
        >
          <ambientLight intensity={0.5} />
          <Box position={[1, 1, 0]} />
          <OrbitControls enableDamping={false} attach="orbitControls" />
          <axesHelper args={[2]} />
        </Canvas>
      </div>
    </>
  );
}
