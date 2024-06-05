import { ReactNode, createContext, useEffect, useState } from 'react';
import { LOG_POI_SUB_TYPE, LOG_TYPE } from '../constants/logType';
import axios from '../api/axios-config';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';

type ErrorContext = {
    onHasError: boolean,
    setOnHasError: (value: boolean) => void,
    messageError: string,
    setMessageError: (value: string) => void,
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ErrorContext = createContext<ErrorContext>(
  {} as ErrorContext
);

type Props = {
  children: ReactNode;
};

export function ErrorProvider({ children }: Props) {
    const [onHasError, setOnHasError] = useState(false);
    const [ messageError, setMessageError] = useState('');

    useEffect(() => {
        if(onHasError) {
            axios.get(import.meta.env.VITE_API_BASE_URL+ 'sync/setStatus?status=2&message='+messageError)
        } else {
            axios.get(import.meta.env.VITE_API_BASE_URL+ 'sync/setStatus?status=1&message='+messageError)
        }
      }, [onHasError])

    return (
        <ErrorContext.Provider value={{ onHasError, setOnHasError, messageError, setMessageError }}>
            {children}
        </ErrorContext.Provider>
    );
}
