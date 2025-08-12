import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

export function renderWithDataRouter(
    ui: React.ReactElement,
    { initialEntries = ['/'] } = {}
) {
    const routes = [{ path: '/', element: ui }];
    const router = createMemoryRouter(routes, { initialEntries });
    return render(<RouterProvider router={router} />);
}
