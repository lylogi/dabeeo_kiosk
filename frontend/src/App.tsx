import './api/axios-config';
import './scss/styles.scss'
import useSyncDatas from './hooks/datas/useSyncDatas';
import { useContext, useEffect } from 'react';
import AppScreen from './screens/AppScreen/AppScreen';
import { kioskDataToStorage } from './helper/utils';
import { LogContext } from './context/LogContext';

function App() {
  const { loading, data } = useSyncDatas();
  const { setBranchId } = useContext(LogContext);

  useEffect(() => {
    const dataBranches = data?.data?.dataBranch;
    kioskDataToStorage(data?.data?.dataKiosk, dataBranches);
    setBranchId(dataBranches ? dataBranches?.main?.id : '');
  }, [data]);

  useEffect(() => {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    }, false);

    document.addEventListener("touchmove", function (e) {
      e.preventDefault();
    }, false);

    return () => {
      document.removeEventListener("contextmenu", function (e) {
        e.preventDefault();
      }, false);
      document.removeEventListener("touchmove", function (e) {
        e.preventDefault();
      }, false);
    }
  }, [])

  return (
    <div className="app">
      <AppScreen loading={loading} data={data} />
    </div>
  )
}

export default App
