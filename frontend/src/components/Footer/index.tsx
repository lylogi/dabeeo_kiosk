import CurrentTime from '../CurrentTime';
import Lang from './../Lang';
import Logo from './../Logo';
import HolidayDay from './../HolidayDay';
import OpenTime from './../OpenTime';
import styles from './style.module.scss';

const Footer = () => {

  return (
    <div className={`${styles.footerWrapper}`}>
      <div className="d-flex col-8">
        <div className={styles.footerItem}>
          <Logo />
        </div>
        <div className={styles.footerItem}>
          <OpenTime />
        </div>
        <div className={styles.footerItem}>
          <HolidayDay />
        </div>
      </div>
      <div className="d-flex">
        <div className={styles.footerItem}>
          <CurrentTime />
        </div>
        <div className={styles.footerItem}>
          <Lang />
        </div>
      </div>
    </div>
  );
};

export default Footer;
