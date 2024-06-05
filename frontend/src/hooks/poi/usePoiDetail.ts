import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from '../../api/endpoints';

/**
 * Topic: Manage poi
 * Feature: Get poi detail
 *
 * @returns
 */
export const usePoiDetail = (poiId: string) => {
  return useAxios(
    {
      method: 'GET',
      url: EndPoints.pois +"/"+ poiId,
    }
  );
}

export const usePoiDetailByMapId = (poiMapId: string) => {
  return useAxios(
    {
      method: 'GET',
      url: EndPoints.poisByMapId +"/"+ poiMapId,
    }
  );
}
