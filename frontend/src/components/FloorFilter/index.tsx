import styles from './style.module.css';
import { useCallback, useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import useFloorList from "../../hooks/floors/useFloorList";
import { LOG_KIOSK_SUB_TYPE, LOG_TYPE } from '../../constants/logType';
import { LogContext } from '../../context/LogContext';

const FloorFilter = () => {
    const [{ data }] = useFloorList();
    const { floorId, setFloorId, type } = useContext(SearchContext);
    const { branchId, saveLog} = useContext(LogContext);
    
    const handleOnClick = useCallback((mapFloorId: string) => {
        setFloorId(mapFloorId);
        const data = {
            floor_id: mapFloorId,
            type_menu: type,
            branch_id: branchId,
            sub_type: LOG_KIOSK_SUB_TYPE.FLOOR_CLICK
        }
        if (mapFloorId !== '') {
            saveLog(LOG_TYPE.KIOSK, data);
        }
    }, [])

    return (
        <div className={styles.floorFilterWrapper}>
            <div className={`${styles.floorItem } ${floorId === '' && styles.floorActive} ${styles.allFloor}`} style={{order: 0}} onClick={() => handleOnClick(''
                        )}>All</div>
            {data && data?.data?.length > 0 && data?.data.map(floor => {
                return(
                    <div className={`${styles.floorItem} ${floorId === floor.id && styles.floorActive}`} 
                         style={{order: data.data.length - floor.order}}
                         key={floor.id}
                         onClick={() => handleOnClick(floor.id)}>
                        {floor.title}
                    </div>
                )
            })}
        </div>
    );
};

export default FloorFilter ;
