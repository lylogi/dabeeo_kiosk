import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from "../../api/endpoints";

const useFetchMenu = () => {
    return useAxios<any>(
        {
          method: 'GET',
          url: EndPoints.menus, 
        }
    );
}

export default useFetchMenu;