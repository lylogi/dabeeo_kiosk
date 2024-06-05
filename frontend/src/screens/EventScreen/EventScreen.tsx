import styles from './style.module.css';
import HoriEventSwiper from '../../components/horizontal/HoriEventSwiper';
import { useContext, useEffect, useState } from 'react';
import EventDetail from '../../components/EventDetail';
import Loading from '../../components/Loading';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
import { EventContext } from '../../context/EventContext';
import { swiperTouchEnd } from '../../helper/utils';
import { useTranslation } from 'react-i18next';

function EventScreen() {
  const {eventId, eventLoading, eventData} = useContext(EventContext);
  const swiperData = eventData?.data;
  const { t, i18n } = useTranslation();

  return (
    <>
      {eventLoading ? <Loading /> :
        (eventId ?
          eventData?.data?.length > 0 && (
            <div className={`${styles.singleEventSwiper} page-event`}>
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                autoplay={false}
                navigation={true}
                loop={true}
                lazyPreloadPrevNext={0}
                lazyPreloaderClass="swiper-lazy-preloader"
                modules={[Pagination, Navigation, EffectFade]}
                initialSlide={swiperData.findIndex((event:any) => event.id == eventId)}
                onTouchEnd={swiperTouchEnd}
                shortSwipes={false}
              >
                {eventData?.data?.map((event: any) => (
                  <SwiperSlide className={styles.slideWrapper} key={event?.id}>
                    {({ isActive }) => (
                      <EventDetail eventData={event} isActive={isActive}/>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>)
            :
          <div className={`${styles.pageWrapper} page-container page-event`}>
            <h1 className={`${styles.pageTitle} text-center`}>{t('pages.eventTitle')}</h1>
            <div className={styles.swiperWrapper}>
              <HoriEventSwiper numberPerSlide={4} swiperData={eventData?.data || []}/>
            </div>
          </div>)
      }
    </>

  )
}

export default EventScreen