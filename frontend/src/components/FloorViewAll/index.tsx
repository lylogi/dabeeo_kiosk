import { useContext } from "react";
import { MapContext } from "../../context/MapContext";
import styles from "./style.module.scss";
import i18n from "../../i18n/i18n";
import { FLOOR_MAP } from "../../constants/common";
import { t } from "i18next";

const FloorViewAll = () => {
    const { floorList, changeFloorItem, activeFloorId } = useContext(MapContext);
    const language = i18n.language;

    return (
        <div className={styles.viewAllFloor} id="viewAllFloor">
          {floorList?.length > 0 && floorList?.map((floorItem, index) => {
            return (
              <div key={index} 
                   className={`viewFloorItem ${floorItem.mapFloorId === activeFloorId ? 'viewFloorItemOn': ''}`} 
                   onClick={() => changeFloorItem(floorItem.mapFloorId)}> 
                <span className={styles.titleFloor}>{floorItem?.title}</span>
                <div className={styles.mainSubjectTitle}>
                  {floorItem?.subject?.[language]}
                </div>
                <div className="subTileFloor">
                  {floorItem.mapFloorId === FLOOR_MAP.F1 && 
                    <span><b>1F</b> {t('common.subTileOffice')}</span>
                  }
                  {floorItem.mapFloorId === FLOOR_MAP.B1 && 
                    <span><b>B1F</b> {t('common.subTileParking')}</span>
                  }
                </div>

              </div>
            );
          })}
        </div>
    )
};

export default FloorViewAll;