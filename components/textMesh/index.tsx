import { useLoader, extend, TextGeometryProps, GroupProps } from '@react-three/fiber';
import { FC, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { a, AnimatedProps } from '@react-spring/three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { MeshWobbleMaterial } from '@react-three/drei';

extend({ TextGeometry });

type TextMeshProps = TextGeometryProps &
  AnimatedProps<GroupProps> & {
    fontSize?: number;
    height?: number;
  };

export const TextMesh: FC<TextMeshProps> = ({
  children,
  vAlign = 'center',
  hAlign = 'center',
  size = 1.5,
  color = '#bada55',
  fontSize = 8,
  height = 6,
  scale,
  ...groupProps
}) => {
  const mesh = useRef(null);

  // parse JSON file with Three
  const font = useLoader(FontLoader, '/vogue.json');

  const config = useMemo(
    () => ({
      font,
      size: fontSize,
      height: height,
    }),
    [font, fontSize, height]
  );

  useLayoutEffect(() => {
    const size = new THREE.Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox.getSize(size);
    mesh.current.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x;
    mesh.current.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y;
  }, [children, hAlign, vAlign]);

  return (
    <a.group {...groupProps} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <a.mesh ref={mesh} castShadow receiveShadow scale={scale} material-color={color}>
        <textGeometry args={[children, config]} />
        <MeshWobbleMaterial attach="material" metalness={0.3} roughness={1} speed={1.4} factor={0.2} />
      </a.mesh>
    </a.group>
  );
};
