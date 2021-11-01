import Link from 'next/link';
import classes from './home.module.scss';

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <Link href="/fuego" passHref={true}>
        <a className={classes.link}>Fuego</a>
      </Link>
    </div>
  );
};

export default Home;
