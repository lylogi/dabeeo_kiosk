import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from "../../api/endpoints";

const useEventDetail = (eventId: string) => {
    return useAxios<any>(
        {
          method: 'GET',
          url: EndPoints.events +"/"+ eventId, 
        }
    );
}

export default useEventDetail;