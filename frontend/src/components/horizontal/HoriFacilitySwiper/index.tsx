import styles from './style.module.css';
import { SwiperSlide } from 'swiper/react';
import { Fragment, useContext, useState } from 'react';
import NoData from '../../NoData';
import { useTranslation } from 'react-i18next';
import { SWIPPER_SETTING } from '../../../interfaces/swipper.interface';
import HoriSwiper from '../HoriSwiper';
import { SearchContext } from '../../../context/SearchContext';
import Loading from '../../Loading';
import Facility from '../../Facility';
import FacilitieDetail from '../../FacilitieDetail';
import { LOG_POI_SUB_TYPE} from './../../../constants/logType';
import { LogContext } from '../../../context/LogContext';

const slideSettings: SWIPPER_SETTING = {
    autoplay: false,
    clickablePagination: true
};

function HoriFacilitySwiper() {
    const [facilitieMapId, setFacilitieMapId] = useState('');
    const [catePoi, setCatePoi] = useState('');
    const { setSaveLogType } = useContext(LogContext);
    const { t, i18n } = useTranslation();
    const { setSwiper, dataSlide, isLoading, loading } = useContext(SearchContext);

    const clickFacility = (mapPoiId: any, poiCategory: any) => {
        setCatePoi(poiCategory);
        setFacilitieMapId(mapPoiId);
        setSaveLogType(LOG_POI_SUB_TYPE.POI_CLICK);
    };

    return (
        <>
            {(isLoading || loading ) ? <Loading /> :
                <HoriSwiper settings={slideSettings} setSwiper={setSwiper}>
                    {!dataSlide || dataSlide.length < 1 ? (
                        <NoData notification={t('common.noFacilityData')} />
                    ) : (
                        <Fragment>
                            {dataSlide.map((slide: any[], index: number) => (
                                <SwiperSlide key={index} className={`${styles.slideWrapper}`}>
                                    <>
                                        {!slide || slide.length < 1 ? (
                                            <NoData notification={t('common.noFacilityData')} />
                                        ) : (
                                            slide.map((store) => (
                                                <div className={`${styles.storeItem}`} key={store.id}>
                                                    <div onClick={() => clickFacility(store.mapPoiId, store.category.mapCatId)}>
                                                        <Facility title={store.title} seqCode={store.seqCode} id={store.id} floor={store.floor} catePoi={catePoi} />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </>
                                </SwiperSlide>
                            ))}
                        </Fragment>
                    )}
                </HoriSwiper>
            }

            {facilitieMapId && <FacilitieDetail facilitieMapId={facilitieMapId} setFacilitieMapId={setFacilitieMapId} />}
        </>
    )
}

export default HoriFacilitySwiper;
