import { useState, ReactNode, createContext, useEffect, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Swiper } from 'swiper/types';
import { filterSlideData } from '../helper/utils';
import { DataContext } from './DataContext';
import { MENU_TYPE } from '../constants/menu';

type SearchContext = {
    floorId: string;
    setFloorId: (floorId: string) => void;
    setTagContent: (content: string) => void;
    setKeyword: (content: string) => void;
    swiperData: any;
    categoryCode: string;
    setCategoryCode: (categoryCode: string) => void;
    tab: string,
    setTab: (tab: string) => void;
    id: string;
    keyword: string;
    tagContent: string;
    type: string;
    setSwiper: (swiper: Swiper) => void;
    loading: boolean;
    kioskBranches: any;
    subType: any;    
    setSubType: (subType: any) => void;
    tagId: any;
    setTagId: (tabId: any) => void;
    dataSlide: any;
    isLoading: any;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SearchContext = createContext<SearchContext>(
  {} as SearchContext
);

export const FNBContext = createContext<SearchContext>(
  {} as SearchContext
);

export const FacilitiesContext = createContext<SearchContext>(
  {} as SearchContext
);

type Props = {
  children: ReactNode;
};


export function SearchProvider({ children,  }: Props) {
  const location = useLocation();
  const { id, type } = location.state;
  const [floorId, setFloorId] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [keyword, setKeyword] = useState('');
  const [tagContent, setTagContent] = useState('');
  const [tagId, setTagId] = useState(0);
  const [tab, setTab] = useState('category');
  const [ swiper, setSwiper ] = useState<Swiper>();
  const [kioskBranches, setKioskBranches ] = useState();
  const [subType, setSubType] = useState(0);
  const [ dataSlide, setDataSlide ] = useState<any[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const { searchPageData } = useContext(DataContext);

  const handleToSlideDataSearch = useCallback((searchPageData: any[], menuType: MENU_TYPE) => {
    const numberPerSlide = menuType === 'CONVENIENC' ? 10 : 9;
    setIsLoading(true);
    let dataFilter: any[] = Array.from(searchPageData || []);
    let filtedData: any[] = [];
    if (!dataFilter || dataFilter && dataFilter.length <= numberPerSlide) {
      filtedData = [dataFilter];
      setDataSlide(filtedData);
      setIsLoading(false);
    } else {
      const filterDataFunc = async () => {
        const filteredResult = filterSlideData(numberPerSlide, dataFilter);
        filtedData = filteredResult || [];
        setDataSlide(filtedData);
        setIsLoading(false);
      };
      filterDataFunc();
    }
  }, [])

  useEffect(() => {
    handleToSlideDataSearch(searchPageData, type);
  }, [searchPageData]);

  const filterByFloorId = useCallback((floorId: string, filterData: any[], menu_type: MENU_TYPE) => {
    let a = filterData ? filterData.filter((item: any) => floorId == item?.floor?.id) : [];
    handleToSlideDataSearch(a, menu_type);
  }, []);

  const filterByCategoryCode = useCallback((categoryCode: string, filterData: any[], menu_type: MENU_TYPE) => {
    let a = filterData ? filterData.filter((item: any) => categoryCode === item?.category?.mapCatId || categoryCode === item?.category?.parentCode) : [];
    handleToSlideDataSearch(a, menu_type);
  }, [])

  const filterByTagContent = useCallback((tagContent: string, filterData: any[], menu_type: MENU_TYPE) => {
    let a = filterData ? filterData.filter((item: any) => item.tags.some((tag: { content: string; }) => tag.content.toLocaleLowerCase() === tagContent.toLocaleLowerCase())) : [];
    handleToSlideDataSearch(a, menu_type);
  }, [])

  const filterByKeyword = useCallback((keyword: string, filterData: any[], menu_type: MENU_TYPE) => {
    let a = filterData ? filterData.filter((item: any) => {
      const matchesTitle = item?.title[i18n.language]?.toLocaleLowerCase()?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, "")?.includes(keyword?.toLocaleLowerCase().replace("#", ""));
      let matchesTags = false;
      if(keyword?.length > 1) {
        matchesTags = item.tags.some((tag: { content: string }) => tag?.content?.toLocaleLowerCase() === keyword.toLocaleLowerCase().replace("#", ""));
      }
      return matchesTitle || matchesTags;
    }): [];
    handleToSlideDataSearch(a, menu_type);
  }, [])

  useEffect(() => {
    
     if( floorId === '') {
      handleToSlideDataSearch(searchPageData, type);
    } else {
      filterByFloorId(floorId, searchPageData, type);
    }
    if(swiper && !swiper.destroyed)
      swiper.slideToLoop(0);
  }, [floorId]);

  useEffect(() => {
    if( categoryCode === '') {
      handleToSlideDataSearch(searchPageData, type);
    } else {
      filterByCategoryCode(categoryCode, searchPageData, type);
    }
    if(swiper && !swiper.destroyed)
      swiper.slideToLoop(0);
  }, [categoryCode]);

  useEffect(() => {
    setCategoryCode('');
    setFloorId('');
    setKeyword('');
    setTagContent('');
    if(swiper && !swiper.destroyed){
      swiper.slideToLoop(0);
    }
  }, [tab, type]);

  useEffect(() => {
    setCategoryCode('');
    setFloorId('');
    setKeyword('');
    setTagContent('');
  }, [lang])

  useEffect(() => {
    setTab('floor');
  }, [type])


 useEffect(() => {
    if( tagContent === '') {
      handleToSlideDataSearch(searchPageData, type);
    } else {
      filterByTagContent(tagContent, searchPageData, type);
    }
    if(swiper && !swiper.destroyed)
      swiper.slideToLoop(0);
  }, [tagContent]);

  useEffect(() => {
    if( keyword === '') {
      handleToSlideDataSearch(searchPageData, type);
    } else {
      filterByKeyword(keyword, searchPageData, type);
    }
    if(swiper && !swiper.destroyed)
      swiper.slideToLoop(0);
  }, [keyword]);

  return (  
    <SearchContext.Provider value={{ floorId, 
      setFloorId,
      setTagContent,
      setKeyword,
      setCategoryCode,
      categoryCode,
      setTab,
      id,
      keyword,
      tagContent,
      type,
      tab,
      setSwiper,
      kioskBranches,
      subType,
      setSubType,
      tagId,
      dataSlide,
      isLoading,
      setTagId }}
    >
      {children}
    </SearchContext.Provider>
  );
}
