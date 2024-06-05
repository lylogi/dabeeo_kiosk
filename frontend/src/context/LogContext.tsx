import { ReactNode, createContext, useEffect, useState } from 'react';
import { LOG_TYPE } from '../constants/logType';
import axios from '../api/axios-config';

type LogContext = {
    setTimeTouchedKiosk: (time: any) => void;
    saveLog: (type: LOG_TYPE, data: any) => Promise<void>;
    timeTouchedKiosk: number;
    branchId: string;
    saveLogType: any;
    setSaveLogType: (saveLogType: any) => void; 
    setIsSaveLang: (value: boolean) => void;
    isSaveLang: boolean;
    setBranchId: (value: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LogContext = createContext<LogContext>(
  {} as LogContext
);

type Props = {
  children: ReactNode;
};

export function LogProvider({ children }: Props) {
    const [ timeTouchedKiosk, setTimeTouchedKiosk ] = useState(Date.now());
    const [ branchId, setBranchId ] = useState('');
    const [saveLogType, setSaveLogType] = useState<any>('');
    const [ isSaveLang, setIsSaveLang ] = useState(false);

    const saveLog = async (type: LOG_TYPE, data: any) => {
        const params = {
            type: type,
            data: data
        }
        await axios.post('/logs', params);
    }

    return (
        <LogContext.Provider value={{ setTimeTouchedKiosk, saveLog, saveLogType, setSaveLogType, timeTouchedKiosk, branchId, isSaveLang, setIsSaveLang, setBranchId }}>
            {children}
        </LogContext.Provider>
    );
}
