import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from '../../api/endpoints';

const useSyncDatas = () => {
    const isFirst = !localStorage.getItem('branches');
    const [response] = useAxios<any[]>(
        {
          method: 'GET',
          url: EndPoints.sync + "?isFirst="+isFirst, 
        }
    );

    return response;
}

export default useSyncDatas;