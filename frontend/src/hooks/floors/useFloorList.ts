import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from '../../api/endpoints';
import { IFloorsResponse } from './floorId';

/**
 * Topic: Manage floors
 * Feature: Get list floor
 *
 * @returns
 */
function useFloorList() {
  return useAxios<IFloorsResponse>(
    {
      method: 'GET',
      url: EndPoints.floors,
    }
  );
}

export default useFloorList;
