import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { Effects } from "./effects/Effects";
import { Light } from "./light/Light";
import { Particles } from "./particles/Particles";
import { Sparks } from "./sparks/Sparks";
import { InteractiveText } from "./interactiveText/InteractiveText";
import { Preload } from "@react-three/drei";

const FuegoPage = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  return (
    <Canvas
      mode='concurrent'
      style={{
        position: "absolute",
        top: 0,
      }}
      camera={{ position: [0, 0, 30], fov: 45 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.setClearColor(new THREE.Color("#020207"));
      }}
    >
      <Preload all />
      <Effects />
      <Light />
      <Particles count={1000} mouse={mouse} />
      <Sparks
        count={20}
        mouse={mouse}
        colors={["#ea7434", "#f6a50b", "#A63923", "#BA2622", "#E38E35", "#F3D046"]}
        radius={3}
      />
      <InteractiveText />
    </Canvas>
  );
};

export default FuegoPage;
