import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from '../components/box';
import { FC } from 'react';

import classes from './index.module.scss';

export const Home: FC = () => (
  <div className={classes.wrapper}>
    <Canvas className={classes.canvas} camera={{ position: [0, 0, 35] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Box position={[10, 0, 0]} />
      <Box position={[-10, 0, 0]} />
      <Box position={[0, 10, 0]} />
      <Box position={[0, -10, 0]} />
      <OrbitControls />
    </Canvas>
  </div>
);

export default Home;
