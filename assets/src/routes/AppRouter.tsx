import { Dashboard } from '@pages/Dashboard';
import { Home } from '@pages/Home';
import { DefaultLayout } from '@templates/DefaultLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import {
    ROUTE_PARAMETER_FICHES_PARAMETER,
    ROUTE_PARAMETER_FICHES_STANDARD,
} from '@const/navigation.ts';
import { ParameterFiches } from '@pages/parameters/ParameterFiches.tsx';

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard/:idView" element={<Dashboard />} />

                    <Route
                        path={ROUTE_PARAMETER_FICHES_PARAMETER}
                        element={<ParameterFiches />}
                    />
                    <Route
                        path={ROUTE_PARAMETER_FICHES_STANDARD}
                        element={<ParameterFiches />}
                    />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
