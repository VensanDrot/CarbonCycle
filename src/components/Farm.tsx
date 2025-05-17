import { useGLTF } from "@react-three/drei";

const FarmModel = ({
  position = [1.5, -0.88, -5.7],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) => {
  const { scene } = useGLTF("/models/farm_low_poly.glb");

  return <primitive object={scene} position={position} scale={scale} />;
};

export default FarmModel;
