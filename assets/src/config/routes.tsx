import type { RouteObject } from 'react-router-dom';
import { DefaultLayout } from '@templates/DefaultLayout.tsx';
import { ProtectedRoute } from '@routes/ProtectedRoute.tsx';
import { Dashboard } from '@pages/Dashboard.tsx';
import {
    ROUTE_PARAMETER_FICHES_PARAMETER,
    ROUTE_PARAMETER_USERS_GROUPS_PARAMETER,
} from '@const/navigation.ts';
import { ParameterFiches } from '@pages/parameters/ParameterFiches.tsx';
import { ParameterUsersAndGroups } from '@pages/parameters/ParameterUsersAndGroups.tsx';
import { Home } from '@pages/Home.tsx';

export const routes: RouteObject[] = [
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
];
