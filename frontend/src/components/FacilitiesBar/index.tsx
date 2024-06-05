import { useTranslation } from "react-i18next";
import styles from './style.module.css';
import FacilityIcon from "../../images/facility_icon.svg";
import { useCallback, useContext } from "react";
import { MapContext } from "../../context/MapContext";

const FacilitiesBar = () => {
    const { floorFacilitiesCat, togglePoiByCategoryCode, activeSwiperFloorId, clearRouteSimulation } = useContext(MapContext);
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const getCatTitleByLang = useCallback((cat: any, lang: string) => {
        if(cat?.titleByLanguages && cat?.titleByLanguages.length > 0){
            return cat?.titleByLanguages?.find((item: any) => item.lang === lang)?.text || '';
        } else {
            return cat?.title || 0;
        }
    }, [lang]);

    return (
        <>
            {
                floorFacilitiesCat && floorFacilitiesCat.length > 0 && (
                <div key={floorFacilitiesCat?.code} className={styles.filterWrapper}>
                    {floorFacilitiesCat.length > 0 && floorFacilitiesCat.map((cat: any) => (
                        <div key={cat.code} className={styles.filterItem} onClick={async () => {await togglePoiByCategoryCode(cat.code, activeSwiperFloorId); clearRouteSimulation();}}>
                            <div className={styles.filterItemImg}>
                                <img src={cat?.iconImage || FacilityIcon} />
                            </div>
                            <div className={styles.filterTitle}>
                                {getCatTitleByLang(cat, lang)}
                            </div>
                        </div>
                    ))}
                </div>)
            }
        </>
    );
};

export default FacilitiesBar;
