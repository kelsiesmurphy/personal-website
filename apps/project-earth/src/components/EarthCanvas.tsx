import { Sphere } from "@react-three/drei";
import { Canvas, Loader, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { earthFragmentShader, earthVertexShader } from "./shaders.js";
import { SRGBColorSpace, Texture, Vector3 } from "three";
import { Atmosphere } from "./Atmosphere/index.js";

export interface EarthProps {
  lightDirection: Vector3;
}

const verteces = Math.pow(2, 9);

export default function EarthCanvas() {
  const scene = useRef(null);

  const EarthMesh = () => {
    const [earthDayTexture, nightTexture, cloudTexture] = useLoader(
      TextureLoader as unknown as new () => Loader<Texture>,
      [
        "/assets/8k_earth_daymap.jpg",
        "/assets/8k_earth_nightmap.jpg",
        "/assets/8k_earth_clouds.jpg",
      ]
    );

    earthDayTexture.colorSpace =
      nightTexture.colorSpace =
      cloudTexture.colorSpace =
        SRGBColorSpace;

    const uniformsRef = useRef({
      dayMap: { value: earthDayTexture },
      nightMap: { value: nightTexture },
      cloudMap: { value: cloudTexture },
      uTime: { value: 0 },
    });

    return (
      <Sphere args={[1, verteces, verteces]}>
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={uniformsRef.current}
        />
        <Atmosphere />
      </Sphere>
    );
  };

  return (
    <Canvas ref={scene}>
      <ambientLight intensity={0.1} />
      <directionalLight intensity={3.5} position={[1, 0, -0.25]} />
      <EarthMesh />
    </Canvas>
  );
}
