import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import { LOCAL_STORAGE_KEY } from "../../constants/localStorage";
import FloorViewAll from "../FloorViewAll";
import FacilitieDetail from "../FacilitieDetail";
import PoiDetail from "../PoiDetail";
import { LOG_POI_SUB_TYPE, LOG_TYPE } from "../../constants/logType";
import RouterMode from "../RouterMode";
import { NAVI_MODE } from "../../constants/common";
import Loading from "../Loading";
import MapRender from "../MapRender";
import { catCodeNoSaveLog } from "../../constants/categories";
import { LogContext } from "../../context/LogContext";

const Map2 = ({ }) => {
    const { setPoiIdRoute,
        setOpenRouteMode,
        activeFloorId,
        poisOnShowMarker,
        onLoading,
        poiIdRoute,
        map,
        getFloorFacilitiesCat,
        viewAllFloor,
        resetContextState,
        handleAddMarker,
        clearRouteSimulation,
        setNaviMode,
        naviMode,
        setActiveFloorId,
        activeSwiperFloorId,
        floorFacilitiesCat } = useContext(MapContext)

    const [facilitieMapId, setFacilitieMapId] = useState('');
    const [poiMapId, setPoiMapId] = useState('');
    const [subType, setSubType] = useState(0);
    const { setSaveLogType } = useContext(LogContext);

    const coordinateX = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.COORDINATE_X) || "");
    const coordinateY = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.COORDINATE_Y) || "");

    useEffect(() => {
        const mapContainer = document.getElementById("map-view");
        const handleClickObject = () => {
            setActiveFloorId(activeSwiperFloorId);
            clearRouteSimulation();
        }
        mapContainer?.addEventListener('object-click', handleClickObject);
        mapContainer?.addEventListener('void-click', handleClickObject);
        return () => {
            mapContainer?.removeEventListener('object-click', handleClickObject);
            mapContainer?.removeEventListener('void-click', handleClickObject);
        }
    }, [map, clearRouteSimulation, activeSwiperFloorId])

    useEffect(() => {
        return () => {
            setNaviMode(NAVI_MODE.STOP);
            resetContextState();
        }
    }, [])

    useEffect(() => {
        if (!map || !activeFloorId) {
            return;
        }

        map?.context?.changeFloor(activeFloorId);
        map?.control?.focusTo({
            focus: {
                type: 'OBJECT_ALL',
            },
            transition: true,
            padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }
        })
        map?.control.changeZoom({ zoom: 22 });
    }, [activeFloorId])

    useEffect(() => {
        async () => {
            await getFloorFacilitiesCat();
        }
    }, [activeSwiperFloorId])

    useEffect(() => {
        const handlePoiClick = (e: any) => {
            if (!e?.detail || e?.detail?.length < 1) return;
            const poi = e?.detail ? e?.detail[0] : null;
            if (poi && naviMode == NAVI_MODE.STOP) {
                const facilitiesBarCatCode = floorFacilitiesCat?.map((item: { code: any; }) => item?.code);
                let poiIdClick = poi.id;
                let poiCategoryCode = poi.categoryCode;
                handleAddMarker(poi, map);
                if (facilitiesBarCatCode?.includes(poiCategoryCode)) { // Check POI type (Shop or Facilitie)
                    if (!catCodeNoSaveLog?.includes(poiCategoryCode)) {
                        setSubType(LOG_TYPE.MAP);
                        setSaveLogType(LOG_POI_SUB_TYPE.POI_CLICK);
                    }
                    setFacilitieMapId(poiIdClick);
                    setPoiMapId('');
                } else {
                    setSubType(LOG_TYPE.MAP);
                    setSaveLogType(LOG_POI_SUB_TYPE.POI_CLICK);
                    setPoiMapId(poiIdClick);
                    setFacilitieMapId('');
                }
                //map?.control?.moveTo({ position: poi?.position });
            }
        }
        const mapContainer = document.getElementById("map-view");
        mapContainer?.addEventListener('poi-click', handlePoiClick);
        return () => {
            mapContainer?.removeEventListener('poi-click', handlePoiClick);
        }
    }, [floorFacilitiesCat, map, naviMode])

    useEffect(() => {
        const mapContainer = document.getElementById("map-view");
        const markerClick = (e: any) => {
            const poiPostionX = e?.detail?.[0]?.position?.x;
            const poiPostionY = e?.detail?.[0]?.position?.y;
            let poiMarker: any;
            let poiMarkerId = poiIdRoute || '';
            if (poisOnShowMarker?.length > 0 && poiPostionX && poiPostionY) {
                poiMarker = poisOnShowMarker.find((item: any) => item?.position?.x === poiPostionX && item?.position?.y === poiPostionY);
                poiMarkerId = poiMarker?.id;
            }

            if (e) {
                const poiCategoryCode = poiMarker?.categoryCode;
                const facilitiesBarCatCode = floorFacilitiesCat?.map((item: { code: any; }) => item?.code);
                if (facilitiesBarCatCode?.includes(poiCategoryCode)) {
                    // Check POI type (Shop or Facilitie)
                    setFacilitieMapId(poiMarkerId);
                    setPoiMapId('');
                } else {
                    setPoiMapId(poiMarkerId);
                    setFacilitieMapId('');
                }
            }
        };
        mapContainer?.addEventListener("marker-click", markerClick, true);
        return () => {
            mapContainer?.removeEventListener("marker-click", markerClick, true);
        }
    }, [map, poisOnShowMarker, floorFacilitiesCat])

    return (
        <>
            <div className={viewAllFloor ? 'd-flex justify-content-center' : 'd-none'}>
                <FloorViewAll />
            </div>
            {onLoading ? <Loading /> : ''}
            <MapRender />
            {poiMapId && <PoiDetail poiMapId={poiMapId} subType={LOG_TYPE.MAP} setPoiMapId={setPoiMapId} setOpenRouteMode={setOpenRouteMode} setPoiIdRoute={setPoiIdRoute} keyword={''} tagId={0} />}
            {facilitieMapId && <FacilitieDetail facilitieMapId={facilitieMapId} subType={LOG_TYPE.MAP} setFacilitieMapId={setFacilitieMapId} />}
            <RouterMode coordinateX={coordinateX} coordinateY={coordinateY} setNaviMode={setNaviMode} naviMode={naviMode} />
        </>
    )
}

export default Map2;
