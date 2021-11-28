import { useFrame, useThree, extend } from '@react-three/fiber';
import { memo, MutableRefObject, useMemo, useRef } from 'react';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

import { MeshLine, MeshLineMaterial } from 'meshline';
import { a, useSpring } from '@react-spring/three';

extend({ MeshLine, MeshLineMaterial });

type Spark = {
  color: string;
  width: number;
  speed: number;
  curve: Vector3[];
};

type FatlineProps = Spark & { toggleValue: number };

const r = () => Math.max(0.5, Math.random());

const Fatline = memo(({ curve, width, color, speed }: FatlineProps) => {
  const material = useRef<any>();
  useFrame(() => {
    material.current.uniforms.dashOffset.value -= speed;
  });

  return (
    <mesh>
      <meshLine attach="geometry" points={curve} />
      <meshLineMaterial
        attach="material"
        ref={material}
        depthTest={true}
        transparent={true}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.95}
      />
    </mesh>
  );
});

type SparksProps = {
  count: number;
  mouse: MutableRefObject<[number, number]>;
  colors: string[];
  radius: number;
  toggleValue: number;
};

export const Sparks = memo(({ count, mouse, colors, radius, toggleValue }: SparksProps) => {
  const ref = useRef<Group>();
  const { viewport } = useThree();
  const aspect = viewport.width / viewport.height;

  const [{ animValue }] = useSpring(
    { animValue: toggleValue, config: { mass: 0.5, tension: 8, friction: 1.5, precision: 0.0005 } },
    [toggleValue]
  );

  const lines = useMemo<Spark[]>(
    () =>
      Array.from({ length: count }).map((_, index) => {
        const pos = new THREE.Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), r() * 2);
        const points = Array.from({ length: 40 }).map((_, index) => {
          const angle = (index / count) * Math.PI * 2;
          return pos.add(new THREE.Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0)).clone();
        });
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
        return {
          color: colors[Math.floor(colors.length * Math.random())],
          width: Math.max(0.01, (0.01 * index) / 100),
          speed: Math.max(0.001, 0.003 * Math.random()),
          curve,
        };
      }),
    [colors, count, radius]
  );

  const animScale = animValue.to([0, 1], [0, 1]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0 + mouse.current[1] / aspect / 400, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0 + mouse.current[0] / aspect / 200, 0.1);
    }
  });

  return (
    <a.group ref={ref} scale={animScale}>
      <group position={[-radius * 2, -radius + 1, 3.5]} scale={[1, 0.5, 1]}>
        {lines.map((props, index) => (
          <Fatline key={index} {...props} toggleValue={toggleValue} />
        ))}
      </group>
    </a.group>
  );
});
