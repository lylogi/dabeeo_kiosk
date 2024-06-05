import { Fragment, useCallback, useContext } from 'react';
import HoriSwiper from '../horizontal/HoriSwiper';
import NoScreen from '../NoScreen';
import { SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { MAIN_LINK } from '../../data/constants/menu';
import { ScreenSaverContext } from '../../context/ScreenSlideContext';
import { SCREEN_SETTINGS } from '../../constants/common';
import { Cookies } from 'react-cookie';
import Loading from '../Loading';
import { LogContext } from '../../context/LogContext';
import { LOG_SCREEN_SUB_TYPE, LOG_TYPE, LOG_USED_SUB_TYPE } from '../../constants/logType';
import ScreenItem from '../ScreenItem';

const ScreenSaver = () => {
  const { screenSlides } = useContext(ScreenSaverContext);
  const { saveLog, branchId, setIsSaveLang, setTimeTouchedKiosk } = useContext(LogContext);
  const slideSettings: object = SCREEN_SETTINGS.savers;
  const navigate = useNavigate();
  const setSwiper = () => {};
  const { t } = useTranslation();
  const cookies = new Cookies();
  cookies.set('showZoomIntruct', 'show', { path: '/' });

  const handeClick = useCallback(() => {
    const data = {
      sub_type: LOG_USED_SUB_TYPE.SAVER_SCREEN_CLICK,
      branch_id: branchId
    }
    saveLog(LOG_TYPE.KIOSK, data);
    setIsSaveLang(false);
    setTimeTouchedKiosk(Date.now());
    navigate(MAIN_LINK.DASHBOARD_MAIN);
  }, []);

  return (
    <div className="page-container screen-saver" onTouchStart={handeClick} onClick={handeClick}>
      {!screenSlides && (
        <Loading />
      )}
      {screenSlides && screenSlides.length > 0 && (
        <HoriSwiper settings={slideSettings} setSwiper={setSwiper} >
          <Fragment>
            {screenSlides.map((slide, index) => (
              <SwiperSlide key={index} 
              data-swiper-autoplay={ slide?.duration ? slide.duration : slideSettings?.duration }>
                  {({ isActive }) =>
                    <ScreenItem
                      duration={slide?.duration ? slide.duration : slideSettings}
                      id={slide?.id}
                      type={slide?.file?.type}
                      title={slide?.title}
                      isActive={isActive}
                      name={slide?.file?.name}
                      screenType={LOG_SCREEN_SUB_TYPE.SCREEN_SAVER}
                    />}
              </SwiperSlide>
            ))}
          </Fragment>
        </HoriSwiper>
      )}

      {screenSlides && screenSlides.length === 0 &&
        <NoScreen handeClick={handeClick} notification={t('common.noslide')} />
      }
    </div>
  )
}

export default ScreenSaver;
