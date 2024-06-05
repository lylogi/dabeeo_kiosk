import { useCallback, useContext, useEffect } from "react";
import { MapContext } from "../../context/MapContext";
import VerticalSwiper from "../VerticalSwiper";
import { SwiperSlide } from "swiper/react";
import styles from "./style.module.scss";
import { LogContext } from '../../context/LogContext';
import { LOG_TYPE, LOG_KIOSK_SUB_TYPE } from '../../constants/logType';

const FloorSwiper = () => {
    const { map, floorList, activeFloorId, activeSwiperFloorId, setActiveFloorId, setSwiperFloor, swiperFloor, setActiveSwiperFloorId, setViewLocation, getFloorFacilitiesCat, setViewAllFloor, clearRouteSimulation } = useContext(MapContext);
    const { saveLog, branchId } = useContext(LogContext);
    
    useEffect(() => {
        if(swiperFloor && activeFloorId && !swiperFloor.destroyed) {
            const floorItemFocus = floorList?.indexOf(floorList?.find(floor => floor.mapFloorId === activeSwiperFloorId));
            swiperFloor.slideTo(floorItemFocus - 2);
        }
        getFloorFacilitiesCat();
    }, [activeSwiperFloorId, swiperFloor, map]);

    const handleClickItem = useCallback((floorItem: any) => {        
        const data = {
            floor_id: floorItem?.mapFloorId,
            branch_id: branchId,
            sub_type: LOG_KIOSK_SUB_TYPE.FLOOR_CLICK
        }
        saveLog(LOG_TYPE.KIOSK, data);
        setActiveFloorId(floorItem?.mapFloorId);

        setActiveSwiperFloorId(floorItem?.mapFloorId);
        setViewLocation(false);
        setViewAllFloor(false);
        clearRouteSimulation();
        map?.markers.clearAll();
    }, [map, clearRouteSimulation])

    return (
        <div className={`${styles.floorList}`} id="floorList">
            <div className={`floorItem floorItemOn`} >3F</div>
        </div>
    )
}

export default FloorSwiper;