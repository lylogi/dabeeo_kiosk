import styles from "./style.module.css";
import NoDataImage from "../../images/nodata.svg";

const NoData = ({notification}: any) => {

    return (
        <div className={`${styles.wrapper}`} >
            <div className={styles.contentWrapper}>
                <img className={styles.icon} src={NoDataImage} alt="nodata" />
                <span className={styles.text}>{notification}</span>
            </div>
        </div>
    );
};

export default NoData;
