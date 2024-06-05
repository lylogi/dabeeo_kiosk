import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from "../../api/endpoints";

const useEventList = () => {
    return useAxios<any>(
        {
          method: 'GET',
          url: EndPoints.events, 
        }
    );
}

export default useEventList;