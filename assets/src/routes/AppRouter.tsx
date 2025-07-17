import { Dashboard } from '@pages/Dashboard';
import { Home } from '@pages/Home';
import { DefaultLayout } from '@templates/DefaultLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTE_PARAMETER_FICHES } from '@const/navigation.ts';
import { ParameterFiches } from '@pages/parameters/ParameterFiches.tsx';

export const AppRouter = () => (
    <BrowserRouter>
        <DefaultLayout>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard/:idView" element={<Dashboard />} />
                    <Route
                        path={ROUTE_PARAMETER_FICHES}
                        element={<ParameterFiches />}
                    />
                </Route>
            </Routes>
        </DefaultLayout>
    </BrowserRouter>
);
