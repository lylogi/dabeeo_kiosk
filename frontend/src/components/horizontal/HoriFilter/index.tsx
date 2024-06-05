import { useTranslation } from "react-i18next";
import { Tab, Tabs } from "react-bootstrap";
import styles from "./style.module.css";
import FloorFilter from "../../FloorFilter";
import CategoryFilter from "../../CategoryFilter";
import KeywordFilter from "../../KeywordFilter";
import { useCallback, useContext } from "react";
import { SearchContext } from "../../../context/SearchContext";
import BranchFilter from "../../BranchFilter";
import { LogContext } from '../../../context/LogContext';
import { LOG_TYPE, LOG_KIOSK_SUB_TYPE } from '../../../constants/logType';

const HoriFilters = () => {
    const { t, i18n } = useTranslation();
    const { tab, setTab, type, setSubType, kioskBranches } = useContext(SearchContext);
    const { saveLog, branchId } = useContext(LogContext);

    const clickTabss = useCallback((e: any) => {
        setSubType(LOG_TYPE.LIST);
        const data = {
            branch_id: branchId,
            tab: e,
            sub_type: LOG_KIOSK_SUB_TYPE.TAB_CLICK
        }
        if (e) {
            saveLog(LOG_TYPE.KIOSK, data);
        }
        setTab(e || '')
    }, []);

    return (
        <div className={styles.filterWrapper}>
            {kioskBranches && kioskBranches['access']?.length > 0 &&
                <div className={styles.branchFilter}>
                    <BranchFilter />
                </div>
            }
            <Tabs
                defaultActiveKey="floor"
                activeKey={tab}
                className={styles.navTabs}
                onSelect={(e) => clickTabss(e)}
            >
                <Tab tabClassName={styles.navLink} eventKey="floor" title={t('filter.category')}>
                    <div className={styles.tabContent }>
                        <CategoryFilter />
                    </div>
                </Tab>
                {type !== 'CONVENIENC' &&
                    <Tab tabClassName={styles.navLink} eventKey="keyword" title={t('filter.keyword')}>
                        <div className={styles.tabContent}>
                            <KeywordFilter />
                        </div>
                    </Tab>
                }
            </Tabs>
        </div>
    );
};

export default HoriFilters;
