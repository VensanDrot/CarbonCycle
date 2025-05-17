"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Group } from "three";

const Fence = ({
  position = [0, 0, 0],
  length = 1,
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number];
  length?: number;
  rotation?: [number, number, number];
}) => {
  const postSpacing = 0.5;
  const numPosts = Math.floor(length / postSpacing) + 1;

  return (
    <group position={position} rotation={rotation}>
      {/* Vertical posts */}
      {Array.from({ length: numPosts }).map((_, i) => (
        <mesh key={`post-${i}`} position={[i * postSpacing, 0, 0]}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}

      {/* Top rail */}
      <mesh position={[length / 2, 0.2, 0]}>
        <boxGeometry args={[length, 0.05, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Bottom rail */}
      <mesh position={[length / 2, 0.05, 0]}>
        <boxGeometry args={[length, 0.05, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
};

export function CowModel({ initialPosition = [0, 0, 0] }: { initialPosition?: [number, number, number] }) {
  const { scene } = useGLTF("/models/minecraft_cow.glb");
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3(...initialPosition));
  const [direction, setDirection] = useState<THREE.Vector3>(
    new THREE.Vector3((Math.random() - 0.5) * 0.01, 0, (Math.random() - 0.5) * 0.01)
  );
  const groupRef = useRef<Group>(null);

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
}

function FarmModel({
  position = [1.5, -0.88, -5.7],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const { scene } = useGLTF("/models/farm_low_poly.glb");

  return <primitive object={scene} position={position} scale={scale} />;
}

function CarbonArrow({ from, to, color = "cyan" }: { from: THREE.Vector3; to: THREE.Vector3; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 3) * 0.3;
    }
  });

  const direction = new THREE.Vector3().subVectors(to, from);
  const length = direction.length();
  const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  const arrowRotation = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize()
  );

  return (
    <mesh position={mid} quaternion={arrowRotation} ref={meshRef}>
      <cylinderGeometry args={[0.03, 0.03, length, 8]} />
      <meshStandardMaterial color={color} emissive={color} />
    </mesh>
  );
}

function Cow({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.2]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.2, 0.3, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}

export default function CarbonCycleCanvas() {
  const atmosphere = new THREE.Vector3(0, 2.5, 0);
  const biosphere = new THREE.Vector3(0, -2.5, 0);
  const hydrosphere = new THREE.Vector3(-3.5, -1.5, 0);
  const geosphere = new THREE.Vector3(3.5, -1.5, 0);
  const sunPosition = new THREE.Vector3(-5, 5, 0);

  return (
    <Canvas
      style={{
        height: "100vh",
        width: "80vw",
        margin: "auto",
        inset: "0",
        border: "1px solid black",
        borderRadius: "15px",
        background: "#d0f0ff",
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      {/* <Stars radius={50} depth={40} count={2000} factor={4} saturation={0} fade /> */}

      {/* Sun */}
      <mesh position={sunPosition}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="yellow" emissive="yellow" />
      </mesh>

      {/* Earth Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#2f4f2f" side={THREE.DoubleSide} />
      </mesh>

      {/* Ocean (rounded shape) */}
      <mesh position={[-3.5, -0.99, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#1ca3ec" transparent opacity={0.8} />
      </mesh>

      {/* Factory block */}
      <group position={[3.5, -1, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="gray" />
        </mesh>
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, 0.5 + i * 0.3, 0]}>
            <coneGeometry args={[0.1, 0.2, 6]} />
            <meshStandardMaterial color="#aaaaaa" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Tree cluster */}
      {[-1.2, -0.6, 0].map((x, i) => (
        <group position={[x, -1, 0.5]} key={i}>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.5]} />
            <meshStandardMaterial color="saddlebrown" />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <coneGeometry args={[0.4, 0.7, 8]} />
            <meshStandardMaterial color="forestgreen" />
          </mesh>
        </group>
      ))}

      <FarmModel scale={0.15} />

      {/* Farm area */}
      <mesh position={[1.5, -0.99, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>

      <Fence key={"fence-x"} position={[0, -0.99, -1.5]} length={3} />
      <Fence key={"fence-x2"} position={[0, -0.99, -1.5]} rotation={[0, 3.14 / 2, 0]} length={4} />
      <Fence key={"fence-x3"} position={[3, -0.99, -1.5]} rotation={[0, 3.14 / 2, 0]} length={4} />

      {/* Cows inside the farm */}
      {[1.2, 1.5, 1.8].map((x, i) => (
        // <Cow key={i} position={[x, -0.85, -3]} />
        <CowModel key={i} initialPosition={[x, -0.7, -3]} />
      ))}

      {/* Arrows */}
      {/* <CarbonArrow from={sunPosition} to={biosphere} color="orange" />
      <CarbonArrow from={atmosphere} to={biosphere} color="lime" />
      <CarbonArrow from={biosphere} to={atmosphere} color="gray" />
      <CarbonArrow from={atmosphere} to={hydrosphere} color="blue" />
      <CarbonArrow from={geosphere} to={atmosphere} color="red" /> */}

      {/* Labels */}
      {/* <Text position={atmosphere} fontSize={0.3} color="#f87171">
        Atmosphere
      </Text>
      <Text position={biosphere} fontSize={0.3} color="green">
        Biosphere
      </Text>
      <Text position={hydrosphere.clone().add(new THREE.Vector3(0, 1, 0))} fontSize={0.3} color="skyblue">
        Hydrosphere
      </Text>
      <Text position={geosphere.clone().add(new THREE.Vector3(0, 1, 0))} fontSize={0.3} color="gray">
        Geosphere
      </Text>
      <Text position={sunPosition.clone().add(new THREE.Vector3(0, 0.7, 0))} fontSize={0.3} color="orange">
        Sun
      </Text> */}

      {/* <OrbitControls enablePan={false} enableZoom={true} /> */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minPolarAngle={0} // Allows looking straight up (zenith)
        maxPolarAngle={Math.PI / 2} // Prevents looking below the horizontal plane
        // minAzimuthAngle={-Infinity} // Default, allows full 360 horizontal rotation
        // maxAzimuthAngle={Infinity}  // Default, allows full 360 horizontal rotation
      />
    </Canvas>
  );
}

useGLTF.preload("/models/minecraft_cow.glb");
useGLTF.preload("/models/farm_low_poly.glb");
