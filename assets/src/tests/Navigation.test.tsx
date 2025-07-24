import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { login, notLogin } from './utils/authMocks.ts';
import { VIEW_DASHBOARD_TYPE } from '@interfaces/View.ts';
import { mockedConfigView } from './setupTests.ts';
import { simpleRender } from './utils/render.tsx';

describe('Navigation display tabs check', () => {
    it('User not connected display single home tabs', async () => {
        notLogin();
        simpleRender();

        expect(screen.getAllByRole('tab')).toHaveLength(1);
        expect(screen.getByTestId('tab-home')).toBeInTheDocument();
        expect(screen.queryByTestId('tab-cog')).toBeNull();
    });

    it('User connected home tabs and menu', async () => {
        login();

        mockedConfigView.mockReturnValue({
            data: [
                {
                    id: 1,
                    label: 'urgence',
                    type: VIEW_DASHBOARD_TYPE,
                },
                {
                    id: 2,
                    label: 'enfant',
                    type: VIEW_DASHBOARD_TYPE,
                },
                {
                    id: 3,
                    label: 'parent',
                    type: VIEW_DASHBOARD_TYPE,
                },
            ],
        });

        simpleRender();

        expect(screen.getAllByRole('tab')).toHaveLength(5);
        expect(screen.queryByTestId('tab-home')).toBeInTheDocument();
        expect(screen.queryByTestId('tab-cog')).toBeInTheDocument();
        expect(screen.queryByTestId('tab-views-1')).toBeInTheDocument();
        expect(screen.queryByTestId('tab-views-2')).toBeInTheDocument();
        expect(screen.queryByTestId('tab-views-3')).toBeInTheDocument();
    });
});
