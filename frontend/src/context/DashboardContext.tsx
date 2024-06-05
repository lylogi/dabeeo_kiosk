import { useState, ReactNode, createContext } from 'react';
import { LANGUAGE_TYPE} from '../data/constants/common';
type DashboardContext = {
    lang: any;
    handleSetLang: (newLange: LANGUAGE_TYPE) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DashboardContext = createContext<DashboardContext>(
  {} as DashboardContext
);

type Props = {
  children: ReactNode;
};

export function DashboardProvider({ children }: Props) {
  const [lang, setLang] = useState(LANGUAGE_TYPE.VI);

  const handleSetLang = (newLange: LANGUAGE_TYPE) => {
    setLang(newLange);
  }

  return (
    <DashboardContext.Provider
      value={{ lang, handleSetLang }}
    >
      {children}
    </DashboardContext.Provider>
  );
}