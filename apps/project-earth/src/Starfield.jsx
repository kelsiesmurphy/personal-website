import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";

function getPoints({ numStars = 500, texture }) {
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);
    const rate = Math.random() * 1;
    const prob = Math.random();
    const light = Math.random();
    function update(t) {
      const lightness = prob > 0.8 ? light + Math.sin(t * rate) * 1 : light;
      return lightness;
    }
    return {
      pos: new THREE.Vector3(x, y, z),
      update,
      minDist: radius,
    };
  }

  const verts = [];
  const colors = [];
  const positions = [];
  for (let i = 0; i < numStars; i++) {
    let p = randomSpherePoint();
    const { pos, update } = p;
    positions.push(p);
    const col = new THREE.Color().setHSL(0.6, 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: texture,
    transparent: true,
  });

  const points = new THREE.Points(geo, mat);

  function update(t) {
    points.rotation.y -= 0.0002;
    const colors = [];
    for (let i = 0; i < numStars; i++) {
      const p = positions[i];
      const bright = p.update(t);
      const col = new THREE.Color().setHSL(0.6, 0.2, bright);
      colors.push(col.r, col.g, col.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.attributes.color.needsUpdate = true;
  }

  points.userData = { update };
  return points;
}

function Starfield() {
  const ref = React.useRef();
  const texture = useLoader(THREE.TextureLoader, "./circle.png");

  const points = React.useMemo(() => getPoints({ numStars: 3000, texture }), [texture]);

  useFrame((state) => {
    ref.current.userData.update(state.clock.elapsedTime);
  });

  return <primitive object={points} ref={ref} />;
}

export default Starfield;
