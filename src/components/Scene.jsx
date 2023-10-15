import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { Suspense } from 'react';

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

const Scene = (props) => {
  if (!props.model) {
    return <h1>NO MODEL</h1>;
  }
  const modelURL = `${API_URL}${props.model}`;
  console.log(`${API_URL}${props.model}`);

  const { scene } = useGLTF(modelURL);

  return (
    
    <Canvas camera={{ position: [0.5, 0, 4], fov: 45 }}>
      <Environment files="/christmas_photo_studio_06_1k.hdr" background={true} />

      <mesh position={[0, 0, 0]}>
        <primitive object={scene} />
      </mesh>

      <OrbitControls
        maxDistance={7}
        minDistance={2}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={(5 * Math.PI) / 6}
        enablePan={false}
      />
    </Canvas>
  );
};

export default Scene;
