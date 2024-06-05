import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import useFormatDateTime from "../../hooks/datetime/useFormatDateTime";
import CalenderIcon from "../../images/calender_d.svg";
import { getImgThumb, getTitleByLang } from "../../helper/utils";

interface IStoreProps {
  title: {
    [key: string]: string,
  },
  id: string,
  displayStartDate: Date,
  displayEndDate: Date,
  seqCode: {
    [key: string]: string,
  }
}

const Event = ({title, seqCode, displayStartDate, displayEndDate}: IStoreProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  
  return (
    <div className={`${styles.eventWrapper}`}>
        <div className={styles.eventImage} >
            <img src={getImgThumb(seqCode?.[lang])} alt={title[lang]} />
        </div>
        <div className={styles.eventDetail}>
            <div>
                <h4 className={styles.eventName}>{getTitleByLang(title, lang)}</h4>
                <div className={styles.eventDate}>
                    <span>
                        <img src={CalenderIcon} />
                    </span>
                    <span>{useFormatDateTime(displayStartDate, lang)}</span>
                    <span>&#126;</span>
                    <span>{useFormatDateTime(displayEndDate, lang)}</span>
                </div>
            </div>
            <button className={styles.btnViewDetail}>
                {t('event.btnViewDetail')}
            </button>
        </div>
    </div>
  );
};

export default Event;
