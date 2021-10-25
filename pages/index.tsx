import classes from './index.module.scss';
import { Scene } from '../components/scene';
import { FC } from 'react';

export const Home: FC = () => (
  <div className={classes.wrapper}>
    <Scene />
  </div>
);

export default Home;
