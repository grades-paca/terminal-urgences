import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@config/routes.tsx';

export const simpleRender = (path: string = '/') => {
    const router = createMemoryRouter(routes, { initialEntries: [path] });
    return render(<RouterProvider router={router} />);
};
