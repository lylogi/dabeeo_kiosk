import { SwiperSlide } from 'swiper/react';
import Event from '../../Event';
import { Fragment, useContext } from 'react';
import { convertDataToSlide } from '../../../hooks/slides/useGenerateSlide';
import NoData from '../../NoData';
import { useTranslation } from 'react-i18next';
import { SWIPPER_SETTING } from '../../../interfaces/swipper.interface';
import HoriSwiper from '../HoriSwiper';
import styles from './style.module.css';
import { EventContext } from '../../../context/EventContext';
import Loading from '../../Loading';

interface IProps {
    numberPerSlide: number,
    swiperData: any,
}

const slideSettings: SWIPPER_SETTING = {
    autoplay: false,
    clickablePagination: true
};

function HoriEventSwiper({ numberPerSlide, swiperData }: IProps) {
    const { t, i18n } = useTranslation();
    const { setActiveIndexSlide, setEventId, activeIndexSlide, loading } = useContext(EventContext);
    const [dataSlide, isLoading] = convertDataToSlide(swiperData, numberPerSlide);

    return (
        <>
            {isLoading || loading ? <Loading /> :
                <HoriSwiper settings={slideSettings} setSlideIndex={setActiveIndexSlide} activeSlide={activeIndexSlide}>
                    {!dataSlide || dataSlide?.length < 1 ? (
                        <NoData notification={t('common.noEventData')} />
                    ) : (
                        <Fragment>
                            {dataSlide?.map((slide: any[], index: number) => (
                                <SwiperSlide key={index} className={`${styles.slideWrapper} row`}>
                                    {!slide || slide.length < 1 ? (
                                        <NoData notification={t('common.noEventData')} />
                                    ) : (
                                        slide.map((event) => (
                                            <div className={`${styles.eventItem} col-6`} key={event.id}>
                                                <div onClick={() => setEventId(event.id)}>
                                                    <Event {...event} />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </SwiperSlide>
                            ))}
                        </Fragment>
                    )}
                </HoriSwiper>
            }
        </>
    )
}

export default HoriEventSwiper;
