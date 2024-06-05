import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from "../../api/endpoints";
import { mapCatCodeFNB, shopCategories } from '../../constants/categories';
import { LOCAL_STORAGE_KEY } from '../../constants/localStorage';

const usePoisList = (lang: string, menuId?: string) => {
    const branches = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.BRANCHES) || '{}');

    let params;
    if(!menuId) {
      params = {
        lang: lang,
        branchId: branches['main']?.id,
        categories_id: (branches && branches['access']?.length > 0) ? [...shopCategories, ...mapCatCodeFNB] : shopCategories
      }
    } else {
      params = {
        lang: lang,
        branchId: branches['main']?.id,
        menu_id: menuId,
      }
    }
    
    return useAxios<any>(
        {
          method: 'GET',
          url: EndPoints.pois, 
          params: params
        }
    );
}

export default usePoisList;