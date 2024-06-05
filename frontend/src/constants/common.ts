import ESCALATOR_ICON from "../images/escalator_icon.svg";
import ELEVATOR_ICON from "../images/elevator_icon.svg";
import STAIR_ICON from "../images/stair_icon.svg";

export enum LANGUAGE_TYPE {
    VI = 'vi',
    EN = 'en'
};

export const LANGUAGES:{
    [key: string] : string;
} = {
    vi: 'VN',
    en: 'EN'
}

export const PAGE_TITLE: {
    [key: string]: string;
} = {
    SEARCH: 'pages.searchTitle',
    FNB: 'pages.fnbTitle'
}

export const SCREEN_SETTINGS = {
    'savers': {
        duration: 1000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        clickablePagination: true,
        effect: 'fade',
        speed: 500,
        freeMode: true,
        navigation: false,
        pagination: false,
        loop:true
    },
    'main': {
        duration: 5000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: false
        },
        clickablePagination: true,
        effect: 'fade',
        speed: 500,
        freeMode: false,
        pagination: true,
        loop:true
    }
}

export const TIME_DELAY_EFFECT = 1500;

export enum TYPE_FILE {
    IMAGE = 0,
    VIDEO = 2,
}

export enum SWIPER_TOUCH {
    XCAL = 30
}

export const ROUTE_TYPE_ICON: {
    [key: string]: string;
  } = {
    'stair': STAIR_ICON,
    'escalator': ESCALATOR_ICON,
    'elevator': ELEVATOR_ICON,
}

export const NAVI_MODE: {
    [key: string]: string;
} = {
    START: 'START',
    NAVIGATION: 'NAVIGATION',
    NORMAL: 'NORMAL',
    STOP: 'STOP'
}

export enum FLOOR_MAP {
    B1 = "FL-2RgrriDiE1221",
    F1 = "FL-oQ33DFwJk8835",
}

export enum RESYNC_STATUS {
    LOADING = 1,
    DONE = 2,
    NONE = 3,
};
