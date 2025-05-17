import { useGLTF } from "@react-three/drei";

const FactoryModel = ({
  position = [1.5, -0.88, -5.7],
  scale = 1,
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) => {
  const { scene } = useGLTF("/models/low_poly_factory.glb");

  return <primitive object={scene} position={position} scale={scale} rotation={rotation} />;
};

export default FactoryModel;
