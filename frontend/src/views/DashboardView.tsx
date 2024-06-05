import MainLayout from '../layouts/MainLayout';
import { DASHBOARD_ROUTES } from '../routes.config';
import { Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';

function DashboardView () {
  return (
    <I18nextProvider i18n={ i18n }>
        <MainLayout>
            <Routes>
                {DASHBOARD_ROUTES.map(({ path, screen }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            screen
                        }
                    />
                ))}
            </Routes>
        </MainLayout>
    </I18nextProvider>
  )
}

export default DashboardView;
