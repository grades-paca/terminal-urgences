import { render } from '@testing-library/react';
import { AppRouter } from '@routes/AppRouter';

export const simpleRender = (path: string = '/') => {
    window.history.pushState({}, '', path);
    return render(<AppRouter />);
};
