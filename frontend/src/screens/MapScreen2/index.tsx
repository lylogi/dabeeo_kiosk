import FloorSubject from "../../components/FloorSubject";
import Map2 from "../../components/Map2";
import MapSideBar from "../../components/MapSideBar";
import style from "./style.module.scss";
import { useContext } from "react";
import { MapContext } from "../../context/MapContext";

function MapScreen2() {
    const {viewAllFloor} = useContext(MapContext);
    return (
        <div className={style.mapWapper}>
            <MapSideBar />
            <div className={style.rightMap} >
                {!viewAllFloor && <FloorSubject />}
                    <Map2 />
                {/* {!viewAllFloor && <div className={style.utilitiesBar} id="utilitiesBar">
                    <FacilitiesBar />
                </div>} */}
            </div>
        </div>
    )
}

export default MapScreen2;