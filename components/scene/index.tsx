import { useSpring } from '@react-spring/three';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { TextMesh } from '../textMesh';
import * as THREE from 'three';
import { Light } from '../light';
import { Particles } from '../particles';
import { Sparks } from '../sparks';
import classes from './scene.module.scss';
import { Effects } from '../effects';
import { OrbitControls } from '@react-three/drei';
import { LavaPlane } from '../lavaPlane';

const InteractiveText = () => {
  const [toggleVal, setToggleVal] = useState(0);
  const [{ animValue }] = useSpring(
    { animValue: toggleVal, config: { mass: 1, tension: 300, friction: 50, precision: 0.0001 } },
    [toggleVal]
  );
  const [hovered, setHover] = useState(false);
  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered]);
  // Events
  const handleClick = useCallback(() => setToggleVal(toggle => Number(!toggle)), [setToggleVal]);
  const handlePointerOver = useCallback(() => setHover(true), []);
  const handlePointerOut = useCallback(() => setHover(false), []);
  const initY = 0;

  const animScale = animValue.to([0, 1], [0.3, 0.6]);

  const animPosY = animValue.to([0, 1], [initY, 1]);
  const animColor = animValue.to([0, 1], ['#FAC000', '#D73502']);

  return (
    <group>
      <fog attach="fog" args={['white', 50, 190]} />
      <Suspense fallback={null}>
        <TextMesh
          hAlign="center"
          position={[0, initY, 4]}
          size={3}
          fontSize={8}
          color={animColor}
          onClick={handleClick}
          scale-y={animScale}
          position-y={animPosY}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          Fuego
        </TextMesh>
      </Suspense>
    </group>
  );
};

export const Scene = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  return (
    <Canvas
      className={classes.canvas}
      camera={{ position: [0, 0, 30], fov: 45 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.setClearColor(new THREE.Color('#020207'));
      }}
    >
      <Effects />
      <Light />
      <Particles count={1000} mouse={mouse} />
      <Sparks count={15} mouse={mouse} colors={['#ea7434', '#f6a50b', '	red']} radius={3} />
      <InteractiveText />
      <OrbitControls />
      <LavaPlane />
    </Canvas>
  );
};
