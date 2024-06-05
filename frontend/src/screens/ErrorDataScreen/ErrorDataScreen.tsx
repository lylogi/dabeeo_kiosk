import { useTranslation } from 'react-i18next';
import styles from './style.module.css';
import LogoIcon from '../../images/Isolation_Mode.svg';

function ErrorDataScreen() {
    const { t, i18n } = useTranslation();
    return (
        <div className={`${styles.wrapper}`} >
            <div className={styles.contentWrapper}>
                <img src={LogoIcon} />
                <span className={styles.text}>{t('common.errorDataScreen')}</span>
            </div>
        </div>
    )
}

export default ErrorDataScreen;