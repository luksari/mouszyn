import { MeshProps, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { BufferAttribute } from 'three';
import perlinNoise3d from 'perlin-noise-3d';

const noise = new perlinNoise3d();

type MeshAnimationProps = {
  position: MeshProps['position'];
  rotation: MeshProps['rotation'];
  grid: {
    width: number;
    height: number;
    separation: number;
  };
  calcColor: (x: number, y: number, z: number, t: number) => any;
  calcZ: (x: number, y: number, t: number) => any;
  anim: {
    init: number;
    update: (t: number) => number;
  };
};

export const MeshAnimation = ({
  grid: { height, width, separation },
  position,
  rotation,
  calcColor,
  calcZ,
  anim: { init, update },
}: MeshAnimationProps) => {
  let t = init;
  const posRef = useRef<BufferAttribute>();
  const colorRef = useRef<BufferAttribute>();

  // Creation of vertex buffer
  const { positions, colors, normals } = useMemo(() => {
    const positions = [],
      colors = [],
      normals = [];

    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        const x = separation * (xi - (width - 1) / 2);
        const y = separation * (yi - (height - 1) / 2);
        const z = calcZ(x, y, t);
        positions.push(x, y, z);

        const color = calcColor(x, y, z, t);
        colors.push(color.r, color.g, color.b);
        normals.push(0, 0, 1);
      }
    }
    return {
      positions: Float32Array.from(positions),
      colors: Float32Array.from(colors),
      normals: Float32Array.from(normals),
    };
  }, [calcColor, calcZ, height, separation, t, width]);

  // Creation of index buffer
  const indices = useMemo(() => {
    const indices = [];
    let i = 0;
    for (let yi = 0; yi < height - 1; yi++) {
      for (let xi = 0; xi < width - 1; xi++) {
        indices.push(i, i + 1, i + width + 1); // bottom right tri
        indices.push(i + width + 1, i + width, i); // top left tri
        i++;
      }
      i++;
    }
    return Uint16Array.from(indices);
  }, [height, width]);

  useFrame(() => {
    t = update(t);
    const positions: any = posRef.current.array;
    const colors: any = colorRef.current.array;

    let i = 0;
    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        positions[i + 2] = calcZ(positions[i], positions[i + 1], t);
        const color = calcColor(positions[i], positions[i + 1], positions[i + 2], t);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        i += 3;
      }
    }

    posRef.current.needsUpdate = true;
    colorRef.current.needsUpdate = true;
  });

  return (
    <mesh position={position} rotation={rotation} castShadow>
      <bufferGeometry>
        <bufferAttribute
          ref={posRef}
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          ref={colorRef}
          attachObject={['attributes', 'color']}
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'normal']}
          array={positions}
          count={normals.length / 3}
          itemSize={3}
        />
        <bufferAttribute attach="index" array={indices} count={indices.length} />
      </bufferGeometry>
      <meshStandardMaterial vertexColors side={THREE.DoubleSide} wireframe={false} />
    </mesh>
  );
};

export const LavaPlane = () => {
  const seed = Math.floor(Math.random() * 2 ** 16);
  noise.noiseSeed(seed);

  const sampleNoise = (x, y, z) => {
    const scale = 1 / 8;
    const octaves = 20;
    const persistence = 0.7;
    const lacunarity = 1;

    let amp = 1.6;
    let freq = 1;

    let value = 0;
    for (let i = 0; i < octaves; i++) {
      value += amp * noise.get(x * freq * scale, y * freq * scale, z);
      amp *= persistence;
      freq *= lacunarity;
    }

    return value;
  };

  const calcZ = (x: number, y: number, t: number) => {
    return sampleNoise(x, y, t);
  };

  const calcColor = (x: number, y: number, z: number) => {
    return {
      r: z,
      g: z / 2,
      b: Math.sqrt(x ** 2 + y ** 2) / 75,
    };
  };
  return (
    <MeshAnimation
      position={[0, -8, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      grid={{
        width: 100,
        height: 100,
        separation: 0.4,
      }}
      calcColor={calcColor}
      calcZ={calcZ}
      anim={{
        init: 0,
        update: t => t + 0.002,
      }}
    />
  );
};
