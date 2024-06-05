import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";

const CurrentTime = () => {
    const { t, i18n } = useTranslation();
    const [hour, setHour] = useState('');
    const date = new Date();
    const lang = i18n.language;

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            const hour = date.getHours();
            let formattedTime = date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }).replace(/AM|PM/g, "").trim();
            let period = hour < 12 ? 'AM' : 'PM';
            formattedTime = period + ' ' + formattedTime;
            setHour(formattedTime);
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [])


    const weekday = date.toLocaleString(lang, { weekday: 'short' });
    const day = date.toLocaleString(lang, { day: '2-digit' });
    const month = date.toLocaleString(lang, { month: '2-digit' });
    const year = date.toLocaleString(lang, { year: 'numeric' })
    const dateFormat = `${day}/${month}/${year} (${weekday})`;

    return (
        <div className={`${styles.currentTimeWrapper}`}>
            <span className={styles.label} >{dateFormat}</span>
            <span className={styles.content}>{hour}</span>
        </div>
    );
};

export default CurrentTime;
