import { Button, Modal } from "react-bootstrap";
import styles from "./style.module.scss";
import CloseIcon from './../../images/close_icon.svg';
import { usePoiDetailByMapId } from "../../hooks/poi/usePoiDetail";
import { useTranslation } from "react-i18next";
import ButtonLocation from "../../images/bt_location.svg";
import ButtonRouter from "../../images/router_path_icon.svg";
import IconLocation from "../../images/location_icon.svg";
import IconPhone from "../../images/phone_icon.svg";
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_LINK, MAIN_LINK, MENU_TYPE } from '../../constants/menu';
import { getMedia } from "../../helper/utils";
import defaultImage from "../../images/image_poi_default.png";
import { LogContext } from './../../context/LogContext';
import { LOG_TYPE, LOG_POI_SUB_TYPE, LOG_KIOSK_SUB_TYPE } from './../../constants/logType';
import { LOCAL_STORAGE_KEY } from './../../constants/localStorage';
import { useCallback, useContext, useEffect } from "react";
import Loading from "../Loading";
import { MapContext } from "../../context/MapContext";

interface Props {
  poiMapId: string | '';
  keyword: string | '';
  tagId: number | 0;
  subType: number | 0;
  setPoiMapId?: (params: string) => void;
  setOpenRouteMode?: (params: boolean) => void;
  setPoiIdRoute?: string;
}

interface LogData {
  poi_id: string,
  branch_id: string,
  sub_type: LOG_KIOSK_SUB_TYPE,
  content?: string,
  hashtag_id?: number,
}

const PoiDetail = ({ poiMapId, subType, keyword, tagId, setPoiMapId} : Props) => {
  const appMapPath = MAIN_LINK.DASHBOARD_MAIN + '/' + DASHBOARD_LINK.MAP;
  const { setOpenRouteMode, setPoiIdRoute, setActiveFloorId, setIsRouteMode, setActiveSwiperFloorId } = useContext(MapContext)
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const navigate = useNavigate();
  const { saveLog, setSaveLogType, saveLogType } = useContext(LogContext);
  const branches =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.BRANCHES) || '');  
  const [{ data, error, loading }]  = poiMapId ? usePoiDetailByMapId(poiMapId) : {};

  const handleClose = useCallback(() => {
    if(setPoiMapId) {
      setPoiMapId('');
    }
    setSaveLogType('');
  }, []);

  const dataPoi = data && data?.data ? data.data : "";

  const floor = dataPoi.floor;  
  const category = dataPoi.category;

  const getImageUrl = useCallback(() => {
    let urlImage = '';
    if (dataPoi?.seqCode && dataPoi?.seqCode[language]) {
        urlImage = getMedia(dataPoi?.seqCode[language]);
    } else urlImage = defaultImage;

    return urlImage;
  }, [language, dataPoi?.seqCode]);

  useEffect(() => {
    if(saveLogType){
      //Save log for event poi click
      eventSaveLog(saveLogType);
    }
  }, [])

  const clickLocation = useCallback((floorPoi: any) => {
    const data: LogData = {
      poi_id: poiMapId,
      branch_id: branches?.main?.id,
      sub_type: LOG_KIOSK_SUB_TYPE.POSITION_CLICK
    }
    saveLog(LOG_TYPE.KIOSK, data);
    setPoiIdRoute(poiMapId);
    setActiveFloorId(floorPoi?.mapFloorId);
    setActiveSwiperFloorId(floorPoi?.mapFloorId);
    if(window.location.pathname !== appMapPath){
      navigate(`${appMapPath}`, { state: {type: MENU_TYPE.MAP} });
    }
    handleClose();
  }, [])

  const eventSaveLog = useCallback((saveLogType: any) => {
    let logType = subType ? subType : LOG_TYPE.LIST;
    let dataLog: LogData = {
      sub_type: saveLogType,
      poi_id: poiMapId,
      branch_id: branches?.main?.id
    }
    if(logType === LOG_TYPE.KEYWORD){
      dataLog = {
        ...dataLog,
        content: keyword,
      }
    }
    if(logType === LOG_TYPE.HASHTAG){
      dataLog = {
       ...dataLog,
        hashtag_id: tagId,
      }
    }
    saveLog(logType, dataLog);
    setSaveLogType('');
  }, [])

  const buttonRouterClick = useCallback((floorPoi: any) => {
    eventSaveLog(LOG_POI_SUB_TYPE.NAVIGATION_CLICK);
    setPoiIdRoute(poiMapId);
    setActiveFloorId(floorPoi?.mapFloorId)
    if(window.location.pathname !== appMapPath){
      navigate(`${appMapPath}`,  { state: {type: MENU_TYPE.MAP} });
      setIsRouteMode(true);
    } else {
      setOpenRouteMode(true);
    }
    handleClose();
  }, [])

  return (
    <div>
      {loading ? <Loading /> : (
      <Modal size="lg" className={styles.poi_detail} show={poiMapId ? true : false} onHide={handleClose}>
        <Modal.Body className={styles.poi_detail_ct}>
          <div className={styles.image_poi}><img src={getImageUrl()} alt="Poi Detail"/></div>
          <div className={styles.poi_info}>
            <div className={styles.poiTitle}>{dataPoi?.title?.[language]}</div>
            <div className={floor?.title ? styles.floor_poi : styles.displayNone}> <img src={IconLocation} alt="location icon"/> <span className={styles.floorTitle}>3F</span> <span className={styles.pipeCharacter}></span><span className={styles.categoryTitle}>{category?.title?.[language]}</span></div>
            <div className={styles.mobile_poi}><img src={IconPhone} className={dataPoi?.phone?.[language] ? '' : styles.displayNone} alt="phone icon"/> {dataPoi?.phone?.[language]} </div>
            <div className={styles.des_poi + ' scroll--simple' }> {dataPoi?.desc?.[language]} </div>
            <div className={styles.poiControl} id="poiControl">
              <div className={[styles.button, styles.btLocation].join(' ')} id="btLocation" onClick={() => clickLocation(floor)}><img src={ButtonLocation} alt="ButtonLocation"/><span>{t('button.buttonLocationPoi')}</span></div>
              <div className={[styles.button, styles.btRouter].join(' ')} id="btRouter" onClick={() => buttonRouterClick(floor)}><img src={ButtonRouter} alt="ButtonRouter"/><span>{t('button.buttonRouter')}</span></div>
            </div>
          </div>
        </Modal.Body>
          <Button className={styles.close_poi_detail} variant="secondary" onClick={handleClose}>
            <img src={CloseIcon} ></img>
          </Button>
      </Modal>)}
    </div>
  );
};

export default PoiDetail;
