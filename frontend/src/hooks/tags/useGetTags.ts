import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from "../../api/endpoints";

const useGetTags = () => {
    return useAxios<any>(
        {
          method: 'GET',
          url: EndPoints.tags, 
        }
    );
}

export default useGetTags;