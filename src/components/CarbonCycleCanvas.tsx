"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Group } from "three";
import Fence from "./Fence";
import CowModel from "./Cows";
import FarmModel from "./Farm";
import ForestModel from "./Forest";
import FactoryModel from "./Factory";

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

      <FactoryModel scale={0.23} position={[5, -0.9, 2.5]} rotation={[0, 3.14 / 1.05, 0]} />

      <ForestModel scale={0.23} position={[-3, -0.9, -4.5]} />

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
useGLTF.preload("/models/camp_forest.glb");
useGLTF.preload("/models/farm_low_poly.glb");
useGLTF.preload("/models/low_poly_factory.glb");
