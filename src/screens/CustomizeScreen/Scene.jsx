import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF } from "@react-three/drei";
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

          const newMaterial = child.material.clone();
          newMaterial.color.set(color);
          child.material = newMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    }
  });

  return (
    <Canvas camera={{ position: [0, 2.3, 4], fov: 45 }} shadows>
      <Environment
        files="/christmas_photo_studio_06_1k.hdr"
        background={false}
      />

      <ContactShadows
        scale={15}
        position={[0, -0.1, 0]}
        opacity={0.5}
      />

      <mesh
        position={[-0.66, 0, 0]}
        scale={1.5}
        rotation={[(Math.PI / 180) * 10, 0, 0]}
        castShadow
      >
        <primitive object={scene} />
      </mesh>

      <mesh
        position={[0.66, 0, 0]}
        scale={[-1.5, 1.5, 1.5]}
        rotation={[(Math.PI / 180) * 10, 0, 0]}
        castShadow
      >
        <primitive object={scene.clone()} />
      </mesh>

      {/* <mesh position={[0, -0.1, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[100]} />
        <meshStandardMaterial color={"white"} />
      </mesh> */}

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
