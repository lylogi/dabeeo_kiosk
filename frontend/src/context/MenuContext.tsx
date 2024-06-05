import { useState, ReactNode, createContext, useEffect, useContext } from 'react';
import useFetchMenu from '../hooks/menus/useFetchMenu';
import { DataContext } from './DataContext';
import { RESYNC_STATUS } from '../constants/common';

type MenuContext = {
    activeMenu: string;
    setActiveMenu: (active: string) => void;
    data: any;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const MenuContext = createContext<MenuContext>(
  {} as MenuContext
);

type Props = {
  children: ReactNode;
};

export function MenuProvider({ children }: Props) {
  const [{ data, error, loading }, refetch] = useFetchMenu();
  const [activeMenu, setActiveMenu ] = useState<string>('');
  const { onResync } = useContext(DataContext);

  useEffect(() => {
    if(onResync === RESYNC_STATUS.DONE) {
      refetch();
    }
  }, [onResync]);
  return (
    <MenuContext.Provider value={{ activeMenu, setActiveMenu, data }}  >
      {children}
    </MenuContext.Provider>
  );
}