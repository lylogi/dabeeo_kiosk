import styles from './style.module.css';
import { useTranslation } from 'react-i18next';
import HoriStoreSwiper from '../../components/horizontal/HoriStoreSwiper';
import HoriFilters from '../../components/horizontal/HoriFilter';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { PAGE_TITLE } from '../../constants/common';
import { useLocation } from 'react-router-dom';

function SearchScreen() {
  const location = useLocation();
  const { type } = location?.state;
  const { t, i18n } = useTranslation();
  const { swiperData, subType, keyword, tagId } = useContext(SearchContext);

  return (
    <div className={`${styles.pageWrapper} search_page`}>
      <h1 className={`${styles.pageTitle} text-center`}>{t(PAGE_TITLE[type])}</h1>
      <div className={styles.swiperWrapper}>
        <HoriStoreSwiper swiperData={swiperData}  subType={subType} keyword={keyword} tagId={tagId} />
      </div>
      <HoriFilters />
    </div>
  )
}

export default SearchScreen;