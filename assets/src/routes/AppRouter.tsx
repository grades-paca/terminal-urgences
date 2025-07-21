import { Dashboard } from '@pages/Dashboard';
import { Home } from '@pages/Home';
import { DefaultLayout } from '@templates/DefaultLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => (
    <BrowserRouter>
        <DefaultLayout>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard/:idView" element={<Dashboard />} />
                </Route>
            </Routes>
        </DefaultLayout>
    </BrowserRouter>
);
