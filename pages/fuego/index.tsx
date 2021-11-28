import { Canvas } from '@react-three/fiber';
import React, { useCallback, useRef, useState } from 'react';
import { Effects } from '../../components/effects';
import { InteractiveFuego } from '../../components/interactiveFuego';
import { Light } from '../../components/light';
import { Particles } from '../../components/particles';
import { Sparks } from '../../components/sparks';
import classes from './fuego.module.scss';

const Fuego = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const [toggleValue, setToggleValue] = useState(0);
  // Events
  const handleClick = useCallback(() => setToggleValue(toggle => Number(!toggle)), [setToggleValue]);
  return (
    <Canvas className={classes.canvas} camera={{ position: [0, 0, 30], fov: 45 }}>
      <Effects />
      <Light />
      <Particles count={1000} mouse={mouse} />
      <Sparks
        count={20}
        mouse={mouse}
        colors={['#EA7434', '#f6A50B', '#A63923', '#BA2622', '#E38E35', '#F3D046']}
        radius={3}
        toggleValue={toggleValue}
      />
      <InteractiveFuego onClick={handleClick} toggleValue={toggleValue} />
    </Canvas>
  );
};

export default Fuego;
