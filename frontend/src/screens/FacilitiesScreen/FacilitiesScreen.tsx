import styles from './style.module.css';
import HoriFilters from '../../components/horizontal/HoriFilter';
import { useTranslation } from 'react-i18next';
import HoriFacilitySwiper from '../../components/horizontal/HoriFacilitySwiper';

function FacilitiesScreen() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.pageWrapper} facility-page`}>
      <h1 className={`${styles.pageTitle} text-center`}>{t('pages.facilitiesTitle')}</h1>
      <div className={styles.swiperWrapper}>
        <HoriFacilitySwiper />
      </div>
      <HoriFilters />
    </div>
  )
}

export default FacilitiesScreen;