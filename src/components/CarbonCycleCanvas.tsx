"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, useGLTF, Line, Billboard, Environment, Sky } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import Fence from "./Fence";
import CowModel from "./Cows";
import FarmModel from "./Farm";
import ForestModel from "./Forest";
import FactoryModel from "./Factory";
import VolcanoModel from "./Volcano";
import { div } from "three/tsl";

function CurvedArrow({
  from,
  to,
  color = "cyan",
  label,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color?: string;
  label?: string;
}) {
  const curve = new THREE.QuadraticBezierCurve3(
    from,
    new THREE.Vector3((from.x + to.x) / 2, Math.max(from.y, to.y) + 2, (from.z + to.z) / 2),
    to
  );

  const points = curve.getPoints(50);
  const meshRef = useRef<THREE.Line>(null);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  const arrowPosition = curve.getPoint(0.5);
  const lookAtPoint = curve.getPoint(0.6);
  const direction = new THREE.Vector3().subVectors(lookAtPoint, arrowPosition).normalize();

  const arrowQuaternion = new THREE.Quaternion();
  arrowQuaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  useFrame(({ camera }) => {
    if (groupRef.current && hovered) {
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <>
      <Line
        ref={meshRef as React.RefObject<any>}
        points={points}
        color={color}
        lineWidth={2}
        dashed={false}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      <mesh position={arrowPosition} quaternion={arrowQuaternion}>
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {hovered && label && (
        <group ref={groupRef} position={curve.getPoint(0.5).clone().add(new THREE.Vector3(0, -0.5, 0))}>
          {label.split(/\n|\n/).map((line, i, arr) => (
            <Text
              key={i}
              position={[0, (arr.length - 1) * 0.25 - i * 0.5, 0]}
              fontSize={0.3}
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              {line}
            </Text>
          ))}
        </group>
      )}
    </>
  );
}

export default function CarbonCycleCanvas() {
  const sunPosition = new THREE.Vector3(-5, 5, 0);
  const forestPosition = new THREE.Vector3(-4, -0.88, -2.7);
  const volcanoPosition = new THREE.Vector3(9, -0.88, -5);
  const farmPosition = new THREE.Vector3(1.5, -0.88, -3);
  const waterPosition = new THREE.Vector3(-4, -0.99, 3);
  const waterPosition2 = new THREE.Vector3(-3, -0.99, 2);
  const factoryPosition = new THREE.Vector3(5, -0.9, 2.5);
  const atmosphere = new THREE.Vector3(0, 2.5, 0);
  const ground = new THREE.Vector3(0, -0.98, 0);

  const [showSidebar, setShowSidebar] = useState(true);
  const [showArrows, setShowArrows] = useState(true);

  return (
    <div className="flex w-fit mx-auto inset-0 h-full items-center justify-center relative overflow-hidden">
      <div
        style={{
          borderRight: "1px solid #ccc",
        }}
        className={`absolute top-0 z-10 inset-0 duration-300 h-fit rounded-2xl overflow-hidden p-4 w-[20vw] bg-[#eef5ff] ${
          showSidebar ? "left-0" : "left-[-50vw]"
        }`}
      >
        <h2>Instructions</h2>
        <p>• Hover over arrows to read information</p>
        <p>• Use mouse to rotate view</p>
        <p>• Use scroll to zoom</p>
        <div className="flex gap-2 items-center justify-between mt-2">
          <button onClick={() => setShowArrows((prev) => !prev)}>{showArrows ? "Hide Arrows" : "Show Arrows"}</button>
          <button onClick={() => setShowSidebar(false)}>Hide Instructions</button>
        </div>
      </div>

      <button
        className={`absolute top-0 inset-0 duration-300 h-fit rounded-br-2xl rounded-tl-2xl overflow-hidden p-2 w-fit bg-[#eef5ff] ${
          showSidebar ? "z-0" : "z-10"
        }`}
        onClick={() => setShowSidebar(true)}
      >
        <h1 className="font-semibold text-2xl">{">"}</h1>
      </button>

      <Canvas
        style={{
          height: "100vh",
          width: "80vw",
          margin: "auto",
          inset: "0",
          border: "1px solid black",
          borderRadius: "16px",
        }}
        camera={{ position: [15, 10, 15], fov: 50 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        {/* <Environment preset="sunset" /> */}
        <Sky sunPosition={sunPosition.toArray()} />

        {/* sun */}
        <mesh position={sunPosition}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="yellow" emissive="yellow" />
        </mesh>

        {/*  */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <circleGeometry args={[10000, 64]} />
          <meshStandardMaterial color="#2f4f2f" side={THREE.DoubleSide} />
        </mesh>

        {/* ocean */}
        <mesh position={waterPosition} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2, 32]} />
          <meshStandardMaterial color="#1ca3ec" transparent opacity={0.8} />
        </mesh>

        {/* Expanded ocean as polygon still deciding if i need to keep it or remove */}
        {/* <mesh position={[0, -0.9, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <shapeGeometry
          args={[
            (function () {
              const shape = new THREE.Shape();
              shape.moveTo(0, -15);
              shape.lineTo(-80000, 30000);
              shape.lineTo(-30, -1000000);

              return shape;
            })(),
          ]}
        />
        <meshStandardMaterial color="#1ca3ec" transparent opacity={0.75} />
      </mesh> */}

        {/* Volcano */}
        <VolcanoModel scale={5} position={volcanoPosition?.toArray()} rotation={[0, 3.14 / 1.75, 0]} />

        {/* imported models */}
        <FactoryModel scale={0.23} position={factoryPosition.toArray()} rotation={[0, 3.14 / 1.05, 0]} />
        <ForestModel scale={0.23} position={forestPosition.toArray()} />
        <FarmModel scale={0.15} />

        {/* farm ground */}
        <mesh position={[1.5, -0.99, -3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color="#d2b48c" />
        </mesh>

        {/* fences */}
        <Fence position={[0, -0.99, -1.5]} length={3} />
        <Fence position={[0, -0.99, -1.5]} rotation={[0, 3.14 / 2, 0]} length={4} />
        <Fence position={[3, -0.99, -1.5]} rotation={[0, 3.14 / 2, 0]} length={4} />

        {/* cows */}
        {[1.2, 1.5, 1.8].map((x, i) => (
          <CowModel key={i} initialPosition={[x, -0.7, -3]} />
        ))}

        {/* arrows */}
        {showArrows && (
          <>
            {" "}
            <CurvedArrow
              from={sunPosition}
              to={forestPosition}
              color="orange"
              label={"Photosynthesis\n(Energy transferred from Sun to Plants)"}
            />
            <CurvedArrow from={atmosphere} to={forestPosition} color="green" label="CO2 gets absorbed by Plants" />
            <CurvedArrow from={farmPosition} to={atmosphere} color="gray" label="Plant & Animal Respiration" />
            <CurvedArrow from={atmosphere} to={waterPosition} color="blue" label="Ocean absorbs CO2" />
            <CurvedArrow
              from={factoryPosition}
              to={atmosphere}
              color="red"
              label="Factory Emissions (Fossil Fuels and CO2)"
            />
            <CurvedArrow from={forestPosition} to={ground} color="brown" label="Dead Plants Decompose into Soil" />
            <CurvedArrow from={ground} to={atmosphere} color="#444" label="Decomposition Releases CO2" />
            <CurvedArrow from={waterPosition2} to={atmosphere} color="lightblue" label="Ocean Releases CO2" />
            <CurvedArrow from={farmPosition} to={ground} color="saddlebrown" label="Animal Waste Decomposes" />
            <CurvedArrow
              from={volcanoPosition}
              to={atmosphere}
              color="red"
              label={"Releasing carbon dioxide(CO2)\nfrom the Earth's mantle into the atmosphere"}
            />
          </>
        )}

        {/* label for atmosphere */}
        <Billboard>
          <Text position={[0, 3.5, 0]} fontSize={0.5} color="#0077be" anchorX="center" anchorY="middle">
            Atmosphere
          </Text>
        </Billboard>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          maxDistance={19}
          makeDefault
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/minecraft_cow.glb");
useGLTF.preload("/models/camp_forest.glb");
useGLTF.preload("/models/farm_low_poly.glb");
useGLTF.preload("/models/low_poly_factory.glb");
useGLTF.preload("/models/free__volcano_low_poly.glb");
