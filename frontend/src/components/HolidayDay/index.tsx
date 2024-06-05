import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import CalendarIcon from "./../../images/calendar_icon.svg";
import { useCallback, useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../../constants/localStorage";
import { DataContext } from "../../context/DataContext";
import { RESYNC_STATUS } from "../../constants/common";

const HolidayDay = () => {
    const { t, i18n } = useTranslation();
    const [holiday, setHoliday] = useState('');
    const { onResync } = useContext(DataContext);

    useEffect(() => {
        getHoliday();
    }, [i18n.language]);

    useEffect(() => {
        if (onResync !== RESYNC_STATUS.DONE) {
            getHoliday();
        }
    }, [onResync])

    const getHoliday = useCallback(() => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY.HOLIDAY) as any;
        if (data && data !== 'undefined' && data !== 'null') {
            const holiday = JSON.parse(data);
            setHoliday(holiday[i18n.language || 'en']);
        }
    }, []);

    return (
        <div className={`${styles.holidayWrapper}`}>
            {holiday && (
                <>
                    <span className={styles.label}>
                        <img src={CalendarIcon} />
                    </span>
                    <span className={styles.label}>{t('footer.holiday')}</span>
                    <span className={styles.content}>{holiday}</span>
                </>
            )}
        </div>
    );
};

export default HolidayDay;
