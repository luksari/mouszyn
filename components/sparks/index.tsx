import { useFrame, useThree, extend } from '@react-three/fiber';
import { MutableRefObject, useMemo, useRef } from 'react';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

import { MeshLine, MeshLineMaterial } from 'meshline';

extend({ MeshLine, MeshLineMaterial });

type Spark = {
  color: string;
  width: number;
  speed: number;
  curve: Vector3[];
};

type SparksProps = {
  count: number;
  mouse: MutableRefObject<[number, number]>;
  colors: string[];
  radius: number;
};

type FatlineProps = {
  curve: Vector3[];
  width: number;
  color: string;
  speed: number;
};

const r = () => Math.max(0.3, Math.random());

const Fatline = ({ curve, width, color, speed }: FatlineProps) => {
  const material = useRef<any>();
  useFrame(() => (material.current.uniforms.dashOffset.value -= speed));

  return (
    <mesh>
      <meshLine attach="geometry" points={curve} />
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.9}
      />
    </mesh>
  );
};

export const Sparks = ({ count, mouse, colors, radius }: SparksProps) => {
  const lines = useMemo<Spark[]>(
    () =>
      Array.from({ length: count }).map((_, index) => {
        const pos = new THREE.Vector3(Math.sin(0) * radius, Math.cos(0) * radius, 0);
        const points = Array.from({ length: 30 }).map((_, index) => {
          const angle = (index / count) * Math.PI * 2;
          return pos.add(new THREE.Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 1)).clone();
        });
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
        return {
          color: colors[Math.floor(colors.length * Math.random())],
          width: Math.max(0.01, (0.05 * index) / 10),
          speed: Math.max(0.001, 0.002 * Math.random()),
          curve,
        };
      }),
    [colors, count, radius]
  );

  const ref = useRef<Group>();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0 + mouse.current[1] / aspect / 200, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0 + mouse.current[0] / aspect / 400, 0.1);
    }
  });

  return (
    <group ref={ref}>
      <group position={[-radius - 1, -radius, 4]} scale={[1.5, 0.9, 1]}>
        {lines.map((props, index) => (
          <Fatline key={index} {...props} />
        ))}
      </group>
    </group>
  );
};
