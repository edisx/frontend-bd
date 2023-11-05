import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { useSelector } from "react-redux";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

const Scene = (props) => {
  const colors = useSelector((state) => state.colors);

  if (!props.model) {
    return <h1>NO MODEL</h1>;
  }
  const modelURL = `${API_URL}${props.model}`;

  const { scene } = useGLTF(modelURL);


  scene.traverse((child) => {
    if (child.isMesh) {
      const mesh_name = child.name;
      const mesh_id = props.meshes.find((mesh) => mesh.name === mesh_name)?.id;

      if (mesh_id !== undefined) {
        const colorEntry = colors.find((color) => color.meshId === mesh_id);

        if (colorEntry) {
          const color = colorEntry.color.hex_code;

          child.material = new MeshStandardMaterial({
            color: color,
          });
        }
      }
    }
  });

  return (
    <Canvas camera={{ position: [0.5, 0, 4], fov: 45 }}>
      <Environment
        files="/christmas_photo_studio_06_1k.hdr"
        background={true}
      />

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
