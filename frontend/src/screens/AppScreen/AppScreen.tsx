import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import SyncDataLoading from '../../components/SyncDataLoading';
import ErrorDataScreen from '../ErrorDataScreen/ErrorDataScreen';
import { DataProvider } from '../../context/DataContext';
import { MapProvider } from '../../context/MapContext';
import { Route, Routes } from 'react-router-dom';
import ScreenSaverView from '../../views/ScreenSaverView';
import { MAIN_ROUTES } from '../../routes.config';
import { ScreenSaverProvider } from '../../context/ScreenSlideContext';
import { ScreenMainProvider } from '../../context/ScreenMainContext';
import { MenuProvider } from '../../context/MenuContext';
import axios from 'axios';

const AppScreen = ({loading, data}: any) => {
    const [onError, setOnError] = useState<boolean>(false);
    
    const handleTouchApp = () => {
        if(onError) {
            let message = 'Nomal';
            axios.get(import.meta.env.VITE_API_BASE_URL+ 'sync/setStatus?status=1&message='+message)
            setOnError(false);
        }
    }

    useEffect(() => {
        // Set up the error handler for uncaught errors.
        window.onerror = (message, source, lineno, colno, error) => {
            setOnError(true);
            axios.get(import.meta.env.VITE_API_BASE_URL+ 'sync/setStatus?status=2&message='+message)
        }
    }, []);

    return (
        <div className={styles.appScreen} onTouchEnd={() => handleTouchApp()}>
            {loading ? <SyncDataLoading /> :
            <>
                
                <DataProvider>
                    <MapProvider >
                    <ScreenSaverProvider>
                        <ScreenMainProvider>
                            <MenuProvider>
                            <Routes>
                                <Route index element={<ScreenSaverView />} />
                                {MAIN_ROUTES.map(({ path, screen, index }) => (
                                <Route
                                    index={index}
                                    key={path}
                                    path={path}
                                    element={
                                    screen
                                    }
                                />
                                ))}
                            </Routes>
                            </MenuProvider>
                        </ScreenMainProvider>
                    </ScreenSaverProvider>
                    </MapProvider>
                </DataProvider>
            </>
            }
        </div>
    )
}

export default AppScreen;