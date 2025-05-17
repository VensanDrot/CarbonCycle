import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const CowModel = ({ initialPosition = [0, 0, 0] }: { initialPosition?: [number, number, number] }) => {
  const { scene } = useGLTF("/models/minecraft_cow.glb");
  const [position] = useState<THREE.Vector3>(new THREE.Vector3(...initialPosition));
  const [direction, setDirection] = useState<THREE.Vector3>(
    new THREE.Vector3((Math.random() - 0.5) * 0.01, 0, (Math.random() - 0.5) * 0.01)
  );
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const clone = scene.clone(true);
    groupRef.current?.add(clone);
  }, [scene]);

  useFrame(() => {
    // Move cow
    position.add(direction);

    // Bounce off boundaries
    if (position.x < 0.2 || position.x > 2.8) direction.x *= -1;
    if (position.z < -4.3 || position.z > -1.7) direction.z *= -1;

    // Occasionally change direction randomly
    if (Math.random() < 0.01) {
      direction.set((Math.random() - 0.5) * 0.01, 0, (Math.random() - 0.5) * 0.002);
    }

    // Rotate to face movement direction
    const angle = Math.atan2(direction.x, direction.z);
    if (groupRef.current) {
      groupRef.current.position.copy(position);
      groupRef.current.rotation.y = angle;
    }
  });

  return <group ref={groupRef} scale={0.015} />;
};

export default CowModel;
