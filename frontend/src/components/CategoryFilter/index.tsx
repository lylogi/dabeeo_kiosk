import { useTranslation } from "react-i18next";
import styles from './style.module.css';
import { useCallback, useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { DataContext } from "../../context/DataContext";
import { LOG_KIOSK_SUB_TYPE, LOG_TYPE } from "../../constants/logType";
import { LogContext } from "../../context/LogContext";


const CategoryFilter = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const { categoriesData } = useContext(DataContext);
    const { categoryCode, setCategoryCode, type } = useContext(SearchContext);
    const { branchId, saveLog} = useContext(LogContext);

    const handleOnClick = useCallback((mapCatId: string) => {
        setCategoryCode(mapCatId);
        const data = {
            category_id: mapCatId,
            type_menu: type,
            branch_id: branchId,
            sub_type: LOG_KIOSK_SUB_TYPE.CATEGORY_CLICK
        }
        if (mapCatId !== '') {
            saveLog(LOG_TYPE.KIOSK, data);
        }
    }, [])

    return (
        <div className={styles.filterWrapper}>
            <div className={`${styles.categoryItem} ${categoryCode === '' && styles.categoryActive} ${styles.allCategory}`} style={{ order: 0 }} onClick={() => handleOnClick(''
            )}><span>All</span></div>
            {categoriesData && categoriesData?.data.map((category: any) => {
                return (
                    <div className={`${styles.categoryItem} ${categoryCode === category.mapCatId && styles.categoryActive}`}
                        key={category.id}
                        onClick={() => handleOnClick(category.mapCatId)}>
                        <span>
                            {category.title[lang]}
                        </span>
                    </div>
                )
            })}
        </div>
    );
};

export default CategoryFilter;
