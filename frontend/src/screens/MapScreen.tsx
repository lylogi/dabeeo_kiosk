import { useCallback, useContext, useEffect, useState } from 'react'
import { Maps, DabeeoMap, DabeeoMapData, SERVER_TYPE } from 'dabeeomaps';
import Loading from '../components/Loading';
import Instruct from '../components/Instruct';
import RouterMode from '../components/RouterMode';
import Map from '../components/Map';
import InstructMove from '../components/InstructMove';
import ButtonShop from "./../images/shop_ico_big.svg";
import IconInstructElavator from "./../images/icon_elavator_move.svg";
import IconInstructEscalator from "./../images/escalator_icon.svg";
import ImgMarker from './../images/maker_icon.svg';
import ImgLocation from './../images/locationo_now.png';
import FinishMarker from './../images/finish_marker.svg';
import RunIcon from './../images/run_icon.svg';
import PoiDetail from '../components/PoiDetail';
import FacilitieDetail from '../components/FacilitieDetail';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { SET_TIME } from '../constants/time';
import { IMapDataOption } from 'dabeeomaps/dist/src/model/network/IMapDataOption';
import { useTranslation } from 'react-i18next';
import { facilitiesBarCatCode, facilitiesFixedOrder, catCodeNoSaveLog, mapCatCodeParking } from '../constants/categories';
import { LOG_TYPE,LOG_POI_SUB_TYPE} from './../constants/logType';
import { LogContext } from '../context/LogContext';
import InstructMoveDone from '../components/InstructMoveDone';

function MapScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const floorFromPath = searchParams.get('floorId');
  const [map, setMap] = useState<DabeeoMap | null>(null);
  const [poiMapId, setPoiMapId] = useState("");
  const [subType, setSubType] = useState(0);
  const [poiRouter, setPoiRouter] = useState("");
  const [modeRouter, setModeRouter] = useState();
  const [listRouter, setListRouter] = useState();
  const [facilitieMapId, setFacilitieMapId] = useState("");
  const [loadingMap, setLoadingMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showIntruct, setShowIntruct] = useState(false);
  const [naviMode, setNaviMode] = useState("");
  const [mapMode, setMapMode] = useState(true);
  const [showIntructMove, setShowIntructMove] = useState(false);
  const [showIntructMoveDone, setShowIntructMoveDone] = useState(false);
  const [showRouter, setShowRouter] = useState(false);
  const [floorKios, setFloorKios] = useState(localStorage.getItem('floor_id'));
  const [floorFocus, setFloorFocus] = useState(floorFromPath || localStorage.getItem('floor_id'));
  const [floorCurentName, setFloorCurentName] = useState("");
  const [floorCurentId, setFloorCurentId] = useState("");
  const [currentPoi, setCurrentPoi] = useState("");
  const [intructTextMove, setIntructTextMove] = useState("");
  const [intructTextMoveDone, setIntructTextMoveDone] = useState("");
  const [mapContent, setMapContent] = useState<DabeeoMapData | undefined>(); 
  const { saveLog, setSaveLogType, saveLogType } = useContext(LogContext);

  let MAP_ID = localStorage.getItem('map_id'); // Get map id
  const pidClick = searchParams.get('PO');
  const typeClickPoi = searchParams.get('type');
  const typeRouter = searchParams.get('RT');
  let catePoi = searchParams.get('catePoi');
  const dabeeoMaps = new Maps();
  const cookies = new Cookies();   
  const { t, i18n } = useTranslation();
  const { language } = i18n;  
  const lang = i18n.language;

  /// Set location kios  
  let coordinateX = localStorage.getItem('coordinate_x'); // CoordinateX of kios
  let coordinateY = localStorage.getItem('coordinate_y'); //CoordinateY of kios
  const setMyLocation = (map: any, coordinateX: any, coordinateY: any) => {
    const locationOption = {
      x: coordinateX,
      y: coordinateY,
      iconOption: {
        positionZ: 23,
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
      // animate: {
      //   color: "#1A68DA",
      //   opacity: 0.2,
      //   desireScale: 1.5,
      //   duration: 1000,
      // },
    };
    map?.mylocation?.set(locationOption);
  }

  let gCoordinate = {
    x: coordinateX,
    y: coordinateY,
  }
  let routeMode : any = ['stairs', 'escalator', 'elevator']; 
  const gPathColor = "#1B68DA";
  const giPathWidth = 14;
  let naviResponseObj = {};

  const removeMap = () => {
    if (map) {
      map.context.cleanup();
      const mapContainer = document.querySelector(".map");
      if (mapContainer?.parentNode) {
        mapContainer.parentNode.removeChild(mapContainer);
      }
      setMap(null);
    }
  }

  useEffect(() => {
    if(poiRouter){
      const poiId = document.getElementById("poi-choice");
      if(poiId){        
          poiId.textContent = poiRouter;
          poiId.dispatchEvent(new Event('change'));
      }
    }
  }, [poiRouter]);

  useEffect(() => {
    if(modeRouter){
      const poiId = document.getElementById("router-mode");
      if(poiId){        
          poiId.textContent = modeRouter;
          poiId.dispatchEvent(new Event('change'));
      }
    }
  }, [modeRouter]);
  
  useEffect(() => {
    if(floorCurentId){
      const floorId = document.getElementById("floor-choice");
      if(floorId){        
        floorId.textContent = floorCurentId;
        floorId.dispatchEvent(new Event('change'));
      }
    }
  }, [floorCurentId]);

  useEffect(() => {
    if(naviMode) {
      const mapContainer = document.getElementById("map_view");
      mapContainer?.addEventListener("floor-changing", (e) => {
        if(naviMode === 'NAVIGATION'){
          setShowIntructMove(true); 
          setTimeout (() => {
            setShowIntructMove(false);
          },SET_TIME.TIME_SHOW_INTRUCT_MOVE);
        }
      });

      const naviStatus = document.getElementById("navi-mode");
      if(naviStatus){        
        naviStatus.textContent = naviMode;
        naviStatus.dispatchEvent(new Event('change'));
      }
    }
    
    if(floorCurentName){

      setIntructTextMove(t('instruct.changeFloor') + floorCurentName);

      if(facilitiesFixedOrder?.find(item => item.code == currentPoi?.categoryCode) || facilitiesBarCatCode?.includes(currentPoi?.categoryCode) || mapCatCodeParking === currentPoi?.categoryCode){
        setIntructTextMoveDone(t('instruct.facilitiesPosition') + floorCurentName);
      }else {
        setIntructTextMoveDone(t('instruct.shopPosition') + floorCurentName);
      }
    }
  }, [naviMode]);

  useEffect(() => {
    if(floorCurentName){

      setIntructTextMove(t('instruct.changeFloor') + floorCurentName);

      if(facilitiesFixedOrder?.find(item => item.code == currentPoi?.categoryCode) || facilitiesBarCatCode?.includes(currentPoi?.categoryCode) || mapCatCodeParking === currentPoi?.categoryCode){
        setIntructTextMoveDone(t('instruct.facilitiesPosition') + floorCurentName);
      }else {
        setIntructTextMoveDone(t('instruct.shopPosition') + floorCurentName);
      }
    }
  }, [floorCurentName]);

  useEffect(() => {
    if(floorFocus === floorKios) {
      setMyLocation(map,coordinateX,coordinateY); ////// Set my location
    }
    if(!poiRouter) {
      const naviBar = document.getElementById("navi-mode");
      if(naviBar?.textContent){
        if(naviBar?.textContent === "NAVIGATION"){        
          map?.routeSimulation?.clear();
          setNaviMode("NORMAL");
        }
        if(naviBar?.textContent === "START"){        
          map?.routeSimulation.stop();
          setNaviMode("STOP");
          setTimeout(() => {
          map?.routeSimulation?.clear();
          },200);
        }
      }
    }
  }, [floorFocus])

  useEffect(() => {
      map?.context.changeLanguage(language);
      map?.context.changeFloor(floorFocus);
      const naviBar = document.getElementById("navi-mode");
      if(naviBar?.textContent){
        if(naviBar?.textContent === "NAVIGATION"){        
          map?.routeSimulation?.clear();
          setNaviMode("NORMAL");
        }
        if(naviBar?.textContent === "START"){        
          map?.routeSimulation.stop();
          setNaviMode("STOP");
          setTimeout(() => {
            map?.routeSimulation?.clear();
          },200);
        }
      }

  }, [lang]);

  //// Funtion area

  const addMap = useCallback(async (parent: HTMLElement) => {
    const mapContainer = document.createElement("div");
    mapContainer.classList.add("map");
    mapContainer.setAttribute("id","map_view");
    parent.appendChild(mapContainer);
    let poiIdClick = "";
    setLoadingMap(true);
    setSubType(LOG_TYPE.MAP);
    const mapId : any = MAP_ID;
    const mapDataOption: IMapDataOption = {
      baseUrl: `${import.meta.env.VITE_SERVER_URL}maps`,
      mapId,
      serverType: SERVER_TYPE.LOCAL,
    };

    const goMapData: DabeeoMapData = await dabeeoMaps?.getMapData(mapDataOption);
    const mapOption : any = {
      camera: "2d",
      floor: floorFromPath || floorKios,
      spriteKeepRotation:true,
      showWaterMarker: false,
      enableSleepMode: true, 
      sleepModeOption: {
          sleepModeTimeout: 5000, 
          mergedMesh: {
              object: true,
          }
      }
    };
    const dabeeoMap = await dabeeoMaps?.showMap(
      mapContainer,
      mapOption,
      goMapData
    );
    dabeeoMap?.control.setOption({ 
      touchOption : {
        enableRotate : false,
      },
      mouseOption : {
        enableRotate : false,
      },
      controlRangeOption : {
        zoom : {
            min: 18.5,
            max: 21
        }
      }
    });

    setTimeout(() => {
      if(floorFocus === floorKios) {
        setMyLocation(dabeeoMap,coordinateX,coordinateY); ////// Set my location
      }
      const mapView = document.getElementById("mapControlCt"); 
      mapView?.classList.add("mapControlCtOn");
    }, 500)

    setMap(dabeeoMap);
    setMapContent(goMapData);
    dabeeoMap?.context.changeLanguage(language); 
    setLoadingMap(false);
    
    if(!cookies.get('showZoomIntruct') || cookies.get('showZoomIntruct') === "show"){
      setShowIntruct(true);
      cookies.set('showZoomIntruct', 'hiden', { path: '/' });
    }
    setTimeout (() => {
      setShowIntruct(false);
    },SET_TIME.TIME_SHOW_INTRUCT_ZOOM);

    
    const addMarker = async (map: any, poi: any) => {
      map.markers.clearAll();
        const currentMarker = map.markers.set({
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
        
      setFloorFocus(poi.floorId);
    } 
    
    const getPoiById = (pid : any) => {
      let poi = null;
      const gPois = goMapData?.dataPoi?.pois;
      if (gPois && gPois.length && pid != '') {
          let p = gPois.find(item => item.id == pid);
          if (typeof p !== 'undefined') {
              poi = p;
          }
      }
      return poi;
    }
    const openRouteData = async (pid : any) =>{
      const routeOptions = ['recommendation', 'stairs', 'escalator', 'elevator'];
      let currentPoi = getPoiById(pid);
      setCurrentPoi(currentPoi);
      const targetFloorName = getFloorNameById(currentPoi?.floorId);
      setFloorCurentName(targetFloorName);
      setFloorCurentId(currentPoi?.floorId);

      if (!currentPoi) {
          return;
      }

      //Check route type mode empty and floor
      let routeType ='';
      const routeModeLength = routeMode.length;
      if(routeModeLength === 0){
          routeMode = ['recommendation'];
      }
      routeType = (floorKios === currentPoi?.floorId) || routeModeLength === 1 ? [routeMode[0]] : routeMode;
      //end check

      const des = {
          origin: {
              position: gCoordinate,
              floorId: floorKios,
          },
          destination:  {
              position: currentPoi?.position,
              floorId: currentPoi?.floorId,
          },
          type: routeOptions
      };
            
      naviResponseObj = await goMapData?.getRoute(des);
      if(Object.keys(naviResponseObj).length === 0){ 
          return false; 
      }
      setListRouter(Object.keys(naviResponseObj));
      const routeTypeLength = routeType.length

      if(routeTypeLength === 1){
        getRouteData(routeType[0])
      }else if(routeTypeLength >1){
        if (typeRouter){
          getRouteData(typeRouter)
        } else {
          setShowRouter(true); // Show popup select router mode
        }
      } 
    }

    const getFloorNameById = (fid : any) => {
      let floorName = '';
      const goFloors = goMapData?.dataFloor?.floors;
      if (goFloors && goFloors.length && fid != '') {
          let floor = goFloors.find(floor => floor.id == fid);

          if (typeof floor != 'undefined') {
            floorName = floor.name[0].text;
          }
      }

      return floorName;
    }

    const getRouteData = async (routeName : any) => {
      let naviComplete = false;
      dabeeoMap?.markers.clearAll();
      const animOption = {
        zoom: 20,
        changeFloorDelay: 2200,
        speedRate: 21, //Set speed simulate
        markerOptions: {
            positionZ: 25,
            iconUrl: RunIcon,
            width: 36,
            height: 36,
            async: true,
            anchor: {
              x: 0.5,
              y: 0.5
            }
        }
      }
        
      const naviOption = {
        origin: {
            markerOptions: {
                visibleIcon: false
            }
        },
        destination: {
            markerOptions: {
                iconUrl: FinishMarker,
                width: 36,
                height: 108,
                positionZ: 23,
                visibleIcon: true,
                // animate: {
                //     duration: 1500,
                //     repeat: 3,   // ?? ??? ?? ?? ??
                //     opacity: 0.4
                // }
            },
            lineOptions: {
                lineColor: gPathColor,
                solidLineEnabled: true,
                solidLineWidth: giPathWidth,
            },
            showTag: false
        },
        defaultLineOption: {
            lineColor: gPathColor,
            solidLineEnabled: true,
            solidLineWidth: giPathWidth,
            solidLineCap:'round'
        },
        lineDivide: false,
        lineZ: 20
      };

        const currentRoute = naviResponseObj?.[routeName];
        await dabeeoMap?.routeSimulation?.set(currentRoute, naviOption);
        let coordinate = gCoordinate;

        dabeeoMap?.control?.moveTo({
          position: coordinate,
            transition: true
        });
        
        const pathInfo = currentRoute?.pathInfo;
        const pathInfoLength = pathInfo?.length;
        let floorList = [];
        let pathInfoNodes = [];

        if (pathInfoLength) {
            for (let i = 0, max = pathInfoLength; i < max; i++) {
                const pathItem = pathInfo[i];
                let check = floorList.findIndex(item => item == pathItem.floorId);
                if (check < 0) {
                    floorList.push(pathItem.floorId);
                }
                pathInfoNodes.push(pathItem?.position);
            }
        }

        dabeeoMap?.routeSimulation?.start(animOption);
        setNaviMode("START");
        if (pathInfoLength) {
            for (let i = 0, max = pathInfoLength; i < max; i++) {
                const pathItem = pathInfo[i];
                let check = floorList.findIndex(item => item == pathItem.floorId);
                if (check < 0) {
                    floorList.push(pathItem.floorId);
                }
                pathInfoNodes.push(pathItem?.position);
            }
        }

        if (floorList.length > 1) {
            const idx = floorList.findIndex(item => item == currentPoi?.floorId);
            const targetFloorId = floorList[idx + 1] ? floorList[idx + 1] : floorList[idx - 1];
        }

        const mapContainer = document.querySelector('#map_view');
        
        mapContainer?.addEventListener("navi-complete", () => {
          setPoiMapId("");
          setPoiRouter("");
          setModeRouter("");
          setShowIntructMove(false);
          setShowIntructMoveDone(false);
          naviComplete = true;
          const naviBar = document.getElementById("navi-mode");
          setTimeout(() => {
            if(naviBar?.textContent === "START"){
                dabeeoMap.control.focusTo({
                  focus:{
                      type:'OBJECT_ALL',
                  },
                  transition:true,
                  padding:{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                  }
                })
              dabeeoMap?.control.changeZoom({zoom: 22});
              setNaviMode('NAVIGATION');
            }
            if(floorIdFocus && floorKios != floorIdFocus && naviBar?.textContent === "START"){
              setShowIntructMoveDone(true); 
              setTimeout (() => {
                setShowIntructMoveDone(false);
              },SET_TIME.TIME_SHOW_INTRUCT_MOVE_DONE);
            }
          }, 220);
          
        });
    }

    
    let poiCategoryCode  = '';

    //get facilities category from map data
    const mapCat = goMapData?.dataMapInfo?.getMapInfo()?.poiCategories || [];
    let facilitiesMapCat: any[] = [];
    mapCat?.forEach(cat => {
      if (facilitiesBarCatCode?.includes(cat?.code) || mapCatCodeParking?.includes(cat?.code)){
        cat.childList.length > 0 ? facilitiesMapCat.push(...cat.childList) : facilitiesMapCat.push(cat)
      }
    });
    const categoryFacilitie = facilitiesMapCat?.map(item => item?.code);
    mapContainer.addEventListener("object-click", (e) => {
      const naviBar = document.getElementById("navi-mode");
      if(naviBar?.textContent){
        if(naviBar?.textContent === "NAVIGATION"){        
          dabeeoMap?.routeSimulation?.clear();
          setNaviMode("NORMAL");
        }
        if(naviBar?.textContent === "START"){        
          dabeeoMap.routeSimulation.stop();
          setNaviMode("STOP");
          setTimeout(() => {
          dabeeoMap?.routeSimulation?.clear();
          },200);
          setNaviMode('NAVIGATION');
          return;
        }
      }
    });
    mapContainer.addEventListener("poi-click", (e) => {
      if(!e?.detail || e?.detail?.length < 1) return;
      const poi = e?.detail ? e?.detail[0] : null;
      if(poi){
        addMarker(dabeeoMap, poi);
        dabeeoMap?.context.changeFloor(poi?.floorId);
        poiIdClick = poi.id;        
        poiCategoryCode = poi.categoryCode;
        if(categoryFacilitie?.includes(poiCategoryCode) || facilitiesBarCatCode?.includes(poiCategoryCode) || mapCatCodeParking === poiCategoryCode){ // Check POI type (Shop or Facilitie)
          if(!catCodeNoSaveLog?.includes(poiCategoryCode)){
            setSubType(LOG_TYPE.MAP);
            setSaveLogType(LOG_POI_SUB_TYPE.POI_CLICK);
          }
          setFacilitieMapId(poiIdClick);
        }else {
          if(!catCodeNoSaveLog?.includes(poiCategoryCode)){
            setSaveLogType(LOG_POI_SUB_TYPE.POI_CLICK);
          }
          setPoiMapId(poiIdClick);
        }
        // dabeeoMap?.control?.moveTo({ position: poi?.position });
      }
    });

    ///// Get poi detail
    const markerClick = (e : any) => {
      const naviBar = document.getElementById("navi-mode");
      if(naviBar?.textContent){
        if(naviBar?.textContent === "START" || naviBar?.textContent === "NAVIGATION"){
          dabeeoMap?.control.changeZoom({zoom: 22});
          return;   
        }
      }
      const poiPostionX = e?.detail?.[0]?.position?.x;
      const poiPostionY = e?.detail?.[0]?.position?.y;
      let poiList;
      if(pidClick && !poiIdClick){
        poiIdClick = pidClick;
      }
      const listPoi = document.getElementById("list-poi-marker");
      if(listPoi?.textContent){ 
        poiList = JSON.parse(listPoi?.textContent);

        if(poiList.length > 0 && poiPostionX && poiPostionY ){
          const poi = poiList.filter((item) => item?.position?.x === poiPostionX && item?.position?.y === poiPostionY
          )
          poiIdClick = poi[0]?.id;
          poiCategoryCode = poi[0].categoryCode;
        }
      }
      
      if(e){
        if(catePoi != null){
          poiCategoryCode = catePoi;
        }
        if(categoryFacilitie?.includes(poiCategoryCode)){
          // Check POI type (Shop or Facilitie)
          setFacilitieMapId(poiIdClick);
        }else {
          setPoiMapId(poiIdClick);
        }
      }
    };
    mapContainer.addEventListener("marker-click",markerClick, true);
    //// Event change floor where router
    mapContainer.addEventListener("floor-changed", (e) => {
      setFloorFocus(e?.detail?.id);
      if(e?.detail?.id === floorKios) {
        setMyLocation(dabeeoMap,coordinateX,coordinateY); ////// Set my location
      }
    });

    if(pidClick && !typeClickPoi){
      setPoiRouter(pidClick); //hash test lick open rourter popup
    }
  
    let floorIdFocus = "";
    if(pidClick && typeClickPoi){
      setLoading(true);
      let poiMarker = {
        position: {
          x:searchParams.get('x'),
          y:searchParams.get('y'),
        },        
        floorId: searchParams.get('floorId')
      }
      
      setTimeout(() => {
        addMarker(dabeeoMap,poiMarker);    
        dabeeoMap?.context.changeFloor(poiMarker?.floorId);
      },700);
      setPoiMapId("");
      setLoading(false);
    }
    
    const poiChoise : any = document.getElementById("poi-choice");
    poiChoise.addEventListener("change", async () => {
      let poiId = poiChoise.textContent;
      if(poiId){
        openRouteData(poiId);
      }    
    });

    const routerMode : any = document.getElementById("router-mode");
    routerMode.addEventListener("change", async () => {
      let modeRouter = routerMode.textContent;
      if(modeRouter){
        getRouteData(modeRouter);
      }    
    });
    const floorCurent : any = document.getElementById("floor-choice");
        floorCurent.addEventListener("change", async () => {
          floorIdFocus = floorCurent.textContent;
    });
  
    mapContainer.removeEventListener("marker-click",markerClick);
    return goMapData;
  }, []);

  const getIconCate = () => {    
    const icon = facilitiesFixedOrder?.find(item => item.code == currentPoi?.categoryCode)?.iconImage;
    return icon;
  }
  
  return (
      <div className="page-container page-map">
        {loadingMap && <Loading />}
        { <RouterMode show={showRouter} setShow={setShowRouter}  setModeRouter={setModeRouter} listRouter={listRouter} setNaviMode={setNaviMode}  floorFocus={floorFocus} setPoiRouter={setPoiRouter} /> }
        { <Instruct show={showIntruct} setShow={setShowIntruct} /> }
        { <InstructMove show={showIntructMove} setShow={setShowIntructMove} data={
            <>
              <div className={"icon_instruct"}> <img width={100} height={100} src={modeRouter==="escalator"? IconInstructEscalator : IconInstructElavator} alt="elavator icon"/></div>
              <div className={"text_instruct"}>{intructTextMove}</div>
            </>
          }
        /> }
        { poiMapId && <PoiDetail poiMapId={poiMapId} subType={subType} setPoiMapId={setPoiMapId} setPoiRouter={setPoiRouter} keyword={''} tagId={0} /> }
        { facilitieMapId && <FacilitieDetail facilitieMapId={facilitieMapId} subType={subType} setPoiRouter={setPoiRouter} setFacilitieMapId ={setFacilitieMapId} /> }
        <Map map={map} addMap={addMap} removeMap={removeMap} mapMode={mapMode}  setFloorFocus={setFloorFocus} floorFocus={floorFocus} floorKios={floorKios} setLoading={setLoadingMap} loadingMap = {loadingMap} mapContent={mapContent} setNaviMode={setNaviMode} />
        <span id="poi-choice" className="cover"></span>
        <span id="floor-choice" className="cover"></span>
        <span id="router-mode" className="cover"></span>
        <span id="navi-mode" className="cover"></span>
        <span id="list-poi-marker" className="cover"></span>
      </div>
  )
}

export default MapScreen
