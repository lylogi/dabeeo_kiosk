import styles from "./style.module.scss";
import { LANGUAGES } from './../../data/constants/common';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from "react";
import { LogContext } from "../../context/LogContext";
import { LOG_TYPE } from "../../constants/logType";


const Lang = () => {
    const { i18n } = useTranslation();
    const { saveLog, setIsSaveLang, branchId } = useContext(LogContext);
    const [ isOpen, setIsOpen ] = useState(false);
    const lang = i18n.language;
    
    const handleChangeLang = (event: any, item: string ) => {
        event.stopPropagation();
        event.preventDefault();
        if (item === lang) {
            return;
        }
        i18n.changeLanguage(item);
        const data = {
            language_code: item,
            branch_id: branchId
        }
        saveLog(LOG_TYPE.LANGUAGE, data);
        setIsSaveLang(true);
        setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick() {
            setIsOpen(false);
        }
    }, []); 

    return (
        <div className={`${styles.langWrapper} ${isOpen ? styles.open : ''}`} onClick={(event) => {event.stopPropagation(); setIsOpen(!isOpen)}} >
            <div className={styles.langActive}>{LANGUAGES[i18n.language]}</div>
            <div className={styles.langList}>
                {Object.keys(LANGUAGES).map(item => {
                    return <span key={item} className={`${styles.langItem} ${i18n.language == item && styles.active}`} onClick={(event) => handleChangeLang(event, item)}>{LANGUAGES[item]}</span>
                })}
            </div>
        </div>
    );
};

export default Lang;
