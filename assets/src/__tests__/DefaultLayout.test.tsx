import { useLogin } from '@services/auth/useLogin';
import { useMe } from '@services/auth/useMe';
import { useConfigView } from '@services/config/useConfigView';
import { DefaultLayout } from '@templates/DefaultLayout';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type * as ReactRouter from 'react-router';

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

const mockedUseLogin = useLogin as ReturnType<typeof vi.fn>;
const mockedUseMe = useMe as ReturnType<typeof vi.fn>;
const mockedConfigView = useConfigView as ReturnType<typeof vi.fn>;

beforeEach(() => {
    mockedConfigView.mockReturnValue([]);
});

describe('DefaultLayout login form', () => {
    it('allows user to submit login form', async () => {
        const mockMutate = vi.fn();

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
        const mockMutate = vi.fn();

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

        expect(
            await screen.findByText(/Identifiants incorrects/i)
        ).toBeInTheDocument();
    });

    it('shows connected user info when logged in', () => {
        mockedUseMe.mockReturnValue({
            data: { username: 'testuser' },
            isLoading: false,
        });
        mockedUseLogin.mockReturnValue({
            mutate: vi.fn(),
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

        expect(
            screen.getByText(/Connecté en tant que testuser/i)
        ).toBeInTheDocument();
    });
});
