import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import { getImgThumb } from "../../helper/utils";

interface IStoreProps {
  title: {
    [key: string]: string,
  },
  seqCode: {
    [key: string]: string,
  },
  id: string,
  mapPoiId: string,
  floor: {
    title: string
  }
}

const Store = ({ title, floor, seqCode }: IStoreProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className={`${styles.storeWrapper}`}>
      <div className={styles.storeImage} >
        <img src={getImgThumb(seqCode?.[lang])} alt={title[lang]} />
      </div>
      <div className={styles.storeDetail}>
        <h4 className={styles.storeName}>{title[lang]}</h4>
        <p className={styles.storeFloor}>3F</p>
      </div>
    </div>
  );
};

export default Store;
