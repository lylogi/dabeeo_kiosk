import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import ClockIcon from "./../../images/clock_icon.svg";
import { useCallback, useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../../constants/localStorage";
import { RESYNC_STATUS } from "../../constants/common";
import { DataContext } from "../../context/DataContext";

const OpenTime = () => {
    const { t, i18n } = useTranslation();
    const  [ openTime, setOpenTime ] = useState('');
    const  [ closeTime, setCloseTime ] = useState('');
    const { onResync } = useContext(DataContext);

    const timeString12hr = useCallback((time: any) => {
        let timeConvert = new Date('1970-01-01T' + time).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }).replace(/AM|PM/g, "").trim()
        return timeConvert;
    }, []);

    useEffect(() => {
        setOpenTime(timeString12hr(localStorage.getItem(LOCAL_STORAGE_KEY.OPEN_TIME) || ''));
        setCloseTime(timeString12hr(localStorage.getItem(LOCAL_STORAGE_KEY.CLOSE_TIME) || ''));
    }, [])

    useEffect(() => {
        if(onResync === RESYNC_STATUS.DONE)  {
            setOpenTime(timeString12hr(localStorage.getItem(LOCAL_STORAGE_KEY.OPEN_TIME) || ''));
            setCloseTime(timeString12hr(localStorage.getItem(LOCAL_STORAGE_KEY.CLOSE_TIME) || ''));
        }
    }, [onResync])
  
    return (
        <div className={`${styles.opentimeWrapper}`}>
            <span className={styles.label}>
                <img src={ClockIcon} />
            </span>
            <span className={styles.label}>{t('footer.businessHour')}</span>
            <span className={styles.content}> AM {openTime}  ~ PM {closeTime}</span>
        </div>
    );
};

export default OpenTime;
