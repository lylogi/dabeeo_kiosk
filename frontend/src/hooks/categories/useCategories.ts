import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from '../../api/endpoints';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import { SearchContext } from '../../context/SearchContext';
import { categoriesExcludeShop, facilitiesBarCatCode, mapCatCodeFNB, shopCategories } from '../../constants/categories';
import { LOCAL_STORAGE_KEY } from '../../constants/localStorage';

export interface Category {
    id: string;
    mapCatId: string;
    title: {
        [key: string]: string
    };
}

export interface ICategoriesResponse {
    data: Category[]
}

/**
 * Topic: Manage floors
 * Feature: Get list floor
 *
 * @returns
 */
function useCategories(lang: string, menuId?: string) {
    const { activeMenu, data } = useContext(MenuContext);
    const branches = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.BRANCHES) || '{}');
    let params;
    
    if(!menuId) {
      params = {
        lang: lang,
        branchId: branches['main']?.id,
        categories_id: (branches && branches['access']?.length > 0) ? [...shopCategories, ...mapCatCodeFNB]  : shopCategories,
      }
    } else {
      params = {
        lang: lang,
        branchId: branches['main']?.id,
        menu_id: menuId
      }
    }
    return useAxios<ICategoriesResponse>(
        {
            method: 'GET',
            url: EndPoints.categories,
            params: params
        }
    );
}

export default useCategories;
