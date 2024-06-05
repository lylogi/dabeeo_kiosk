import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import transEn from './lang/en.json';
import transVi from './lang/vi.json';
import { LANGUAGE_TYPE } from "../data/constants/common";

const resources = {
    en: { translation: transEn },
    vi: { translation: transVi },
};

i18n.use(initReactI18next).init({
    resources,
    react: {
        useSuspense: false,
    },
    lng: LANGUAGE_TYPE.VI,
    fallbackLng: LANGUAGE_TYPE.VI,
    interpolation: {
        escapeValue: false,
    },
    returnNull: false
});

export default i18n;
