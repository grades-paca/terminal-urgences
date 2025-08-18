import { Dashboard } from '@pages/Dashboard';
import { Home } from '@pages/Home';
import { DefaultLayout } from '@templates/DefaultLayout';
import { ProtectedRoute } from './ProtectedRoute';
import {
    ROUTE_PARAMETER_FICHES_PARAMETER,
    ROUTE_PARAMETER_USERS_GROUPS_PARAMETER,
} from '@const/navigation.ts';
import { ParameterFiches } from '@pages/parameters/ParameterFiches.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ParameterUsersAndGroups } from '@pages/parameters/ParameterUsersAndGroups.tsx';

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <Home /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: '/dashboard/:idView', element: <Dashboard /> },
                    {
                        path: ROUTE_PARAMETER_FICHES_PARAMETER,
                        element: <ParameterFiches />,
                    },
                    {
                        path: ROUTE_PARAMETER_USERS_GROUPS_PARAMETER,
                        element: <ParameterUsersAndGroups />,
                    },
                ],
            },
        ],
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;
