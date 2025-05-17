import { useGLTF } from "@react-three/drei";

const ForestModel = ({
  position = [1.5, -0.88, -5.7],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) => {
  const { scene } = useGLTF("/models/camp_forest.glb");

  return <primitive object={scene} position={position} scale={scale} />;
};

export default ForestModel;
