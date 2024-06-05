import { useState, ReactNode, createContext, useEffect, useContext } from 'react';
import useScreenList from '../hooks/screens/useScreenList';
import { TYPE_SCREEN } from '../constants/types';
import { DataContext } from './DataContext';
import { RESYNC_STATUS } from '../constants/common';

type ScreenSaverContext = {
  screenSlides: any[];
  setScreenSlides: (slides: any[]) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ScreenSaverContext = createContext<ScreenSaverContext>(
  {} as ScreenSaverContext
);

type Props = {
  children: ReactNode;
};

export function ScreenSaverProvider({ children }: Props) {
  const [screenSlides, setScreenSlides ] = useState<any[]>();
  const [{ data, error, loading }, refetch] = useScreenList({ type : TYPE_SCREEN.SAVER_SCREEN});
  const { onResync, setResync } = useContext(DataContext);

  useEffect(() => {
    if(onResync === RESYNC_STATUS.DONE) {
      refetch();
    }
  }, [onResync]);
  
  useEffect(() => {
    if(data){
      setScreenSlides(data?.data);
    }
    if(error){
      setScreenSlides([]);
    }
  }, [data, error]);
  
  return (
    <ScreenSaverContext.Provider value={{ screenSlides, setScreenSlides}}>
      {children}
    </ScreenSaverContext.Provider>
  );
}