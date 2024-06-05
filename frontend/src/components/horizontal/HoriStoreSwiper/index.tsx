import styles from './style.module.css';
import { SwiperSlide } from 'swiper/react';
import Store from '../../Store';
import { Fragment, useCallback, useContext, useState } from 'react';
import NoData from '../../NoData';
import { useTranslation } from 'react-i18next';
import PoiDetail from '../../PoiDetail';
import { SWIPPER_SETTING } from '../../../interfaces/swipper.interface';
import HoriSwiper from '../HoriSwiper';
import { SearchContext } from '../../../context/SearchContext';
import Loading from '../../Loading';
import { LogContext } from '../../../context/LogContext';
import { LOG_KIOSK_SUB_TYPE, LOG_POI_SUB_TYPE, LOG_SCREEN_SUB_TYPE, LOG_USED_SUB_TYPE } from '../../../constants/logType';
import Swiper from 'swiper';

interface IProps {
    swiperData: Swiper,
    subType: LOG_POI_SUB_TYPE | LOG_KIOSK_SUB_TYPE | LOG_SCREEN_SUB_TYPE | LOG_USED_SUB_TYPE,
    keyword: string,
    tagId: number
}

function HoriStoreSwiper({ subType, keyword, tagId }: IProps) {
    const [poiMapId, setPoiMapId] = useState('');
    const { t, i18n } = useTranslation();
    const { dataSlide, isLoading, setSwiper, loading } = useContext(SearchContext);
    const { setSaveLogType} = useContext(LogContext);

    const slideSettings: SWIPPER_SETTING = {
        autoplay: false,
        clickablePagination: true,
    };

    const clickPoi = useCallback((mapPoiId: any) => {
        setPoiMapId(mapPoiId);
        setSaveLogType(LOG_POI_SUB_TYPE.POI_CLICK);
    }, []);

    return (
        <>
            {(isLoading || loading) ? <Loading /> :
                <HoriSwiper settings={slideSettings} setSwiper={setSwiper}>
                    <Fragment>
                        {dataSlide && dataSlide.length > 0 && dataSlide.map((slide: any[], index: number) => (
                            <SwiperSlide key={index} className={`${styles.slideWrapper} row`}>
                                <>
                                    { slide && slide.length < 1 ? (
                                        <NoData notification={t('common.nodata')} />
                                    ) : (
                                        slide.map((store) => (
                                            <div className={`${styles.storeItem} col-4`} key={store.id}>
                                                <div onClick={() => clickPoi(store.mapPoiId)}>
                                                    <Store title={store.title} seqCode={store.seqCode} id={store.id} mapPoiId={store.mapPoiId} floor={store.floor} />
                                                </div>
                                            </div>
                                        )))
                                    }
                                </>
                                
                            </SwiperSlide>
                        ))}
                    </Fragment>
                </HoriSwiper>
            }

            {poiMapId && <PoiDetail poiMapId={poiMapId} subType={subType} tagId={tagId} keyword={keyword} setPoiMapId={setPoiMapId} />}
        </>
    )
}

export default HoriStoreSwiper;
