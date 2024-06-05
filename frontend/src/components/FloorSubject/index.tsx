import { useContext, useState } from "react";
import { MapContext } from "../../context/MapContext";
import styles from "./style.module.scss";
import i18n from "../../i18n/i18n";

const FloorSubject = () => {
    const { activeFloorById } = useContext(MapContext);
    const lang = i18n.language;
    
    return (
        <div className={styles.viewSubjectFloor} id="viewSubjectFloor">
            <div className={styles.viewSubjectFloorItem }>
                {activeFloorById?.subject[lang]}
            </div>
        </div>
    )
}

export default FloorSubject;