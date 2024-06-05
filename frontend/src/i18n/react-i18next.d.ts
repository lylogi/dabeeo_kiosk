import { LANGUAGE_TYPE } from '../data/constants/common';
import { resources, defaultNS } from './i18n';

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources[LANGUAGE_TYPE[VI]];
    returnNull: false;
  };
};