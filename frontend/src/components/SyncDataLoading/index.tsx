import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import ImageLoading from '../../images/window_background.svg';

const SyncDataLoading = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.loading}>
      <img src={ImageLoading} />
      <div className={styles.loadingMessage}>{t('sync.loadingData')}</div>
      <div className={styles.ldsSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <span className={styles.copyright}>Powered by dabeeo vina</span>
    </div>
  );
};

export default SyncDataLoading;
