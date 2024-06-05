import { Swiper } from 'swiper/react';
import { Swiper as TypeSwiper } from 'swiper/types';
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
import styles from "./style.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../scss/custom_swiper.scss";
import "swiper/css/effect-fade";
import { SWIPPER_SETTING } from '../../../interfaces/swipper.interface';

interface HoriMenuSwiperProps {
    children: JSX.Element[] | JSX.Element;
    settings: SWIPPER_SETTING;
    setSwiper?: (swiper: TypeSwiper) => void;
    setSlideIndex?: (index: number) => void;
    activeSlide?: number;
}
const HoriSwiper = ({ children, settings, setSwiper, setSlideIndex, activeSlide }: HoriMenuSwiperProps) => {
    const enablePagination = settings?.pagination === undefined ? true : settings.pagination;
    return (
        <div className={`${styles.horiSwiperContainer}`}>
            <Swiper
                initialSlide = {activeSlide}
                className={styles.pageSwiper + (enablePagination ? '' : ' disable-pagination')}
                slidesPerView={settings?.slidesPerView === undefined ? 1 : settings.slidesPerView}
                spaceBetween={0}
                autoplay={settings?.autoplay === undefined ? false : settings.autoplay}
                navigation={settings?.navigation === undefined ? true : settings.navigation}
                pagination={{
                    enabled: enablePagination,
                    clickable: settings?.clickablePagination === undefined ? false : settings.clickablePagination,
                }}
                loop={settings?.loop === undefined ? true : settings.loop}
                effect={settings.effect}
                speed={settings.speed}
                onSwiper={setSwiper}
                onSlideChange={(swiper) => setSlideIndex ? setSlideIndex(swiper.activeIndex) : ''}
                modules={[Pagination, Navigation, EffectFade, Autoplay]}
                longSwipes={true}
                longSwipesRatio={0.05}
                fadeEffect={{
                    crossFade: true
                }}
                lazyPreloadPrevNext={2}
                preventClicksPropagation={true}
            >
                {children}
            </Swiper>
        </div>
    );
}
export default HoriSwiper;