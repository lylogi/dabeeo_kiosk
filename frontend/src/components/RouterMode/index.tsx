import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import CloseIcon from './../../images/close_icon.svg';
import { useCallback, useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/MapContext";
import { NAVI_MODE, ROUTE_TYPE_ICON } from "../../constants/common";
import { SET_TIME } from "../../constants/time";
import RunIcon from '../../images/run_icon.svg';
import FinishMarker from '../../images/finish_marker.svg';
import IconInstructElavator from "../../images/icon_elavator_move.svg";
import IconInstructEscalator from "../../images/escalator_icon.svg";
import InstructMove from "../InstructMove";
import { facilitiesFixedOrder } from "../../constants/categories";
import ButtonShop from "../../images/shop_ico_big.svg";
import { LogContext } from '../../context/LogContext';
import { LOG_TYPE, LOG_KIOSK_SUB_TYPE } from '../../constants/logType';

interface Props {
    coordinateX: string;
    coordinateY: string;
    naviMode: string,
    setNaviMode: any;
}
const gPathColor = "#1B68DA";
const giPathWidth = 14;
const RouterMode = ({ coordinateX, coordinateY, setNaviMode, naviMode }: Props) => {
    const {setOpenRouteMode, openRouteMode, poiIdRoute, getPoiById, currentFloorId, mapContent, map, setActiveSwiperFloorId, activeFloorId, activeFloorById } = useContext(MapContext);
    const { t } = useTranslation();
    const [listViewRouter, setListViewRouter] = useState<string[]>();
    const [modeRoute, setModeRouter] = useState<string>();
    const [naviResponseObj, setNaviResponseObj] = useState();
    const [showIntructMove, setShowIntructMove] = useState(false);
    const [showIntructMoveDone, setShowIntructMoveDone] = useState(false);
    const [showRouteModeModal, setShowRouteModeModal] = useState(false);
    const { saveLog, branchId } = useContext(LogContext);

    const openRouteData = useCallback(async (pid: string) => {
        if (!pid) {
            return;
        }

        const activePoi = getPoiById(pid);

        //Check route type mode empty and floor
        const routeOptions = ['escalator', 'elevator'];
        const des = {
            origin: {
                position: {
                    x: coordinateX,
                    y: coordinateY
                },
                floorId: currentFloorId,
            },
            destination: {
                position: activePoi?.position,
                floorId: activePoi?.floorId,
            },
            type: routeOptions
        };

        const naviResponseObj = await mapContent?.getRoute(des);
        setNaviResponseObj(naviResponseObj);
        if (Object.keys(naviResponseObj)?.length === 0) {
            return false;
        }

        const listRoute = Object.keys(naviResponseObj);
        if(activePoi.floorId === currentFloorId) {
            chooseRoute(listRoute[0]);
            return;
        }
        setListViewRouter(listRoute);
        setShowRouteModeModal(true);
    }, [])

    useEffect(() => {
        setModeRouter('');
        if(mapContent && openRouteMode) {
            openRouteData(poiIdRoute);
        }
    }, [poiIdRoute, openRouteMode, map]);

    useEffect(() => {
        const mapContainer = document.getElementById("map-view");
        if (naviMode) {
            mapContainer?.addEventListener("floor-changing", handleFloorChange);
        }
        return () => {
            mapContainer?.removeEventListener("floor-changing", handleFloorChange);
        }
    }, [naviMode]);

    useEffect(() => {
        if (modeRoute) {
           getRouteData(modeRoute, naviResponseObj);
        }
    }, [modeRoute])

    const chooseRoute = useCallback((mode: string) => {
        const data = {
            router_mode: mode,
            branch_id: branchId,
            sub_type: LOG_KIOSK_SUB_TYPE.ROUTER_MODE_CLICK
        }
        saveLog(LOG_TYPE.KIOSK, data);
        setModeRouter(mode);
        setOpenRouteMode(true);
        setShowRouteModeModal(false);
    }, [])

    const getRouteData = useCallback(async (routeName: any, naviResponseObj: any) => {
        map?.markers.clearAll();
        const animOption = {
            zoom: 23,
            changeFloorDelay: 2000,
            speedRate: 20, //Set speed simulate
            markerOptions: {
                iconUrl: RunIcon,
                width: 36,
                height: 36,
                positionZ: 24,
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
                    positionZ: 100,
                    visibleIcon: true,
                },
                lineOptions: {
                    lineColor: gPathColor,
                    solidLineEnabled: true,
                    solidLineWidth: giPathWidth,
                    lineZ: 100
                },
                showTag: false
            },
            defaultLineOption: {
                lineColor: gPathColor,
                solidLineEnabled: true,
                solidLineWidth: giPathWidth,
                solidLineCap: 'round'
            },
            lineDivide: false,
            lineZ: 20
        };

        const currentRoute = naviResponseObj?.[routeName];
        await map?.routeSimulation?.set(currentRoute, naviOption);

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
        setNaviMode(NAVI_MODE.START);
        setActiveSwiperFloorId(currentFloorId);
        await map?.routeSimulation?.start(animOption);
    }, [map])

    useEffect(() => {
        const handleNaviComplete = () => {
            setNaviMode(NAVI_MODE.NAVIGATION);
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
    
            map?.control?.changeZoom({ zoom: 22 });
    
            if (activeFloorId && currentFloorId != activeFloorId && naviMode !== NAVI_MODE.STOP) {
                setShowIntructMoveDone(true);
            }
            setModeRouter('');
        }
        const mapContainer = document.querySelector('#map-view');
        mapContainer?.addEventListener("navi-complete", handleNaviComplete);
        return () => {
            mapContainer?.removeEventListener("navi-complete", handleNaviComplete);
        }
    }, [activeFloorId, naviMode])

    const handleFloorChange = useCallback((e: any) => {
        setActiveSwiperFloorId(e?.detail?.floor?.next?.id);
        setShowIntructMove(true);
    }, [])

    const getIntructTextMoveDone = useCallback(() => {
        if (facilitiesFixedOrder?.find(item => item.code == getPoiById(poiIdRoute)?.categoryCode)) {
            return t('instruct.facilitiesPosition') + activeFloorById?.title;
        } else {
            return t('instruct.shopPosition') + activeFloorById?.title;
        }
    }, [activeFloorById])

    const getIconCate = useCallback(() => {
        const icon = facilitiesFixedOrder?.find(item => item.code == getPoiById(poiIdRoute)?.categoryCode)?.iconImage;
        return icon;
    }, [])

    return (
        <>
            <Modal className={styles.router_popup} show={showRouteModeModal}>
                <Modal.Body className={styles.router_mode_ct}>
                    <div className={styles.router_mode_title}>{t('instruct.routerMode')}</div>
                    <div className={styles.router_group}>
                        {
                            listViewRouter && listViewRouter.length > 0 && listViewRouter?.map((route) => (
                                <div key={route} className={styles.item_router} onClick={() => chooseRoute(route)}>
                                    <div> <img src={ROUTE_TYPE_ICON[route]} alt="instruct icon" /></div>
                                    <div className={styles.text_instruct}>{t(`instruct.${route}Mode`)}</div>
                                </div>
                            ))
                        }
                    </div>
                </Modal.Body>
                <Button className={styles.close_router} onClick={() => {setOpenRouteMode(false); setShowRouteModeModal(false)}} variant="secondary">
                    <img src={CloseIcon}></img>
                </Button>
            </Modal>
            {showIntructMove &&
                <InstructMove show={showIntructMove} timeout={SET_TIME.TIME_SHOW_INTRUCT_MOVE} setShow={setShowIntructMove} data={
                    <>
                        <div className={"icon_instruct"}> <img width={100} height={100} src={modeRoute === "escalator" ? IconInstructEscalator : IconInstructElavator} alt="elavator icon" /></div>
                        <div className={"text_instruct"}>{t('instruct.changeFloor') + activeFloorById?.title}</div>
                    </>
                }
                />
            }
            {showIntructMoveDone && <InstructMove timeout={SET_TIME.TIME_SHOW_INTRUCT_MOVE_DONE} show={showIntructMoveDone} setShow={setShowIntructMoveDone} data={
                <>
                    <div className={"icon_instruct"}> <img width={100} height={100} src={getIconCate() || ButtonShop} alt="elavator icon" /></div>
                    <div className={"text_instruct"}>{getIntructTextMoveDone()}</div>
                </>
            }
            />}
        </>
    );
};

export default RouterMode;
