import { Dashboard } from '@pages/Dashboard';
import { HomePage } from '@pages/HomePage';
import { DefaultLayout } from '@templates/DefaultLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => (
    <BrowserRouter>
        <DefaultLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard/:idView" element={<Dashboard />} />
                </Route>
            </Routes>
        </DefaultLayout>
    </BrowserRouter>
);
