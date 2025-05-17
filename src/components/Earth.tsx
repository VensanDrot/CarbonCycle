import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Earth = () => {
  const earthTexture = useLoader(TextureLoader, "/img/8k_earth_daymap.jpg");

  return (
    <mesh>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

export default Earth;
