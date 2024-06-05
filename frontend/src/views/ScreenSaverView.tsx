import FullLayout from '../layouts/FullLayout';
import ScreenSaver from '../components/ScreenSaver';
import { ScreenSaverProvider } from '../context/ScreenSlideContext';

function ScreenSaverView () {
  return (
    <FullLayout>
        <ScreenSaver />
    </FullLayout>
  )
}

export default ScreenSaverView;
