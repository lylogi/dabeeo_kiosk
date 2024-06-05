import { useState, ReactNode, createContext, useEffect, useMemo, useCallback, useContext } from 'react';
import useFloorList from '../hooks/floors/useFloorList';
import { Floor } from '../hooks/floors/floorId';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { facilitiesBarCatCode, facilitiesFixedOrder } from '../constants/categories';
import ImgMarker from '../images/maker_icon.svg';
import ImgLocation from '../images/locationo_now.png';
import { LANGUAGE_TYPE, NAVI_MODE } from '../constants/common';
import { LogContext } from '../context/LogContext';
import { LOG_TYPE, LOG_KIOSK_SUB_TYPE } from '../constants/logType';
import { useTranslation } from 'react-i18next';
import { MENU_TYPE } from '../constants/menu';
import { setMyLocation } from '../helper/map';
import { useLocation } from 'react-router-dom';

type MapContext = {
  floorList: Floor[];
  viewLocation: boolean;
  viewAllFloor: boolean;
  currentFloorId: string;
  activeFloorId: string;
  setActiveFloorId: (value: string) => void,
  activeFloorById: any;
  setMapContent: any;
  floorFacilitiesCat: any;
  setMap: any;
  togglePoiByCategoryCode: any;
  map: any;
  getFloorFacilitiesCat: any;
  handleViewLocation: any;
  handleViewAllFloor: any;
  changeFloorItem: any;
  swiperFloor: any;
  setSwiperFloor: any;
  getPoiById: any;
  mapContent: any;
  activeSwiperFloorId: string;
  setActiveSwiperFloorId: any;
  setViewLocation: (value: boolean) => void;
  setOnLoading: (value: boolean) => void;
  onLoading: boolean;
  poisOnShowMarker: any;
  setPoisOnShowMarker: any;
  poiIdRoute: any;
  setPoiIdRoute: any;
  openRouteMode: any;
  setOpenRouteMode: any;
  handleAddMarker: any;
  setIsRouteMode: any;
  isRouteMode: boolean;
  setViewAllFloor: any;
  resetContextState: any;
  clearRouteSimulation: any;
  setNaviMode: any;
  naviMode: string;
  dabeeoMaps: any;
  initMap: (parent: HTMLElement) => any; 
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const MapContext = createContext<MapContext>(
  {} as MapContext
);

type Props = {
  children: ReactNode;
};

export function MapProvider({ children }: Props) {
  const [{ data, error, loading }] = useFloorList();
  const [ floorList, setFloorList ] = useState([]);
  const [ viewLocation, setViewLocation ] = useState(false);
  const [ viewAllFloor, setViewAllFloor ] = useState(false);
  const [ currentFloorId, setCurrentFloorId ] = useState(localStorage.getItem(LOCAL_STORAGE_KEY.FLOOR_ID) || '');
  const [ activeFloorId, setActiveFloorId ] = useState(localStorage.getItem(LOCAL_STORAGE_KEY.FLOOR_ID) || '');
  const [ activeSwiperFloorId, setActiveSwiperFloorId] = useState(localStorage.getItem(LOCAL_STORAGE_KEY.FLOOR_ID) || '');
  const [ facilitiesMapCat, setFacilitiesMapCat ] = useState<any[]>([]);
  const [ mapContent, setMapContent ] = useState<any>();
  const [ floorFacilitiesCat, setFloorFacilitiesCat ] = useState();
  const [ map, setMap ] = useState<any>();
  const [swiperFloor, setSwiperFloor] = useState();
  const [ onLoading, setOnLoading ] = useState(false);
  const [ poisOnShowMarker, setPoisOnShowMarker ] = useState([]);
  const [ poiIdRoute, setPoiIdRoute ] = useState('');
  const [ openRouteMode, setOpenRouteMode ] = useState<any>();
  const [ isRouteMode, setIsRouteMode] = useState(false);
  const coordinateX = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.COORDINATE_X) || "0");
  const coordinateY= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.COORDINATE_Y) || "0");
  const [naviMode, setNaviMode] = useState(NAVI_MODE.STOP);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language;
  const { saveLog, branchId } = useContext(LogContext);
  const dabeeoMaps = new dabeeo.Maps();

  useEffect(() => {
    if(data){
      setFloorList(data?.data);
    }
  }, [data])

  const clearRouteSimulation = useCallback(() => {
    if (naviMode != NAVI_MODE.STOP) {
        map?.routeSimulation?.clear();
        setNaviMode(NAVI_MODE.STOP);
        setOpenRouteMode(false);
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
    }
    
  }, [naviMode, map])

  useEffect(() => {
    const mapId = localStorage.getItem(LOCAL_STORAGE_KEY.MAP_ID) || '';

    const mapDataOption: any = {
        baseUrl: `${import.meta.env.VITE_SERVER_URL}maps`,
        mapId,
        serverType: 'SERVER_LOCAL',
    };

    (async() => {
      const goMapData: any = await dabeeoMaps?.getMapData(mapDataOption);
      setMapContent(goMapData);
    })()
  }, [])

  const resetContextState = useCallback(() => {
    setOpenRouteMode(false);
    setActiveFloorId(currentFloorId);
    setActiveSwiperFloorId(currentFloorId);
    setViewAllFloor(false);
    setViewLocation(false);
    setPoisOnShowMarker([]);
    setPoiIdRoute('');
    clearRouteSimulation();
    map?.markers.clearAll();
    map?.mylocation.clear();
  }, [map, clearRouteSimulation]);

  const activeFloorById = useMemo(() => {
    return floorList.find(item => item?.mapFloorId === activeSwiperFloorId)
  }, [floorList, activeSwiperFloorId]);

  useEffect(() => {
    const mapCat = mapContent?.dataMapInfo?.getMapInfo()?.poiCategories || [];
    let facilitiesMapCat: any[] = [];
    mapCat?.forEach(cat => {
      if (facilitiesBarCatCode?.includes(cat?.code)){
        cat.childList.length > 0 ? facilitiesMapCat.push(...cat.childList) : facilitiesMapCat.push(cat)
      }
    });

    // Merge the arrays by code
    const mergedArray = facilitiesMapCat?.map(itemA => {
      const matchingItem = facilitiesFixedOrder?.find(itemB => itemB.code === itemA.code);
      return {
        ...itemA,
        ...(matchingItem && { order: matchingItem.order || 100, iconImage: matchingItem.iconImage })
      };
    });

    // Sort the merged array by order
    mergedArray.sort((itemA, itemB) => (itemA.order || Infinity) - (itemB.order || Infinity));
    getFloorFacilitiesCat(mergedArray);
    setFacilitiesMapCat(mergedArray);
  }, [mapContent]);

  const getFloorFacilitiesCat = useCallback(async (mapCat?: any) => {
    if(!activeSwiperFloorId) {
      return;
    }
    let mapCategories = mapCat || facilitiesMapCat;
    const dataCurrentFloor = await mapContent?.floorData?.getFloorData(activeSwiperFloorId);
    const catCodes = dataCurrentFloor?.pois?.map((item: any) => item.categoryCode);
    const floorFacilitiesCat = mapCategories?.filter((item: any) => catCodes?.includes(item.code));
    setFloorFacilitiesCat(floorFacilitiesCat);
  }, [facilitiesMapCat, activeSwiperFloorId, mapContent]);

  const togglePoiByCategoryCode = useCallback(async (code: any, activeFloorId: string) =>  {
    clearRouteSimulation();
    setActiveFloorId(activeFloorId);
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
    const data = {
      facilities_cate: code,
      branch_id: branchId,
      sub_type: LOG_KIOSK_SUB_TYPE.FACILITIES_CLICK
    }
    saveLog(LOG_TYPE.KIOSK, data);
    const poisCat = mapContent?.dataPoi?.pois?.filter((poi: any) => poi.categoryCode === code && poi.floorId === activeFloorId);
    setPoisOnShowMarker(poisCat);

    await map?.markers.clearAll();

    const poisMaker = poisCat?.map((item: IPoi) => {
      return{
        x: item?.position?.x,
        y: item?.position?.y,
        id: item?.id,
        iconOption: {
          positionZ: 25,
          anchor: {
            x: 0.5,
            y: -0.15
          },
          width: 38,
          height: 52,
          visibleIcon: true,
          iconUrl: ImgMarker,
        },
        floorId: item.floorId,
      }});

    await map?.markers?.set({
      marker: poisMaker,
    });
  }, [mapContent, map]);

  
  const handleAddMarker = useCallback((poi: any, mapObject: any = map) => {
    mapObject?.markers?.clearAll();
    setPoisOnShowMarker([poi]);
    const currentMarker = mapObject?.markers?.set({
      marker: [
          {
          x: poi.position.x,
          y: poi.position.y,
          iconOption: {
              positionZ: 25,
              async: true,
              anchor:{                        
                  x : 0.5,
                  y : 0.1
              },
              width: 38,
              height: 52,
              visibleIcon: true,
              iconUrl: ImgMarker,
          },
          floorId: poi.floorId,
          },
      ],
    });
} , [])

  const handleViewLocation = useCallback(async() => {
    const data = {
      branch_id: branchId,
      button: 'location',
      sub_type: LOG_KIOSK_SUB_TYPE.BUTTON_CLICK
    }
    saveLog(LOG_TYPE.KIOSK, data);
    await map?.markers.clearAll();
    setViewLocation(true);
    setViewAllFloor(false);
    setActiveFloorId(currentFloorId);
    setActiveSwiperFloorId(currentFloorId);
    clearRouteSimulation();
    const locationOption = {
      x: coordinateX,
      y: coordinateY,
      iconOption: {
          positionZ: 0,
          iconUrl: ImgLocation,
          width: 36,
          height: 36,
          anchor: {
              x: 0.5,
              y: 0.5
          }
      },
      onActive: true,
      isKeep: true,
    };
    await map?.context.changeFloor(currentFloorId);
    map?.control.reset({transition:true});
    await map?.markers.clearAll();
    await map?.mylocation?.set(locationOption);
  }, [map, clearRouteSimulation])

  const handleViewAllFloor = useCallback(() => {
    const data = {
      branch_id: branchId,
      button: 'floor',
      sub_type: LOG_KIOSK_SUB_TYPE.BUTTON_CLICK
    }
    saveLog(LOG_TYPE.KIOSK, data);
    setViewAllFloor(true);
    setViewLocation(false);
    setActiveFloorId("");
    setActiveSwiperFloorId("");
    clearRouteSimulation();
  }, [clearRouteSimulation])

  const changeFloorItem = useCallback(async (floorId: string) => {
    const data = {
      floor_id: floorId,
      branch_id: branchId,
      sub_type: LOG_KIOSK_SUB_TYPE.FLOOR_CLICK
    }
    saveLog(LOG_TYPE.KIOSK, data);
    setViewAllFloor(false);
    setViewLocation(false);
    setActiveFloorId(floorId);
    setActiveSwiperFloorId(floorId);
    clearRouteSimulation();
    map?.control.reset({transition:true});
  }, [map, clearRouteSimulation ]);

  useEffect(() => {
    map?.context.changeLanguage(lang);
    setActiveFloorId(activeSwiperFloorId);
    clearRouteSimulation();
  }, [lang])

  const getPoiById = useCallback((pid : any, mapDabeeo = mapContent) => {
    let poi = null;
    const dataPois = mapDabeeo?.dataPoi?.pois;
    if (dataPois && dataPois.length && pid != '') {
        let p = dataPois.find(item => item.id == pid);
        if (typeof p !== 'undefined') {
            poi = p;
        }
    }
    return poi;
  }, [mapContent])

  const initMap = useCallback(async (parent: HTMLElement) => {
    setOnLoading(true);
    const mapContainer = document.createElement('div');
    mapContainer.style.width = '100%';
    mapContainer.style.height = '100%';
    mapContainer.setAttribute("id", "map-view");
    parent.appendChild(mapContainer);

    const mapOption: any = {
      camera: "2d",
      floor: activeSwiperFloorId,
      spriteKeepRotation: true,
      showWaterMarker: false,
      language: lang || LANGUAGE_TYPE.VI,
    };
    const dabeeoMap = await dabeeoMaps.showMap(mapContainer, mapOption, mapContent);
    dabeeoMap?.control.setOption({ 
      touchOption : {
        enableRotate : false,
      },
      mouseOption : {
        enableRotate : false,
      },
      controlRangeOption : {
        zoom : {
            min: 19,
            max: 24
        }
      }
    });

    setMap(dabeeoMap);
    if(activeSwiperFloorId === currentFloorId) {
      setMyLocation(dabeeoMap, coordinateX, coordinateY); ////// Set my location
  }
    setOnLoading(false);
    return [dabeeoMap];
  }, [dabeeoMaps]);

  const removeMap = () => {
    if (map) {
      map?.context?.cleanup();
      const mapContainer = document.getElementById("map-view");
      if (mapContainer?.parentNode) {
          mapContainer.parentNode.removeChild(mapContainer);
      }
      setMap(null);
    }
  }

  useEffect(() => {
    if (location && location.state) {
      const { type } = location.state;
      if(type !== MENU_TYPE.MAP) {  
        resetContextState();
        removeMap();
      }
    } else {
      resetContextState();
      removeMap();
    }
  }, [location])
  
  return (
    <MapContext.Provider value={{ floorList,
      viewLocation,
      viewAllFloor,
      activeFloorId,
      setActiveFloorId,
      activeFloorById,
      setMapContent,
      togglePoiByCategoryCode,
      getFloorFacilitiesCat,
      clearRouteSimulation,
      handleViewLocation,
      setMap,
      floorFacilitiesCat,
      handleViewAllFloor,
      changeFloorItem,
      setSwiperFloor,
      swiperFloor,
      map,
      mapContent,
      getPoiById,
      activeSwiperFloorId,
      setActiveSwiperFloorId,
      setViewLocation,
      setOnLoading,
      onLoading,
      poisOnShowMarker,
      poiIdRoute,
      setPoiIdRoute,
      setPoisOnShowMarker,
      openRouteMode,
      setOpenRouteMode,
      handleAddMarker,
      setIsRouteMode,
      isRouteMode,
      setViewAllFloor,
      resetContextState,
      setNaviMode,
      naviMode,
      dabeeoMaps,
      initMap,
      currentFloorId }}>
      {children}
    </MapContext.Provider>
  );
}
