import { getMedia } from "../../helper/utils";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

interface IStoreProps {
    title: {
        [key: string]: string,
    },
    seqCode: {
        [key: string]: string,
    }
    id: string,
    floor: any,
    catePoi: any
}

const Facility = ({ title, floor, seqCode }: IStoreProps) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    return (
        <div className={`${styles.facilityWrapper}`}>
            <div className={styles.facilityFloor}>
                {floor?.title}
            </div>
            <div className={styles.facilityImage} >
                <img src={getMedia(seqCode?.[lang])} alt={title[lang]} />
            </div>
            <div className={styles.facilityDetail}>
                <span>{title[lang]}</span>
            </div>
        </div>
    );
};

export default Facility;
