import defaultImage from "../images/image_poi_default.png";
import { SWIPER_TOUCH } from '../constants/common';
import { LOCAL_STORAGE_KEY } from "../constants/localStorage";

export const getMedia = (fileName : string) => {
    return fileName ? import.meta.env.VITE_SERVER_URL + 'public/media/' + fileName : defaultImage;
}

export const getImgThumb = (fileName: string) => {
    if(!fileName) {
        return defaultImage;
    }

    let extension = fileName.split('.').pop();
    let imageName = fileName?.substring(fileName.lastIndexOf('/')+1, fileName.lastIndexOf('.'));
    let src = '';
    if(extension && extension === 'svg') {
        src = import.meta.env.VITE_SERVER_URL + 'public/media/' + imageName + '.svg';
    } else {
        src = import.meta.env.VITE_SERVER_URL + 'public/media/thumb/' + imageName + '.png';
    }
    
    return src;
}

export const getDifferenceTime = (date1 : object, date2 : object) => {
    let difference = date1?.getTime() - date2?.getTime();

    const daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    const hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    const minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60

    const secondsDifference = Math.floor(difference/1000);
    return secondsDifference;
}

export const getSecondDefference = (date1 : object, date2 : object) => {
    let difference = date1?.getTime() - date2?.getTime();

    const secondsDifference = Math.floor(difference/1000);
    return secondsDifference;
}

export const swiperTouchEnd = (swiper: SwiperCore, event: TouchEvent | MouseEvent | PointerEvent) => {
    if (!(event.target instanceof HTMLElement)) return;

    const current = swiper.activeIndex;

    const { startX, currentX, startY, currentY } = swiper.touches;
    const Xcal = startX - currentX;
    const Ycal = startY - currentY;
    if(Xcal == 0) return;
    if ( Math.abs( Xcal ) > Math.abs( Ycal ) ) {
        if ( Xcal > SWIPER_TOUCH.XCAL ) {
            swiper.slideTo(current + 1);
        }
        if ( Xcal < 0 && Math.abs( Xcal ) > SWIPER_TOUCH.XCAL ) {
            swiper.slideTo(current - 1);
        }                  
    }
};


export const getTitleByLang = (title: any, lang: string) => {
    return title[lang] ? title[lang] : title['vi'];
}

export const isLessThanToday = (date: Date): boolean => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    if (date.getTime() <= today.getTime()) {
        return true;
    }
    return false;
}

export const buildHolidays = (date: Date, lang = 'en') => {
    if (!date) return '';
    const weekday = date.toLocaleString(lang, { weekday: 'short' });
    const day = date.toLocaleString(lang, { day: '2-digit' });
    const month = date.toLocaleString(lang, { month: '2-digit' });
    return `${day}/${month}(${weekday})`;
}

export const filterSlideData = (numberPerSlide: number, dataFilter: any[]) => {
    let dataSlide: any[] = [];
    if (dataFilter.length > numberPerSlide) {
      while (dataFilter.length > numberPerSlide) {
        const slide = dataFilter.splice(0, numberPerSlide);
        dataSlide.push(slide);
      }
  
      dataSlide.push(dataFilter);
  
      return dataSlide;
    }
}

export const kioskDataToStorage = (dataKiosk: any, dataBranches: any) => {
    if (!dataKiosk || !dataBranches) {
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY.CLOSE_TIME, dataKiosk?.close_time);
    localStorage.setItem(LOCAL_STORAGE_KEY.HOLIDAY, JSON.stringify(dataKiosk?.holiday));
    localStorage.setItem(LOCAL_STORAGE_KEY.LOGO, dataKiosk?.logo);
    localStorage.setItem(LOCAL_STORAGE_KEY.OPEN_TIME, dataKiosk?.open_time);
    localStorage.setItem(LOCAL_STORAGE_KEY.WAITING_TIME, dataKiosk?.waiting_time);
    localStorage.setItem(LOCAL_STORAGE_KEY.COORDINATE_X, dataKiosk?.coordinateX);
    localStorage.setItem(LOCAL_STORAGE_KEY.COORDINATE_Y, dataKiosk?.coordinateY);
    localStorage.setItem(LOCAL_STORAGE_KEY.FLOOR_ID, dataKiosk?.floorId);
    localStorage.setItem(LOCAL_STORAGE_KEY.MAP_ID, dataKiosk?.mapId);
    localStorage.setItem(LOCAL_STORAGE_KEY.BRANCHES, JSON.stringify(dataBranches));
}
