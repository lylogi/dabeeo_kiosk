import EventLogoLight from '../images/event_icon_w.svg';
import EventLogoDark from '../images/event_icon.svg';
import MapLogoDark from '../images/map.svg';
import MapLogoLight from '../images/map_l.svg';
import SearchLogoDark from '../images/search_d.svg';
import SearchLogoLight from '../images/search_l.svg';
import FnbLogoDark from '../images/fb_icon.svg';
import FnbLogoLight from '../images/fb_icon_w.svg';
import ConveniencLogoDark from '../images/utilities_icon.svg';
import ConveniencLogoLight from '../images/utilities_icon_w.svg';

export const DASHBOARD_LINK: {
    [key: string]: string;
  } = {
    MAP: 'map',
    SEARCH: 'search',
    FNB: 'fnb',
    EVENT: 'event',
    CONVENIENC: 'convenience',
    MAIN: '/'
};

export const MAIN_LINK: {
    [key: string]: string;
  } = {
    DASHBOARD: '/app/*',
    DASHBOARD_MAIN: '/app',
    SAVER: '/',
};

export const MENU_ICON_DARK: {
    [key: string]: string;
  } = {
    MAP: MapLogoDark,
    SEARCH: SearchLogoDark,
    FNB: FnbLogoDark,
    EVENT: EventLogoDark,
    CONVENIENC: ConveniencLogoDark,
}

export const MENU_ICON_LIGHT: {
    [key: string]: string;
  } = {
    MAP: MapLogoLight,
    SEARCH: SearchLogoLight,
    FNB: FnbLogoLight,
    EVENT: EventLogoLight,
    CONVENIENC: ConveniencLogoLight,
}

export const MENU_SEARCH_BY_ID = [
  'FNB',
  'CONVENIENC'
]

export enum MENU_TYPE {
  MAP = 'MAP',
  SEARCH= 'SEARCH',
  FNB= 'FNB',
  EVENT= 'EVENT',
  CONVENIENC= 'CONVENIENC',
};