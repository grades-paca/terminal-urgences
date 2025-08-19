import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@config/routes.tsx';

const router = createBrowserRouter(routes);
export const AppRouter = () => <RouterProvider router={router} />;
