import React, { FC, useRef, useState } from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import { Box as NativeBox, Html } from '@react-three/drei';

type BoxProps = MeshProps & { text?: string };

export const Box: FC<BoxProps> = ({ text, ...boxProps }) => {
  const mesh = useRef<MeshProps>();

  const [hovered, setHover] = useState(false);

  useFrame(state => {
    if (hovered) {
      mesh.current.position['y'] = Math.sin(state.clock.getElapsedTime()) * 10;
    }
    mesh.current.position['y'] = Math.sin(state.clock.getElapsedTime()) * 10;
  });
  return (
    <NativeBox
      args={[2, 2, 2]}
      {...boxProps}
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial attach="material" color={hovered ? '#2b6c76' : '#720b23'} />
      {text && (
        <Html position={[0, 0, 1]} className="label" center>
          {text}
        </Html>
      )}
    </NativeBox>
  );
};
