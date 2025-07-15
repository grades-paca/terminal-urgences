import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type * as ReactRouter from 'react-router';
import {login, mockedUseLogin, mockedUseMe, mockMutate, notLogin} from "./utils/authMocks.ts";
import {simpleRender} from "./utils/render.tsx";

vi.mock('react-router', async () => {
    const actual = await vi.importActual<typeof ReactRouter>('react-router');
    return {
        ...actual,
        useNavigate: vi.fn(() => vi.fn()),
        useLocation: vi.fn(() => ({ pathname: '/' })),
    };
});

vi.mock('@hooks/useTabActivityChecker', () => ({
    useTabActivityChecker: () => () => true,
}));

describe('DefaultLayout login form', () => {
    it('allows user to submit login form', async () => {
        notLogin()

        simpleRender()

        const usernameInput = screen.getByPlaceholderText(/Identifiant/i);
        const passwordInput = screen.getByPlaceholderText(/mot de passe/i);
        const submitButton = screen.getByTestId('submitButton');

        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'secret');
        await userEvent.click(submitButton);

        expect(mockMutate).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'secret',
        });
    });

    it('displays error message on failed login', async () => {
        mockedUseMe.mockReturnValue({ data: null, isLoading: false });
        mockedUseLogin.mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isError: true,
            error: new Error('Identifiants incorrects'),
        });

        simpleRender()

        expect(
            await screen.findByText(/Identifiants incorrects/i)
        ).toBeInTheDocument();
    });

    it('shows connected user info when logged in', () => {
        login()
        simpleRender()

        expect(
            screen.getByText(/Connecté en tant que testuser/i)
        ).toBeInTheDocument();
    });
});
