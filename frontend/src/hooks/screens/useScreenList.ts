import useAxios from '../../api/useAxiosWrapper';
import { EndPoints } from '../../api/endpoints';
import { Screen, ScreenGetParams } from '../../types/screen.interface';

/**
 * Topic: Manage screen saver
 * Feature: Get list screens
 *
 * @returns
 */
function useScreenList(params: ScreenGetParams) {
  return useAxios<Screen[]>(
    {
      method: 'GET',
      url: EndPoints.screens,
      params,
    }
  );
}

export default useScreenList;
