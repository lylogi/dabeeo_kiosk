import { useTranslation } from "react-i18next";
import styles from './styles.module.css';
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const BranchFilter = () => {
    const { kioskBranches, branchId, setBranchId } = useContext(SearchContext);
    
    return (
        <div className={styles.branchFilterWrapper}>
            {kioskBranches &&
                <>
                    <div className={`${styles.branchFilterItem} ${kioskBranches['main']?.id === branchId && styles.active}`} onClick={() => setBranchId(kioskBranches['main']?.id)} >{kioskBranches['main']?.name}</div>
                    {kioskBranches['access'].length > 0 && kioskBranches['access']?.map((item: any) => (
                        <div className={`${styles.branchFilterItem} ${item.id === branchId && styles.active}`} onClick={() => setBranchId(item.id)}>{item?.name}</div>
                    ))}
                </>
            }
        </div>
    );
};

export default BranchFilter ;
