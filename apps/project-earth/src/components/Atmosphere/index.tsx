import { BackSide, Vector3 } from "three";
import { atmosphereFragmentShader, atmosphereVertexShader } from "./shaders.js";
import { useRef } from "react";

const verteces = Math.pow(2, 9);

export const Atmosphere = () => {
  const lightDirectionRef = useRef<Vector3>();

  return (
    <mesh>
      <sphereGeometry args={[1.02, verteces, verteces]} />
      <shaderMaterial
        side={BackSide}
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        transparent
        uniforms={{
          lightDirection: { value: lightDirectionRef.current },
        }}
      />
    </mesh>
  );
};
