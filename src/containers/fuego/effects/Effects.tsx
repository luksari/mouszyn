import React, { useRef, useEffect } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass });

export const Effects = () => {
  const composer = useRef<EffectComposer>();
  const { scene, gl, size, camera } = useThree();

  useEffect(() => {
    if (!composer.current) {
      return;
    }
    composer.current?.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    if (!composer.current) {
      return;
    }
    composer.current?.render();
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
    </effectComposer>
  );
};
