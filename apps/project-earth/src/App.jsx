import * as THREE from "three";
import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Starfield from "./Starfield";
import EarthMaterial from "./EarthMaterial";
import AtmosphereMesh from "./AtmosphereMesh";

function Loader() {
  return (
    <div style={{ color: "white", textAlign: "center", marginTop: "20%", fontFamily: "sans-serif" }}>
      <h1>Loading...</h1>
    </div>
  );
}

const sunDirection = new THREE.Vector3(-2, 0.5, 1.5);

function Earth() {
  const ref = React.useRef();
  
  useFrame(() => {
    ref.current.rotation.y += 0.001;
  });
  const axialTilt = 23.4 * Math.PI / 180;
  return (
    <group rotation-z={axialTilt}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[2, 64]} />
        <EarthMaterial sunDirection={sunDirection} />
        <AtmosphereMesh />
      </mesh>
    </group>
  );
}

function App() {
  const { x, y, z } = sunDirection;

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [2, 0.1, 5] }}
          gl={{ toneMapping: THREE.NoToneMapping }}
        >
            <Earth />
            <Starfield />
            <OrbitControls minDistance={3} maxDistance={20} />
            <hemisphereLight args={[0xffffff, 0x000000, 3.0]} />
          <directionalLight position={[x, y, z]} />
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
