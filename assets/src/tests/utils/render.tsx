import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppRouter } from '@routes/AppRouter.tsx';

export const simpleRender = () => {
    render(
        <MemoryRouter>
            <AppRouter />
        </MemoryRouter>
    );
};
