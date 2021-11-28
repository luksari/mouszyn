import { useSpring } from '@react-spring/three';
import { ThreeEvent } from '@react-three/fiber';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { TextMesh } from '../textMesh';

type InteractiveFuegoProps = {
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  toggleValue: number;
};

export const InteractiveFuego = ({ onClick, toggleValue }: InteractiveFuegoProps) => {
  const [{ animValue }] = useSpring(
    { animValue: toggleValue, config: { mass: 5, tension: 500, friction: 35, precision: 0.0001 } },
    [toggleValue]
  );
  const [hovered, setHover] = useState(false);

  const handlePointerOver = useCallback(() => setHover(true), []);
  const handlePointerOut = useCallback(() => setHover(false), []);

  const animScale = animValue.to([0, 1], [0.3, 0.6]);

  const animColor = animValue.to([0, 1], ['#ffffff', '#3700ff']);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  return (
    <group>
      <Suspense fallback={null}>
        <TextMesh
          hAlign="center"
          position={[0, 0, 4]}
          size={3}
          fontSize={8}
          color={animColor}
          onClick={onClick}
          scale-y={animScale}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          toggleValue={toggleValue}
        >
          Fuego
        </TextMesh>
      </Suspense>
    </group>
  );
};
