import styles from './style.module.scss';
import FloorTilte from "../FloorTitle";
import FloorMiniView from "../FloorMiniView";
import MapControlBtn from "../MapControlBtn";
import FloorSwiper from "../FloorSwiper";

const MapSideBar = () => {

    return (
        <div className={styles.mapControl}>
            <FloorTilte />
            <div>
                <MapControlBtn />
                <div className={styles.floorList}>
                    <FloorSwiper />
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default MapSideBar;