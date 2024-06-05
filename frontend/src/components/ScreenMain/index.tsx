
import React, { Fragment, useContext } from 'react';
import HoriSwiper from '../horizontal/HoriSwiper';
import NoScreen from '../NoScreen';
import { SwiperSlide } from 'swiper/react';
import { useTranslation } from "react-i18next";
import { ScreenMainContext } from '../../context/ScreenMainContext';
import { SCREEN_SETTINGS, TIME_DELAY_EFFECT } from '../../constants/common';
import ScreenItem from '../ScreenItem';
import { LOG_SCREEN_SUB_TYPE } from '../../constants/logType';

const ScreenMain = () => {
  const { screenSlides } = useContext(ScreenMainContext);
  const slideSettings : object = SCREEN_SETTINGS.main;
  const { t } = useTranslation();
  const setSwiper = () => {};
  return (
      <>
        {screenSlides && screenSlides.length > 0 && (
          <HoriSwiper settings={slideSettings} setSwiper={setSwiper}>
            <Fragment>
                { screenSlides.map((slide, index) => (
                    <SwiperSlide key={index}
                      virtualIndex={index}
                      data-swiper-autoplay={slide?.duration ? (slide.duration + TIME_DELAY_EFFECT) : slideSettings?.duration }>
                      {({isActive}) => 
                      <ScreenItem 
                        duration = {slide?.duration ? slide.duration : slideSettings?.duration}
                        id = {slide?.id}
                        type = {slide?.file?.type}
                        title = {slide?.title}
                        isActive={isActive}
                        name = {slide?.file?.name}
                        screenType = {LOG_SCREEN_SUB_TYPE.MAIN_SCREEN}
                      />}
                    </SwiperSlide>
                ))}
            </Fragment>
          </HoriSwiper>
        )}

        { screenSlides && screenSlides.length === 0 &&
          <NoScreen notification={t('common.noslide')} />
        }
      </>
  )
}

export default ScreenMain;
