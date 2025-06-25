import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { MemoryRouter } from 'react-router'
import {DefaultLayout} from "@templates/DefaultLayout";
import {useLogin, useMe} from "@features/auth/useAuth";

const mockedUseMe = useMe as jest.Mock;
const mockedUseLogin = useLogin as jest.Mock;

jest.mock('../features/auth/useAuth', () => ({
    useMe: jest.fn(),
    useLogin: jest.fn(),
}));

jest.mock('react-router', () => {
    const actual = jest.requireActual('react-router');
    return {
        ...actual,
        useNavigate: jest.fn(() => jest.fn()),
        useLocation: jest.fn(() => ({ pathname: '/' })),
    };
});

describe('DefaultLayout login form', () => {
    it('allows user to submit login form', async () => {
        const mockMutate = jest.fn();

        mockedUseMe.mockReturnValue({ data: null, isLoading: false });
        mockedUseLogin.mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isError: false,
        });

        render(
            <MemoryRouter>
                <DefaultLayout>
                    <div>Test Content</div>
                </DefaultLayout>
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText(/username/i);
        const passwordInput = screen.getByPlaceholderText(/mot de passe/i);
        const submitButton = screen.getByRole('button', { name: /connexion/i });

        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'secret');
        await userEvent.click(submitButton);

        expect(mockMutate).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'secret',
        });
    });

    it('displays error message on failed login', async () => {
        const mockMutate = jest.fn();

        mockedUseMe.mockReturnValue({ data: null, isLoading: false });
        mockedUseLogin.mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isError: true,
            error: new Error('Identifiants incorrects'),
        });

        render(
            <MemoryRouter>
                <DefaultLayout>
                    <div>Test Content</div>
                </DefaultLayout>
            </MemoryRouter>
        );

        expect(await screen.findByText(/Identifiants incorrects/i)).toBeInTheDocument();
    });

    it('shows connected user info when logged in', () => {
        mockedUseMe.mockReturnValue({ data: { username: 'testuser' }, isLoading: false });
        mockedUseLogin.mockReturnValue({
            mutate: jest.fn(),
            isPending: false,
            isError: false,
        });

        render(
            <MemoryRouter>
                <DefaultLayout>
                    <div>Test Content</div>
                </DefaultLayout>
            </MemoryRouter>
        );

        expect(screen.getByText(/Connecté en tant que testuser/i)).toBeInTheDocument();
    });
});
