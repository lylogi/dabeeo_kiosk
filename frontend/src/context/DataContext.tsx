import { useState, ReactNode, createContext, useEffect, useCallback } from 'react';
import usePoisList from '../hooks/pois/usePoisList';
import { useLocation } from 'react-router-dom';
import { LANGUAGE_TYPE, RESYNC_STATUS } from '../constants/common';
import useFetchMenu from '../hooks/menus/useFetchMenu';
import { MENU_SEARCH_BY_ID, MENU_TYPE } from '../constants/menu';
import useEventList from '../hooks/events/useEventList';
import useCategories from '../hooks/categories/useCategories';
import { useTranslation } from 'react-i18next';
import { kioskDataToStorage } from '../helper/utils';

type DataContext = {
  setResync: (value: any) => void;
  onResync: any;
  searchPageData: any;
  tagsFilter: any;
  eventLoading: boolean;
  eventData: any;
  categoriesData: any;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DataContext = createContext<DataContext>(
  {} as DataContext
);

type Props = {
  children: ReactNode;
};

const getMenuIdByType = (type: string, dataMenu: any) => {
  return dataMenu?.length ? dataMenu.find((item: any) => item.type === type)?.id : '';
}

export function DataProvider({ children }: Props) {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [{ data: dataMenu, error, loading }] = useFetchMenu();
  const [{ data: shopDataLangVi, loading: shopLoading }, refetchPoiVi] = usePoisList(LANGUAGE_TYPE.VI);
  const [{ data: shopDataLangEn }, refetchPoiEn] = usePoisList(LANGUAGE_TYPE.EN);
  const [{ data: FNBDataVi }, refetchFnbVi] = usePoisList(LANGUAGE_TYPE.VI, getMenuIdByType(MENU_TYPE.FNB, dataMenu?.data));
  const [{ data: FNBDataEn }, refetchFnbEn] = usePoisList(LANGUAGE_TYPE.EN, getMenuIdByType(MENU_TYPE.FNB, dataMenu?.data));
  const [{ data: facilitiesDataVi }, refetchFacilitiesVi] = usePoisList(LANGUAGE_TYPE.VI, getMenuIdByType(MENU_TYPE.CONVENIENC, dataMenu?.data));
  const [{ data: facilitiesDataEn }, refetchFacilitiesEn] = usePoisList(LANGUAGE_TYPE.EN, getMenuIdByType(MENU_TYPE.CONVENIENC, dataMenu?.data));
  const [{ data: eventData, loading: eventLoading }, refetchEvent] = useEventList();
  const [{ data: categoryShopVi }, refetchCategoryViShop] = useCategories(LANGUAGE_TYPE.VI);
  const [{ data: categoryShopEn }, refetchCategoryEnShop] = useCategories(LANGUAGE_TYPE.EN);
  const [{ data: categoryFacilitiesVi }, refetchCategoryFacilitiesVi] = useCategories(LANGUAGE_TYPE.VI, getMenuIdByType(MENU_TYPE.CONVENIENC, dataMenu?.data));
  const [{ data: categoryFacilitiesEn }, refetchCategoryFacilitiesEn] = useCategories(LANGUAGE_TYPE.EN, getMenuIdByType(MENU_TYPE.CONVENIENC, dataMenu?.data));
  const [{ data: categoryFnbVi }, refetchCategoryFnbVi] = useCategories(LANGUAGE_TYPE.VI, getMenuIdByType(MENU_TYPE.FNB, dataMenu?.data));
  const [{ data: categoryFnbEn }, refetchCategoryFnbEn] = useCategories(LANGUAGE_TYPE.EN, getMenuIdByType(MENU_TYPE.FNB, dataMenu?.data));
  const [searchTag, setSearchTag] = useState<any[]>([]);
  const [fnbTag, setFnbTag] = useState<any[]>();
  const [tagsFilter, setTagsFilter] = useState<any[]>();
  const [searchPageData, setSearchPageData] = useState();
  const [categoriesData, setCategoriesData] = useState<any>();

  const [onResync, setResync] = useState(RESYNC_STATUS.LOADING);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/api/sync/sse');

    eventSource.onmessage = (event) => {
      const { status, message, data } = JSON.parse(event.data);
      setResync(status);
      if(data) {
        kioskDataToStorage(data?.dataKiosk, data?.dataBranch);
      }
    };

    eventSource.onerror = (error) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);


  useEffect(() => {
    if(onResync === RESYNC_STATUS.DONE) {
      refetchPoiVi();
      refetchPoiEn();
      refetchFnbVi();
      refetchFnbEn();
      refetchFacilitiesVi();
      refetchFacilitiesEn();
      refetchEvent();
      refetchCategoryViShop();
      refetchCategoryEnShop();
      refetchCategoryFacilitiesVi();
      refetchCategoryFacilitiesEn();
      refetchCategoryFnbVi();
      refetchCategoryFnbEn();
      setResync(RESYNC_STATUS.NONE);
    }
  }, [onResync])

  const getTagsFilter = useCallback((data: any[]) => {
    const uniqueTags: any[] = [];
    for (const item of data) {
      for (const tag of item.tags) {
        if (!uniqueTags.some(t => t.id === tag.id)) {
          uniqueTags.push(tag);
        }
      }
    }
    return uniqueTags;
  }, [])


  const getSearchPageData = (type: string, language: string) => {
    switch (type) {
      case MENU_TYPE.SEARCH:
        setTagsFilter(searchTag);
        if (language === LANGUAGE_TYPE.VI) {
          setCategoriesData(categoryShopVi);
          return shopDataLangVi?.data;
        } else if (language === LANGUAGE_TYPE.EN) {
          setCategoriesData(categoryShopEn);
          return shopDataLangEn?.data;
        }
        break;
      case MENU_TYPE.FNB:
        setTagsFilter(fnbTag);
        if (language === LANGUAGE_TYPE.VI) {
          setCategoriesData(categoryFnbVi);
          return FNBDataVi?.data;
        } else if (language === LANGUAGE_TYPE.EN) {
          setCategoriesData(categoryFnbEn);
          return FNBDataEn?.data;
        }
        break;
      case MENU_TYPE.CONVENIENC:
        if (language === LANGUAGE_TYPE.VI) {
          setCategoriesData(categoryFacilitiesVi);
          return facilitiesDataVi?.data;
        } else if (language === LANGUAGE_TYPE.EN) {
          setCategoriesData(categoryFacilitiesEn);
          return facilitiesDataEn?.data;
        }
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (location.state) {
      const { type } = location.state;
      setSearchPageData(getSearchPageData(type, lang))
    }
  }, [location, lang])

  useEffect(() => {
    if (!shopDataLangVi?.data) { return };
    let tags = getTagsFilter(shopDataLangVi?.data);
    setSearchTag(tags);
  }, [shopDataLangVi?.data]);

  useEffect(() => {
    if (!shopDataLangVi?.data) { return };
    setFnbTag(getTagsFilter(FNBDataVi?.data));
  }, [FNBDataVi?.data])

  return (
    <DataContext.Provider value={{ searchPageData, tagsFilter, eventData, eventLoading, categoriesData, onResync }}
    >
      {children}
    </DataContext.Provider>
  );
}
