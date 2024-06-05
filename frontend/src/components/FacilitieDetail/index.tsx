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
import { useCallback, useContext, useEffect, useState } from "react";
import { catCodeNoSaveLog } from '../../constants/categories';
import { MapContext } from "../../context/MapContext";

interface Props {
  facilitieMapId: string | ''
  setFacilitieMapId: (params: string) => void;
  subType?: number | 0;
}

const FacilitieDetail = ({ facilitieMapId, setFacilitieMapId, subType } : Props) => {
  const appMapPath = MAIN_LINK.DASHBOARD_MAIN + '/' + DASHBOARD_LINK.MAP;
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const navigate = useNavigate();
  const [{ data }]  = facilitieMapId ? usePoiDetailByMapId(facilitieMapId) : {};
  const { saveLog, setSaveLogType, saveLogType } = useContext(LogContext);
  const [dataPoi, setDataPoi] = useState<any>(); 
  const [floor, setFloor] = useState<any>();
  const [category, setCategory ] = useState<any>();
  const { setOpenRouteMode, setIsRouteMode, setPoiIdRoute, setActiveFloorId, setActiveSwiperFloorId } = useContext(MapContext);
  const branches =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.BRANCHES) || ''); 

  useEffect(() => {
    const dataPoi = data && data?.data ? data.data : "";
    setDataPoi(dataPoi);
    setFloor(dataPoi?.floor);
    setCategory(dataPoi?.category);
  }, [data]);

  useEffect(() => {
    if(saveLogType){
      //Save log for event poi click
      eventSaveLog(saveLogType);
      setSaveLogType('');
    }
  }, [saveLogType])

  const handleClose = () => {
    setFacilitieMapId('');
  }
  
  const getImageUrl = useCallback(() => {
    let urlImage = '';
    if (dataPoi?.seqCode && dataPoi?.seqCode[language]) {
        urlImage = getMedia(dataPoi?.seqCode[language]);
    } else urlImage = defaultImage;

    return urlImage;
  }, [language, dataPoi?.seqCode]);

  const clickLocation = () => {
    const data = {
      poi_id: facilitieMapId,
      branch_id: branches?.main?.id,
      sub_type: LOG_KIOSK_SUB_TYPE.POSITION_CLICK
    }
    saveLog(LOG_TYPE.KIOSK, data);
    setPoiIdRoute(facilitieMapId);
    setActiveFloorId(floor?.mapFloorId);
    setActiveSwiperFloorId(floor?.mapFloorId);
    if(window.location.pathname !== appMapPath){
      navigate(`${appMapPath}`, { state: {type: MENU_TYPE.MAP} });
    }
    handleClose();
  }

  
  //Save log for event poi click
  const eventSaveLog = useCallback((saveLogType: any) => {
    let logSubType = subType ? subType : LOG_TYPE.LIST;
    const dataLog = {
      sub_type: saveLogType,
      poi_id: facilitieMapId,
      branch_id: branches?.main?.id
    }
    saveLog(logSubType, dataLog);
    setSaveLogType('');
  }, [subType, facilitieMapId]);
  
  const buttonRouterClick = () => {
    //Save log for event navigation click
    if(!catCodeNoSaveLog?.includes(category?.mapCatId)){
      eventSaveLog(LOG_POI_SUB_TYPE.NAVIGATION_CLICK);
    }
    setPoiIdRoute(facilitieMapId);
    setActiveFloorId(floor?.mapFloorId)

    if(window.location.pathname !== appMapPath){
      navigate(`${appMapPath}`,  { state: {type: MENU_TYPE.MAP} });
      setIsRouteMode(true);
    }else {
      setOpenRouteMode(true);
    }
    handleClose();
  }

  return (
    <div>
      <Modal className={styles.facilitie_detail} show={facilitieMapId ? true : false} onHide={handleClose}>
        <Modal.Body className={styles.poi_detail_ct}>
          <div className={styles.poiTitle}>{dataPoi?.title?.[language]}</div>
          <div className={styles.poi_info}>
            <div className={styles.image_poi}><img src={getImageUrl()} alt="Poi Detail"/></div>
            <div className={styles.floor_info}>
              <div className={styles.floor_poi}> <img src={IconLocation} alt="location icon"/> <span className={styles.floorTitle}>3F</span><span className={styles.pipeCharacter}></span><span className={styles.categoryTitle}>{category?.title?.[language]}</span> </div>
              <div className={styles.mobile_poi}><img src={IconPhone} className={dataPoi?.phone?.[language] ? '' : styles.displayNone} alt="phone icon"/> {dataPoi?.phone?.[language]} </div>
            </div>
            {dataPoi?.desc?.[language] &&
              <div className={styles.des_poi_ct}>
                <div className={styles.des_poi + ' scroll--simple' }> {dataPoi?.desc?.[language]} </div>  
              </div>  
            }                    
          </div>
          <div className={styles.poiControl} id="poiControl">
              <div className={[styles.button, styles.btLocation].join(' ')} id="btLocation" onClick={clickLocation}><img src={ButtonLocation} alt="ButtonLocation"/><span>{t('button.buttonLocationPoi')}</span></div>
              <div className={[styles.button, styles.btRouter].join(' ')} id="btRouter" onClick={buttonRouterClick}><img src={ButtonRouter} alt="ButtonRouter"/><span>{t('button.buttonRouter')}</span></div>
          </div>
        </Modal.Body>
          <Button className={styles.close_poi_detail} variant="secondary" onClick={handleClose}>
            <img src={CloseIcon} ></img>
          </Button>
      </Modal>
    </div>
  );
};

export default FacilitieDetail;
