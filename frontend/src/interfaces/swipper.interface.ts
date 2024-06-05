import { AutoplayOptions } from "swiper/types";

export interface SWIPPER_SETTING {
    autoplay?: boolean,
    navigation?: boolean,
    pagination?: boolean,
    slidesPerView?: number,
    clickablePagination?: boolean,
    effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards',
    speed?: number,
    loop?: boolean
}