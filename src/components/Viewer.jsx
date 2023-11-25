import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

const Viewer = (props) => {
  if (!props.model) {
    return <h1>NO MODEL</h1>;
  }
  const modelURL = `${props.model}`;

  const { scene } = useGLTF(modelURL);

  return (
    <Canvas camera={{ position: [0, 2.3, 4], fov: 45 }}>
      <Environment
        files="/christmas_photo_studio_06_1k.hdr"
        background={false}
      />

      <ContactShadows scale={15} position={[0, -0.4, 0]} opacity={0.5} />

      <mesh position={[0, -0.3, 0]} scale={[1.5, 1.5, 1.5]} rotation={[0, 100, 0]}>
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

export default Viewer;
