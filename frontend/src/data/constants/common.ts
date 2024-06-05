import { t } from "i18next";

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
    SEARCH: t('pages.searchTitle'),
    FNB: t('pages.fnbTitle')
}

export const MENU_SEARCH_BY_ID = [
    'FNB',
    'CONVENIENC'
]
