import { ReactElement, JSXElementConstructor } from 'react';
import MainLayout from '../layouts/MainLayout';
import ScreenMain from '../components/ScreenMain';

function MainScreen() {
  return (
    <div className="page-container main-screen">
      <ScreenMain />
    </div>
  )
}

export default MainScreen