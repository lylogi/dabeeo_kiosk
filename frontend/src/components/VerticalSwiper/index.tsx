import { Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../scss/custom_swiper.scss";
import styles from "./style.module.css";
import { useEffect, useState } from 'react';
import BtnPrev from './../../images/BtnPrev.svg';

interface VerticalSwiperProps {
    children: JSX.Element[] | JSX.Element;
    slidesPerView: number;
    totalSlides: number;
    setSwiper: any
}
const VerticalSwiper = ({ children, slidesPerView, totalSlides, setSwiper }: VerticalSwiperProps) => {
    const [swiperBtnStatus, setSwiperBtnStatus] = useState(0); // 0: enable btn previous, 1: enable btn previous and next, 2: enable btn next
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let currentBtnStatus = 1;
        if(parseInt(currentIndex) === 0){
            currentBtnStatus = 0;
        }else if(parseInt(currentIndex) === (parseInt(totalSlides) - parseInt(slidesPerView))){
            currentBtnStatus = 2;
        }
        setSwiperBtnStatus(currentBtnStatus);
    }, [currentIndex]);


    const handlePrevious = () => {
        const btnNavi = document.getElementsByClassName("swiper-button-prev");
        if(btnNavi){
            const swiperBtn = btnNavi[0];
            swiperBtn.dispatchEvent(new Event('click'));
        }
    }

    const handleNext = () => {
        const btnNavi = document.getElementsByClassName("swiper-button-next");
        if(btnNavi){
            const swiperBtn = btnNavi[0];
            swiperBtn.dispatchEvent(new Event('click'));
        }
    }
    
    const onSlideChange = (index : any) => {
        setCurrentIndex(index?.snapIndex || 0);
    }

    return (
        <div className={`${styles.verticalSwiper} swiper-vertical-container`} id="swiper-container">
            <Swiper
                direction="vertical"
                autoplay={false}
                navigation={true}
                mousewheel={true}
                modules={[Pagination, Navigation]}
                scrollbar={{ draggable: true }}
                slidesPerView={slidesPerView || 3}
                spaceBetween={0}
                initialSlide={2}
                onSlideChange={(index) => onSlideChange(index)}
                style={{
                    height: 300
                }}
                id="swiper-content"
                onSwiper={(swiper) => setSwiper(swiper)}
            >
                {children}
            </Swiper>
            <div className={`${'swiper-btn swiper-btn-prev' + (swiperBtnStatus === 0 ? ' swiper-button-disabled' : '') }`} onClick={handlePrevious}><img src={BtnPrev}></img></div>
            <div className={`${'swiper-btn swiper-btn-next' + (swiperBtnStatus === 2 ? ' swiper-button-disabled' : '')}`} onClick={handleNext}><img src={BtnPrev}></img></div>
        </div>
    );
}
export default VerticalSwiper;