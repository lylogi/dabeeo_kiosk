import { useCallback, useContext, useEffect, useState } from 'react';
import styles from './style.module.scss';
import { MapContext } from '../../context/MapContext';
import { Cookies } from 'react-cookie';
import { LOCAL_STORAGE_KEY } from '../../constants/localStorage';
import Instruct from '../Instruct';
import axios from 'axios';
import { setMyLocation } from '../../helper/map';

const MapRender = ({ }) => {
    const { isRouteMode, setOpenRouteMode, setIsRouteMode, poiIdRoute, viewAllFloor, setActiveSwiperFloorId, mapContent, map, getPoiById, currentFloorId, handleAddMarker, initMap, activeFloorId } = useContext(MapContext);
    const cookies = new Cookies();

    const coordinateX = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.COORDINATE_X) || "");
    const coordinateY= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.COORDINATE_Y) || "");
    const [ showIntruct, setShowIntruct ] = useState(false);
    const [ initMapStatus, setInitMapStatus] = useState(false);

    const onFloorChange = (e: any) => {
        setActiveSwiperFloorId(e?.detail?.id);
        if(e?.detail?.id === currentFloorId) {
            setMyLocation(map, coordinateX, coordinateY); ////// Set my location
        }
    }

    useEffect(() => {
        const mapContainer = document.getElementById("map-view");
        // Event change floor where router
        mapContainer?.addEventListener("floor-changed", onFloorChange);

        const canvas = mapContainer?.querySelector('canvas');
        if (canvas instanceof HTMLCanvasElement) {
            canvas.addEventListener('webglcontextlost', onLostContext);
            canvas.addEventListener('contextlost', onLostContext);
        }

        return () => {
            mapContainer?.removeEventListener("floor-changed", onFloorChange);
            canvas?.removeEventListener('webglcontextlost', onLostContext);
            canvas?.removeEventListener('contextlost', onLostContext);
        }
    }, [map])

    const onLostContext = () => {
        let message = 'webglcontextlost';
        axios.get(import.meta.env.VITE_API_BASE_URL+ 'sync/setStatus?status=2&message='+message)
    }
    
    useEffect(() => {
        (async () => {
            try {
                const view = document.getElementById('view');
                await initMap(view);
                setInitMapStatus(true);
            } catch (e) {
                console.error(e);
            } finally {
                if (!cookies.get('showZoomIntruct') || cookies.get('showZoomIntruct') === "show") {
                    setShowIntruct(true);
                    cookies.set('showZoomIntruct', 'hiden', { path: '/' });
                }
            }
        })();
    }, []);

    useEffect(() => {
        if(!initMapStatus) return;

        if(activeFloorId === currentFloorId) {
            setMyLocation(map, coordinateX, coordinateY);
        }
        if (poiIdRoute && !isRouteMode) {
            const poi = getPoiById(poiIdRoute, mapContent);
            handleAddMarker(poi, map);
        }

        if(isRouteMode) {
            setOpenRouteMode(true);
            setIsRouteMode(false)
        }

    }, [initMapStatus]);

    return (
        <>
            {showIntruct && <Instruct show={showIntruct} setShow={setShowIntruct} />}
            <div id='view' className={`${styles.mapView} ${viewAllFloor ? 'd-none' : 'd-flex'}`}></div>
        </>
    )
}

export default MapRender;