import { t } from 'i18next';
import { MapContext } from '../../context/MapContext';
import styles from './style.module.scss';
import { useContext } from 'react';

const MapControlBtn = () => {
    const { viewAllFloor, viewLocation, floorList, handleViewLocation, handleViewAllFloor } = useContext(MapContext);

    return (
        <div className={styles.btMapControl} id="btMapControl">
          {floorList?.length > 0 &&
            <>
              {/* <div className={`${styles.btMapControlItem} ${viewAllFloor && 'btMapControlItemOn'}`} onClick={handleViewAllFloor} id="btAllFloor">{t('button.buttonAllFloor')}</div> */}
              <div className={`${styles.btMapControlItem} ${viewLocation && 'btMapControlItemOn'}`} id="btMyLocation" onClick={handleViewLocation}>{t('button.buttonLocation')}</div>
            </>
          }
        </div>
    )
}

export default MapControlBtn;