import { ReactElement } from 'react';
import MapScreen2 from './screens/MapScreen2';
import ScreenSaverView from './views/ScreenSaverView';
import SearchScreen from './screens/SearchScreen/SearchScreen';
import EventScreen from './screens/EventScreen/EventScreen';
import { DASHBOARD_LINK, MAIN_LINK } from './constants/menu';
import DashboardView from './views/DashboardView';
import MainScreen from './screens/MainScreen';
import { SearchProvider } from './context/SearchContext';
import { MenuProvider } from './context/MenuContext';
import { EventProvider } from './context/EventContext';
import FacilitiesScreen from './screens/FacilitiesScreen/FacilitiesScreen';

export const DASHBOARD_ROUTES: {
  path: string;
  screen: ReactElement;
  index?: boolean;
}[] = [
  {
    path: DASHBOARD_LINK.MAIN,
    screen: <MainScreen />,
  },
  {
    path: DASHBOARD_LINK.SEARCH,
    screen: <SearchProvider><SearchScreen /></SearchProvider>
  },
  {
    path: DASHBOARD_LINK.MAP,
    screen: <MapScreen2 />,
    index: true,
  },
  {
    path: DASHBOARD_LINK.FNB,
    screen: <SearchProvider><SearchScreen /></SearchProvider>,
  },
  {
    path: DASHBOARD_LINK.EVENT,
    screen: <EventProvider><EventScreen /></EventProvider>
  },
  {
    path: DASHBOARD_LINK.CONVENIENC,
    screen: <SearchProvider><FacilitiesScreen /></SearchProvider>
  },
];

export const MAIN_ROUTES: {
  path: string;
  screen: ReactElement;
  index: boolean | undefined;
}[] = [
  {
    path: MAIN_LINK.SAVER,
    screen: <ScreenSaverView />,
    index: false
  },
  {
    path: MAIN_LINK.DASHBOARD,
    screen: <MenuProvider><DashboardView /></MenuProvider>,
    index: true
  },
]
