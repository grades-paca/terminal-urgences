import { useLogin } from '@services/auth/useLogin';
import { useMe } from '@services/auth/useMe';
import { Button, TextInput } from 'flowbite-react';
import { type FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const LoginForm = () => {
    const loginMutation = useLogin();
    const { data: user } = useMe();
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ username, password });
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');

        if (location.pathname === '/') {
            window.location.reload();
        } else {
            navigate('/');
        }
    };

    return (
        <div className="bg-[var(--color-primary-100)] p-4 rounded w-auto md:w-auto max-w-full">
            {!user ? (
                <div className="flex flex-col gap-2 items-end">
                    <form
                        onSubmit={handleLogin}
                        className="flex items-center gap-2 md:flex-row flex-col w-full"
                    >
                        <TextInput
                            id="id"
                            type="text"
                            placeholder="Identifiant"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full md:w-auto"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full md:w-auto"
                        />
                        <Button
                            id="submitButton"
                            data-testid="submitButton"
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="text-xl px-3"
                        >
                            ✓
                        </Button>
                    </form>

                    {loginMutation.isError && (
                        <div className="alert text-sm font-bold">
                            {(loginMutation.error as Error)?.message ||
                                'Erreur inconnue'}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full items-start md:items-center">
                    <span>Connecté en tant que {user.username}</span>
                    <button
                        onClick={handleLogout}
                        className="underline cursor-pointer"
                    >
                        Déconnexion
                    </button>
                </div>
            )}
        </div>
    );
};
