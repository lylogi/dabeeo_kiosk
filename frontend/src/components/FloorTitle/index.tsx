import { useContext } from 'react';
import style from './style.module.scss';
import { MapContext } from '../../context/MapContext';
import { t } from 'i18next';

const FloorTilte = () => {
    const { activeFloorById, viewAllFloor } = useContext(MapContext);
    return (
        <>
            {
                <div className={style.floorNameCt} >
                    3F
                </div>
            }
        </>
    )
}

export default FloorTilte;