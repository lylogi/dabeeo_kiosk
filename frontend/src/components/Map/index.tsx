import { DabeeoMap, DabeeoMapData } from "dabeeomaps";
import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";
import useFloorList from './../../hooks/floors/useFloorList';
import { useTranslation } from "react-i18next";
import { SwiperSlide } from 'swiper/react';
import VerticalSwiper from "../../components/VerticalSwiper";
import FacilitiesBar from "../FacilitiesBar";
import ImgMarker from '../../images/maker_icon.svg';
import MiniLocationIcon from '../../images/mini_location.svg';
import { IPoi } from "dabeeomaps/dist/src/model/map/IPoi";
import { facilitiesBarCatCode, facilitiesFixedOrder } from "../../constants/categories";
import { FLOOR_MAP} from './../../constants/common';

interface Props {
  map: DabeeoMap | null;
  addMap: (viewer: HTMLElement) => Promise<DabeeoMapData>;
  removeMap: () => void;
  setLoading: (loading: boolean) => void;
  setFloorFocus: (params: any) => any;
  setNaviMode: (params: any) => any;
  floorFocus: string;
  floorKios: string;
  loadingMap: boolean;
  mapMode: boolean;
  mapContent: DabeeoMapData | undefined;
}


const Map = ({ map, addMap, removeMap, setLoading, setFloorFocus, setNaviMode, mapContent, mapMode }: Props) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const [dataPois, setDataPois] = useState<IPoi[]>();
  // const kiosFloor = localStorage.getItem('floor_id');
  const [swiper, setSwiper] = useState();
  const [viewLocation, setViewLocation] = useState(false);
  const [onViewAllFloor, setViewAllFloor] = useState(false);
  const mapView: any = document.getElementById("map_view");
  const [facilitiesMapCat, setFacilitiesMapCat] = useState<any[]>([]);
  const [floorFacilitiesCat, setFloorFacilitiesCat] = useState<any[]>([]);
  const [{ data, error, loading }] = useFloorList();
  const [floorList, setFloorList] = useState(null);


  const moveToCenter = () => {
    map?.control.changeZoom({ zoom: 22 });
  }

  const handleAddMarker = useCallback((poi: any, mapObject: any = map) => {
    mapObject?.markers?.clearAll();
    const currentMarker = mapObject?.markers?.set({
      marker: [
        {
          x: poi.position.x,
          y: poi.position.y,
          iconOption: {
            positionZ: 25,
            async: true,
            anchor: {
              x: 0.5,
              y: 0.1
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
  }, [map])

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
    setFacilitiesMapCat(mergedArray);
    getFloorFacilitiesCat(floorFocus, mergedArray);
  }, [mapContent])

  useEffect(() => {
    if (data) {
      setFloorList(data?.data);
    }
  }, [data])

  useEffect(() => {
    if (!mapMode) {
      setLoading(false);
    }
  }, [mapMode])

  useEffect(() => {
    handleAddMap();
    return () => {
      removeMap()
    }
  }, []);

  const handleAddMap = () => {
    const viewer = document.getElementById("rightMap");
    if (viewer) {
      addMap(viewer).then((e: DabeeoMapData) => {
        setDataPois(e?.dataPoi.getPois());
      });
    }
  }

  useEffect(() => {
    if (swiper && floorFocus && !swiper.destroyed) {
      const floorItemFocus = floorList?.indexOf(floorList?.find(floor => floor.mapFloorId === floorFocus));
      swiper.slideTo(floorItemFocus - 2);
    }
  }, [floorFocus, swiper]);

  const getFloorFacilitiesCat = async (floorFocus: string, mapCat?: any) => {
    let mapCategories = mapCat || facilitiesMapCat;
    const dataCurrentFloor = await mapContent?.floorData?.getFloorData(floorFocus);
    const catCodes = dataCurrentFloor?.pois?.map(item => item.categoryCode);
    const floorFacilitiesCat = mapCategories.filter(item => catCodes?.includes(item.code));
    setFloorFacilitiesCat(floorFacilitiesCat);
  }

  const changeFloorItem = async (floorId: string) => {
    const naviBar = document.getElementById("navi-mode");
    if (naviBar?.textContent) {
      if (naviBar?.textContent === "NAVIGATION") {
        map?.routeSimulation?.clear();
        setNaviMode("NORMAL");
      }
      if (naviBar?.textContent === "START") {
        map?.routeSimulation.stop();
        setNaviMode("STOP");
        setTimeout(() => {
          map?.routeSimulation?.clear();
        }, 200);
      }
    }
    setLoading(true);
    setViewAllFloor(false);
    setViewLocation(false);
    setFloorFocus(floorId);
    mapView.style.display = 'block';
    getFloorFacilitiesCat(floorId);
    map?.control.reset({transition:true});
    await map?.context.changeFloor(floorId);
    await map?.markers.clearAll();
    setLoading(false);
  }

  useEffect(() => {
    getFloorFacilitiesCat(floorFocus);
  }, [floorFocus])

  const togglePoiByCategoryCode = async (code: any) =>  {
    const poisCat = dataPois?.filter((poi: any) => poi.categoryCode === code && poi.floorId === floorFocus);
    const listPoi = document.getElementById("list-poi-marker");
    if (listPoi) {
      listPoi.textContent = JSON.stringify(poisCat);
      listPoi.dispatchEvent(new Event('change'));
    }
    await map?.markers.clearAll();
    const naviBar = document.getElementById("navi-mode");
    if (naviBar?.textContent) {
      if (naviBar?.textContent === "NAVIGATION") {
        map?.routeSimulation?.clear();
        setNaviMode("NORMAL");
      }
      if (naviBar?.textContent === "START") {
        map?.routeSimulation.stop();
        setNaviMode("STOP");
        setTimeout(() => {
          map?.routeSimulation?.clear();
        }, 200);
      }
    }

    const poisMaker = poisCat?.map((item: IPoi) => {
      return {
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
      }
    });
    moveToCenter();

    await map?.markers?.set({
      marker: poisMaker,
    });
  }

  const handleViewLocation = async () => {
    await map?.markers.clearAll();
    const naviBar = document.getElementById("navi-mode");
    if (naviBar?.textContent) {
      if (naviBar?.textContent === "NAVIGATION") {
        map?.routeSimulation?.clear();
        setNaviMode("NORMAL");
      }
      if (naviBar?.textContent === "START") {
        map?.routeSimulation.stop();
        setNaviMode("STOP");
        setTimeout(() => {
          map?.routeSimulation?.clear();
        }, 200);
      }
    }
    setViewLocation(true);
    setViewAllFloor(false);
    setFloorFocus(floorKios);
    map?.control.reset({ transition: true });
    await map?.context.changeFloor(floorKios);
    await map?.markers.clearAll();
    mapView.style.display = 'block';
    moveToCenter();
  }

  const handleViewAllFloor = () => {
    const naviBar = document.getElementById("navi-mode");
    if (naviBar?.textContent) {
      if (naviBar?.textContent === "NAVIGATION") {
        map?.routeSimulation?.clear();
        setNaviMode("NORMAL");
      }
      if (naviBar?.textContent === "START") {
        map?.routeSimulation.stop();
        setNaviMode("STOP");
        setTimeout(() => {
          map?.routeSimulation?.clear();
        }, 200);
      }
    }
    setViewAllFloor(true);
    setViewLocation(false);
    setFloorFocus("");
    mapView.style.display = 'none';
  }
  return (
    <><div className={styles.map} id="viewer">
      <div className={`${styles.mapControl} flex-column`}>
        <div id="mapControlCt">
          <div className={styles.floorName} id="floorName">
            <div id="viewTextBtAllFloor" className={`viewTextBtAllFloor ${!floorFocus && 'd-flex'}`}>{t('button.buttonAllFloor')}</div>
            {floorList?.length > 0 && floorList?.map(floor => (
              <div key={floor.id} className={`floorNameCt ${floor.mapFloorId === floorFocus && 'floorNameCtOn'}`}>
                {floor?.title}
              </div>
            ))}
          </div>
          <div className={styles.flMiniView} id="flMiniView">
            {floorList?.length > 0 && floorList?.map((floor: any) => (
              <div className="itemMiniView">
                <div className={`iconMiniView ${floor.mapFloorId === floorKios && 'iconMiniViewOn'}`}>
                  <img src={MiniLocationIcon} className={styles.iconMiniView} />
                </div>
                <div key={floor.id} className={`floorViewItem ${floor.mapFloorId === floorKios && 'floorItemOn'}`}>
                  {floor?.title} <span>{floor.mapFloorId === FLOOR_MAP.F1 && 'Office'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.flMiniView} id="flMiniView">
          {floorList?.length > 0 && floorList?.map((floor: any) => (
            <div key={floor.id} className={`floorViewItem ${floor.mapFloorId === floorKios && 'floorItemOn'}`}>
              {floor?.title}
            </div>
          ))}
        </div>
        <div className={styles.btMapControl} id="btMapControl">
          {floorList?.length > 0 &&
            <>
              <div className={`${styles.btMapControlItem} ${onViewAllFloor && 'btMapControlItemOn'}`} onClick={() => handleViewAllFloor()} id="btAllFloor">{t('button.buttonAllFloor')}</div>
              <div className={`${styles.btMapControlItem} ${viewLocation && 'btMapControlItemOn'}`} id="btMyLocation" onClick={() => handleViewLocation()}>{t('button.buttonLocation')}</div>
            </>}
        </div>
        <div className={`${styles.floorList}`} id="floorList">
          {(floorList && floorList.length > 0) && (
            <VerticalSwiper fallback={<div>Loading...</div>} slidesPerView={5} totalSlides={floorList.length} swiper={swiper} setSwiper={setSwiper}>
              {floorList.map((floorItem: any[], index: number) => (
                <SwiperSlide key={index} className="slideFloorItem">
                  <div className={`floorItem ${floorItem?.mapFloorId === floorFocus && "floorItemOn"}`} onClick={(e) => changeFloorItem(floorItem?.mapFloorId)}>{floorItem?.title}</div>
                </SwiperSlide>
              ))}
            </VerticalSwiper>
          )}
        </div>
      </div>
    </div><div id="rightMap" className={styles.viewMap}>
        <div className={styles.viewSubjectFloor} id="viewSubjectFloor">
          {floorList?.length > 0 && floorList.map((floorItem, index) => {
            return (
              <div key={index} className={`viewSubjectFloorItem ${floorItem.mapFloorId === floorFocus ? 'viewSubjectFloorItemOn' : 'viewSubjectFloorItemOff'}`}>{floorItem?.subject?.[language]}</div>
            );
          })}
        </div>
        <div className={`${styles.viewAllFloor} ${onViewAllFloor && "d-block"}`} id="viewAllFloor">
          {floorList?.length > 0 && floorList?.map((floorItem, index) => {
            return (
              <div key={index}
                className={`viewFloorItem ${floorItem.mapFloorId === floorKios ? 'viewFloorItemOn' : ''}`}
                onClick={() => changeFloorItem(floorItem?.mapFloorId)}>
                <span>{floorItem?.title}</span> {floorItem?.subject?.[language]}
                <div className="subTileFloor">
                  {floorItem.mapFloorId === FLOOR_MAP.F1 &&
                    <span><b>1F</b> {t('common.subTileOffice')}</span>}
                  {floorItem.mapFloorId === FLOOR_MAP.B1 &&
                    <span><b>B1</b> {t('common.subTileParking')}</span>}
                </div>
              </div>
            );
          })}
        </div>
        {/* {!loadingMap && floorFocus &&
          <div className={styles.utilitiesBar} id="utilitiesBar">
            <FacilitiesBar togglePoiByCategoryCode={togglePoiByCategoryCode} facilitiesMapCat={floorFacilitiesCat} />
          </div>} */}
      </div></>
  );
};

export default Map;
