import styles from "./style.module.css";
import NoDataImage from "../../images/Isolation_Mode.svg";

const NoScreen = ({handeClick}: any) => {  

    return (
        <div className={`${styles.wrapper}`}  onClick={handeClick} onTouchStart={handeClick}>
            <div className={styles.contentWrapper}>
                <img className={styles.icon} src={NoDataImage} alt="nodata" />
            </div>
        </div>
    );
};

export default NoScreen;
