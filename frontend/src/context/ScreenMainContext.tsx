import { useState, ReactNode, createContext, useEffect, useContext } from 'react';
import useScreenList from '../hooks/screens/useScreenList';
import { TYPE_SCREEN } from '../constants/types';
import { RESYNC_STATUS } from '../constants/common';
import { DataContext } from './DataContext';

type ScreenMainContext = {
  screenSlides: any[];
  setScreenSlides: (slides: any[]) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ScreenMainContext = createContext<ScreenMainContext>(
  {} as ScreenMainContext
);

type Props = {
  children: ReactNode;
};

export function ScreenMainProvider({ children }: Props) {
  const [screenSlides, setScreenSlides ] = useState<any[]>();
  const [{ data, error, loading }, refetch] = useScreenList({ type : TYPE_SCREEN.MAIN_SCREEN});
  const { onResync } = useContext(DataContext);

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
    <ScreenMainContext.Provider value={{ screenSlides, setScreenSlides}}>
      {children}
    </ScreenMainContext.Provider>
  );
}